import { db, type Card } from "@/lib/db";

// TODO: need to change implementation of this to fetch from server. at the minute this is just to mock the data

async function isSynced() {
    const count = await db.cards.limit(1).count();

    return count > 0;
}
export async function syncDB() {
    const synced = await isSynced();

    if (synced) {
        console.log("[DB SYNC] Cards are already synced.");
        return;
    }

    const cardSets = await fetchCardSets();

    for (const [setId, set] of Object.entries(cardSets)) {
        await db.sets.add({
            id: setId,
            image: set.image,
            name: set.name,
            horizontalVarieties: set.horizontalVarieties,
        });

        await db.cards.bulkPut(
            set.cards.map((card) => ({
                ...card,
                setId,
            }))
        );
    }

    console.log("[DB SYNC] Succesfully synced.");
}

type CardSetResponse = {
    [key: string]: {
        name: string;
        image: string;
        horizontalVarieties: string[];
        cards: Omit<Card, "setId">[];
    };
};

async function fetchCardSets(): Promise<CardSetResponse> {
    const response = await fetch("/card-sets.json");

    if (response.status !== 200) {
        throw new Error("Failed to fetch card-sets.json");
    }

    return response.json();
}
