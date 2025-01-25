import { CardSets } from "@/components/card-sets";
import { MaxWidthContainer } from "@/components/max-width-container";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <MaxWidthContainer className="px-4 py-8">
            <CardSets />
        </MaxWidthContainer>
    );
}
