"use client"

import { useState } from "react"
import { BookOpen, Search, Calendar, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ReadingsManager() {
  const [selectedCycle, setSelectedCycle] = useState("A")
  const [selectedSeason, setSelectedSeason] = useState("ordinary")

  const readings = [
    {
      date: "2024-01-14",
      liturgy: "Second Sunday in Ordinary Time",
      cycle: "A",
      firstReading: { reference: "1 Samuel 3:3b-10, 19", status: "Complete", notes: "Call of Samuel" },
      psalm: {
        reference: "Psalm 40:2, 4, 7-8, 8-9, 10",
        response: "Here am I, Lord; I come to do your will.",
        status: "Complete",
      },
      secondReading: {
        reference: "1 Corinthians 6:13c-15a, 17-20",
        status: "Complete",
        notes: "Temple of the Holy Spirit",
      },
      gospel: { reference: "John 1:35-42", status: "Complete", notes: "First disciples called" },
      acclamation:
        "Alleluia, alleluia. We have found the Messiah: Jesus Christ, who brings us truth and grace. Alleluia, alleluia.",
    },
    {
      date: "2024-01-21",
      liturgy: "Third Sunday in Ordinary Time",
      cycle: "A",
      firstReading: { reference: "Isaiah 8:23—9:3", status: "Pending", notes: "Light in darkness" },
      psalm: {
        reference: "Psalm 27:1, 4, 13-14",
        response: "The Lord is my light and my salvation.",
        status: "Pending",
      },
      secondReading: { reference: "1 Corinthians 1:10-13, 17", status: "Missing", notes: "Unity in Christ" },
      gospel: { reference: "Matthew 4:12-23", status: "Complete", notes: "Beginning of ministry" },
      acclamation:
        "Alleluia, alleluia. Jesus proclaimed the Gospel of the kingdom and cured every disease among the people. Alleluia, alleluia.",
    },
    {
      date: "2024-01-28",
      liturgy: "Fourth Sunday in Ordinary Time",
      cycle: "A",
      firstReading: { reference: "Zephaniah 2:3; 3:12-13", status: "Missing", notes: "The humble remnant" },
      psalm: {
        reference: "Psalm 146:6-7, 8-9, 9-10",
        response: "Blessed are the poor in spirit; the kingdom of heaven is theirs!",
        status: "Missing",
      },
      secondReading: { reference: "1 Corinthians 1:26-31", status: "Missing", notes: "God's wisdom" },
      gospel: { reference: "Matthew 5:1-12a", status: "Pending", notes: "The Beatitudes" },
      acclamation: "Alleluia, alleluia. Rejoice and be glad; your reward will be great in heaven. Alleluia, alleluia.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "default"
      case "Pending":
        return "secondary"
      case "Missing":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "Missing":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Scripture Readings Manager</span>
              </CardTitle>
              <CardDescription>
                Manage daily and Sunday scripture readings according to the liturgical calendar
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reading Notes
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Reading Notes</DialogTitle>
                    <DialogDescription>Add preparation notes and commentary for scripture readings</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="readingDate">Date</Label>
                        <Input id="readingDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="readingType">Reading Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reading" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="first">First Reading</SelectItem>
                            <SelectItem value="psalm">Responsorial Psalm</SelectItem>
                            <SelectItem value="second">Second Reading</SelectItem>
                            <SelectItem value="gospel">Gospel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reference">Scripture Reference</Label>
                      <Input id="reference" placeholder="e.g., Matthew 5:1-12a" />
                    </div>
                    <div>
                      <Label htmlFor="theme">Theme/Notes</Label>
                      <Textarea id="theme" placeholder="Enter thematic notes, context, or preparation guidance" />
                    </div>
                    <div>
                      <Label htmlFor="lectorNotes">Notes for Lector</Label>
                      <Textarea id="lectorNotes" placeholder="Pronunciation guides, emphasis points, etc." />
                    </div>
                    <Button className="w-full">Save Reading Notes</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Lectionary View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Input placeholder="Search readings..." className="max-w-sm" />
            </div>
            <Select value={selectedCycle} onValueChange={setSelectedCycle}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Cycle A</SelectItem>
                <SelectItem value="B">Cycle B</SelectItem>
                <SelectItem value="C">Cycle C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ordinary">Ordinary Time</SelectItem>
                <SelectItem value="advent">Advent</SelectItem>
                <SelectItem value="christmas">Christmas</SelectItem>
                <SelectItem value="lent">Lent</SelectItem>
                <SelectItem value="easter">Easter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {readings.map((reading, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{reading.liturgy}</CardTitle>
                      <CardDescription>
                        {new Date(reading.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        • Cycle {reading.cycle}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {reading.cycle === "A"
                        ? "Year of Matthew"
                        : reading.cycle === "B"
                          ? "Year of Mark"
                          : "Year of Luke"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">First Reading</span>
                            {getStatusIcon(reading.firstReading.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{reading.firstReading.reference}</p>
                          {reading.firstReading.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{reading.firstReading.notes}</p>
                          )}
                        </div>
                        <Badge variant={getStatusColor(reading.firstReading.status)} className="ml-2">
                          {reading.firstReading.status}
                        </Badge>
                      </div>

                      <div className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">Responsorial Psalm</span>
                            {getStatusIcon(reading.psalm.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{reading.psalm.reference}</p>
                          <p className="text-xs font-medium mt-1">Response: {reading.psalm.response}</p>
                        </div>
                        <Badge variant={getStatusColor(reading.psalm.status)} className="ml-2">
                          {reading.psalm.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">Second Reading</span>
                            {getStatusIcon(reading.secondReading.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{reading.secondReading.reference}</p>
                          {reading.secondReading.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{reading.secondReading.notes}</p>
                          )}
                        </div>
                        <Badge variant={getStatusColor(reading.secondReading.status)} className="ml-2">
                          {reading.secondReading.status}
                        </Badge>
                      </div>

                      <div className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">Gospel</span>
                            {getStatusIcon(reading.gospel.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{reading.gospel.reference}</p>
                          {reading.gospel.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{reading.gospel.notes}</p>
                          )}
                        </div>
                        <Badge variant={getStatusColor(reading.gospel.status)} className="ml-2">
                          {reading.gospel.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Gospel Acclamation:</p>
                    <p className="text-sm italic">{reading.acclamation}</p>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      Edit Notes
                    </Button>
                    <Button size="sm" variant="outline">
                      Print Readings
                    </Button>
                    <Button size="sm">Mark Complete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reading Preparation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Complete</span>
                </span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span>Pending</span>
                </span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Missing</span>
                </span>
                <span className="font-semibold">4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lectionary Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Current Cycle:</strong> Year A (2024)
              </p>
              <p>
                <strong>Weekday Cycle:</strong> Year II
              </p>
              <p>
                <strong>Season:</strong> Ordinary Time
              </p>
              <p>
                <strong>Color:</strong> Green
              </p>
              <p>
                <strong>Next Major Season:</strong> Lent (Feb 14)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                View Lectionary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Print Weekly Readings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search Scripture
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
