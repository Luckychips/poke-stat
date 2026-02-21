'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTypes, getTypeTagColor, getTargetVersions } from "@/core/value";
import { Card, ContentHeader } from "@/component";

export default function Content() {
    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const params = useParams<{ id: string }>();
    const apiTargetId = params.id;

    useEffect(() => {
        (async () => {
            const berryFetcher = await fetch(`https://pokeapi.co/api/v2/berry/${apiTargetId}`);
            if (berryFetcher.status === 200) {
                const berryData = await berryFetcher.json();
                const itemFetcher = await fetch(berryData.item.url);
                if (itemFetcher.status === 200) {
                    const itemData = await itemFetcher.json();
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
            </div>
        </section>
    );
}
