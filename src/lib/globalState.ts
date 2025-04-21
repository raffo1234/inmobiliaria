import { PropertyType } from "@types/propertyState";
import { useState } from "react";
import { create } from 'zustand';

type GlobalState = {
    propertyId: string;
    toggle: () => void;
    setPropertyId: (id: string) => void;
    isDisplayed: boolean;
}

export const useGlobalState = create<GlobalState>((set) => ({
    propertyId: "",
    setPropertyId: (id) => set(() => ({ propertyId: id })),
    toggle: () => set((state) => ({ isDisplayed: !state.isDisplayed })),
    isDisplayed: false
}));


