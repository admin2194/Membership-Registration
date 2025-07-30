"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Calendar, Gift, Sparkles, TrendingUp, Users } from "lucide-react"

interface Donation {
  date: string
  amount: number
  note: string
}

interface DonationHistoryProps {
  donations: Donation[] | undefined
}

export function DonationHistory({ donations }: DonationHistoryProps) {
  const totalDonations = (donations || []).reduce((sum, donation) => sum + (donation.amount || 0), 0)
  const averageDonation = donations && donations.length > 0 ? totalDonations / donations.length : 0
  const recentDonations = donations ? donations.slice(0, 30) : [] // Last 30 days

  if (!donations || donations.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Heart className="h-6 w-6 text-pink-600" />
            <span>Donation History</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Recent charitable contributions</p>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No donation data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <Heart className="h-6 w-6 text-pink-600" />
          <span>Donation History</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Recent charitable contributions</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-pink-600" />
              <span className="text-sm font-medium text-pink-700">Total Donations</span>
            </div>
            <div className="text-2xl font-bold text-pink-800 mt-1">{totalDonations.toLocaleString()} ETB</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Average</span>
            </div>
            <div className="text-2xl font-bold text-purple-800 mt-1">{averageDonation.toFixed(0)} ETB</div>
          </div>
        </div>

        {/* Donation List */}
        <div className="space-y-3">
          {donations.slice(0, 8).map((donation, index) => (
            <div 
              key={index} 
              className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-r from-white to-gray-50/50 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md animate-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 shadow-md">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-gray-900">{donation.amount.toLocaleString()} ETB</p>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{donation.date}</span>
                  </div>
                  {donation.note && (
                    <p className="text-sm text-gray-600 mt-1 italic">"{donation.note}"</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Summary */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-pink-600" />
              <span className="font-semibold text-gray-900">Total Impact</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">{totalDonations.toLocaleString()} ETB</div>
              <div className="text-xs text-gray-500">raised for EYEA</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
