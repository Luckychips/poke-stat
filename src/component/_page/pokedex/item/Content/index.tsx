'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, RadarChart } from "@/component";
import { POKEMON_STAT } from "@/core/value";
import type { ChartOptionProps } from "@/type/data/visualization";
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
    const [dexId, setDexId] = useState(0);
    const [name, setName] = useState("");
    const [types, setTypes] = useState<string[]>([]);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [radarChartOptions, setRadarChartOptions] = useState<ChartOptionProps | null>(null);
    const params = useParams<{ id: string }>();
    const id = params.id;

    const getTypes = (d: any) => {
        const array: string[] = [];
        d.types.map((t: any) => {
            array.push(t.type.name);
        });

        return array;
    }

    const getStats = (d: any) => {
        const array: Array<number> = Array(6);
        d.stats.map((s: any) => {
            switch (s.stat.name) {
                case POKEMON_STAT.HP.toLowerCase():
                    array[0] = s.base_stat;
                    break;
                case POKEMON_STAT.ATTACK.toLowerCase():
                    array[1] = s.base_stat;
                    break;
                case POKEMON_STAT.DEFENSE.toLowerCase():
                    array[2] = s.base_stat;
                    break;
                case POKEMON_STAT.SPEED.toLowerCase():
                    array[3] = s.base_stat;
                    break;
                case POKEMON_STAT.SPECIAL_DEFENSE.toLowerCase():
                    array[4] = s.base_stat;
                    break;
                case POKEMON_STAT.SPECIAL_ATTACK.toLowerCase():
                    array[5] = s.base_stat;
                    break;
            }
        });

        return array;
    }

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (r.status === 200) {
                const d = await r.json();
                setDexId(parseInt(id));
                setTypes(getTypes(d));
                setRadarChartOptions(Object.assign(baseOptions, {
                    series: [{ data: getStats(d) }],
                }));
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            if (r.status === 200) {
                const d = await r.json();
                for (let i = 0; i < d.names.length; i++) {
                    if (d.names[i].language.name === "ko") {
                        setName(d.names[i].name);
                        break;
                    }
                }

                for (let i = 0; i < d.genera.length; i++) {
                    if (d.genera[i].language.name === "ko") {
                        setSummary(d.genera[i].genus);
                        break;
                    }
                }

                for (let i = 0; i < d.flavor_text_entries.length; i++) {
                    if (d.flavor_text_entries[i].language.name === "ko") {
                        setDescription(d.flavor_text_entries[i].flavor_text);
                        break;
                    }
                }
            }
        })();
    }, []);

    return (
        <section style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
            <div className="flex flex-col h-full">
                <ContentHeader dexId={dexId} name={name} types={types} />
                <Card style={{ marginBottom: 36 }}>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-black" style={{ marginBottom: 9 }}>{summary}</span>
                        <span className="text-xs text-black">{description}</span>
                    </div>
                </Card>
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
