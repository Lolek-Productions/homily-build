"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Container, Plus, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainHeader } from "@/components/main-header"
import { useAppContext } from "@/contexts/AppContextProvider"
import { useApiToast } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getContexts, createContext, updateContext, deleteContext } from "@/lib/actions/contexts"
import { DEFAULT_CONTEXT } from "@/lib/context"

interface Context {
  id: number
  user_id: string
  name: string
  context: string
  created_at: string
}

export default function Contexts() {
  const { user, isLoading } = useAppContext()
  const { showResponseToast, showErrorToast } = useApiToast()
  const [contexts, setContexts] = useState<Context[]>([])
  const [isLoadingContexts, setIsLoadingContexts] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentContext, setCurrentContext] = useState<Context | null>(null)
  const [contextContent, setContextContent] = useState("")
  const [contextName, setContextName] = useState("")
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false)
  
  // Load contexts from the server
  const loadContexts = useCallback(async () => {
    if (!user?.id) {
      console.log("No user ID available, skipping context load")
      setIsLoadingContexts(false)
      return
    }
    
    console.log("Loading contexts for user:", user.id)
    setIsLoadingContexts(true)
    
    try {
      const result = await getContexts(user.id)
      console.log("Contexts result:", result) // Debug log
      
      if (!result.error) {
        setContexts(result.data || [])
        console.log("Contexts loaded successfully:", result.data?.length || 0, "items")
      } else {
        console.error("Error fetching contexts:", result.error)
        showErrorToast(new Error(result.error))
      }
    } catch (error) {
      console.error("Exception in loadContexts:", error)
      showErrorToast(error as Error)
    } finally {
      setIsLoadingContexts(false)
    }
  }, [user?.id])
  
  // Load contexts when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      loadContexts()
      setHasAttemptedLoad(true)
    } else if (!isLoading) {
      // If user is not loading and we don't have a user ID, set loading to false
      setIsLoadingContexts(false)
      setHasAttemptedLoad(true)
    }
  }, [user?.id, isLoading, loadContexts])
  
  // Open dialog for creating a new context
  const handleAddContext = () => {
    setCurrentContext(null)
    setContextContent(DEFAULT_CONTEXT)
    setContextName("")
    setIsDialogOpen(true)
  }
  
  // Open dialog for editing an existing context
  const handleEditContext = (context: Context) => {
    setCurrentContext(context)
    setContextContent(context.context)
    setContextName(context.name)
    setIsDialogOpen(true)
  }
  
  // Handle saving a context (create or update)
  const handleSaveContext = async () => {
    if (!user?.id || !contextContent.trim() || !contextName.trim()) return
    
    setIsSubmitting(true)
    try {
      let result
      
      if (currentContext) {
        // Update existing context
        result = await updateContext(currentContext.id, user.id, contextName, contextContent)
        if (!result.error) {
          showResponseToast({
            success: true,
            message: "Context updated successfully"
          })
        }
      } else {
        // Create new context
        result = await createContext(user.id, contextName, contextContent)
        if (!result.error) {
          showResponseToast({
            success: true,
            message: "Context created successfully"
          })
        }
      }
      
      if (result.error) {
        showErrorToast(new Error(result.error))
      } else {
        setIsDialogOpen(false)
        loadContexts()
      }
    } catch (error) {
      showErrorToast(error as Error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle deleting a context
  const handleDeleteContext = async (id: number) => {
    if (!user?.id || !window.confirm("Are you sure you want to delete this context?")) return
    
    try {
      const result = await deleteContext(id, user.id)
      
      if (!result.error) {
        showResponseToast({
          success: true,
          message: "Context deleted successfully"
        })
        loadContexts()
      } else {
        showErrorToast(new Error(result.error))
      }
    } catch (error) {
      showErrorToast(error as Error)
    }
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }
  
  // Truncate context for display in table
  const truncateContext = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader 
        breadcrumbs={[
          { label: "Contexts", active: true }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Contexts</h2>
            <p className="text-muted-foreground">Create and manage preaching contexts for your homilies</p>
          </div>
          <Button onClick={handleAddContext} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Context
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Container className="w-5 h-5 mr-2" />
              Your Contexts
            </CardTitle>
            <CardDescription>
              Define different preaching contexts to use when creating homilies
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingContexts && hasAttemptedLoad ? (
              <div className="text-center py-8 text-foreground">Loading contexts...</div>
            ) : !user ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Please log in to manage your contexts</p>
              </div>
            ) : contexts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven&apos;t created any contexts yet</p>
                <Button onClick={handleAddContext} variant="outline" className="flex items-center gap-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  Create Your First Context
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Context</TableHead>
                      <TableHead className="w-[200px]">Created</TableHead>
                      <TableHead className="text-right w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contexts.map((context) => (
                      <TableRow key={context.id}>
                        <TableCell className="font-medium">{context.name}</TableCell>
                        <TableCell>{truncateContext(context.context)}</TableCell>
                        <TableCell>{formatDate(context.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEditContext(context)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteContext(context.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog for creating/editing contexts */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentContext ? "Edit Context" : "Create New Context"}</DialogTitle>
            <DialogDescription>
              {currentContext 
                ? "Update your preaching context details below" 
                : "Define a new preaching context for your homilies"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="context-name" className="mb-0.5">Name</Label>
              <Input
                id="context-name"
                value={contextName}
                onChange={(e) => setContextName(e.target.value)}
                placeholder="Enter a name for this context"
                className="mb-4"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="context-content" className="mb-0.5">Context Details</Label>
              <Textarea
                id="context-content"
                value={contextContent}
                onChange={(e) => setContextContent(e.target.value)}
                placeholder="Describe your preaching context here..."
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleSaveContext}
              disabled={isSubmitting || !contextContent.trim() || !contextName.trim()}
              className="flex items-center gap-1"
            >
              {isSubmitting ? "Saving..." : "Save Context"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
