import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Github, Twitter, Linkedin} from 'lucide-react';

export default function PublicFooter() {
    return (
        <footer className='border-t bg-background'>
            <div className='container mx-auto px-4 py-16'>
                <div className='grid gap-12 md:grid-cols-4'>
                    {/* Brand */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold'>
                            Social<span className='text-primary'>Spark</span>
                        </h3>
                        <p className='max-w-xs text-sm text-muted-foreground'>
                            Discover local activities, meet like-minded people,
                            and spark real-world connections.
                        </p>
                    </div>

                    {/* Product */}
                    <div className='space-y-3'>
                        <h4 className='font-semibold'>Product</h4>
                        <ul className='space-y-2 text-sm text-muted-foreground'>
                            <li>
                                <Link
                                    href='/events'
                                    className='hover:text-primary'
                                >
                                    Explore Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/events/create'
                                    className='hover:text-primary'
                                >
                                    Create Event
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/categories'
                                    className='hover:text-primary'
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/hosts'
                                    className='hover:text-primary'
                                >
                                    Top Hosts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className='space-y-3'>
                        <h4 className='font-semibold'>Company</h4>
                        <ul className='space-y-2 text-sm text-muted-foreground'>
                            <li>
                                <Link
                                    href='/about'
                                    className='hover:text-primary'
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/how-it-works'
                                    className='hover:text-primary'
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className='hover:text-primary'
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/privacy'
                                    className='hover:text-primary'
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className='space-y-4'>
                        <h4 className='font-semibold'>Get Started</h4>
                        <p className='text-sm text-muted-foreground'>
                            Join activities near you or host your own event
                            today.
                        </p>
                        <div className='flex gap-2'>
                            <Button size='sm'>Find Events</Button>
                            <Button size='sm' variant='outline'>
                                Create Event
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className='my-10' />

                {/* Bottom */}
                <div className='flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row'>
                    <span>
                        © {new Date().getFullYear()} Social Spark. All rights
                        reserved.
                    </span>
                    <div className='flex items-center gap-4'>
                        <Link href='#' className='hover:text-primary'>
                            <Github className='h-4 w-4' />
                        </Link>
                        <Link href='#' className='hover:text-primary'>
                            <Twitter className='h-4 w-4' />
                        </Link>
                        <Link href='#' className='hover:text-primary'>
                            <Linkedin className='h-4 w-4' />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
