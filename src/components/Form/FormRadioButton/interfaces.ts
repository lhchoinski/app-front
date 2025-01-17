import { FieldValues, Path } from 'react-hook-form';

export interface IFormRadioButtonOption<TypeValue> {
    value: TypeValue | null;
    label: string;
    className?: string;
}

export interface IFormRadioButtonProps<T extends FieldValues, TypeValue> {
    fieldPath: Path<T>;
    label: string;
    options: IFormRadioButtonOption<TypeValue>[];
    required?: boolean;
    disabled?: boolean;
    info?: string;
    onChangeCallback?: (value: TypeValue) => void;
}
