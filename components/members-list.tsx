"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Phone, Mail, MapPin, Star, Crown } from "lucide-react"
import { useState } from "react"

interface Member {
  id: string
  fullName: string
  phone: string
  email?: string
  role?: string
}

interface MembersListProps {
  members: Member[] | undefined
}

export function MembersList({ members }: MembersListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = (members || []).filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm),
  )

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  if (!members || members.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Users className="h-6 w-6 text-indigo-600" />
            <span>Members Directory</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Active EYEA community members</p>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No members data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <Users className="h-6 w-6 text-indigo-600" />
          <span>Members Directory</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Active EYEA community members</p>
        
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search members by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/70 backdrop-blur-sm border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Total Members</span>
            </div>
            <div className="text-xl font-bold text-indigo-800 mt-1">{members.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Active</span>
            </div>
            <div className="text-xl font-bold text-blue-800 mt-1">{filteredMembers.length}</div>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {filteredMembers.slice(0, 8).map((member, index) => (
            <div 
              key={member.id} 
              className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-white to-gray-50/50 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md animate-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.fullName}`} />
                <AvatarFallback className={`text-white font-semibold ${getRandomColor(member.fullName)}`}>
                  {getInitials(member.fullName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 truncate">{member.fullName}</h4>
                  {member.role === 'admin' && (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span className="truncate">{member.phone}</span>
                  </div>
                  {member.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                  Member
                </Badge>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {filteredMembers.length > 8 && (
          <div className="text-center pt-4">
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
              View All Members ({members.length})
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
