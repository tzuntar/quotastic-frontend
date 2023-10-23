import React, {createContext, ReactNode, useContext, useState} from "react";

interface ModalContextType {
    shownModal: string | null;
    setShownModal: (modal: string | null) => void;
    modalData: any | null;
    setModalData: (data: any | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [shownModal, setShownModal] = useState<string | null>(null);
    const [modalData, setModalData] = useState<any | null>(null);

    const value = {
        shownModal, setShownModal,
        modalData, setModalData
    }
    return <ModalContext.Provider value={value}>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined)
        throw new Error('useModal must be used within a ModalProvider');
    return context;
}
