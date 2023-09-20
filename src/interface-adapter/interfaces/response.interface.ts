export type responseStatus = 'success' | 'warn' | 'error'

export interface IResponse<Entity> {
  data?: Entity
  message?: string
  status: responseStatus
}
