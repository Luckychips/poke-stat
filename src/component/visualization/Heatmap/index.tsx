'use client'
import { useEffect, useRef } from "react";

const options = {
    series: [
        { name: "H", data: [45] },
        { name: "A", data: [70] },
        { name: "B", data: [30] },
        { name: "S", data: [90] },
        { name: "D", data: [55] },
        { name: "C", data: [20] },
    ],
    chart: {
        height: 350,
        type: "heatmap",
    },
    dataLabels: {
        enabled: false
    },
    colors: ["#008FFB"],
    xaxis: {
        type: "category",
        position: "top",
        categories: [2020, 2021, 2022],
        labels: {
            show: false,
        },
    },
    annotations: {
        position: "front",
        xaxis: [2020, 2021, 2022].map((year) => ({
            x: year,
            y: 0,
            label: {
                text: year,
                offsetY: -20,
                style: {
                    background: "#CBD5E1",
                    color: "#0F172A",
                    fontSize: "12px",
                    padding: {
                        left: 6,
                        right: 6,
                        top: 3,
                        bottom: 3,
                    },
                },
            }
        })),
    },
    title: {
        text: 'Damage Relation'
    },
};

interface Props {

}

export default function Heatmap() {
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
