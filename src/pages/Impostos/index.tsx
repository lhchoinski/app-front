import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs';
import DataTableApi from '@/components/DataTable/Api';
import { DataTableColumn } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';
import { IImpostoResponse } from '@/types/IImposto';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Impostos = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Impostos'));
    });

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill',
        },
        {
            label: t('taxes'),
            icon: 'TbCashRegister',
        },
    ];

    const apiRoute = 'impostos';

    const columns: DataTableColumn<IImpostoResponse>[] = [
        {
            accessor: 'nome',
            title: t('name'),
        },
    ];

    const customButtons = (
        item: IImpostoResponse,
    ): IContextMenuButton<IImpostoResponse>[] => {
        return [
            {
                text: t('view'),
                icon: t('FaEye'),
                to: `/impostos/visualizar/${item.id}`,
            },
        ];
    };

    return (
        <div>
            <BreadCrumbs items={breadCrumbsItems} />

            <DataTableApi
                apiRoute={apiRoute}
                columns={columns}
                customButtons={customButtons}
                hideColumnActive={true}
                hideButtonCreate={true}
                hideInputSearch={true}
                hideSelectStatus={true}
                hideActionButtomDelete={true}
                hideActionButtomEnable={true}

            />
        </div>
    );
};

export default Impostos;
