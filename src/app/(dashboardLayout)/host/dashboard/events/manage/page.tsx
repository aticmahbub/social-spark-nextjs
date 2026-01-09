// /src/app/(dashboardLayout)/admin/dashboard/event-management/page.tsx
import EventManagementHeader from '@/components/module/Host/event/EventManagementHeader';
import EventTable from '@/components/module/Host/event/EventTable';
import RefreshButton from '@/components/shared/RefreshButton';
import {TableSkeleton} from '@/components/shared/TableSkeleton';
import {hostedEvents} from '@/services/host/eventManagement';
import {cookies} from 'next/headers';
import React, {Suspense} from 'react';

// Force dynamic rendering since we're using cookies
export const dynamic = 'force-dynamic';

export default async function EventManagementPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const result = await hostedEvents(accessToken);

    return (
        <div className='space-y-6'>
            <EventManagementHeader />
            <div className='flex'>
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <EventTable events={result?.data} />
            </Suspense>
        </div>
    );
}
