import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 lg:h-12 lg:w-12 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 lg:h-8 lg:w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      
      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className={`grid grid-cols-${columns} gap-4 p-4 border-b bg-gray-50`}>
              {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            
            {/* Table Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className={`grid grid-cols-${columns} gap-4 p-4 border-b last:border-b-0`}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Members List Skeleton
export function MembersListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-full sm:w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Members Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 lg:h-12 lg:w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <div className="flex space-x-2 pt-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Analytics Skeleton
export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Payments Skeleton
export function PaymentsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-full sm:w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 border-b bg-gray-50">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            
            {/* Table Rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 border-b last:border-b-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Donations Skeleton
export function DonationsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 lg:h-12 lg:w-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16 lg:h-8 lg:w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Donations Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 border-b bg-gray-50">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            
            {/* Table Rows */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 border-b last:border-b-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Reports Skeleton
export function ReportsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Reports Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Notifications Skeleton
export function NotificationsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Settings Skeleton
export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Generic Page Skeleton
export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
} 