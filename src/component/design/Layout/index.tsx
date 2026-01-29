import React from "react";
import { Sidebar } from "@/component";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <main className="flex flex-row bg-gray-100">
            <Sidebar />
            <section className="w-19/20 min-w-19/20 h-screen bg-gray-100" style={{ minWidth: 1100 }}>
                <article className="bg-white shadow-sm rounded-lg" style={{ margin: 36, height: 'calc(100vh - 72px)' }}>
                    <div className="relative flex flex-col h-full p-4">{children}</div>
                </article>
            </section>
        </main>
    );
}
