'use client';

import {formatDateTime} from '@/utils/formatter';

interface DateCellProps {
    date?: string | Date;
}

export function DateCell({date}: DateCellProps) {
    return <span className='text-sm'>{formatDateTime(date!)}</span>;
}
