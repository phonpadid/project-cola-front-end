export interface IHandleException {
  handleClientError(message: any): void

  handleServerError( message: any): void
}
