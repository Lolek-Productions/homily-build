import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

interface MainHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  showSidebarTrigger?: boolean;
}

/**
 * MainHeader displays the main page header with breadcrumbs.
 * @param {MainHeaderProps} props - Component props
 * @param {BreadcrumbItem[]} [props.breadcrumbs=[]] - Array of breadcrumb items
 * @param {boolean} [props.showSidebarTrigger=false] - Whether to show the sidebar trigger
 * @returns {JSX.Element}
 */
export function MainHeader({ 
  breadcrumbs = [],
  showSidebarTrigger = true
}: MainHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        {showSidebarTrigger && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className={!item.href ? 'hidden md:block' : ''}>
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
            
            {breadcrumbs.length === 0 && (
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
