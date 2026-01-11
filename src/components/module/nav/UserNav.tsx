import LogoutButton from '@/components/shared/LogoutButton';
import {NavigationMenuLink} from '@radix-ui/react-navigation-menu';
import React from 'react';

export default function UserNav() {
    return (
        <>
            <NavigationMenuLink href='/events'>
                Explore Events
            </NavigationMenuLink>
            <NavigationMenuLink href='/my-events'>My Events</NavigationMenuLink>
            <NavigationMenuLink href='/profile/me'>Profile</NavigationMenuLink>
            <LogoutButton />
        </>
    );
}
