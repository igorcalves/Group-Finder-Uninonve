import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Group } from '../domain/group';
import { User } from '../domain/user';

interface GlobalContextProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    addGroups: (newGroups: Group[]) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentPage, setCurrentPage] = useState('home');
    const [groups, setGroups] = useState<Group[]>([]);
    const [user, setUser] = useState<User | undefined>(undefined);

    const addGroups = (newGroups: Group[]) => {
        setGroups((prevGroups) => [...prevGroups, ...newGroups]);
    };

    return (
        <GlobalContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                groups,
                setGroups,
                user,
                setUser,
                addGroups,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            'useGlobalContext must be used within a GlobalProvider'
        );
    }
    return context;
};
