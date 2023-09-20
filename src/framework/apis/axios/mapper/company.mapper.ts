import type { CompanyEntity } from '@/entities/company.entity'
import type { CompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IMapper } from '@/interface-adapter/mapper'
import { injectable } from 'tsyringe'

@injectable()
export class CompanyMapper implements IMapper<any, CompanyEntity, CompanyDTO> {
  toEntity(res: any): CompanyEntity {
    return {
      id: res.id,
      name: res.company_name,
      email: res.email,
      phone: res.phone,
      address: res.address,
      image: res['url.logo']
    }
  }

  toDTO(input: CompanyEntity): CompanyDTO {
    return {
      company_name: input.name as string,
      email: input.email as string,
      phone: input.phone as string,
      address: input.address as string,
      logo: input.image
    }
  }
}
