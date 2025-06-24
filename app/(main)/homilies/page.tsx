"use client"

import { useState, useEffect } from "react"
import { Plus, Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MainHeader } from "@/components/main-header"
import { HomiliesTable } from "@/components/homilies/homilies-table"
import { useAppContext } from "@/contexts/AppContextProvider"
import { getHomilies, deleteHomily } from "@/lib/actions/homilies"
import { useApiToast } from "@/lib/utils"
import { useRouter } from "next/navigation"

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

interface PaginationData {
  data: Homily[]
  count: number
  totalPages: number
  currentPage: number
  error: string | null
}

export default function HomiliesPage() {
  const { user, isLoading: userLoading } = useAppContext()
  const { showResponseToast, showErrorToast } = useApiToast()
  const router = useRouter()

  // State management
  const [homilies, setHomilies] = useState<PaginationData>({
    data: [],
    count: 0,
    totalPages: 0,
    currentPage: 1,
    error: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Filter and pagination state
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Debug: Component mount/unmount
  useEffect(() => {
    console.log('🔄 HomiliesPage component MOUNTED')
    return () => {
      console.log('💀 HomiliesPage component UNMOUNTED')
    }
  }, [])

  // Debug: Track all state changes
  useEffect(() => {
    console.log('📊 State update - isLoading:', isLoading, 'homilies.data.length:', homilies.data?.length, 'user:', user?.id)
  }, [isLoading, homilies.data?.length, user?.id])

  // Debug: Component mount
  useEffect(() => {
    console.log('HomiliesPage component mounted, user:', user?.id, 'userLoading:', userLoading)
  }, [user?.id, userLoading])

  // Debug: Track user state changes specifically
  useEffect(() => {
    console.log('User state changed - user:', user?.id, 'userLoading:', userLoading)
  }, [user, userLoading])

  // Debug: Track homilies state changes
  useEffect(() => {
    console.log('Homilies state changed:', {
      dataLength: homilies.data?.length,
      count: homilies.count,
      error: homilies.error,
      isLoading: isLoading
    })
  }, [homilies, isLoading])

  // Load initial data when user is available
  useEffect(() => {
    console.log('🚀 useEffect triggered with deps:', { userId: user?.id, currentPage, pageSize, search, sortBy, sortOrder })
    const loadData = async () => {
      if (user?.id) {
        console.log('✅ Loading data for user:', user.id)
        setIsLoading(true)
        try {
          const result = await getHomilies(user.id, {
            page: currentPage,
            pageSize,
            search,
            sortBy,
            sortOrder
          })
          console.log('✅ Data loaded successfully:', result)
          setHomilies({...result})
        } catch (error) {
          console.log('❌ Error loading data:', error)
          setHomilies({
            data: [],
            count: 0,
            totalPages: 0,
            currentPage: 1,
            error: error instanceof Error ? error.message : 'Failed to load homilies'
          })
        } finally {
          setIsLoading(false)
        }
      } else {
        console.log('⏳ No user available yet, user:', user?.id)
      }
    }
    loadData()
  }, [user?.id, currentPage, pageSize, search, sortBy, sortOrder])

  // Load homilies function for manual refresh
  const loadHomilies = async () => {
    if (!user?.id || typeof user.id !== 'string' || user.id.trim() === '') {
      console.log('Cannot load homilies - invalid user ID:', user?.id)
      return
    }

    setIsLoading(true)
    try {
      console.log('Manual reload - Loading homilies for user ID:', user.id)

      const result = await getHomilies(user.id, {
        page: currentPage,
        pageSize,
        search,
        sortBy,
        sortOrder
      })

      console.log('Manual reload - getHomilies result:', result)
      setHomilies({...result})
      console.log('State update called with:', result)
      setTimeout(() => {
        console.log('After timeout - checking if state updated')
      }, 100)
    } catch (error) {
      console.error('Manual reload - Error loading homilies:', error)
      setHomilies({
        data: [],
        count: 0,
        totalPages: 0,
        currentPage: 1,
        error: error instanceof Error ? error.message : 'Failed to load homilies'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete homily
  const handleDeleteHomily = async (id: number) => {
    if (!user?.id || typeof user.id !== 'string' || user.id.trim() === '') {
      console.log('Cannot delete homily - invalid user ID:', user?.id)
      return
    }

    try {
      const result = await deleteHomily(id, user.id)
      
      if (result.error) {
        showResponseToast({ success: false, message: result.error })
      } else {
        showResponseToast({ success: true, message: "Homily deleted successfully" })
        await loadHomilies()
      }
    } catch (error) {
      showErrorToast(error as Error)
    } finally {
      setDeletingId(null)
    }
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle dialog actions
  const handleCreateNew = () => {
    // Navigate to the create page
    router.push('/homilies/create')
  }

  const handleDelete = (id: number) => {
    setDeletingId(id)
  }

  // Only show loading/login if we definitely don't have a user
  if (!user && !userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Please log in to view homilies.</div>
        </div>
      </div>
    )
  }

  // If we have a user, show the main content regardless of userLoading state
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Homilies", active: true }
        ]}
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Homilies</h1>
              <p className="text-sm text-gray-600">
                Manage your homily drafts and content ({homilies.count} total)
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={loadHomilies} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                New Homily
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search homilies by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Created Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="description">Description</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">Loading homilies...</div>
          </div>
        ) : homilies.error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading homilies</p>
              <p className="text-sm text-gray-600 mb-4">{homilies.error}</p>
              <Button onClick={loadHomilies} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <HomiliesTable
              homilies={homilies.data}
              onDelete={handleDelete}

            />

            {/* Pagination */}
            {homilies.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, homilies.count)} of {homilies.count} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.min(5, homilies.totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === homilies.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the homily and all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDeleteHomily(deletingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}