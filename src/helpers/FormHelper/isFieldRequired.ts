import { AnySchema } from 'yup';

export const isFieldRequired = (
    schema: AnySchema,
    fieldPath: string,
): boolean => {
    const fieldNames = fieldPath.split('.');
    let currentSchema = schema;

    for (const fieldName of fieldNames) {
        if ('fields' in currentSchema) {
            const fields = (currentSchema as any).fields;
            if (fields && fields[fieldName]) {
                currentSchema = fields[fieldName];
            } else {
                return false; // Campo não encontrado no esquema
            }
        } else {
            return false; // Estrutura inesperada
        }
    }

    // Agora, currentSchema é o esquema do campo específico
    const fieldDescription = currentSchema.describe();

    return fieldDescription.tests.some((test: any) => test.name === 'required');
};
