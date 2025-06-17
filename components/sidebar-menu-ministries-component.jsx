"use client"

import { useState } from 'react';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, Loader2, Church, Plus } from "lucide-react"
import { useAppContext } from '@/contexts/AppContextProvider';

export function SidebarMenuMinistriesComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ministries, setMinistries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedParish, isLoading: isSettingsLoading } = useAppContext();

  const fetchMinistries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Import the server action dynamically
      const { getMinistries } = await import('@/lib/actions/ministry');
      const { data, error } = await getMinistries();
      
      if (error) {
        throw new Error(error);
      }
      
      setMinistries(data || []);
    } catch (err) {
      console.error('Error fetching ministries:', err);
      setError('Failed to load ministries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = (open) => {
    setIsExpanded(open);
    if (open && ministries.length === 0 && !isLoading) {
      fetchMinistries();
    }
  };

  return (
    <Collapsible onOpenChange={handleExpand} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <Church />
            <span>Ministries</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {isLoading ? (
              <div className="flex justify-center p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : error ? (
              <div className="text-sm text-red-500 p-2">{error}</div>
            ) : ministries.length > 0 ? (
              ministries.map((ministry) => (
                <SidebarMenuSubItem key={`ministry-${ministry.id}`}>
                  <SidebarMenuSubButton asChild>
                    <a href={`/ministries/${ministry.id}`}>
                      <span>{ministry.name}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))
            ) : (
              <div key="no-ministries" className="text-sm text-muted-foreground p-2">
                No ministries found
              </div>
            )}
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <a href="/ministries/create" className="text-muted-foreground hover:text-foreground">
                  <Plus className="h-4 w-4 -mr-1" />
                  <span>Create Ministry</span>
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
    </Collapsible>
  );
}
