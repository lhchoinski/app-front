import { FieldValues, Path } from 'react-hook-form';
import { MultiValue } from 'react-select';
import { ISelect2Options } from '@/types/ISelect2';

export interface IFormSelectMultipleApi<
    T extends FieldValues,
    TypeValue,
    TypeLabel = string,
> {
    fieldPath: Path<T>;
    label: string;
    route: string;
    required?: boolean;
    placeholder: string;
    info?: string;
    apiSearch?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    closeMenuOnSelect?: boolean;
    isMulti?: boolean;
    onChangeCallback?: (
        option: MultiValue<ISelect2Options<TypeValue, TypeLabel>>,
    ) => void;
}
