"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, Users, FileText, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface EventData {
  id: number
  title: string
  date: string
  time: string
  duration: string
  type: string
  description: string
  isRecurring: boolean
  recurringType: string
}

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: Date
  onAddEvent: (event: EventData) => void
}

export default function AddEventModal({ isOpen, onClose, selectedDate, onAddEvent }: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    time: "",
    duration: "60",
    type: "",
    description: "",
    isRecurring: false,
    recurringType: "weekly",
  })

  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate.toISOString().split("T")[0],
      }))
    }
  }, [selectedDate])

// console.log("selectedDate", selectedDate)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the event object
    const newEvent: EventData = {
      id: Date.now(), // Simple ID generation
      title: formData.title,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      description: formData.description,
      duration: formData.duration,
      isRecurring: formData.isRecurring,
      recurringType: formData.recurringType,
    }

    onAddEvent(newEvent)

    // Reset form
    setFormData({
      title: "",
      date: "",
      time: "",
      duration: "60",
      type: "",
      description: "",
      isRecurring: false,
      recurringType: "weekly",
    })

    onClose()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Add Liturgical Event
          </DialogTitle>
          <DialogDescription>Create a new event for your liturgy planning calendar.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Morning Prayer, Holy Eucharist"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Event Type and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Event Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Service
                    </div>
                  </SelectItem>
                  <SelectItem value="meeting">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Meeting
                    </div>
                  </SelectItem>
                  <SelectItem value="prayer">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Prayer
                    </div>
                  </SelectItem>
                  <SelectItem value="study">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Bible Study
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Additional notes or details about the event..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Recurring Event */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) => handleInputChange("isRecurring", checked as boolean)}
              />
              <Label htmlFor="recurring" className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Recurring Event
              </Label>
            </div>

            {formData.isRecurring && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="recurringType">Repeat</Label>
                <Select
                  value={formData.recurringType}
                  onValueChange={(value) => handleInputChange("recurringType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.title || !formData.date || !formData.time || !formData.type}>
              Add Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
