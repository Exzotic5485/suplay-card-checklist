import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange?: (newPage: number) => void;
    className?: string;
};

export function Pagination({
    page,
    totalPages,
    className,
    onPageChange,
}: PaginationProps) {
    const pageNumbers = generatePageNumbers(page, totalPages);

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <PaginationButton
                variant="arrow"
                onClick={() => onPageChange?.(page - 1)}
            >
                <ChevronLeftIcon />
            </PaginationButton>
            {pageNumbers.map((p, i) => (
                <PaginationButton
                    key={i}
                    variant={p === page ? "active" : null}
                    onClick={
                        typeof p == "number"
                            ? () => onPageChange?.(p)
                            : undefined
                    }
                >
                    {p}
                </PaginationButton>
            ))}
            <PaginationButton
                variant="arrow"
                onClick={() => onPageChange?.(page + 1)}
            >
                <ChevronRightIcon />
            </PaginationButton>
        </div>
    );
}

const paginationButtonVariants = cva(
    "grid place-items-center h-7 min-w-7 px-0.5 border border-transparent rounded",
    {
        variants: {
            variant: {
                arrow: "text-primary",
                active: "border-primary text-primary",
            },
        },
    }
);

type PaginationButtonProps = React.ComponentPropsWithoutRef<"button"> &
    VariantProps<typeof paginationButtonVariants>;

export function PaginationButton({
    children,
    variant,
    ...props
}: PaginationButtonProps) {
    return (
        <button
            className={cn(
                paginationButtonVariants({
                    variant,
                })
            )}
            {...props}
        >
            {children}
        </button>
    );
}

function generatePageNumbers(currentPage: number, totalPages: number) {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            endPage = 4;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 3;
        }

        if (startPage > 2) {
            pages.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    return pages;
}
