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
                    roles: ['USER', 'HOST', 'ADMIN'] as const,
                },
                {
                    title: 'My Profile',
                    href: `/my-profile`,
                    icon: 'User',
                    roles: ['USER', 'HOST', 'ADMIN'] as const,
                },
            ],
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Change Password',
                    href: '/change-password',
                    icon: 'Settings', // ✅ String
                    roles: ['USER'],
                },
            ],
        },
    ];
};

export const hostNavItems: NavSection[] = [
    {
        title: 'Host Management',
        items: [
            {
                title: 'Events',
                href: '/host/dashboard/events',
                icon: 'Calendar', // ✅ String
                badge: '3',
                roles: ['HOST'],
            },
            {
                title: 'Create Event',
                href: '/host/events/create',
                icon: 'Clock', // ✅ String
                roles: ['HOST'],
            },
        ],
    },
];

export const userNavItems: NavSection[] = [
    {
        title: 'Appointments',
        items: [
            {
                title: 'My Appointments',
                href: '/dashboard/my-appointments',
                icon: 'Calendar', // ✅ String
                roles: ['USER'],
            },
            {
                title: 'Book Appointment',
                href: '/consultation',
                icon: 'ClipboardList', // ✅ String
                roles: ['USER'],
            },
        ],
    },
    {
        title: 'Medical Records',
        items: [
            {
                title: 'My Prescriptions',
                href: '/dashboard/my-prescriptions',
                icon: 'FileText', // ✅ String
                roles: ['USER'],
            },
            {
                title: 'Health Records',
                href: '/dashboard/health-records',
                icon: 'Activity', // ✅ String
                roles: ['USER'],
            },
        ],
    },
];

export const adminNavItems: NavSection[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'Admins',
                href: '/admin/dashboard/admins-management',
                icon: 'Shield', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'HOSTs',
                href: '/admin/dashboard/HOSTs-management',
                icon: 'Stethoscope', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'USERs',
                href: '/admin/dashboard/USERs-management',
                icon: 'Users', // ✅ String
                roles: ['ADMIN'],
            },
        ],
    },
    {
        title: 'Hospital Management',
        items: [
            {
                title: 'Appointments',
                href: '/admin/dashboard/appointments-management',
                icon: 'Calendar', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Schedules',
                href: '/admin/dashboard/schedules-management',
                icon: 'Clock', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Specialities',
                href: '/admin/dashboard/specialities-management',
                icon: 'Hospital', // ✅ String
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
