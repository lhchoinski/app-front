import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IFonteForm, IFonteResponse } from '@/types/IFonte';
import { useCoreLoader } from '@/providers/LoaderProvider';
import { findById } from '@/services/GenericService';
import { defaultValues, fonteResponseToForm } from '@/pages/Fontes/CreateOrUpdate/helpers';
import BreadCrumbs from '@/components/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import FonteForm from '@/pages/Fontes/CreateOrUpdate/Form';

const FonteCadastrar = () => {
    const { t } = useTranslation();

    const { id } = useParams() as { id: string };

    const [viewMode, setViewMode] = useState<boolean>(false);

    const [initialValues, setInitialValues] = useState<IFonteForm>(defaultValues(id ? parseInt(id) : null));

    const { startLoading, stopLoading } = useCoreLoader();

    const [refreshUpdate, setRefreshUpdate] = useState<boolean>(false);

    useEffect(() => {
        setRefreshUpdate(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (refreshUpdate && id) {
            startLoading('form-fonte');

            if (window.location.pathname.includes('visualizar')) {
                setViewMode(true);
            }

            findById<IFonteResponse>('fontes', id)
                .then(r => {
                    setInitialValues(fonteResponseToForm(r.data));
                })
                .finally(() => {
                    stopLoading('form-fonte');
                    setRefreshUpdate(false);
                });
        }
    }, [refreshUpdate]);

    const items: IBreadcrumbItem[] = [
        {
            label: t('fonts'),
            icon: 'LuTextSelect',
            uri: '/fontes'
        },
        {
            label: id ? viewMode ? t('view') : t('button.edit') : t('button.create')
        }
    ];

    return (
        <div>
            <BreadCrumbs items={items} />

            <FonteForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                viewMode={viewMode}
            />
        </div>
    );
};

export default FonteCadastrar;
