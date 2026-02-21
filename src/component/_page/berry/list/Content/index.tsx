'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useListPageStore } from "@/store/core";
import { Pagination } from "@/component";
import type { DexListItem } from "@/type/data/pokedex";

const limit = 20;

export default function Content() {
    const router = useRouter();
    const { currentPage, setCurrentPage } = useListPageStore();
    const [list, setList] = useState<DexListItem[]>([]);
    const [itemTotalCount, setItemTotalCount] = useState(0);
    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        (async () => {
            const offset = (currentPage - 1) * limit;
            const r = await fetch(`https://pokeapi.co/api/v2/berry/?limit=${limit}&offset=${offset}`)
            if (r.status === 200) {
                const d = await r.json();
                setItemTotalCount(d.count);
                setList(d.results.map((item: any, index: number) => {
                    const parsed = item.url.split("/");
                    const id = parsed[parsed.length - 2];
                    return {
                        id: id,
                        name: item.name,
                        url: item.url,
                    }
                }));
            }
        })();
    }, [currentPage]);

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
                                        <span
                                            className="text-black pl-4 cursor-pointer"
                                            onClick={() => router.push(`/berry/${item.id}`)}>
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
