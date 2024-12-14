"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnable] = useState(false);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    /**
     * Used to get interview details by mockId/Interview Id
     */
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        console.log(result);
        setInterviewData(result[0]);
    };

    return (
        <div className='my-10 mt-28'> {/* Increased margin-top to mt-20 to avoid hiding behind the header */}
            <h2 className='font-bold text-2xl text-purple-800'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border border-gray-300 shadow-lg gap-5'>
                        {/* Add a conditional check to ensure interviewData is not null */}
                        {interviewData ? (
                            <>
                                <h2 className='text-lg'><strong>Job Role/Position: </strong>{interviewData.jobPosition}</h2>
                                <h2 className='text-lg'><strong>Job Description: </strong>{interviewData.jobDesc}</h2>
                                <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData.jobExperience}</h2>
                            </>
                        ) : (
                            <h2 className='text-gray-500'>Loading interview details...</h2>
                        )}
                    </div>

                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 shadow-md'>
                        <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-600 text-justify'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    {webCamEnabled ? (
                        <Webcam 
                            onUserMedia={() => setWebCamEnable(true)}
                            onUserMediaError={() => setWebCamEnable(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300,
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-slate-200 rounded-lg border' />
                            <Button variant="ghost" className='w-full hover:bg-gray-200' onClick={() => setWebCamEnable(true)}>
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className='flex justify-end items-end mt-5'>
                <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
                    <Button className='bg-purple-800 hover:bg-purple-700 text-white'>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
