"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/contexts/AppContextProvider"
import { createHomily } from "@/lib/actions/homilies"
import { useApiToast } from "@/lib/utils"
import { MainHeader } from "@/components/main-header"
import { BookOpen, Loader, Plus } from "lucide-react"

export default function CreateHomily() {
  const { user } = useAppContext()
  const router = useRouter()
  const { showResponseToast, showErrorToast } = useApiToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateHomily = async () => {
    if (!user?.id) {
      showErrorToast(new Error("You must be logged in to create a homily"))
      return
    }

    if (!title.trim()) {
      showErrorToast(new Error("Please enter a title for your homily"))
      return
    }

    setIsCreating(true)
    try {
      const result = await createHomily(user.id, {
        title: title.trim(),
        description: description.trim() || "New homily in progress",
        definitions: "",
        readings: "",
        first_set_of_questions: "",
        second_set_of_questions: "",
        final_draft: "",
        status: "Not Started",
      })
      
      if (result.error) {
        showErrorToast(new Error(result.error))
      } else {
        showResponseToast({ success: true, message: "Homily created successfully!" })
        // Redirect to the wizard with the new homily ID and advance to step 2
        router.push(`/homilies/${result.data.id}?step=2`)
      }
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleCreateHomily()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Homilies", href: "/homilies" },
          { label: "Create New Homily" }
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
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create New Homily
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Start by giving your homily a title, then we&apos;ll guide you through the creation process.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium mb-0.5">
                Homily Title *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title for your homily..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mt-1"
                autoFocus
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-base font-medium mb-0.5">
                Brief Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of your homily..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleCreateHomily}
                disabled={!title.trim() || isCreating}
                className="w-full"
                size="lg"
              >
                {isCreating ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {isCreating ? "Creating Homily..." : "Create Homily & Continue"}
              </Button>
              
              <p className="text-sm text-gray-500 text-center mt-2">
                Press ⌘+Enter to create quickly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
