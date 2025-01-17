import { DataTableColumn } from 'mantine-datatable';
import { Dispatch, SetStateAction } from 'react';
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';

export interface IDataTableApiProps<T> {
    columns: DataTableColumn<T>[];
    apiRoute: string;
    hideButtonCreate?: boolean;
    hideColumnActive?: boolean;
    hideColumnAction?: boolean;
    hideSelectStatus?: boolean;
    hideInputSearch?: boolean;
    hideSelectFilter?: boolean;
    hideActionButtomDelete?: boolean;
    enableSelectedRows?: boolean;
    CustomTextEnableActionButton?: string;
    CustomTextDisableActionButton?: string;
    CustomIconEnableActionButton?: string;
    CustomIconDisableActionButton?: string;
    CustomEnableStatusSelect?: string;
    CustomDisableStatusSelect?: string;
    InitStatus?: boolean | null;
    ModaltextEnable?: string;
    ModalTitleEnable?: string;
    ModaltextDisable?: string;
    ModalTitleDisable?: string;
    hideActionButtomEnable?: boolean;
    children?: React.ReactNode;
    pinFirstColumn?: boolean;
    selectedRows?: any[];
    setSelectedRows?: Dispatch<SetStateAction<any[]>>;
    selectedParameter?: string;
    handleSelectedRecordsChange?: (selectedRecords: T[]) => void;
    fetching?: boolean;
    setFetching?: Dispatch<SetStateAction<boolean>>;
    customButtons?:
        | IContextMenuButton<T>[]
        | ((item: T) => IContextMenuButton<T>[]);
    activeColumnName?: string;
    pageRoute?: string;
    createRoute?: string;
    updateRoute?: string;
    panelClass?: string;
    requestMethod?: string;
    extraParams?: object;
    refresh?: boolean;
    setRefresh?: Dispatch<SetStateAction<boolean>>;
    stopGetData?: boolean;
    finallyCallback?: () => void;
}
