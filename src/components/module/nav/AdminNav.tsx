import LogoutButton from '@/components/shared/LogoutButton';
import {NavigationMenuLink} from '@radix-ui/react-navigation-menu';
import React from 'react';

export default function AdminNav() {
    return (
        <>
            <NavigationMenuLink href='/admin/dashboard'>
                Dashboard
            </NavigationMenuLink>
            <NavigationMenuLink href='/admin/users'>Users</NavigationMenuLink>
            <NavigationMenuLink href='/admin/hosts'>Hosts</NavigationMenuLink>
            <NavigationMenuLink href='/admin/events'>Events</NavigationMenuLink>
            <NavigationMenuLink href='/profile/me'>Profile</NavigationMenuLink>
            <LogoutButton />
        </>
    );
}
