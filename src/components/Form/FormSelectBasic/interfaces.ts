import { FieldValues, Path } from 'react-hook-form';
import { ISelect2Options } from '@/types/ISelect2';
import { SingleValue } from 'react-select';

export interface IFormSelectBasic<
    T extends FieldValues,
    TypeValue,
    TypeLabel = string,
> {
    fieldPath: Path<T>;
    label: string;
    options: ISelect2Options<TypeValue, TypeLabel>[];
    required?: boolean;
    placeholder: string;
    info?: string;
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
