import { PropsWithChildren } from 'react';
import { IRootState, store } from './store';
import { MantineProvider } from '@mantine/core';
import CoreLoader from '@/components/Loader';
import { LoaderProvider } from '@/providers/LoaderProvider';
import { useAppSelector } from '@/store/hooks';

function App({ children }: PropsWithChildren) {
    const themeConfig = useAppSelector(
        (state: IRootState) => state.themeConfig
    );
    const theme = themeConfig.theme;
    return (
        <MantineProvider forceColorScheme={theme == 'dark' ? 'dark' : 'light'}>
            <LoaderProvider>
                <CoreLoader id={'globalLoader'}>
                    <div
                        className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                            themeConfig.rtlClass
                        } main-section antialiased relative font-nunito text-sm font-normal`}
                    >
                        {children}
                    </div>
                </CoreLoader>
            </LoaderProvider>
        </MantineProvider>
    );
}

export default App;
