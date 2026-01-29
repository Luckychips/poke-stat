'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChartOptionProps } from "@/type/visualization";
import { Layout, RadarChart } from "@/component";

const baseOptions = {
    series: [
        {
            name: "",
            data: []
        }
    ],
    chart: {
        height: 350,
        type: "radar",
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        }
    },
    title: { text: "" },
    stroke: { width: 2 },
    fill: { opacity: 0.1 },
    markers: { size: 0 },
    yaxis: { stepSize: 30 },
    xaxis: {
        categories: ["H", "A", "B", "S", "D", "C"]
    }
};

export default function Page() {
    const [radarChartOptions, setRadarChartOptions] = useState<ChartOptionProps | null>(null);
    const params = useParams<{ id: string }>();
    const id = params.id;

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            if (r.status === 200) {
                const d = await r.json();
                const stat: Array<number> = Array(6);
                d.stats.map((s: any) => {
                    switch (s.stat.name) {
                        case "hp":
                            stat[0] = s.base_stat;
                            break;
                        case "attack":
                            stat[1] = s.base_stat;
                            break;
                        case "defense":
                            stat[2] = s.base_stat;
                            break;
                        case "speed":
                            stat[3] = s.base_stat;
                            break;
                        case "special-defense":
                            stat[4] = s.base_stat;
                            break;
                        case "special-attack":
                            stat[5] = s.base_stat;
                            break;
                    }
                });

                setRadarChartOptions(Object.assign(baseOptions, {
                    series: [{ data: stat }],
                    title: { text: d.name }
                }));
            }
        })();
    }, []);

    return (
        <Layout>
            <article>
                {radarChartOptions && <RadarChart options={radarChartOptions}/>}
            </article>
        </Layout>
    );
}
