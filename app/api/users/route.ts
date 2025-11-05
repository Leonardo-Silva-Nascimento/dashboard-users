import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { userSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const consultantId = searchParams.get('consultant')

    const where = consultantId ? { consultantId } : {}

    const users = await prisma.user.findMany({
      where,
      include: {
        consultant: true,
        clients: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const body = userSchema.parse(json)

    const user = await prisma.user.create({
      data: {
        ...body,
        clients: body.type === 'CONSULTANT' ? {
          connect: body.clients?.map((id: string) => ({ id })) || []
        } : undefined
      },
      include: {
        consultant: true,
        clients: true
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}