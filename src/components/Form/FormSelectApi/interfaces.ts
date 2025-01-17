import { FieldValues, Path } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { ISelect2Options } from '@/types/ISelect2';

export interface IFormSelectApi<
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
    apiSearchDelay?: number;
    searchable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    closeMenuOnSelect?: boolean;
    onChangeCallback?: (
        option: SingleValue<ISelect2Options<TypeValue, TypeLabel>>,
    ) => void;
    comparisonFunction?: (
        optionValue: TypeValue,
        fieldValue: TypeValue,
    ) => boolean;
}
