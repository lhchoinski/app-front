import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { DataTableColumn } from 'mantine-datatable';
import { IFonteResponse } from '@/types/IFonte';
import BreadCrumbs from '@/components/BreadCrumbs';
import DataTableApi from '@/components/DataTable/Api';
import React, { useEffect } from 'react';
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Fontes = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Fontes'));
    });

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill'
        },
        {
            label: t('fonts'),
            icon: 'LuTextSelect'
        }
    ];

    const apiRoute = 'fontes';

    const columns: DataTableColumn<IFonteResponse>[] = [
        {
            accessor: 'fonte',
            title: t('code')
        },
        {
            accessor: 'descricao',
            title: t('description')
        }
    ];

    const customButtons = (item: IFonteResponse): IContextMenuButton<IFonteResponse>[] => {
        return [
            {
                text: t('view'),
                icon: t('FaEye'),
                to: `/fontes/visualizar/${item.id}`
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

export default Fontes;
