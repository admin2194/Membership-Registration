"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, Search, Filter, Crown, RefreshCw, Edit, Trash2, CheckCircle } from "lucide-react"
import { useMembers } from "@/hooks/use-api-data"
import { AddMemberModal } from "@/components/add-member-modal"
import { EditMemberModal } from "@/components/edit-member-modal"
import { apiClient } from "@/lib/api"
import { MembersListSkeleton } from "@/components/ui/loading-skeleton"
import Image from "next/image"

export default function MembersPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  
  const { data: membersData, loading, error, refetch } = useMembers({
    page: currentPage,
    limit: 10,
    search: searchTerm || undefined
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    refetch()
  }

  const handleAddMemberSuccess = () => {
    setIsAddMemberModalOpen(false)
    refetch() // Refresh the members list
  }

  const handleEditMember = (memberId: string) => {
    setSelectedMemberId(memberId)
    setIsEditMemberModalOpen(true)
  }

  const handleEditMemberSuccess = () => {
    setIsEditMemberModalOpen(false)
    setSelectedMemberId(null)
    refetch() // Refresh the members list
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to delete this member? This action cannot be undone.")) {
      return
    }

    setIsDeleting(memberId)
    try {
      await apiClient.deleteMember(memberId)
      refetch() // Refresh the members list
    } catch (error) {
      console.error("Failed to delete member:", error)
      alert("Failed to delete member. Please try again.")
    } finally {
      setIsDeleting(null)
    }
  }

  // Default members structure based on actual backend response
  const defaultMembersData = {
    members: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  }

  const currentMembersData = membersData || defaultMembersData
  const { members, total, totalPages } = currentMembersData

  // Debug logging
  console.log('Members data:', membersData)
  console.log('Current members data:', currentMembersData)
  console.log('Members array:', members)
  console.log('Total count:', total)
  console.log('Members length:', members?.length)

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSuccess={handleAddMemberSuccess}
      />

      {/* Edit Member Modal */}
      <EditMemberModal
        isOpen={isEditMemberModalOpen}
        onClose={() => {
          setIsEditMemberModalOpen(false)
          setSelectedMemberId(null)
        }}
        onSuccess={handleEditMemberSuccess}
        memberId={selectedMemberId}
      />

      {/* Members Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <Image
                    src="/EYEA_Logo_01_Color.png"
                    alt="EYEA Logo"
                    width={32}
                    height={32}
                    className="object-contain lg:w-8 lg:h-8"
                  />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">
                    Members
                  </h1>
                  <p className="text-base lg:text-lg text-gray-600 font-medium">Welcome back, Admin</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Member Management</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button 
                className="bg-gray-900 hover:bg-gray-800 text-white flex-1 lg:flex-none"
                onClick={() => setIsAddMemberModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Member
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
              <span className="text-sm font-medium">Error loading members data: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Members</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-gray-900">
              {loading ? '...' : (total || members?.length || 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">All members active</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">New This Month</CardTitle>
            <Plus className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-gray-900">
              {loading ? '...' : (total || members?.length || 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">New registrations</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Pending</CardTitle>
            <Filter className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-gray-900">
              {loading ? '...' : '0'}
            </div>
            <p className="text-xs text-gray-600">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-gray-900">
              {loading ? '...' : (total || members?.length || 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Active members</p>
          </CardContent>
        </Card>
      </div>

      {/* Member Directory */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Member Directory</CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>
                <Button type="submit" variant="outline" size="sm" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <MembersListSkeleton />
          ) : members && members.length > 0 ? (
            <div className="space-y-4">
              {members.map((member: any, index: number) => (
                <div key={member._id || index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {member.fullName || member.userId?.fullName || 'Unknown Name'}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {member.email || member.userId?.email || 'No email'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        Phone: {member.phoneNumber || member.userId?.phone || 'No phone'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {member.status || 'Active'}
                    </span>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMember(member._id)}
                        className="p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMember(member._id)}
                        disabled={isDeleting === member._id}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 lg:py-12">
              <div className="text-gray-400 mb-2">
                <Users className="h-8 w-8 lg:h-12 lg:w-12 mx-auto" />
              </div>
              <p className="text-gray-500 text-sm lg:text-base">No members found</p>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">Add your first member to get started</p>
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