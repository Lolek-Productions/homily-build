"use client"

import { useEffect } from "react"
import { Calendar, BookOpen, Users, Settings, Plus, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { useAppContext } from "@/contexts/AppContextProvider"
import { updateUserSettings } from "@/lib/actions/userSettings"
import { DEFAULT_USER_SETTINGS_DEFINITION } from "@/lib/definition"

export default function Dashboard() {
  const { user, userSettings, isLoading, refreshSettings } = useAppContext()

  // Initialize user settings with defaults for new users
  useEffect(() => {
    const initializeUserSettings = async () => {
      // Only proceed if we have a user and no settings exist
      // Wait a bit longer to ensure auth is fully established
      if (user?.id && !isLoading && userSettings === null) {
        try {
          console.log('Creating default user settings for new user:', user.id)
          
          // Add a small delay to ensure auth session is established
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const result = await updateUserSettings(user.id, { 
            definitions: DEFAULT_USER_SETTINGS_DEFINITION 
          })
          
          if (result.error) {
            console.error('Error creating user settings:', result.error)
          } else if (result.data) {
            console.log('Successfully created user settings')
            // Refresh settings to get the newly created data
            await refreshSettings()
          }
        } catch (error) {
          console.error('Failed to create default user settings:', error)
        }
      }
    }

    // Add a delay before attempting to initialize
    const timeoutId = setTimeout(() => {
      initializeUserSettings()
    }, 2000) // Wait 2 seconds after component mount

    return () => clearTimeout(timeoutId)
  }, [user?.id, userSettings, isLoading, refreshSettings])

  const upcomingWeekends = [
    {
      date: "December 22, 2024",
      season: "Advent",
      readings: "4th Sunday of Advent",
      homilies: 2,
      contexts: ["English Parish", "Spanish Community"],
    },
    {
      date: "December 29, 2024",
      season: "Christmas",
      readings: "Holy Family",
      homilies: 1,
      contexts: ["Student Mass"],
    },
    {
      date: "January 5, 2025",
      season: "Christmas",
      readings: "Epiphany of the Lord",
      homilies: 0,
      contexts: [],
    },
  ]

  const recentHomilies = [
    {
      title: "The Light in Our Darkness",
      date: "December 15, 2024",
      context: "English Parish",
      theme: "Hope in Advent",
      status: "completed",
    },
    {
      title: "Esperanza en el Adviento",
      date: "December 15, 2024",
      context: "Spanish Community",
      theme: "Hope in Advent",
      status: "draft",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Calendar", href: "/calendar" },
          { label: "Daily View", active: true }
        ]}
      />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Homily.Build</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Catholic Preaching Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="sm:hidden">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Father</h2>
          <p className="text-gray-600">Create meaningful, contextual homilies for your diverse communities</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/create">
                    <Button className="w-full h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 bg-indigo-600 hover:bg-indigo-700">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base">Create New Homily</span>
                    </Button>
                  </Link>
                  <Link href="/calendar">
                    <Button
                      variant="outline"
                      className="w-full h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                    >
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base">View Calendar</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Weekends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Weekends
                  </span>
                  <Link href="/calendar">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingWeekends.map((weekend, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{weekend.date}</h3>
                          <Badge variant="secondary">{weekend.season}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{weekend.readings}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {weekend.homilies} homilies
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {weekend.contexts.length} contexts
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 sm:ml-4">
                        {weekend.homilies === 0 ? (
                          <Link href={`/create?date=${encodeURIComponent(weekend.date)}`}>
                            <Button size="sm" className="w-full sm:w-auto">
                              <Plus className="w-4 h-4 mr-1" />
                              Create
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Homilies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Homilies
                  </span>
                  <Link href="/homilies">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentHomilies.map((homily, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{homily.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{homily.date}</span>
                          <span>•</span>
                          <span>{homily.context}</span>
                          <span>•</span>
                          <span>{homily.theme}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={homily.status === "completed" ? "default" : "secondary"}>{homily.status}</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
                    <h3 className="font-semibold">Father Michael</h3>
                    <p className="text-sm text-gray-600">St. Mary&apos;s Parish</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Homilies:</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Contexts:</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stories Used:</span>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/resources/catechism" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Catechism
                    </Button>
                  </Link>
                  <Link href="/resources/stories" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Faith Stories
                    </Button>
                  </Link>
                  <Link href="/resources/liturgical" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Liturgical Calendar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Consider creating multiple homilies for different contexts early in the week to allow time for
                  reflection and refinement.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-indigo-600">
                  Learn more about contextual preaching →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
