import { cn } from "@/lib/utils";

type MaxWidthContainerProps = React.ComponentProps<"div">;

export function MaxWidthContainer({
    className,
    ...props
}: MaxWidthContainerProps) {
    return (
        <div
            className={cn("mx-auto max-w-7xl px-4", className)}
            {...props}
        />
    );
}
