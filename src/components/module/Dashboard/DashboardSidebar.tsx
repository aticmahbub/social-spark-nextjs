import {getUserInfo} from '@/services/auth/getUserInfo';
import {NavSection} from '@/types/dashboard.interface';
import DashboardSidebarContent from './DashboardSidebarContent';
import {UserInfo} from '@/types/user.types';
import {getNavItemsByRole} from '@/lib/navItems.config';
import {getDefaultDashboardRoute} from '@/utils/auth';

const DashboardSidebar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;

    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;
