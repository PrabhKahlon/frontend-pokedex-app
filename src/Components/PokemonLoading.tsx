import React from "react"

export default function PokemonLoading() {
    return (
        <div className="flex flex-col">
            <div className="mt-3 mx-2 flex flex-col items-center border rounded-lg border-gray-400 max-w-screen-xl">
                <div className="animate-pulse flex flex-row items-center flex-wrap mt-4 p-2">
                    <h1 className="text-5xl first-letter:uppercase font-bold">Pokemon</h1>
                    <h2 className="text-3xl mt-3 ml-2">#0</h2>
                </div>
                <div className="border-b border-b-gray-400 w-4/5 mt-4"></div>
                <div className="animate-pulse my-8 w-64 h-64 rounded-full bg-gray-400 dark:bg-slate-600"></div>
                {/* <img className="w-80 h-80" src={data.sprites?.other["official-artwork"].front_default} alt={data.name}></img> */}
                <div className="flex flex-row items-center">
                    <div className={`animate-pulse text-white bg-gray-400 dark:bg-slate-600 text-center w-[90px] h-10 rounded-full px-4 py-2 first-letter:uppercase mx-1`}>
                    </div>
                </div>
                <div className="border-b border-b-gray-400 w-4/5 mt-6"></div>
                <div className="flex flex-col mt-4 p-2 items-start w-4/5">
                    <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                        <h1 className="text-lg first-letter:uppercase">Hp : 0</h1>
                        <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                            <div className="rounded-full h-3 bg-black dark:bg-white transition-width" style={{ width: "0px" }}></div>
                        </div>
                    </div>
                    <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                        <h1 className="text-lg first-letter:uppercase">Attack : 0</h1>
                        <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                        </div>
                    </div>
                    <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                        <h1 className="text-lg first-letter:uppercase">Defense : 0</h1>
                        <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                        </div>
                    </div>
                    <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                        <h1 className="text-lg first-letter:uppercase">Special-attack : 0</h1>
                        <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                        </div>
                    </div>
                    <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                        <h1 className="text-lg first-letter:uppercase">Special-defense : 0</h1>
                        <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                        </div>
                    </div>
                    <div className="animate-pulse flex flex-col first-letter:uppercase w-full">
                        <h1 className="text-lg first-letter:uppercase">Speed : 0</h1>
                        <div className="w-full rounded-full h-3 bg-gray-400 dark:bg-slate-600">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
