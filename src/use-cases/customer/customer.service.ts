import type { CustomerEntity } from '@/entities/customer.entity'
import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { CreateCustomerUseCase } from './use-case/create.use-case'
import { GetAllCustomerUseCase } from './use-case/get-all.use-case'
import { GetOneCustomerUseCase } from './use-case/get-one.use-case'
import { RemoveCustomerUseCase } from './use-case/remove.use-case'
import { UpdateCustomerUseCase } from './use-case/update.use-case'

@singleton()
export class CustomerService {
  constructor(
    @inject(GetAllCustomerUseCase) private _getAll: GetAllCustomerUseCase,
    @inject(GetOneCustomerUseCase) private _getOne: GetOneCustomerUseCase,
    @inject(CreateCustomerUseCase) private _create: CreateCustomerUseCase,
    @inject(UpdateCustomerUseCase) private _update: UpdateCustomerUseCase,
    @inject(RemoveCustomerUseCase) private _remove: RemoveCustomerUseCase
  ) {}

  async getAll(
    input: IGPaginate<Pick<CustomerEntity, 'name'>>
  ): Promise<void | IResponse<IGPaginated<CustomerEntity>>> {
    return await this._getAll.execute(input)
  }

  async getOne(input: string): Promise<void | IResponse<CustomerEntity>> {
    return await this._getOne.execute(input)
  }

  async create(input: CustomerDTO): Promise<void | IResponse<CustomerEntity>> {
    return await this._create.execute(input)
  }

  async update(input: CustomerDTO, Id: string): Promise<void | IResponse<CustomerEntity>> {
    return await this._update.execute(input, Id)
  }

  async remove(Id: string): Promise<void | IResponse<CustomerEntity>> {
    return await this._remove.execute(Id)
  }
}
