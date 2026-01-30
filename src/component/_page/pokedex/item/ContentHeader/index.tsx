import { typeSteelColor, typeFairyColor, typePsychicColor } from "@/core/theme";

interface Props {
    name: string;
    types: string[];
}

export default function ContentHeader({ name, types }: Props) {
    const getTypeTagColor = (type: string) => {
        let color = "";
        switch (type) {
            case "steel":
                color = typeSteelColor;
                break;
            case "fairy":
                color = typeFairyColor;
                break;
            case "psychic":
                color = typePsychicColor;
        }

        return color;
    };

    return (
        <div className="relative">
            <div className="text-black ">
                <h1 className="font-bold pb-1">Report</h1>
                <h2 className="flex items-center text-xs" style={{ marginBottom: 27 }}>
                    <span className="pr-2">{name}</span>
                    <ul className="flex">
                        {types.map((type) => (
                            <li className="px-2 py-1 mx-1 rounded-sm" style={{ backgroundColor: getTypeTagColor(type) }}>
                                <b className="text-white">{type}</b>
                            </li>
                        ))}
                    </ul>
                </h2>
            </div>
        </div>
    );
}
