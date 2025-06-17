import type * as React from "react"
import {
  BookOpen,
  Calendar,
  Bot,
  LayoutDashboard,
} from "lucide-react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { SidebarMenuItemsComponent } from "@/components/sidebar-menu-items-component"
import { SidebarMenuMinistriesComponent } from "@/components/sidebar-menu-ministries-component"

const data = {
  teams: [
    {
      name: "St. Leo",
      plan: "Murray, KY",
    },
    {
      name: "St. Mary's",
      plan: "Murray, KY",
    },
    {
      name: "St. John's",
      plan: "Murray, KY",
    },
  ],
  

  projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" className="w-64" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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

            <SidebarMenuItemsComponent items={[{
              title: "Calendar",
              url: "#",
              icon: Calendar,
              isActive: true,
              items: [
                {
                  title: "Yearly",
                  url: "/yearly",
                },
                {
                  title: "Monthly",
                  url: "/monthly",
                },
                {
                  title: "Weekly",
                  url: "/weekly",
                },
                {
                  title: "Daily",
                  url: "/daily",
                },
              ],
            }]}/>
            <SidebarMenuItemsComponent items={[{
              title: "Resources",
              url: "#",
              icon: Bot,
              items: [
                {
                  title: "People",
                  url: "/people",
                },
                {
                  title: "Locations",
                  url: "/locations",
                },
                {
                  title: "Groups",
                  url: "/groups",
                },
              ],
            }]}/>
            <SidebarMenuMinistriesComponent/>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/training`}>
                  <BookOpen />
                  <span>Training</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/onboarding`}>
                  <BookOpen />
                  <span>Onboarding</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
