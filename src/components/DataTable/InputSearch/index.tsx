import { DynamicIcons } from '@/components/DynamicIcons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IDataTableInputSearchProps } from '@/components/DataTable/InputSearch/interfaces';

const DataTableInputSearch = ({
    searchTerm,
    setSearchTerm,
}: IDataTableInputSearchProps) => {
    const { t } = useTranslation();

    return (
        <div className="text-right relative">
            <input
                type="text"
                placeholder={t('search') + '...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="py-2 pl-10 pr-3 border border-gray-300 rounded-md bg-white dark:border-[#17263c] dark:bg-[#121e32] dark:text-white dark:placeholder:text-white-light placeholder:tracking-widest focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <DynamicIcons
                name={'IoIosSearch'}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white opacity-70"
            />
        </div>
    );
};

export default DataTableInputSearch;
