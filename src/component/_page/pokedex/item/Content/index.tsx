'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, RadarChart } from "@/component";
import { ChartOptionProps } from "@/type/data/visualization";
import ContentHeader from "../ContentHeader";

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
        animations: {
            enabled: false,
        },
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        }
    },
    dataLabels: {
        enabled: true,
        background: {
            enabled: true,
        }
    },
    title: { text: "" },
    stroke: { width: 1 },
    fill: { opacity: 0.1 },
    markers: { size: 0 },
    yaxis: {
        tickAmount: 5,
        min: 0,
        max: 200,
    },
    xaxis: {
        categories: ["H", "A", "B", "S", "D", "C"]
    }
};

export default function Content() {
    const [title, setTitle] = useState("");
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

                setTitle(d.name);
                setRadarChartOptions(Object.assign(baseOptions, {
                    series: [{ data: stat }],
                }));
            }
        })();
    }, []);

    return (
        <section style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
            <div className="flex flex-col h-full">
                <ContentHeader title={title} />
                <ul className="grid grid-cols-5 gap-x-[36px]" style={{ marginBottom: 36 }}>
                    <li>
                        <Card style={{}}>
                            <div>123</div>
                        </Card>
                    </li>
                    <li>
                        <Card style={{}}>
                            <div>123</div>
                        </Card>
                    </li>
                    <li>
                        <Card style={{}}>
                            <div>123</div>
                        </Card>
                    </li>
                    <li>
                        <Card style={{}}>
                            <div>123</div>
                        </Card>
                    </li>
                    <li>
                        <Card style={{}}>
                            <div>123</div>
                        </Card>
                    </li>
                </ul>
                <div className="flex grow">
                    <Card classes="w-2/3" style={{ marginRight: 36 }}>
                        <div>123</div>
                    </Card>
                    <Card classes="w-1/3" style={{}}>
                        {radarChartOptions && <RadarChart options={radarChartOptions}/>}
                    </Card>
                </div>
            </div>
        </section>
    );
}
