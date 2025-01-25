import { Badge } from "@/components/ui/badge";
import { Card as CardComponent } from "@/components/ui/card";
import { isNumberedCard } from "@/lib/card";
import type { CardSet, Card as CardType } from "@/lib/db";

type CardProps = {
    card: CardType;
    set: CardSet;
};

export function Card({ card }: CardProps) {
    // const isRotated = set.horizontalVarieties.includes(card.variety);

    return (
        <CardComponent className="flex flex-col w-full">
            <div className="relative rounded-t-[inherit] sm:h-[408px] w-auto overflow-hidden">
                {isNumberedCard(card.serial) && (
                    <Badge className="absolute left-1 bottom-1 rounded">
                        #/{card.serial}
                    </Badge>
                )}
                <img
                    src={`/image/${card.id}.png`}
                    loading="lazy"
                    className="h-full w-full"
                />
            </div>
            <div className="text-center py-2">
                <p className="text-sm text-primary">{card.variety}</p>
                <p className="font-medium">{card.name}</p>
                <p className="text-muted-foreground">{card.franchise}</p>
                <p className="text-muted-foreground text-xs">{card.id}</p>
            </div>
        </CardComponent>
    );
}
