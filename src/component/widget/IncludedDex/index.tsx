'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useListPageStore } from "@/store/core";
import { ImageLoader, Pagination } from "@/component";
import type { DexListItem } from "@/type/data/pokedex";

interface Props {
    apiUrls: string[];
    pageLimit: number;
}

export default function IncludedDex({ apiUrls, pageLimit = 8 }: Props) {
    const router = useRouter();
    const { currentPage, setCurrentPage } = useListPageStore();
    const [list, setList] = useState<DexListItem[]>([]);

    useEffect(() => {
        if (apiUrls.length) {
            setCurrentPage(1);
        }
    }, [apiUrls]);

    useEffect(() => {
        (async () => {
            const from = (currentPage - 1) * pageLimit;
            const to = ((currentPage - 1) * pageLimit) + pageLimit;
            const sliced = apiUrls.slice(from, to);
            const fetches = sliced.map(async (url) => {
                const dex: DexListItem = {
                    id: 0,
                    name: "",
                    thumbnailUrl: "",
                    url: url,
                    isVisibleTooltip: false,
                }

                const r = await fetch(url);
                if (r.status === 200) {
                    const d= await r.json();
                    dex.id = d.id;
                    dex.name = d.name;
                    dex.thumbnailUrl = d.sprites.front_default;
                }

                return dex;
            });

            const settled = await Promise.allSettled(fetches);
            setList(settled
                .filter((r): r is PromiseFulfilledResult<DexListItem> => r.status === "fulfilled")
                .map(r => r.value));
        })();
    }, [currentPage]);

    return (
        <div className="relative flex flex-col h-full p-4">
            <article>
                <ul>
                    {list.map((item, index) => {
                        return (
                            <li key={`poke-dex-list-${item.id}`} className="flex flex-row items-center p-1">
                                <span className="min-w-[45px] text-black text-center pr-4">{item.id}</span>
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
                <Pagination itemTotalCount={apiUrls.length} pageLimit={pageLimit} />
            </article>
        </div>
    );
}
