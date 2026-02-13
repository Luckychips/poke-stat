'use client'
import { useEffect, useRef } from "react";
import { ChartOptionProps } from "@/type/data/visualization";


interface Props {
    options: ChartOptionProps;
}

export default function RadarChart({ options }: Props) {
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

    return <div id="radar-chart" ref={chartRef} />;
}
