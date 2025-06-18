import { ArrowLeft, Plus, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"

export default function CalendarView() {
  const liturgicalCalendar = [
    {
      date: "December 15, 2024",
      season: "Advent",
      celebration: "3rd Sunday of Advent (Gaudete)",
      readings: "Isaiah 61:1-2a, 10-11; 1 Thessalonians 5:16-24; John 1:6-8, 19-28",
      homilies: 2,
      status: "completed",
    },
    {
      date: "December 22, 2024",
      season: "Advent",
      celebration: "4th Sunday of Advent",
      readings: "2 Samuel 7:1-5, 8b-12, 14a, 16; Romans 16:25-27; Luke 1:26-38",
      homilies: 2,
      status: "in-progress",
    },
    {
      date: "December 25, 2024",
      season: "Christmas",
      celebration: "Nativity of the Lord (Christmas)",
      readings: "Isaiah 52:7-10; Hebrews 1:1-6; John 1:1-18",
      homilies: 3,
      status: "planned",
    },
    {
      date: "December 29, 2024",
      season: "Christmas",
      celebration: "Holy Family of Jesus, Mary and Joseph",
      readings: "Genesis 15:1-6; 21:1-3; Hebrews 11:8, 11-12, 17-19; Luke 2:22-40",
      homilies: 1,
      status: "draft",
    },
    {
      date: "January 1, 2025",
      season: "Christmas",
      celebration: "Mary, Mother of God",
      readings: "Numbers 6:22-27; Galatians 4:4-7; Luke 2:16-21",
      homilies: 0,
      status: "upcoming",
    },
    {
      date: "January 5, 2025",
      season: "Christmas",
      celebration: "Epiphany of the Lord",
      readings: "Isaiah 60:1-6; Ephesians 3:2-3a, 5-6; Matthew 2:1-12",
      homilies: 0,
      status: "upcoming",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "planned":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "Advent":
        return "bg-purple-100 text-purple-800"
      case "Christmas":
        return "bg-red-100 text-red-800"
      case "Lent":
        return "bg-purple-100 text-purple-800"
      case "Easter":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

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
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Liturgical Calendar</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Plan and manage your homilies</p>
              </div>
            </div>
            <Link href="/create">
              <Button className="flex-shrink-0">
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Create Homily</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Calendar Overview */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Upcoming Liturgical Celebrations</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">12</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Homilies</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-green-600">4</div>
                <div className="text-xs sm:text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">3</div>
                <div className="text-xs sm:text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-gray-600">5</div>
                <div className="text-xs sm:text-sm text-gray-600">Upcoming</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendar Entries */}
        <div className="space-y-4">
          {liturgicalCalendar.map((entry, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{entry.date}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getSeasonColor(entry.season)}>{entry.season}</Badge>
                        <Badge className={getStatusColor(entry.status)}>{entry.status.replace("-", " ")}</Badge>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{entry.celebration}</h4>

                    <div className="text-xs sm:text-sm text-gray-600 mb-4">
                      <strong>Readings:</strong> {entry.readings}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {entry.homilies} homilies
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Multiple contexts
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-4">
                    {entry.homilies > 0 ? (
                      <>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View ({entry.homilies})
                        </Button>
                        <Button size="sm" className="w-full sm:w-auto">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Context
                        </Button>
                      </>
                    ) : (
                      <Link href={`/create?date=${encodeURIComponent(entry.date)}`}>
                        <Button size="sm" className="w-full sm:w-auto">
                          <Plus className="w-4 h-4 mr-1" />
                          Create Homily
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Status Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 text-xs">completed</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Ready to preach</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-800 text-xs">in-progress</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Currently working</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">draft</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Initial draft done</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-100 text-purple-800 text-xs">planned</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Outline created</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-100 text-gray-800 text-xs">upcoming</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Not started</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
