import { Suspense } from 'react'
import Metrics from '@/components/dashboard/metrics'
import ClientTable from '@/components/dashboard/client-table'
import { getUsers, getConsultants, getUserMetrics } from '@/lib/actions'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { consultant?: string }
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsSection consultantId={searchParams.consultant} />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <TableSection consultantId={searchParams.consultant} />
      </Suspense>
    </div>
  )
}

async function MetricsSection({ consultantId }: { consultantId?: string }) {
  const metrics = await getUserMetrics(consultantId)
  return <Metrics {...metrics} />
}

async function TableSection({ consultantId }: { consultantId?: string }) {
  const [users, consultants] = await Promise.all([
    getUsers(consultantId),
    getConsultants()
  ])
  
  return <ClientTable users={users} consultants={consultants} />
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-200 animate-pulse h-32 rounded-lg"></div>
      ))}
    </div>
  )
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