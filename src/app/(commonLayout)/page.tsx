import HeroSection from '@/components/module/Home/HeroSection';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Social Spark</title>
                <meta
                    name='description'
                    content='Social Spark is a social media platform for connecting with friends and family.'

                />
            </Head>
            <main className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
                <HeroSection />
            </main>
        </>
    );
}
