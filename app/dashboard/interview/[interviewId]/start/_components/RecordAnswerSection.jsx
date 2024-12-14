"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";
import * as schema from "@/utils/schema"; 

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [isClient, setIsClient] = useState(false);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        setIsClient(typeof window !== "undefined" && typeof navigator !== "undefined");
    }, []);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        const newAnswer = results.reduce((acc, result) => acc + result?.transcript, "");
        setUserAnswer(newAnswer);
        console.log("User Answer:", newAnswer); 
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            console.log("Updating user answer...");
            UpdateUserAnswer();
        }
    }, [userAnswer]);

    if (!isClient) return null;

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const UpdateUserAnswer = async () => {
        if (!interviewData?.mockId) {
            console.error("Interview data is missing the mockId.");
            toast("Error: Missing interview mock ID");
            setLoading(false);
            return;
        }

        setLoading(true);
        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question + 
            ", User Answer:" + userAnswer + ", Please evaluate the answer based on relevance, clarity, and completeness " + 
            "Provide a rating from 1 to 5, and include feedback for improvement in JSON format with 'rating' and 'feedback' fields.";

        console.log("Feedback Prompt:", feedbackPrompt);

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            console.log("Chat Session Result:", result);

            const mockJsonResp = (await result.response.text()).replace("```json", "").replace("```", "");
            console.log("Raw JSON Response:", mockJsonResp);

            const JsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(schema.UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-YYYY"),
            });

            console.log("Database Response:", resp);
            if (resp) {
                toast("User answer recorded successfully!");
                setUserAnswer("");
                setResults([]);
            }
        } catch (error) {
            console.error("Error inserting user answer:", error);
            toast("Error recording user answer!");
        } finally {
            setUserAnswer("");
            setResults([]);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="relative flex flex-col justify-center items-center mb-10 bg-slate-200 rounded-lg p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <Image
                    src={"/webcam.png"}
                    alt="Webcam display placeholder"
                    width={200}
                    height={200}
                    className="absolute rounded-lg"
                />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10,
                        borderRadius: "0.5rem", 
                    }}
                />
            </div>
            <Button
                disabled={loading}
                variant="outline"
                className="my-5 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                onClick={StartStopRecording}
            >
                {isRecording ? (
                    <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
                        <StopCircle /> Stop Recording
                    </h2>
                ) : (
                    <h2 className="text-blue-800 flex gap-2 items-center">
                        <Mic />
                        Record Answer
                    </h2>
                )}
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
