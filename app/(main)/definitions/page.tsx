"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, RotateCcw, BookOpen, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { useAppContext } from "@/contexts/AppContextProvider"
import { updateUserSettings } from "@/lib/actions/userSettings"
import { useApiToast } from "@/lib/utils"
import { DEFAULT_USER_SETTINGS_DEFINITION } from "@/lib/definition"

export default function Definitions() {
  const { user, userSettings, isLoading, refreshSettings } = useAppContext()
  const { showResponseToast, showErrorToast } = useApiToast()
  
  // Local state for editing definitions
  const [definitions, setDefinitions] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize local state when userSettings loads
  useEffect(() => {
    if (userSettings?.definitions !== undefined) {
      setDefinitions(userSettings.definitions || "")
      setHasChanges(false)
    }
  }, [userSettings?.definitions])

  const handleDefinitionsChange = (value: string) => {
    setDefinitions(value)
    setHasChanges(value !== (userSettings?.definitions || ""))
  }

  const handleSave = async () => {
    if (!user?.id) {
      showErrorToast(new Error("User not found"))
      return
    }

    try {
      setIsSaving(true)
      const result = await updateUserSettings(user.id, { definitions })
      
      if (result.error) {
        showResponseToast({ success: false, message: result.error })
      } else {
        showResponseToast({ success: true, message: "Definitions saved successfully" })
        setHasChanges(false)
        // Refresh the settings to get the latest data
        await refreshSettings()
      }
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setDefinitions(userSettings?.definitions || "")
    setHasChanges(false)
  }

  const handleResetToDefault = () => {
    setDefinitions(DEFAULT_USER_SETTINGS_DEFINITION)
    setHasChanges(DEFAULT_USER_SETTINGS_DEFINITION !== (userSettings?.definitions || ""))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Settings", href: "/settings" },
          { label: "Definitions", active: true }
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
                <h1 className="text-xl font-bold text-gray-900">Personal Definitions</h1>
                <p className="text-sm text-gray-600">Define your personal theological terms and concepts</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleReset} variant="outline" disabled={!hasChanges}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Changes
              </Button>
              <Button onClick={handleResetToDefault} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
