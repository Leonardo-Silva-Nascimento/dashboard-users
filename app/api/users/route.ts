import { NextRequest, NextResponse } from 'next/server'
import { getUsers, createUser } from '../../../lib/actions'
import { userSchema } from '../../../lib/validations'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getUserById(params.id)

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar usuário' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const json = await request.json()
    const body = userSchema.parse(json)

    const user = await updateUser(params.id, body)

    if (!user) {
      return NextResponse.json(
        { error: 'Erro ao atualizar usuário' },
        { status: 500 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const success = await deleteUser(params.id)

    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao excluir usuário' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir usuário' },
      { status: 500 }
    )
  }
}