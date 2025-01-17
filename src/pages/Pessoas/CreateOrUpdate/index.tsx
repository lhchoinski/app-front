import { useCoreLoader } from '@/providers/LoaderProvider';
import React, { useEffect, useState } from 'react';
import { IPessoaForm, IPessoaResponse } from '@/types/IPessoa';
import { defaultValues, pessoaResponseToForm } from '@/pages/Pessoas/CreateOrUpdate/helpers';
import { useParams } from 'react-router-dom';
import { findById } from '@/services/GenericService';
import BreadCrumbs from '@/components/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import PessoaForm from '@/pages/Pessoas/CreateOrUpdate/Form';

const PessoaCadastrar = () => {
    const { t } = useTranslation();

    const { id } = useParams() as { id: string };

    const [viewMode, setViewMode] = useState<boolean>(false);

    const [initialValues, setInitialValues] = useState<IPessoaForm>(defaultValues(id ? id : null));

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

            findById<IPessoaResponse>('pessoas', id)
                .then(r => {
                    setInitialValues(pessoaResponseToForm(r.data));
                })
                .finally(() => {
                    stopLoading('form-pessoa');
                    setRefreshUpdate(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshUpdate]);

    const items: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill',
        },
        {
            label: t('people'),
            icon: 'FaPeopleGroup',
            uri: '/gestao-de-pessoas/pessoas'
        },
        {
            label: id ? viewMode ? t('view') : t('button.edit') : t('button.create')
        }
    ];

    return (
        <div>
            <BreadCrumbs items={items} />

            <PessoaForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                viewMode={viewMode}
            />
        </div>
    );
};

export default PessoaCadastrar;
