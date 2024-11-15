"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { Loader2Icon, LoaderCircle, User } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'
  
function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobDesc,setJobDesc]=useState();
    const [jobPosition,setJobPosition]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();
    
    

    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition,jobDesc,jobExperience)

        const InputPrompt="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+", based on the information provide "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" technical interview questions with their answers in JSON format, Give questions and answers as field in JSON without any mistake in the format of any kind of special characters"

        const result=await chatSession.sendMessage(InputPrompt)

        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')

        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);
        if(MockJsonResp)
        {
            const resp=await db.insert(MockInterview)
            .values({
                mockId:uuidv4(),
                jsonMockResp:MockJsonResp,
                jobPosition:jobPosition,
                jobDesc:jobDesc,
                jobExperience:jobExperience,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-YYYY')
            }).returning({mockId:MockInterview.mockId});

            console.log("Inserted ID: ",resp)
            if(resp)
            {
                setOpenDailog(false);
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        }
        else
        {
            console.log("ERROR !!");
        }

        setLoading(false)
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDailog(true)}>
            <h2 className='text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}>
        
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className=' font-bold text-2xl'>Could you elaborate on the job you're interviewing for?</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2>Add details about your Job Position/Role, Job Description and Years of Experience</h2>
                    <div className='mt-7 my-3'>
                        <label>Job Role/Job Position</label>
                        <Input placeholder="Ex. Java Developer" required
                        onChange={(event)=>setJobPosition(event.target.value)}
                        />
                    </div>

                    <div className='my-3'>
                        <label>Job Description/Tech Stack (In Short)</label>
                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySQL etc. "
                        onChange={(event)=>setJobDesc(event.target.value)}
                        />
                    </div>

                    <div className='my-3'>
                        <label>Years of Experience</label>
                        <Input placeholder="Ex.5" type="number" max="50"
                        onChange={(event)=>setJobExperience(event.target.value)}
                        />
                    </div>
                </div>
                <div className='flex gap-5 justify-end'>
                    <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading?
                        <>
                        <LoaderCircle className='animate-spin'/>'Generating from AI'
                        </>:'Start Interview' }
                    </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview