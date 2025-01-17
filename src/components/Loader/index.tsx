import React from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { useCoreLoader } from '@/providers/LoaderProvider';
import { ICoreLoaderProps } from '@/components/Loader/interfaces';

const CoreLoader: React.FC<ICoreLoaderProps> = ({ id, children }) => {
    const { isLoading } = useCoreLoader();

    return (
        <Box pos="relative">
            <LoadingOverlay visible={isLoading(id)} />
            {children}
        </Box>
    );
};

export default CoreLoader;
