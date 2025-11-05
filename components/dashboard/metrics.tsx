'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

interface MetricsProps {
  totalClients: number
  last7Days: number
  selectedConsultant?: string
}

export default function Metrics({ totalClients, last7Days, selectedConsultant }: MetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total de clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalClients}</div>
          <p className="text-sm text-gray-600">nos últimos 7 días: +{last7Days}</p>
        </CardContent>
      </Card>

      {selectedConsultant && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Nome do consultor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">John Doe</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Período</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">21/09/2025 até 21/12/2025</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}