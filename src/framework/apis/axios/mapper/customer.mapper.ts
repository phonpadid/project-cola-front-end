import type { CustomerEntity } from '@/entities/customer.entity'
import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import type { IMapper } from '@/interface-adapter/mapper'
import { injectable } from 'tsyringe'

@injectable()
export class CustomerMapper implements IMapper<any, CustomerEntity, CustomerDTO> {
  toEntity(res: any): CustomerEntity {
    return {
      id: res.id,
      name: res.company_name,
      email: res.email,
      phone: res.phone,
      address: res.address,
      image: res['url.logo']
    }
  }

  toDTO(input: CustomerEntity): CustomerDTO {
    return {
      company_name: input.name as string,
      email: input.email as string,
      phone: input.phone as string,
      address: input.address as string,
      logo: input.image
    }
  }
}
