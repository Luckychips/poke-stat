'use client'
import { MouseEvent, useEffect, useState } from "react";
import { ImageLoader } from "@/component";
import type { PokeDexItemSet } from "@/type/data/pokedex";

type ItemApi = {
    name: string;
    url: string;
}

interface Props {
    data: ItemApi[];
}

export default function ItemSets({ data }: Props) {
    const [translatedItemSets, setTranslatedItemSets] = useState<PokeDexItemSet[]>([]);

    const onHoverItemSet = (e: MouseEvent<HTMLLIElement>, target: PokeDexItemSet, isHover: boolean) => {
        e.preventDefault();
        setTranslatedItemSets(prev => {
            return prev.map((item) => {
                const isMatchedSkill = target.name === item.name && target.category === item.category;
                return isMatchedSkill ? {
                    ...item,
                    isVisibleTooltip: isHover,
                } : item;
            });
        });
    }

    useEffect(() => {
        (async () => {
            if (data.length) {
                const fetches = data.map(async (api) => {
                    const itemSet: PokeDexItemSet = {
                        name: "",
                        summary: "",
                        thumbnailUrl: "",
                        category: "",
                        isVisibleTooltip: false,
                    }
                    const r = await fetch(api.url);
                    if (r.status === 200) {
                        const d= await r.json();
                        itemSet.thumbnailUrl = d.sprites.default;
                        itemSet.category = d.category.name;
                        for (let i = 0; i < d.names.length; i++) {
                            if (d.names[i].language.name === "ko") {
                                itemSet.name = d.names[i].name;
                                break;
                            }
                        }

                        for (let i = 0; i < d.flavor_text_entries.length; i++) {
                            if (d.flavor_text_entries[i].language.name === "ko") {
                                itemSet.summary = d.flavor_text_entries[i].text;
                                break;
                            }
                        }
                    }

                    return itemSet;
                });

                const settled = await Promise.allSettled(fetches);
                setTranslatedItemSets(settled
                    .filter((r): r is PromiseFulfilledResult<PokeDexItemSet> => r.status === "fulfilled")
                    .map(r => r.value));
            }
        })();
    }, [data]);

    return (
        <ul>
            {translatedItemSets.map((item) => {
                return (
                    <li
                        key={`item-set-item-${item.name}-${item.category}`}
                        className="flex items-center py-1"
                        onMouseEnter={(e) => onHoverItemSet(e, item, true)}
                        onMouseOut={(e) => onHoverItemSet(e, item, false)}>
                        <ImageLoader
                            src={item.thumbnailUrl}
                            alt={item.name}
                            width={30}
                            height={30}
                        />
                        <p className="pl-2 pointer-events-none">
                            <span className="text-xs text-black">{item.name}</span>
                            {item.isVisibleTooltip && (
                                <span className="absolute z-10 whitespace-nowrap px-3 py-2 text-xs font-medium text-white bg-gray-800 rounded-sm shadow-xs">
                                {item.summary}
                            </span>
                            )}
                        </p>
                    </li>
                );
            })}
        </ul>
    )
}
