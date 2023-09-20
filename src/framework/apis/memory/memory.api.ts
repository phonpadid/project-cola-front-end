import type { BankEntity } from '@/entities/bank.entity'
import type { CompanyEntity } from '@/entities/company.entity'
import type { CustomerEntity } from '@/entities/customer.entity'
import type { ItemEntity } from '@/entities/item.enttiy'
import type { PermissionEntity } from '@/entities/permission.entity'
import type { QuotationEntity } from '@/entities/quotation.entity'
import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { RoleEntity } from '@/entities/role.entity'
import type { UserEntity } from '@/entities/user.entity'
import { singleton } from 'tsyringe'
@singleton()
export class MemoryApi {
  public users: UserEntity[]
  public roles: RoleEntity[]
  public permissions: PermissionEntity[]
  public customers: CustomerEntity[]
  public company: CompanyEntity[]
  public bank: BankEntity[]
  public items: ItemEntity[] = []
  public quotationType: QuotationTypeEntity[]
  public quotetions: QuotationEntity[] = []

  constructor() {
    this.users = [
      {
        id: '1',
        name: 'user 1',
        email: 'user@gmail.com',
        password: 'password',
        tel: '+8562099999999',
        profile: '',
        role: { id: '1' },
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'user 2',
        email: 'user1@gmail.com',
        password: 'password',
        tel: '+85620888888888',
        profile: '',
        company: { id: '1' },
        role: { id: '2' },
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'user 3',
        email: 'user2@gmail.com',
        password: 'password',
        tel: '+856207777777',
        profile: 'https://lapnet.com.la/storage/members/June2020/LDB_1.png',
        company: { id: '1' },
        role: { id: '3' },
        createdAt: new Date()
      }
    ]

    for (let i = 0; i < 20; i++) {
      this.users.push({
        id: `${i + 4}`,
        name: `user${i + 4}`,
        email: `user${i + 3}@gmail.com`,
        password: 'password',
        tel: '+8562099887766',
        profile: 'https://lapnet.com.la/storage/members/June2020/LDB_1.png',
        company: { id: '1' },
        role: { id: '3' },
        createdAt: new Date()
      })
    }

    this.roles = [
      {
        id: '1',
        name: 'super-admin'
      },
      {
        id: '2',
        name: 'admin'
      },
      {
        id: '3',
        name: 'ຜູ້ອອກໃບບິນ ແລະ ໃບສະເໜີລາຄາ',
        permissions: [{ id: '1' }, { id: '3' }],
        company: { id: '1' }
      }
    ]
    for (let i = 1; i < 20; i++) {
      this.roles.push({
        id: `${i + 3}`,
        name: 'test',
        permissions: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
        company: { id: '1' }
      })
    }

    this.permissions = [
      { id: '1', name: 'invoice' },
      { id: '2', name: 'purchase-order' },
      { id: '3', name: 'quotation' },
      { id: '4', name: 'receipt' }
    ]

    this.customers = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown USA',
        logo: 'https://static.tvtropes.org/pmwiki/pub/images/nyllkmr_1.jpg'
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '555-555-5555',
        address: '456 Oak St, Anycity USA',
        logo: ''
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        phone: '999-999-9999',
        address: '789 Elm St, Anystate USA',
        logo: ''
      },
      {
        id: '4',
        name: 'Alice Adams',
        email: 'alice.adams@example.com',
        phone: '555-123-4567',
        address: '321 Elm St, Anystate USA',
        logo: ''
      },
      {
        id: '5',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        phone: '123-555-7890',
        address: '456 Main St, Anycity USA',
        logo: ''
      },
      {
        id: '6',
        name: 'Ella Fitzgerald',
        email: 'ella.fitzgerald@example.com',
        phone: '555-555-1234',
        address: '123 Oak St, Anytown USA',
        logo: ''
      },
      {
        id: '7',
        name: 'Frank Sinatra',
        email: 'frank.sinatra@example.com',
        phone: '555-123-4567',
        address: '789 Main St, Anystate USA',
        logo: ''
      },
      {
        id: '8',
        name: 'Greta Garbo',
        email: 'greta.garbo@example.com',
        phone: '123-555-7890',
        address: '456 Oak St, Anytown USA',
        logo: ''
      },
      {
        id: '9',
        name: 'Humphrey Bogart',
        email: 'humphrey.bogart@example.com',
        phone: '555-555-1234',
        address: '123 Main St, Anystate USA',
        logo: ''
      },
      {
        id: '10',
        name: 'Ingrid Bergman',
        email: 'ingrid.bergman@example.com',
        phone: '555-123-4567',
        address: '789 Oak St, Anytown USA',
        logo: ''
      },
      {
        id: '11',
        name: 'James Dean',
        email: 'james.dean@example.com',
        phone: '123-555-7890',
        address: '456 Main St, Anystate USA',
        logo: ''
      },
      {
        id: '12',
        name: 'Katharine Hepburn',
        email: 'katharine.hepburn@example.com',
        phone: '555-555-1234',
        address: '123 Oak St, Anytown USA',
        logo: ''
      },
      {
        id: '13',
        name: 'Lauren Bacall',
        email: 'lauren.bacall@example.com',
        phone: '555-123-4567',
        address: '789 Elm St, Anycity USA',
        logo: ''
      },
      {
        id: '14',
        name: 'Marilyn Monroe',
        email: 'marilyn.monroe@example.com',
        phone: '123-555-7890',
        address: '456 Main St, Anytown USA',
        logo: ''
      },
      {
        id: '15',
        name: 'Natalie Wood',
        email: 'natalie.wood@example.com',
        phone: '555-555-1234',
        address: '123 Oak St, Anycity USA',
        logo: ''
      },
      {
        id: '16',
        name: 'Orson Welles',
        email: 'orson.welles@example.com',
        phone: '555-123-4567',
        address: '789 Main St, Anytown USA',
        logo: ''
      },
      {
        id: '17',
        name: 'Paul Newman',
        email: 'paul.newman@example.com',
        phone: '123-555-7890',
        address: '456 Oak St, Anystate USA',
        logo: ''
      },
      {
        id: '18',
        name: 'Queen Elizabeth II',
        email: 'queen.elizabeth@example.com',
        phone: '555-555-1234',
        address: '123 Main St, Anytown USA',
        logo: ''
      },
      {
        id: '19',
        name: 'Rita Hayworth',
        email: 'rita.hayworth@example.com',
        phone: '555-123-4567',
        address: '789 Elm St, Anytown USA',
        logo: ''
      },
      {
        id: '20',
        name: 'Steve McQueen',
        email: 'steve.mcqueen@example.com',
        phone: '123-555-7890',
        address: '456 Main St, Anytown USA',
        logo: ''
      }
    ]
    this.company = [
      {
        id: '1',
        name: 'ABC Inc.',
        email: 'abc@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        logo: 'https://lapnet.com.la/storage/members/June2020/LDB_1.png',
        users: [
          {
            id: '1'
          }
        ]
      },
      {
        id: '2',
        name: 'XYZ Co.',
        email: 'xyz@example.com',
        phone: '987-654-3210',
        address: '456 Oak Ave',
        logo: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ttisypccwnhufcnlpayy'
      },
      {
        id: '3',
        name: 'DEF Corporation',
        email: 'def@example.com',
        phone: '555-123-4567',
        address: '789 Elm Rd',
        logo: 'https://lapnet.com.la/storage/members/June2020/LDB_1.png'
      },
      {
        id: '4',
        name: 'GHI Ltd.',
        email: 'ghi@example.com',
        phone: '111-222-3333',
        address: '101 Pine Ln',
        logo: 'https://www.jdbbank.com.la/wp-content/uploads/2019/05/jdb-ico.png'
      },
      {
        id: '5',
        name: 'JKL Enterprises',
        email: 'jkl@example.com',
        phone: '444-555-6666',
        address: '222 Cedar Blvd',
        logo: '/logo.png'
      },
      {
        id: '6',
        name: 'MNO Group',
        email: 'mno@example.com',
        phone: '777-888-9999',
        address: '333 Maple Ave',
        logo: 'https://lapnet.com.la/storage/members/June2020/LDB_1.png'
      },
      {
        id: '7',
        name: 'PQR Holdings',
        email: 'pqr@example.com',
        phone: '666-555-4444',
        address: '444 Birch St',
        logo: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ttisypccwnhufcnlpayy'
      },
      {
        id: '8',
        name: 'STU Ltd.',
        email: 'stu@example.com',
        phone: '222-333-4444',
        address: '555 Oak Rd',
        logo: 'https://www.jdbbank.com.la/wp-content/uploads/2019/05/jdb-ico.png'
      },
      {
        id: '9',
        name: 'VWX Solutions',
        email: 'vwx@example.com',
        phone: '888-999-0000',
        address: '666 Pine Ave',
        logo: '/logo.png'
      },
      {
        id: '10',
        name: 'YZA Innovations',
        email: 'yza@example.com',
        phone: '123-987-5678',
        address: '777 Elm Blvd',
        logo: '/logo.png'
      },
      {
        id: '11',
        name: 'BCD Ventures',
        email: 'bcd@example.com',
        phone: '555-666-7777',
        address: '888 Maple Rd',
        logo: '/logo.png'
      },
      {
        id: '12',
        name: 'EFG Services',
        email: 'efg@example.com',
        phone: '999-888-7777',
        address: '999 Birch Ave',
        logo: '/logo.png'
      },
      {
        id: '13',
        name: 'HIJ Systems',
        email: 'hij@example.com',
        phone: '777-777-8888',
        address: '101 Pine Ln',
        logo: '/logo.png'
      },
      {
        id: '14',
        name: 'KLM Enterprises',
        email: 'klm@example.com',
        phone: '444-444-5555',
        address: '222 Cedar Blvd',
        logo: '/logo.png'
      },
      {
        id: '15',
        name: 'NOP Corporation',
        email: 'nop@example.com',
        phone: '333-333-4444',
        address: '333 Maple Ave',
        logo: '/logo.png'
      },
      {
        id: '16',
        name: 'QRS Inc.',
        email: 'qrs@example.com',
        phone: '222-222-3333',
        address: '444 Birch St',
        logo: '/logo.png'
      },
      {
        id: '17',
        name: 'TUV Holdings',
        email: 'tuv@example.com',
        phone: '888-888-9999',
        address: '555 Oak Rd',
        logo: '/logo.png'
      },
      {
        id: '18',
        name: 'WXY Ltd.',
        email: 'wxy@example.com',
        phone: '111-111-2222',
        address: '666 Pine Ave',
        logo: '/logo.png'
      },
      {
        id: '19',
        name: 'ZAB Solutions',
        email: 'zab@example.com',
        phone: '555-555-6666',
        address: '777 Elm Blvd',
        logo: '/logo.png'
      },
      {
        id: '20',
        name: 'CDE Innovations',
        email: 'cde@example.com',
        phone: '222-222-2222',
        address: '888 Maple Rd',
        logo: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ttisypccwnhufcnlpayy',
        users: [
          {
            id: '2'
          }
        ]
      }
    ]
    this.bank = [
      {
        id: '1',
        bankName: 'Bank of Example',
        accountName: 'John Doe',
        accountNumber: '1234567890999999',
        company: { id: '1' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '2',
        bankName: 'ABC Bank',
        accountName: 'Jane Smith',
        accountNumber: '9876543211111111',
        company: { id: '4' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '3',
        bankName: 'Financial Trust',
        accountName: 'Michael Johnson',
        accountNumber: '5555555556666666',
        company: { id: '7' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '4',
        bankName: 'City Credit Union',
        accountName: 'Emily Williams',
        accountNumber: '1112223334444444',
        company: { id: '1' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '5',
        bankName: 'First National Bank',
        accountName: 'David Brown',
        accountNumber: '4444444445555555',
        company: { id: '3' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '6',
        bankName: 'Community Savings',
        accountName: 'Sarah Davis',
        accountNumber: '6667778889999999',
        company: { id: '6' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '7',
        bankName: 'Global Finance',
        accountName: 'Chris Miller',
        accountNumber: '9990001112222222',
        company: { id: '9' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '8',
        bankName: 'Mega Bank',
        accountName: 'Amanda Wilson',
        accountNumber: '1231231234444444',
        company: { id: '2' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '9',
        bankName: 'Union Trust',
        accountName: 'Robert Lee',
        accountNumber: '7897897891111111',
        company: { id: '5' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '10',
        bankName: 'Investment Bank Corp',
        accountName: 'Karen Martinez',
        accountNumber: '4564564567777777',
        company: { id: '8' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '11',
        bankName: 'Financial Solutions',
        accountName: 'Jason Taylor',
        accountNumber: '2223334445555555',
        company: { id: '1' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '12',
        bankName: 'Premier Banking',
        accountName: 'Laura Anderson',
        accountNumber: '5556667778888888',
        company: { id: '4' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '13',
        bankName: 'Modern Finance',
        accountName: 'Daniel White',
        accountNumber: '8889990001111111',
        company: { id: '7' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '14',
        bankName: 'Economy Bank',
        accountName: 'Olivia Harris',
        accountNumber: '3334445556666666',
        company: { id: '1' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '15',
        bankName: 'Trustworthy Savings',
        accountName: 'William Jackson',
        accountNumber: '6667778889999999',
        company: { id: '3' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '16',
        bankName: 'Global Investments',
        accountName: 'Sophia Clark',
        accountNumber: '9990001112222222',
        company: { id: '6' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '17',
        bankName: 'City Finance',
        accountName: 'Ethan Adams',
        accountNumber: '1231231234444444',
        company: { id: '9' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '18',
        bankName: 'Community Bank',
        accountName: 'Isabella Turner',
        accountNumber: '7897897891111111',
        company: { id: '2' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '19',
        bankName: 'Secure Funds',
        accountName: 'Mason Scott',
        accountNumber: '4564564567777777',
        company: { id: '5' },
        status: 'inactive',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      },
      {
        id: '20',
        bankName: 'Financial Partners',
        accountName: 'Emma Murphy',
        accountNumber: '2223334445555555',
        company: { id: '8' },
        status: 'active',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti adipisci excepturi facilis repellendus ipsum reiciendis assumenda vero eveniet ad.'
      }
    ]
    this.quotationType = [
      {
        id: '1',
        name: 'Type A',
        rateKip: 1000,
        rateBath: 3500,
        rateDollar: 1200
      },
      {
        id: '2',
        name: 'Type B',
        rateKip: 950,
        rateBath: 3200,
        rateDollar: 1500
      },
      {
        id: '3',
        name: 'Type C',
        rateKip: 1100,
        rateBath: 4000,
        rateDollar: 1000
      },
      {
        id: '4',
        name: 'Type D',
        rateKip: 900,
        rateBath: 2800,
        rateDollar: 1800
      },
      {
        id: '5',
        name: 'Type E',
        rateKip: 1050,
        rateBath: 3800,
        rateDollar: 1100
      },
      {
        id: '6',
        name: 'Type F',
        rateKip: 980,
        rateBath: 3000,
        rateDollar: 1700
      },
      {
        id: '7',
        name: 'Type G',
        rateKip: 1150,
        rateBath: 4200,
        rateDollar: 1900
      },
      {
        id: '8',
        name: 'Type H',
        rateKip: 850,
        rateBath: 2500,
        rateDollar: 2000
      },
      {
        id: '9',
        name: 'Type I',
        rateKip: 1000,
        rateBath: 3500,
        rateDollar: 1200
      },
      {
        id: '10',
        name: 'Type J',
        rateKip: 950,
        rateBath: 3200,
        rateDollar: 1500
      },
      {
        id: '11',
        name: 'Type K',
        rateKip: 1100,
        rateBath: 4000,
        rateDollar: 1000
      },
      {
        id: '12',
        name: 'Type L',
        rateKip: 900,
        rateBath: 2800,
        rateDollar: 1800
      },
      {
        id: '13',
        name: 'Type M',
        rateKip: 1050,
        rateBath: 3800,
        rateDollar: 1100
      },
      {
        id: '14',
        name: 'Type N',
        rateKip: 980,
        rateBath: 3000,
        rateDollar: 1700
      },
      {
        id: '15',
        name: 'Type O',
        rateKip: 1150,
        rateBath: 4200,
        rateDollar: 2900
      },
      {
        id: '16',
        name: 'Type P',
        rateKip: 850,
        rateBath: 2500,
        rateDollar: 2000
      },
      {
        id: '17',
        name: 'Type Q',
        rateKip: 1000,
        rateBath: 3500,
        rateDollar: 1200
      },
      {
        id: '18',
        name: 'Type R',
        rateKip: 950,
        rateBath: 3200,
        rateDollar: 1500
      },
      {
        id: '19',
        name: 'Type S',
        rateKip: 1100,
        rateBath: 4000,
        rateDollar: 1000
      },
      {
        id: '20',
        name: 'Type T',
        rateKip: 900,
        rateBath: 2800,
        rateDollar: 1800
      }
    ]

    for (let itemIdx = 0; itemIdx < 20; itemIdx++) {
      this.items.push({
        id: `${itemIdx + 1}`,
        orderNumber: 1,
        quotation: { id: `QUAT${itemIdx + 1}` },
        name: `Item ${itemIdx + 1}-1`,
        description: `Description for Item ${itemIdx + 1}-1`,
        price: 50 + itemIdx,
        qty: itemIdx + 1
      })
    }
    for (let qIdx = 0; qIdx < 20; qIdx++) {
      const items = [1, 2]
      this.quotetions.push({
        id: `QUAT${qIdx + 1}`,
        name: `Quotation ${qIdx + 1}`,
        startDate: new Date(`2023-08-${qIdx + 1}`),
        endDate: new Date(`2023-09-${qIdx + 1}`),
        total: 1000 + qIdx * 100,
        from: { id: `${qIdx + 1}` },
        status: 'in progress',
        billTo: { id: `${qIdx + 1}` },
        currency: '$',
        items: items.map((item) => ({
          id: String(item + (qIdx + 1)),
          quotation: { id: `QUAT${qIdx + 1}` }
        })),
        tax: 7,
        discount: 10,
        note: `Sample note for Quotation ${qIdx + 1}`
      })
    }
  }
}
