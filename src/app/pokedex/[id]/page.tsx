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
                        thumbnailUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
                        url: item.urlm
                    }
                }));
            }
        })();
    }, []);

    return (
        <Layout>
            <article>hello world</article>
        </Layout>
    );
}
