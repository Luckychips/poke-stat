'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useListPageStore } from "@/store/core";
import { ImageLoader, Pagination } from "@/component";
import type { DexListItem } from "@/type/data/pokedex";

const limit = 15;

export default function Content() {
    const router = useRouter();
    const { currentPage, setCurrentPage } = useListPageStore();
    const [list, setList] = useState<DexListItem[]>([]);
    const [itemTotalCount, setItemTotalCount] = useState(0);

    const doFetch = useCallback(async () => {
        const offset = (currentPage - 1) * limit;
        const r = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
        if (r.ok) {
            const d = await r.json();
            if (d.results.length) {
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
        }
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        (async () => {
            await doFetch();
        })();
    }, [doFetch]);

    return (
        <section className="w-19/20 min-w-19/20 h-screen bg-gray-100" style={{ minWidth: 1100 }}>
            <article className="bg-white shadow-sm rounded-lg" style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
                <div className="relative flex flex-col h-full p-4">
                    <article>
                        <ul>
                            {list.map((item, index) => {
                                return (
                                    <li key={`poke-dex-list-${item.id}`} className="flex flex-row items-center p-1">
                                        <span className="text-black text-center pr-4" style={{ minWidth: 32 }}>{item.id}</span>
                                        {item.thumbnailUrl && <ImageLoader src={item.thumbnailUrl} alt={item.name} />}
                                        <span
                                            className="text-black pl-4 cursor-pointer"
                                            onClick={() => router.push(`/pokedex/${item.id}`)}>
                                    {item.name}
                                </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <Pagination itemTotalCount={itemTotalCount} pageLimit={limit} />
                    </article>
                </div>
            </article>
        </section>
    );
}
