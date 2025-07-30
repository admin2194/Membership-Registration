"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react"

interface Payment {
  month: string
  date: string
  amount: number
  status: string
}

interface RecentPaymentsProps {
  payments: Payment[] | undefined
}

export function RecentPayments({ payments }: RecentPaymentsProps) {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const totalAmount = (payments || []).reduce((sum, payment) => sum + (payment.amount || 0), 0)
  const paidCount = (payments || []).filter(payment => payment.status === "Paid").length
  const pendingCount = (payments || []).filter(payment => payment.status === "Pending").length

  if (!payments || payments.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <CreditCard className="h-6 w-6 text-green-600" />
            <span>Recent Payments</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Latest subscription transactions</p>
        </CardHeader>
        <CardContent className="text-center py-8">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No payment data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <CreditCard className="h-6 w-6 text-green-600" />
          <span>Recent Payments</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Latest subscription transactions</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Total Amount</span>
            </div>
            <div className="text-2xl font-bold text-green-800 mt-1">{totalAmount.toLocaleString()} ETB</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Paid</span>
            </div>
            <div className="text-2xl font-bold text-blue-800 mt-1">{paidCount}</div>
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-3">
          {payments.slice(0, 8).map((payment, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white to-gray-50/50 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md animate-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{payment.month}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{payment.amount.toLocaleString()} ETB</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getStatusIcon(payment.status)}
                    <Badge className={`text-xs ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {payments.length > 8 && (
          <div className="text-center pt-4">
            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg">
              View All Payments ({payments.length})
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
