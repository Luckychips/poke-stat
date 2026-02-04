import { useEffect, useState } from "react";
import type {PokeAbility, PokeSkillSet} from "@/type/data/pokedex";
import { getTypeTagColor, getDamageTagColor } from "@/core/value";

interface Props {
    skillSets: PokeSkillSet[];
}

export default function SkillSets({ skillSets } : Props) {
    const [translatedSkillSets, setTranslatedSkillSets] = useState<PokeSkillSet[]>([]);

    const onHoverSkillSet = (target: PokeSkillSet, isHover: boolean) => {
        setTranslatedSkillSets(prev => {
            return prev.map((item) => {
                const isMatchedSkill = target.name === item.name &&
                    target.skillType === item.skillType &&
                    target.damageType === item.damageType &&
                    target.versionGroup === item.versionGroup;

                return isMatchedSkill ? {
                    ...item,
                    isVisibleTooltip: isHover,
                } : item;
            });
        });
    }

    useEffect(() => {
        (async () => {
            if (skillSets.length) {
                const fetches = skillSets.map(async (skill) => {
                    const r = await fetch(skill.url);
                    if (r.status === 200) {
                        const json = await r.json();
                        for (let i = 0; i < json.names.length; i++) {
                            if (json.names[i].language.name === "ko") {
                                skill.name = json.names[i].name;
                                break;
                            }
                        }

                        for (let i = 0; i < json.flavor_text_entries.length; i++) {
                            if (json.flavor_text_entries[i].language.name === "ko") {
                                skill.summary = json.flavor_text_entries[i].flavor_text;
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
        <ul className="h-[410px] overflow-y-auto pt-4 pl-2">
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
                    <p>
                        <span
                            className="text-xs"
                            onMouseEnter={() => onHoverSkillSet(skill, true)}
                            onMouseOut={() => onHoverSkillSet(skill, false)}>{skill.name}</span>
                        {skill.isVisibleTooltip && (
                            <span className="absolute z-10 whitespace-nowrap px-3 py-2 text-xs font-medium text-white bg-gray-800 rounded-sm shadow-xs">
                                {skill.summary}
                            </span>
                        )}
                    </p>
                </li>
            ))}
        </ul>
    );
}
