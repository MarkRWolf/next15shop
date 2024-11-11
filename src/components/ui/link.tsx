// File: components/ui/link.tsx

"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type PrefetchImage = {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prefetchImages(href: string) {
  if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
    return [];
  }
  const url = new URL(href, window.location.href);
  const imageResponse = await fetch(`/api/prefetch-images${url.pathname}`, {
    priority: "low",
  });

  if (!imageResponse.ok && process.env.NODE_ENV === "development") {
    throw new Error("Failed to prefetch images");
  }
  const data = await imageResponse.json();
  const images = Array.isArray(data.images) ? data.images : [];
  return images as PrefetchImage[];
}

const seen = new Set<string>();

interface LinkProps extends NextLinkProps {
  prefetch?: boolean;
  children: React.ReactNode;
}

export const Link = ({ children, prefetch = false, ...props }: LinkProps) => {
  const [preloading, setPreloading] = useState<(() => void)[]>([]);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  let prefetchTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (prefetch === false) {
      return;
    }

    const linkElement = linkRef.current;
    if (!linkElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          prefetchTimeout = setTimeout(async () => {
            router.prefetch(String(props.href));
            await sleep(0);
            try {
              const images = await prefetchImages(String(props.href));
              images.forEach((image) => {
                prefetchImage(image);
              });
            } catch (error) {
              console.error(error);
            }
            observer.unobserve(entry.target);
          }, 300);
        } else if (prefetchTimeout) {
          clearTimeout(prefetchTimeout);
          prefetchTimeout = null;
        }
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(linkElement);

    return () => {
      observer.disconnect();
      if (prefetchTimeout) {
        clearTimeout(prefetchTimeout);
      }
    };
  }, [props.href, prefetch, router]);

  const handleMouseEnter = async () => {
    router.prefetch(String(props.href));
    if (preloading.length) return;
    const p: (() => void)[] = [];
    try {
      const fetchedImages = await prefetchImages(String(props.href));
      fetchedImages.forEach((image) => {
        const remove = prefetchImage(image);
        if (remove) p.push(remove);
      });
    } catch (error) {
      console.error(error);
    }
    setPreloading(p);
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
      onMouseDown={(e) => {
        const url = new URL(String(props.href), window.location.href);
        if (
          url.origin === window.location.origin &&
          e.button === 0 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        ) {
          e.preventDefault();
          router.push(String(props.href));
        }
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
};

function prefetchImage(image: PrefetchImage) {
  if (image.loading === "lazy" || seen.has(image.srcset)) return;
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "low"; // Note: fetchPriority is not standard yet
  img.sizes = image.sizes;
  seen.add(image.srcset);
  img.srcset = image.srcset;
  img.src = image.src;
  img.alt = image.alt;
  let done = false;
  img.onload = img.onerror = () => {
    done = true;
  };
  return () => {
    if (done) return;
    img.src = img.srcset = "";
    seen.delete(image.srcset);
  };
}
