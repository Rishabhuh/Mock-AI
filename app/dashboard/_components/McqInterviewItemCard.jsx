import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function McqInterviewItemCard({ mcqInterview }) {
    const router = useRouter();

    const onFeedbackPress = () => {
        router.push('/dashboard/MCQ/' + mcqInterview?.mcqId + '/mcqfeedback');
    };

    return (
        <div className='border rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out'>
            <h2 className='font-bold text-purple-800'>{mcqInterview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{mcqInterview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-400'>Created At: {mcqInterview.createdAt}</h2>
            <div className='flex justify-between mt-4 gap-4'>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className='w-full hover:bg-gray-200'
                    onClick={onFeedbackPress}
                >
                    Feedback
                </Button>
            </div>
        </div>
    );
}

export default McqInterviewItemCard;
