"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle, FilePlus } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const InputPrompt = `I am preparing for an interview for the position of ${jobPosition}. 
            The job involves ${jobDesc}, and requires ${jobExperience} years of experience. 
            Could you please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with sample answers? 
            Please provide the response in JSON format with 'question' and 'answer' fields.`;

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(JSON.parse(MockJsonResp));

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YYYY')
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID", resp);
            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId);
            }
        } else {
            console.log("Error");
        }

        setLoading(false);
    }

    return (
        <div>
            <div 
                className='p-5 h-40 border rounded-lg bg-white shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-center'
                onClick={() => setOpenDialog(true)}
            >
                <h3 className='text-xl font-bold flex items-center'>
                    <FilePlus className='mr-2' />
                    Add New Interview
                </h3>
                <h4 className='text-sm text-gray-500'>Start a new interview process.</h4>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl p-5 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your Job Interview:</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, job description & years of experience</h2>

                                    <div className='mt-7 my-3'>
                                        <label>Job Role / Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description (In Short)</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySQL, etc" required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Years of Experience</label>
                                        <Input placeholder="5" type="number" max="100" required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 
                                            <><LoaderCircle className='animate-spin' /> Generating from AI</> 
                                            : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;