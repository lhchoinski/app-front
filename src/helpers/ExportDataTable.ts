import { DataTableColumn } from 'mantine-datatable';
import * as XLSX from 'xlsx';

export const exportDataToCsv = <T>(
    columns: DataTableColumn<T>[],
    tableData: T[],
    archiveName: string,
    setExportCsvBtnIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    setExportCsvBtnIsLoading(true);

    const csvRows = [];
    const headers = columns.map(col => col.title).join(',');
    csvRows.push(headers);

    for (const data of tableData) {
        const values = columns
            .map(col => {
                const acessor = col.accessor as keyof T;
                return `"${data[acessor] ?? ''}"`;
            })
            .join(',');
        csvRows.push(values);
    }

    const footer = columns.map(col => col.footer ?? '').join(',');
    csvRows.push(footer);

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${archiveName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportCsvBtnIsLoading(false);
};

export const exportDataToExcel = <T>(
    columns: DataTableColumn<T>[],
    tableData: T[],
    archiveName: string,
    setExportExcelBtnIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    setExportExcelBtnIsLoading(true);

    const dataForExcel = tableData.map(data => {
        const row: Record<string, unknown> = {};
        columns.forEach(col => {
            const accessor = col.accessor as keyof T;
            row[col.title as string] = data[accessor] ?? '';
        });
        return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

    const footerRow: Record<string, unknown> = {};
    columns.forEach(col => {
        footerRow[col.title as string] = col.footer ?? '';
    });

    XLSX.utils.sheet_add_json(worksheet, [footerRow], {
        skipHeader: true,
        origin: -1,
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, `${archiveName}.xlsx`);

    setExportExcelBtnIsLoading(false);
};
