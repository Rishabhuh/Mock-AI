"use client"
import { db } from '@/utils/db';
import { McqUserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { Trophy, Target, Hourglass, LayoutDashboard } from 'lucide-react'; // Icons for accuracy, time, result, and home
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'; // shadcn UI components
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"; // Collapsible
import Link from 'next/link'; // For navigation

function McqFeedback({ params }) {
    const [mcqFeedbackList, setMcqFeedbackList] = useState([]);
    const [accuracy, setAccuracy] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null); // State to track expanded question index

    useEffect(() => {
        GetMcqFeedback();
    }, []);

    const GetMcqFeedback = async () => {
        const result = await db.select()
            .from(McqUserAnswer)
            .where(eq(McqUserAnswer.mcqIdRef, params.MCQid))
            .orderBy(McqUserAnswer.id);

        setMcqFeedbackList(result);
        const acc = calculateAccuracy(result);
        setAccuracy(acc);
    };

    const calculateAccuracy = (feedbackList) => {
        const correctAnswers = feedbackList.filter(fb => fb.correctAns === fb.userAns).length;
        const totalQuestions = feedbackList.length;
        return (correctAnswers / totalQuestions) * 100;
    };

    const getFeedbackMessage = (accuracy) => {
        if (accuracy < 25) {
            return { color: 'red', text: 'Nice Try', icon: 'Trophy' };
        } else if (accuracy < 75) {
            return { color: 'yellow', text: 'Impressive', icon: 'Trophy' };
        } else {
            return { color: 'green', text: 'Excellent', icon: 'Trophy' };
        }
    };

    const { color, text } = getFeedbackMessage(accuracy);

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the expanded question
    };

    return (
        <div className="relative pt-5"> {/* Adjust padding to prevent overlap with navbar */}
            <div className="p-6"> {/* Content area */}
                <Card className="mb-6 hover:scale-105 transition-transform"> {/* Keep hover animation */}
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Summary</h2>
                            <Trophy className={`text-${color}-500`} />
                        </div>
                        <p className={`text-${color}-500 font-semibold`}>{text}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="hover:scale-105 transition-transform"> {/* Keep hover animation */}
                                <CardHeader className="flex justify-between">
                                    <h3 className="text-lg font-bold">Accuracy</h3>
                                    <Target className="text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <p>{accuracy.toFixed(2)}%</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:scale-105 transition-transform"> {/* Keep hover animation */}
                                <CardHeader className="flex justify-between">
                                    <h3 className="text-lg font-bold">Time Taken</h3>
                                    <Hourglass className="text-yellow-500" />
                                </CardHeader>
                                <CardContent>
                                    <p>29s</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                <h3 className="text-lg font-bold mb-4">Question Review</h3>
                {mcqFeedbackList.map((item, index) => (
                    <Card key={index} className="mb-4 hover:scale-105 transition-transform"> {/* Keep hover animation */}
                        <Collapsible open={expandedIndex === index}>
                            <CollapsibleTrigger onClick={() => handleToggle(index)} className="flex justify-between cursor-pointer">
                                <CardHeader>
                                    <h3 className="text-md font-bold">Question {index + 1}</h3>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent>
                                    <p>{item.question}</p>
                                    {item.correctAns === item.userAns ? (
                                        <div className="bg-green-100 text-green-700 p-2 rounded">
                                            <p>Your Answer: {item.userAns}</p>
                                            <p>Correct Answer: {item.correctAns}</p> {/* Show correct answer */}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-red-100 text-red-700 p-2 rounded">
                                                <p>Your Answer: {item.userAns}</p>
                                            </div>
                                            <div className="bg-green-100 text-green-700 p-2 rounded mt-2">
                                                <p>Correct Answer: {item.correctAns}</p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>
                ))}

                {/* Home Button */}
                <Link href="/dashboard" className="absolute bottom-15 right-6 flex items-center bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"> {/* Keep hover animation */}
                    <LayoutDashboard className="mr-2" />
                    Home
                </Link>
            </div>
        </div>
    );
}

export default McqFeedback;
