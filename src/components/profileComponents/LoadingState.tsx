// src/app/(dashboardLayout)/user/dashboard/components/LoadingState.tsx
export default function LoadingState() {
    return (
        <div className='flex flex-col justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
            <p className='text-gray-600'>Loading profile...</p>
        </div>
    );
}
