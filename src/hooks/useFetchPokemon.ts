import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const FETCH_URL = "https://pokeapi.co/api/v2/pokemon/"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function simulateDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const useFetchPokemon = (pokemon: string | number) => {
    return useQuery({
        queryKey: ['pokemon: ', pokemon],
        queryFn: async () => {
            //await simulateDelay(2000)
            const { data } = await axios.get(FETCH_URL + pokemon)
            return data as PokemonData
        }
    })
}