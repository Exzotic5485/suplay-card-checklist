import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type SearchableSelectProps = {
    values: string[];
    placeholder?: string;
    inputPlaceholder?: string;
    value: string;
    onValueChange: (newValue: string) => void;
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

    const selectedValue = useMemo(
        () => values.find((v) => v === value),
        [value, values]
    );

    const handleSelect = (newValue: string) => {
        onValueChange(newValue === value ? "" : newValue);

        setOpen(false);
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
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    aria-expanded={open}
                >
                    {selectedValue ? (
                        <div className="truncate">{selectedValue}</div>
                    ) : (
                        placeholder
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
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
                                        v === selectedValue
                                            ? "font-medium"
                                            : ""
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
