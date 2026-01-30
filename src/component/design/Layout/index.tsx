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
                {children}
            </section>
        </main>
    );
}
