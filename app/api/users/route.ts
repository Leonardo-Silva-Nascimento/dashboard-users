import { NextRequest, NextResponse } from 'next/server'
import { getUsers, createUser } from '@/lib/actions'
import { userSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const consultantId = searchParams.get('consultant') || undefined

    const users = await getUsers(consultantId)
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

    const user = await createUser(body)

    if (!user) {
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}