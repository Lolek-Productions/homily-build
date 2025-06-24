"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, RotateCcw, BookOpen, User, Church, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { useAppContext } from "@/contexts/AppContextProvider"
import { updateUserSettings } from "@/lib/actions/userSettings"
import { useApiToast } from "@/lib/utils"

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
  }, [userSettings?.definitions]) // Fix useEffect import usage

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

  const [personalContext, setPersonalContext] = useState({
    name: "Father Michael Rodriguez",
    parish: "St. Mary's Catholic Church",
    location: "Austin, Texas",
    yearsOrdained: "12",
    preachingStyle:
      "I prefer a conversational, story-driven approach that connects scripture to everyday life. I often use personal anecdotes and contemporary examples to make ancient truths accessible to modern audiences.",
    parishDescription:
      "St. Mary's is a diverse, growing parish of about 1,200 families. We serve a mix of young families, college students from nearby UT, and established community members. Our congregation is about 60% English-speaking and 40% Spanish-speaking, with a strong emphasis on family values and community service.",
    theologicalApproach:
      "I lean toward a pastoral approach that emphasizes God's mercy and love while maintaining doctrinal accuracy. I prefer to challenge people gently rather than confrontationally, always pointing toward hope and practical application.",
  })

  const [corePrompts, setCorePrompts] = useState({
    themeGeneration: `Based on the provided liturgical readings, generate three distinct homily themes that:
1. Are rooted in Catholic teaching and scripture
2. Connect to contemporary life and practical application  
3. Are appropriate for the specified audience context
4. Offer hope and spiritual growth opportunities
5. Maintain theological accuracy while being accessible

Consider the preacher's style: ${personalContext.preachingStyle}
Parish context: ${personalContext.parishDescription}`,

    pointDevelopment: `Help develop 2-3 main points for this homily theme that:
1. Flow logically from the chosen scripture passages
2. Build upon each other toward a cohesive message
3. Include specific references to Catholic teaching when appropriate
4. Offer practical, actionable insights for daily Christian living
5. Are appropriate for the target audience

Theological approach: ${personalContext.theologicalApproach}`,

    storySelection: `Select and suggest stories from the faith stories database that:
1. Directly support the homily theme and main points
2. Are culturally appropriate for the specified context
3. Are engaging and memorable for the target audience
4. Demonstrate Catholic virtues and teachings in action
5. Are approximately 200-300 words in length

Parish demographics: ${personalContext.parishDescription}`,

    conclusionGeneration: `Create a compelling conclusion that:
1. Ties back to the opening theme and main scripture passage
2. Provides a clear, memorable takeaway message
3. Includes a specific call to action for the congregation
4. Ends with hope and encouragement
5. Is appropriate for the liturgical season and context

Preaching style: ${personalContext.preachingStyle}`,
  })

  const [systemPrompts, setSystemPrompts] = useState({
    aiPersonality: `You are a knowledgeable Catholic theology assistant helping priests create meaningful homilies. You have deep knowledge of:
- Catholic doctrine and teaching
- Liturgical calendar and traditions  
- Scripture interpretation and exegesis
- Pastoral care and preaching best practices
- Cultural sensitivity for diverse congregations

Always maintain theological accuracy while being practical and accessible. Respect the priest's individual style and parish context.`,

    contentGuidelines: `When generating homily content:
- Always ground suggestions in authentic Catholic teaching
- Cite specific Catechism paragraphs when relevant
- Consider the liturgical season and its themes
- Be sensitive to cultural and demographic contexts
- Offer multiple options when possible
- Maintain appropriate tone for sacred context
- Encourage practical application of faith principles`,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Settings", href: "/settings" },
          { label: "Prompts", active: true }
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
                <h1 className="text-xl font-bold text-gray-900">Prompts & Personal Context</h1>
                <p className="text-sm text-gray-600">Customize AI prompts and define your preaching context</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleReset} variant="outline" disabled={!hasChanges}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
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
        <div className="space-y-6">
          

          {/* Definitions Tab */}
            <div className="space-y-6">
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
                        placeholder="Enter your personal definitions, theological terms, and concepts that should guide your homily creation..."
                        className="min-h-[200px]"
                      />
                      {!definitions && (
                        <p className="text-sm text-muted-foreground">
                          No definitions found. You can add definitions through your settings.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          
        </div>
      </div>
    </div>
  )
}
