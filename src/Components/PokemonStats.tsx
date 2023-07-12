import React, { useState, useEffect } from "react"

interface PokemonStatsProps {
    name: string;
    base_stat: number;
}

export default function PokemonStats({ name, base_stat }: PokemonStatsProps) {
    // Calculate the width of the stat bar as a percentage of the maximum stat value (255)
    let widthFromStat = Math.round((base_stat / 255 + Number.EPSILON) * 100);

    interface AnimatedProps {
        duration?: number;
        value: number;
    };

    // Function component to animate a numeric counter from 0 to the given value
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

    // Function component to animate the width of a progress bar to the given percentage
    function AnimatedBar({ value, duration = 1000 }: AnimatedProps) {
        const [width, setWidth] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setWidth((prevWidth) => Math.min(prevWidth + value, value));
                if (width === value) clearInterval(interval);
            }, duration / value);
            return () => clearInterval(interval);
        }, []);
        return <div className={`rounded-full h-3 bg-black dark:bg-white transition-width duration-500`} style={{ width: `${width}%` }}></div>;
    }

    // Render the PokemonStats component
    // Display the stat name and an animated counter for the stat value
    // Display an animated progress bar for the stat value as a percentage of the maximum value
    return (
        <div className="flex flex-col first-letter:uppercase w-full">
            <h1 className="text-lg first-letter:uppercase">{name} : {<AnimatedCounter value={base_stat} duration={500} />}</h1>
            <div className="w-full rounded-full h-3 bg-gray-300 dark:bg-slate-600">
                <AnimatedBar value={widthFromStat} duration={500}></AnimatedBar>
            </div>
        </div>
    )
}

