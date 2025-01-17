import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUsuarioForm, IUsuarioRequest } from '@/types/IUsuario';
import { IUsuariosCadastrarForm } from '@/pages/Usuarios/CreateOrUpdate/Form/interfaces';
import { schemaUsuario } from '@/pages/Usuarios/CreateOrUpdate/schema';
import CoreLoader from '@/components/Loader';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import { useNavigate } from 'react-router-dom';
import { postRequest, putRequest } from '@/services/GenericService';
import { showErrorToast, showSuccessToast } from '@/components/SweetAlert';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import { usuarioFormToRequest } from '@/pages/Usuarios/CreateOrUpdate/helpers';
import TabUsuario from '@/pages/Usuarios/CreateOrUpdate/Form/TabUsuario';

const UsuarioForm = ({
                         initialValues,
                         viewMode
                     }: IUsuariosCadastrarForm) => {
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(false);

    const [genericError, setGenericError] = useState<string | undefined>(
        undefined
    );

    const apiRoute = 'administrador/usuario';
    const pageRoute = 'administrador/usuarios';

    const navigate = useNavigate();

    const formMethods = useForm<IUsuarioForm>({
        resolver: yupResolver(schemaUsuario as any),
        defaultValues: initialValues
    });

    const { setValue } = formMethods;

    useEffect(() => {
        setRefresh(true);
    }, [initialValues]);

    useEffect(() => {
        if (refresh) {
            setValue('usuario', initialValues.usuario);
            setRefresh(false);
        }
    }, [refresh]);

    const onSubmit = (values: IUsuarioForm) => {
        if (initialValues.usuario.id) {
            putRequest<IUsuarioRequest>(apiRoute, initialValues.usuario.id, usuarioFormToRequest(values))
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
        postRequest<IUsuarioRequest>(apiRoute, usuarioFormToRequest(values))
            .then(() => {
                void showSuccessToast();
                navigate(`/${pageRoute}`);
            })
            .catch(error => {
                void showErrorToast();
                setGenericError(error);
            });
    };

    const tabs: ICoreFormTab<IUsuarioForm>[] = [
        {
            name: t('user'),
            icon: 'FaPerson',
            ref: 'usuario',
            content: () => <TabUsuario viewMode={viewMode} />
        }
    ];

    return (
        <CoreLoader id={'form-usuario'}>
            <CoreFormTabs<IUsuarioForm>
                onSubmit={onSubmit}
                tabs={tabs}
                formMethods={formMethods}
                genericError={genericError}
                hideSubmitButton={viewMode}
            />
        </CoreLoader>
    );
};

export default UsuarioForm;
