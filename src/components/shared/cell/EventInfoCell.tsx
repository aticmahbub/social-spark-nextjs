'use client';

import {Avatar} from '@/components/ui/avatar';
import {getInitials} from '@/utils/formatter';
import Image from 'next/image';

interface EventInfoCellProps {
    name: string;

    image?: string | null;
}

export function EventInfoCell({name, image}: EventInfoCellProps) {
    return (
        <div className='flex items-center gap-3'>
            <Avatar>
                {image ? (
                    <Image src={image} alt={name} width={40} height={40} />
                ) : (
                    <div className='flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold'>
                        {getInitials(name)}
                    </div>
                )}
            </Avatar>
            <div>
                <p className='font-medium'>{name}</p>
                {/* <p className='text-sm text-muted-foreground'>{email}</p> */}
            </div>
        </div>
    );
}
