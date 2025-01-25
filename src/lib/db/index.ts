import { syncDB } from "@/lib/db/sync";
import Dexie, { type EntityTable } from "dexie";

type CardSet = {
    id: string;
    name: string;
    image: string;
    horizontalVarieties: string[];
};

type Card = {
    id: string;
    setId: string;
    name: string;
    variety: string;
    serial: string;
    franchise: string;
};

const db = new Dexie("CardDatabase") as Dexie & {
    sets: EntityTable<CardSet, "id">;
    cards: EntityTable<Card, "id">;
};

db.version(1).stores({
    sets: "&id",
    cards: "&id, setId, name, variety, serial, franchise",
});

syncDB();

export type { CardSet, Card };
export { db };
