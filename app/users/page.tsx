// app/users/page.tsx
import { Suspense } from 'react'
import UsersTable from '@/components/users/users-table'
import { Button } from '@/components/ui/button'
import { getUsers } from '@/lib/actions'
import Link from 'next/link'

export default async function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
        <Link href="/users/create">
          <Button>Criar Usuário</Button>
        </Link>
      </div>
      
      <Suspense fallback={<TableSkeleton />}>
        <UsersTableSection />
      </Suspense>
    </div>
  )
}

async function UsersTableSection() {
  const users = await getUsers()
  return <UsersTable users={users} />
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-200 animate-pulse h-12 rounded-lg"></div>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="bg-gray-200 animate-pulse h-16 rounded-lg"></div>
      ))}
    </div>
  )
}