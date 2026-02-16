'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BaseIcon } from "@/component";
import { mainThemeColor } from "@/core/theme";

export default function Sidebar() {
    const pathname = usePathname();

    const isActiveLink = (target: string) => {
        return pathname.includes(target);
    }

    return (
        <aside className="w-1/20 h-screen" style={{ minWidth: 150, height: 'calc(100vh - 72px)', marginTop: 36, marginBottom: 36, marginLeft: 36 }}>
            <div className="h-full bg-white shadow-sm rounded-lg" style={{ padding: '18px 0' }}>
                <div className="flex justify-center py-2 mb-24">
                    <BaseIcon iconColor={mainThemeColor} iconSize="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"/>
                    </BaseIcon>
                </div>
                <ul className="flex flex-col justify-center items-center">
                    <li className="py-2">
                        <Link href="/pokedex/list">
                            <figure
                                className="p-2 cursor-pointer rounded-lg"
                                style={{backgroundColor: isActiveLink("pokedex") ? mainThemeColor : "white"}}>
                                <BaseIcon iconColor={isActiveLink("pokedex") ? "white" : mainThemeColor}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"/>
                                </BaseIcon>
                            </figure>
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link href="/skill/list">
                            <figure
                                className="p-2 cursor-pointer rounded-lg"
                                style={{backgroundColor: isActiveLink("skill") ? mainThemeColor : "white"}}>
                                <BaseIcon iconColor={isActiveLink("skill") ? "white" : mainThemeColor}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
                                </BaseIcon>
                            </figure>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
