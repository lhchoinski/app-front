import React, { useEffect, useState } from 'react';
import BreadCrumbs from '@/components/BreadCrumbs';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import ReciboForm from '@/pages/Recibos/CreateOrUpdate/Form';
import { IReciboForm, IReciboResponse } from '@/pages/Recibos/interfaces';
import { useParams } from 'react-router-dom';
import { defaultValues, reciboResponseToForm } from '@/pages/Recibos/CreateOrUpdate/Form/TabRecibo/helpers';
import { findById } from '@/services/GenericService';
import { useCoreLoader } from '@/providers/LoaderProvider';

const ReciboCadastrar = () => {
    const { t } = useTranslation();

    const { id } = useParams() as unknown as { id: number };

    const [initialValues, setInitialValues] = useState<IReciboForm>(
        defaultValues(id ? id : null)
    );

    const [refreshUpdate, setRefreshUpdate] = useState<boolean>(false);

    useEffect(() => {
        setRefreshUpdate(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const { startLoading, stopLoading } = useCoreLoader();

    useEffect(() => {
        if (refreshUpdate && id) {
            startLoading('form-recibo');

            findById<IReciboResponse>('recibos', id)
                .then(r => {
                    setInitialValues(reciboResponseToForm(r.data));
                })
                .finally(() => {
                    stopLoading('form-recibo');
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
            label: t('receipts'),
            icon: 'BiSolidReceipt',
            uri: '/recibos',
        },
        {
            label: id ? t('button.edit') : t('button.create')
        }
    ];

    return (
        <div>
            <BreadCrumbs items={items} />

            <ReciboForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
            />
        </div>
    );
};

export default ReciboCadastrar;
