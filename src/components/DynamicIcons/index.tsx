import * as IconAi from 'react-icons/ai';
import * as IconBi from 'react-icons/bi';
import * as IconBs from 'react-icons/bs';
import * as IconDi from 'react-icons/di';
import * as IconFa from 'react-icons/fa';
import * as IconFa6 from 'react-icons/fa6';
import * as IconFi from 'react-icons/fi';
import * as IconGi from 'react-icons/gi';
import * as IconGo from 'react-icons/go';
import * as IconHi from 'react-icons/hi';
import * as IconIm from 'react-icons/im';
import * as IconIO from 'react-icons/io';
import * as IconIO5 from 'react-icons/io5';
import * as IconLu from 'react-icons/lu';
import * as IconMd from 'react-icons/md';
import * as IconPi from 'react-icons/pi';
import * as IconRx from 'react-icons/rx';
import * as IconSl from 'react-icons/sl';
import * as IconTb from 'react-icons/tb';

import React from 'react';
import { IconLibrary, IDynamicIconsProps } from './interfaces';

const icons: IconLibrary = {
    ...IconAi,
    ...IconBi,
    ...IconBs,
    ...IconDi,
    ...IconFa,
    ...IconFa6,
    ...IconFi,
    ...IconGi,
    ...IconGo,
    ...IconHi,
    ...IconIm,
    ...IconIO,
    ...IconIO5,
    ...IconLu,
    ...IconMd,
    ...IconPi,
    ...IconRx,
    ...IconSl,
    ...IconTb
};

const convertToPascalCase = (str: string): string => {
    if (str == null || !str.includes('-')) {
        return str;
    }

    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

export const DynamicIcons = ({ name, className, size, style }: IDynamicIconsProps) => {
    const IconComponent = icons[convertToPascalCase(name)];

    if (!IconComponent) {
        return <IconBs.BsWifiOff className={className} size={size} style={style} />;
    }

    return <IconComponent className={className} size={size} style={style} />;
};
