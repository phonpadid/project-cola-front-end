export interface IMapper<R, E, DTO = any> {
  toEntity(res: R): E
  toDTO?(input: E): DTO
}
