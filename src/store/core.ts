import { create } from "zustand";
import type { ListPageStoreProps } from "@/type/data/core";

export const useListPageStore = create<ListPageStoreProps>((set) => ({
    currentPage: 0,
    setCurrentPage: (v) => set({ currentPage: v }),
}));
