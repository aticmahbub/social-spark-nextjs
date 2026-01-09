// app/host/dashboard/events/page.tsx

import EventManagementHeader from '@/components/module/Host/event/EventManagementHeader';
import RefreshButton from '@/components/shared/RefreshButton';
import {TableSkeleton} from '@/components/shared/TableSkeleton';
import {Suspense} from 'react';
import EventTable from '@/components/module/Host/event/EventTable';
import {hostedEvents} from '@/services/host/eventManagement';
// Force dynamic rendering since we're using cookies
export const dynamic = 'force-dynamic';
const HostedEventsPage = async () => {
    let token;
    const result = await hostedEvents(token);

    return (
        <div>
            {' '}
            <div className='space-y-6'>
                <EventManagementHeader />
                <div className='flex'>
                    <RefreshButton />
                </div>
                <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                    <EventTable events={result?.data} />
                </Suspense>
            </div>
        </div>
    );
};

export default HostedEventsPage;
