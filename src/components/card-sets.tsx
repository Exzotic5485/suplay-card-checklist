import { CardSet } from "@/components/card-set";
import { getSets } from "@/lib/db/sets";
import { useLiveQuery } from "dexie-react-hooks";

export function CardSets() {
    const cardSets = useLiveQuery(() => getSets());

    if (!cardSets) return <div>Loading...</div>;

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cardSets.map((set) => (
                <CardSet
                    key={set.id}
                    set={set}
                />
            ))}
        </div>
    );
}
