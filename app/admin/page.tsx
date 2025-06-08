"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@supabase/supabase-js"
import { Loader2, Download, Search, Users, Star, BarChart, PieChart, Mail } from "lucide-react"

// Types for our database tables
type CompleteSignup = {
  id: string
  parent_name: string
  email: string
  created_at: string
  step_completed: number
  child_name: string | null
  child_age: number | null
  child_interests: string | null
  suggestions: string | null
  selected_features: string[] | null
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [signups, setSignups] = useState<CompleteSignup[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [stats, setStats] = useState({
    totalSignups: 0,
    completedSignups: 0,
    conversionRate: 0,
    averageAge: 0,
    topFeatures: [] as { feature: string; count: number }[],
    ageDistribution: [] as { age: number; count: number }[],
  })

  // Create a Supabase client
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch complete signups view
        const { data, error } = await supabase
          .from("complete_signups")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        setSignups(data || [])

        // Calculate stats
        const totalSignups = data?.length || 0
        const completedSignups = data?.filter((s) => s.step_completed === 2).length || 0
        const conversionRate = totalSignups > 0 ? Math.round((completedSignups / totalSignups) * 100) : 0

        // Calculate average age
        const validAges = data?.filter((s) => s.child_age !== null).map((s) => s.child_age) || []
        const averageAge =
          validAges.length > 0
            ? Math.round((validAges.reduce((sum, age) => sum + (age || 0), 0) / validAges.length) * 10) / 10
            : 0

        // Count feature preferences
        const featureCounts: Record<string, number> = {}
        data?.forEach((signup) => {
          if (signup.selected_features) {
            signup.selected_features.forEach((feature: string) => {
              featureCounts[feature] = (featureCounts[feature] || 0) + 1
            })
          }
        })

        // Sort features by popularity
        const topFeatures = Object.entries(featureCounts)
          .map(([feature, count]) => ({ feature, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)

        // Calculate age distribution
        const ageCounts: Record<number, number> = {}
        validAges.forEach((age) => {
          if (age !== null) {
            ageCounts[age] = (ageCounts[age] || 0) + 1
          }
        })

        const ageDistribution = Object.entries(ageCounts)
          .map(([age, count]) => ({ age: Number.parseInt(age), count }))
          .sort((a, b) => a.age - b.age)

        setStats({
          totalSignups,
          completedSignups,
          conversionRate,
          averageAge,
          topFeatures,
          ageDistribution,
        })
      } catch (error) {
        console.error("Error fetching waitlist data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredSignups = signups.filter((signup) => {
    // Filter by search term
    const matchesSearch =
      signup.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signup.child_name?.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && signup.step_completed === 2
    if (activeTab === "incomplete") return matchesSearch && signup.step_completed === 1

    return matchesSearch
  })

  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "Parent Name",
      "Email",
      "Child Name",
      "Child Age",
      "Interests",
      "Selected Features",
      "Suggestions",
      "Date",
      "Status",
    ]
    const csvRows = [headers]

    filteredSignups.forEach((signup) => {
      const row = [
        signup.parent_name || "",
        signup.email || "",
        signup.child_name || "",
        signup.child_age || "",
        signup.child_interests || "",
        (signup.selected_features || []).join(", "),
        signup.suggestions || "",
        new Date(signup.created_at).toLocaleDateString(),
        signup.step_completed === 2 ? "Complete" : "Incomplete",
      ]
      csvRows.push(row)
    })

    // Convert to CSV string
    const csvContent = csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `kaid-waitlist-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const sendEmailCampaign = () => {
    // This would integrate with an email service
    alert("This would send an email campaign to all waitlist members")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">KaiD Waitlist Dashboard</h1>
            <p className="text-gray-600">Manage and analyze your waitlist signups</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </Button>
            <Button onClick={sendEmailCampaign} variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Signups</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalSignups}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Completed Signups</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.completedSignups}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <PieChart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.conversionRate}%</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <BarChart className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Average Child Age</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.averageAge}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Features */}
          <Card>
            <CardHeader>
              <CardTitle>Top Requested Features</CardTitle>
              <CardDescription>Features parents are most excited about</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.topFeatures.length > 0 ? (
                <div className="space-y-4">
                  {stats.topFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full"
                          style={{ width: `${Math.min(100, (feature.count / stats.completedSignups) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700 min-w-[100px]">
                        {feature.count} votes
                      </span>
                      <span className="ml-2 text-sm text-gray-600 truncate max-w-[200px]">
                        {feature.feature.split(" - ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No feature data available yet</p>
              )}
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
            </CardContent>
          </Card>
        </div>

        {/* Waitlist Table */}
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Signups</CardTitle>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Signups</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : filteredSignups.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">Parent</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Child</th>
                      <th className="px-4 py-3">Age</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSignups.map((signup, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{signup.parent_name}</td>
                        <td className="px-4 py-3 text-gray-600">{signup.email}</td>
                        <td className="px-4 py-3 text-gray-600">{signup.child_name || "-"}</td>
                        <td className="px-4 py-3 text-gray-600">{signup.child_age || "-"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              signup.step_completed === 2
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {signup.step_completed === 2 ? "Complete" : "Step 1 Only"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{new Date(signup.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No signups found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
