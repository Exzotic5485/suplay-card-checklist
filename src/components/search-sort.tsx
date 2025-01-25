import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchQuery } from "@/context/search-query";
import { SortType, SortTypeLabels } from "@/lib/constants";

export function SearchSort() {
    return (
        <div className="flex items-center gap-6">
            <SearchInput />
            <SortSelect />
        </div>
    );
}

function SearchInput() {
    const { search, setSearch } = useSearchQuery();

    return (
        <Input
            placeholder="Search card name or franchise..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
        />
    );
}

function SortSelect() {
    const { sort, setSort } = useSearchQuery();

    return (
        <Select
            value={sort}
            onValueChange={(v) => setSort(v as SortType)}
        >
            <SelectTrigger className="w-1/4">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(SortTypeLabels).map(([key, label]) => (
                    <SelectItem
                        key={key}
                        value={key}
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
