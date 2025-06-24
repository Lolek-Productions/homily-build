"use client"

import type * as React from "react"
import {
  BookOpen,
  LayoutDashboard,
  Calendar,
  SquarePlus,
  Bot,
} from "lucide-react"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { useAppContext } from "@/contexts/AppContextProvider"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppContext()

  return (
    <Sidebar collapsible="offcanvas" className="w-64" {...props}>
      <SidebarHeader>
        <div className="flex flex-col gap-1 p-2">
          <div className="text-sm font-semibold">{user?.email}</div>
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
                  <SquarePlus />
                  <span>Definitions</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/create`}>
                  <SquarePlus />
                  <span>Build a Homily</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/homilies`}>
                  <SquarePlus />
                  <span>Homilies</span>
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
