"use client"

import Link from "next/link"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

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

interface HomiliesTableProps {
  homilies: Homily[]
  onDelete: (id: number) => void

}

export function HomiliesTable({ homilies, onDelete }: HomiliesTableProps) {

  const getDraftStatus = (homily: Homily) => {
    if (homily.final_draft) return { status: "Final", variant: "default" as const }
    if (homily.second_set_of_questions) return { status: "Second Set of Questions", variant: "secondary" as const }
    if (homily.first_set_of_questions) return { status: "First Set of Questions", variant: "outline" as const }
    return { status: "Not Started", variant: "destructive" as const }
  }

  const truncateText = (text: string | null, maxLength: number = 100) => {
    if (!text) return "—"
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {homilies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="text-muted-foreground">No homilies found</p>
                  <p className="text-sm text-muted-foreground">Create your first homily to get started</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            homilies.map((homily) => {
              const draftStatus = getDraftStatus(homily)
              return (
                <TableRow key={homily.id}>
                  <TableCell className="font-medium">
                    <div className="max-w-[200px]">
                      <p className="truncate">{homily.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <p className="text-sm text-muted-foreground">
                        {truncateText(homily.description)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={draftStatus.variant}>
                      {draftStatus.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(homily.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/homilies/${homily.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDelete(homily.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
