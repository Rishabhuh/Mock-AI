"use client";
import { db } from '@/utils/db';
import { McqInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import McqInterviewItemCard from './McqInterviewItemCard';

function McqInterviewList() {
    const { user } = useUser();
    const [mcqInterviewList, setMcqInterviewList] = useState([]);

    useEffect(() => {
        if (user) {
            GetMcqInterviewList();
        }
    }, [user]);

    const GetMcqInterviewList = async () => {
        const result = await db.select()
            .from(McqInterview)
            .where(eq(McqInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(McqInterview.id));

        console.log(result);
        setMcqInterviewList(result);
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className='font-bold text-xl text-purple-700 mb-4'>Previous MCQ Interviews:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {mcqInterviewList && mcqInterviewList.map((mcqInterview, index) => (
                    <McqInterviewItemCard
                        mcqInterview={mcqInterview}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default McqInterviewList;
