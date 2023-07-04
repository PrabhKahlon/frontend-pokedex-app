import React from "react"
import { useFetchList } from "../hooks/useFetchList"
import PokemonCard from "./PokemonCard"

export default function PokedexHome() {

    const { data, isLoading } = useFetchList(32)
    //console.log(data)

    function HomeLoading() {
        return(
            <div className="flex flex-1 align-middle items-center justify-center">
                <img className="w-40 h-40 mb-10 animate-bounce" src="/images/pokeball.svg" alt="Pokeball" ></img>
            </div>
        )
    }

    function PokemonList() {
        return(
            <>
                <div className="w-full text-center">
                    <h1 className="text-5xl m-6">All Pokemon</h1>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {data?.results.map((element, index) => {return (<PokemonCard key={index} name={element.name} url={element.url}/>)})}
                </div>
            </>
        )
    }

    return (
        <>
            {isLoading ? <HomeLoading/> : <PokemonList/>}
        </>
    )
}
