import type { IHandleException } from '@/interface-adapter/common/handle-exception.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import { AxiosError } from 'axios'

export class HandleException implements IHandleException {
  constructor(error: unknown, private _toast: IToast) {
    if (error instanceof Error) {
      this.handleClientError(error.message)
    }
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          this.handleClientError(error.message)
        } else if (error.response.status >= 500) {
          this.handleServerError(error.message)
        }
      } else {
        this.handleServerError(error.message)
      }
    }
  }

  handleClientError(message: any): void {
    this._toast.warning('ມີບາງຢ່າງຜິດພາດ!', message)
  }

  handleServerError(message: any): void {
    this._toast.error('ເຊີບເວີຜິດພາດ!', message)
  }
}
