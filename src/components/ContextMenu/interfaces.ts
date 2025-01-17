import { MantineColor } from '@mantine/core';

export interface IContextMenuProps<T> {
    data: T;
    buttons: IContextMenuButton<T>[] | ((item: T) => IContextMenuButton<T>[]);
}

export interface IContextMenuButton<T> {
    text: string;
    icon: string;
    color?: MantineColor;
    onClick?: (item: T) => void;
    to?: string;
}
