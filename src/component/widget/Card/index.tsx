import type { ReactNode } from "react";
import type { StyleProps } from "@/type/ui/style";

interface Props {
    children: ReactNode
    style?: StyleProps
    classes?: string
}

export default function Card({ children, style, classes }: Props) {
    const defaults = { overflow: "hidden", backgroundColor: "white", padding: 18 }

    return (
        <div
            className={`relative shadow-sm rounded-lg ${classes ? classes : ''}`}
            style={style ? Object.assign(defaults, style) : defaults}>
            {children}
        </div>
    )
}
