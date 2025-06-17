"use client"

import { useState } from "react"
import { Users, Plus, Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

export function MinisterSchedule() {
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedMass, setSelectedMass] = useState("all")

  const ministers = [
    {
      id: 1,
      name: "Mary Johnson",
      roles: ["Lector", "Extraordinary Minister"],
      phone: "(555) 123-4567",
      email: "mary.j@email.com",
      availability: "Weekends",
    },
    {
      id: 2,
      name: "John Smith",
      roles: ["Usher", "Greeter"],
      phone: "(555) 234-5678",
      email: "john.s@email.com",
      availability: "All Masses",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      roles: ["Cantor", "Lector"],
      phone: "(555) 345-6789",
      email: "sarah.w@email.com",
      availability: "Sunday AM",
    },
    {
      id: 4,
      name: "Michael Brown",
      roles: ["Altar Server", "Usher"],
      phone: "(555) 456-7890",
      email: "michael.b@email.com",
      availability: "Weekdays",
    },
    {
      id: 5,
      name: "Lisa Davis",
      roles: ["Extraordinary Minister", "Greeter"],
      phone: "(555) 567-8901",
      email: "lisa.d@email.com",
      availability: "All Times",
    },
  ]

  const assignments = [
    {
      date: "2024-01-14",
      mass: "8:00 AM",
      role: "Lector 1",
      minister: "Mary Johnson",
      reading: "First Reading",
      status: "Confirmed",
    },
    {
      date: "2024-01-14",
      mass: "8:00 AM",
      role: "Lector 2",
      minister: "Unassigned",
      reading: "Second Reading",
      status: "Open",
    },
    {
      date: "2024-01-14",
      mass: "10:30 AM",
      role: "Cantor",
      minister: "Sarah Wilson",
      reading: "Responsorial Psalm",
      status: "Confirmed",
    },
    { date: "2024-01-14", mass: "10:30 AM", role: "Usher", minister: "John Smith", reading: "", status: "Confirmed" },
    {
      date: "2024-01-14",
      mass: "6:00 PM",
      role: "Extraordinary Minister",
      minister: "Unassigned",
      reading: "",
      status: "Open",
    },
    { date: "2024-01-21", mass: "8:00 AM", role: "Altar Server", minister: "Unassigned", reading: "", status: "Open" },
    {
      date: "2024-01-21",
      mass: "10:30 AM",
      role: "Lector 1",
      minister: "Lisa Davis",
      reading: "First Reading",
      status: "Pending",
    },
    { date: "2024-01-21", mass: "6:00 PM", role: "Greeter", minister: "John Smith", reading: "", status: "Confirmed" },
  ]

  const filteredAssignments = assignments.filter((assignment) => {
    if (selectedRole !== "all" && !assignment.role.toLowerCase().includes(selectedRole.toLowerCase())) return false
    if (selectedMass !== "all" && assignment.mass !== selectedMass) return false
    return true
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Minister Schedule</span>
              </CardTitle>
              <CardDescription>Manage liturgical minister assignments and availability</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Minister
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Minister</DialogTitle>
                    <DialogDescription>Register a new liturgical minister for parish service</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter first name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter last name" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div>
                      <Label htmlFor="roles">Liturgical Roles</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select roles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lector">Lector</SelectItem>
                          <SelectItem value="usher">Usher</SelectItem>
                          <SelectItem value="greeter">Greeter</SelectItem>
                          <SelectItem value="extraordinary-minister">Extraordinary Minister</SelectItem>
                          <SelectItem value="altar-server">Altar Server</SelectItem>
                          <SelectItem value="cantor">Cantor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability Notes</Label>
                      <Textarea id="availability" placeholder="Enter availability preferences" />
                    </div>
                    <Button className="w-full">Add Minister</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Input placeholder="Search ministers..." className="max-w-sm" />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="lector">Lector</SelectItem>
                <SelectItem value="usher">Usher</SelectItem>
                <SelectItem value="greeter">Greeter</SelectItem>
                <SelectItem value="extraordinary">Extraordinary Minister</SelectItem>
                <SelectItem value="altar">Altar Server</SelectItem>
                <SelectItem value="cantor">Cantor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMass} onValueChange={setSelectedMass}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Mass time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Masses</SelectItem>
                <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                <SelectItem value="6:00 PM">6:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Mass Time</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Minister</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(assignment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.mass}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className={assignment.minister === "Unassigned" ? "text-muted-foreground italic" : ""}>
                        {assignment.minister}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{assignment.reading || "General Ministry"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        assignment.status === "Confirmed"
                          ? "default"
                          : assignment.status === "Open"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {assignment.minister === "Unassigned" ? (
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Ministers</CardTitle>
            <CardDescription>Active ministers and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ministers.map((minister) => (
                <div key={minister.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{minister.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {minister.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Available: {minister.availability}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ministry Statistics</CardTitle>
            <CardDescription>Current assignment overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Ministers</span>
                <span className="font-semibold">{ministers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Open Assignments</span>
                <span className="font-semibold text-red-600">
                  {assignments.filter((a) => a.status === "Open").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Confirmed Assignments</span>
                <span className="font-semibold text-green-600">
                  {assignments.filter((a) => a.status === "Confirmed").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending Confirmations</span>
                <span className="font-semibold text-yellow-600">
                  {assignments.filter((a) => a.status === "Pending").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
