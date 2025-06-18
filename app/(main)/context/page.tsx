"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Users, Globe, GraduationCap, Heart, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"

interface Context {
  id: string
  name: string
  description: string
  demographics: string
  culturalConsiderations: string
  preferredLength: string
  languageStyle: string
  commonChallenges: string
  effectiveApproaches: string
  icon: string
  color: string
}

export default function ContextsSettings() {
  const [contexts, setContexts] = useState<Context[]>([
    {
      id: "english-parish",
      name: "English Parish Community",
      description: "Main Sunday Mass congregation",
      demographics:
        "Mixed ages (25-75), families with children, working professionals, retirees. About 300 regular attendees.",
      culturalConsiderations:
        "Traditional Catholic values, mix of lifelong Catholics and converts. Appreciate both tradition and contemporary relevance.",
      preferredLength: "12-15 minutes",
      languageStyle: "Conversational but reverent, accessible vocabulary, storytelling approach",
      commonChallenges:
        "Balancing depth with accessibility, engaging different age groups, addressing modern secular challenges",
      effectiveApproaches:
        "Personal stories, contemporary examples, practical applications, gentle challenge with hope",
      icon: "Users",
      color: "blue",
    },
    {
      id: "spanish-community",
      name: "Spanish-Speaking Community",
      description: "Misa en Español congregation",
      demographics:
        "Primarily Hispanic families, ages 20-60, many with young children. Strong family orientation. About 200 regular attendees.",
      culturalConsiderations:
        "Family-centered culture, deep Marian devotion, traditional Catholic practices, many are immigrants seeking community and hope.",
      preferredLength: "15-18 minutes",
      languageStyle: "Warm and familial, use of Spanish cultural references, emphasis on family and community values",
      commonChallenges: "Immigration concerns, economic struggles, maintaining cultural identity while integrating",
      effectiveApproaches:
        "Family stories, references to Hispanic saints, emphasis on God's providence and protection, community support themes",
      icon: "Globe",
      color: "green",
    },
    {
      id: "student-mass",
      name: "University Student Mass",
      description: "Weekly student-focused liturgy",
      demographics:
        "College students ages 18-25, mix of cradle Catholics and those exploring faith. About 150 attendees.",
      culturalConsiderations:
        "Questioning faith, dealing with secular academic environment, forming adult identity, social justice concerns",
      preferredLength: "8-12 minutes",
      languageStyle: "Contemporary, direct, intellectually engaging, addresses doubts and questions openly",
      commonChallenges:
        "Faith vs. reason tensions, moral relativism, peer pressure, future anxiety, social media influence",
      effectiveApproaches:
        "Intellectual honesty, contemporary examples, social justice themes, authenticity over perfection",
      icon: "GraduationCap",
      color: "purple",
    },
  ])

  const [editingContext, setEditingContext] = useState<Context | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const iconOptions = [
    { value: "Users", label: "Users", icon: Users },
    { value: "Globe", label: "Globe", icon: Globe },
    { value: "GraduationCap", label: "Graduation Cap", icon: GraduationCap },
    { value: "Heart", label: "Heart", icon: Heart },
  ]

  const colorOptions = [
    { value: "blue", label: "Blue", class: "bg-blue-100 text-blue-800" },
    { value: "green", label: "Green", class: "bg-green-100 text-green-800" },
    { value: "purple", label: "Purple", class: "bg-purple-100 text-purple-800" },
    { value: "red", label: "Red", class: "bg-red-100 text-red-800" },
    { value: "yellow", label: "Yellow", class: "bg-yellow-100 text-yellow-800" },
    { value: "indigo", label: "Indigo", class: "bg-indigo-100 text-indigo-800" },
  ]

  const handleAddContext = () => {
    setEditingContext({
      id: "",
      name: "",
      description: "",
      demographics: "",
      culturalConsiderations: "",
      preferredLength: "",
      languageStyle: "",
      commonChallenges: "",
      effectiveApproaches: "",
      icon: "Users",
      color: "blue",
    })
    setIsDialogOpen(true)
  }

  const handleEditContext = (context: Context) => {
    setEditingContext({ ...context })
    setIsDialogOpen(true)
  }

  const handleSaveContext = () => {
    if (!editingContext) return

    if (editingContext.id) {
      // Edit existing
      setContexts(contexts.map((c) => (c.id === editingContext.id ? editingContext : c)))
    } else {
      // Add new
      const newContext = {
        ...editingContext,
        id: editingContext.name.toLowerCase().replace(/\s+/g, "-"),
      }
      setContexts([...contexts, newContext])
    }

    setIsDialogOpen(false)
    setEditingContext(null)
  }

  const handleDeleteContext = (id: string) => {
    setContexts(contexts.filter((c) => c.id !== id))
  }

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find((opt) => opt.value === iconName)
    return iconOption ? iconOption.icon : Users
  }

  const getColorClass = (color: string) => {
    const colorOption = colorOptions.find((opt) => opt.value === color)
    return colorOption ? colorOption.class : "bg-blue-100 text-blue-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Settings", href: "/settings" },
          { label: "Contexts", active: true }
        ]}
      />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Preaching Contexts</h1>
                <p className="text-sm text-gray-600">Manage your different audiences and preaching settings</p>
              </div>
            </div>
            <Button onClick={handleAddContext}>
              <Plus className="w-4 h-4 mr-2" />
              Add Context
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Preaching Contexts</CardTitle>
            <CardDescription>
              Define the different audiences and settings where you preach. This helps the AI tailor homily content,
              stories, and approaches to each specific community&apos;s needs and characteristics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{contexts.length}</div>
                <div className="text-sm text-gray-600">Active Contexts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {contexts.reduce((sum, c) => sum + Number.parseInt(c.demographics.match(/\d+/)?.[0] || "0"), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    contexts.reduce((sum, c) => sum + Number.parseInt(c.preferredLength.match(/\d+/)?.[0] || "0"), 0) /
                      contexts.length,
                  )}
                </div>
                <div className="text-sm text-gray-600">Avg. Length (min)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contexts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contexts.map((context) => {
            const IconComponent = getIcon(context.icon)
            return (
              <Card key={context.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{context.name}</CardTitle>
                        <CardDescription>{context.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getColorClass(context.color)}>{context.preferredLength}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Demographics</h4>
                    <p className="text-sm text-gray-600">{context.demographics}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Cultural Considerations</h4>
                    <p className="text-sm text-gray-600">{context.culturalConsiderations}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Effective Approaches</h4>
                    <p className="text-sm text-gray-600">{context.effectiveApproaches}</p>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" onClick={() => handleEditContext(context)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteContext(context.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add/Edit Context Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContext?.id ? "Edit Context" : "Add New Context"}</DialogTitle>
              <DialogDescription>Define the characteristics and needs of this preaching context</DialogDescription>
            </DialogHeader>

            {editingContext && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Context Name</Label>
                    <Input
                      id="name"
                      value={editingContext.name}
                      onChange={(e) => setEditingContext({ ...editingContext, name: e.target.value })}
                      placeholder="e.g., Youth Mass"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Short Description</Label>
                    <Input
                      id="description"
                      value={editingContext.description}
                      onChange={(e) => setEditingContext({ ...editingContext, description: e.target.value })}
                      placeholder="e.g., Weekly youth-focused liturgy"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="demographics">Demographics & Size</Label>
                  <Textarea
                    id="demographics"
                    value={editingContext.demographics}
                    onChange={(e) => setEditingContext({ ...editingContext, demographics: e.target.value })}
                    placeholder="Describe the age range, family composition, attendance size, etc."
                    className="min-h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="cultural">Cultural Considerations</Label>
                  <Textarea
                    id="cultural"
                    value={editingContext.culturalConsiderations}
                    onChange={(e) => setEditingContext({ ...editingContext, culturalConsiderations: e.target.value })}
                    placeholder="Cultural background, traditions, values, special considerations..."
                    className="min-h-20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="length">Preferred Length</Label>
                    <Input
                      id="length"
                      value={editingContext.preferredLength}
                      onChange={(e) => setEditingContext({ ...editingContext, preferredLength: e.target.value })}
                      placeholder="e.g., 10-12 minutes"
                    />
                  </div>
                  <div>
                    <Label htmlFor="style">Language Style</Label>
                    <Input
                      id="style"
                      value={editingContext.languageStyle}
                      onChange={(e) => setEditingContext({ ...editingContext, languageStyle: e.target.value })}
                      placeholder="e.g., Formal, conversational, etc."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="challenges">Common Challenges</Label>
                  <Textarea
                    id="challenges"
                    value={editingContext.commonChallenges}
                    onChange={(e) => setEditingContext({ ...editingContext, commonChallenges: e.target.value })}
                    placeholder="What challenges does this community face? What issues should be addressed?"
                    className="min-h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="approaches">Effective Approaches</Label>
                  <Textarea
                    id="approaches"
                    value={editingContext.effectiveApproaches}
                    onChange={(e) => setEditingContext({ ...editingContext, effectiveApproaches: e.target.value })}
                    placeholder="What preaching approaches work well with this audience?"
                    className="min-h-20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Select
                      value={editingContext.icon}
                      onValueChange={(value) => setEditingContext({ ...editingContext, icon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center space-x-2">
                              <option.icon className="w-4 h-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select
                      value={editingContext.color}
                      onValueChange={(value) => setEditingContext({ ...editingContext, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${option.class}`}></div>
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveContext}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Context
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
