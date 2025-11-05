'use server'

import { supabase } from '@/lib/supabase'
import { User, Consultant, UserType } from '@/lib/types'

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

export async function getUserById(id: string): Promise<User | null> {
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

export async function updateUser(id: string, userData: any): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
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
}

export async function deleteUser(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir usuário:', error)
    return false
  }

  return true
}

export async function getUserMetrics(consultantId?: string) {
  let clientQuery = supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'CLIENT')

  if (consultantId) {
    clientQuery = clientQuery.eq('consultant_id', consultantId)
  }

  const { count: totalClients, error: totalError } = await clientQuery

  if (totalError) {
    console.error('Erro ao contar clientes:', totalError)
  }

  // Clientes dos últimos 7 dias
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  let last7DaysQuery = supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'CLIENT')
    .gte('created_at', sevenDaysAgo.toISOString())

  if (consultantId) {
    last7DaysQuery = last7DaysQuery.eq('consultant_id', consultantId)
  }

  const { count: last7Days, error: last7Error } = await last7DaysQuery

  if (last7Error) {
    console.error('Erro ao contar clientes dos últimos 7 dias:', last7Error)
  }

  return {
    totalClients: totalClients || 0,
    last7Days: last7Days || 0,
    selectedConsultant: consultantId
  }
}