export type SeriesProps = {
    name?: string;
    data?: number[];
}

export type ChartOptionProps = {
    series?: SeriesProps[];
    chart?: {
        height?: number;
        type?: string;
        dropShadow?: {
            enabled?: boolean;
            blur?: number;
            left?: number;
            top?: number;
        };
    };
    dataLabels?: {
        enabled?: boolean;
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
    };
    yaxis?: {
        stepSize?: number;
    };
    xaxis?: {
        categories?: number[] | string[];
    };
}
