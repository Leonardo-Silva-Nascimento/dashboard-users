// app/api/consultants/route.ts
import { NextResponse } from 'next/server'
import { getConsultants } from '.././../../lib/actions'

export async function GET() {
  try {
    const consultants = await getConsultants()
    return NextResponse.json(consultants)
  } catch (error) {
    console.error('Erro ao buscar consultores:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar consultores' },
      { status: 500 }
    )
  }
}