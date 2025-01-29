import { MaxWidthContainer } from "@/components/max-width-container";
import { Link } from "@tanstack/react-router";

export function Header() {
    return (
        <MaxWidthContainer className="pt-4">
            <div className="py-2 px-8 bg-card rounded-full border flex items-center">
                <Link
                    to="/"
                    className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary to-white/50 pr-4 border-r"
                >
                    Card Checklist
                </Link>
            </div>
        </MaxWidthContainer>
    );
}
