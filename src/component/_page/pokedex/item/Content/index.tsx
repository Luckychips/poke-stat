'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RadarChart, Heatmap, Card, ImageLoader } from "@/component";
import { pokemonTypeList, POKEMON_STAT } from "@/core/value";
import type { ChartOptionProps } from "@/type/data/visualization";
import type { PokeDexAbility, PokeDexSkillSet } from "@/type/data/pokedex";
import ContentHeader from "../ContentHeader";
import GenerationTabs from "../GenerationTabs";
import SkillSets from "../SkillSets";
import ItemSets from "../ItemSets";

const baseOptions = {
    series: [
        {
            name: "",
            data: [],
        }
    ],
    chart: {
        height: 350,
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
        categories: [],
    }
};

export default function Content() {
    const [dexId, setDexId] = useState(0);
    const [name, setName] = useState("");
    const [types, setTypes] = useState<string[]>([]);
    const [currentType, setCurrentType] = useState("");
    const [noProcessAbilities, setNoProcessAbilities] = useState<PokeDexAbility[]>([]);
    const [abilities, setAbilities] = useState<PokeDexAbility[]>([]);
    const [noProcessSkills, setNoProcessSkills] = useState<any[]>([]);
    const [skillSets, setSkillSets] = useState<PokeDexSkillSet[]>([]);
    const [itemApis, setItemApis] = useState<{ name: string; url: string }[]>([]);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [optionalDescription, setOptionalDescription] = useState("");
    const [selectedGeneration, setSelectedGeneration] = useState(0);
    const [radarChartOptions, setRadarChartOptions] = useState<ChartOptionProps | null>(null);
    const [heatmapOptions, setHeatmapOptions] = useState<ChartOptionProps | null>(null);
    const params = useParams<{ id: string }>();
    const id = params.id;

    const onHoverAbility = (target: PokeDexAbility, isHover: boolean) => {
        setAbilities(prev => {
            return prev.map((item) => {
                return target.slot === item.slot ? {
                    ...item,
                    isVisibleTooltip: isHover,
                } : item;
            });
        });
    }

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

    const getTargetVersions = () => {
        let targetVersions: string[] = [];
        switch (selectedGeneration) {
            case 1:
                targetVersions = ["red-blue"];
                break;
            case 2:
                targetVersions = ["gold-silver"];
                break;
            case 3:
                targetVersions = ["ruby-sapphire"];
                break;
            case 4:
                targetVersions = ["diamond-pearl"];
                break;
            case 5:
                targetVersions = ["black-white"];
                break;
            case 6:
                targetVersions = ["x-y"];
                break;
            case 7:
                targetVersions = ["sun-moon"];
                break;
            case 8:
                targetVersions = ["sword-shield"];
                break;
            case 9:
                targetVersions = ["scarlet-violet"];
                break;
        }

        return targetVersions;
    }

    const getLevelUpSkills = (skills: any): PokeDexSkillSet[] => {
        /*
        1. red-blue, yellow
        2. gold-silver, crystal
        3. ruby-sapphire, emerald, firered-leafgreen, colosseum, xd
        4. diamond-pearl, platinum, heartgold-soulsilver
        5. black-white, black-2-white-2
        6. x-y, omega-ruby-alpha-sapphire
        7. sun-moon, ultra-sun-ultra-moon, lets-go-pikachu-lets-go-eevee
        8. sword-shield, the-isle-of-armor, the-crown-tundra, brilliant-diamond-shining-pearl, legends-arceus
        9. scarlet-violet, the-teal-mask, the-indigo-disk
         */
        const list = skills.filter((skill: any) => {
            let hasLevel = false;
            let hasVersion = false;
            for (let i = 0; i < skill.version_group_details.length; i++) {
                const detail = skill.version_group_details[i];
                if (detail.level_learned_at !== 0) {
                    hasLevel = true;
                }

                const versionName = detail.version_group.name.toLowerCase();
                if (getTargetVersions().includes(versionName)) {
                    hasVersion = true;
                }
            }

            return hasLevel && hasVersion;
        }).map((skill: any) => {
            let targetSkill = null;
            for (let i = 0; i < skill.version_group_details.length; i++) {
                const detail = skill.version_group_details[i];
                const versionName = detail.version_group.name.toLowerCase();
                if (detail.level_learned_at !== 0 && getTargetVersions().includes(versionName)) {
                    targetSkill = detail;
                }
            }

            const newSkill = {
                levelLearnedAt: 0,
                name: skill.move.name,
                summary: "",
                skillType: "",
                damageType: "",
                versionGroup: "",
                url: skill.move.url,
            };

            if (targetSkill) {
                newSkill.levelLearnedAt = targetSkill.level_learned_at;
                newSkill.versionGroup = targetSkill.version_group.name;
            }

            return newSkill;
        }).filter((skill: PokeDexSkillSet) => {
            return skill.levelLearnedAt !== 0;
        });

        return list.sort((a: PokeDexSkillSet, b: PokeDexSkillSet) => {
            return a.levelLearnedAt - b.levelLearnedAt;
        });
    }

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (r.status === 200) {
                const d = await r.json();
                const retrieveTypes = getTypes(d);
                setDexId(parseInt(id));
                setTypes(retrieveTypes);
                setItemApis(d.held_items.map((o: any) => {
                    return o.item;
                }));
                const list: PokeDexAbility[] = [];
                d.abilities.map((a: any) => {
                    const o: PokeDexAbility = {
                        isVisibleTooltip: false,
                        isHidden: a.is_hidden,
                        name: "",
                        summary: "",
                        slot: a.slot,
                        apiUrl: a.ability.url,
                    };

                    list.push(o);
                });
                setNoProcessSkills(d.moves);
                setNoProcessAbilities(list);
                const radarSeriesData = getStats(d);
                const radarSeriesDataMaxValue = Math.max(...radarSeriesData);
                let radarSeriesColor = "#000";
                if (retrieveTypes.length) {
                    setCurrentType(retrieveTypes[0]);
                    for (let i = 0; i < pokemonTypeList.length; i++) {
                        if (retrieveTypes[0] === pokemonTypeList[i].name.toLowerCase()) {
                            radarSeriesColor = pokemonTypeList[i].color;
                            break;
                        }
                    }
                }
                setRadarChartOptions({
                    ...baseOptions,
                    chart: {
                        ...baseOptions.chart,
                        type: "radar",
                    },
                    colors: [radarSeriesColor],
                    dataLabels: {
                        ...baseOptions.dataLabels,
                        style: {
                            colors: [radarSeriesColor],
                            fontWeight: 600,
                        },
                        formatter: (v: number) =>
                            v === radarSeriesDataMaxValue ? `★ ${v}` : `${v}`,
                    },
                    xaxis: {
                        categories: ["H", "A", "B", "S", "D", "C"],
                    },
                    series: [{ data: radarSeriesData }],
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const typeIds = Array.from({ length: 18 }, (_, i) => i + 1);
            const fetches = typeIds.map(async (id) => {
                const ratios = Array.from({ length: 18 }, () => 1);
                const r = await fetch(`https://pokeapi.co/api/v2/type/${id}`);
                if (r.status === 200) {
                    const d = await r.json();
                    const toDoubleDamages = d.damage_relations.double_damage_to;
                    const toHalfDamages = d.damage_relations.half_damage_to;
                    const toNoDamages = d.damage_relations.no_damage_to;
                    for (let i = 0; i < toDoubleDamages.length; i++) {
                        const split = toDoubleDamages[i].url.split("/");
                        const targetIndex = split[split.length - 2] - 1;
                        ratios[targetIndex] = 2;
                    }

                    for (let i = 0; i < toHalfDamages.length; i++) {
                        const split = toHalfDamages[i].url.split("/");
                        const targetIndex = split[split.length - 2] - 1;
                        ratios[targetIndex] = 0.5;
                    }

                    for (let i = 0; i < toNoDamages.length; i++) {
                        const split = toNoDamages[i].url.split("/");
                        const targetIndex = split[split.length - 2] - 1;
                        ratios[targetIndex] = 0;
                    }
                }

                return ratios;
            });

            const settled = await Promise.allSettled(fetches);
            const damageRatios = settled
                .filter((r): r is PromiseFulfilledResult<number[]> => r.status === "fulfilled")
                .map(r => r.value);
            const updateRadios = pokemonTypeList.map((o, i) => {
                return {
                    name: o.name,
                    color: o.color,
                    damageRatio: damageRatios[i],
                };
            });
            const heatmapSeries = updateRadios.map((atk) => {
                return {
                    name: `ATK-${atk.name}`,
                    data: updateRadios.map((def, j) => ({
                        x: `DEF-${def.name}`,
                        y: atk.damageRatio[j],
                    })),
                };
            });

            setHeatmapOptions({
                chart: {
                    height: 450,
                    type: "heatmap",
                },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    heatmap: {
                        enableShades: false,
                        colorScale: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 0,
                                    color: "#0f172a",
                                },
                                {
                                    from: 0.01,
                                    to: 0.25,
                                    color: "#1e40af",
                                },
                                {
                                    from: 0.26,
                                    to: 0.5,
                                    color: "#60a5fa",
                                },
                                {
                                    from: 0.99,
                                    to: 1.01,
                                    color: "#e5e7eb",
                                },
                                {
                                    from: 1.5,
                                    to: 2.01,
                                    color: "#fb923c",
                                },
                                {
                                    from: 3.5,
                                    to: 4.01,
                                    color: "#dc2626",
                                },
                            ],
                        },
                    },
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                },
                series: heatmapSeries,
                title: { text: "Damage Relation" },
            });
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
                    .filter((r): r is PromiseFulfilledResult<PokeDexAbility> => r.status === "fulfilled")
                    .map(r => r.value));
            }
        })();
    }, [noProcessAbilities]);

    useEffect(() => {
        if (description.length <= 0 && optionalDescription.length > 0) {
            setDescription(optionalDescription);
        }
    }, [description, optionalDescription]);

    useEffect(() => {
        if (selectedGeneration > 0) {
            setSkillSets(getLevelUpSkills(noProcessSkills));
        }
    }, [selectedGeneration, noProcessSkills]);

    useEffect(() => {
        let radarSeriesColor = "#000";
        for (let i = 0; i < pokemonTypeList.length; i++) {
            if (currentType === pokemonTypeList[i].name.toLowerCase()) {
                radarSeriesColor = pokemonTypeList[i].color;
                break;
            }
        }

        if (radarChartOptions) {
            setRadarChartOptions({
                ...radarChartOptions,
                colors: [radarSeriesColor],
                dataLabels: {
                    ...radarChartOptions.dataLabels,
                    style: {
                        colors: [radarSeriesColor],
                        fontWeight: 600,
                    },
                },
            });
        }
    }, [currentType]);

    return (
        <section style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
            <div className="flex flex-col h-full">
                <ContentHeader
                    dexId={dexId}
                    name={name}
                    types={types}
                    currentType={currentType}
                    setCurrentType={(v: string) => setCurrentType(v)}
                />
                <div className="flex grow" style={{ marginBottom: 36 }}>
                    <Card classes="w-2/3" style={{ marginRight: 36 }}>
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
                                        <li key={`ability-list-item-${dexId}-${a.slot}`} className="relative mr-1">
                                        <span
                                            className={`text-xs text-black ${a.isHidden ? "font-bold" : ""}`}
                                            onMouseEnter={() => onHoverAbility(a, true)}
                                            onMouseOut={() => onHoverAbility(a, false)}>{a.name}</span>
                                            {a.isVisibleTooltip && (
                                                <span className="absolute z-10 whitespace-nowrap px-3 py-2 text-xs font-medium text-white bg-gray-800 rounded-sm shadow-xs">
                                                {a.summary}
                                            </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <span className="text-xs text-black">{description}</span>
                            </div>
                        </div>
                    </Card>
                    <Card classes="w-1/3">
                        <ItemSets data={itemApis} />
                    </Card>
                </div>
                <div className="flex grow">
                    <Card classes="w-2/5" style={{ marginRight: 36 }}>
                        <GenerationTabs
                            selected={selectedGeneration}
                            onSelect={(selected: number) => setSelectedGeneration(selected)}
                        />
                        {skillSets.length && <SkillSets skillSets={skillSets} />}
                    </Card>
                    <Card classes="w-2/5" style={{ marginRight: 36 }}>
                        {heatmapOptions && <Heatmap options={heatmapOptions} />}
                    </Card>
                    <Card classes="w-1/5" style={{}}>
                        {radarChartOptions && <RadarChart options={radarChartOptions}/>}
                    </Card>
                </div>
            </div>
        </section>
    );
}
