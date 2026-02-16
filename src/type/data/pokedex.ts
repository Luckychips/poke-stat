interface Expander {
    isVisibleTooltip: boolean;
}

export interface PokeDex extends Expander  {
    id: number;
    name: string;
    thumbnailUrl: string;
    url: string;
}

export interface PokeDexSkill extends Expander {
    id: number;
    name: string;
    url: string;
}

export interface PokeAbility extends Expander {
    isHidden: boolean;
    name: string;
    summary: string;
    slot: number;
    apiUrl: string;
}

export interface PokeSkillSet extends Expander {
    levelLearnedAt: number;
    name: string;
    summary: string;
    skillType: string;
    damageType: string;
    versionGroup: string;
    url: string;
}

export interface PokeItemSet extends Expander {
    name: string;
    summary: string;
    thumbnailUrl: string;
    category: string;
}
