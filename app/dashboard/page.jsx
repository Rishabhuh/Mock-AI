"use client";
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import MCQForm from './_components/MCQForm'; 
import { History } from 'lucide-react'; 
import { useRouter } from 'next/navigation'; 

function Dashboard() {
    const router = useRouter();

    const goToHistory = () => {
        router.push('/dashboard/mcqhistory');
    };

    return (
        <div className='p-10 bg-gray-50 min-h-screen'>
            <h2 className='font-bold text-3xl text-purple-800 mb-4'>Dashboard</h2>
            <h2 className='text-gray-500 mb-5'>Create & Start your Interview Session</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
                {/* Add New Interview Card */}
                <AddNewInterview />
                <MCQForm />

                {/* History Card */}
                <div 
                    className='p-5 h-40 border rounded-lg bg-white shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center cursor-pointer' 
                    onClick={goToHistory}
                >
                    <h3 className='text-xl font-bold flex mb-2'>
                        <History className='mr-2' />
                        History
                    </h3>
                    <h4 className='text-sm text-gray-500'>View past MCQ attempts.</h4>
                </div>
            </div>

            {/* Previous Interviews: */}
            <InterviewList />
        </div>
    );
}

export default Dashboard;
