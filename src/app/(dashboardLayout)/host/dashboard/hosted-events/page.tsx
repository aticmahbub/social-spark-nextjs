// app/host/dashboard/events/page.tsx

import EventManagementHeader from '@/components/module/Host/event/EventManagementHeader';
import RefreshButton from '@/components/shared/RefreshButton';
import {TableSkeleton} from '@/components/shared/TableSkeleton';
import {Suspense} from 'react';
import EventTable from '@/components/module/Host/event/EventTable';
import {hostedEvents} from '@/services/host/eventManagement';

const HostedEventsPage = async () => {
    const result = await hostedEvents();
    console.log(result);

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
