"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Target,
  Save,
  ChevronRight,
  FileText,
  Edit,
  Loader,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@/contexts/AppContextProvider"
import { updateHomily } from "@/lib/actions/homilies"
import { generateAIResponse } from "@/lib/actions/ai"
import { useApiToast } from "@/lib/utils"

interface HomilyWizardProps {
  homily: {
    id: number
    title: string
    description: string
    definitions: string
    readings: string
    first_set_of_questions: string
    second_set_of_questions: string
    final_draft: string
    status: string
  }
}

export default function HomilyWizard({ homily }: HomilyWizardProps) {
  const { user, userSettings } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showResponseToast, showErrorToast } = useApiToast()
  
  // Get step from URL parameter, default to 1
  const [currentStep, setCurrentStep] = useState(Math.max(1, Math.min(6, parseInt(searchParams.get('step') || '1', 10))))
  
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const saveInProgressRef = useRef(false)
  
  const [homilyData, setHomilyData] = useState({
    title: homily.title || "",
    description: homily.description || "",
    definitions: homily.definitions || "",
    readings: homily.readings || "",
    first_set_of_questions: homily.first_set_of_questions || "",
    second_set_of_questions: homily.second_set_of_questions || "",
    final_draft: homily.final_draft || "",
    status: homily.status || "Not Started"
  })

  // Auto-populate definitions from user settings when reaching step 3
  useEffect(() => {
    if (currentStep === 3 && userSettings?.definitions) {
      setHomilyData(prev => ({
        ...prev,
        definitions: userSettings?.definitions || ""
      }))
    }
  }, [currentStep, userSettings?.definitions])

  // Sync URL step parameter when currentStep changes and initialize step from URL on mount
  useEffect(() => {
    const urlStep = parseInt(searchParams.get('step') || '1', 10)
    const validStep = Math.max(1, Math.min(6, urlStep))
    setCurrentStep(validStep)
  }, [searchParams])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('step', currentStep.toString())
    router.replace(url.pathname + url.search)
  }, [currentStep, router])

  const steps = [
    { id: 1, name: "Name and Description", icon: FileText },
    { id: 2, name: "Scripture Readings", icon: BookOpen },
    { id: 3, name: "Definitions", icon: Target },
    { id: 4, name: "First Questions", icon: Edit },
    { id: 5, name: "Second Questions", icon: Edit },
    { id: 6, name: "Final Draft", icon: FileText },
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setHomilyData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFirstSetOfQuestionsAI = async () => {
    if (!user?.id) {
      showErrorToast(new Error("You must be logged in to use AI features"));
      return;
    }
    setIsLoadingAI(true);
    try {
      const prompt = `Here are the readings: ${homilyData.readings} and here is what makes an excellent homily: ${homilyData.definitions}. Generate thoughtful questions that explore the main themes and messages. These should be initial questions that help frame the homily's direction.  Do not generate any other response other than the questions for the user to answer.`
      const result = await generateAIResponse(prompt, user.id);
      if (result.error) {
        showErrorToast(new Error(result.error));
        return;
      }
      if (!result.content) {
        showErrorToast(new Error("No content generated"));
        return;
      }
      handleInputChange('first_set_of_questions', result.content);
      showResponseToast({ success: true, message: "First set of questions generated!" });
    } catch (error) {
      console.error('Error generating AI content:', error);
      showErrorToast(error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSecondSetOfQuestionsAI = async () => {
    if (!user?.id) {
      showErrorToast(new Error("You must be logged in to use AI features"));
      return;
    }
    setIsLoadingAI(true);
    try {
      const prompt = `Here are the responses to your first set of questions: ${homilyData.first_set_of_questions}. Generate one final set of questions before producing the final product.`
      const result = await generateAIResponse(prompt, user.id);
      if (result.error) {
        showErrorToast(new Error(result.error));
        return;
      }
      if (!result.content) {
        showErrorToast(new Error("No content generated"));
        return;
      }
      handleInputChange('second_set_of_questions', result.content);
      showResponseToast({ success: true, message: "Second set of questions generated!" });
    } catch (error) {
      console.error('Error generating AI content:', error);
      showErrorToast(error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleFinalDraftAI = async () => {
    if (!user?.id) {
      showErrorToast(new Error("You must be logged in to use AI features"));
      return;
    }
    setIsLoadingAI(true);
    try {
      const prompt = `Here are the final responses to your second set of questions: ${homilyData.second_set_of_questions}. Generate a final draft of the homily.`
      const result = await generateAIResponse(prompt, user.id);
      if (result.error) {
        showErrorToast(new Error(result.error));
        return;
      }
      if (!result.content) {
        showErrorToast(new Error("No content generated"));
        return;
      }
      handleInputChange('final_draft', result.content);
      showResponseToast({ success: true, message: "Final draft generated!" });
    } catch (error) {
      console.error('Error generating AI content:', error);
      showErrorToast(error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleCopyDefinitions = () => {
    if (userSettings?.definitions) {
      console.log('Copying definitions from user settings...')
      setHomilyData(prev => ({
        ...prev,
        definitions: userSettings?.definitions || ""
      }))
      showResponseToast({ success: true, message: "Definitions copied successfully!" })
    } else {
      console.log('No definitions found in user settings.')
      showErrorToast(new Error("No definitions found in user settings"))
    }
  }

  const completeHomily = async () => {
    if (!user?.id) {
      showErrorToast(new Error("You must be logged in to complete homily"))
      return
    }

    try {
      // Determine status based on completion
      const status = homilyData.final_draft.trim() ? "Complete" : 
                    homilyData.second_set_of_questions.trim() ? "Second Draft" : 
                    homilyData.first_set_of_questions.trim() ? "Rough Draft" : "Not Started"
      
      const result = await updateHomily(homily.id, user.id, {
        title: homilyData.title || "New Homily",
        description: homilyData.description || "Homily in progress",
        definitions: homilyData.definitions,
        readings: homilyData.readings,
        first_set_of_questions: homilyData.first_set_of_questions,
        second_set_of_questions: homilyData.second_set_of_questions,
        final_draft: homilyData.final_draft,
        status: status,
      })
      
      if (result.error) {
        showErrorToast(new Error(result.error))
      } else {
        showResponseToast({ success: true, message: "Homily completed successfully!" })
        router.push('/homilies')
      }
    } catch (error) {
      showErrorToast(error)
    }
  }

  const handleSaveDraft = async () => {
    if (!user?.id) {
      showErrorToast(new Error("You must be logged in to save draft"))
      return
    }

    // Prevent rapid successive saves
    if (saveInProgressRef.current) {
      return
    }

    saveInProgressRef.current = true
    setIsSaving(true)
    try {
      // Determine status based on current progress
      const status = homilyData.final_draft.trim() ? "Complete" : 
                    homilyData.second_set_of_questions.trim() ? "Second Draft" : 
                    homilyData.first_set_of_questions.trim() ? "Rough Draft" : "Not Started"
      
      const result = await updateHomily(homily.id, user.id, {
        title: homilyData.title || "Draft Homily",
        description: homilyData.description || "Homily in progress",
        definitions: homilyData.definitions,
        readings: homilyData.readings,
        first_set_of_questions: homilyData.first_set_of_questions,
        second_set_of_questions: homilyData.second_set_of_questions,
        final_draft: homilyData.final_draft,
        status: status,
      })
      
      if (result.error) {
        showResponseToast({ success: false, message: result.error })
      } else {
        showResponseToast({ success: true, message: "Draft saved successfully!" })
        setJustSaved(true)
        // Reset saved state after 2 seconds
        setTimeout(() => setJustSaved(false), 2000)
      }
    } catch (error) {
      console.error("Save draft error:", error)
      showErrorToast(error)
    } finally {
      saveInProgressRef.current = false
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps - Horizontally Scrollable */}
      <div className="mb-8">
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max px-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isAccessible = true; // Allow navigation to any step; restrict if needed

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center min-w-0">
                    <button
                      type="button"
                      onClick={() => isAccessible && setCurrentStep(step.id)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 focus:outline-none transition-all duration-150
                        ${isCompleted ? "bg-green-500 border-green-500 text-white hover:brightness-110" :
                          isActive ? "bg-indigo-600 border-indigo-600 text-white hover:brightness-110" :
                          "bg-white border-gray-300 text-gray-400 hover:border-indigo-400 hover:text-indigo-600"}
                        cursor-pointer`}
                      aria-label={`Go to step ${step.id}: ${step.name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-8">
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-medium">
                  Homily Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a title for your homily..."
                  value={homilyData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief description of your homily..."
                  value={homilyData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="readings" className="text-base font-medium">
                  Scripture Readings
                </Label>
                <Textarea
                  id="readings"
                  placeholder="Enter the scripture readings for this homily..."
                  value={homilyData.readings}
                  onChange={(e) => handleInputChange('readings', e.target.value)}
                  className="mt-2"
                  rows={6}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="definitions" className="text-base font-medium">
                  Key Definitions
                </Label>
                <Button
                  onClick={handleCopyDefinitions}
                  variant="outline"
                  size="sm"
                >
                  Copy Global Definitions
                </Button>
              </div>
              <Textarea
                id="definitions"
                placeholder="Define key terms and concepts that will be important for your homily..."
                value={homilyData.definitions}
                onChange={(e) => handleInputChange('definitions', e.target.value)}
                className="mt-2"
                rows={8}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="first_questions" className="text-base font-medium">
                  First Set of Questions
                </Label>
                <Button
                  onClick={handleFirstSetOfQuestionsAI}
                  disabled={isLoadingAI}
                  variant="outline"
                  size="sm"
                >
                  {isLoadingAI ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {isLoadingAI ? "Generating..." : "AI Generate"}
                </Button>
              </div>
              <Textarea
                id="first_questions"
                placeholder="Explore initial questions and themes for your homily..."
                value={homilyData.first_set_of_questions}
                onChange={(e) => handleInputChange('first_set_of_questions', e.target.value)}
                className="mt-2"
                rows={10}
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="second_questions" className="text-base font-medium">
                  Second Set of Questions
                </Label>
                <Button
                  onClick={handleSecondSetOfQuestionsAI}
                  disabled={isLoadingAI}
                  variant="outline"
                  size="sm"
                >
                  {isLoadingAI ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {isLoadingAI ? "Generating..." : "AI Generate"}
                </Button>
              </div>
              <Textarea
                id="second_questions"
                placeholder="Dive deeper with follow-up questions and refined themes..."
                value={homilyData.second_set_of_questions}
                onChange={(e) => handleInputChange('second_set_of_questions', e.target.value)}
                className="mt-2"
                rows={10}
              />
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="final_draft" className="text-base font-medium">
                  Final Draft
                </Label>
                <Button
                  onClick={handleFinalDraftAI}
                  disabled={isLoadingAI}
                  variant="outline"
                  size="sm"
                >
                  {isLoadingAI ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {isLoadingAI ? "Generating..." : "AI Generate"}
                </Button>
              </div>
              <Textarea
                id="final_draft"
                placeholder="Write your complete homily here..."
                value={homilyData.final_draft}
                onChange={(e) => handleInputChange('final_draft', e.target.value)}
                className="mt-2"
                rows={15}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentStep > 1 && (
            <Button onClick={handlePrevious} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          <Link href="/homilies">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homilies
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            type="button"
            onClick={handleSaveDraft}
            variant="outline"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader className="w-4 h-4 mr-1 sm:mr-2 animate-spin" />
            ) : justSaved ? (
              <Check className="w-4 h-4 mr-1 sm:mr-2 text-green-500" />
            ) : (
              <Save className="w-4 h-4 mr-1 sm:mr-2" />
            )}
            <span className="hidden sm:inline">{isSaving ? "Saving..." : justSaved ? "Saved!" : "Save Draft"}</span>
            <span className="sm:hidden">{isSaving ? "..." : justSaved ? "!" : "Save"}</span>
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={completeHomily}>
              Complete Homily
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
