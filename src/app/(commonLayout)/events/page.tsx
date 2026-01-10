'use server';

import {Suspense} from 'react';
import AllEventsContent from './module/AllEventsContent';

export default async function AllEvents() {
    return (
        <Suspense
            fallback={
                <div className='container mx-auto px-4 py-8'>
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                    </div>
                </div>
            }
        >
            <AllEventsContent />
        </Suspense>
    );
}
