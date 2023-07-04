import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const FETCH_URL = "https://pokeapi.co/api/v2/pokemon?limit="

type Pokemon = {
    name: string,
    url: string
}

type PokemonList = {
    count: number
    next: string,
    previous: string,
    results: [Pokemon]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function simulateDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const useFetchList = (numberPokemon: number) => {
    return useQuery({
        queryKey: ['pokemonList:'],
        queryFn: async () => {
            //await simulateDelay(2000)
            const { data } = await axios.get(FETCH_URL + numberPokemon)
            return data as PokemonList
        }
    })
}