import { buttonVariants } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, XIcon } from "lucide-react";
import { useRef, useState } from "react";

type SearchableSelectProps = {
    values: string[];
    placeholder?: string;
    inputPlaceholder?: string;
    value: Set<string>;
    onValueChange: (newValue: Set<string>) => void;
    empty: string;
};

export function SearchableSelect({
    values,
    placeholder,
    inputPlaceholder,
    value,
    onValueChange,
    empty,
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);

    const listRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (selectedValue: string) => {
        const newValue = new Set(value);

        if (newValue.has(selectedValue)) {
            newValue.delete(selectedValue);
        } else {
            newValue.add(selectedValue);
        }

        onValueChange(newValue);
    };

    const handleRemove = (removingValue: string) => {
        const newValue = new Set(value);

        newValue.delete(removingValue);

        onValueChange(newValue);
    };

    const handleInputScroll = () => {
        if (!listRef.current) return;

        listRef.current.scrollTop = 0;
    };

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <div
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-auto gap-2 hover:bg-inherit w-full"
                    )}
                >
                    {value.size > 0 ? (
                        <div className="flex flex-wrap items-center gap-2 overflow-hidden">
                            {value.values().map((value) => (
                                <div className="flex items-center justify-between gap-1 bg-primary/40 px-2 rounded overflow-hidden">
                                    <p className="truncate">{value}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            handleRemove(value);
                                        }}
                                        className="p-0.5"
                                    >
                                        <XIcon className="size-3 text-muted-foreground" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        placeholder
                    )}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput
                        onInput={handleInputScroll}
                        placeholder={inputPlaceholder}
                    />
                    <CommandEmpty>{empty}</CommandEmpty>
                    <CommandList ref={listRef}>
                        <CommandGroup>
                            {values.map((v) => (
                                <CommandItem
                                    key={v}
                                    value={v}
                                    onSelect={handleSelect}
                                    keywords={[v]}
                                    className={
                                        value.has(v) ? "font-medium" : ""
                                    }
                                >
                                    {v}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
