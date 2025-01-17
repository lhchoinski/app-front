export interface LoaderContextProps {
    startLoading: (id?: string) => void;
    stopLoading: (id?: string) => void;
    isLoading: (id?: string) => boolean;
}
