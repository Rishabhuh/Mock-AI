"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit } from 'lucide-react'; 
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { McqInterview } from '@/utils/schema'; 
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { chatSession } from '@/utils/MCQmodel';
import { useRouter } from 'next/navigation';
import { eq } from 'drizzle-orm';

function MCQForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();
    const [mcqjsonResponse,setMcqJsonResponse]=useState([]);

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        const InputPrompt = `Generate ${numQuestions} MCQ questions for the job position of ${jobPosition}. 
            The job involves ${jobDesc}, and requires ${jobExperience} years of experience. 
            Please provide the response in JSON format with an array of objects, 
            where each object contains the following fields: 'question' (string), 
            'options' (object with keys 'a', 'b', 'c', 'd'), and 'correctAnswer' (string).`;

            const result = await chatSession.sendMessage(InputPrompt);

            const McqJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            console.log(JSON.parse(McqJsonResp));
            setMcqJsonResponse(McqJsonResp);

            if(McqJsonResp)
            {
            const mcqresp=await db.insert(McqInterview)
            .values({
                mcqId:uuidv4(),
                mcqQuestions:McqJsonResp,
                jobPosition:jobPosition,
                jobDesc:jobDesc,
                jobExperience:jobExperience,
                mcqCount:numQuestions,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-YYYY')
            }).returning({mcqId:McqInterview.mcqId})

            console.log("Inserted ID:", mcqresp)
            if(mcqresp)
            {
                setOpenDialog(false);
                router.push('/dashboard/MCQ/'+mcqresp[0]?.mcqId)
            }
        }
        else{
            console.log("ERROR");
        }

            setLoading(false);
    
    };    

    return (
        <div>
            <div 
                className='p-5 h-40 border rounded-lg bg-white shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-center'
                onClick={() => setOpenDialog(true)}
            >
                <h3 className='text-xl font-bold flex items-center'>
                    <BrainCircuit className='mr-2' />
                    MCQ!
                </h3>
                <h4 className='text-sm text-gray-500'>Challenge yourself with MCQ Questions.</h4>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl p-5 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Enter Job Details for MCQ Generation:</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div className='mt-7 my-3'>
                                    <label>Job Role / Position</label>
                                    <Input placeholder="Ex. Software Engineer" required
                                        onChange={(event) => setJobPosition(event.target.value)}
                                        value={jobPosition}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description (In Short)</label>
                                    <Textarea placeholder="Ex. JavaScript, Node.js, REST APIs, etc." required
                                        onChange={(event) => setJobDesc(event.target.value)}
                                        value={jobDesc}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Years of Experience</label>
                                    <Input placeholder="3" type="number" max="50" required
                                        onChange={(event) => setJobExperience(event.target.value)}
                                        value={jobExperience}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Number of MCQ Questions</label>
                                    <Input placeholder="5" type="number" required
                                        value={numQuestions}
                                        onChange={(event) => setNumQuestions(event.target.value)}
                                    />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <LoaderCircle className='animate-spin' /> : 'Generate MCQs'}
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

export default MCQForm;
