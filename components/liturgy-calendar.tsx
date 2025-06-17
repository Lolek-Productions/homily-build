"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Star, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LiturgyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0)) // January 2024

  const liturgicalEvents = [
    { date: 6, title: "Epiphany of the Lord", type: "Solemnity", color: "gold" },
    { date: 6, title: "Epiphany of the Lord", type: "Solemnity", color: "gold" },
    { date: 7, title: "Baptism of the Lord", type: "Feast", color: "white" },
    { date: 14, title: "2nd Sunday in Ordinary Time", type: "Sunday", color: "green" },
    { date: 21, title: "3rd Sunday in Ordinary Time", type: "Sunday", color: "green" },
    { date: 25, title: "Conversion of St. Paul", type: "Feast", color: "white" },
    { date: 28, title: "4th Sunday in Ordinary Time", type: "Sunday", color: "green" },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-muted"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const event = liturgicalEvents.find((e) => e.date === day)
      days.push(
        <div key={day} className="h-24 border border-muted p-2 relative">
          <div className="font-semibold text-sm">{day}</div>
          {event && (
            <div className="mt-1">
              <div
                className={`text-xs p-1 rounded text-white ${
                  event.color === "gold" ? "bg-yellow-600" : event.color === "white" ? "bg-gray-600" : "bg-green-600"
                }`}
              >
                {event.type === "Solemnity" && <Crown className="h-3 w-3 inline mr-1" />}
                {event.type === "Feast" && <Star className="h-3 w-3 inline mr-1" />}
                <span className="truncate">{event.title}</span>
              </div>
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Liturgical Calendar</span>
              </CardTitle>
              <CardDescription>View liturgical seasons, feast days, and special celebrations</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="2024">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-0 border border-muted rounded-lg overflow-hidden">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="bg-muted p-2 text-center font-semibold text-sm">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                <span>Solemnities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <span>Feasts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>Ordinary Time</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Liturgical Season</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className="bg-green-600 text-white">Ordinary Time</Badge>
              <p className="text-sm text-muted-foreground">
                We are currently in Ordinary Time, which focuses on the growth of the Church and Christian living.
              </p>
              <div className="text-sm">
                <p>
                  <strong>Liturgical Color:</strong> Green
                </p>
                <p>
                  <strong>Duration:</strong> Until Ash Wednesday (Feb 14, 2024)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Special Celebrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Presentation of the Lord</p>
                  <p className="text-sm text-muted-foreground">February 2, 2024</p>
                </div>
                <Badge variant="outline">Feast</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Ash Wednesday</p>
                  <p className="text-sm text-muted-foreground">February 14, 2024</p>
                </div>
                <Badge className="bg-purple-600 text-white">Lent Begins</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">St. Patrick&apos;s Day</p>
                  <p className="text-sm text-muted-foreground">March 17, 2024</p>
                </div>
                <Badge variant="outline">Optional Memorial</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
