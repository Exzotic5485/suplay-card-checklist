import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useSearchQuery } from "@/context/search-query";
import type { CardSet } from "@/lib/db";
import {
    getCharactersForSet,
    getFranchisesForSet,
    getVarietiesForSet,
} from "@/lib/db/sets";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";

type FiltersSidebarProps = {
    set: CardSet;
};

export function FiltersSidebar({ set }: FiltersSidebarProps) {
    return (
        <div className="md:w-1/4 md:pt-20 space-y-8">
            <FranchiseSelect set={set} />
            <CharacterSelect set={set} />
            <VarietyCheckboxes set={set} />
        </div>
    );
}

function FranchiseSelect({ set }: FiltersSidebarProps) {
    const { franchise, setFranchise } = useSearchQuery();

    const franchises = useLiveQuery(() => getFranchisesForSet(set.id), [set]);

    return useMemo(
        () => (
            <div className="space-y-1">
                <FilterLabel reset={() => setFranchise(new Set())}>
                    Franchise
                </FilterLabel>
                <SearchableSelect
                    value={franchise}
                    onValueChange={setFranchise}
                    values={franchises || []}
                    empty="No franchises found."
                    placeholder="Select franchise..."
                />
            </div>
        ),
        [franchises, franchise, setFranchise]
    );
}

function CharacterSelect({ set }: FiltersSidebarProps) {
    const { character, setCharacter } = useSearchQuery();

    const characters = useLiveQuery(() => getCharactersForSet(set.id), [set]);

    return useMemo(
        () => (
            <div className="space-y-1">
                <FilterLabel reset={() => setCharacter(new Set())}>
                    Character
                </FilterLabel>
                <SearchableSelect
                    value={character}
                    onValueChange={setCharacter}
                    values={characters || []}
                    empty="No characters found."
                    placeholder="Select character..."
                />
            </div>
        ),
        [characters, character, setCharacter]
    );
}

function VarietyCheckboxes({ set }: FiltersSidebarProps) {
    const { varieties, setVarieties } = useSearchQuery();

    const varietiesForSet = useLiveQuery(
        () => getVarietiesForSet(set.id),
        [set]
    );

    const handleSelect = (variety: string) => {
        const newVarieties = new Set(varieties);

        if (newVarieties.has(variety)) {
            newVarieties.delete(variety);
        } else {
            newVarieties.add(variety);
        }

        setVarieties(newVarieties);
    };

    return useMemo(
        () => (
            <div className="space-y-2">
                <FilterLabel reset={() => setVarieties(new Set())}>
                    Varieties
                </FilterLabel>
                <div className="flex flex-col gap-2">
                    {varietiesForSet?.map((variety) => (
                        <div
                            key={variety}
                            onClick={() => handleSelect(variety)}
                            className="flex items-center gap-2"
                        >
                            <Checkbox checked={varieties.has(variety)} />
                            <Label className="cursor-pointer">{variety}</Label>
                        </div>
                    ))}
                </div>
            </div>
        ),
        [varieties, varietiesForSet]
    );
}

type FilterLabelProps = {
    reset: () => void;
    children: React.ReactNode;
};

export function FilterLabel({ children, reset }: FilterLabelProps) {
    return (
        <div className="flex justify-between items-center">
            <Label>{children}</Label>
            <button
                onClick={reset}
                className="text-xs text-muted-foreground"
            >
                Reset
            </button>
        </div>
    );
}
