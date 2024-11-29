"use client";
import { ChevronsUpDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Category } from "../../sanity.types";
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
interface CategorySelectorProps {
  categories: Category[];
}
const CategorySelector = ({ categories }: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-44 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 hover:text-white text-white font-bold py-2 px-4 rounded"
        >
          {value ? categories.find((cat) => cat._id === value)?.title : "Filter by Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />{" "}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
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
              {categories.map((c) => (
                <CommandItem
                  key={c._id}
                  value={c.title}
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
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;
