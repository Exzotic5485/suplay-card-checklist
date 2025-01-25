import { MaxWidthContainer } from "@/components/max-width-container";
import { Link } from "@tanstack/react-router";

type HeaderProps = {};

export function Header({}: HeaderProps) {
    return (
        <MaxWidthContainer className="py-2">
            <div className="border-b-2 border-primary">
                <Link
                    to="/"
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-indigo-400"
                >
                    Collectibles Checklist
                </Link>
            </div>
        </MaxWidthContainer>
    );
}
