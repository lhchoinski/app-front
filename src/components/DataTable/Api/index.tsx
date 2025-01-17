import React, { ChangeEvent, useEffect, useState } from 'react';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import {
    findPaginationGet,
    findPaginationPost,
} from '@/services/GenericService';
import { DynamicIcons } from '@/components/DynamicIcons';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { IDataTableApiProps } from './interfaces';
import ActionMenu from '@/components/DataTable/ActionMenu';
import { ISelect2Options } from '@/types/ISelect2';

const DataTableApi = <T,>({
    columns,
    apiRoute,
    hideButtonCreate = false,
    hideColumnActive = false,
    hideColumnAction = false,
    hideSelectStatus = false,
    hideInputSearch = false,
    enableSelectedRows = false,
    pinFirstColumn = false,
    CustomTextEnableActionButton,
    CustomTextDisableActionButton,
    CustomIconEnableActionButton,
    CustomIconDisableActionButton,
    CustomEnableStatusSelect = 'active',
    CustomDisableStatusSelect = 'inactive',
    ModaltextEnable = 'message.toEnable',
    ModalTitleEnable = 'button.enable',
    ModaltextDisable = 'message.toDisable',
    ModalTitleDisable = 'button.disable',
    InitStatus = true,
    hideActionButtomDelete = false,
    hideActionButtomEnable = false,
    selectedRows,
    children,
    setSelectedRows,
    selectedParameter,
    handleSelectedRecordsChange = undefined,
    fetching,
    setFetching,
    customButtons,
    activeColumnName = 'status',
    createRoute = 'cadastrar',
    updateRoute = 'editar',
    pageRoute,
    panelClass = 'panel pb-4 mt-6',
    requestMethod = 'get',
    extraParams,
    refresh,
    setRefresh,
    stopGetData = false,
    finallyCallback,
}: IDataTableApiProps<T>) => {
    const { t } = useTranslation();

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<boolean | null>(InitStatus);
    const [searchTimeOut, setSearchTimeOut] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    const [internalSelectedRows, setInternalSelectedRows] = useState<any[]>([]);
    const finalSelectedRows =
        selectedRows !== undefined ? selectedRows : internalSelectedRows;
    const setFinalSelectedRows =
        setSelectedRows !== undefined
            ? setSelectedRows
            : setInternalSelectedRows;

    const [internalFetching, setInternalFetching] = useState<boolean>(false);
    const finalFetching = fetching !== undefined ? fetching : internalFetching;
    const setFinalFetching =
        setFetching !== undefined ? setFetching : setInternalFetching;

    const [internalRefresh, setInternalRefresh] = useState<boolean>(false);
    const finalRefresh = refresh !== undefined ? refresh : internalRefresh;
    const setFinalRefresh =
        setRefresh !== undefined ? setRefresh : setInternalRefresh;

    useEffect(() => {
        setPage(1);
        setFinalRefresh(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, status, extraParams]);

    useEffect(() => {
        setFinalRefresh(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if (stopGetData) {
            setFinalRefresh(false);
            return;
        }

        if (finalRefresh) {
            void getData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalRefresh]);

    const getData = async () => {
        setFinalFetching(true);

        setRecords([]);
        setTotalRecords(0);

        const params = {
            pageNo: page > 0 ? page - 1 : page,
            pageSize: pageSize,
            search: search,
            status: status,
            ...extraParams,
        };

        const handleThen = (r: any) => {
            const data = r.data.data;

            if (selectedParameter) {
                const selected = data.filter(
                    (record: any) => record[selectedParameter],
                );
                setFinalSelectedRows(selected);
            }

            setRecords(
                data.map((item: T, index: number) => ({
                    ...item,
                    key: index,
                })),
            );
            setTotalRecords(r.data.totalItems);
        };

        const handleFinally = () => {
            setFinalFetching(false);
            setFinalRefresh(false);

            if (finallyCallback) {
                finallyCallback();
            }
        };

        if (requestMethod.toLowerCase() == 'post') {
            await findPaginationPost<any>(apiRoute, params)
                .then(handleThen)
                .finally(handleFinally);
        } else {
            await findPaginationGet<any>(apiRoute, params)
                .then(handleThen)
                .finally(handleFinally);
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setFinalFetching(true);

        if (searchTimeOut) {
            clearTimeout(searchTimeOut);
        }

        setSearchTimeOut(
            setTimeout(() => {
                setFinalRefresh(true);
            }, 1000),
        );
    };

    const options: ISelect2Options<boolean, string>[] = [
        { value: true, label: t(CustomEnableStatusSelect) },
        { value: false, label: t(CustomDisableStatusSelect) },
        { value: null, label: t('all') },
    ];

    if (!hideColumnActive) {
        const activeColumn: DataTableColumn<T> = {
            accessor: activeColumnName,
            title: t('status'),
            width: 80,
            textAlign: 'center',
            render: (record: any) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    {record[activeColumnName] ? (
                        <span className="badge bg-primary">{t('active')}</span>
                    ) : (
                        <span className="badge bg-danger">{t('inactive')}</span>
                    )}
                </div>
            ),
        };

        columns = [...columns, activeColumn];
    }

    if (!hideColumnAction) {
        const actionColumn: DataTableColumn<T> = {
            accessor: 'action',
            title: '#',
            width: 50,
            textAlign: 'center',
            render: (item: any) => (
                <ActionMenu
                    item={item}
                    apiRoute={apiRoute}
                    pageRoute={pageRoute}
                    onRefresh={() => setFinalRefresh(true)}
                    customButtons={customButtons}
                    updateRoute={updateRoute}
                    activeColumnName={activeColumnName}
                    EnableButtonText={CustomTextEnableActionButton}
                    EnableButtonIcon={CustomIconEnableActionButton}
                    DisableButtonText={CustomTextDisableActionButton}
                    DisableButtonIcon={CustomIconDisableActionButton}
                    hideDelete={hideActionButtomDelete}
                    ModalTitleEnable={ModalTitleEnable}
                    ModalTitleDisable={ModalTitleDisable}
                    ModaltextEnable={ModaltextEnable}
                    ModaltextDisable={ModaltextDisable}
                    hideEnable={hideActionButtomEnable}
                />
            ),
        };

        columns = [...columns, actionColumn];
    }

    return (
        <div>
            <div className={panelClass}>
                {!(hideButtonCreate && hideSelectStatus && hideInputSearch) ? (
                    <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                        {!hideButtonCreate ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/${pageRoute ? pageRoute : apiRoute}/${createRoute}`}
                                    className="btn btn-primary gap-2"
                                >
                                    <FaPlus />
                                    {t('button.create')}
                                </Link>
                            </div>
                        ) : (
                            ''
                        )}

                        {!(hideSelectStatus && hideInputSearch) ? (
                            <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                                {children}

                                {!hideSelectStatus ? (
                                    <div className="custom-select z-10">
                                        <Select
                                            options={options}
                                            value={options.find(
                                                option =>
                                                    option.value === status,
                                            )}
                                            onChange={selectedOption =>
                                                setStatus(
                                                    selectedOption
                                                        ? selectedOption.value
                                                        : false,
                                                )
                                            }
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}

                                {!hideInputSearch ? (
                                    <div className="text-right relative">
                                        <input
                                            type="text"
                                            placeholder={t('search') + '...'}
                                            value={search}
                                            onChange={handleOnChange}
                                            className="py-2 pl-10 pr-3 border border-gray-300 rounded-md bg-white dark:border-[#17263c] dark:bg-[#121e32] dark:text-white dark:placeholder:text-white-light placeholder:tracking-widest focus:ring-1 focus:ring-primary focus:outline-none"
                                        />
                                        <DynamicIcons
                                            name={'IoIosSearch'}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white opacity-70"
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    ''
                )}

                <div className="datatables">
                    <DataTable
                        pinFirstColumn={pinFirstColumn}
                        pinLastColumn={!hideColumnAction}
                        selectedRecords={
                            enableSelectedRows ? finalSelectedRows : undefined
                        }
                        onSelectedRecordsChange={handleSelectedRecordsChange}
                        noRecordsText={t('datatable.noDataContent')}
                        highlightOnHover
                        className="whitespace-nowrap table-hover table-compact table-bordered"
                        records={records}
                        fetching={finalFetching}
                        idAccessor={'key'}
                        columns={columns}
                        totalRecords={totalRecords}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={p => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        backgroundColor={{ dark: '#0e1726', light: '' }}
                        paginationText={({ from, to, totalRecords }) =>
                            t('datatable.paginationInfo', {
                                from,
                                to,
                                totalRecords,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default DataTableApi;
