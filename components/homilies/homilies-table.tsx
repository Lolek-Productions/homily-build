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
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {homilies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="text-muted-foreground">No homilies found</p>
                  <p className="text-sm text-muted-foreground">Create your first homily to get started</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            homilies.map((homily) => {
              return (
                <TableRow key={homily.id}>
                  <TableCell className="font-medium">
                    <Link href={`/homilies/${homily.id}`} className="block max-w-[200px] hover:underline cursor-pointer">
                      <p className="truncate">{homily.title}</p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/homilies/${homily.id}`} className="block max-w-[300px] hover:underline cursor-pointer">
                      <p className="text-sm text-muted-foreground">
                        {truncateText(homily.description)}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <Link href={`/homilies/${homily.id}`} className="hover:underline cursor-pointer">
                      {formatDistanceToNow(new Date(homily.created_at), { addSuffix: true })}
                    </Link>
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
