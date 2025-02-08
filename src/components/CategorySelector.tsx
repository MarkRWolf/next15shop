"use client";
import { ChevronsUpDown, Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Category, Language } from "../../sanity.types";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import useText from "@/hooks/useText";
import BetterLink from "./BetterLink";
interface CategorySelectorProps {
  categories: Category[];
  categoryTexts: Language[];
}

const CategorySelector = ({ categories, categoryTexts }: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname().split("/")[2];

  const [value, setValue] = useState<string>(
    categories.find((c) => c.slug?.current === path)?._id || ""
  );

  const search = useText(categoryTexts, "search", "single");
  const filterBy = useText(categoryTexts, "filterBy", "single");
  const none = useText(categoryTexts, "none", "single");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-44 flex justify-between border-gray-400/60"
        >
          {value ? categories.find((cat) => cat._id === value)?.title : filterBy}
          <ChevronsUpDown className="h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="cursor-pointer">
          <CommandInput
            placeholder={search}
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/products/${selectedCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem asChild>
                <span onClick={() => setValue("")}>
                  <BetterLink href="/products" className="flex w-full items-center justify-between">
                    {none}
                    <Check
                      className={cn("ml-auto h-4 w-4", value === "" ? "opacity-100" : "opacity-0")}
                    />
                  </BetterLink>
                </span>
              </CommandItem>
              {categories.map((c) => (
                <CommandItem key={c._id} asChild>
                  <span
                    onClick={() => {
                      setValue((prev) => (prev === c._id ? "" : c._id));
                      setOpen(false);
                    }}
                  >
                    <BetterLink
                      href={`/products/${c.slug?.current}`}
                      className="flex w-full items-center justify-between"
                    >
                      {c.title}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === c._id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </BetterLink>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;

/*  */

/* {categories.map((c) => (
                <CommandItem
                  key={c._id}
                  value={c.title}
                  className="cursor-pointer"
                  onSelect={() => {
                    setValue(value === c._id ? "" : c._id);
                    router.push(`/products/${c.slug?.current}`);
                    setOpen(false);
                  }}
                >
                  {c.title}
                  <Check
                    className={cn("ml-auto h-4 w-4", value === c._id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))} */
