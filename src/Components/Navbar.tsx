import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false)

  const FETCH_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"

    const { data: pokemonList, isLoading } = useQuery({
        queryKey: ['search'],
        queryFn: async () => {
            const { data } = await axios.get(FETCH_URL)
            return data as PokemonList
        }
    })

  const location = useLocation()
  const navigate = useNavigate()

  function goToHome() {
    navigate("/");
  }

  function showSearch() {
    setSearchVisible(!searchVisible)
  }

  return (
    <div className="sticky top-0 bg-white dark:bg-slate-800 z-20">
      <div className="flex flex-col">
        <div className="flex flex-1 flex-row justify-between items-center border-b border-b-gray-400 p-4">
          <div className="flex flex-row items-center" onClick={() => goToHome()}>
            {location?.pathname !== "/" && <IoArrowBackOutline className="w-8 h-8 md:w-12 md:h-12 mt-1"></IoArrowBackOutline>}
            <img className="w-10 h-10 md:w-14 md:h-14 mt-1" src="/images/pokeball.svg" alt="Pokeball" ></img>
            {location?.pathname === "/" && <h1 className="dark:text-white text-2xl ml-2">Pokédex</h1>}
          </div>
          <div className="flex flex-row text-right mr-4">
            <AiOutlineSearch className="block sm:hidden w-8 h-8 dark:fill-white-800" onClick={() => showSearch()}></AiOutlineSearch>
            <label className="relative hidden sm:block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-6 z-10">
                <AiOutlineSearch className="hidden sm:block w-6 h-6 md:w-8 md:h-8 fill-slate-800"></AiOutlineSearch>
              </span>
              {isLoading ? <></> : <SearchBox padding={12} searchList={pokemonList?.results!} />}
            </label>
            {/* 
          <input placeholder="Search for a Pokémon"></input> */}
          </div>
        </div>
        <div className={`${searchVisible ? "block" : "hidden"} sm:hidden`}>
          {isLoading ? <></> : <SearchBox searchList={pokemonList?.results!} />}
        </div>
      </div>
    </div>
  )
}
