'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import type { PokeDex } from "@/type/pokedex";
import { Layout } from "@/component";

const limit = 20;

export default function Page() {
    const [offset, setOffset] = useState(0);
    const [list, setList] = useState<PokeDex[]>([]);
    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
            if (r.status === 200) {
                const d = await r.json();
                setList(d.results.map((item: any, index: number) => {
                    const id = (limit * offset) + (index + 1);
                    return {
                        id: id,
                        name: item.name,
                        thumbnailUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                        url: item.urlm
                    }
                }));
            }
        })();
    }, []);

    return (
        <Layout>
            <article>
                <ul>
                    {list.map((item, index) => {
                        return (
                            <li key={`poke-dex-list-${item.id}`} className="flex flex-row items-center">
                                <Image
                                    src={item.thumbnailUrl}
                                    alt={item.name}
                                    width={32}
                                    height={32}
                                    priority
                                />
                                <span className="text-black">{item.id}</span>
                                <span className="text-black">{item.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </article>
        </Layout>
    );
}
