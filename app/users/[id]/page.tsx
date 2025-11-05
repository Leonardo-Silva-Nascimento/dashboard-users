import UserForm from '@/components/users/user-form'
import { getUserById, getConsultants } from '@/lib/actions'
import { notFound } from 'next/navigation'

export default async function EditUserPage({
  params,
}: {
  params: { id: string }
}) {
  const [user, consultants] = await Promise.all([
    getUserById(params.id),
    getConsultants()
  ])

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Editar usuário</h1>
      <UserForm user={user} consultants={consultants} />
    </div>
  )
}