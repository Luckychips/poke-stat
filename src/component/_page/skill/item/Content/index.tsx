'use client'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTypes } from "@/core/value";
import { Card, ContentHeader } from "@/component";
import type { PokeSkillSet } from "@/type/data/pokedex";

export default function Content() {
    const [skillSet, setSkillSet] = useState<PokeSkillSet | null>(null);
    const [currentType, setCurrentType] = useState("");
    const params = useParams<{ id: string }>();
    const apiTargetId = params.id;

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
                };

                const d = await r.json();
                for (let i = 0; i < d.names.length; i++) {
                    if (d.names[i].language.name === "ko") {
                        newData.name = d.names[i].name;
                        break;
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
                setSkillSet(newData);
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
                            name={skillSet.name}
                            types={[skillSet.skillType]}
                            currentType={currentType}
                            setCurrentType={(v: string) => setCurrentType(v)}
                        />
                        <div className="flex">
                            <Card classes="w-full" style={{ marginBottom: 36 }}>
                                <div className="flex flex-row">
                                    <div className="flex flex-col mb-4">
                                        <span className="font-bold text-sm text-black">{skillSet.summary}</span>
                                        {/*<span className="text-xs text-black">{description}</span>*/}
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="flex">
                            <ul className="w-full flex flex-row" style={{ paddingBottom: 2, marginBottom: 36 }}>
                                <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                    <Card>
                                        <span className="text-xs text-black">위력 : {skillSet.power}</span>
                                    </Card>
                                </li>
                                <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                    <Card>
                                        <span className="text-xs text-black">명중률 : {skillSet.accuracy ? skillSet.accuracy : "-"}</span>
                                    </Card>
                                </li>
                                <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                    <Card>
                                        <span className="text-xs text-black">크리티컬 확률 : {skillSet.criticalRatio}</span>
                                    </Card>
                                </li>
                                <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                    <Card>
                                        <span className="text-xs text-black">PP : {skillSet.pp} (최대 : {skillSet.pp + (skillSet.pp * 0.6)})</span>
                                    </Card>
                                </li>
                                <li className="w-1/5 relative mr-1" style={{ marginRight: 36 }}>
                                    <Card>
                                        <span className="text-xs text-black">우선도 : {skillSet.priority}</span>
                                    </Card>
                                </li>
                            </ul>
                        </div>
                        <div className="flex grow">
                            <Card>
                                <ul className="flex flex-row" style={{ paddingBottom: 2 }}>
                                    <li className="relative mr-1">
                                        <span className="text-xs text-black">위력 : {skillSet.power}</span>
                                    </li>
                                    <li className="relative mr-1">
                                        <span className="text-xs text-black">명중률 : {skillSet.accuracy ? skillSet.accuracy : "-"}</span>
                                    </li>
                                    <li className="relative mr-1">
                                        <span className="text-xs text-black">크리티컬 확률 : {skillSet.criticalRatio}</span>
                                    </li>
                                    <li className="relative mr-1">
                                        <span className="text-xs text-black">PP : {skillSet.pp}</span>
                                    </li>
                                    <li className="relative mr-1">
                                        <span className="text-xs text-black">우선도 : {skillSet.priority}</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
