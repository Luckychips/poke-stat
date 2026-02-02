import type { PokeSkillSet } from "@/type/data/pokedex";

interface Props {
    skillSets: PokeSkillSet[];
}

export default function SkillSets({ skillSets } : Props) {
    return (
        <ul className="pt-4 pl-2">
            {skillSets.map((skill) => (
                <li className="flex text-black">
                    <div className="text-center" style={{ width: 48 }}>{skill.levelLearnedAt}</div>
                    <span>{skill.name}</span>
                </li>
            ))}
        </ul>
    );
}
