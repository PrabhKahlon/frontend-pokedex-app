import React from "react"
import { AiOutlineSearch } from "react-icons/ai";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center border-b border-b-gray-400 p-4">
        <div className="flex flex-row items-center">
            <img className="w-8 h-8 md:w-12 md:h-12 mt-1" src="/images/pokeball.svg" alt="Pokeball" ></img>
            <h1 className="dark:text-white text-2xl ml-2">Pokédex</h1>
        </div>
        <div className="text-right">
            <AiOutlineSearch className="w-6 h-6 md:w-10 md:h-10 mt-1 dark:text-white"></AiOutlineSearch>
        </div>
    </div>
  )
}
