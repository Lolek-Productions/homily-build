"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useAppContext } from "@/contexts/AppContextProvider"
import { getHomily } from "@/lib/actions/homilies"
import { useApiToast } from "@/lib/utils"
import { MainHeader } from "@/components/main-header"
import HomilyWizard from "@/components/homily-wizard"
import { BookOpen, Loader } from "lucide-react"

interface Homily {
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

interface HomilyEditorClientProps {
  homilyId: string
}

export default function HomilyEditorClient({ homilyId }: HomilyEditorClientProps) {
  const { user } = useAppContext()
  const { showErrorToast } = useApiToast()
  const [homily, setHomily] = useState<Homily | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHomily = async () => {
      if (!user?.id || !homilyId) {
        setIsLoading(false)
        return
      }

      try {
        const result = await getHomily(homilyId, user.id)
        if (result.error) {
          showErrorToast(new Error(result.error))
        } else {
          setHomily(result.data)
        }
      } catch (error) {
        showErrorToast(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHomily()
  }, [user?.id, homilyId, showErrorToast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <MainHeader 
          breadcrumbs={[
            { label: "Homilies", href: "/homilies" },
            { label: "Loading..." }
          ]}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading homily...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!homily) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <MainHeader 
          breadcrumbs={[
            { label: "Homilies", href: "/homilies" },
            { label: "Error" }
          ]}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load homily</p>
            <Link href="/homilies" className="text-blue-600 hover:underline">
              Return to Homilies
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainHeader 
        breadcrumbs={[
          { label: "Homilies", href: "/homilies" },
          { label: homily.title || "Edit Homily" }
        ]}
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Homily.Build</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Catholic Preaching Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <HomilyWizard homily={homily} />
    </div>
  )
}
