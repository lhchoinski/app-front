import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IRootState } from '../../store';
import { logout } from '../../services/AuthenticationService';
import Swal from 'sweetalert2';
import { DynamicIcons } from '../DynamicIcons';
import { toggleSidebar, toggleTheme } from '../../store/themeConfigSlice';
import Dropdown from '../Dropdown';
import { clearUser } from '../../store/slices';
import themeConfig from '../../theme.config';
import { useDispatch, useSelector } from 'react-redux';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const userData = useAppSelector((state: IRootState) => state.user.userData);

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const { t } = useTranslation();

    useEffect(() => {
        const selector = document.querySelector(
            'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
        );

        if (selector) {
            selector.classList.add('active');
            const all: NodeListOf<Element> = document.querySelectorAll(
                'ul.horizontal-menu .nav-link.active'
            );

            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            const ul: Element | null = selector.closest('ul.sub-menu');
            if (ul !== null) {
                const ele: NodeListOf<Element> | undefined = ul
                    .closest('li.menu')
                    ?.querySelectorAll('.nav-link');

                if (ele) {
                    setTimeout(() => {
                        ele[0]?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const handleLogout = () => {
        Swal.fire({
            title: t('message.logout'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('button.ok'),
            cancelButtonText: t('button.cancel'),
            customClass: {
                icon: 'sweet-alerts',
                popup: 'sweet-alerts-popup',
                confirmButton: 'sweet-alerts-confirm',
                cancelButton: 'sweet-alerts-cancel',
            },
        }).then(async result => {
            if (result.isConfirmed) {
                await logout();
                dispatch(clearUser());
                navigate('/auth/login');
            }
        });
    };

    return (
        <>
            <header
                className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}
            >
                <div className="shadow-sm">
                    <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                        <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                            <Link
                                to="/"
                                className="main-logo flex items-center shrink-0"
                            >
                                <img
                                    className="w-8 ltr:-ml-1 rtl:-mr-1 inline"
                                    src="/assets/images/GTI-G.png"
                                    alt="logo"
                                />
                                <span
                                    className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                                   SGR
                                </span>
                            </Link>
                            <button
                                type="button"
                                className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                                onClick={() => {
                                    dispatch(toggleSidebar());
                                }}
                            >
                                <DynamicIcons
                                    name={'MdOutlineMenu'}
                                    className="w-5 h-5"
                                />
                            </button>
                        </div>

                        <div
                            className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex justify-end items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <div className="dropdown shrink-0 flex">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="relative group block"
                                    button={
                                        <DynamicIcons
                                            name={'FaUser'}
                                            className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        />
                                    }
                                >
                                    <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                        <li>
                                            <div className="flex items-center px-4 py-4">
                                                <div>
                                                    <h4 className="text-base">
                                                      {userData?.nome}
                                                    </h4>
                                                    <span
                                                        className="text-black/60 dark:text-dark-light/60 dark:hover:text-white">
                                                        {userData?.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="border-t border-white-light dark:border-white-light/10">
                                            <button
                                                onClick={handleLogout}
                                                className="text-danger !py-3 w-full text-left flex items-center"
                                            >
                                                <DynamicIcons
                                                    name={'IoMdLogOut'}
                                                    className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0"
                                                />
                                                {t('button.logout')}
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    {/* horizontal menu */}
                    <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">
                        <li className="menu nav-item relative">
                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                        <span className="px-1">
                                            {t('more')}
                                        </span>
                                </div>
                                <div className="right_arrow">
                                    <DynamicIcons name={'FaCaretDown'} />
                                </div>
                            </button>
                        </li>

                    </ul>
                </div>
            </header>
        </>
    );
};

export default Header;
