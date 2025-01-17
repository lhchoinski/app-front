import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '@/components/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import UsuarioForm from '@/pages/Usuarios/CreateOrUpdate/Form';
import { useCoreLoader } from '@/providers/LoaderProvider';
import { findById } from '@/services/GenericService';
import { IUsuarioForm, IUsuarioResponse } from '@/types/IUsuario';
import { defaultValues, usuarioResponseToForm } from '@/pages/Usuarios/CreateOrUpdate/helpers';

const usuarioCadastrar = () => {
    const { t } = useTranslation();

    const { id } = useParams() as { id: string };

    const [viewMode, setViewMode] = useState<boolean>(false);

    const [initialValues, setInitialValues] = useState<IUsuarioForm>(defaultValues(id ? id : null));

    const { startLoading, stopLoading } = useCoreLoader();

    const [refreshUpdate, setRefreshUpdate] = useState<boolean>(false);

    useEffect(() => {
        setRefreshUpdate(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (refreshUpdate && id) {
            startLoading('form-pessoa');

            if (window.location.pathname.includes('visualizar')) {
                setViewMode(true);
            }

            findById<IUsuarioResponse>('administrador/usuario', id)
                .then(r => {
                    setInitialValues(usuarioResponseToForm(r.data));
                })
                .finally(() => {
                    stopLoading('form-usuario');
                    setRefreshUpdate(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshUpdate]);

    const items: IBreadcrumbItem[] = [
        {
            label: t('users'),
            icon: 'BsFillPeopleFill',
            uri: '/administrador/usuarios'
        },
        {
            label: id ? viewMode ? t('view') : t('button.edit') : t('button.create')
        }
    ];

    return (
        <div>
            <BreadCrumbs items={items} />

            <UsuarioForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                viewMode={viewMode}
            />
        </div>
    );
};

export default usuarioCadastrar;
