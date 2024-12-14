"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    };

    return (
        <div className="p-5">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-10'>
                {/* Questions */}
                <QuestionSection 
                    mockInterviewQuestion={mockInterviewQuestion} 
                    activeQuestionIndex={activeQuestionIndex}
                />
                
                {/* Video/Audio Recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion} 
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6 mt-1'> {/* Reduced margin-top to place buttons closer */}
                {activeQuestionIndex > 0 && 
                    <Button 
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} 
                        className="hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                    >
                        Previous Question
                    </Button>}
                {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && 
                    <Button 
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} 
                        className="hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                    >
                        Next Question
                    </Button>}
                {activeQuestionIndex === mockInterviewQuestion?.length - 1 && 
                    <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                        <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                        >
                            End Interview
                        </Button>
                    </Link>}
            </div>
        </div>
    );
}

export default StartInterview;
