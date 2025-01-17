/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';

export interface IActionMenuProps<T> {
    item: any;
    apiRoute: string;
    customButtons?:
        | IContextMenuButton<T>[]
        | ((item: T) => IContextMenuButton<T>[]);
    hideEdit?: boolean;
    hideDelete?: boolean;
    hideDisable?: boolean;
    hideEnable?: boolean;
    deleteDirectBtn?: boolean;
    EnableButtonText?: string;
    DisableButtonText?: string;
    EnableButtonIcon?: string;
    ModaltextEnable?: string;
    ModalTitleEnable?: string;
    ModaltextDisable?: string;
    ModalTitleDisable?: string;
    DisableButtonIcon?: string;
    onRefresh?: () => void;
    pageRoute?: string;
    updateRoute?: string;
    activeColumnName?: string;
    customId?: string | number;
}
