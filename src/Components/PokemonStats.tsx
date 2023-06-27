import React, {useState, useEffect} from "react"

interface PokemonStatsProps {
    name: string;
    base_stat: number;
}

export default function PokemonStats({name, base_stat}: PokemonStatsProps) {
    const [loaded, setLoaded] = useState(false as boolean);

    useEffect(() => {
      setLoaded(true);
    }, [name])
    
    console.log(loaded);
    let widthFromStat = Math.round((base_stat/255 + Number.EPSILON) * 100).toString();
    return (
        <div className="flex flex-col first-letter:uppercase w-full">
            <h1 className="text-lg first-letter:uppercase">{name} : {base_stat}</h1>
            <div className="w-full rounded-full h-3 bg-gray-300 dark:bg-slate-600">
                <div className="rounded-full h-3 bg-black dark:bg-white transition-width" style={loaded ? {width: `${widthFromStat}%`} : {width: "0px"}}></div>
            </div>
        </div>
    )
}
