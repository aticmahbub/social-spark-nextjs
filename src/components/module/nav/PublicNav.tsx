import {Button} from '@/components/ui/button';
import {NavigationMenuLink} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

export default function PublicNav() {
    return (
        <>
            <NavigationMenuLink href='/events'>
                Explore Events
            </NavigationMenuLink>
            <NavigationMenuLink href='/registration?role=host'>
                Become a Host
            </NavigationMenuLink>
            <NavigationMenuLink href='/login'>Login</NavigationMenuLink>
            <Button asChild>
                <Link href='/registration'>Register</Link>
            </Button>
        </>
    );
}
