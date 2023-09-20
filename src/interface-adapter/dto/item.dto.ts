export interface ItemDTO {
  id?: string
  name: string
  description?: string
  orderNumber?: number
  price?: number
  qty?: number
  quoId?: string
}

export interface ReorderRowItemDTO {
  orderNumber: number
  id: string
}
