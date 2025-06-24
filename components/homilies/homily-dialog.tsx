"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApiToast } from "@/lib/utils"

interface Homily {
  id: number
  title: string
  description: string | null
  definitions: string | null
  readings: string | null
  first_set_of_questions: string | null
  second_set_of_questions: string | null
  final_draft: string | null
  status: string | null
  created_at: string
  user_id: string
}

interface HomilyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  homily?: Homily | null
  onSave: (homily: Omit<Homily, 'id' | 'created_at' | 'user_id'>) => Promise<void>
  isLoading?: boolean
}

export function HomilyDialog({ open, onOpenChange, homily, onSave, isLoading = false }: HomilyDialogProps) {
  const { showErrorToast } = useApiToast()
  const [formData, setFormData] = useState<Omit<Homily, 'id' | 'created_at' | 'user_id'>>({
    title: "",
    description: "",
    definitions: "",
    readings: "",
    first_set_of_questions: "",
    second_set_of_questions: "",
    final_draft: "",
    status: "",
  })

  // Reset form when dialog opens/closes or homily changes
  useEffect(() => {
    if (open) {
      if (homily) {
        setFormData({
          title: homily.title || "",
          description: homily.description || "",
          definitions: homily.definitions || "",
          readings: homily.readings || "",
          first_set_of_questions: homily.first_set_of_questions || "",
          second_set_of_questions: homily.second_set_of_questions || "",
          final_draft: homily.final_draft || "",
          status: homily.status || "",
        })
      } else {
        setFormData({
          title: "",
          description: "",
          definitions: "",
          readings: "",
          first_set_of_questions: "",
          second_set_of_questions: "",
          final_draft: "",
          status: "",
        })
      }
    }
  }, [open, homily])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      showErrorToast(new Error("Title is required"))
      return
    }

    try {
      await onSave(formData)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving homily:', error)
    }
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {homily ? "Edit Homily" : "Create New Homily"}
          </DialogTitle>
          <DialogDescription>
            {homily ? "Update your homily details and content." : "Create a new homily with title, description, and draft content."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Enter homily title..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Brief description of the homily theme or focus..."
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="readings">Readings</Label>
                <Textarea
                  id="readings"
                  value={formData.readings || ""}
                  onChange={(e) => updateField('readings', e.target.value)}
                  placeholder="List the readings for this homily..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="definitions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="definitions">Definitions</TabsTrigger>
              <TabsTrigger value="first_set_of_questions">First Set of Questions</TabsTrigger>
              <TabsTrigger value="second_set_of_questions">Second Set of Questions</TabsTrigger>
              <TabsTrigger value="final_draft">Final Draft</TabsTrigger>
            </TabsList>

            <TabsContent value="definitions" className="space-y-4">
              <div>
                <Label htmlFor="definitions">Definitions & Key Concepts</Label>
                <Textarea
                  id="definitions"
                  value={formData.definitions || ""}
                  onChange={(e) => updateField('definitions', e.target.value)}
                  placeholder="Define key theological terms, concepts, and themes for this homily..."
                  className="min-h-[200px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="first_set_of_questions" className="space-y-4">
              <div>
                <Label htmlFor="first_set_of_questions">First Set of Questions</Label>
                <Textarea
                  id="first_set_of_questions"
                  value={formData.first_set_of_questions || ""}
                  onChange={(e) => updateField('first_set_of_questions', e.target.value)}
                  placeholder="Write your first set of questions here..."
                  className="min-h-[300px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="second_set_of_questions" className="space-y-4">
              <div>
                <Label htmlFor="second_set_of_questions">Second Set of Questions</Label>
                <Textarea
                  id="second_set_of_questions"
                  value={formData.second_set_of_questions || ""}
                  onChange={(e) => updateField('second_set_of_questions', e.target.value)}
                  placeholder="Write your second set of questions here..."
                  className="min-h-[300px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="final_draft" className="space-y-4">
              <div>
                <Label htmlFor="final_draft">Final Draft</Label>
                <Textarea
                  id="final_draft"
                  value={formData.final_draft || ""}
                  onChange={(e) => updateField('final_draft', e.target.value)}
                  placeholder="Your polished, final homily ready for delivery..."
                  className="min-h-[300px]"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : (homily ? "Update Homily" : "Create Homily")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
