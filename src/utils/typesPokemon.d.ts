type PokemonAbility = {
    ability: { name: string, url: string },
    is_hidden: boolean,
    slot: number
}

type Pokemon = {
    name: string,
    url: string
}

type PokemonStat = {
    base_stat: number,
    effort: number,
    stat: { name: string, url: string }
}

type PokemonType = {
    slot: number,
    type: { name: string, url: string }
}

type PokemonData = {
    abilities: [PokemonAbility],
    base_experience: number,
    forms: [Pokemon],
    game_indices: [{ game_index: number, version: { name: string, url: string } }],
    height: number,
    held_items: any,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: any,
    name: string,
    order: number,
    past_types: any,
    species: { name: string, url: string },
    sprites: any,
    stats: [PokemonStat],
    types: [PokemonType],
    weight: number
}

type PokemonList = {
    count: number
    next: string,
    previous: string,
    results: [Pokemon]
}