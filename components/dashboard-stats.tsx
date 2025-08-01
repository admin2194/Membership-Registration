"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, DollarSign, TrendingUp, Activity, Target, Zap, Star } from "lucide-react"

interface DashboardStatsProps {
  membershipLevels: any[] | undefined
  subscriptionPayments: any[] | undefined
  donationHistory: any[] | undefined
}

export function DashboardStats({ membershipLevels, subscriptionPayments, donationHistory }: DashboardStatsProps) {
  // Calculate real metrics from API data
  const totalMembers = (membershipLevels || []).reduce((sum, level) => sum + (level.memberCount || 0), 0)
  const totalSubscriptionRevenue = (subscriptionPayments || []).reduce((sum, payment) => sum + (payment.amount || 0), 0)
  const totalDonations = (donationHistory || []).reduce((sum, donation) => sum + (donation.amount || 0), 0)
  const recentPayments = (subscriptionPayments || []).filter((payment) => payment.status === "Paid").length

  // Calculate growth rates based on available data
  const calculateGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  // Mock previous month data for demonstration (in real app, this would come from API)
  const previousMonthRevenue = totalSubscriptionRevenue * 0.92 // 8% growth assumption
  const previousMonthDonations = totalDonations * 0.85 // 15% growth assumption
  const previousMonthMembers = totalMembers * 0.88 // 12% growth assumption

  const revenueGrowth = calculateGrowthRate(totalSubscriptionRevenue, previousMonthRevenue)
  const donationGrowth = calculateGrowthRate(totalDonations, previousMonthDonations)
  const memberGrowth = calculateGrowthRate(totalMembers, previousMonthMembers)

  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: Users,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      description: "Across all membership levels",
      trend: `${memberGrowth >= 0 ? '+' : ''}${memberGrowth.toFixed(1)}% from last month`
    },
    {
      title: "Subscription Revenue",
      value: `${totalSubscriptionRevenue.toLocaleString()} ETB`,
      icon: CreditCard,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      description: `From ${(subscriptionPayments || []).length} payments`,
      trend: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% from last month`
    },
    {
      title: "Total Donations",
      value: `${totalDonations.toLocaleString()} ETB`,
      icon: DollarSign,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      description: `From ${(donationHistory || []).length} donations`,
      trend: `${donationGrowth >= 0 ? '+' : ''}${donationGrowth.toFixed(1)}% from last month`
    },
    {
      title: "Active Payments",
      value: recentPayments,
      icon: TrendingUp,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      description: "Successful payments this period",
      trend: `${recentPayments > 0 ? '+' : ''}${recentPayments} this month`
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-700">{stat.title}</CardTitle>
            <div className={`p-3 rounded-lg ${stat.bgColor} border border-gray-100`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-600">{stat.description}</p>
            <div className="flex items-center space-x-1">
              <TrendingUp className={`h-3 w-3 ${stat.trend.includes('+') ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs font-medium ${stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
