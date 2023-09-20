export interface IGState<Paginated, Entity> {
  list: Paginated
  data: Partial<Entity>
  isLoading: boolean
  error: any
}
