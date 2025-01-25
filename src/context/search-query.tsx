import { SortType } from "@/lib/constants";
import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";

type SearchQueryContextType = {
    search: string;
    sort: SortType;
    franchise: string;
    character: string;
    varieties: Set<string>;
    page: number;
    setFranchise: React.Dispatch<React.SetStateAction<string>>;
    setCharacter: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSort: React.Dispatch<React.SetStateAction<SortType>>;
    setVarieties: React.Dispatch<React.SetStateAction<Set<string>>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const SearchQueryContext = createContext<SearchQueryContextType | null>(null);

export function SearchQueryProvider({ children }: PropsWithChildren) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortType>(SortType.ATOZ);

    const [franchise, setFranchise] = useState("");
    const [character, setCharacter] = useState("");
    const [varieties, setVarieties] = useState<Set<string>>(new Set());

    const [page, setPage] = useState(1);

    return (
        <SearchQueryContext.Provider
            value={{
                search,
                sort,
                franchise,
                character,
                varieties,
                page,
                setSearch,
                setFranchise,
                setCharacter,
                setSort,
                setVarieties,
                setPage,
            }}
        >
            {children}
        </SearchQueryContext.Provider>
    );
}

export function useSearchQuery() {
    const context = useContext(SearchQueryContext);

    if (!context)
        throw new Error(
            "'useSearchQuery' must be wrapped in a 'SearchQueryProvider'."
        );

    return context;
}
