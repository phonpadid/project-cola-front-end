import type { CustomerEntity } from '@/entities/customer.entity'
import type { CustomerDTO } from '../dto/customer.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface ICustomerApi {
  getAll(
    args: IGPaginate<Pick<CustomerEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<CustomerEntity>>>

  getOne(id: string): Promise<IResponse<CustomerEntity>>

  create(item: CustomerDTO): Promise<IResponse<CustomerEntity>>

  update(item: CustomerDTO, id: string): Promise<IResponse<CustomerEntity>>

  remove(id: string): Promise<IResponse<CustomerEntity>>
}
