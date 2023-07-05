import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

const FETCH_URL = "https://pokeapi.co/api/v2/pokemon?offset="

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

async function getPokemonList(nextPageUrl: string) {
    const { data } = await axios.get(nextPageUrl)
    return data as PokemonList
}

export const useFetchList = (numberPokemon: number) => {
    return useInfiniteQuery(['pokemonList'], ({ pageParam = FETCH_URL + "0&limit=" + numberPokemon}) => getPokemonList(pageParam), { 
        getNextPageParam: (lastPage) => {
            return lastPage.next
        }
    })
}