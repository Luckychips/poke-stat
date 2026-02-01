'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, RadarChart, ImageLoader } from "@/component";
import { POKEMON_STAT } from "@/core/value";
import type { ChartOptionProps } from "@/type/data/visualization";
import type { PokeAbility } from "@/type/data/pokedex";
import ContentHeader from "../ContentHeader";

const baseOptions = {
    series: [
        {
            name: "",
            data: []
        }
    ],
    chart: {
        height: 350,
        type: "radar",
        animations: {
            enabled: false,
        },
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        }
    },
    dataLabels: {
        enabled: true,
        background: {
            enabled: true,
        }
    },
    title: { text: "" },
    stroke: { width: 1 },
    fill: { opacity: 0.1 },
    markers: { size: 0 },
    yaxis: {
        tickAmount: 5,
        min: 0,
        max: 200,
    },
    xaxis: {
        categories: ["H", "A", "B", "S", "D", "C"]
    }
};

export default function Content() {
    const [dexId, setDexId] = useState(0);
    const [name, setName] = useState("");
    const [types, setTypes] = useState<string[]>([]);
    const [noProcessAbilities, setNoProcessAbilities] = useState<PokeAbility[]>([]);
    const [abilities, setAbilities] = useState<PokeAbility[]>([]);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [optionalDescription, setOptionalDescription] = useState("");
    const [radarChartOptions, setRadarChartOptions] = useState<ChartOptionProps | null>(null);
    const params = useParams<{ id: string }>();
    const id = params.id;

    const getTypes = (d: any) => {
        const array: string[] = [];
        d.types.map((t: any) => {
            array.push(t.type.name);
        });

        return array;
    }

    const getStats = (d: any) => {
        const array: Array<number> = Array(6);
        d.stats.map((s: any) => {
            switch (s.stat.name) {
                case POKEMON_STAT.HP.toLowerCase():
                    array[0] = s.base_stat;
                    break;
                case POKEMON_STAT.ATTACK.toLowerCase():
                    array[1] = s.base_stat;
                    break;
                case POKEMON_STAT.DEFENSE.toLowerCase():
                    array[2] = s.base_stat;
                    break;
                case POKEMON_STAT.SPEED.toLowerCase():
                    array[3] = s.base_stat;
                    break;
                case POKEMON_STAT.SPECIAL_DEFENSE.toLowerCase():
                    array[4] = s.base_stat;
                    break;
                case POKEMON_STAT.SPECIAL_ATTACK.toLowerCase():
                    array[5] = s.base_stat;
                    break;
            }
        });

        return array;
    }

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (r.status === 200) {
                const d = await r.json();
                setDexId(parseInt(id));
                setTypes(getTypes(d));
                const list: PokeAbility[] = [];
                d.abilities.map((a: any) => {
                    const o: PokeAbility = {
                        isHidden: a.is_hidden,
                        name: "",
                        summary: "",
                        slot: a.slot,
                        apiUrl: a.ability.url,
                    };

                    list.push(o);
                });
                setNoProcessAbilities(list);
                setRadarChartOptions(Object.assign(baseOptions, {
                    series: [{ data: getStats(d) }],
                }));
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            if (r.status === 200) {
                const d = await r.json();
                for (let i = 0; i < d.names.length; i++) {
                    if (d.names[i].language.name === "ko") {
                        setName(d.names[i].name);
                        break;
                    }
                }

                for (let i = 0; i < d.genera.length; i++) {
                    if (d.genera[i].language.name === "ko") {
                        setSummary(d.genera[i].genus);
                        break;
                    }
                }

                for (let i = 0; i < d.flavor_text_entries.length; i++) {
                    if (d.flavor_text_entries[i].language.name === "ko") {
                        setDescription(d.flavor_text_entries[i].flavor_text);
                        break;
                    }
                }

                for (let i = 0; i < d.flavor_text_entries.length; i++) {
                    if (d.flavor_text_entries[i].language.name === "en") {
                        setOptionalDescription(d.flavor_text_entries[i].flavor_text);
                        break;
                    }
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (noProcessAbilities.length) {
                const fetches = noProcessAbilities.map(async (ability) => {
                    const r = await fetch(ability.apiUrl);
                    if (r.status === 200) {
                        const json = await r.json();
                        for (let i = 0; i < json.flavor_text_entries.length; i++) {
                            if (json.flavor_text_entries[i].language.name === "ko") {
                                ability.summary = json.flavor_text_entries[i].flavor_text;
                                break;
                            }
                        }

                        for (let i = 0; i < json.names.length; i++) {
                            if (json.names[i].language.name === "ko") {
                                ability.name = json.names[i].name;
                                break;
                            }
                        }
                    }

                    return ability;
                });

                const settled = await Promise.allSettled(fetches);
                setAbilities(settled
                    .filter((r): r is PromiseFulfilledResult<PokeAbility> => r.status === "fulfilled")
                    .map(r => r.value));
            }
        })();
    }, [noProcessAbilities]);

    useEffect(() => {
        if (description.length <= 0 && optionalDescription.length > 0) {
            setDescription(optionalDescription);
        }
    }, [description, optionalDescription]);

    return (
        <section style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
            <div className="flex flex-col h-full">
                <ContentHeader dexId={dexId} name={name} types={types} />
                <Card style={{ marginBottom: 36 }}>
                    <div className="flex flex-row">
                        <p>
                            {dexId > 0 && (
                                <ImageLoader
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${dexId}.gif`}
                                    alt={name}
                                    width={45}
                                    height={45}
                                />
                            )}
                        </p>
                        <div className="max-w-3/5 flex flex-col mb-4 pl-4">
                            <span className="font-bold text-sm text-black">{summary}</span>
                            <ul className="flex flex-row" style={{ paddingBottom: 2 }}>
                                {abilities.map((a) => (
                                    <li key={`ability-list-item-${dexId}-${a.slot}`} className="mr-1">
                                        <span className={`text-xs text-black ${a.isHidden ? "font-bold" : ""}`}>{a.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <span className="text-xs text-black">{description}</span>
                        </div>
                    </div>
                </Card>
                <div className="flex grow">
                    <Card classes="w-2/3" style={{ marginRight: 36 }}>
                        <div>123</div>
                    </Card>
                    <Card classes="w-1/3" style={{}}>
                        {radarChartOptions && <RadarChart options={radarChartOptions}/>}
                    </Card>
                </div>
            </div>
        </section>
    );
}
