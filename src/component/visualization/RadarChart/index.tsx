import { useEffect } from "react";
import ApexCharts from "apexcharts";
import { ChartOptionProps } from "@/type/visualization";

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
