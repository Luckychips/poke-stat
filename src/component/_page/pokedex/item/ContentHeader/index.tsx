import { getTypeTagColor } from "@/core/value";

interface Props {
    dexId: number;
    name: string;
    types: string[];
}

export default function ContentHeader({ dexId, name, types }: Props) {
    return (
        <div className="relative">
            <div className="text-black ">
                <h1 className="font-bold pb-1">{dexId} Report</h1>
                <h2 className="flex items-center text-xs" style={{ marginBottom: 27 }}>
                    <span className="pr-2">{name}</span>
                    <ul className="flex">
                        {types.map((type) => (
                            <li
                                key={`id-${dexId}-type-${type}`}
                                className="px-2 py-1 mx-1 rounded-sm"
                                style={{ backgroundColor: getTypeTagColor(type) }}>
                                <b className="text-white">{type}</b>
                            </li>
                        ))}
                    </ul>
                </h2>
            </div>
        </div>
    );
}
