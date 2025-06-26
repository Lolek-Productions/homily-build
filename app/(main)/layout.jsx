import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
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
            <Toaster />
          </main>
        </div>
      </SidebarProvider>
    </AppProviderWrapper>
  )
}
