"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Trophy, ChevronsUpDown, User, ClipboardCheck, Award, Home } from 'lucide-react'; // Added Home icon for the button
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Card components from shadcn UI
import { useRouter } from 'next/navigation';

function Feedback({ params }) {

    const [feedbackList, setFeedbackList] = useState([]);
    const [averageRating, setAverageRating] = useState(null); // State for average rating
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);

        setFeedbackList(result);
        calculateOverallRating(result); // Calculate rating when feedback is fetched
    };

    // Function to calculate the overall rating
    const calculateOverallRating = (feedback) => {
        if (feedback.length === 0) {
            setAverageRating(0); // Set to 0 if no feedback is available
            return;
        }

        let totalRating = 0;
        let ratingCount = 0;

        feedback.forEach(item => {
            // Convert rating to a number (assuming rating is stored as string)
            const ratingValue = parseInt(item.rating);
            if (!isNaN(ratingValue)) {
                totalRating += ratingValue;
                ratingCount++;
            }
        });

        const average = totalRating / ratingCount;
        setAverageRating(average.toFixed(1)); // Set the average rating to one decimal place
    };

    // Function to get the color and text based on the rating
    const getRatingFeedback = (rating) => {
        if (rating < 4) {
            return { color: 'red', message: 'Needs Improvement', icon: <Trophy className="text-red-500" /> };
        } else if (rating < 7) {
            return { color: 'yellow', message: 'Good Effort', icon: <Trophy className="text-yellow-500" /> };
        } else {
            return { color: 'green', message: 'Excellent', icon: <Trophy className="text-green-500" /> };
        }
    };

    const { color, message, icon } = getRatingFeedback(averageRating);

    return (
        <div className="p-10 space-y-6">
            {feedbackList?.length === 0 ? (
                <h2 className="font-bold text-xl text-gray-500">No Feedback Record Found</h2>
            ) : (
                <>
                    {/* Summary Section */}
                    <Card className="hover:scale-105 transition-transform">
                        <CardHeader className="flex justify-between items-center">
                            <div>
                                <h2 className={`text-3xl font-bold text-${color}-500`}>Congratulations!</h2>
                                <p className="text-gray-600 text-md">Here is your interview feedback:</p>
                            </div>
                            {icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold text-gray-800">
                                Your overall rating: <strong className={`text-${color}-500`}>{averageRating}/10</strong> - {message}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Question Review Section */}
                    <h3 className="text-lg font-bold mb-4">Question Review</h3>
                    {feedbackList.map((item, index) => (
                        <Card key={index} className="hover:scale-105 transition-transform mb-4">
                            <Collapsible>
                                <CollapsibleTrigger className="p-4 bg-slate-200 rounded-lg flex justify-between items-center font-semibold w-full">
                                    <div className="flex items-center gap-2">
                                        <ClipboardCheck className="text-gray-700 h-5 w-5" />
                                        {`Question ${index + 1}: ${item.question}`}
                                    </div>
                                    <ChevronsUpDown className="text-gray-700 h-5 w-5" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <User className="text-red-500" />
                                            <h2 className="text-red-500">
                                                <strong>Your Answer: </strong>{item.userAns}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Award className="text-green-500" />
                                            <h2 className="text-green-500">
                                                <strong>Correct Answer: </strong>{item.correctAns}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ChevronsUpDown className="text-blue-500" />
                                            <h2 className="text-blue-500">
                                                <strong>Feedback: </strong>{item.feedback}
                                            </h2>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                    ))}

                    {/* Home Button */}
                    <Button className="mt-4 bg-black text-white flex items-center hover:bg-gray-800 transition-colors"
                        onClick={() => router.replace('/dashboard')}>
                        <Home className="mr-2" /> Home
                    </Button>
                </>
            )}
        </div>
    );
}

export default Feedback;
