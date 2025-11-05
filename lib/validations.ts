// lib/validations.ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  age: z.number().min(1, 'Idade é obrigatória'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  state: z.string().min(1, 'Estado é obrigatório'),
  complement: z.string().optional(),
  type: z.enum(['CONSULTANT', 'CLIENT']),
  consultantId: z.string().optional(),
  clients: z.array(z.string()).optional()
})