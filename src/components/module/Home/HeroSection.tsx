import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className='relative overflow-hidden bg-background'>
            <div className='container mx-auto px-4 py-20 text-center md:py-28'>
                {/* Badge */}
                <div className='mb-6 inline-flex items-center rounded-full border px-4 py-1 text-sm text-muted-foreground'>
                    ✨ Discover • Connect • Participate
                </div>

                {/* Heading */}
                <h1 className='mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl'>
                    Find people to{' '}
                    <span className='text-primary'>do things</span> with.
                </h1>

                {/* Subheading */}
                <p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
                    Social Spark helps you discover local events, activities,
                    and hobbies — even when you don’t have anyone to go with.
                </p>

                {/* CTA Buttons */}
                <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                    <Button size='lg' asChild>
                        <Link href='/events'>Find Activities</Link>
                    </Button>

                    <Button size='lg' variant='outline' asChild>
                        <Link href='/events/create'>Create Event</Link>
                    </Button>
                </div>

                {/* Stats / Trust indicators */}
                <div className='mt-14 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground'>
                    <div>
                        <span className='block text-xl font-semibold text-foreground'>
                            1,000+
                        </span>
                        Events hosted
                    </div>
                    <div>
                        <span className='block text-xl font-semibold text-foreground'>
                            5,000+
                        </span>
                        Participants
                    </div>
                    <div>
                        <span className='block text-xl font-semibold text-foreground'>
                            100+
                        </span>
                        Cities
                    </div>
                </div>
            </div>
        </section>
    );
}
