import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const FETCH_URL = "https://pokeapi.co/api/v2/pokemon-species/"

// Function to simulate delay
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function simulateDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Custom hook to fetch species details of a specific Pokemon from the PokeAPI
export const useFetchSpecies = (pokemon: string | number) => {
    return useQuery({
        queryKey: ['species: ', pokemon],
        queryFn: async () => {
            const { data } = await axios.get(FETCH_URL + pokemon)
            return data as any
        }
    })
}