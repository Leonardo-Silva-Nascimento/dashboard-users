'use server'

import { supabase } from '../lib/supabase'
import { User, Consultant, UserType } from '../lib/types'

export async function getUsers(consultantId?: string): Promise<User[]> {
  let query = supabase
    .from('users')
    .select(`
      *,
      consultant:users!consultant_id(*),
      clients:users!consultant_id(*)
    `)
    .order('created_at', { ascending: false })

  if (consultantId) {
    query = query.eq('consultant_id', consultantId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao buscar usuários:', error)
    return []
  }

  return data as User[]
}


// lib/actions.ts - apenas as funções que usam ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        consultant:users!consultant_id(*),
        clients:users!consultant_id(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }

    return data as User
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

export async function updateUser(id: string, userData: any): Promise<User | null> {
  try {
    // Garantir que o ID não seja atualizado
    const { id: _, ...dataToUpdate } = userData
    
    const { data, error } = await supabase
      .from('users')
      .update(dataToUpdate)
      .eq('id', id)
      .select(`
        *,
        consultant:users!consultant_id(*),
        clients:users!consultant_id(*)
      `)
      .single()

    if (error) {
      console.error('Erro ao atualizar usuário:', error)
      return null
    }

    return data as User
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return null
  }
}
export async function getConsultants(): Promise<Consultant[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email')
    .eq('type', 'CONSULTANT')
    .order('name', { ascending: true })

  if (error) {
    console.error('Erro ao buscar consultores:', error)
    return []
  }

  return data as Consultant[]
}

export async function createUser(userData: any): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select(`
      *,
      consultant:users!consultant_id(*),
      clients:users!consultant_id(*)
    `)
    .single()

  if (error) {
    console.error('Erro ao criar usuário:', error)
    return null
  }

  return data as User
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao excluir usuário:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro ao excluir usuário:', error)
    return false
  }
}