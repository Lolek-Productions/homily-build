"use client"

import { useState, useEffect } from "react"
import { NotebookText, RefreshCw, Save } from "lucide-react"
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
    console.log("userSettings", userSettings)
    if (userSettings) {
      const definitionsValue = userSettings.definitions || DEFAULT_USER_SETTINGS_DEFINITION || ""
      setDefinitions(definitionsValue)
    }
  }, [userSettings])

  const handleDefinitionsChange = (value: string) => {
    setDefinitions(value)
  }
  
  const handleResetToDefault = async () => {
    if (!userSettings?.id) {
      showErrorToast(new Error("User settings not found. Please try refreshing the page."))
      return
    }
    
    setIsResetting(true)
    try {
      // Reset to default definitions in the database
      const result = await updateUserSettings(
        userSettings.id,
        { definitions: DEFAULT_USER_SETTINGS_DEFINITION }
      )
      
      if (!result.error) {
        // Update local state immediately for better UX
        setDefinitions(DEFAULT_USER_SETTINGS_DEFINITION)
        
        // Show success message
        showResponseToast({
          success: true,
          message: "Definitions reset to system defaults"
        })
        
        // Refresh settings to ensure consistency with the database
        const updatedSettings = await refreshSettings()
        console.log("Settings after reset:", updatedSettings)
      } else {
        showErrorToast(new Error(`Failed to reset definitions: ${result.error}`))
      }
    } catch (error) {
      console.error("Error resetting definitions:", error)
      showErrorToast(error as Error)
    } finally {
      setIsResetting(false)
    }
  }
  
  const handleSaveDefinitions = async () => {
    if (!userSettings?.id) {
      showErrorToast(new Error("User settings not found. Please try refreshing the page."))
      return
    }
    
    setIsSaving(true)
    try {
      const result = await updateUserSettings(
        userSettings.id,
        { definitions: definitions }
      )
      
      if (!result.error) {
        // Update the local state immediately for better UX
        setDefinitions(definitions)
        
        // Show success message
        showResponseToast({
          success: true,
          message: "Definitions saved successfully"
        })
        
        // Refresh settings to ensure consistency with the database
        const updatedSettings = await refreshSettings()
        console.log("Settings after save:", updatedSettings)
      } else {
        showErrorToast(new Error(`Failed to save definitions: ${result.error}`))
      }
    } catch (error) {
      console.error("Error saving definitions:", error)
      showErrorToast(error as Error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader 
        breadcrumbs={[
          { label: "Definitions", active: true }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Definitions</h2>
          <p className="text-muted-foreground">Your personal definitions and theological terms that help guide homily creation</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
            <NotebookText className="w-5 h-5 mr-2" />
              My Definitions
            </CardTitle>
            <CardDescription>
              Your personal definitions and theological terms that help guide homily creation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="definitions">Definitions</Label>
                {isLoading && (
                  <span className="text-sm text-muted-foreground animate-pulse">
                    Loading...
                  </span>
                )}
              </div>
              <Textarea
                id="definitions"
                value={definitions}
                onChange={(e) => handleDefinitionsChange(e.target.value)}
                placeholder="Your personal definitions and homily guidelines will appear here. Click 'Reset to Default' to load comprehensive guidelines, or start writing your own..."
                className="min-h-[200px]"
                disabled={isLoading}
              />
            </div>
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
