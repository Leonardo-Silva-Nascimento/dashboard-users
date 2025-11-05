// app/users/create/page.tsx
import UserForm from '@/components/users/user-form'
import { getConsultants } from '@/lib/actions'

export default async function CreateUserPage() {
  const consultants = await getConsultants()
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Criar usuário</h1>
      <UserForm consultants={consultants} />
    </div>
  )
}