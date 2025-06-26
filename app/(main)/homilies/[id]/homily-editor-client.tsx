"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useAppContext } from "@/contexts/AppContextProvider"
import { getHomily } from "@/lib/actions/homilies"
import { useApiToast } from "@/lib/utils"
import { MainHeader } from "@/components/main-header"
import HomilyWizard from "@/components/homily-wizard"
import { Loader } from "lucide-react"

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
  }, [user?.id, homilyId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader 
          breadcrumbs={[
            { label: "Homilies", href: "/homilies" },
            { label: "Loading..." }
          ]}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading homily...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!homily) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader 
          breadcrumbs={[
            { label: "Homilies", href: "/homilies" },
            { label: "Error" }
          ]}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-destructive mb-4">Failed to load homily</p>
            <Link href="/homilies" className="text-primary hover:underline">
              Return to Homilies
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader 
        breadcrumbs={[
          { label: "Homilies", href: "/homilies" },
          { label: homily.title || "Edit Homily" }
        ]}
      />

      <HomilyWizard homily={homily} />
    </div>
  )
}
