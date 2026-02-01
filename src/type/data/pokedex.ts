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
