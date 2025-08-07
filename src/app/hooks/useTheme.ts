'use client'

import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark" | null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        setTheme(storedTheme || "light");
    }, []);

    useEffect(() => {
        if (theme) {
            const html = document.documentElement;
            html.setAttribute('data-theme', theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
}
