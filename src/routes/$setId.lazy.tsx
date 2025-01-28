import { Cards } from "@/components/cards";
import { FiltersSidebar } from "@/components/filters-sidebar";
import { MaxWidthContainer } from "@/components/max-width-container";
import { SearchSort } from "@/components/search-sort";
import { SearchQueryProvider } from "@/context/search-query";
import { getSetById } from "@/lib/db/sets";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";

export const Route = createLazyFileRoute("/$setId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { setId } = Route.useParams();

    const set = useLiveQuery(() => getSetById(setId));

    if (!set) return null;

    return (
        <MaxWidthContainer className="py-8 space-y-8">
            <h1 className="text-4xl font-bold text-center">{set.name}</h1>
            <SearchQueryProvider>
                <div className="flex flex-col md:flex-row gap-4">
                    <FiltersSidebar set={set} />
                    <div className="flex-1 flex flex-col gap-6">
                        <SearchSort />
                        <Cards set={set} />
                    </div>
                </div>
            </SearchQueryProvider>
        </MaxWidthContainer>
    );
}
