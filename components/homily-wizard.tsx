"use client"

import React, { useState, useEffect, useRef } from "react"
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
  RefreshCw,
  Container,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@/contexts/AppContextProvider"
import { updateHomily } from "@/lib/actions/homilies"
import { generateClaudeResponse } from "@/lib/actions/ai-claude"
import { getContexts } from "@/lib/actions/contexts"
import { useApiToast } from "@/lib/utils"
import { getFinalDraftPrompt, getFirstSetOfQuestionsPrompt, getSecondSetOfQuestionsPrompt } from "@/lib/prompts"

interface Context {
  id: number
  user_id: string
  name: string
  context: string
  created_at: string
}

interface HomilyWizardProps {
  homily: {
    id: number
    title: string
    description: string
    context?: string
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
  const [currentStep, setCurrentStep] = useState(Math.max(1, Math.min(7, parseInt(searchParams.get('step') || '1', 10))))
  
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const saveInProgressRef = useRef(false)
  
  const [homilyData, setHomilyData] = useState({
    title: homily.title || "",
    description: homily.description || "",
    context: homily.context || "",
    definitions: homily.definitions || "",
    readings: homily.readings || "",
    first_set_of_questions: homily.first_set_of_questions || "",
    second_set_of_questions: homily.second_set_of_questions || "",
    final_draft: homily.final_draft || "",
    status: homily.status || "Not Started"
  })
  
  const [contexts, setContexts] = useState<Context[]>([])
  const [isLoadingContexts, setIsLoadingContexts] = useState(false)
  const [isContextDialogOpen, setIsContextDialogOpen] = useState(false)
  const [contextSearchQuery, setContextSearchQuery] = useState("")

  // Load contexts when needed
  useEffect(() => {
    if (currentStep === 2 && user?.id && contexts.length === 0) {
      loadContexts()
    }
  }, [currentStep, user?.id, contexts.length])

  // Function to load contexts from the database
  const loadContexts = async () => {
    if (!user?.id) return
    
    setIsLoadingContexts(true)
    try {
      const result = await getContexts(user.id)
      if (result.error) {
        showErrorToast(new Error(result.error))
      } else {
        setContexts(result.data || [])
      }
    } catch (error) {
      console.error('Error loading contexts:', error)
      showErrorToast(error)
    } finally {
      setIsLoadingContexts(false)
    }
  }

  // Handle step navigation with auto-save
  const handleStepChange = async (newStep: number) => {
    console.log(`Attempting to navigate from step ${currentStep} to step ${newStep}`)
    
    // If moving forward, validate current step requirements
    if (newStep > currentStep) {
      // Validate step 2 (context)
      if (currentStep === 2 && !homilyData.context.trim()) {
        showErrorToast(new Error('Please select or enter a context before proceeding'))
        return
      }
      
      // Validate step 3 (readings)
      if (currentStep === 3 && !homilyData.readings.trim()) {
        showErrorToast(new Error('Please enter the scripture readings before proceeding'))
        return
      }
      
      // Validate step 5 (first set of questions)
      if (currentStep === 5 && !homilyData.first_set_of_questions.trim()) {
        showErrorToast(new Error('Please complete the first set of questions before proceeding'))
        return
      }
      
      // Validate step 6 (second set of questions)
      if (currentStep === 6 && !homilyData.second_set_of_questions.trim()) {
        showErrorToast(new Error('Please complete the second set of questions before proceeding'))
        return
      }
      
      // Save progress if all validations pass
      await saveCurrentProgress()
      
      // Log successful validation
      console.log(`Validation passed for step ${currentStep}, proceeding to step ${newStep}`)
    }
    
    // Update URL with new step
    const params = new URLSearchParams(window.location.search)
    params.set('step', newStep.toString())
    router.push(`/homilies/${homily.id}?${params.toString()}`)
    
    // Set the current step state
    setCurrentStep(newStep)
    
    // If navigating to step 3, pre-load definitions
    if (newStep === 3 && !homilyData.definitions && userSettings?.definitions) {
      setHomilyData(prev => ({
        ...prev,
        definitions: userSettings.definitions || ""
      }))
    }
  }
  
  // Helper function to save current progress
  const saveCurrentProgress = async () => {
    // Don't save if user isn't logged in
    if (!user?.id) {
      console.log('User not logged in, skipping auto-save')
      return
    }
    
    // Prevent rapid successive saves
    if (saveInProgressRef.current) {
      console.log('Save already in progress, skipping')
      return
    }
    
    console.log('Auto-saving homily progress...')
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
        console.error('Auto-save error:', result.error)
        // Don't show error toast for auto-save to avoid disrupting user experience
      } else {
        console.log('Auto-save successful')
        setJustSaved(true)
        // Reset saved state after 2 seconds
        setTimeout(() => setJustSaved(false), 2000)
      }
    } catch (error) {
      console.error("Auto-save error:", error)
      // Don't show error toast for auto-save to avoid disrupting user experience
    } finally {
      saveInProgressRef.current = false
      setIsSaving(false)
    }
  }

  // Sync URL step parameter when currentStep changes and initialize step from URL on mount
  useEffect(() => {
    const urlStep = parseInt(searchParams.get('step') || '1', 10)
    const validStep = Math.max(1, Math.min(7, urlStep))
    setCurrentStep(validStep)
  }, [searchParams])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('step', currentStep.toString())
    router.replace(url.pathname + url.search)
    
    // Center the active step in the viewport
    setTimeout(() => {
      const container = document.getElementById('steps-container') as HTMLElement | null
      const activeStep = document.querySelector(`[data-step="${currentStep}"]`) as HTMLElement | null
      
      if (container && activeStep) {
        const containerWidth = container.offsetWidth
        const stepLeft = activeStep.getBoundingClientRect().left
        const containerLeft = container.getBoundingClientRect().left
        const stepWidth = activeStep.offsetWidth
        
        // Calculate scroll position to center the active step
        const scrollPosition = (stepLeft - containerLeft) - (containerWidth / 2) + (stepWidth / 2)
        container.scrollTo({ left: container.scrollLeft + scrollPosition, behavior: 'smooth' })
      }
    }, 100)
  }, [currentStep, router])

  const steps = [
    { id: 1, name: "Title and Description", icon: FileText },
    { id: 2, name: "Context", icon: Container },
    { id: 3, name: "Scripture Readings", icon: BookOpen },
    { id: 4, name: "Definitions", icon: Target },
    { id: 5, name: "First Questions", icon: Edit },
    { id: 6, name: "Second Questions", icon: Edit },
    { id: 7, name: "Final Draft", icon: FileText },
  ]

  const handleNext = () => {
    console.log(`handleNext called at step ${currentStep}, max steps: ${steps.length}`)
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1
      console.log(`Advancing to step ${nextStep}`)
      handleStepChange(nextStep)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1)
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
      const prompt = getFirstSetOfQuestionsPrompt(homilyData);
      const result = await generateClaudeResponse(prompt, user.id);
      console.log('Result:', result)
      
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
    console.log('handleSecondSetOfQuestionsAI')

    setIsLoadingAI(true);
    try {
      const prompt = getSecondSetOfQuestionsPrompt(homilyData);
      // console.log('Prompt:', prompt)

      const result = await generateClaudeResponse(prompt, user.id);
      if (result.error) {
        showErrorToast(new Error(result.error));
        return;
      }
      if (!result.content) {
        showErrorToast(new Error("No content generated"));
        return;
      }
      console.log('Result:', result)
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
      const prompt = getFinalDraftPrompt(homilyData);
      console.log('Prompt:', prompt)
      const result = await generateClaudeResponse(prompt, user.id);
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

  // Function to copy global definitions from user settings to the current homily
  const handleCopyDefinitions = async () => {
    try {
      // Check if user is logged in
      if (!user?.id) {
        showErrorToast(new Error("You must be logged in to copy definitions"))
        return
      }
      
      // First try to use definitions from context if available
      if (userSettings?.definitions) {
        console.log('Using definitions from context')
        setHomilyData(prev => ({
          ...prev,
          definitions: userSettings.definitions || ""
        }))
        showResponseToast({ success: true, message: "Definitions copied successfully!" })
        return
      }
      
      // If not in context, fetch directly from the server
      console.log('Fetching definitions from server')
      const { getUserSettings } = await import('@/lib/actions/userSettings')
      const { data, error } = await getUserSettings(user.id)
      
      if (error) {
        console.error('Error fetching user settings:', error)
        showErrorToast(new Error("Failed to fetch user settings"))
        return
      }
      
      if (data?.definitions) {
        console.log('Copying definitions from server')
        setHomilyData(prev => ({
          ...prev,
          definitions: data.definitions || ""
        }))
        showResponseToast({ success: true, message: "Definitions copied successfully!" })
      } else {
        console.log('No definitions found in user settings')
        showErrorToast(new Error("No definitions found in user settings"))
      }
    } catch (error) {
      console.error('Error fetching user settings:', error)
      showErrorToast(new Error("Failed to fetch user settings"))
    }
  }

  // Function removed - now using auto-save on step navigation instead

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
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Homily: {homilyData.title}</h2>
          <p className="text-gray-600">Description: {homilyData.description}</p>
        </div>
        <Button
          type="button"
          onClick={handleSaveDraft}
          variant="outline"
          disabled={isSaving}
          className="mt-1"
        >
          {isSaving ? (
            <Loader className="w-4 h-4 mr-1 sm:mr-2 animate-spin" />
          ) : justSaved ? (
            <Check className="w-4 h-4 mr-1 sm:mr-2 text-green-500" />
          ) : (
            <Save className="w-4 h-4 mr-1 sm:mr-2" />
          )}
          <span className="hidden sm:inline">{isSaving ? "Saving..." : justSaved ? "Saved!" : "Save"}</span>
          <span className="sm:hidden">{isSaving ? "..." : justSaved ? "!" : "Save"}</span>
        </Button>
      </div>

      {/* Progress Steps - Horizontally Scrollable */}
      <div className="mb-8">
        <div className="overflow-x-auto pb-4" id="steps-container">
          <div className="flex space-x-6 min-w-max px-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              // Only allow navigation to completed steps or current step (disable skipping ahead)
              const isAccessible = step.id <= currentStep;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0" data-step={step.id}>
                  <div className="flex flex-col items-center min-w-0">
                    <button
                      type="button"
                      onClick={() => isAccessible ? handleStepChange(step.id) : null}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 focus:outline-none transition-all duration-150
                        ${isCompleted ? "bg-green-500 border-green-500 text-white hover:brightness-110" :
                          isActive ? "bg-indigo-600 border-indigo-600 text-white hover:brightness-110" :
                          "bg-white border-gray-300 text-gray-400 hover:border-indigo-400 hover:text-indigo-600"}
                        ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      aria-label={`Go to step ${step.id}: ${step.name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <p
                        className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-indigo-600 font-semibold" : isAccessible ? "text-gray-900" : "text-gray-400"}`}
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
                <p className="text-sm text-gray-500 mb-2">Create a memorable title that captures the main theme of your homily. You might include the date or the name of a person, in the case of a funeral.</p>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a title for your homily..."
                  value={homilyData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Description
                </Label>
                <p className="text-sm text-gray-500 mb-2">The description can be used to describe any context or special items that are relevant to the homily.</p>
                <Textarea
                  id="description"
                  placeholder="Provide a brief description of your homily..."
                  value={homilyData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="context" className="text-base font-medium">
                    Select Context
                  </Label>
                  <Button 
                    onClick={() => {
                      loadContexts()
                      setIsContextDialogOpen(true)
                    }}
                    variant="default"
                    size="sm"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Contexts
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  The context helps provide background information and theological framework for your homily.
                  Select from your saved contexts or enter a new one below.
                </p>
                <Textarea
                  id="context"
                  placeholder="Enter or select context for this homily..."
                  value={homilyData.context}
                  onChange={(e) => handleInputChange('context', e.target.value)}
                  className="mt-1"
                  rows={8}
                />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="readings" className="text-base font-medium">
                  Insert Scripture Readings
                </Label>
                <p className="text-sm text-gray-500 mb-2">Enter the scripture readings for this homily. You can paste the whole reading or the pericope (the verses that are being read). This will be used to send to the AI to generate the homily.</p>
                <div className="flex space-x-2 mb-4">
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <a href="https://bible.usccb.org" target="_blank" rel="noopener noreferrer">
                      USCCB Bible (English)
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <a href="https://bible.usccb.org/es" target="_blank" rel="noopener noreferrer">
                      USCCB Bible (Spanish)
                    </a>
                  </Button>
                </div>
                <Textarea
                  id="readings"
                  placeholder="Enter the scripture readings for this homily..."
                  value={homilyData.readings}
                  onChange={(e) => handleInputChange('readings', e.target.value)}
                  className="mt-1"
                  rows={6}
                />
              </div>
              {/* Navigation handled by main navigation buttons */}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="definitions" className="text-base font-medium">
                  Refine Key Definitions
                </Label>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyDefinitions}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Global Definitions
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">Define key terms and concepts that will be important for your homily. These will be used to send to the AI to generate the homily.</p>
              <Textarea
                id="definitions"
                placeholder="Define key terms and concepts that will be important for your homily..."
                value={homilyData.definitions}
                onChange={(e) => handleInputChange('definitions', e.target.value)}
                className="mt-1"
                rows={8}
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="first_questions" className="text-base font-medium flex items-center">
                  Generate and Answer First Set of Questions
                </Label>
                <Button
                  onClick={handleFirstSetOfQuestionsAI}
                  disabled={isLoadingAI}
                  variant="default"
                  size="sm"
                >
                  {isLoadingAI ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {isLoadingAI ? "Generating..." : "Generate First Set of Questions"}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mb-2">Explore initial questions and themes for your homily. These will be used to send to the AI to generate the homily. Click the button above to generate. Fill out your answers to the questions in the textarea below. If you don&apos;t want to answer a question, then don&apos;t. If you want to add more information, or delete something, then do it. When you are finished, click the Next button to move to the next step.</p>
              <Textarea
                id="first_questions"
                placeholder="Click the button above to generate and then answer the questions here..."
                value={homilyData.first_set_of_questions}
                onChange={(e) => handleInputChange('first_set_of_questions', e.target.value)}
                className="mt-1"
                rows={10}
              />
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="second_questions" className="text-base font-medium flex items-center">
                  Generate and Answer Second Set of Questions
                </Label>
                <Button
                  onClick={handleSecondSetOfQuestionsAI}
                  disabled={isLoadingAI}
                  variant="default"
                  size="sm"
                >
                  {isLoadingAI ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {isLoadingAI ? "Generating..." : "Generate Second Set of Questions"}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mb-2">Dive deeper with follow-up questions and refined themes. Click the button above to generate. Fill out your answers to the questions in the textarea below. If you don&apos;t want to answer a question, then don&apos;t. If you want to add more information, or delete something, then do it. When you are finished, click the Next button to move to the next step.</p>
              <Textarea
                id="second_questions"
                placeholder="Click the button above to generate and then answer the questions here..."
                value={homilyData.second_set_of_questions}
                onChange={(e) => handleInputChange('second_set_of_questions', e.target.value)}
                className="mt-1"
                rows={10}
              />
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="final_draft" className="text-base font-medium flex items-center">
                  Generate and Refine Final Draft
                </Label>
                <Button
                  onClick={handleFinalDraftAI}
                  disabled={isLoadingAI}
                  variant="default"
                  size="sm"
                >
                  {isLoadingAI ? (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4 mr-2" />
                  )}
                  {isLoadingAI ? "Generating..." : "Generate Final Draft"}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mb-2">Click the button above to generate.  Finish your edits and then click save.  Your homily is finished.</p>
              <Textarea
                id="final_draft"
                placeholder="Click the button above to generate and then finish your edits here..."
                value={homilyData.final_draft}
                onChange={(e) => handleInputChange('final_draft', e.target.value)}
                className="mt-1"
                rows={15}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Context Selection Dialog */}
      <Dialog open={isContextDialogOpen} onOpenChange={setIsContextDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select a Context</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <Input
              placeholder="Search contexts..."
              value={contextSearchQuery}
              onChange={(e) => setContextSearchQuery(e.target.value)}
              className="mb-2"
            />
          </div>
          
          <ScrollArea className="flex-1 border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Context</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingContexts ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      <Loader className="w-4 h-4 animate-spin mx-auto" />
                      <span className="text-sm text-gray-500 block mt-2">Loading contexts...</span>
                    </TableCell>
                  </TableRow>
                ) : contexts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      <span className="text-sm text-gray-500">No contexts found</span>
                    </TableCell>
                  </TableRow>
                ) : (
                  contexts
                    .filter(ctx => {
                      if (!contextSearchQuery) return true;
                      return (
                        ctx.name.toLowerCase().includes(contextSearchQuery.toLowerCase()) ||
                        ctx.context.toLowerCase().includes(contextSearchQuery.toLowerCase())
                      );
                    })
                    .map((ctx) => (
                      <TableRow key={ctx.id}>
                        <TableCell className="font-medium">{ctx.name}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{ctx.context}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              handleInputChange('context', ctx.context);
                              setIsContextDialogOpen(false);
                            }}
                          >
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsContextDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentStep > 1 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {currentStep < steps.length ? (
            <div className="relative group">
              <Button 
                onClick={() => {
                  console.log(`Next button clicked at step ${currentStep}`)
                  handleNext()
                }}
                disabled={
                  (currentStep === 2 && !homilyData.context.trim()) ||
                  (currentStep === 3 && !homilyData.readings.trim()) ||
                  (currentStep === 5 && !homilyData.first_set_of_questions.trim()) ||
                  (currentStep === 6 && !homilyData.second_set_of_questions.trim())
                }
                className={
                  (currentStep === 2 && !homilyData.context.trim()) ||
                  (currentStep === 3 && !homilyData.readings.trim()) ||
                  (currentStep === 5 && !homilyData.first_set_of_questions.trim()) ||
                  (currentStep === 6 && !homilyData.second_set_of_questions.trim())
                    ? "opacity-70" : ""
                }
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              {currentStep === 2 && !homilyData.context.trim() && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Please enter or select a context to continue
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                </div>
              )}
              {currentStep === 3 && !homilyData.readings.trim() && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Please enter scripture readings to continue
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                </div>
              )}
              {currentStep === 5 && !homilyData.first_set_of_questions.trim() && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Please complete the first set of questions to continue
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                </div>
              )}
              {currentStep === 6 && !homilyData.second_set_of_questions.trim() && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Please complete the second set of questions to continue
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
