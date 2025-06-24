"use client"

import { useState } from "react"
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

export default function Definitions() {
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

  const handleSave = () => {
    // Save logic would go here
    console.log("Saving prompts and context...")
  }

  const handleReset = () => {
    // Reset to defaults logic would go here
    console.log("Resetting to defaults...")
  }

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
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Personal Context
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Core Prompts
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* Personal Context Tab */}
          <TabsContent value="personal">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    This information helps personalize AI responses and homily suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={personalContext.name}
                        onChange={(e) => setPersonalContext({ ...personalContext, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="parish">Parish Name</Label>
                      <Input
                        id="parish"
                        value={personalContext.parish}
                        onChange={(e) => setPersonalContext({ ...personalContext, parish: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalContext.location}
                        onChange={(e) => setPersonalContext({ ...personalContext, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="years">Years Ordained</Label>
                      <Input
                        id="years"
                        value={personalContext.yearsOrdained}
                        onChange={(e) => setPersonalContext({ ...personalContext, yearsOrdained: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Preaching Style
                  </CardTitle>
                  <CardDescription>Describe your personal preaching approach and style preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your preaching style, preferred approaches, and how you like to connect with your congregation..."
                    value={personalContext.preachingStyle}
                    onChange={(e) => setPersonalContext({ ...personalContext, preachingStyle: e.target.value })}
                    className="min-h-32"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Church className="w-5 h-5 mr-2" />
                    Parish Context
                  </CardTitle>
                  <CardDescription>
                    Describe your parish community, demographics, and unique characteristics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your parish size, demographics, cultural makeup, special characteristics, community needs, etc..."
                    value={personalContext.parishDescription}
                    onChange={(e) => setPersonalContext({ ...personalContext, parishDescription: e.target.value })}
                    className="min-h-32"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Theological Approach</CardTitle>
                  <CardDescription>Describe your theological perspective and pastoral approach</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your theological approach, pastoral style, how you balance challenge and comfort, etc..."
                    value={personalContext.theologicalApproach}
                    onChange={(e) => setPersonalContext({ ...personalContext, theologicalApproach: e.target.value })}
                    className="min-h-32"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Core Prompts Tab */}
          <TabsContent value="prompts">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Generation Prompt</CardTitle>
                  <CardDescription>Controls how AI generates homily themes from liturgical readings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={corePrompts.themeGeneration}
                    onChange={(e) => setCorePrompts({ ...corePrompts, themeGeneration: e.target.value })}
                    className="min-h-40 font-mono text-sm"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Point Development Prompt</CardTitle>
                  <CardDescription>Guides AI in developing main points for homily structure</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={corePrompts.pointDevelopment}
                    onChange={(e) => setCorePrompts({ ...corePrompts, pointDevelopment: e.target.value })}
                    className="min-h-40 font-mono text-sm"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Story Selection Prompt</CardTitle>
                  <CardDescription>
                    Controls how AI selects and suggests stories from the faith stories database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={corePrompts.storySelection}
                    onChange={(e) => setCorePrompts({ ...corePrompts, storySelection: e.target.value })}
                    className="min-h-40 font-mono text-sm"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conclusion Generation Prompt</CardTitle>
                  <CardDescription>Guides AI in creating compelling homily conclusions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={corePrompts.conclusionGeneration}
                    onChange={(e) => setCorePrompts({ ...corePrompts, conclusionGeneration: e.target.value })}
                    className="min-h-40 font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Personality</CardTitle>
                  <CardDescription>Defines the overall personality and approach of the AI assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={systemPrompts.aiPersonality}
                    onChange={(e) => setSystemPrompts({ ...systemPrompts, aiPersonality: e.target.value })}
                    className="min-h-40 font-mono text-sm"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Guidelines</CardTitle>
                  <CardDescription>General guidelines for all AI-generated content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={systemPrompts.contentGuidelines}
                    onChange={(e) => setSystemPrompts({ ...systemPrompts, contentGuidelines: e.target.value })}
                    className="min-h-40 font-mono text-sm"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prompt Variables</CardTitle>
                  <CardDescription>
                    Variables automatically inserted into prompts based on your personal context
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="secondary">{"${personalContext.preachingStyle}"}</Badge>
                      <p className="text-sm text-gray-600">Your preaching style description</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">{"${personalContext.parishDescription}"}</Badge>
                      <p className="text-sm text-gray-600">Your parish context and demographics</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">{"${personalContext.theologicalApproach}"}</Badge>
                      <p className="text-sm text-gray-600">Your theological and pastoral approach</p>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">{"${personalContext.name}"}</Badge>
                      <p className="text-sm text-gray-600">Your name for personalization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
