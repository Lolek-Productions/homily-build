"use client"

import { useState, useEffect } from "react"
import { BookOpen, RefreshCw, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MainHeader } from "@/components/main-header"
import { useAppContext } from "@/contexts/AppContextProvider"
import { Button } from "@/components/ui/button"
import { DEFAULT_USER_SETTINGS_DEFINITION } from "@/lib/definition"
import { updateUserSettings } from "@/lib/actions/userSettings"
import { useApiToast } from "@/lib/utils"

export default function Definitions() {
  const { userSettings, isLoading, refreshSettings } = useAppContext()
  const [definitions, setDefinitions] = useState("")
  const [isResetting, setIsResetting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { showResponseToast, showErrorToast } = useApiToast()

  useEffect(() => {
    if (userSettings?.definitions !== undefined) {
      setDefinitions(userSettings.definitions || "")
    }
  }, [userSettings?.definitions])

  const handleDefinitionsChange = (value: string) => {
    setDefinitions(value)
  }
  
  const handleResetToDefault = async () => {
    if (!userSettings?.id) return
    
    setIsResetting(true)
    try {
      const result = await updateUserSettings(
        userSettings.id,
        { definitions: DEFAULT_USER_SETTINGS_DEFINITION }
      )
      
      if (!result.error) {
        showResponseToast({
          success: true,
          message: "Definitions reset to system defaults"
        })
        await refreshSettings()
      } else {
        showErrorToast(new Error("Failed to reset definitions"))
      }
    } catch (error) {
      showErrorToast(error as Error)
    } finally {
      setIsResetting(false)
    }
  }
  
  const handleSaveDefinitions = async () => {
    if (!userSettings?.id) return
    
    setIsSaving(true)
    try {
      const result = await updateUserSettings(
        userSettings.id,
        { definitions: definitions }
      )
      
      if (!result.error) {
        showResponseToast({
          success: true,
          message: "Definitions saved successfully"
        })
        await refreshSettings()
      } else {
        showErrorToast(new Error("Failed to save definitions"))
      }
    } catch (error) {
      showErrorToast(error as Error)
    } finally {
      setIsSaving(false)
    }
  }

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
          <CardFooter className="flex justify-between">
            <Button 
              variant="default" 
              onClick={handleSaveDefinitions}
              disabled={isSaving || isLoading}
              className="flex items-center gap-1"
            >
              {isSaving ? (
                <>
                  <Save className="h-4 w-4 animate-pulse" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Definitions
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleResetToDefault}
              disabled={isResetting || isLoading}
              className="flex items-center gap-1"
            >
              {isResetting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Reset to System Definitions
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
