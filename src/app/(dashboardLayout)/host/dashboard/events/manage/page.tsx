import EventManagementHeader from '@/components/module/Host/event/EventManagementHeader';
import EventTable from '@/components/module/Host/event/EventTable';
import RefreshButton from '@/components/shared/RefreshButton';
import {TableSkeleton} from '@/components/shared/TableSkeleton';
import {hostedEvents} from '@/services/host/eventManagement';
import React, {Suspense} from 'react';

export default async function EventManagementPage() {
    const result = await hostedEvents();

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
}
