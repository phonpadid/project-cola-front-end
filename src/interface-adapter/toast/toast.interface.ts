export interface IToast {
  success(title: string, detail: string): void

  info(title: string, detail: string): void

  remove(title: string, detail: string): void

  warning(title: string, detail: string): void

  error(title: string, detail: string): void
}
