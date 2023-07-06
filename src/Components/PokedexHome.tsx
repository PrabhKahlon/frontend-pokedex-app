import { useIntersection } from "@mantine/hooks"
import React, { useRef, useEffect } from "react"
import { useFetchList } from "../hooks/useFetchList"
import { PokemonCard } from "./PokemonCard"

export default function PokedexHome() {
    const { data, isLoading, fetchNextPage } = useFetchList(32)

    const lastCardRef = useRef<HTMLDivElement>(null)
    const { ref: intersectionRef, entry } = useIntersection<HTMLDivElement>({
        root: null,
        rootMargin: "0px",
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage])

    const cards = data?.pages.flatMap((page) => page.results);

    function HomeLoading() {
        return (
            <div className="flex flex-1 align-middle items-center justify-center">
                <img className="w-40 h-40 mb-10 animate-bounce" src="/images/pokeball.svg" alt="Pokeball" ></img>
            </div>
        )
    }

    return (
        <>
            {isLoading ? <HomeLoading /> :
                <><div className="w-full text-center">
                    <h1 className="text-5xl m-6">All Pokemon</h1>
                </div>
                    <div className="flex flex-row flex-wrap justify-center px-4">
                        {cards?.map((card, index) => {
                            if (index === cards.length - 4) {
                                return (
                                    <PokemonCard
                                        key={index}
                                        ref={intersectionRef}
                                        name={card.name}
                                        url={card.url}
                                    />
                                );
                            } else {
                                return (
                                    <PokemonCard
                                        key={index}
                                        name={card.name}
                                        url={card.url}
                                    />
                                );
                            }
                        })}
                        <div />
                    </div></>
            }
        </>
    )
}
