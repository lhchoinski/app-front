import React from 'react';
import { IconType } from 'react-icons';

export type IconLibrary = Record<string, IconType>;

export interface IDynamicIconsProps {
    name: string;
    className?: string;
    size?: number;
    style?: React.CSSProperties;
}
