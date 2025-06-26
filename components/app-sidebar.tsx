"use client"

import type * as React from "react"
import Link from "next/link"
import {
  BookOpen,
  LayoutDashboard,
  NotebookText,
  ScrollText,
  LibraryBig,
  Mail,
  Container
} from "lucide-react"
import Image from "next/image"
import { NavUser } from "@/components/nav-user"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" className="w-64" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center py-4 px-2">
          <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <Image 
                src="/homily-build-logo.svg" 
                alt="Homily.build Logo" 
                width={40} 
                height={40} 
                priority
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-sidebar-foreground">Homily.build</h1>
              <p className="text-xs text-sidebar-foreground/60 hidden sm:block">Catholic Preaching Platform</p>
            </div>
          </Link>
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
                <a href={`/contexts`}>
                  <Container />
                  <span>Contexts</span>
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

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/contact-us`}>
                  <Mail />
                  <span>Contact Us</span>
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
        <div className="flex items-center justify-between px-4 py-2">
          <NavUser />
          <ThemeSwitcher />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
