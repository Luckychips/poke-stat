import { useEffect } from "react";
import ApexCharts from "apexcharts";

type SeriesProps = {
    name: string
    data: number[]
}

type ChartOptionProps = {
    series: SeriesProps[]
    chart: {
        height: number
        type: string
        dropShadow: {
            enabled: boolean
            blur: number
            left: number
            top: number
        }
    }
    title: {
        text: string
    }
    stroke: {
        width: number
    }
    fill: {
        opacity: number
    }
    markers: {
        size: number
    }
    yaxis: {
        stepSize: number
    }
    xaxis: {
        categories: number[] | string[]
    }
}

interface Props {
    options: ChartOptionProps
}

export default function RadarChart({ options }: Props) {
    useEffect(() => {
        const chart = new ApexCharts(document.querySelector('#radar-chart'), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    return <div id="radar-chart" />;
}
