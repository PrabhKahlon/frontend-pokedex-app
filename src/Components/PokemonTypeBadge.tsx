import React from "react"

interface PokemonTypeBadgeProps {
    type: string;
}

export default function PokemonTypeBadge({type}: PokemonTypeBadgeProps) {
    const pokemonTypeColours: {[key:string]: string} = {
        normal: "bg-[#a8a878]",
        fighting: "bg-[#c03028]",
        flying: "bg-[#a890f0]",
        poison: "bg-[#a040a0]",
        ground: "bg-[#e0c068]",
        rock : "bg-[#b8a038]",
        bug: "bg-[#a8b820]",
        ghost: "bg-[#705898]",
        steel: "bg-[#b8b8d0]",
        fire: "bg-[#f08030]",
        water: "bg-[#6890f0]",
        grass: "bg-[#78c850]",
        electric: "bg-[#f8d030]",
        psychic: "bg-[#f85888]",
        ice: "bg-[#98d8d8]",
        dragon: "bg-[#7038f8]",
        dark: "bg-[#705848]",
        fairy: "bg-[#ee99ac]",
    }

    let typeColour = pokemonTypeColours[type];

    return (
        <div className={`text-white ${typeColour} rounded-full px-4 py-2 first-letter:uppercase mx-1`}>
            {type}
        </div>
    )
}
