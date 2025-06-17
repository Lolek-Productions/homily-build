import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppProviderWrapper from "@/providers/AppProvider"

export default function MainLayout({
  children,
}) {
  return (
    <AppProviderWrapper>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AppProviderWrapper>
  )
}
