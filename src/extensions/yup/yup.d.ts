// yup.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Yup from 'yup';

declare module 'yup' {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface StringSchema {
        cpf(): this;
        cnpj(): this;
        phone(): this;
        customDate(): this;
        moneyBR(allowZero?: boolean): this;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface MixedSchema {
        file(options?: {
            allowedExtensions?: string[];
            maxSize?: number;
        }): this;
    }
}
