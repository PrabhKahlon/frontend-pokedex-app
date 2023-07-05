import React from "react"
import { useFetchPokemon } from "../hooks/useFetchPokemon"

interface EvolutionCardProps {
    name: string
}

export default function EvolutionCard({ name }: EvolutionCardProps) {
    const { data: pokemonData } = useFetchPokemon(name!);

    return (
        <div className="">
            <img src={pokemonData?.sprites["front_default"]} alt={name}></img>
        </div>
    )
}
