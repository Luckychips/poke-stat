import {
    typeBugColor, typeDarkColor, typeDragonColor, typeElectricColor, typeFairyColor,
    typeFightingColor, typeFireColor,
    typeFlyingColor, typeGhostColor, typeGrassColor,
    typeGroundColor, typeIceColor,
    typeNormalColor,
    typePoisonColor, typePsychicColor,
    typeRockColor, typeSteelColor, typeWaterColor,
    damagePhysicalColor, damageSpecialColor, damageStatusColor,
} from "@/core/theme";

export const POKEMON_STAT = {
    HP: "HP",
    ATTACK: "ATTACK",
    DEFENSE: "DEFENSE",
    SPEED: "SPEED",
    SPECIAL_DEFENSE: "SPECIAL-DEFENSE",
    SPECIAL_ATTACK: "SPECIAL-ATTACK",
}

export const POKEMON_TYPE = {
    NORMAL: "NORMAL",
    FIGHTING: "FIGHTING",
    FLYING: "FLYING",
    POISON: "POISON",
    GROUND: "GROUND",
    ROCK: "ROCK",
    BUG: "BUG",
    GHOST: "GHOST",
    STEEL: "STEEL",
    FIRE: "FIRE",
    WATER: "WATER",
    GRASS: "GRASS",
    ELECTRIC: "ELECTRIC",
    PSYCHIC: "PSYCHIC",
    ICE: "ICE",
    DRAGON: "DRAGON",
    DARK: "DARK",
    FAIRY: "FAIRY",
    STELLAR: "STELLAR",
    UNKNOWN: "UNKNOWN",
    SHADOW: "SHADOW",
}



export const pokemonTypeList = [
    {
        name: POKEMON_TYPE.NORMAL,
        color: typeNormalColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.FIGHTING,
        color: typeFightingColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.FLYING,
        color: typeFlyingColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.POISON,
        color: typePoisonColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.GROUND,
        color: typeGroundColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.ROCK,
        color: typeRockColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.BUG,
        color: typeBugColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.GHOST,
        color: typeGhostColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.STEEL,
        color: typeSteelColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.FIRE,
        color: typeFireColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.WATER,
        color: typeWaterColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.GRASS,
        color: typeGrassColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.ELECTRIC,
        color: typeElectricColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.PSYCHIC,
        color: typePsychicColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.ICE,
        color: typeIceColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.DRAGON,
        color: typeDragonColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.DARK,
        color: typeDarkColor,
        damageRatio: [],
    },
    {
        name: POKEMON_TYPE.FAIRY,
        color: typeFairyColor,
        damageRatio: [],
    },
];

export const POKEMON_SKILL_DAMAGE_TYPE = {
    PHYSICAL: "PHYSICAL",
    SPECIAL: "SPECIAL",
    STATUS: "STATUS",
}

export const getTypeTagColor = (type: string) => {
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

export const getDamageTagColor = (type: string) => {
    let color = "";
    switch (type) {
        case POKEMON_SKILL_DAMAGE_TYPE.PHYSICAL.toLowerCase():
            color = damagePhysicalColor;
            break;
        case POKEMON_SKILL_DAMAGE_TYPE.SPECIAL.toLowerCase():
            color = damageSpecialColor;
            break;
        case POKEMON_SKILL_DAMAGE_TYPE.STATUS.toLowerCase():
            color = damageStatusColor;
            break;
    }

    return color;
};

export const getTypes = (d: any) => {
    const array: string[] = [];
    if (Array.isArray(d.types)) {
        d.types.map((t: any) => {
            array.push(t.type.name);
        });
    } else {
        array.push(d.type.name);
    }

    return array;
}

export const getTargetVersions = (selectedGeneration: number) => {
    let targetVersions: string[] = [];
    switch (selectedGeneration) {
        case 1:
            targetVersions = ["red-blue"];
            break;
        case 2:
            targetVersions = ["gold-silver"];
            break;
        case 3:
            targetVersions = ["ruby-sapphire"];
            break;
        case 4:
            targetVersions = ["diamond-pearl"];
            break;
        case 5:
            targetVersions = ["black-white"];
            break;
        case 6:
            targetVersions = ["x-y"];
            break;
        case 7:
            targetVersions = ["sun-moon"];
            break;
        case 8:
            targetVersions = ["sword-shield"];
            break;
        case 9:
            targetVersions = ["scarlet-violet"];
            break;
    }

    return targetVersions;
}

export const baseChartOptions = {
    series: [
        {
            name: "",
            data: [],
        }
    ],
    chart: {
        height: 350,
        animations: {
            enabled: false,
        },
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        }
    },
    dataLabels: {
        enabled: true,
        background: {
            enabled: true,
        }
    },
    title: { text: "" },
    stroke: { width: 1 },
    fill: { opacity: 0.1 },
    markers: { size: 0 },
    yaxis: {
        tickAmount: 5,
        min: 0,
        max: 200,
    },
    xaxis: {
        categories: [],
    }
}
