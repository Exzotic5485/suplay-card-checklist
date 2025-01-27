import { Card, CardContent } from "@/components/ui/card";
import { IMAGE_SOURCE_URL } from "@/lib/constants";
import type { CardSet } from "@/lib/db";
import { Link } from "@tanstack/react-router";

type CardSetProps = {
    set: CardSet;
};

export function CardSet({ set }: CardSetProps) {
    return (
        <Link
            to="/$setId"
            params={{ setId: set.id }}
        >
            <Card className="h-full">
                <img
                    src={IMAGE_SOURCE_URL + set.image}
                    className="rounded-t-[inherit] w-full h-auto"
                />
                <CardContent className="py-4">
                    <p className="text-center text-xl font-semibold">
                        {set.name}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
