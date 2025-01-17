import { ISelect2Options } from '@/types/ISelect2';

/**
 * Verifica se o objeto possui a propriedade 'label'.
 */
export const hasLabel = <TypeValue, TypeLabel>(
    obj: ISelect2Options<TypeValue, TypeLabel> | TypeValue,
): obj is ISelect2Options<TypeValue, TypeLabel> => {
    return typeof obj === 'object' && obj !== null && 'label' in obj;
};

export const getSelectedValue = <TypeValue, TypeLabel>(
    value: TypeValue | null,
    options: ISelect2Options<TypeValue, TypeLabel>[],
    comparisonFunction?: (
        optionValue: TypeValue,
        fieldValue: TypeValue,
    ) => boolean,
): ISelect2Options<TypeValue, TypeLabel> | null => {
    if (value === null || value == undefined) return null;

    if (typeof value === 'object') {
        if (hasLabel(value)) {
            return value as ISelect2Options<TypeValue, TypeLabel>;
        }

        if (comparisonFunction) {
            return (
                options.find(option =>
                    comparisonFunction(option.value as TypeValue, value as TypeValue),
                ) || null
            );
        }

        return (
            options.find(option => {
                return JSON.stringify(option.value) === JSON.stringify(value);
            }) || null
        );
    }

    return options.find(option => option.value === value) || null;
};
