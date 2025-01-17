import { useCoreLoader } from '@/providers/LoaderProvider';
import React, { useEffect, useState } from 'react';
import { defaultValues, impostoResponseToForm } from '@/pages/Impostos/CreateOrUpdate/helpers';
import { useParams } from 'react-router-dom';
import { findById } from '@/services/GenericService';
import BreadCrumbs from '@/components/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import { IImpostoForm, IImpostoResponse } from '@/types/IImposto';
import ImpostoForm from '@/pages/Impostos/CreateOrUpdate/Form';

const ImpostoCadastrar = () => {
    const { t } = useTranslation();

    const { id } = useParams() as { id: string };

    const [viewMode, setViewMode] = useState<boolean>(false);

    const [initialValues, setInitialValues] = useState<IImpostoForm>(defaultValues(id ? id : null));

    const { startLoading, stopLoading } = useCoreLoader();

    const [refreshUpdate, setRefreshUpdate] = useState<boolean>(false);

    useEffect(() => {
        setRefreshUpdate(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (refreshUpdate && id) {
            startLoading('form-imposto');

            if (window.location.pathname.includes('visualizar')) {
                setViewMode(true);
            }

            findById<IImpostoResponse>('impostos', id)
                .then(r => {
                    setInitialValues(impostoResponseToForm(r.data));
                })
                .finally(() => {
                    stopLoading('form-imposto');
                    setRefreshUpdate(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshUpdate]);

    const items: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill'
        },
        {
            label: t('taxes'),
            icon: 'TbCashRegister',
            uri: '/impostos'
        },
        {
            label: id ? viewMode ? t('view') : t('button.edit') : t('button.create')
        }
    ];

    return (
        <div>
            <BreadCrumbs items={items} />

            <ImpostoForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                viewMode={viewMode}
            />
        </div>
    );
};

export default ImpostoCadastrar;
