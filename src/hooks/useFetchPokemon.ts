import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const FETCH_URL = "https://pokeapi.co/api/v2/pokemon/"

type PokemonAbility = {
    ability: { name: string, url: string },
    is_hidden: boolean,
    slot: number
}

type PokemonForms = {
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
    forms: [PokemonForms],
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

function simulateDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const useFetchPokemon = (pokemon: string | number) => {
    return useQuery({
        queryKey: ['pokemon: ', pokemon],
        queryFn: async () => {
            const { data } = await axios.get(FETCH_URL + pokemon)
            return data as PokemonData
        }
    })
}