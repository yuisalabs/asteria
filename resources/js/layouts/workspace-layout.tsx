import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@/components/ui/menu';
import { 
    Sidebar, 
    SidebarContent, 
    SidebarGroup, 
    SidebarGroupTitle, 
    SidebarHeader, 
    SidebarItem, 
    SidebarItemButton, 
    SidebarList, 
    SidebarMenu 
} from '@/components/ui/sidebar';
import { getInitials } from '@/utils/initials';
import { Link, usePage } from '@inertiajs/react';
import { 
    Command, 
    CommandBody, 
    CommandContent, 
    CommandTrigger,
    CommandFooter, 
    CommandFooterItem, 
    CommandFooterText
} from '@/components/ui/command';
import { 
    Autocomplete, 
    AutocompleteInput, 
    AutocompleteList, 
    AutocompleteGroup, 
    AutocompleteGroupLabel, 
    AutocompleteItem
} from '@/components/ui/autocomplete';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { useOs } from '@/hooks/use-os';
import { 
    LucideBell,
    LucideBookText,
    LucideCalculator,
    LucideCalendar,
    LucideChevronsUpDown,
    LucideCreditCard,
    LucideFolderKanban,
    LucideHome,
    LucideHouse,
    LucideLogOut, 
    LucidePanelLeftClose,
    LucidePanelLeftOpen,
    LucideSearch,
    LucideSettings,
    LucideSmile,
    LucideUser,
    LucideUserRound,
    LucideUsersRound
} from 'lucide-react';
import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlashMessages } from '@/components/flash-messages';
import { cn } from '@/utils/cn';
import { Breadcrumb, BreadcrumbButton, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export interface BreadcrumbItemType {
    label: string;
    href?: string;
}

export default function AuthenticatedLayout({
    header,
    breadcrumbs,
    children,
}: PropsWithChildren<{ header?: ReactNode; breadcrumbs?: BreadcrumbItemType[] }>) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [commandOpen, setCommandOpen] = useState(false);
    const os = useOs();

    useEffect(() => {
        const windowResize = () => {
            setSidebarOpen(window.innerWidth >= 1280);
        }
        window.addEventListener('resize', windowResize);
        windowResize();

        return () => {
            window.removeEventListener('resize', windowResize);
        }
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            <FlashMessages />

            {/* Mobile Sidebar Backdrop */}
            <div
                className={cn(
                    'fixed inset-0 bg-black backdrop-blur-sm z-30 transition-all max-lg:block hidden',
                    sidebarOpen ? 'opacity-40 visible' : 'opacity-0 invisible',
                )}
                onClick={handleSidebarToggle}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed top-0 z-40 w-full max-w-72 md:w-72 h-dvh transition-all',
                    sidebarOpen ? 'left-0' : '-left-full',
                )}
            >
                <Sidebar
                    size="loose"
                    className="h-full bg-card border-r border-border flex flex-col"
                >
                    <SidebarHeader>
                        <Menu>
                            <MenuTrigger
                                data-slot="sidebar-item-button"
                                nativeButton={false}
                                render={
                                    <SidebarItemButton>
                                        <Avatar size="sm">
                                            <AvatarImage src="https://www.gravatar.com/avatar/c22d38582ca23fa7ccfddb87b5334b03?s=200&d=mp" />
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                            <AvatarIndicator className="bg-green-500 outline outline-background" />
                                        </Avatar>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="font-medium truncate">{user.name}</span>
                                            <span className="text-sm text-muted truncate">{user.email}</span>
                                        </div>
                                        <LucideChevronsUpDown className="ml-auto shrink-0" />
                                    </SidebarItemButton>
                                }
                            />
                            <MenuPopup className="w-(--anchor-width)" side="top">
                                <MenuItem render={
                                    <Button
                                        nativeButton={false}
                                        variant="plain"
                                        render={
                                            <Link
                                                className='justify-start'
                                                href={route('welcome')}
                                                rel="noopener noreferrer"
                                            />
                                        }>
                                        <LucideHouse/>
                                        {t('navigation.workspace')}
                                    </Button>
                                }/>
                                <MenuItem render={
                                    <Button
                                        nativeButton={false}
                                        variant="plain"
                                        render={
                                            <Link
                                                className='justify-start'
                                                href={route('profile.edit')}
                                            />
                                        }>
                                        <LucideUserRound />
                                        {t('navigation.profile')}
                                    </Button>
                                }/>
                                <MenuSeparator />
                                <MenuItem render={
                                    <Button
                                        nativeButton
                                        variant="plain"
                                        render={
                                            <Link
                                                className='justify-start w-full'
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            />
                                        }>
                                        <LucideLogOut/>
                                        {t('common.logout')}
                                    </Button>
                                }/>
                            </MenuPopup>
                        </Menu>
                    </SidebarHeader>

                    <SidebarContent className="flex-1">
                        <SidebarMenu>
                            <Command open={commandOpen} onOpenChange={setCommandOpen}>
                                <CommandTrigger
                                    render={
                                        <Button variant="secondary" size="md">
                                            <LucideSearch/>
                                            <span className='mr-auto'>Search everything...</span>
                                            <Kbd className='-mr-1.5'>
                                                {os === 'mac' ? '⌘' : 'Ctrl'} K
                                            </Kbd>
                                        </Button>
                                    }
                                />
                                <CommandContent>
                                    <Autocomplete>
                                        <CommandBody>
                                            <div data-slot="input-group" className="flex items-center px-3 border-b border-border">
                                                <LucideSearch className="mr-2 size-4 shrink-0 opacity-50" />
                                                <AutocompleteInput
                                                    variant="plain"
                                                    placeholder="Type a command or search..."
                                                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ring-0 hover:ring-0 focus:ring-0 px-0 shadow-none hover:bg-transparent"
                                                />
                                            </div>
                                            <AutocompleteList>
                                                {/* <AutocompleteEmpty className="py-6 text-center text-sm">
                                                    No results found.
                                                </AutocompleteEmpty> */}
                                                <AutocompleteGroup>
                                                    <AutocompleteGroupLabel>Suggestions</AutocompleteGroupLabel>
                                                    <AutocompleteItem>
                                                        <LucideCalendar className="mr-2 size-4" />
                                                        <span>Calendar</span>
                                                    </AutocompleteItem>
                                                    <AutocompleteItem>
                                                        <LucideSmile className="mr-2 size-4" />
                                                        <span>Search Emoji</span>
                                                    </AutocompleteItem>
                                                    <AutocompleteItem>
                                                        <LucideCalculator className="mr-2 size-4" />
                                                        <span>Calculator</span>
                                                    </AutocompleteItem>
                                                </AutocompleteGroup>
                                                <AutocompleteGroup>
                                                    <AutocompleteGroupLabel>Settings</AutocompleteGroupLabel>
                                                    <AutocompleteItem>
                                                        <LucideUser className="mr-2 size-4" />
                                                        <span>Profile</span>
                                                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘P</span>
                                                    </AutocompleteItem>
                                                    <AutocompleteItem>
                                                        <LucideCreditCard className="mr-2 size-4" />
                                                        <span>Billing</span>
                                                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
                                                    </AutocompleteItem>
                                                    <AutocompleteItem>
                                                        <LucideSettings className="mr-2 size-4" />
                                                        <span>Settings</span>
                                                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘S</span>
                                                    </AutocompleteItem>
                                                </AutocompleteGroup>
                                            </AutocompleteList>
                                        </CommandBody>
                                        <CommandFooter>
                                            <CommandFooterItem>
                                                <Kbd>↵</Kbd>
                                                <CommandFooterText>Select Item</CommandFooterText>
                                            </CommandFooterItem>
                                            <CommandFooterItem>
                                                <KbdGroup>
                                                    <Kbd>↑</Kbd>
                                                    <Kbd>↓</Kbd>
                                                </KbdGroup>
                                                <CommandFooterText>Navigate</CommandFooterText>
                                            </CommandFooterItem>
                                        </CommandFooter>
                                    </Autocomplete>
                                </CommandContent>
                            </Command>
                            <SidebarGroup>
                                <SidebarGroupTitle>Main Navigation</SidebarGroupTitle>
                                <SidebarList>
                                    <SidebarItem>
                                        <SidebarItemButton
                                            active={route().current('workspace.*')}
                                            render={
                                                <Link
                                                    href={route('workspace.index')}
                                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                                />
                                            }
                                        >
                                            <LucideHome />
                                            Home
                                        </SidebarItemButton>
                                    </SidebarItem>
                                    <SidebarItem>
                                        <SidebarItemButton
                                            active={route().current('dashboard')}
                                            render={
                                                <Link
                                                    href={route('dashboard')}
                                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                                />
                                            }
                                        >
                                            <LucideFolderKanban />
                                            Project
                                        </SidebarItemButton>
                                    </SidebarItem>
                                    <SidebarItem>
                                        <SidebarItemButton
                                            active={route().current('dashboard')}
                                            render={
                                                <Link
                                                    href={route('dashboard')}
                                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                                />
                                            }
                                        >
                                            <LucideUsersRound />
                                            Member
                                        </SidebarItemButton>
                                    </SidebarItem>
                                    <SidebarItem>
                                        <SidebarItemButton
                                            active={route().current('dashboard')}
                                            render={
                                                <Link
                                                    href={route('dashboard')}
                                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                                />
                                            }
                                        >
                                            <LucideBell />
                                            Notification
                                        </SidebarItemButton>
                                    </SidebarItem>
                                    <SidebarItem>
                                        <SidebarItemButton
                                            active={route().current('dashboard')}
                                            render={
                                                <Link
                                                    href={route('dashboard')}
                                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                                />
                                            }
                                        >
                                            <LucideBookText />
                                            Wiki
                                        </SidebarItemButton>
                                    </SidebarItem>
                                    <SidebarItem>
                                        <SidebarItemButton
                                            active={route().current('dashboard')}
                                            render={
                                                <Link
                                                    href={route('dashboard')}
                                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                                />
                                            }
                                        >
                                            <LucideSettings />
                                            Settings
                                        </SidebarItemButton>
                                    </SidebarItem>
                                </SidebarList>
                            </SidebarGroup>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </div>

            {/* Main Content */}
            <main className={cn('transition-all lg:ml-72', !sidebarOpen && 'lg:ml-0')}>
                {/* Top Navigation Bar */}
                <nav className={cn(
                    'h-16 flex items-center gap-2.5 border-b border-border bg-card px-2 max-lg:px-4',
                    sidebarOpen ? 'xl:pr-4' : 'xl:px-4',
                )}>
                    <Button
                        variant="plain"
                        size="sm-icon"
                        onClick={handleSidebarToggle}
                    >
                        {sidebarOpen ? <LucidePanelLeftClose className="size-5" /> : <LucidePanelLeftOpen className="size-5" />}
                    </Button>
                    {header && (
                        <>{header}</>
                    )}
                    <div className="ml-auto flex items-center gap-1">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Page Content */}
                <div className="min-h-[calc(100vh-4rem)] flex flex-col">  
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className="border-b border-border bg-card px-4 py-3">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((item, index) => {
                                        const isLast = index === breadcrumbs.length - 1;
                                        return (
                                            <React.Fragment key={index}>
                                                <BreadcrumbItem>
                                                    {item.href && !isLast ? (
                                                        <BreadcrumbButton
                                                            render={<Link href={item.href} />}
                                                        >
                                                            {item.label}
                                                        </BreadcrumbButton>
                                                    ) : (
                                                        <BreadcrumbButton active={isLast}>
                                                            {item.label}
                                                        </BreadcrumbButton>
                                                    )}
                                                </BreadcrumbItem>
                                                {!isLast && <BreadcrumbSeparator />}
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    )}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
}
