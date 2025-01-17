import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { DataTableColumn } from 'mantine-datatable';
import BreadCrumbs from '@/components/BreadCrumbs';
import DataTableApi from '@/components/DataTable/Api';
import React, { useEffect } from 'react';
import { IUsuarioResponse } from '@/types/IUsuario';
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Usuarios = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Usuários'));
    });

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill'
        },
        {
            label: t('users'),
            icon: 'BsFillPeopleFill'
        }
    ];

    const apiRoute = 'administrador/usuario';

    const columns: DataTableColumn<IUsuarioResponse>[] = [
        {
            accessor: 'nome',
            title: t('name')
        },
        {
            accessor: 'login',
            title: t('user')
        },
        {
            accessor: 'email',
            title: t('email')
        },
        {
            accessor: 'role',
            title: t('profile_user')
        }
    ];

    const customButtons = (item: IUsuarioResponse): IContextMenuButton<IUsuarioResponse>[] => {
        return [
            {
                text: t('view'),
                icon: t('FaEye'),
                to: `/administrador/usuario/visualizar/${item.id}`
            }
        ];
    };

    return (
        <div>
            <BreadCrumbs items={breadCrumbsItems} />

            <DataTableApi
                apiRoute={apiRoute}
                columns={columns}
                customButtons={customButtons}
            />
        </div>
    );
};

export default Usuarios;
