import React from 'react';
import { Outlet } from '@tanstack/react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex justify-between h-16 p-4 shrink-0 items-center border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <Breadcrumbs />
          </div>

          <ThemeToggle
            className='group size-8 hover:[&>svg]:scale-120 hover:[&>svg]:transition-all'
            variant='ghost'
            size='icon'
          />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
