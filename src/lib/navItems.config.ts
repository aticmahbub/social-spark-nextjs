import {NavSection} from '@/types/dashboard.interface';
import {UserRole} from '@/types/user.types';
import {getDefaultDashboardRoute} from '@/utils/auth';

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: 'Dashboard',
                    href: defaultDashboard,
                    icon: 'LayoutDashboard',
                    roles: ['USER', 'HOST', 'ADMIN'],
                },
                {
                    title: 'My Profile',
                    href: `/profile/user`,
                    icon: 'User',
                    roles: ['USER', 'HOST', 'ADMIN'],
                },
            ],
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Change Password',
                    href: '/change-password',
                    icon: 'Settings',
                    roles: ['USER'],
                },
            ],
        },
    ];
};

export const userNavItems: NavSection[] = [
    {
        title: 'Events',
        items: [
            {
                title: 'Upcoming joined events',
                href: '/user/dashboard/joined-events',
                icon: 'Calendar',
                roles: ['USER'],
            },
            {
                title: 'Explore events',
                href: '/events',
                icon: 'ClipboardList',
                roles: ['USER'],
            },
            {
                title: 'Saved events',
                href: '/user/dashboard/saved-events',
                icon: 'ClipboardList',
                roles: ['USER'],
            },
            {
                title: 'Past events',
                href: '/user/dashboard/past-events',
                icon: 'ClipboardList',
                roles: ['USER'],
            },
        ],
    },
    // {
    //     title: 'Medical Records',
    //     items: [
    //         {
    //             title: 'My Prescriptions',
    //             href: '/dashboard/my-prescriptions',
    //             icon: 'FileText',
    //             roles: ['USER'],
    //         },
    //         {
    //             title: 'Health Records',
    //             href: '/dashboard/health-records',
    //             icon: 'Activity',
    //             roles: ['USER'],
    //         },
    //     ],
    // },
];

export const hostNavItems: NavSection[] = [
    {
        title: 'Host Management',
        items: [
            {
                title: 'Create Event',
                href: '/host/dashboard/events/create',
                icon: 'Clock',
                roles: ['HOST'],
            },
            {
                title: 'Manage events',
                href: '/host/dashboard/hosted-events',
                icon: 'Calendar',
                badge: '3',
                roles: ['HOST'],
            },
            {
                title: 'Participants management',
                href: '/host/dashboard/participants-management',
                icon: 'Calendar',
                badge: '',
                roles: ['HOST'],
            },
            {
                title: 'Revenue tracking',
                href: '/host/dashboard/revenue-tracking',
                icon: 'Calendar',
                badge: '',
                roles: ['HOST'],
            },
        ],
    },
];

export const adminNavItems: NavSection[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'User management',
                href: '/admin/dashboard/user-management',
                icon: 'Shield',
                roles: ['ADMIN'],
            },
            {
                title: 'Host management ',
                href: '/admin/dashboard/host-management',
                icon: 'Stethoscope',
                roles: ['ADMIN'],
            },
            {
                title: 'Event Management',
                href: '/admin/dashboard/event-management',
                icon: 'Users',
                roles: ['ADMIN'],
            },
        ],
    },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case 'ADMIN':
            return [...commonNavItems, ...adminNavItems];
        case 'HOST':
            return [...commonNavItems, ...hostNavItems];
        case 'USER':
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
};
