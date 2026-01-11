export const dynamic = 'force-dynamic';
import EventManagementHeader from '@/components/module/Host/EventManagement/EventManagementHeader';
import RefreshButton from '@/components/shared/RefreshButton';
import {TableSkeleton} from '@/components/shared/TableSkeleton';
import {Suspense} from 'react';
import EventTable from '@/components/module/Host/EventManagement/EventTable';
import {hostedEvents} from '@/services/host/eventManagement';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import {Event} from '@/types/event.types';

const HostedEventsPage = async () => {
    const result = await hostedEvents();

    return (
        <div>
            {' '}
            <div className='space-y-6'>
                <EventManagementHeader event={result.data} />
                <div className='flex spx2'>
                    <SearchFilter
                        paramName='search'
                        placeholder='Search events...'
                    />
                    <SelectFilter
                        paramName='event'
                        options={result.data.map((event: Event) => ({
                            label: event.name,
                            value: event.id,
                        }))}
                        placeholder='Filter by Event name'
                    />
                    <RefreshButton />
                </div>
                <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                    <EventTable events={result?.data} />
                </Suspense>
            </div>
        </div>
    );
};

export default HostedEventsPage;
