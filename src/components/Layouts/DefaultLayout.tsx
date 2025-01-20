import React, { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../App';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import Portals from '../../components/Portals';
import PrivateRoute from './PrivateRoute';
import { getAccessToken, getUserData } from '@/services/SessionService';
import { Navigate } from 'react-router-dom';
import SideMenu from '@/components/Layouts/SideMenu';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/pages/Authentication/AppTheme';
import AppNavbar from '@/components/Layouts/AppNavbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import MainGrid from '@/components/Layouts/MainGrid';
import Home from '@/pages';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showLoader, setShowLoader] = useState(true);
    const [showTopButton, setShowTopButton] = useState(false);

    const accessToken = getAccessToken();
    const userData = getUserData();


    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const onScrollHandler = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler);

        const screenLoader = document.getElementsByClassName('screen_loader');
        if (screenLoader?.length) {
            screenLoader[0].classList.add('animate__fadeOut');
            setTimeout(() => {
                setShowLoader(false);
            }, 200);
        }

        return () => {
            window.removeEventListener('onscroll', onScrollHandler);
        };
    }, []);

    // if (!accessToken && userData === null) {
    //     return <Navigate to="/auth/login" replace />;
    // }

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme
                            ? `rgba(${theme.palette.background.default} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <PrivateRoute>
                            {children}
                        </PrivateRoute>
                        <Footer/>
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
};

export default DefaultLayout;
