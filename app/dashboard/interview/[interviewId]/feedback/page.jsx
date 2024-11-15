// "use client"
// import { db } from '@/utils/db'
// import { USerAnswer } from '@/utils/schema'
// //import { eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react'
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import { ChevronsUpDown, Link } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'



// function feedback(params) {

//   const [feedbackList,setFeedbackList]=useState([]);
//   const router=useRouter();
//   useEffect(()=>{
//     console.log(params.interviewId); 
//     GetFeedback();
//   },[])

//   const GetFeedback=async()=>{
//     //const result=await db.select().from(USerAnswer).where(eq(USerAnswer.mockIdRef,params.interviewId)).orderBy(USerAnswer.id);
//     const result = await db.select().from(USerAnswer).orderBy(USerAnswer.id); // Fetch all data to check
 
//     console.log(result);
//     setFeedbackList(result);
//   }
//   return (
//     <div className='p-10'>
//       <h2 className='text-3xl font-bold text-green-500'>Congratulations!!</h2>
//       <h2 className='font-bold text-2xl'>Here is Your Interview Feedback</h2>
//       <h2 className='text-blue-500 text-lg my-3'>Your overall Interview Rating: <strong>9/10</strong></h2>
//       <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, your answer and feedback for improvement</h2>
//       {feedbackList&&feedbackList.map((item,index)=>(
//         <Collapsible key={index} className='mt-7'>

//         <CollapsibleTrigger className='p-2 bg-secondary rounded-lg 
//         flex justify-between my-2 text-left gap-7 w-full'>
//           {item.question} <ChevronsUpDown className='h-5 w-5'/>
//         </CollapsibleTrigger>

//         <CollapsibleContent>
//           <div className='flex flex-col gap-2'>
//             <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
//             <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
//             <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
//             <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-700'><strong>Feedback: </strong>{item.feedback}</h2>
//           </div>
//         </CollapsibleContent>
//       </Collapsible>
//       ))}
    
//       <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
// </div>
//   )
// }

// export default feedback

"use client"
import { db } from '@/utils/db';
import { MockInterview, USerAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {ChevronsUpDown} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';



const Feedback = ({params}) => {
  const [feedbackList,setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const router = useRouter()
  useEffect(()=>{
    GetFeedback();
    GetOverallRating();
  },[])
  const GetFeedback=async()=>{
    const result = await db.select()
    .from(USerAnswer)
    .where(eq(USerAnswer.mockIdRef,params.interviewId))
    .orderBy(USerAnswer.id);
    console.log(params.interviewId);
    console.log(result);
    setFeedbackList(result);
  }

  // Fetch overall interview rating from the MockInterview table
  const GetOverallRating = async () => {
    const result2 = await db.select()
      .from(MockInterview) 
      .where(eq(MockInterview.mockId, params.interviewId)); // Fetch rating by interviewId
    if (result2.length > 0) {
      setOverallRating(result2[0].overallrating); // Set overall rating
    } else {
      setOverallRating("No rating available"); // Fallback if no rating found
    }
  };

  return (
    <div className='p-10'>
      
      {feedbackList?.length ==0 ?
      <h2 className='font-bold text-xl text-gray-500'>No interview Feedback</h2>
      : <>
      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-2'>
        Your overall interview rating: <strong>{overallRating ? `${overallRating}/10` : "No rating available"}</strong>
      </h2>
      <h2 className='text-sm text-gray-500'>Find below interview questions with coreect answers,Your answer and feedback for improvements for your next interview</h2>
      
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
        {item.question} <ChevronsUpDown className='h-4'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 border rounded-lg'>
              <strong>
                Rating:
              </strong>
              {item.rating}
            </h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer Looks Like: </strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>      
      ))}
      </>
      }
   <Button className='mt-5' onClick={()=>router.replace('/dashboard')}> Go Home</Button>
    </div>
  );
}

export default Feedback;