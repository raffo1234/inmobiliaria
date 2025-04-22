import { create } from "zustand";

type GlobalState = {
    propertyId: string | undefined;
    show: () => void;
    hide: () => void;
    setPropertyId: (id: string) => void;
    isDisplayed: boolean;
}

export const useGlobalState = create<GlobalState>((set) => ({
    propertyId: undefined,
    setPropertyId: (id) => set(() => ({ propertyId: id })),
    show: () => set(() => ({ isDisplayed: true })),
    hide: () => set(() => ({ isDisplayed: false })),
    isDisplayed: false
}));


