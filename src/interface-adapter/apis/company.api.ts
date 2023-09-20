import type { CompanyEntity } from '@/entities/company.entity'
import type { CreateCompanyDTO, UpdateCompanyDTO } from '../dto/company.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface ICompanyApi {
  getAll(
    args: IGPaginate<Pick<CompanyEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<CompanyEntity>>>

  getOne(id: string): Promise<IResponse<CompanyEntity>>

  create(item: CreateCompanyDTO): Promise<IResponse<CompanyEntity>>

  update(item: UpdateCompanyDTO, id: string): Promise<IResponse<CompanyEntity>>

  remove(id: string): Promise<IResponse<CompanyEntity>>
}
