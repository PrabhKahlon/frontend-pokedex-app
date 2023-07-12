import React, { useState, useRef } from "react"
import { Combobox } from "@headlessui/react";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import { useNavigate } from "react-router-dom";

interface SearchBoxProps {
    searchList: [Pokemon]
}

export default function SearchBox({searchList }: SearchBoxProps) {
    // Local state to hold the selected Pokemon and the search query
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [query, setQuery] = useState("")

    const parentRef = useRef(null)
    const navigate = useNavigate()

    // Function to navigate to the selected Pokemon's details page
    function goToPokemon(name: string) {
        setSelectedPokemon(name)
        navigate("/pokemon/" + name)
        window.scrollTo(0, 0)
    }

    // Filter the Pokemon list based on the search query
    const filteredPokemon =
        query === ""
            ? searchList
            : searchList.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(query.toLowerCase())
            })

    // Initialize a virtualizer for the search results dropdown
    const comboVirtualizer = useVirtualizer({
        count: filteredPokemon.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 55,
        paddingStart: 16,
        paddingEnd: 16,
        overscan: 5,
    });

    // Get the virtual items for the search results dropdown
    const virtualItems = comboVirtualizer.getVirtualItems();

    // Render the SearchBox component
    // The search box includes an input field and a dropdown of search results
    // The dropdown uses virtualization for performance with large lists
    return (
        <div className="flex flex-col m-4">
            <Combobox value={selectedPokemon} onChange={goToPokemon} >
                <Combobox.Input className={`sm:pl-12 flex-1 animate-fade-in placeholder:italic dark:bg-slate-900 placeholder:text-slate-400 block bg-white border border-slate-300 dark:border-slate-700 rounded-md py-3 p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a Pokemon" />
                <div className="relative">
                    <div className="text-left mt-2 max-h-60 absolute z-10 w-full ring-opacity-5 focus:outline-none shadow-lg ring-1 ring-black overflow-auto rounded-md bg-white dark:bg-slate-900 text-base" ref={parentRef}>
                        <Combobox.Options className="relative w-full" style={{height: comboVirtualizer.getTotalSize()}}>
                            {virtualItems.map((virtualItem: any) => {
                                return (
                                    <Combobox.Option
                                        key={virtualItem.key}
                                        style={{height: `${virtualItem.size}px`, transform: `translateY(${virtualItem.start}px)`}}
                                        value={filteredPokemon[virtualItem.index].name}
                                        className={({ active }) => `absolute top-0 left-0 w-full p-4 first-letter:uppercase ${active ? "bg-slate-200 dark:bg-slate-700" : "bg-white dark:bg-slate-900"}`}
                                    >
                                        {filteredPokemon[virtualItem.index].name}
                                    </Combobox.Option>
                                )
                            })}
                        </Combobox.Options>
                    </div>
                </div>
            </Combobox>
        </div>
    )
}