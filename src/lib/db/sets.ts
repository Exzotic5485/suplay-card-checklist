import { db } from "@/lib/db";
import { getCardsForSet } from "@/lib/db/cards";

export function getSets() {
    return db.sets.toArray();
}

export function getSetById(id: string) {
    return db.sets.get(id);
}

export async function getFranchisesForSet(id: string) {
    const cards = await getCardsForSet(id);

    return Array.from(new Set(cards.map((card) => card.franchise)));
}

export async function getCharactersForSet(id: string) {
    const cards = await getCardsForSet(id);

    return Array.from(new Set(cards.map((card) => card.name)));
}

export async function getVarietiesForSet(id: string) {
    const cards = await getCardsForSet(id);

    return Array.from(new Set(cards.map((card) => card.variety)));
}
