export enum UserType {
    CONSULTANT = 'CONSULTANT',
    CLIENT = 'CLIENT'
  }
  
  export interface User {
    id: string
    name: string
    email: string
    phone: string
    cpf: string
    age: number
    address: string
    cep: string
    state: string
    complement?: string
    type: UserType
    consultantId?: string
    consultant?: User
    clients?: User[]
    createdAt: Date
    updatedAt: Date
  }
  
  export type Consultant = Pick<User, 'id' | 'name' | 'email'>