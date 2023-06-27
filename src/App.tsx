import React from "react";
import Navbar from "./Components/Navbar";
import PokemonDetails from "./Components/PokemonDetails";

function App() {
  return (
    <div className="bg-white dark:bg-slate-800 w-screen h-screen dark:text-white">
      <div><Navbar></Navbar></div>
      <PokemonDetails pokemonName="1"></PokemonDetails>
    </div>
  );
}

export default App;
