import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '@/store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store';
import React, { useEffect, useState } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMinus from '../Icon/IconMinus';
import { GoHomeFill } from 'react-icons/go';
import { TbFileAnalytics } from 'react-icons/tb';
import { BsFillPeopleFill } from 'react-icons/bs';
import { DynamicIcons } from '@/components/DynamicIcons';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector(
        (state: IRootState) => state.themeConfig.semidark,
    );
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu(oldValue => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector(
            '.sidebar ul a[href="' + window.location.pathname + '"]',
        );
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any =
                    ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink
                            to="/"
                            className="main-logo flex items-center shrink-0"
                        >
                            <img
                                className="w-8 ml-[5px] flex-none"
                                src="/assets/images/GTI-G.png"
                                alt="logo"
                            />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                                SGR
                            </span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>

                    <div className="px-4 text-gray-500 text-sm dark:text-gray-400 mb-2">
                        {t('receipt_generation_system')}
                    </div>

                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('home')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                <GoHomeFill className="group-hover:!text-primary shrink-0" />
                                                <span
                                                    className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t('home')}
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('receipts')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/recibos" className="group">
                                    <div className="flex items-center">
                                        <DynamicIcons
                                            name={'BiSolidReceipt'}
                                            className="group-hover:!text-primary shrink-0"
                                        />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('receipts')}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('people_management')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink
                                    to="/gestao-de-pessoas/pessoas"
                                    className="group"
                                >
                                    <div className="flex items-center">
                                        <DynamicIcons
                                            name="FaPeopleGroup"
                                            className="group-hover:!text-primary shrink-0"
                                        />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('people')}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('reports')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button
                                    type="button"
                                    className={`${currentMenu === 'relatorio_mensal' ? 'active' : ''} nav-link group w-full`}
                                    onClick={() =>
                                        toggleMenu('relatorio_mensal')
                                    }
                                >
                                    <div className="flex items-center">
                                        <TbFileAnalytics className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('period_report')}
                                        </span>
                                    </div>

                                    <div
                                        className={
                                            currentMenu !== 'relatorio_mensal'
                                                ? 'rtl:rotate-90 -rotate-90'
                                                : ''
                                        }
                                    >
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight
                                    duration={300}
                                    height={
                                        currentMenu === 'relatorio_mensal'
                                            ? 'auto'
                                            : 0
                                    }
                                >
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/relatorios/relatorio-mensal/periodo">
                                                {t('receipts')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('registers')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/fontes" className="group">
                                    <div className="flex items-center">
                                        <DynamicIcons
                                            name={'LuTextSelect'}
                                            className="group-hover:!text-primary shrink-0"
                                        />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('fonts')}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/impostos" className="group">
                                    <div className="flex items-center">
                                        <DynamicIcons
                                            name={'TbCashRegister'}
                                            className="group-hover:!text-primary shrink-0"
                                        />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('taxes')}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('administrador')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink
                                    to="/administrador/usuarios"
                                    className="group"
                                >
                                    <div className="flex items-center">
                                        <BsFillPeopleFill className="group-hover:!text-primary shrink-0" />
                                        <span
                                            className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('users')}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
