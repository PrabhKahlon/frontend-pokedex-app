import { forwardRef, useEffect } from "react"
import { useFetchPokemon } from "../hooks/useFetchPokemon"
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  url: string;
}

export const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(({ name, url }, ref) => {
  const pokemonTypeColours: { [key: string]: string } = {
    normal: "bg-[#a8a878]",
    fighting: "bg-[#c03028]",
    flying: "bg-[#a890f0]",
    poison: "bg-[#a040a0]",
    ground: "bg-[#e0c068]",
    rock: "bg-[#b8a038]",
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

  const { data, isLoading } = useFetchPokemon(name);

  let bgColour = "bg-gray-400";
  if (data?.types[0]?.type?.name) {
    bgColour = pokemonTypeColours[data.types[0].type.name]
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pokemon/" + data?.name);
    window.scrollTo(0, 0)
  }

  function CardLoading() {
    return (
      <>
        <div className="flex flex-col w-32">
          <h1 className="text-white first-letter:uppercase text-2xl font-bold ml-10"></h1>
          <h1 className="text-slate text-md ml-10"></h1>
        </div>
        <div className="bg-no-repeat flex w-32">
          <div className="h-32 w-32"></div>
        </div>
        <div className="bg-no-repeat flex flex-1 h-full w-10 opacity-50" style={{ WebkitMask: "url('/images/pokeball-outline.svg')", WebkitMaskSize: "cover", backgroundColor: "white" }}>
        </div>
      </>
    );
  }

  return (
    <div ref={ref} className={`transition-all duration-1000 cursor-pointer hover:scale-105 md:mx-4 w-full bg-no-repeat bg-right flex align-middle justify-center items-center h-40 ${bgColour} my-4 rounded-xl max-w-md ` + (isLoading ? "animate-pulse" : "")} onClick={isLoading ? () => { } : handleClick}>
      {isLoading ? <CardLoading /> :
        <>
          <div className="flex flex-col w-32">
            <h1 className="animate-fade-in fade-in text-white first-letter:uppercase text-2xl font-bold ml-10">{data?.name}</h1>
            <h1 className="animate-fade-in text-sm ml-10">#{data?.id}</h1>
          </div>
          <div className="bg-no-repeat flex w-32">
            <img className="animate-fade-in h-32 w-32 translate-x-16 z-10" src={data?.sprites.front_default} alt={`${name} front sprite`} />
          </div>
          <div className="bg-no-repeat flex flex-1 h-full w-10 opacity-50" style={{ WebkitMask: "url('/images/pokeball-outline.svg')", WebkitMaskSize: "cover", backgroundColor: "white" }}>
          </div>
        </>
      }
    </div>
  )
})
