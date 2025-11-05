// components/dashboard/client-table.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { User, Consultant } from '@/lib/types'

interface ClientTableProps {
  users: User[]
  consultants: Consultant[]
}

export default function ClientTable({ users, consultants }: ClientTableProps) {
  const router = useRouter()
  const [selectedConsultant, setSelectedConsultant] = useState('')

  const handleConsultantChange = (consultantId: string) => {
    setSelectedConsultant(consultantId)
    const url = new URL(window.location.href)
    if (consultantId) {
      url.searchParams.set('consultant', consultantId)
    } else {
      url.searchParams.delete('consultant')
    }
    router.push(url.toString())
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label htmlFor="consultant" className="text-sm font-medium">
            Filtrar por consultor:
          </label>
          <select
            id="consultant"
            value={selectedConsultant}
            onChange={(e) => handleConsultantChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Todos os consultores</option>
            {consultants.map(consultant => (
              <option key={consultant.id} value={consultant.id}>
                {consultant.name}
              </option>
            ))}
          </select>
        </div>
        
        <Button onClick={() => router.push('/users/create')}>
          Criar Usuário
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell>{user.age} anos</TableCell>
                <TableCell className="max-w-xs truncate">{user.address}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/users/${user.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        if (confirm('Tem certeza que deseja excluir este usuário?')) {
                          await fetch(`/api/users/${user.id}`, { method: 'DELETE' })
                          router.refresh()
                        }
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}