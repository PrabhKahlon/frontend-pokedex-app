import React, { useState, useEffect } from "react";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonStats from "./PokemonStats";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import PokemonLoading from "./PokemonLoading";
import { useParams } from "react-router-dom";
import { useFetchSpecies } from "../hooks/useFetchSpecies";
import axios from "axios";
import { PokemonCard } from "./PokemonCard";

export default function PokemonDetails() {
    // Local state to hold the evolution chain
    const [evolutionChain, setEvolutionChain] = useState([] as any);

    // Get the Pokemon name from the URL parameters
    const params = useParams()
    const pokemonName = params.id

    // Use custom hooks to fetch details of a specific Pokemon and its species
    const pokemonData = useFetchPokemon(pokemonName!);
    const pokemonDetails = useFetchSpecies(pokemonName!);

    // When the species data is updated, fetch the evolution chain
    useEffect(() => {
        getEvolutionChain()
    }, [pokemonDetails.data])

    // Fetch the evolution chain data and store it in local state
    async function getEvolutionChain() {
        if (pokemonDetails.isLoading) {
            return
        }
        const { data } = await axios.get(pokemonDetails.data?.evolution_chain.url)
        let chainStart = data?.chain
        let evolutionChain = []
        console.log(chainStart)
        while (chainStart) {
            evolutionChain.push(chainStart.species.name);
            chainStart = chainStart.evolves_to[0];
        }
        setEvolutionChain(evolutionChain);
    }
    
    // Function component to render the full details of the Pokemon
    function DetailsCard() {
        // The card includes the Pokemon's image, types, stats, description,
        // ability, gender ratio, catch rate, egg groups, and evolution chain.
        // Each Pokemon in the evolution chain is rendered as a PokemonCard.
        return (
            <div className="flex flex-1 flex-row flex-wrap lg:px-32 justify-start">
                <div className="flex flex-col max-w-screen-lg lg:max-w-md w-full justify-start lg:mt-10">
                    <div className="mt-3 mx-2 flex flex-col items-center border rounded-lg border-gray-400 lg:pb-3">
                        <div className="flex flex-row items-center flex-wrap mt-4 p-2">
                            <h1 className="text-5xl first-letter:uppercase font-bold">{pokemonData.data?.name}</h1>
                            <h2 className="text-3xl mt-3 ml-2">{`#${pokemonData.data?.id}`}</h2>
                        </div>
                        <div className="border-b border-b-gray-400 w-4/5 mt-4"></div>
                        <img className="transition-opacity w-80 h-80" src={pokemonData.data?.sprites.other["official-artwork"].front_default} alt={pokemonData.data?.name}></img>
                        <div className="flex flex-row items-center">
                            {pokemonData.data?.types.map((element, index) => { return <PokemonTypeBadge key={index} type={element.type.name}></PokemonTypeBadge> })}
                        </div>
                        <div className="border-b border-b-gray-400 w-4/5 mt-6"></div>
                        <div className="flex flex-col mt-4 p-2 items-start w-4/5">
                            {pokemonData.data?.stats.map((element, index) => { return (<PokemonStats key={index} name={element.stat.name} base_stat={element.base_stat}></PokemonStats>) })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col items-start justify-start px-4 py-4 lg:pl-4 lg:pr-2 lg:mt-10">
                    <h1 className="text-3xl mb-4">Description</h1>
                    <p className="text-lg">{pokemonDetails.data?.flavor_text_entries.filter((entry: any) => entry.language.name === "en")[0].flavor_text}</p>
                    <h1 className="text-3xl my-4">Ability</h1>
                    <p className="text-lg first-letter:uppercase">{pokemonData.data?.abilities[0].ability.name}</p>
                    <h1 className="text-3xl my-4">Gender</h1>
                    <p className="text-lg">{100 - (pokemonDetails.data?.gender_rate / 8 * 100)}% Male | {pokemonDetails.data?.gender_rate / 8 * 100}% Female</p>
                    <h1 className="text-3xl my-4">Catch Rate</h1>
                    <p className="text-lg">{pokemonDetails.data?.capture_rate}/255</p>
                    <h1 className="text-3xl my-4">Egg Groups</h1>
                    {pokemonDetails.data?.egg_groups.map((element: any, index: any) => { return (<p key={index} className="text-lg first-letter:uppercase">{element.name}</p>) })}
                    <h1 className="text-3xl my-4">Evolution</h1>
                    <div className="flex flex-row flex-wrap w-full">
                        {evolutionChain.map((element: any, index: any) => { return (<PokemonCard key={index} name={element} url=""></PokemonCard>) })}
                    </div>
                </div>
            </div>
        )
    }

    // Render the PokemonDetails component
    // If the data is still loading, display the PokemonLoading component
    // If the data has loaded, display the DetailsCard component
    return (
        <>
            {pokemonData.isLoading ? <PokemonLoading /> : <DetailsCard />}
        </>
    )
}
