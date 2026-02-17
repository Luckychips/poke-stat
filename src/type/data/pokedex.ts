interface Expander {
    isVisibleTooltip: boolean;
}

//dex
export interface PokeDex extends Expander  {
    id: number;
    name: string;
    thumbnailUrl: string;
    url: string;
}

export interface PokeDexAbility extends Expander {
    isHidden: boolean;
    name: string;
    summary: string;
    slot: number;
    apiUrl: string;
}

export interface PokeDexSkillSet extends Expander {
    levelLearnedAt: number;
    name: string;
    summary: string;
    skillType: string;
    damageType: string;
    versionGroup: string;
    url: string;
}

export interface PokeDexItemSet extends Expander {
    name: string;
    summary: string;
    thumbnailUrl: string;
    category: string;
}

//skill
export interface PokeSkill extends Expander {
    id: number;
    name: string;
    url: string;
}
