import React from "react";
import Navbar from "./Components/Navbar";
import PokedexHome from "./Components/PokedexHome";
import PokemonDetails from "./Components/PokemonDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="flex flex-col bg-white dark:bg-slate-800 w-screen h-full min-h-screen dark:text-white">
        <div><Navbar></Navbar></div>
        <Routes>
          <Route path="/" element={<PokedexHome />}></Route>
          <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
        </Routes>
      </div>
  );
}

export default App;
