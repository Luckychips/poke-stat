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
        damageRatio: [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1],
    },
    {
        name: POKEMON_TYPE.FIGHTING,
        color: typeFightingColor,
        damageRatio: [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5],
    },
    {
        name: POKEMON_TYPE.FLYING,
        color: typeFlyingColor,
        damageRatio: [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1],
    },
    {
        name: POKEMON_TYPE.POISON,
        color: typePoisonColor,
        damageRatio: [1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1,2],
    },
    {
        name: POKEMON_TYPE.GROUND,
        color: typeGroundColor,
        damageRatio: [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1],
    },
    {
        name: POKEMON_TYPE.ROCK,
        color: typeRockColor,
        damageRatio: [1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1],
    },
    {
        name: POKEMON_TYPE.BUG,
        color: typeBugColor,
        damageRatio: [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5],
    },
    {
        name: POKEMON_TYPE.GHOST,
        color: typeGhostColor,
        damageRatio: [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1],
    },
    {
        name: POKEMON_TYPE.STEEL,
        color: typeSteelColor,
        damageRatio: [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2],
    },
    {
        name: POKEMON_TYPE.FIRE,
        color: typeFireColor,
        damageRatio: [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1],
    },
    {
        name: POKEMON_TYPE.WATER,
        color: typeWaterColor,
        damageRatio: [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1],
    },
    {
        name: POKEMON_TYPE.GRASS,
        color: typeGrassColor,
        damageRatio: [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1],
    },
    {
        name: POKEMON_TYPE.ELECTRIC,
        color: typeElectricColor,
        damageRatio: [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1],
    },
    {
        name: POKEMON_TYPE.PSYCHIC,
        color: typePsychicColor,
        damageRatio: [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1],
    },
    {
        name: POKEMON_TYPE.ICE,
        color: typeIceColor,
        damageRatio: [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1],
    },
    {
        name: POKEMON_TYPE.DRAGON,
        color: typeDragonColor,
        damageRatio: [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0],
    },
    {
        name: POKEMON_TYPE.DARK,
        color: typeDarkColor,
        damageRatio: [1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5],
    },
    {
        name: POKEMON_TYPE.FAIRY,
        color: typeFairyColor,
        damageRatio: [1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1],
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
