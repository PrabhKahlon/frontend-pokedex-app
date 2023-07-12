import { useIntersection } from "@mantine/hooks"
import { useEffect } from "react"
import { useFetchList } from "../hooks/useFetchList"
import { PokemonCard } from "./PokemonCard"

export default function PokedexHome() {
    // Use the custom hook to fetch a list of Pokemon, initially fetching 32 pokemon
    const { data, isLoading, fetchNextPage } = useFetchList(32)

    // Intersection observer to trigger fetching the next page when the last Pokemon card is in view
    const { ref: intersectionRef, entry } = useIntersection<HTMLDivElement>({
        root: null,
        rootMargin: "0px",
        threshold: 1,
    });

    // If the last Pokemon card is in view (i.e., intersecting), fetch the next page
    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage])

    // Flatten the data from all fetched pages into a single array
    const cards = data?.pages.flatMap((page) => page.results);

    // Loading placeholder
    function HomeLoading() {
        return (
            <div className="flex flex-1 align-middle items-center justify-center">
                <img className="w-40 h-40 mb-10 animate-bounce" src="/images/pokeball.svg" alt="Pokeball" ></img>
            </div>
        )
    }

    // Render the PokedexHome component
    return (
        <>
            {isLoading ? <HomeLoading /> :
                <div className="w-full text-center">
                    <div className="flex justify-center">
                        <img className="w-72 p-4" src="/images/pk-logo.png" alt="pokemon logo"></img>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center px-4">
                        {cards?.map((card, index) => {
                            if (index === cards.length - 1) {
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
                    </div>
                </div>
            }
        </>
    )
}
