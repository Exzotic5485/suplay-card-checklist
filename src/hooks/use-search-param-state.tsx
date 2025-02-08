import { useState } from "react";

type Value = string | number | string[] | Set<string>;

export function useSearchParamState<T extends Value>(
    key: string,
    defaultValue: T
) {
    const [value, setValue] = useState<T>(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const valueString = searchParams.get(key);

        if (!valueString) return defaultValue;

        switch (typeof defaultValue) {
            case "string":
                return valueString as T;
            case "number":
                return Number(valueString) as T;
            case "object":
                if (Array.isArray(defaultValue)) {
                    return valueString.split(",") as T;
                }

                return new Set(valueString.split(",")) as T;
        }
    });

    const handleSetValue: React.Dispatch<React.SetStateAction<T>> = (
        newValue
    ) => {
        const actualValue =
            typeof newValue === "function" ? newValue(value) : newValue;

        const url = new URL(window.location.href);

        switch (typeof actualValue) {
            case "string":
            case "number":
                if (
                    actualValue &&
                    (typeof actualValue == "number" ? actualValue > 1 : true)
                ) {
                    url.searchParams.set(key, String(actualValue));
                } else {
                    url.searchParams.delete(key);
                }
                break;
            case "object":
                const arr = Array.isArray(actualValue)
                    ? actualValue
                    : [...actualValue.values()];

                if (arr.length > 0) {
                    url.searchParams.set(key, arr.join(","));
                } else {
                    url.searchParams.delete(key);
                }

                break;
        }

        window.history.replaceState({}, "", url);

        setValue(actualValue);
    };

    return [value, handleSetValue] as const;
}
