'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useListPageStore } from "@/store/core";
import { Card, ContentHeader, IncludedDex } from "@/component";

export default function Content() {
    const { setCurrentPage } = useListPageStore();
    const [name, setName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [pokemonApiUrls, setPokemonApiUrls] = useState<string[]>([]);
    const params = useParams<{ id: string }>();
    const apiTargetId = params.id;

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/item/${apiTargetId}`);
            if (r.ok) {
                const d = await r.json();
                setCurrentPage(0);
                setThumbnailUrl(d.sprites.default);
                setPokemonApiUrls(d.held_by_pokemon.map((held: any) => {
                    return held.pokemon.url;
                }));
                for (let i = 0; i < d.names.length; i++) {
                    if (d.names[i].language.name === "ko") {
                        setName(d.names[i].name);
                        break;
                    }
                }

                for (let i = 0; i < d.flavor_text_entries.length; i++) {
                    if (d.flavor_text_entries[i].language.name === "ko") {
                        setSummary(d.flavor_text_entries[i].text);
                        break;
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
                    <Card classes="w-full">
                        <p className="font-bold text-sm text-black">Held By Pokemon</p>
                        <IncludedDex apiUrls={pokemonApiUrls} pageLimit={10} />
                    </Card>
                </div>
            </div>
        </section>
    );
}
