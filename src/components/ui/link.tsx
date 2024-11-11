"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type PrefetchImage = {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
};

async function prefetchImages(href: string) {
  if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
    return [];
  }

  const url = new URL(href, window.location.href).pathname.split("/")[2];

  const imageResponse = await fetch(`/api/prefetch-images/${url}`, {
    priority: "low",
  });

  // Only throw in dev mode
  if (!imageResponse.ok && process.env.NODE_ENV === "development") {
    throw new Error("Failed to prefetch images");
  }

  const { images } = await imageResponse.json();
  return images as PrefetchImage[];
}

const seen = new Set<string>();

// Link Component with prefetching
export const Link: typeof NextLink = (({ children, ...props }) => {
  const [images, setImages] = useState<PrefetchImage[]>([]);
  const [preloading, setPreloading] = useState<(() => void)[]>([]);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  let prefetchTimeout: NodeJS.Timeout | null = null;

  // Prefetch images when the link is in view (Intersection Observer)
  useEffect(() => {
    const linkElement = linkRef.current;
    if (!linkElement) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        prefetchTimeout = setTimeout(async () => {
          router.prefetch(String(props.href));
          const fetchedImages = await prefetchImages(String(props.href));
          setImages(fetchedImages);
          observer.unobserve(entry.target); // Stop observing once prefetched
        }, 300); // Delay 300ms before prefetching
      } else if (prefetchTimeout) {
        clearTimeout(prefetchTimeout); // Cancel timeout if link is out of view
        prefetchTimeout = null;
      }
    });

    observer.observe(linkElement);

    return () => {
      observer.disconnect();
      if (prefetchTimeout) clearTimeout(prefetchTimeout);
    };
  }, [props.href]);

  const handleMouseEnter = async () => {
    router.prefetch(String(props.href));
    const fetchedImages = await prefetchImages(String(props.href));
    setImages(fetchedImages);

    const preloadedImages = fetchedImages.map(prefetchImage).filter(Boolean) as (() => void)[];
    setPreloading(preloadedImages);
  };

  const handleMouseLeave = () => {
    preloading.forEach((remove) => remove());
    setPreloading([]);
  };

  return (
    <NextLink
      ref={linkRef}
      prefetch={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </NextLink>
  );
}) as typeof NextLink;

function prefetchImage(image: PrefetchImage) {
  if (image.loading === "lazy" || seen.has(image.srcset)) return;

  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "low";
  img.sizes = image.sizes;
  seen.add(image.srcset);
  img.srcset = image.srcset;
  img.src = image.src;
  img.alt = image.alt;

  let done = false;
  img.onload = img.onerror = () => (done = true);

  return () => {
    if (done) return;
    img.src = img.srcset = "";
    seen.delete(image.srcset);
  };
}
