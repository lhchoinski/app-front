export interface ISweetAlertQuestion {
    title: string,
    text?: string,
    callbackYes: () => void
    callbackNo?: () => void
}
