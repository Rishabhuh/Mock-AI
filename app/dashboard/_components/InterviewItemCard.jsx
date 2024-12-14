import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
    const router = useRouter();

    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    };

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/' + interview?.mockId + '/feedback');
    };

    return (
        <div className='border rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out'>
            <h2 className='font-bold text-purple-800'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-400'>Created At: {interview.createdAt}</h2>
            <div className='flex justify-between mt-4 gap-4'>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className='w-full hover:bg-gray-200'
                    onClick={onFeedbackPress}
                >
                    Feedback
                </Button>
                <Button 
                    size="sm" 
                    className='w-full bg-purple-600 text-white hover:bg-purple-700'
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    );
}

export default InterviewItemCard;
