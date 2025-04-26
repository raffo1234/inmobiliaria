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
    modalContent: React.ReactNode;
    setModalContent: (modalContent: React.ReactNode) => void;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    propertyId: undefined,
    setPropertyId: (id) => set(() => ({ propertyId: id })),
    show: () => set(() => ({ isDisplayed: true })),
    hide: () => set(() => ({ isDisplayed: false })),
    isDisplayed: false,
    propertyType: PropertyType.APARTMENT,
    setPropertyType: (propertyType) => set(() => ({ propertyType })),
    modalContent: null,
    setModalContent: (modalContent: React.ReactNode) => set(() => ({ modalContent })),
    isModalOpen: false,
    setModalOpen: (isOpen: boolean) => set(() => ({ isModalOpen: isOpen })),
}));


