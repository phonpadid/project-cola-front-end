export interface IGUseCase<Output, Input = undefined, Id = undefined> {
  execute(input: Input, id: Id): Promise<Output | void>
}
