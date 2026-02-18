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
                    targetPokemon: "",
                    skillType: "",
                    skillCategory: "",
                };
                newData.id = parseInt(apiTargetId);
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

                newData.power = d.power;
                newData.accuracy = d.accuracy;
                newData.criticalRatio = d.meta.crit_rate;
                newData.pp = d.pp;
                newData.targetPokemon = d.target.name;

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
                        <div className="flex grow" style={{ marginBottom: 36 }}>
                            <Card classes="w-2/3" style={{ marginRight: 36 }}>
                                <div className="flex flex-row">
                                    <div className="max-w-3/5 flex flex-col mb-4">
                                        <span className="font-bold text-sm text-black">{skillSet.summary}</span>
                                        <ul className="flex flex-row" style={{ paddingBottom: 2 }}>
                                            <li className="relative mr-1">
                                                <span className="text-xs text-black">파워 : {skillSet.power}</span>
                                            </li>
                                            <li className="relative mr-1">
                                                <span className="text-xs text-black">정확도 : {skillSet.accuracy}</span>
                                            </li>
                                            <li className="relative mr-1">
                                                <span className="text-xs text-black">크리티컬 확률 : {skillSet.criticalRatio}</span>
                                            </li>
                                            <li className="relative mr-1">
                                                <span className="text-xs text-black">PP : {skillSet.pp}</span>
                                            </li>
                                        </ul>
                                        {/*<span className="text-xs text-black">{description}</span>*/}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
