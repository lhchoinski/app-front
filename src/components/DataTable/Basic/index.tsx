import React, { useEffect, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import DataTableInputSearch from '@/components/DataTable/InputSearch';
import { IDataTableBasicProps } from '@/components/DataTable/Basic/interfaces';

const DataTableBasic = <T,>({
    columns,
    data,
    disablePagination = false,
    fetching = false,
    pinLastColumn = false,
    disableMaxHeightCalculate = false,
    minHeight,
    withRowBorders = true,
    maxHeight,
    striped,
    hideSearch = false,
    externalSearchTerm = '',
    rowExpansion,
    rowClassName,
    rowBackgroundColor,
}: IDataTableBasicProps<T>) => {
    const { t } = useTranslation();

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const totalRecords = data.length;

    const [searchTerm, setSearchTerm] = useState<string>(externalSearchTerm);

    const filteredData = data
        .filter(item => {
            if (typeof item === 'object' && item !== null) {
                return Object.values(item).some(value =>
                    String(value)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                );
            }
            return false;
        })
        .map((item, index) => ({
            ...item,
            key: index,
        }));

    const recordsToDisplay = disablePagination
        ? filteredData
        : filteredData.slice((page - 1) * pageSize, page * pageSize);

    const [calcMaxHeight, setCalcMaxHeight] = useState('400px');

    useEffect(() => {
        if (!disableMaxHeightCalculate) {
            const calculateMaxHeight = () => {
                const windowHeight = window.innerHeight;
                const calculatedHeight = windowHeight - 300;
                setCalcMaxHeight(`${calculatedHeight}px`);
            };

            calculateMaxHeight();

            window.addEventListener('resize', calculateMaxHeight);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSearchTerm(externalSearchTerm);
    }, [externalSearchTerm]);

    // noinspection RequiredAttributes
    return (
        <>
            {!hideSearch && (
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light"></h5>
                    <DataTableInputSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
            )}

            <div className="datatables">
                {disablePagination ? (
                    <DataTable
                        pinLastColumn={pinLastColumn}
                        withTableBorder={true}
                        borderRadius={undefined}
                        noRecordsText={t('datatable.noDataContent')}
                        highlightOnHover
                        className="whitespace-nowrap table-hover table-compact" // Remova 'table-bordered' aqui

                        records={recordsToDisplay}
                        striped={striped}
                        fetching={fetching}
                        withRowBorders={withRowBorders}
                        columns={columns}
                        idAccessor={'key'}
                        height={
                            disableMaxHeightCalculate ? '100%' : calcMaxHeight
                        }
                        minHeight={minHeight}
                        maxHeight={maxHeight}
                        rowExpansion={rowExpansion}
                        rowClassName={rowClassName}
                        rowBackgroundColor={rowBackgroundColor}
                    />
                ) : (
                    <DataTable
                        pinLastColumn={pinLastColumn}
                        withTableBorder={false}
                        borderRadius={undefined}
                        noRecordsText={t('datatable.noDataContent')}
                        highlightOnHover
                        className="whitespace-nowrap table-hover table-compact table-bordered"
                        records={recordsToDisplay}
                        fetching={fetching}
                        withRowBorders={withRowBorders}
                        striped
                        columns={columns}
                        idAccessor={'key'}
                        totalRecords={totalRecords}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={setPage}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        height={
                            disableMaxHeightCalculate ? '100%' : calcMaxHeight
                        }
                        minHeight={minHeight}
                        maxHeight={maxHeight}
                        paginationText={({ from, to, totalRecords }) =>
                            t('datatable.paginationInfo', {
                                from,
                                to,
                                totalRecords,
                            })
                        }
                        rowExpansion={rowExpansion}
                        rowClassName={rowClassName}
                        rowBackgroundColor={rowBackgroundColor}
                    />
                )}
            </div>
        </>
    );
};

export default DataTableBasic;
