import type * as React from "react"
import {
  BookOpen,
  LayoutDashboard,
  Calendar,
  SquarePlus,
} from "lucide-react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
// import { SidebarMenuItemsComponent } from "@/components/sidebar-menu-items-component"

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
                <a href={`/calendar`}>
                  <Calendar />
                  <span>Calendar</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* <SidebarMenuItemsComponent items={[{
              title: "Build a Homily",
              url: "#",
              icon: SquarePlus,
              isActive: true,
              items: [
                {
                  title: "Create",
                  url: "/create",
                },
                {
                  title: "Theme",
                  url: "/theme",
                },
                {
                  title: "Context",
                  url: "/context",
                },
                {
                  title: "Point Development",
                  url: "/point-development",
                },
                {
                  title: "Stories and Examples",
                  url: "/stories-and-examples",
                },
                {
                  title: "Review",
                  url: "/review",
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

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
