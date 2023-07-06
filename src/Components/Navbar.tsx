import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)

  function goToHome() {
    navigate("/");
  }

  return (
    <div className="sticky top-0 bg-white dark:bg-slate-800 z-20">
      <div className="flex flex-row justify-between items-center border-b border-b-gray-400 p-4">
        <div className="flex flex-row items-center" onClick={() => goToHome()}>
          {location?.pathname !== "/" && <IoArrowBackOutline className="w-8 h-8 md:w-12 md:h-12 mt-1"></IoArrowBackOutline>}
          <img className="w-10 h-10 md:w-14 md:h-14 mt-1" src="/images/pokeball.svg" alt="Pokeball" ></img>
          {location?.pathname === "/" && <h1 className="dark:text-white text-2xl ml-2">Pokédex</h1>}
        </div>
        <div className="text-right">
          <AiOutlineSearch className="w-8 h-8 md:w-10 md:h-10 mt-1 dark:text-white"></AiOutlineSearch>
        </div>
      </div>
    </div>
  )
}
