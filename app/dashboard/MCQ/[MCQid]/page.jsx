"use client";
import { db } from '@/utils/db';
import { McqInterview, McqUserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; 
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react'; 
import moment from 'moment';

function MCQ({ params }) {
    const [mcqData, setMcqData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedAnswers, setSubmittedAnswers] = useState({});
    const [elapsedTime, setElapsedTime] = useState(0); 
    const { user } = useUser(); 

    useEffect(() => {
        GetMCQdetails();
        const timerInterval = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timerInterval); 
    }, []);

    /**
     * Used to Get Interview Details by mcqId/MCQ id
     */
    const GetMCQdetails = async () => {
        const result = await db.select().from(McqInterview)
            .where(eq(McqInterview.mcqId, params.MCQid));

        if (result.length > 0) {
            const parsedQuestions = JSON.parse(result[0].mcqQuestions);
            setMcqData(parsedQuestions);
        }
    };

    const handleNextQuestion = async () => {

        const currentQuestion = mcqData[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        if (!submittedAnswers[currentQuestionIndex]) {
            await db.insert(McqUserAnswer).values({
                mcqIdRef: params.MCQid,
                question: currentQuestion.question,
                correctAns: currentQuestion.correctAnswer,
                userAns: selectedAnswer,
                feedback: isCorrect ? 'Correct' : 'Incorrect',
                rating: isCorrect ? '5' : '2',
                userEmail: user?.primaryEmailAddress?.emailAddress || 'Anonymous',
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });

            setSubmittedAnswers({
                ...submittedAnswers,
                [currentQuestionIndex]: selectedAnswer,
            });
        }

        setIsSubmitted(false); 
        setSelectedAnswer('');
        if (currentQuestionIndex < mcqData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(submittedAnswers[currentQuestionIndex - 1] || '');
            setIsSubmitted(true); 
        }
    };

    const handleAnswerChange = (answer) => {
        if (!submittedAnswers[currentQuestionIndex]) {
            setSelectedAnswer(answer);
            setIsSubmitted(true);
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const handleFinish = async () => {
        const currentQuestion = mcqData[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        if (!submittedAnswers[currentQuestionIndex]) {
            await db.insert(McqUserAnswer).values({
                mcqIdRef: params.MCQid,
                question: currentQuestion.question,
                correctAns: currentQuestion.correctAnswer,
                userAns: selectedAnswer,
                feedback: isCorrect ? 'Correct' : 'Incorrect',
                rating: isCorrect ? '5' : '2',
                userEmail: user?.primaryEmailAddress?.emailAddress || 'Anonymous',
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });

            setSubmittedAnswers({
                ...submittedAnswers,
                [currentQuestionIndex]: selectedAnswer,
            });
        }
        window.location.href = `/dashboard/MCQ/${params.MCQid}/mcqfeedback`;
    };

    return (
        <div className="p-5 mt-10">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">MCQ Session:</h2>
                <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>{formatTime(elapsedTime)}</span>
                </div>
            </div>

            {mcqData.length > 0 ? (
                <div className="mt-10">
                    <Card className="p-4 rounded-lg border border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                <strong>Question {currentQuestionIndex + 1}:</strong> {mcqData[currentQuestionIndex].question}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <div className="mt-3 grid grid-cols-1 gap-3">
                        {Object.entries(mcqData[currentQuestionIndex].options).map(([key, value]) => {
                            const isCorrect = key === mcqData[currentQuestionIndex].correctAnswer;
                            const isSelected = selectedAnswer === key;
                            const isWrong = isSelected && !isCorrect;
                            const cardClassName = isSubmitted
                                ? isCorrect ? 'bg-green-100 text-green-800' : isWrong ? 'bg-red-100 text-red-800' : ''
                                : isSelected ? 'bg-gray-200' : 'hover:bg-gray-100 transition-colors duration-200';

                            return (
                                <Card key={key} className={`cursor-pointer p-3 ${cardClassName} transition-colors duration-300`} onClick={() => handleAnswerChange(key)}>
                                    <CardHeader className="flex items-center">
                                        {isSubmitted && isCorrect && <CheckCircle className="mr-2" />}
                                        {isSubmitted && isWrong && <XCircle className="mr-2" />}
                                        <span className="font-semibold">{key}: {value}</span>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>

                    {isSubmitted && (
                        <div className={`p-3 rounded-md mt-3 ${selectedAnswer === mcqData[currentQuestionIndex].correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedAnswer === mcqData[currentQuestionIndex].correctAnswer ? 'Correct Answer!' : `Incorrect Answer! The correct answer is: ${mcqData[currentQuestionIndex].correctAnswer}`}
                        </div>
                    )}

                    <div className="flex justify-between mt-5">
                        <Button 
                            className="mr-2"
                            disabled={currentQuestionIndex === 0}
                            onClick={handlePreviousQuestion}
                        >
                            Previous
                        </Button>

                        {currentQuestionIndex < mcqData.length - 1 ? (
                            <Button 
                                className="ml-2" 
                                disabled={!isSubmitted}
                                onClick={handleNextQuestion}
                            >
                                Next Question
                            </Button>
                        ) : (
                            <Button 
                                className="ml-2" 
                                disabled={!isSubmitted}
                                onClick={handleFinish}
                            >
                                Finish
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <h2 className="text-gray-500">No MCQ questions available.</h2>
            )}
        </div>
    );
}

export default MCQ;
