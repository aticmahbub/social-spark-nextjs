'use client';

import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import siteIcon from '../../assets/icons/site-icon.png';
import Image from 'next/image';

/** TEMP: replace with real auth */
const role: 'PUBLIC' | 'USER' | 'HOST' | 'ADMIN' = 'PUBLIC';

export default function Navbar() {
    return (
        <header className='border-b bg-background'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                <Link
                    href='/'
                    className='text-xl font-bold flex items-center gap-2'
                >
                    <Image
                        height={40}
                        width={40}
                        src={siteIcon}
                        alt='Social Spark Logo'
                    />
                    Social<span className='text-primary'>Spark</span>
                </Link>

                {/* Navigation */}
                <NavigationMenu>
                    <NavigationMenuList className='flex items-center gap-6'>
                        {/* PUBLIC */}
                        {role === 'PUBLIC' && (
                            <>
                                <NavLink href='/events'>Explore Events</NavLink>
                                <NavLink href='/registration?role=host'>
                                    Become a Host
                                </NavLink>
                                <NavLink href='/login'>Login</NavLink>
                                <Button asChild>
                                    <Link href='/registration'>
                                        Registration
                                    </Link>
                                </Button>
                            </>
                        )}

                        {/* USER */}
                        {role === 'USER' && (
                            <>
                                <NavLink href='/events'>Explore Events</NavLink>
                                <NavLink href='/my-events'>My Events</NavLink>
                                <NavLink href='/profile/me'>Profile</NavLink>
                                <NavLink href='/logout'>Logout</NavLink>
                            </>
                        )}

                        {/* HOST */}
                        {role === 'HOST' && (
                            <>
                                <NavLink href='/events'>Explore Events</NavLink>
                                <NavLink href='/host/events'>My Events</NavLink>
                                <NavLink href='/events/create'>
                                    Create Event
                                </NavLink>
                                <NavLink href='/profile/me'>Profile</NavLink>
                                <NavLink href='/logout'>Logout</NavLink>
                            </>
                        )}

                        {/* ADMIN */}
                        {role === 'ADMIN' && (
                            <>
                                <NavLink href='/admin/dashboard'>
                                    Admin Dashboard
                                </NavLink>
                                <NavLink href='/admin/users'>
                                    Manage Users
                                </NavLink>
                                <NavLink href='/admin/hosts'>
                                    Manage Hosts
                                </NavLink>
                                <NavLink href='/admin/events'>
                                    Manage Events
                                </NavLink>
                                <NavLink href='/profile/me'>Profile</NavLink>
                                <NavLink href='/logout'>Logout</NavLink>
                            </>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}

/* ---------- Reusable Link ---------- */

function NavLink({href, children}: {href: string; children: React.ReactNode}) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn(
                        'text-sm font-medium text-muted-foreground hover:text-primary transition',
                    )}
                >
                    {children}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}
