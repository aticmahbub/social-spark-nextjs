'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {Star, MapPin, Users, Calendar, Sparkles} from 'lucide-react';

export default function BodySection() {
    return (
        <main className='flex flex-col'>
            {/* 1. Hero Section */}
            <section className='container mx-auto grid min-h-[80vh] grid-cols-1 items-center gap-12 py-24 md:grid-cols-2'>
                <div className='space-y-6'>
                    <Badge variant='secondary' className='w-fit'>
                        <Sparkles className='mr-1 h-3 w-3' /> Social Spark
                    </Badge>
                    <h1 className='text-4xl font-bold leading-tight md:text-6xl'>
                        Find activities.
                        <br /> Meet people.
                        <br /> Spark real connections.
                    </h1>
                    <p className='max-w-xl text-lg text-muted-foreground'>
                        Social Spark helps you discover local events or create
                        your own — so you never have to enjoy your hobbies
                        alone.
                    </p>
                    <div className='flex gap-4'>
                        <Button size='lg'>Find Activities</Button>
                        <Button size='lg' variant='outline'>
                            Create Event
                        </Button>
                    </div>
                </div>
                <div className='h-[420px] rounded-2xl bg-gradient-to-br from-primary/30 via-muted to-background' />
            </section>

            <Separator />

            {/* 2. How It Works */}
            <section className='container mx-auto py-24'>
                <h2 className='mb-12 text-center text-3xl font-bold'>
                    How It Works
                </h2>
                <div className='grid gap-6 md:grid-cols-3'>
                    {[
                        {
                            step: '01',
                            title: 'Discover',
                            desc: 'Find events and activities happening near you.',
                        },
                        {
                            step: '02',
                            title: 'Join or Host',
                            desc: 'Join an event or create one in minutes.',
                        },
                        {
                            step: '03',
                            title: 'Connect',
                            desc: 'Meet people and build real-world connections.',
                        },
                    ].map((item) => (
                        <Card key={item.step}>
                            <CardHeader>
                                <Badge variant='outline' className='mb-2 w-fit'>
                                    {item.step}
                                </Badge>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className='text-muted-foreground'>
                                {item.desc}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 3. Upcoming Events Near You */}
            <section className='container mx-auto py-24'>
                <div className='mb-8 flex items-center justify-between'>
                    <h2 className='text-3xl font-bold'>Upcoming Near You</h2>
                    <Button variant='ghost'>View all</Button>
                </div>
                <div className='grid gap-6 md:grid-cols-3'>
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle>Weekend Hiking</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-3 text-sm text-muted-foreground'>
                                <div className='flex items-center gap-2'>
                                    <MapPin size={16} /> Dhaka
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Calendar size={16} /> This Saturday
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Users size={16} /> 12 participants
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 4. Popular Categories */}
            <section className='container mx-auto py-24'>
                <h2 className='mb-12 text-center text-3xl font-bold'>
                    Popular Categories
                </h2>
                <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
                    {[
                        'Sports',
                        'Tech',
                        'Music',
                        'Travel',
                        'Food',
                        'Gaming',
                        'Fitness',
                        'Networking',
                    ].map((cat) => (
                        <Card
                            key={cat}
                            className='cursor-pointer transition hover:shadow-lg'
                        >
                            <CardContent className='py-10 text-center font-semibold'>
                                {cat}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 5. Top-Rated Hosts */}
            <section className='container mx-auto py-24'>
                <h2 className='mb-12 text-center text-3xl font-bold'>
                    Top-Rated Hosts
                </h2>
                <div className='grid gap-6 md:grid-cols-3'>
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader className='flex flex-row items-center gap-4'>
                                <Avatar>
                                    <AvatarImage src='' />
                                    <AvatarFallback>AJ</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className='text-base'>
                                        Alex Johnson
                                    </CardTitle>
                                    <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                                        <Star className='h-4 w-4 text-yellow-500' />{' '}
                                        4.9 rating
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className='text-sm text-muted-foreground'>
                                Hosted 24 successful events
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 6. Testimonials */}
            <section className='bg-muted py-24'>
                <div className='container mx-auto'>
                    <h2 className='mb-12 text-center text-3xl font-bold'>
                        Loved by the Community
                    </h2>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className='space-y-4 py-8'>
                                    <p className='text-muted-foreground'>
                                        “I joined a hiking event and made
                                        amazing friends. Social Spark actually
                                        works.”
                                    </p>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <span className='text-sm font-medium'>
                                            Verified User
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Final CTA */}
            <section className='container mx-auto py-32 text-center'>
                <h2 className='mb-4 text-4xl font-bold'>
                    Start your next experience today
                </h2>
                <p className='mx-auto mb-8 max-w-xl text-muted-foreground'>
                    Join activities nearby or create your own event and bring
                    people together.
                </p>
                <div className='flex justify-center gap-4'>
                    <Button size='lg'>Find Activities</Button>
                    <Button size='lg' variant='outline'>
                        Create Event
                    </Button>
                </div>
            </section>
        </main>
    );
}
