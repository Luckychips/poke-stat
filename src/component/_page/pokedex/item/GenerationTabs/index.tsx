'use client'
import { useEffect, useState } from "react";
import { mainThemeColor } from "@/core/theme";

interface Props {
    selected: number;
    onSelect: (selected: number) => void;
}

export default function GenerationTabs({ selected, onSelect }: Props) {
    const [generations, setGenerations] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            const r = await fetch("https://pokeapi.co/api/v2/generation");
            if (r.status === 200) {
                const d = await r.json();
                setGenerations(Array.from({ length: d.count }, (_, i) => i + 1));
                onSelect(d.count);
            }
        })();
    }, []);

    return (
        <ul className="flex flex-row text-black">
            {generations.map((n) => (
                <li
                    key={`generation-list-item-${n}`}
                    aria-selected={n === selected}
                    className={`cursor-pointer px-2 py-1 rounded-md text-sm ${n === selected ? "text-white" : "text-gray-800 hover:text-gray-300"}`}
                    style={{ backgroundColor: n === selected ? mainThemeColor : "" }}
                    onClick={() => {
                        if (n === selected) return;
                        onSelect(n);
                    }}>
                    <span>{n}세대</span>
                </li>
            ))}
        </ul>
    );
}
