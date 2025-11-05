// prisma/seed.ts
import { PrismaClient, UserType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar consultores
  const consultant1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao.silva@varos.com',
      phone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      age: 35,
      address: 'Rua das Flores, 123',
      cep: '01234-567',
      state: 'SP',
      type: UserType.CONSULTANT
    }
  })

  const consultant2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria.santos@varos.com',
      phone: '(11) 88888-8888',
      cpf: '987.654.321-00',
      age: 28,
      address: 'Av. Paulista, 1000',
      cep: '01310-100',
      state: 'SP',
      type: UserType.CONSULTANT
    }
  })

  // Criar clientes
  await prisma.user.createMany({
    data: [
      {
        name: 'Carlos Oliveira',
        email: 'carlos@email.com',
        phone: '(11) 77777-7777',
        cpf: '111.222.333-44',
        age: 42,
        address: 'Rua Augusta, 500',
        cep: '01305-000',
        state: 'SP',
        consultantId: consultant1.id,
        type: UserType.CLIENT
      },
      {
        name: 'Ana Costa',
        email: 'ana@email.com',
        phone: '(11) 66666-6666',
        cpf: '555.666.777-88',
        age: 31,
        address: 'Alameda Santos, 200',
        cep: '01418-000',
        state: 'SP',
        consultantId: consultant1.id,
        type: UserType.CLIENT
      },
      {
        name: 'Pedro Almeida',
        email: 'pedro@email.com',
        phone: '(11) 55555-5555',
        cpf: '999.888.777-66',
        age: 29,
        address: 'Rua Haddock Lobo, 300',
        cep: '01414-000',
        state: 'SP',
        consultantId: consultant2.id,
        type: UserType.CLIENT
      }
    ]
  })

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })