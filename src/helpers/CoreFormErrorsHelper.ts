import {
    DefaultValues,
    ErrorOption,
    FieldPath,
    FieldValues,
    Path,
} from 'react-hook-form';
import {
    ICoreFormTab,
    ICoreTab,
} from '@/components/Form/CoreFormTabs/interfaces';
import { Message } from 'react-hook-form/dist/types/errors';

export const isCoreFormTab = <T extends FieldValues>(
    tab: ICoreTab | ICoreFormTab<T>,
): tab is ICoreFormTab<T> => {
    return 'ref' in tab;
};

export const applyErrorsToForm = <T extends FieldValues, Y>(
    errorObj: Y,
    setError: (
        name: FieldPath<T> | `root.${string}` | 'root',
        error: ErrorOption,
        options?: { shouldFocus: boolean },
    ) => void,
    defaultValues: DefaultValues<T>,
    currentPath: string = '',
) => {
    for (const key in errorObj) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;

        if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
            applyErrorsToForm(errorObj[key], setError, defaultValues, newPath);
        } else {
            const fieldPath = findFieldPath(defaultValues, newPath);

            if (fieldPath) {
                setError(fieldPath as Path<T>, {
                    type: 'manual',
                    message: errorObj[key] as Message,
                });
            } else {
                const fallbackPath = findFallbackPath(defaultValues, key);
                if (fallbackPath) {
                    setError(fallbackPath as Path<T>, {
                        type: 'manual',
                        message: errorObj[key] as Message,
                    });
                }
            }
        }
    }
};

const findFieldPath = <T>(
    obj: T,
    targetKey: string,
    currentPath: string = '',
): string | null => {
    for (const key in obj) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;

        if (fullPath === targetKey) {
            return fullPath;
        }

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const result = findFieldPath(obj[key], targetKey, fullPath);
            if (result) return result;
        }
    }
    return null;
};

const findFallbackPath = <T>(
    obj: T,
    targetKey: string,
    currentPath: string = '',
): string | null => {
    for (const key in obj) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;

        if (key === targetKey) {
            return fullPath;
        }

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const result = findFallbackPath(obj[key], targetKey, fullPath);
            if (result) return result;
        }
    }
    return null;
};

/* Porque não sei os possiveis erros do backend, precisava ser mapeados todos*/
export const hasMessage = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorData: any,
): errorData is { message: string } => {
    return errorData && typeof errorData.message === 'string';
};
