"use client"

import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MainHeader } from "@/components/main-header"
import { useAppContext } from "@/contexts/AppContextProvider"
// Removed unused imports

export default function Definitions() {
  const { userSettings, isLoading } = useAppContext()
  
  // Local state for editing definitions
  const [definitions, setDefinitions] = useState("")

  // Initialize local state when userSettings loads
  useEffect(() => {
    if (userSettings?.definitions !== undefined) {
      setDefinitions(userSettings.definitions || "")
    }
  }, [userSettings?.definitions])

  const handleDefinitionsChange = (value: string) => {
    setDefinitions(value)
  }

  // Removed unused handleSave function

  // Removed unused functions

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Definitions", active: true }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Definitions</h2>
          <p className="text-gray-600">Your personal definitions and theological terms that help guide homily creation</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Personal Definitions
            </CardTitle>
            <CardDescription>
              Your personal definitions and theological terms that help guide homily creation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading definitions...</div>
            ) : (
              <div className="space-y-4">
                <Label htmlFor="definitions">Definitions</Label>
                <Textarea
                  id="definitions"
                  value={definitions}
                  onChange={(e) => handleDefinitionsChange(e.target.value)}
                  placeholder="Your personal definitions and homily guidelines will appear here. Click 'Reset to Default' to load comprehensive guidelines, or start writing your own..."
                  className="min-h-[200px]"
                />
                {!definitions && (
                  <p className="text-sm text-muted-foreground">
                    No definitions found. Add your personal definitions above.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
