import { FieldValues, Path } from 'react-hook-form';

export interface IFormInputFileProps<T extends FieldValues> {
    fieldPath: Path<T>;
    label: string;
    disabled?: boolean;
    info?: string;
    required?: boolean;
    accept?: string[];
    multiple?: boolean;
    onDrop?: (files: File[]) => void;
}
