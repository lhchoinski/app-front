import { Dispatch, SetStateAction } from 'react';

export interface IDataTableInputSearchProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
}
