'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTypes, getTypeTagColor, getTargetVersions } from "@/core/value";
import { Card, ContentHeader, GenerationTabs } from "@/component";
import type { PokeSkillSet, PokeSkillMachine } from "@/type/data/pokedex";
import LearnedDex from "../LearnedDex";

export default function Content() {
    const [skillSet, setSkillSet] = useState<PokeSkillSet | null>(null);
    const [jpSkillName, setJpSkillName] = useState("");
    const [enSkillName, setEnSkillName] = useState("");
    const [currentType, setCurrentType] = useState("");
    const [pokemonApiUrls, setPokemonApiUrls] = useState<string[]>([]);
    const [selectedGeneration, setSelectedGeneration] = useState(0);
    const [noProcessedSkillMachines, setNoProcessedSkillMachines] = useState<any[]>([]);
    const [skillMachines, setSkillMachines] = useState<PokeSkillMachine[]>([]);
    const params = useParams<{ id: string }>();
    const apiTargetId = params.id;

    console.log("check");
    useEffect(() => {
        (async () => {
            if (selectedGeneration) {
                setSkillMachines([]);
                let targetVersionTM = null;
                for (let i = 0; i < noProcessedSkillMachines.length; i++) {
                    const TM = noProcessedSkillMachines[i];
                    if (getTargetVersions(selectedGeneration).includes(TM.version_group.name)) {
                        targetVersionTM = TM;
                        break;
                    }
                }

                if (targetVersionTM) {
                    const r = await fetch(targetVersionTM.machine.url);
                    if (r.status === 200) {
                        const d = await r.json();
                        setSkillMachines([{
                            id: d.id,
                            name: d.item.name,
                            skillName: skillSet!.name,
                            versionGroup: d.version_group.name,
                        }]);
                    }
                }
            }
        })();
    }, [selectedGeneration]);

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/move/${apiTargetId}`);
            if (r.status === 200) {
                const newData = {
                    id: 0,
                    name: "",
                    summary: "",
                    power: 0,
                    accuracy: 0,
                    criticalRatio: 0,
                    pp: 0,
                    priority: 0,
                    targetPokemon: "",
                    skillType: "",
                    skillCategory: "",
                    damageCategory: "",
                };

                const d = await r.json();
                for (let i = 0; i < d.names.length; i++) {
                    const language = d.names[i].language.name;
                    const skillName = d.names[i].name;
                    if (language === "ja") {
                        setJpSkillName(skillName);
                        continue;
                    }

                    if (language === "en") {
                        setEnSkillName(skillName);
                        continue;
                    }

                    if (language === "ko") {
                        newData.name = skillName;
                    }
                }

                for (let i = 0; i < d.flavor_text_entries.length; i++) {
                    if (d.flavor_text_entries[i].language.name === "ko") {
                        newData.summary = d.flavor_text_entries[i].flavor_text;
                        break;
                    }
                }

                newData.id = parseInt(apiTargetId);
                newData.power = d.power;
                newData.accuracy = d.accuracy;
                newData.criticalRatio = d.meta.crit_rate;
                newData.pp = d.pp;
                newData.targetPokemon = d.target.name;
                newData.priority = d.priority;

                const retrieveTypes = getTypes(d);
                if (retrieveTypes.length) {
                    newData.skillType = retrieveTypes[0];
                }

                newData.skillCategory = d.meta.category.name;
                newData.damageCategory = d.damage_class.name;
                setCurrentType(newData.skillType);
                setSkillSet(newData);
                setNoProcessedSkillMachines(d.machines);
                setPokemonApiUrls(d.learned_by_pokemon.map((learned: any) => {
                    return learned.url;
                }));
            }
        })();
    }, []);

    return (
        <section style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
            <div className="flex flex-col h-full">
                {skillSet && (
                    <>
                        <ContentHeader
                            id={skillSet.id}
                            name={`${skillSet.name} [ ${jpSkillName}, ${enSkillName} ]`}
                            types={[skillSet.skillType]}
                            currentType={currentType}
                            setCurrentType={(v: string) => setCurrentType(v)}
                            damageType={skillSet.damageCategory}
                        />
                        <div className="flex">
                            <Card classes="w-full" style={{ marginBottom: 36 }}>
                                <div className="flex flex-row">
                                    <div className="flex flex-col mb-4">
                                        <p className="font-bold text-sm text-black">{skillSet.summary}</p>
                                        <div className="text-xs text-black">{skillSet.skillCategory}</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <ul className="w-full flex flex-row" style={{ paddingBottom: 2, marginBottom: 36 }}>
                            <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                <Card classes="flex" style={{ padding: "0 !important" }}>
                                    <div className="w-2/5 font-extrabold text-center text-xs text-white"
                                         style={{ padding: 18, backgroundColor: getTypeTagColor(currentType) }}>위력</div>
                                    <div className="w-3/5 font-thin text-center text-xs text-black" style={{ padding: 18 }}>
                                        {skillSet.power ? skillSet.power : 0}
                                    </div>
                                </Card>
                            </li>
                            <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                <Card classes="flex" style={{ padding: "0 !important" }}>
                                    <div className="w-2/5 font-extrabold text-center text-xs text-white"
                                         style={{ padding: 18, backgroundColor: getTypeTagColor(currentType) }}>명중률</div>
                                    <div className="w-3/5 font-thin text-center text-xs text-black" style={{ padding: 18 }}>
                                        {skillSet.accuracy ? skillSet.accuracy : "-"}
                                    </div>
                                </Card>
                            </li>
                            <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                <Card classes="flex" style={{ padding: "0 !important" }}>
                                    <div className="w-2/5 font-extrabold text-center text-xs text-white"
                                         style={{ padding: 18, backgroundColor: getTypeTagColor(currentType) }}>치명타</div>
                                    <div className="w-3/5 font-thin text-center text-xs text-black" style={{ padding: 18 }}>
                                        {skillSet.criticalRatio}
                                    </div>
                                </Card>
                            </li>
                            <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                <Card classes="flex" style={{ padding: "0 !important" }}>
                                    <div className="w-2/5 font-extrabold text-center text-xs text-white"
                                         style={{ padding: 18, backgroundColor: getTypeTagColor(currentType) }}>PP</div>
                                    <div className="w-3/5 font-thin text-center text-xs text-black" style={{ padding: 18 }}>
                                        {skillSet.pp} (최대 : {skillSet.pp + (skillSet.pp * 0.6)})
                                    </div>
                                </Card>
                            </li>
                            <li className="w-1/5 relative mr-1">
                                <Card classes="flex" style={{ padding: "0 !important" }}>
                                    <div className="w-2/5 font-extrabold text-center text-xs text-white"
                                         style={{ padding: 18, backgroundColor: getTypeTagColor(currentType) }}>우선도</div>
                                    <div className="w-3/5 font-thin text-center text-xs text-black" style={{ padding: 18 }}>
                                        {skillSet.priority}
                                    </div>
                                </Card>
                            </li>
                        </ul>
                        <div className="flex grow">
                            <Card classes="w-2/7" style={{ marginRight: 36 }}>
                                <p className="font-bold text-sm text-black">Learned By Pokemon</p>
                                <LearnedDex apiUrls={pokemonApiUrls} />
                            </Card>
                            <Card classes="w-5/7">
                                <GenerationTabs
                                    selected={selectedGeneration}
                                    onSelect={(selected: number) => setSelectedGeneration(selected)}
                                />
                                {skillMachines.map((machine) => {
                                    return (
                                        <div key={`machine-item-${machine.id}`} className="flex pt-4 pl-2">
                                            <span className="flex items-center justify-center w-[70px] px-2 py-1 mx-1 rounded-sm mr-4"
                                                  style={{ backgroundColor: getTypeTagColor(currentType) }}>
                                                <b className="text-white text-xs">{machine.name.toUpperCase()}</b>
                                            </span>
                                            <p>
                                                <span className="text-black text-xs">{machine.skillName}</span>
                                            </p>
                                        </div>
                                    );
                                })}
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
