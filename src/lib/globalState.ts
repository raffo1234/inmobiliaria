import { PropertyType } from "@types/propertyState";
import { create } from "zustand";

type GlobalState = {
    propertyId: string | undefined;
    show: () => void;
    hide: () => void;
    setPropertyId: (id: string) => void;
    setPropertyType: (propertyType: PropertyType) => void;
    isDisplayed: boolean;
    propertyType: string;
}

export const useGlobalState = create<GlobalState>((set) => ({
    propertyId: undefined,
    setPropertyId: (id) => set(() => ({ propertyId: id })),
    show: () => set(() => ({ isDisplayed: true })),
    hide: () => set(() => ({ isDisplayed: false })),
    isDisplayed: false,
    propertyType: PropertyType.APARTMENT,
    setPropertyType: (propertyType) => set(() => ({ propertyType }))
}));


