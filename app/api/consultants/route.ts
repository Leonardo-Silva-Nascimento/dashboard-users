import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function GET() {
  try {
    const consultants = await prisma.user.findMany({
      where: { type: 'CONSULTANT' },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(consultants)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar consultores' },
      { status: 500 }
    )
  }
}