import { ITEMS_PER_PAGE, SortType } from "@/lib/constants";
import { db, type Card } from "@/lib/db";
import type { Filters } from "@/lib/types";

export function getCards() {
    return db.cards.toArray();
}

export function getCardsForSet(setId: string) {
    return db.cards.where("setId").equals(setId).sortBy("name");
}

const formatForCompare = (str: string) => str.toLowerCase().replace(/ /g, "");
const includes = (a: string, b: string) =>
    formatForCompare(a).includes(formatForCompare(b));

function isCardValid(
    card: Card,
    setId: string,
    search: string,
    { franchise, character, varieties }: Filters
) {
    if (card.setId !== setId) return false;

    return (
        (franchise ? card.franchise === franchise : true) &&
        (character ? card.name === character : true) &&
        (varieties.size > 0 ? varieties.has(card.variety) : true) &&
        (search
            ? includes(card.name, search) ||
              includes(card.franchise, search) ||
              includes(card.id, search)
            : true)
    );
}

// TODO: db only supports one indexed where, so other checks are just JS filters / loops so very slow.
//       need to find most efficient way of querying, currently takes 100+ms but an indexed query takes ~ 0.2ms
export function getCardsFiltered(
    setId: string,
    search: string,
    sort: SortType,
    filters: Filters,
    page = 1,
    limit = ITEMS_PER_PAGE
) {
    const query = db.cards
        .orderBy("name")
        .filter((card) => isCardValid(card, setId, search, filters))
        .offset((page - 1) * limit)
        .limit(limit);

    if (sort === SortType.ZTOA) {
        query.reverse();
    }

    return query.toArray();
}

export function countCardsFiltered(
    setId: string,
    search: string,
    filters: Filters
) {
    return db.cards
        .where("setId")
        .equals(setId)
        .and((card) => isCardValid(card, setId, search, filters))
        .count();
}
