import React from "react"
import { useFetchList } from "../hooks/useFetchList"
import PokemonCard from "./PokemonCard"

export default function PokedexHome() {

    const { data, isLoading, fetchNextPage } = useFetchList(32)
    console.log(data?.pages[0])

    function testNext() {
        console.log("GO NEXT")
        fetchNextPage();
    }

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
                <div className="flex flex-row flex-wrap justify-center px-4">
                    {data?.pages.map((element, index) => element.results.map((element: any, index: any) => {return (<PokemonCard key={index} name={element.name} url={element.url}/>)}))}
                </div>
                <div className="text-2xl" onClick={() => {testNext()}}>LOAD MORE</div>
            </>
        )
    }

    return (
        <>
            {isLoading ? <HomeLoading/> : <PokemonList/>}
        </>
    )
}
