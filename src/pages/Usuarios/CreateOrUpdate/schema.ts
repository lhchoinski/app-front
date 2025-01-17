import * as Yup from 'yup';
import i18n from '@/i18n';

export const schemaUsuario = Yup.object().shape({
    usuario: Yup.object().shape({
        nome: Yup.string().required(i18n.t('validation.required', { field: 'Nome' })),
        login: Yup.string().required(i18n.t('validation.required', { field: 'Login' })),
        email: Yup.string().email(i18n.t('validation.invalidEmail')).required(i18n.t('validation.required', { field: 'Email' })),
        role: Yup.string().required(i18n.t('validation.required', { field: 'Role' })),
        password: Yup.string().required(i18n.t('validation.required', { field: 'Senha' })),
        confirmPassword: Yup.string()
            .required(i18n.t('validation.required', { field: 'Confirmar Senha' }))
            .oneOf([Yup.ref('password')], i18n.t('validation.notEqualPassword')),
    })
});
