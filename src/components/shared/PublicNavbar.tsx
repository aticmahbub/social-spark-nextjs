import Link from 'next/link';
import Image from 'next/image';
import {
    NavigationMenu,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import siteIcon from '../../assets/icons/site-icon.png';
import PublicNav from '../module/nav/PublicNav';
import UserNav from '../module/nav/UserNav';
import HostNav from '../module/nav/HostNav';
import AdminNav from '../module/nav/AdminNav';
import {getUserFromToken} from '@/utils/getUserFromToken';
import {UserRole} from '@/types/user.types';

export default async function Navbar() {
    const user = await getUserFromToken();
    const userRole: UserRole = user ? user.role : 'PUBLIC';

    console.log('user:', user);

    return (
        <header className='border-b bg-background'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                {/* Logo */}
                <Link
                    href='/'
                    className='flex items-center gap-2 text-xl font-bold'
                >
                    <Image
                        src={siteIcon}
                        alt='Social Spark Logo'
                        width={40}
                        height={40}
                    />
                    Social<span className='text-primary'>Spark</span>
                </Link>

                {/* Navigation */}
                <NavigationMenu>
                    <NavigationMenuList className='flex items-center gap-6'>
                        {userRole === 'PUBLIC' && <PublicNav />}
                        {userRole === 'USER' && <UserNav />}
                        {userRole === 'HOST' && <HostNav />}
                        {userRole === 'ADMIN' && <AdminNav />}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}
