"use client"

import type * as React from "react"
import {
  BookOpen,
  LayoutDashboard,
  NotebookText,
  ScrollText,
  LibraryBig,
} from "lucide-react"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { useAppContext } from "@/contexts/AppContextProvider"
import { Button } from "@/components/ui/button" 
import { Settings } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppContext()

  return (
    <Sidebar collapsible="offcanvas" className="w-64" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center py-4 px-2">
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
      </SidebarHeader>
      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/dashboard`}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/definitions`}>
                <NotebookText />
                  <span>Definitions</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/homilies/create`}>
                <ScrollText />
                  <span>Build a Homily</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/homilies`}>
                  <LibraryBig />
                  <span>My Homilies</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* <SidebarMenuItemsComponent items={[{
              title: "Settings",
              url: "#",
              icon: Bot,
              isActive: true,
              items: [
                {
                  title: "Context",
                  url: "/settings/context",
                },
                {
                  title: "Prompts",
                  url: "/settings/prompts",
                },
              ],
            }]}/> */}

          </SidebarMenu>
        </SidebarGroup>


        <SidebarGroup>
          <SidebarGroupLabel>Collaborators</SidebarGroupLabel>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`https://www.magisterium.com/`} target="_blank">
                  <BookOpen />
                  <span>Magesterium AI</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`https://litcal.johnromanodorazio.com`} target="_blank">
                  <BookOpen />
                  <span>LitCal</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
