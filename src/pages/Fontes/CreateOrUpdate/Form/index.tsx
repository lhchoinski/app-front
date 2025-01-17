import { IFontesCadastrarForm } from '@/pages/Fontes/CreateOrUpdate/Form/interfaces';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFonteForm, IFonteRequest } from '@/types/IFonte';
import { postRequest, putRequest } from '@/services/GenericService';
import { showErrorToast, showSuccessToast } from '@/components/SweetAlert';
import { fonteFormToResponse } from '@/pages/Fontes/CreateOrUpdate/helpers';
import { useNavigate } from 'react-router-dom';
import CoreLoader from '@/components/Loader';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import TabFonte from '@/pages/Fontes/CreateOrUpdate/Form/TabFonte';
import { schemaFonte } from '@/pages/Fontes/CreateOrUpdate/schema';

const FonteForm = ({ initialValues, viewMode }: IFontesCadastrarForm) => {
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(false);

    const [genericError, setGenericError] = useState<string | undefined>(
        undefined
    );

    const formMethods = useForm<IFonteForm>({
        resolver: yupResolver(schemaFonte as any),
        defaultValues: initialValues
    });

    const { setValue } = formMethods;

    useEffect(() => {
        setRefresh(true);
    }, [initialValues]);

    useEffect(() => {
        if (refresh) {
            setValue('fonte', initialValues.fonte);
            setRefresh(false);
        }
    }, [refresh]);

    const apiRoute = 'fontes';
    const pageRoute = 'fontes';

    const navigate = useNavigate();

    const onSubmit = (values: IFonteForm) => {
        if (initialValues.fonte.id) {
            putRequest<IFonteRequest>(apiRoute, initialValues.fonte.id, fonteFormToResponse(values))
                .then(() => {
                    void showSuccessToast();
                    navigate(`/${pageRoute}`);
                })
                .catch(error => {
                    void showErrorToast();
                    setGenericError(error);
                });
            return;
        }
        postRequest<IFonteRequest>(apiRoute, fonteFormToResponse(values))
            .then(() => {
                void showSuccessToast();
                navigate(`/${pageRoute}`);
            })
            .catch(error => {
                void showErrorToast();
                setGenericError(error);
            });
    };

    const tabs: ICoreFormTab<IFonteForm>[] = [
        {
            name: t('font'),
            icon: 'LuTextSelect',
            ref: 'fonte',
            content: () => <TabFonte viewMode={viewMode} />
        }
    ];

    return (
        <CoreLoader id={'form-fontes'}>
            <CoreFormTabs<IFonteForm>
                onSubmit={onSubmit}
                tabs={tabs}
                formMethods={formMethods}
                genericError={genericError}
                hideSubmitButton={viewMode}
            />
        </CoreLoader>
    );
};

export default FonteForm;
