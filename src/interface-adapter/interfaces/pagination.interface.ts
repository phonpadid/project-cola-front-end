export interface IGPaginate<Entity> {
  page?: number
  first?: number
  limit?: number
  filter: Partial<Entity>
}

export interface IGPaginated<Entity> {
  props: Entity[]
  total: number
}
