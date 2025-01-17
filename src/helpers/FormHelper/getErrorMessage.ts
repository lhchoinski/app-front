import { FieldErrors, FieldValues, Path } from 'react-hook-form';
import { get } from 'lodash';

export function getErrorMessage<T extends FieldValues>(
    errors: FieldErrors<T>,
    fieldPath: Path<T>
): string | undefined {
    return get(errors, `${fieldPath}.message`) as string | undefined;
}
