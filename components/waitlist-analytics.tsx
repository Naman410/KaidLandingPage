"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, BarChart, PieChart } from "lucide-react"

type WaitlistStats = {
  totalSignups: number
  completedSignups: number
  conversionRate: number
  averageAge: number
  topFeatures: { feature: string; count: number }[]
  ageDistribution: { age: number; count: number }[]
}

export default function WaitlistAnalytics() {
  const [stats, setStats] = useState<WaitlistStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/waitlist/stats")
        if (!response.ok) {
          throw new Error("Failed to fetch waitlist statistics")
        }
        const data = await response.json()
        setStats(data)
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching statistics")
        console.error("Error fetching waitlist stats:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mr-2" />
        <span>Loading analytics...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Error loading analytics</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (!stats) {
    return <div className="text-gray-500 text-center py-8">No analytics data available</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Signup Conversion</CardTitle>
          <CardDescription>Step completion and conversion rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span>Step 1 (Parent Info)</span>
                <span>{stats.totalSignups} signups</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-purple-500 h-4 rounded-full w-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span>Step 2 (Child Info)</span>
                <span>{stats.completedSignups} completions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: `${stats.conversionRate}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <PieChart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.conversionRate}%</h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Age Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Child Age Distribution</CardTitle>
          <CardDescription>Ages of children whose parents signed up</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.ageDistribution.length > 0 ? (
            <div className="space-y-4">
              {stats.ageDistribution.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 min-w-[50px]">Age {item.age}</span>
                  <div className="w-full bg-gray-200 rounded-full h-4 mx-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-4 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (item.count / Math.max(...stats.ageDistribution.map((i) => i.count))) * 100,
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 min-w-[50px]">{item.count} kids</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No age data available yet</p>
          )}

          <div className="flex items-center justify-center pt-6">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <BarChart className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Age</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.averageAge}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Features */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Requested Features</CardTitle>
          <CardDescription>Features parents are most excited about</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.topFeatures.length > 0 ? (
            <div className="space-y-4">
              {stats.topFeatures.map((feature, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>{feature.feature.split(" - ")[0]}</span>
                    <span>{feature.count} votes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full"
                      style={{ width: `${Math.min(100, (feature.count / stats.completedSignups) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No feature data available yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
