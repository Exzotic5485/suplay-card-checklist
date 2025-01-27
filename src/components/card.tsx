import { Badge } from "@/components/ui/badge";
import { Card as CardComponent } from "@/components/ui/card";
import { isNumberedCard } from "@/lib/card";
import { IMAGE_SOURCE_URL } from "@/lib/constants";
import type { CardSet, Card as CardType } from "@/lib/db";
import { cn } from "@/lib/utils";

type CardProps = {
    card: CardType;
    set: CardSet;
};

export function Card({ card, set }: CardProps) {
    const isHorizontal = set.horizontalVarieties.includes(card.variety);

    return (
        <CardComponent className="flex flex-col w-full">
            <div className="relative flex flex-col rounded-t-[inherit] h-[510px] sm:h-[410px] overflow-hidden">
                {isNumberedCard(card.serial) && (
                    <Badge className="absolute left-1 bottom-1 rounded bg-gradient-to-br from-[#01aede] via-[#057d83] to-[#1f3e94]">
                        #/{card.serial}
                    </Badge>
                )}
                <img
                    src={`${IMAGE_SOURCE_URL}/${card.id}.png`}
                    loading="lazy"
                    className={cn("h-full w-full", {
                        "w-full h-auto my-auto": isHorizontal,
                    })}
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
