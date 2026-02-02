import { useEffect, useState } from "react";
import type { PokeSkillSet } from "@/type/data/pokedex";
import { getTypeTagColor, getDamageTagColor } from "@/core/value";

interface Props {
    skillSets: PokeSkillSet[];
}

export default function SkillSets({ skillSets } : Props) {
    const [translatedSkillSets, setTranslatedSkillSets] = useState<PokeSkillSet[]>([]);

    useEffect(() => {
        (async () => {
            if (skillSets.length) {
                const fetches = skillSets.map(async (skill) => {
                    const r = await fetch(skill.url);
                    if (r.status === 200) {
                        const json = await r.json();
                        console.log(json);
                        for (let i = 0; i < json.names.length; i++) {
                            if (json.names[i].language.name === "ko") {
                                skill.name = json.names[i].name;
                                break;
                            }
                        }

                        skill.skillType = json.type.name;
                        skill.damageType = json.damage_class.name;
                    }

                    return skill;
                });

                const settled = await Promise.allSettled(fetches);
                setTranslatedSkillSets(settled
                    .filter((r): r is PromiseFulfilledResult<PokeSkillSet> => r.status === "fulfilled")
                    .map(r => r.value));
            }
        })();
    }, [skillSets]);

    return (
        <ul className="h-[500px] overflow-y-auto pt-4 pl-2">
            {translatedSkillSets.map((skill) => (
                <li
                    key={`skill-set-item-${skill.levelLearnedAt}-${skill.name}-${skill.versionGroup}`}
                    className="flex items-center text-black py-1">
                    <div className="text-center" style={{ width: 48 }}>{skill.levelLearnedAt}</div>
                    <span className="flex items-center justify-center w-[70px] px-2 py-1 mx-1 rounded-sm mr-4"
                          style={{ backgroundColor: getTypeTagColor(skill.skillType) }}>
                        <b className="text-white text-xs">{skill.skillType}</b>
                    </span>
                    <span className="flex items-center justify-center w-[70px] px-2 py-1 mx-1 rounded-sm mr-4"
                          style={{ backgroundColor: getDamageTagColor(skill.damageType) }}>
                        <b className="text-white text-xs">{skill.damageType}</b>
                    </span>
                    <span className="text-xs">{skill.name}</span>
                </li>
            ))}
        </ul>
    );
}
