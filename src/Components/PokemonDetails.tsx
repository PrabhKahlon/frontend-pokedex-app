import React from "react";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonStats from "./PokemonStats";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import PokemonLoading from "./PokemonLoading";
import { useParams } from "react-router-dom";

export default function PokemonDetails() {
    const params = useParams()
    const pokemonName = params.id
    const { data, isLoading } = useFetchPokemon(pokemonName!);

    function PokemonCard() {
        return (
            <div className="flex flex-col flex-1">
                <div className="mt-3 mx-2 flex flex-col items-center border rounded-lg border-gray-400 max-w-screen-md lg:max-w-sm lg:h-full">
                    <div className="flex flex-row items-center flex-wrap mt-4 p-2">
                        <h1 className="text-5xl first-letter:uppercase font-bold">{data?.name}</h1>
                        <h2 className="text-3xl mt-3 ml-2">{`#${data?.id}`}</h2>
                    </div>
                    <div className="border-b border-b-gray-400 w-4/5 mt-4"></div>
                    <img className="transition-opacity w-80 h-80" src={data?.sprites.other["official-artwork"].front_default} alt={data?.name}></img>
                    <div className="flex flex-row items-center">
                        {data?.types.map((element, index) => { return <PokemonTypeBadge key={index} type={element.type.name}></PokemonTypeBadge> })}
                    </div>
                    <div className="border-b border-b-gray-400 w-4/5 mt-6"></div>
                    <div className="flex flex-col mt-4 p-2 items-start w-4/5">
                        {data?.stats.map((element, index) => { return (<PokemonStats key={index} name={element.stat.name} base_stat={element.base_stat}></PokemonStats>) })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {isLoading ? <PokemonLoading /> : <PokemonCard />}
        </>
    )
}
