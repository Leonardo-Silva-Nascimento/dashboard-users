import { supabase } from '../lib/supabase'
import { UserType } from '../lib/types'

async function seedSupabase() {
  console.log('Iniciando seed do Supabase...')

  // Limpar dados existentes
  const { error: deleteError } = await supabase
    .from('users')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

  if (deleteError) {
    console.error('Erro ao limpar dados:', deleteError)
  }

  // Criar consultores
  const consultant1 = {
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

  const consultant2 = {
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

  const { data: cons1, error: error1 } = await supabase
    .from('users')
    .insert(consultant1)
    .select()
    .single()

  const { data: cons2, error: error2 } = await supabase
    .from('users')
    .insert(consultant2)
    .select()
    .single()

  if (error1 || error2) {
    console.error('Erro ao criar consultores:', error1 || error2)
    return
  }

  // Criar clientes
  const clients = [
    {
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 77777-7777',
      cpf: '111.222.333-44',
      age: 42,
      address: 'Rua Augusta, 500',
      cep: '01305-000',
      state: 'SP',
      consultant_id: cons1.id,
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
      consultant_id: cons1.id,
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
      consultant_id: cons2.id,
      type: UserType.CLIENT
    }
  ]

  const { error: clientsError } = await supabase
    .from('users')
    .insert(clients)

  if (clientsError) {
    console.error('Erro ao criar clientes:', clientsError)
  } else {
    console.log('Seed completed!')
    console.log(`- ${cons1.name} (Consultor)`)
    console.log(`- ${cons2.name} (Consultor)`)
    console.log('- 3 clientes criados')
  }
}

// Executar o seed
seedSupabase()