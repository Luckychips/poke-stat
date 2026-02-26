'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useListPageStore } from "@/store/core";
import { baseChartOptions } from "@/core/value";
import { Card, ContentHeader, IncludedDex, RadarChart } from "@/component";
import type { ChartOptionProps } from "@/type/data/visualization";

export default function Content() {
    const { setCurrentPage } = useListPageStore();
    const [name, setName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [pokemonApiUrls, setPokemonApiUrls] = useState<string[]>([]);
    const [radarChartOptions, setRadarChartOptions] = useState<ChartOptionProps | null>(null);
    const params = useParams<{ id: string }>();
    const apiTargetId = params.id;

    useEffect(() => {
        (async () => {
            const berryFetcher = await fetch(`https://pokeapi.co/api/v2/berry/${apiTargetId}`);
            if (berryFetcher.ok) {
                const berryData = await berryFetcher.json();
                console.log(berryData.flavors)
                setRadarChartOptions({
                    ...baseChartOptions,
                    chart: {
                        ...baseChartOptions.chart,
                        type: "radar",
                    },
                    xaxis: {
                        categories: ["spicy", "dry", "sweet", "bitter", "sour"],
                    },
                    yaxis: {
                        tickAmount: 3,
                        min: 0,
                        max: 15,
                    },
                    series: [{ data: berryData.flavors.map((flavor: any) => flavor.potency) }],
                });

                const itemFetcher = await fetch(berryData.item.url);
                if (itemFetcher.ok) {
                    const itemData = await itemFetcher.json();
                    setCurrentPage(0);
                    setThumbnailUrl(itemData.sprites.default);
                    setPokemonApiUrls(itemData.held_by_pokemon.map((held: any) => {
                        return held.pokemon.url;
                    }));
                    for (let i = 0; i < itemData.names.length; i++) {
                        if (itemData.names[i].language.name === "ko") {
                            setName(itemData.names[i].name);
                            break;
                        }
                    }

                    for (let i = 0; i < itemData.flavor_text_entries.length; i++) {
                        if (itemData.flavor_text_entries[i].language.name === "ko") {
                            setSummary(itemData.flavor_text_entries[i].text);
                            break;
                        }
                    }
                }
            }
        })();
    }, []);

    return (
        <section style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
            <div className="flex flex-col h-full">
                <ContentHeader
                    id={parseInt(apiTargetId)}
                    name={name}
                    thumbnail={thumbnailUrl}
                    types={[]}
                />
                <div className="flex">
                    <Card classes="w-full" style={{ marginBottom: 36 }}>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p className="font-bold text-sm text-black">{summary}</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="flex grow">
                    <Card classes="w-3/5" style={{ marginRight: 36 }}>
                        <p className="font-bold text-sm text-black">Held By Pokemon</p>
                        <IncludedDex apiUrls={pokemonApiUrls} pageLimit={10} />
                    </Card>
                    <Card classes="w-2/5">
                        {radarChartOptions && <RadarChart options={radarChartOptions}/>}
                    </Card>
                </div>
            </div>
        </section>
    );
}
