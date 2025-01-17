import React, { createContext, ReactNode, useContext, useState } from 'react';
import { LoaderContextProps } from '@/providers/LoaderProvider/interfaces';

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const useCoreLoader = (): LoaderContextProps => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({
                                                                      children,
                                                                  }) => {
    const [loadingState, setLoadingState] = useState<{
        [key: string]: boolean;
    }>({});

    const startLoading = (id: string = 'globalLoader') => {
        setLoadingState(prev => ({ ...prev, [id]: true }));
    };

    const stopLoading = (id: string = 'globalLoader') => {
        setLoadingState(prev => ({ ...prev, [id]: false }));
    };

    const isLoading = (id: string = 'globalLoader') => {
        return loadingState[id];
    };

    return (
        <LoaderContext.Provider
            value={{ startLoading, stopLoading, isLoading }}
        >
            {children}
        </LoaderContext.Provider>
    );
};
