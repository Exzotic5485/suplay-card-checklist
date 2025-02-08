import { Card } from "@/components/card";
import { Pagination } from "@/components/pagination";
import { useSearchQuery } from "@/context/search-query";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type { CardSet } from "@/lib/db";
import { countCardsFiltered, getCardsFiltered } from "@/lib/db/cards";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";

type CardsProps = {
    set: CardSet;
};

export function Cards({ set }: CardsProps) {
    const { search, sort, character, franchise, varieties, page, setPage } =
        useSearchQuery();

    const debouncedSearch = useDebouncedValue(search);

    const cards = useLiveQuery(async () => {
        const t1 = performance.now();

        const result = await getCardsFiltered(
            set.id,
            debouncedSearch,
            sort,
            {
                character,
                franchise,
                varieties,
            },
            page
        );

        console.log(
            `[DEBUG] Cards took ${performance.now() - t1}ms to query ${result.length} results.`
        );

        return result;
    }, [set, debouncedSearch, sort, character, franchise, varieties, page]);

    const count = useLiveQuery(
        () =>
            countCardsFiltered(set.id, debouncedSearch, {
                character,
                franchise,
                varieties,
            }),
        [set, debouncedSearch, character, franchise, varieties],
        0
    );

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, sort, character, franchise, varieties]);

    useEffect(() => {
        window.scroll(0, 0);
    }, [page]);

    return (
        <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-xs self-end">
                {count} results
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards?.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        set={set}
                    />
                ))}
            </div>
            <Pagination
                page={page}
                totalPages={Math.ceil((count || 1) / ITEMS_PER_PAGE)}
                onPageChange={setPage}
                className="self-center mt-4"
            />
        </div>
    );
}
