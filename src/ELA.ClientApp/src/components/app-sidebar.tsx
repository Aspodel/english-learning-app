import * as React from 'react';
import {
  BadgeCheckIcon,
  BellIcon,
  BrainIcon,
  CloudyIcon,
  CreditCardIcon,
  FlameIcon,
  FolderIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  SendIcon,
  SettingsIcon,
  SparklesIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSignOut } from '@/api/auth';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const logout = useSignOut;

  const handleLogout = () => {
    logout();
    navigate({
      to: '/signin',
      search: { redirectTo: undefined },
    });
  };

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
              className='hover:bg-transparent'
            >
              <Link to='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-md'>
                  <FlameIcon
                    className='size-8 text-primary'
                    fill='currentColor'
                  />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate text-base text-primary font-semibold'>
                    ELA
                  </span>
                  <span className='truncate'>Modern learning platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className='
                        data-[active=true]:bg-primary
                        data-[active=true]:text-primary-foreground
                        data-[active=true]:hover:bg-primary/90
                        data-[active=true]:active:bg-primary/90
                      '
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className='mt-auto'>
          <SidebarGroupContent>
            <SidebarMenu>
              {navSecondary.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className='
                        data-[active=true]:bg-primary
                        data-[active=true]:text-primary-foreground
                        data-[active=true]:hover:bg-primary/90
                        data-[active=true]:active:bg-primary/90
                      '
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <Avatar className='h-8 w-8 rounded-md'>
                    <AvatarImage src={''} alt={''} />
                    <AvatarFallback className='rounded-md'>CN</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>{'Aspodel'}</span>
                    <span className='truncate text-sm'>
                      {'aspodel@example.com'}
                    </span>
                  </div>
                  <MoreVerticalIcon className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side={isMobile ? 'bottom' : 'right'}
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 rounded-md'>
                      <AvatarImage src={''} alt={''} />
                      <AvatarFallback className='rounded-md'>CN</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-medium'>{'Aspodel'}</span>
                      <span className='truncate text-sm'>
                        {'aspodel@example.com'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <SparklesIcon />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const menuItems = [
  {
    title: 'Dashboard',
    url: '/app/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Vocabulary',
    url: '/app/vocabulary',
    icon: CloudyIcon,
  },
  {
    title: 'Flashcard',
    url: '/app/flashcard',
    icon: FolderIcon,
  },
  {
    title: 'Quiz',
    url: '/app/quiz',
    icon: BrainIcon,
  },
];

const navSecondary = [
  {
    title: 'Feedback',
    url: '/app/feedback',
    icon: SendIcon,
  },
  {
    title: 'Settings',
    url: '/app/settings',
    icon: SettingsIcon,
  },
];
