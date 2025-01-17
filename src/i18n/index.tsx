import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import locales from './locales';
import themeConfig from '@/theme.config';

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        lng: themeConfig.locale,
        fallbackLng: themeConfig.locale,
        resources: locales,
        defaultNS: 'translations',
        supportedLngs: ['pt-BR'],
    });

export default i18n;
