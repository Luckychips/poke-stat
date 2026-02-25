'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useListPageStore } from "@/store/core";
import { ImageLoader, Pagination } from "@/component";
import type { DexListItem } from "@/type/data/pokedex";

interface Props {
    prefix: string;
    pageLimit?: number;
}

export default function ContentList({ prefix, pageLimit = 15 }: Props) {
    const router = useRouter();
    const { currentPage, setCurrentPage } = useListPageStore();
    const [list, setList] = useState<DexListItem[]>([]);
    const [itemTotalCount, setItemTotalCount] = useState(0);

    const doFetch = useCallback(async () => {
        const offset = (currentPage - 1) * pageLimit;
        const r = await fetch(`https://pokeapi.co/api/v2/${prefix}/?limit=${pageLimit}&offset=${offset}`)
        if (r.ok) {
            const d = await r.json();
            if (d.results.length) {
                setItemTotalCount(d.count);
                setList(d.results.map((item: any) => {
                    const parsed = item.url.split("/");
                    const id = parsed[parsed.length - 2];
                    const newItem = {
                        id: id,
                        name: item.name,
                        thumbnailUrl: "",
                        url: item.url,
                    };

                    switch (prefix) {
                        case "pokemon":
                            newItem.thumbnailUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                            break;
                        case "item":
                            newItem.thumbnailUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`;
                            break;
                    }

                    return newItem;
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
                                        <span className="text-black text-center pr-4" style={{ minWidth: 70 }}>{item.id}</span>
                                        {item.thumbnailUrl && <ImageLoader src={item.thumbnailUrl} alt={item.name} />}
                                        <span
                                            className="text-black pl-4 cursor-pointer"
                                            onClick={() => {
                                                if (prefix === "pokemon") {
                                                    router.push(`/pokedex/${item.id}`);
                                                } else if (prefix === "move") {
                                                    router.push(`/skill/${item.id}`);
                                                } else {
                                                    router.push(`/${prefix}/${item.id}`)
                                                }
                                            }}>
                                    {item.name}
                                </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <Pagination itemTotalCount={itemTotalCount} pageLimit={pageLimit} />
                    </article>
                </div>
            </article>
        </section>
    );
}
