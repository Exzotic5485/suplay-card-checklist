import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, ms = 150) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), ms);

        return () => clearTimeout(timeout);
    }, [value, ms, setDebouncedValue]);

    return debouncedValue;
}
