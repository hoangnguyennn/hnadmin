declare namespace Types {
  export interface ISnackbarOption {
    message: string
    title?: string
  }

  export interface ISnackbar extends ISnackbarOption {
    id: string
  }
}
