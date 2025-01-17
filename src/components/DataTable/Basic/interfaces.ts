import { DataTableColumn, DataTableRowExpansionProps } from 'mantine-datatable';
import { MantineColor } from '@mantine/core';

export interface IDataTableBasicProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    disablePagination?: boolean;
    fetching?: boolean;
    pinLastColumn?: boolean;
    withRowBorders?: boolean;
    striped?: boolean;
    disableMaxHeightCalculate?: boolean;
    minHeight?: string | number;
    maxHeight?: string | number;
    hideSearch?: boolean;
    externalSearchTerm?: string;
    rowExpansion?: DataTableRowExpansionProps<T>;
    rowClassName?: string | ((record: T, index: number) => string | undefined);
    rowBackgroundColor?: (
        record: T,
        index: number,
    ) =>
        | MantineColor
        | undefined
        | {
              light: MantineColor;
              dark: MantineColor;
          };
}
