import type { IToast } from '@/interface-adapter/toast/toast.interface'
import { useToast } from 'primevue/usetoast'
import { singleton } from 'tsyringe'

export const TOAST_PRIMEVUE = Symbol('TOAST_PRIMEVUE')

@singleton()
export class Toast implements IToast {
  constructor(private _primeToast = useToast()) {}

  success(title: string, detail: string): void {
    this._primeToast.add({ severity: 'success', life: 3000, summary: title, detail })
  }

  info(title: string, detail: string): void {
    this._primeToast.add({ severity: 'info', life: 3000, summary: title, detail })
  }

  remove(title: string, detail: string): void {
    this._primeToast.add({ severity: 'error', life: 3000, summary: title, detail })
  }

  warning(title: string, detail: string): void {
    this._primeToast.add({ severity: 'warn', group: 'exception', summary: title, detail })
  }

  error(title: string, detail: string): void {
    this._primeToast.add({ severity: 'error', group: 'exception', summary: title, detail })
  }
}
