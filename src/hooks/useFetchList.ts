import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

const FETCH_URL = "https://pokeapi.co/api/v2/pokemon?offset="

// Function to simulate delay
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function simulateDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to fetch a list of Pokemon from the PokeAPI
async function getPokemonList(nextPageUrl: string) {
    const { data } = await axios.get(nextPageUrl)
    return data as PokemonList
}

// Custom hook to fetch a list of Pokemon with infinite scrolling
export const useFetchList = (numberPokemon: number) => {
    return useInfiniteQuery(['pokemonList'], ({ pageParam = FETCH_URL + "0&limit=" + numberPokemon}) => getPokemonList(pageParam), { 
        // Determine the URL for the next page based on the 'next' property of the last page
        getNextPageParam: (lastPage) => {
            return lastPage.next
        }
    })
}
