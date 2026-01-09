import {UserRole} from './user.types';
export interface NavItem {
    title: string;
    href: string;
    icon: string;
    badge?: string | number;
    description?: string;
    roles: readonly UserRole[];
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}
