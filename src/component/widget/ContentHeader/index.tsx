'use client'
import { getTypeTagColor } from "@/core/value";

interface Props {
    id: number;
    name: string;
    types: string[];
    currentType: string;
    setCurrentType: (v: string) => void;
}

export default function ContentHeader({ id, name, types, currentType, setCurrentType }: Props) {
    return (
        <div className="relative">
            <div className="text-black ">
                <h1 className="font-bold pb-1">{id} Report</h1>
                <h2 className="flex items-center text-xs" style={{ marginBottom: 27 }}>
                    <span className="pr-2">{name}</span>
                    <ul className="flex">
                        {types.map((type) => (
                            <li
                                key={`id-${id}-type-${type}`}
                                className="px-2 py-1 mx-1 rounded-sm cursor-pointer"
                                style={{ backgroundColor: getTypeTagColor(type) }}
                                onClick={() => setCurrentType(type)}>
                                <b className="text-white">{type}</b>
                            </li>
                        ))}
                    </ul>
                </h2>
            </div>
        </div>
    );
}
