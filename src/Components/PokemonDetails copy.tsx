import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonStats from "./PokemonStats";

interface PokemonDetailsProps {
    pokemonName: string;
}

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

export default function PokemonDetails({ pokemonName }: PokemonDetailsProps) {
    const [pokemonData, setPokemonData] = useState({} as PokemonData);
    const [loaded, setLoaded] = useState(false as boolean);

    useEffect(() => {
        setLoaded(false);
        fetchPokemonData(pokemonName);
    }, [pokemonName]);

    function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function fetchPokemonData(pokemonName: string) {
        try {
            await timeout(5000)
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            let data = response.data;
            console.log(data)
            setPokemonData(data);
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    }

    function PokemonCardLoading() {
        return (
            <div className="flex flex-col">
                <div className="mt-3 mx-2 flex flex-col items-center border rounded-lg border-gray-400 max-w-screen-xl">
                    <div className="animate-pulse flex flex-row items-center flex-wrap mt-4 p-2">
                        <h1 className="text-5xl first-letter:uppercase font-bold">Pokemon</h1>
                        <h2 className="text-3xl mt-3 ml-2">#0</h2>
                    </div>
                    <div className="border-b border-b-gray-400 w-4/5 mt-4"></div>
                    <div className="animate-pulse my-8 w-64 h-64 rounded-full bg-gray-400 dark:bg-slate-600"></div>
                    {/* <img className="w-80 h-80" src={pokemonData.sprites?.other["official-artwork"].front_default} alt={pokemonData.name}></img> */}
                    <div className="flex flex-row items-center">
                        <div className={`animate-pulse text-white bg-gray-400 dark:bg-slate-600 text-center w-[90px] h-11 rounded-full px-4 py-2 first-letter:uppercase mx-1`}>
                        </div>
                    </div>
                    <div className="border-b border-b-gray-400 w-4/5 mt-6"></div>
                    <div className="flex flex-col mt-4 p-2 items-start w-4/5">
                        <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                            <h1 className="text-lg first-letter:uppercase">HP : 0</h1>
                            <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            <div className="rounded-full h-3 bg-black dark:bg-white transition-width" style={{width: "0px"}}></div>
                            </div>
                        </div>
                        <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                            <h1 className="text-lg first-letter:uppercase">Attack : 0</h1>
                            <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            </div>
                        </div>
                        <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                            <h1 className="text-lg first-letter:uppercase">Defense : 0</h1>
                            <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            </div>
                        </div>
                        <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                            <h1 className="text-lg first-letter:uppercase">Special-Attack : 0</h1>
                            <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            </div>
                        </div>
                        <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                            <h1 className="text-lg first-letter:uppercase">Special-Defense : 0</h1>
                            <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            </div>
                        </div>
                        <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                            <h1 className="text-lg first-letter:uppercase">Speed : 0</h1>
                            <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function PokemonCard() {
        return (
            <div className="flex flex-col">
                <div className="mt-3 mx-2 flex flex-col items-center border rounded-lg border-gray-400 max-w-screen-xl">
                    <div className="flex flex-row items-center flex-wrap mt-4 p-2">
                        <h1 className="text-5xl first-letter:uppercase font-bold">{pokemonData.name}</h1>
                        <h2 className="text-3xl mt-3 ml-2">#{pokemonData.id}</h2>
                    </div>
                    <div className="border-b border-b-gray-400 w-4/5 mt-4"></div>
                    <img className="w-80" src={pokemonData.sprites?.other["official-artwork"].front_default} alt={pokemonData.name}></img>
                    <div className="flex flex-row items-center">
                        {pokemonData.types?.map((element, index) => { return <PokemonTypeBadge key={index} type={element.type.name}></PokemonTypeBadge> })}
                    </div>
                    <div className="border-b border-b-gray-400 w-4/5 mt-6"></div>
                    <div className="flex flex-col mt-4 p-2 items-start w-4/5">
                        {pokemonData.stats?.map((element, index) => { return (<PokemonStats key={index} name={element.stat.name} base_stat={element.base_stat}></PokemonStats>) })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {loaded ? <PokemonCard /> : <PokemonCardLoading />}
        </>
    )
}
