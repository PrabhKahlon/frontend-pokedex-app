import React, {useState, useEffect} from "react"

interface PokemonStatsProps {
    name: string;
    base_stat: number;
}

export default function PokemonStats({name, base_stat}: PokemonStatsProps) {
    let widthFromStat = Math.round((base_stat/255 + Number.EPSILON) * 100);
    
    interface AnimatedProps {
        duration?: number;
        value: number;
      };

    function AnimatedCounter({ value, duration = 1000 }: AnimatedProps) {
        const [count, setCount] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCount((prevCount) => Math.min(prevCount + 1, value));
            if (count === value) clearInterval(interval);
          }, duration / value);
          return () => clearInterval(interval);
        }, []);
        return <>{count}</>;
    }

    function AnimatedBar({ value, duration = 1000 }: AnimatedProps) {
        const [width, setWidth] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setWidth((prevWidth) => Math.min(prevWidth + value, value));
            if (width === value) clearInterval(interval);
          }, duration / value);
          return () => clearInterval(interval);
        }, []);
        return <div className={`rounded-full h-3 bg-black dark:bg-white transition-width duration-500`} style={{width: `${width}%`}}></div>;
    }

    return (
        <div className="flex flex-col first-letter:uppercase w-full">
            <h1 className="text-lg first-letter:uppercase">{name} : {<AnimatedCounter value={base_stat} duration={500}/>}</h1>
            <div className="w-full rounded-full h-3 bg-gray-300 dark:bg-slate-600">
               <AnimatedBar value={widthFromStat} duration={500}></AnimatedBar> 
            </div>
        </div>
    )
}
