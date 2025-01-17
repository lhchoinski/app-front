export interface ISelect2<T, L> {
    total: number;
    results: ISelect2Options<T, L>[];
}

export interface ISelect2Options<T, L> {
    value: T | null;
    label: L;
    disabled?: boolean;
    selected?: boolean;
}

export interface ISelect2Group<T, L> {
    results: ISelect2GroupOptions<T, L>[];
}

export interface ISelect2GroupOptions<T, L> {
    text: T;
    children: ISelect2Options<T, L>[];
}
