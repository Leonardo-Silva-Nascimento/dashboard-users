'use server'

import { prisma } from '@/lib/db'
import { User, Consultant } from '@/lib/types'

export async function getUsers(consultantId?: string): Promise<User[]> {
  const where = consultantId ? { consultantId } : {}
  
  const users = await prisma.user.findMany({
    where,
    include: {
      consultant: true,
      clients: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return users as User[]
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      consultant: true,
      clients: true
    }
  })

  return user as User | null
}

export async function getConsultants(): Promise<Consultant[]> {
  const consultants = await prisma.user.findMany({
    where: { type: 'CONSULTANT' },
    select: {
      id: true,
      name: true,
      email: true
    },
    orderBy: { name: 'asc' }
  })

  return consultants
}

export async function getUserMetrics(consultantId?: string) {
  const totalClients = await prisma.user.count({
    where: { 
      type: 'CLIENT',
      ...(consultantId && { consultantId })
    }
  })

  const last7Days = await prisma.user.count({
    where: {
      type: 'CLIENT',
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      ...(consultantId && { consultantId })
    }
  })

  return {
    totalClients,
    last7Days,
    selectedConsultant: consultantId
  }
}