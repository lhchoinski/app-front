import { ITabUsuario } from '@/pages/Usuarios/CreateOrUpdate/Form/TabUsuario/interfaces';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import React, { useEffect } from 'react';
import { IUsuarioForm } from '@/types/IUsuario';
import FormSelectBasic from '@/components/Form/FormSelectBasic';
import { roleOptions } from '@/pages/Usuarios/CreateOrUpdate/Form/TabUsuario/helpers';

const TabUsuario = ({ viewMode }: ITabUsuario) => {
    const { t } = useTranslation();

    const {
        control,
        setValue
    } = useFormContext();

    const role = useWatch({
        control,
        name: 'usuario.role'
    });

    useEffect(() => {
        if (role) {
            if (role.label) {
                setValue('usuario.role', role.label)
            }
        }
    }, [role]);

    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput<IUsuarioForm>
                        fieldPath="usuario.nome"
                        label={t('name')}
                        required={true}
                        placeholder={t('name')}
                        disabled={viewMode}
                    />

                    <FormInput<IUsuarioForm>
                        fieldPath="usuario.login"
                        label={t('login')}
                        required={true}
                        placeholder={t('login')}
                        disabled={viewMode}
                    />

                    <FormInput<IUsuarioForm>
                        fieldPath="usuario.email"
                        label={t('email')}
                        required={true}
                        placeholder={t('email')}
                        disabled={viewMode}
                    />

                    <FormSelectBasic<IUsuarioForm, string, string>
                        options={roleOptions()}
                        fieldPath="usuario.role"
                        label={t('profile_user')}
                        required={true}
                        placeholder={t('select.placeHolder')}
                        disabled={viewMode}
                    />

                    <FormInput<IUsuarioForm>
                        fieldPath="usuario.password"
                        label={t('password')}
                        required={true}
                        type="password"
                        placeholder={t('password')}
                        disabled={viewMode}
                    />

                    <FormInput<IUsuarioForm>
                        fieldPath="usuario.confirmPassword"
                        label={t('confirm_password')}
                        required={true}
                        type="password"
                        placeholder={t('confirm_password')}
                        disabled={viewMode}
                    />
                </div>
            </div>
        </>
    );
}

export default TabUsuario;
