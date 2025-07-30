"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Star, Zap, Target, Users, TrendingUp } from "lucide-react"

interface MembershipLevel {
  id: number
  name: string
  price: number
  frequency: string
  memberCount?: number
}

interface MembershipLevelsOverviewProps {
  levels: MembershipLevel[] | undefined
}

export function MembershipLevelsOverview({ levels }: MembershipLevelsOverviewProps) {
  const totalMembers = (levels || []).reduce((sum, level) => sum + (level.memberCount || 0), 0)

  const getLevelIcon = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case 'pre-revenue':
        return <Target className="h-5 w-5" />
      case 'growth':
        return <TrendingUp className="h-5 w-5" />
      case 'scaling':
        return <Zap className="h-5 w-5" />
      case 'exit':
        return <Crown className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getLevelColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case 'pre-revenue':
        return 'from-blue-500 to-blue-600'
      case 'growth':
        return 'from-green-500 to-green-600'
      case 'scaling':
        return 'from-purple-500 to-purple-600'
      case 'exit':
        return 'from-orange-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  if (!levels || levels.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Crown className="h-6 w-6 text-yellow-500" />
            <span>Membership Levels</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Distribution across membership tiers</p>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No membership levels available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <Crown className="h-6 w-6 text-yellow-500" />
          <span>Membership Levels</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Distribution across membership tiers</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {levels.map((level, index) => {
          const memberCount = level.memberCount || 0
          const percentage = totalMembers > 0 ? (memberCount / totalMembers) * 100 : 0

          return (
            <div 
              key={level.id} 
              className="p-4 rounded-xl bg-gradient-to-r from-white to-gray-50/50 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md animate-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getLevelColor(level.name)} shadow-md`}>
                    {getLevelIcon(level.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{level.name}</h4>
                    <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
                      {level.price} ETB/{level.frequency}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-lg font-bold text-gray-900">{memberCount}</span>
                  </div>
                  <span className="text-xs text-gray-500">members</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Distribution</span>
                  <span className="font-medium text-gray-900">{percentage.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-3 bg-gray-200" 
                  style={{
                    '--progress-color': level.name.toLowerCase() === 'pre-revenue' ? '#3B82F6' :
                                       level.name.toLowerCase() === 'growth' ? '#10B981' :
                                       level.name.toLowerCase() === 'scaling' ? '#8B5CF6' :
                                       level.name.toLowerCase() === 'exit' ? '#F59E0B' : '#6B7280'
                  } as React.CSSProperties}
                />
              </div>
            </div>
          )
        })}
        
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Total Members</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">{totalMembers}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
