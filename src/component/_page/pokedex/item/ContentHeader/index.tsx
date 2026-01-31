import { POKEMON_TYPE } from "@/core/value";
import {
    typeNormalColor,
    typeFightingColor,
    typeFlyingColor,
    typePoisonColor,
    typeGroundColor,
    typeRockColor,
    typeBugColor,
    typeGhostColor,
    typeSteelColor,
    typeFireColor,
    typeWaterColor,
    typeGrassColor,
    typeElectricColor,
    typePsychicColor,
    typeIceColor,
    typeDragonColor,
    typeDarkColor,
    typeFairyColor,
} from "@/core/theme";

interface Props {
    name: string;
    types: string[];
}

export default function ContentHeader({ name, types }: Props) {
    const getTypeTagColor = (type: string) => {
        let color = "";
        switch (type) {
            case POKEMON_TYPE.NORMAL.toLowerCase():
                color = typeNormalColor;
                break;
            case POKEMON_TYPE.FIGHTING.toLowerCase():
                color = typeFightingColor;
                break;
            case POKEMON_TYPE.FLYING.toLowerCase():
                color = typeFlyingColor;
                break;
            case POKEMON_TYPE.POISON.toLowerCase():
                color = typePoisonColor;
                break;
            case POKEMON_TYPE.GROUND.toLowerCase():
                color = typeGroundColor;
                break;
            case POKEMON_TYPE.ROCK.toLowerCase():
                color = typeRockColor;
                break;
            case POKEMON_TYPE.BUG.toLowerCase():
                color = typeBugColor;
                break;
            case POKEMON_TYPE.GHOST.toLowerCase():
                color = typeGhostColor;
                break;
            case POKEMON_TYPE.STEEL.toLowerCase():
                color = typeSteelColor;
                break;
            case POKEMON_TYPE.FIRE.toLowerCase():
                color = typeFireColor;
                break;
            case POKEMON_TYPE.WATER.toLowerCase():
                color = typeWaterColor;
                break;
            case POKEMON_TYPE.GRASS.toLowerCase():
                color = typeGrassColor;
                break;
            case POKEMON_TYPE.ELECTRIC.toLowerCase():
                color = typeElectricColor;
                break;
            case POKEMON_TYPE.PSYCHIC.toLowerCase():
                color = typePsychicColor;
                break;
            case POKEMON_TYPE.ICE.toLowerCase():
                color = typeIceColor;
                break;
            case POKEMON_TYPE.DRAGON.toLowerCase():
                color = typeDragonColor;
                break;
            case POKEMON_TYPE.DARK.toLowerCase():
                color = typeDarkColor;
                break;
            case POKEMON_TYPE.FAIRY.toLowerCase():
                color = typeFairyColor;
                break;
            case POKEMON_TYPE.STELLAR.toLowerCase():
                break;
            case POKEMON_TYPE.UNKNOWN.toLowerCase():
                break;
            case POKEMON_TYPE.SHADOW.toLowerCase():
                break;
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
