import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/themeConfigSlice';

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Home'));
    });

    const { t } = useTranslation();
    return (
        <div>
            <h1>Home | SGR - {t('receipt_generation_system')}</h1>

            <div className="relative rounded-t-md bg-contain bg-left-top bg-no-repeat px-5 py-10  mt-5">
                <div className="relative">
                    <div className="flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60">
                        <div className="mt-24 hidden w-full max-w-[350px] lg:block">
                            <img
                                src="/assets/images/gti_preto-1024x649.png"
                                alt="Cover Image"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
