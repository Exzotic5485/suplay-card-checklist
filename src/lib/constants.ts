export enum SortType {
    ATOZ = "ATOZ",
    ZTOA = "ZTOA",
    // VARIETY_ASCENDING = "VARIETY_ASCENDING",
    // VARIETY_DESCENDING = "VARIETY_DESCENDING",
}

export const SortTypeLabels: Record<SortType, string> = {
    ATOZ: "A-Z",
    ZTOA: "Z-A",
    // VARIETY_ASCENDING: "Variety Ascending",
    // VARIETY_DESCENDING: "Variety Descending",
};

export const ITEMS_PER_PAGE = 60;

export const IMAGE_SOURCE_URL = "https://checklist-images.exzotic.xyz";