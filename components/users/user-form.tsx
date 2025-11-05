'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { User, Consultant, UserType } from '../../lib/types'
import { userSchema } from '../../lib/validations'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
interface UserFormProps {
  user?: User
  consultants: Consultant[]
}

export default function UserForm({ user, consultants }: UserFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cpf: user?.cpf || '',
    age: user?.age || 0,
    address: user?.address || '',
    cep: user?.cep || '',
    state: user?.state || '',
    complement: user?.complement || '',
    type: user?.type || UserType.CLIENT,
    consultantId: user?.consultantId || '',
    clients: user?.clients?.map(c => c.id) || []
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const validatedData = userSchema.parse(formData)
      
      const url = user ? `/api/users/${user.id}` : '/api/users'
      const method = user ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar usuário')
      }

      router.push('/users')
      router.refresh()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        setErrors({ submit: 'Erro ao salvar usuário' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tipo do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle>Tipo do usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value={UserType.CLIENT}
                checked={formData.type === UserType.CLIENT}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="rounded"
              />
              <span>Cliente</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value={UserType.CONSULTANT}
                checked={formData.type === UserType.CONSULTANT}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="rounded"
              />
              <span>Consultor</span>
            </label>
          </div>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </CardContent>
      </Card>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Digite o telefone"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Digite o email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Idade</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                placeholder="28 anos"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CPF</label>
              <Input
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
              />
              {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CEP</label>
              <Input
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                placeholder="Insira o CEP"
              />
              {errors.cep && <p className="text-red-500 text-sm">{errors.cep}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Selecione o estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
              </select>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Endereço</label>
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Digite o endereço"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Complemento</label>
            <Input
              value={formData.complement}
              onChange={(e) => handleInputChange('complement', e.target.value)}
              placeholder="Digite o complemento"
            />
          </div>
        </CardContent>
      </Card>

      {/* Consultor (apenas para clientes) */}
      {formData.type === UserType.CLIENT && (
        <Card>
          <CardHeader>
            <CardTitle>Consultor Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={formData.consultantId}
              onChange={(e) => handleInputChange('consultantId', e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Selecione um consultor</option>
              {consultants.map(consultant => (
                <option key={consultant.id} value={consultant.id}>
                  {consultant.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}

      {/* Clientes (apenas para consultores) */}
      {formData.type === UserType.CONSULTANT && (
        <Card>
          <CardHeader>
            <CardTitle>Clientes do Consultor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-3">
              <p className="text-sm text-gray-600">
                {user?.clients?.map(c => c.name).join(', ') || 'Nenhum cliente atribuído'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : user ? 'Atualizar' : 'Criar'} Usuário
        </Button>
      </div>
    </form>
  )
}