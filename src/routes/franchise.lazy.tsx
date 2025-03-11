import { MaxWidthContainer } from "@/components/max-width-container";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IMAGE_SOURCE_URL } from "@/lib/constants";
import { db } from "@/lib/db";
import { getCharactersForSet } from "@/lib/db/sets";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";

export const Route = createLazyFileRoute("/franchise")({
    component: RouteComponent,
});

const FRANCHISES = [
    "Mickey and Friends",
    "The Little Mermaid",
    "Brave",
    "Mulan",
    "The Princess And The Frog",
    "Pocahontas",
    "Frozen",
    "Zootopia",
    "Winnie the Pooh",
    "The Lion King",
    "Big Hero 6",
    "Bambi",
    "Beauty And The Beast",
    "Alice In Wonderland",
    "Cinderella",
    "Tangled",
    "Snow White and the Seven Dwarfs",
    "Sleeping Beauty",
    "Dumbo",
    "Aladdin",
    "Peter Pan",
    "Pinocchio",
    "Wreck-It Ralph",
    "Encanto",
    "Moana",
    "Raya And The Last Dragon",
    "The Aristocata",
    "Jungle Book",
    "Lady And The Tramp",
    "Lilo & Stitch",
    "101 Dalmatians",
    "Wish",
    "Toy Story",
    "The Incredibles",
    "Cars",
    "Coco",
    "Up",
    "Soul",
    "Monsters University",
    "Monsters, Inc.",
    "Finding Nemo",
    "Wall-E",
    "Inside Out",
    "Inside Out 2",
    "Luca",
    "Onward",
    "Ratatouille",
    "Good Dinosaur",
    "Turning Red",
    "A Bug's Life",
    "Elemental",
];

function RouteComponent() {
    const characters = useLiveQuery(
        () => getCharactersForSet("disney-aura"),
        []
    );

    const handleExport = async () => {
        const cards = await db.cards
            .where("setId")
            .equals("disney-aura")
            .toArray();

        const json = JSON.stringify(
            cards.map((card) => ({ ...card, setId: undefined })),
            null,
            4
        );

        const a = document.createElement("a");

        a.href = URL.createObjectURL(new Blob([json], { type: "text/plain" }));
        a.download = "cards.json";

        a.click();
    };

    return (
        <MaxWidthContainer>
            <div className="flex flex-col gap-4">
                <Button onClick={handleExport}>Export</Button>
                {characters
                    ? characters.map((character) => (
                          <Character
                              key={character}
                              character={character}
                          />
                      ))
                    : "Loading..."}
            </div>
        </MaxWidthContainer>
    );
}

type CharacterProps = {
    character: string;
};

export function Character({ character }: CharacterProps) {
    const card = useLiveQuery(
        () => db.cards.where("name").equals(character).first(),
        [character]
    );

    const handleSelect = async (franchise: string) => {
        try {
            await db.cards.where({ name: character }).modify({
                franchise,
            });
            alert("DONE.");
        } catch {
            alert("Problems doing this.");
        }
    };

    return useMemo(
        () => (
            <div className="flex items-center gap-2">
                <img
                    src={`${IMAGE_SOURCE_URL}/${card?.id}.png`}
                    loading="lazy"
                    className="h-[510px] sm:h-[410px] w-auto"
                />
                <span>{character}</span>{" "}
                <Select value={card?.franchise} onValueChange={(v) => handleSelect(v)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {FRANCHISES.map((franchise) => (
                            <SelectItem key={franchise} value={franchise}>
                                {franchise}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        ),
        [character, card]
    );
}
