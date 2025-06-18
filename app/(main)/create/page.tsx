"use client"

import React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Lightbulb,
  Users,
  Target,
  MessageSquare,
  Save,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"

export default function CreateHomily() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedWeekend, setSelectedWeekend] = useState("")
  const [selectedReadings, setSelectedReadings] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [selectedContext, setSelectedContext] = useState("")

  const steps = [
    { id: 1, name: "Weekend & Readings", icon: Calendar },
    { id: 2, name: "Theme Selection", icon: Lightbulb },
    { id: 3, name: "Context & Audience", icon: Users },
    { id: 4, name: "Point Development", icon: Target },
    { id: 5, name: "Stories & Examples", icon: MessageSquare },
    { id: 6, name: "Final Review", icon: Save },
  ]

  const weekendOptions = [
    { value: "dec-22-2024", label: "December 22, 2024 - 4th Sunday of Advent", season: "Advent" },
    { value: "dec-29-2024", label: "December 29, 2024 - Holy Family", season: "Christmas" },
    { value: "jan-5-2025", label: "January 5, 2025 - Epiphany of the Lord", season: "Christmas" },
  ]

  const readingOptions = [
    {
      value: "standard",
      label: "Standard Readings",
      description: "2 Samuel 7:1-5, 8b-12, 14a, 16; Romans 16:25-27; Luke 1:26-38",
    },
    { value: "short", label: "Short Form", description: "Romans 16:25-27; Luke 1:26-38" },
  ]

  const themeOptions = [
    {
      id: "trust-in-gods-plan",
      title: "Trust in God's Plan",
      description:
        "Exploring how Mary's \"yes\" teaches us to trust in God's timing and purpose, even when we don't understand.",
      scriptureConnection:
        'Luke 1:38 - "Behold, I am the handmaid of the Lord. May it be done unto me according to your word."',
    },
    {
      id: "divine-promises",
      title: "God's Faithful Promises",
      description:
        "How God's covenant with David finds fulfillment in Christ, showing God's faithfulness across generations.",
      scriptureConnection:
        '2 Samuel 7:16 - "Your house and your kingdom shall endure forever before me; your throne shall stand firm forever."',
    },
    {
      id: "mystery-of-incarnation",
      title: "The Mystery of the Incarnation",
      description: "The profound mystery of God becoming human, revealed through the Annunciation.",
      scriptureConnection: 'Romans 16:25 - "...the mystery kept secret for long ages but now manifested..."',
    },
  ]

  const contextOptions = [
    {
      value: "english-parish",
      label: "English Parish Community",
      description: "Mixed ages, families, traditional format",
    },
    {
      value: "spanish-community",
      label: "Spanish-Speaking Community",
      description: "Cultural considerations, family-centered",
    },
    { value: "student-mass", label: "Student Mass", description: "University students, contemporary issues" },
    { value: "wedding", label: "Wedding Ceremony", description: "Celebration focus, marriage themes" },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Weekend</h3>
              <Select value={selectedWeekend} onValueChange={setSelectedWeekend}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a weekend..." />
                </SelectTrigger>
                <SelectContent>
                  {weekendOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <span>{option.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {option.season}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedWeekend && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Readings</h3>
                <RadioGroup value={selectedReadings} onValueChange={setSelectedReadings}>
                  {readingOptions.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={option.value} className="font-medium cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Or Paste Custom Readings</h3>
              <Textarea
                placeholder="Paste your readings here if you prefer to use custom text..."
                className="min-h-32"
              />
              <p className="text-sm text-gray-500 mt-2">
                This option allows you to use any readings or translations you prefer.
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI-Generated Themes</h3>
              <p className="text-gray-600 mb-6">
                Based on your selected readings, here are three potential themes for your homily:
              </p>
            </div>

            <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
              {themeOptions.map((theme) => (
                <div key={theme.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={theme.id} id={theme.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={theme.id} className="font-semibold cursor-pointer text-base">
                        {theme.title}
                      </Label>
                      <p className="text-gray-600 mt-2 mb-3">{theme.description}</p>
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                        <p className="text-sm font-medium text-blue-900">Scripture Connection:</p>
                        <p className="text-sm text-blue-800 mt-1">{theme.scriptureConnection}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Lightbulb className="w-4 h-4 mr-2" />
                Re-evaluate Themes (Generate New Options)
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Your Context</h3>
              <p className="text-gray-600 mb-6">Choose the primary audience and context for this homily:</p>
            </div>

            <RadioGroup value={selectedContext} onValueChange={setSelectedContext}>
              {contextOptions.map((context) => (
                <div key={context.value} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={context.value} id={context.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={context.value} className="font-semibold cursor-pointer text-base">
                        {context.label}
                      </Label>
                      <p className="text-gray-600 mt-1">{context.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {selectedTheme && selectedContext && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Selected Combination:</h4>
                <p className="text-green-800">
                  <strong>Theme:</strong> {themeOptions.find((t) => t.id === selectedTheme)?.title}
                </p>
                <p className="text-green-800">
                  <strong>Context:</strong> {contextOptions.find((c) => c.value === selectedContext)?.label}
                </p>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step {currentStep} Coming Soon</h3>
            <p className="text-gray-600">This step is under development and will be available soon.</p>
          </div>
        )
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedWeekend && selectedReadings
      case 2:
        return selectedTheme
      case 3:
        return selectedContext
      default:
        return true
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
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Create New Homily</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex-shrink-0">
              <Save className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Save Draft</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Progress Steps - Horizontally Scrollable */}
        <div className="mb-8">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max px-1">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = step.id === currentStep
                const isCompleted = step.id < currentStep
                const isAccessible = step.id <= currentStep

                return (
                  <div key={step.id} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center min-w-0">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isActive
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <p
                          className={`text-xs font-medium whitespace-nowrap ${isAccessible ? "text-gray-900" : "text-gray-400"}`}
                        >
                          {step.name}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-3 mt-[-20px] ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 mr-2" })}
              {steps[currentStep - 1].name}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Select the weekend and liturgical readings for your homily"}
              {currentStep === 2 && "Choose the central theme that will guide your homily"}
              {currentStep === 3 && "Define your audience and preaching context"}
              {currentStep > 3 && "Continue building your homily with AI assistance"}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 space-y-3 sm:space-y-0">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="w-full sm:w-auto"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={!canProceed() || currentStep === steps.length}
            className="w-full sm:w-auto"
          >
            {currentStep === steps.length ? "Complete Homily" : "Next Step"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
