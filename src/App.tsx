import React from "react";
import Navbar from "./Components/Navbar";
import PokedexHome from "./Components/PokedexHome";
import PokemonDetails from "./Components/PokemonDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // Define the main layout of the app
    <div className="flex flex-col bg-white dark:bg-slate-800 w-full h-full min-h-screen dark:text-white">
      <Navbar></Navbar>
      <Routes>
        {/* Routes for the homepage and specific pokemon */}
        <Route path="/" element={<PokedexHome />}></Route>
        <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
