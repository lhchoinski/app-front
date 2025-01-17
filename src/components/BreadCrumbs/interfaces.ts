export interface IBreadcrumbsProps {
    items?: IBreadcrumbItem[];
}

export interface IBreadcrumbItem {
    label: string;
    uri?: string | null;
    icon?: string | null;
}
