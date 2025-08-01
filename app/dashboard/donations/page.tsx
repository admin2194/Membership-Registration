"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, RefreshCw, Filter, DollarSign, Plus, Search } from "lucide-react"
import { useDonations } from "@/hooks/use-api-data"
import { DonationsSkeleton } from "@/components/ui/loading-skeleton"

export default function DonationsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [donorFilter, setDonorFilter] = useState("")
  
  const { data: donationsData, loading, error, refetch } = useDonations({
    page: currentPage,
    limit: 10,
    donor: donorFilter || undefined
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

  // Default donations structure
  const defaultDonationsData = {
    donations: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    totalDonations: 0,
    donors: 0,
    averageDonation: 0,
    monthlyDonations: 0
  }

  const currentDonationsData = donationsData || defaultDonationsData
  const { donations, total, totalPages, totalDonations, donors, averageDonation, monthlyDonations } = currentDonationsData

  return (
    <div className="space-y-8">
      {/* Donations Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <Heart className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Donations
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
                  <Heart className="h-4 w-4 text-gray-500" />
                  <span>Donation Management</span>
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
              <span className="text-sm font-medium">Error loading donations data: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Donations Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `₦${(totalDonations || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-600">+18.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Donors</CardTitle>
            <Heart className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : donors || 0}
            </div>
            <p className="text-xs text-gray-600">Active donors</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Average Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `₦${(averageDonation || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-600">Per donation</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `₦${(monthlyDonations || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-600">Current month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Donations</CardTitle>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Filter by donor..."
                value={donorFilter}
                onChange={(e) => setDonorFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
              <p className="text-gray-500">Loading donations...</p>
            </div>
          ) : donations && donations.length > 0 ? (
            <div className="space-y-4">
              {donations.map((donation: any, index: number) => (
                <div key={donation._id || index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {donation.donorName || donation.donor?.fullName || 'Anonymous Donor'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {donation.donorEmail || donation.donor?.email || 'No email provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₦{(donation.amount || 0).toLocaleString()}
                    </span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {donation.status || 'Completed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No donations found</p>
              <p className="text-sm text-gray-400 mt-1">
                {donorFilter ? 'Try adjusting your filter' : 'No donation records yet'}
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