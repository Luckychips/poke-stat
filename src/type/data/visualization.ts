export type SeriesProps = {
    name?: string;
    data?: number[] | {
        x?: string;
        y?: number;
        fillColor?: string;
    }[];
}

export type ChartOptionProps = {
    series?: SeriesProps[];
    chart?: {
        height?: number;
        type?: string;
        animations?: {
            enabled?: boolean;
        },
        dropShadow?: {
            enabled?: boolean;
            blur?: number;
            left?: number;
            top?: number;
        };
    };
    colors?: string[];
    plotOptions?: {
        heatmap?: {
            enableShades?: boolean;
            colorScale?: {
                ranges?: {
                    from?: number;
                    to?: number;
                    color?: string;
                    name?: string;
                }[];
            }
        }
    };
    dataLabels?: {
        enabled?: boolean;
        formatter?: (val: any, opts: any) => string;
        style?: {
            fontSize?: string;
            fontWeight?: number;
            colors?: string[];
        };
        background?: {
            enabled?: boolean;
        };
    };
    title?: {
        text?: string;
    };
    stroke?: {
        width?: number;
    };
    fill?: {
        opacity?: number;
    };
    markers?: {
        size?: number;
        strokeWidth?: number;
        strokeColors?: string[];
        discrete?: {
            seriesIndex?: number;
            dataPointIndex?: number;
            fillColor?: string;
            strokeColor?: string;
            size?: number;
        }[];
    };
    yaxis?: {
        labels?: {
            show?: boolean;
        };
        stepSize?: number;
        tickAmount?: number;
        min?: number;
        max?: number;
    };
    xaxis?: {
        categories?: number[] | string[];
        labels?: {
            show?: boolean;
        };
    };
}
