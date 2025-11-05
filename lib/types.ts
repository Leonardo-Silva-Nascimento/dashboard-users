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
  consultant_id?: string
  consultant?: User
  clients?: User[]
  created_at: string
  updated_at: string
}

export type Consultant = Pick<User, 'id' | 'name' | 'email'>