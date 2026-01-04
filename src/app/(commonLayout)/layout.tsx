import PublicNavbar from '@/components/shared/PublicNavbar';
import React from 'react';

export default function CommonLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <PublicNavbar />
            {children}
        </div>
    );
}
