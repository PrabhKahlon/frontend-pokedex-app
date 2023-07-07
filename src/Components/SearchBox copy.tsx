import React, { useState, useRef } from "react"
import { Combobox } from "@headlessui/react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface SearchBoxProps {
    searchList: [Pokemon]
}

export default function SearchBox({ searchList }: SearchBoxProps) {
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [query, setQuery] = useState("")
    const parentRef = useRef(null)


    const filteredPokemon =
        query === ""
            ? searchList
            : searchList.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(query.toLowerCase())
            })

    const comboVirtualizer = useVirtualizer({
        count: filteredPokemon.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 55,
    });

    console.log(filteredPokemon);
    const virtualItems = comboVirtualizer.getVirtualItems();
    console.log(virtualItems);

    return (
        <div className="flex flex-col m-4">
            <Combobox value={selectedPokemon} onChange={setSelectedPokemon} >
                <Combobox.Input className={"flex-1 transition-all animate-fade-in placeholder:italic dark:bg-slate-900 placeholder:text-slate-400 block bg-white border border-slate-300 dark:border-slate-700 rounded-md py-3 p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a Pokemon" />
                <div className="relative">
                    <div className="mt-2 h-60 absolute z-10 w-full ring-opacity-5 focus:outline-none shadow-lg ring-1 ring-black overflow-auto rounded-md bg-white text-base" ref={parentRef}>
                        <Combobox.Options style={{height: comboVirtualizer.getTotalSize()}}>
                            {virtualItems.map((virtualItem: any) => {
                                return (
                                    <Combobox.Option
                                        key={virtualItem.key}
                                        style={{height: `${virtualItem.size}px`,transform: `translateY(${virtualItem.size})px`}}
                                        value={filteredPokemon[virtualItem.index].name}
                                        className={({ active }) => `first-letter:uppercase p-4 ${active ? "bg-slate-200 dark:hover:bg-slate-700 dark:bg-slate-900" : ""}`}
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
