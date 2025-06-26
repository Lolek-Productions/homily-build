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
import { Loader, Plus } from "lucide-react"

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
        description: description.trim(),
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleCreateHomily()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader 
        breadcrumbs={[
          { label: "Homilies", href: "/homilies" },
          { label: "Create New Homily" }
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Create New Homily</h2>
          <p className="text-muted-foreground">Create a new homily</p>
        </div>

        
        <Card className="shadow-lg border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Create New Homily
            </CardTitle>
            <p className="text-muted-foreground mt-2">
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
                onKeyDown={handleKeyDown}
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
              
              <p className="text-sm text-muted-foreground text-center mt-2">
                Press ⌘+Enter to create quickly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
