'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useListPageStore } from "@/store/core";
import type { PokeDex } from "@/type/pokedex";
import { Layout, Pagination, ImageLoader } from "@/component";

const limit = 15;

export default function Page() {
    const { currentPage, setCurrentPage } = useListPageStore();
    const [list, setList] = useState<PokeDex[]>([]);
    const [itemTotalCount, setItemTotalCount] = useState(0);
    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        (async () => {
            const offset = (currentPage - 1) * limit;
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
            if (r.status === 200) {
                const d = await r.json();
                setItemTotalCount(d.count);
                setList(d.results.map((item: any, index: number) => {
                    const id = offset + (index + 1);
                    return {
                        id: id,
                        name: item.name,
                        thumbnailUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                        url: item.url,
                    }
                }));
            }
        })();
    }, [currentPage]);

    return (
        <Layout>
            <article>
                <ul>
                    {list.map((item, index) => {
                        return (
                            <li key={`poke-dex-list-${item.id}`} className="flex flex-row items-center p-1">
                                <span className="text-black text-center pr-4" style={{ minWidth: 32 }}>{item.id}</span>
                                <ImageLoader src={item.thumbnailUrl} alt={item.name} />
                                <span className="text-black pl-4 cursor-pointer">{item.name}</span>
                            </li>
                        );
                    })}
                </ul>
                <Pagination itemTotalCount={itemTotalCount} pageLimit={limit} />
            </article>
        </Layout>
    );
}
