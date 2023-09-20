import type { CompanyEntity } from '@/entities/company.entity'
import type { CreateCompanyDTO, UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { CreateCompanyUseCase } from './use-case/create.use-case'
import { GetAllCompanyUseCase } from './use-case/get-all.use-case'
import { GetOneCompanyUseCase } from './use-case/get-one.use-case'
import { RemoveCompanyUseCase } from './use-case/remove.use-case'
import { UpdateCompanyUseCase } from './use-case/update.use-case'

@singleton()
export class CompanyService {
  constructor(
    @inject(GetAllCompanyUseCase) private _getAll: GetAllCompanyUseCase,
    @inject(GetOneCompanyUseCase) private _getOne: GetOneCompanyUseCase,
    @inject(CreateCompanyUseCase) private _create: CreateCompanyUseCase,
    @inject(UpdateCompanyUseCase) private _update: UpdateCompanyUseCase,
    @inject(RemoveCompanyUseCase) private _remove: RemoveCompanyUseCase
  ) {}

  async getAll(
    input: IGPaginate<Pick<CompanyEntity, 'name'>>
  ): Promise<void | IResponse<IGPaginated<CompanyEntity>>> {
    return await this._getAll.execute(input)
  }

  async getOne(input: string): Promise<void | IResponse<CompanyEntity>> {
    return await this._getOne.execute(input)
  }

  async create(input: CreateCompanyDTO): Promise<void | IResponse<CompanyEntity>> {
    return await this._create.execute(input)
  }

  async update(input: UpdateCompanyDTO, Id: string): Promise<void | IResponse<CompanyEntity>> {
    return await this._update.execute(input, Id)
  }

  async remove(Id: string): Promise<void | IResponse<CompanyEntity>> {
    return await this._remove.execute(Id)
  }
}
