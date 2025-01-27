import { db, type Card } from "@/lib/db";
import sets from "@/assets/sets.json";

export async function syncDB() {
    const t1 = performance.now();

    for (const set of sets) {
        await syncSet(set.id, set.version);
    }

    console.log(`[DB SYNC] Succesfully synced in ${performance.now() - t1}ms.`);
}

async function syncSet(setId: string, version: number) {
    const setDB = await db.sets.get(setId);

    if (setDB && setDB.version >= version) {
        console.log(`[DB SYNC] ${setId} is up to date.`);
        return;
    }

    console.log(`[DB SYNC] Updating ${setId} to version ${version}.`);

    const { cards, ...set } = await fetchSet(setId);

    await db.transaction("rw", db.sets, db.cards, async () => {
        await db.sets.put({
            ...set,
            version,
        });

        await db.cards.bulkPut(
            cards.map((card) => ({ ...card, setId: set.id }))
        );
    });
}

type SetResponse = {
    id: string;
    name: string;
    image: string;
    horizontalVarieties: string[];
    cards: Omit<Card, "setId">[];
};

async function fetchSet(id: string): Promise<SetResponse> {
    const response = await fetch(`/set/${id}.json`);

    if (response.status !== 200) {
        throw new Error(`Failed to fetch set by id '${id}'`);
    }

    return response.json();
}

// type SetsResponse = {
//     id: string;
//     version: number;
// }[];

// async function fetchSets(): Promise<SetsResponse> {
//     const response = await fetch("/sets.json");

//     if (response.status !== 200) {
//         throw new Error("Failed to fetch sets.json");
//     }

//     return response.json();
// }
