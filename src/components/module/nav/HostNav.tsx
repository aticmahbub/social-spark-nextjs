import LogoutButton from '@/components/shared/LogoutButton';
import {NavigationMenuLink} from '@radix-ui/react-navigation-menu';
import React from 'react';

export default function HostNav() {
    return (
        <>
            <NavigationMenuLink href='/events'>
                Explore Events
            </NavigationMenuLink>
            <NavigationMenuLink href='/host/events'>
                My Events
            </NavigationMenuLink>
            <NavigationMenuLink href='/events/create'>
                Create Event
            </NavigationMenuLink>
            <NavigationMenuLink href='/profile/me'>Profile</NavigationMenuLink>
            <LogoutButton />
        </>
    );
}
