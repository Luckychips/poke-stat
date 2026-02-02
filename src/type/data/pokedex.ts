export type PokeDex = {
    id: number;
    name: string;
    thumbnailUrl: string;
    url: string;
}

export type PokeAbility = {
    isHidden: boolean;
    name: string;
    summary: string;
    slot: number;
    apiUrl: string;
}

export type PokeSkillSet = {
    levelLearnedAt: number;
    name: string;
    skillType: string;
    damageType: string;
    versionGroup: string;
    url: string;
}
