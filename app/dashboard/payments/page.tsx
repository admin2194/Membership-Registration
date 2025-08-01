"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, RefreshCw, Filter, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react"
import { usePayments } from "@/hooks/use-api-data"
import { PaymentsSkeleton } from "@/components/ui/loading-skeleton"

export default function PaymentsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("")
  
  const { data: paymentsData, loading, error, refetch } = usePayments({
    page: currentPage,
    limit: 10,
    status: statusFilter || undefined
  })

  if (!isAuthenticated || !user) {
    router.push("/")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleRefresh = () => {
    refetch()
  }

  // Default payments structure
  const defaultPaymentsData = {
    payments: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    successRate: 0,
    monthlyRevenue: 0
  }

  const currentPaymentsData = paymentsData || defaultPaymentsData
  const { payments, total, totalPages, totalRevenue, pendingPayments, successRate, monthlyRevenue } = currentPaymentsData

  return (
    <div className="space-y-8">
      {/* Payments Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Payments
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">Welcome back, Admin</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>Payment Management</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleRefresh}
                disabled={loading}
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border border-red-200 bg-red-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Error loading payments data: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payments Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `₦${(totalRevenue || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-600">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : pendingPayments || 0}
            </div>
            <p className="text-xs text-gray-600">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `${(successRate || 0).toFixed(1)}%`}
            </div>
            <p className="text-xs text-gray-600">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">This Month</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `₦${(monthlyRevenue || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-600">Current month revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <PaymentsSkeleton />
          ) : payments && payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment: any, index: number) => (
                <div key={payment._id || index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Payment #{payment.paymentId || payment._id?.slice(-6) || `P${1000 + index}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {payment.memberName || payment.member?.fullName || 'Unknown Member'} - {payment.description || 'Subscription Payment'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₦{(payment.amount || 0).toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status || 'Unknown'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
              <p className="text-sm text-gray-400 mt-1">
                {statusFilter ? 'Try adjusting your filter' : 'No payment transactions yet'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 