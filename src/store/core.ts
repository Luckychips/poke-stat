import { create } from "zustand";
import type { ListPageStoreProps } from "@/type/core";

export const useListPageStore = create<ListPageStoreProps>((set) => ({
    currentPage: 1,
    setCurrentPage: (v) => set({ currentPage: v }),
}));
