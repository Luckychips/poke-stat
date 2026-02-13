'use client'
import { useEffect, useRef } from "react";
import type { ChartOptionProps } from "@/type/data/visualization";

// const options = {
    // series: [
    //     { name: "H", data: [45] },
    //     { name: "A", data: [70] },
    //     { name: "B", data: [30] },
    //     { name: "S", data: [90] },
    //     { name: "D", data: [55] },
    //     { name: "C", data: [20] },
    //     {
    //         name: '월요일',
    //         data: [
    //             { x: '00시', y: 10 },
    //             { x: '06시', y: 30 },
    //             { x: '12시', y: 50 },
    //             { x: '18시', y: 40 }
    //         ]
    //     },
    //     {
    //         name: '화요일',
    //         data: [
    //             { x: '00시', y: 20 },
    //             { x: '06시', y: 25 },
    //             { x: '12시', y: 60 },
    //             { x: '18시', y: 45 }
    //         ]
    //     }
    // ],
//     chart: {
//         height: 350,
//         type: "heatmap",
//     },
//     title: {
//         text: "Damage Relation",
//     },
// };

interface Props {
    options: ChartOptionProps;
}

export default function Heatmap({ options }: Props) {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let chart: any;

        const loadChart = async () => {
            const ApexCharts = (await import('apexcharts')).default;

            if (!chartRef.current) return;

            chart = new ApexCharts(chartRef.current, options);
            chart.render();
        };

        loadChart();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return <div id="heatmap" ref={chartRef} style={{ color: 'black' }} />;
}
