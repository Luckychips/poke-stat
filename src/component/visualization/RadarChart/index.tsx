'use client'
import { useEffect, useRef, useState } from "react";
import { ChartOptionProps } from "@/type/data/visualization";

interface Props {
    options: ChartOptionProps;
}

export default function RadarChart({ options }: Props) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [instance, setInstance] = useState<any>(null);

    useEffect(() => {
        let chart: any;

        const loadChart = async () => {
            const ApexCharts = (await import('apexcharts')).default;

            if (!chartRef.current) return;

            chart = new ApexCharts(chartRef.current, options);
            chart.render();
            setInstance(chart);
        };

        loadChart();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (instance) {
            instance.updateOptions(
                {
                    colors: options.colors,
                    dataLabels: {
                        style: {
                            colors: options.dataLabels?.style?.colors,
                        }
                    }
                },
                true,
                true,
            );
        }
    }, [instance, options]);

    return <div id="radar-chart" ref={chartRef} />;
}
