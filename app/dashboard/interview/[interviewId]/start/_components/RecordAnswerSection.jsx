//"use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic } from 'lucide-react'
// import { toast } from 'sonner'
// import { chatSession } from '@/utils/GeminiAIModel'
// import { db } from '@/utils/db'
// import { USerAnswer } from '@/utils/schema'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment'

// function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
//     const [userAnswer,setUserAnswer]=useState('');
//     const {user}=useUser();
//     const [loading,setLoading]=useState(false);
//     const {
//         error,
//         interimResult,
//         isRecording,
//         results,
//         startSpeechToText,
//         stopSpeechToText,
//         setResults
//       } = useSpeechToText({
//         continuous: true,
//         useLegacyResults: false
//       });

//       useEffect(()=>{
//         results.map((result)=>(
//             setUserAnswer(prevAns=>prevAns+result?.transcript)
//         ))
//       },[results])

//       useEffect(()=>{
//         if(!isRecording&&userAnswer.length>10)
//         {
//           UpdateUSerAnswer();
//         }
//         // if(userAnswer?.length<10)
//         //   {
//         //     setLoading(false);
//         //     toast('Error while saving your answer, Please record again!!')
//         //     return;
//         //   }
//       },[userAnswer])

//       const StartStopRecording=async ()=>{
//         if(isRecording)
//         { 
//           stopSpeechToText()  
//         }
//         else
//         {
//           startSpeechToText()
//         }
//       }

      // const UpdateUSerAnswer=async()=>{
      //   console.log(userAnswer)
      //   setLoading(true);
      //   const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
      //     ", User Answer:"+userAnswer+",Depends on question and user answer for given interview question "+
      //     " please give us rating for answer and feedback as area of improvement if any "+
      //     "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      //     const result=await chatSession.sendMessage(feedbackPrompt);

      //     const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
      //     console.log(mockJsonResp);
      //     const JsonFeedbackResp=JSON.parse(mockJsonResp);
      //     const resp=await db.insert(USerAnswer)
      //     .values({
      //       mockIdRef:interviewData?.mockId,
      //       question:mockInterviewQuestion[activeQuestionIndex]?.question,
      //       correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
      //       userAns:userAnswer,
      //       feedback:JsonFeedbackResp?.feedback,
      //       rating:JsonFeedbackResp?.rating,
      //       userEmail:user?.primaryEmailAddress?.emailAddress,
      //       createdAt:moment().format('DD-MM-YYYY')
      //     })

      //     if(resp)
      //     {
      //       toast('User Answer recorded successfully');
      //       setUserAnswer(''); // Why ? Doubt
      //       setResults([]);
      //     }
        
      //     setLoading(false);
      // }

//   return (
//     <div className='flex items-center justify-center flex-col'>
//         <div className='flex flex-col mt-20 justify-center items-center bg-gray-200 rounded-lg p-5'>
//         <Image src={'/webcam.png'} width={200} height={200}
//         className='absolute'/>
//         <Webcam
//         mirrored={true}
//         style={{
//             height:300,
//             width:'100%',
//             zIndex:10,
//         }}/>
//         </div>
//         <Button variant="outline" className="my-10"
//             disabled={loading}
//             onClick={StartStopRecording}
//             >
//             {isRecording?
//             <h2 className='text-red-600 flex gap-2'>
//                 <Mic/> Stop Recording
//             </h2>
//             :
//             'Record Answer'}
//         </Button>

//         {/* <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button> */}

//         {/* <h1>Recording: {isRecording.toString()}</h1>
//       <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <ul>
//         {results.map((result) => (
//           <li key={result.timestamp}>{result.transcript}</li>
//         ))}
//         {interimResult && <li>{interimResult}</li>}
//       </ul> */}

//     </div>
//   )
// }

// export default RecordAnswerSection


// //------------------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------------------

//RecordAnswerSection.jsx
// "use client"
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic } from 'lucide-react';
// import { toast } from 'sonner';
// import { chatSession } from '@/utils/GeminiAIModel';
// import { db } from '@/utils/db';
// import { MockInterview, USerAnswer } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment';

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results.map((result) => setUserAnswer((prevAns) => prevAns + result?.transcript));
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10) {
//       UpdateUserAnswer();
//     }
//   }, [userAnswer]);

//   const StartStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     console.log(userAnswer);
//     setLoading(true);

//     const response = await fetch('/api/generate-feedback',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAnswer,
//       }),
//     });
    
//     const feedback = await response.json(activeQuestionIndex);
//     console.log(feedback);

//     if (feedback.error) {
//       toast('Error generating feedback');
//       setLoading(false);
//       return;
//     }

//     const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
//           ", User Answer:"+userAnswer+",Depends on question and user answer for given interview question "+
//           " please give us feedback for answer given by user as area of improvement if any "+
//           "in just 3 to 5 lines to improve it in JSON format with feedback field";

//     const result=await chatSession.sendMessage(feedbackPrompt);

//     const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
//     console.log(mockJsonResp);
//     const JsonFeedbackResp=JSON.parse(mockJsonResp);

//     const resp = await db.insert(USerAnswer)
//       .values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback:JsonFeedbackResp?.feedback,
//         // feedback: feedback?.feedback,
//         rating: feedback?.rating,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format('DD-MM-YYYY'),
//       });

//     if (resp) {
//       toast('User Answer recorded successfully');
//       setUserAnswer('');
//       setResults([]);
//     }
//     setResults([]);
//     setLoading(false);
//   };
  
  
//   return (
//     <div className='flex items-center justify-center flex-col'>
//       <div className='flex flex-col mt-20 justify-center items-center bg-gray-200 rounded-lg p-5'>
//         <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
//         <Webcam mirrored={true} style={{ height: 300, width: '100%', zIndex: 10 }} />
//       </div>
//       <Button
//         variant="outline"
//         className="my-10"
//         disabled={loading}
//         onClick={StartStopRecording}
//       >
//         {isRecording ? (
//           <h2 className='text-red-600 flex gap-2'>
//             <Mic /> Stop Recording
//           </h2>
//         ) : (
//           'Record Answer'
//         )}
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;

//------------------------------------------------------------------------------

// Inside RecordAnswerSection.jsx Before Confidence
"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { USerAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [overallRating, setOverallRating] = useState(0); // Track overall rating
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
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
    results.map((result) => setUserAnswer((prevAns) => prevAns + result?.transcript));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const response = await fetch('/api/generate-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAnswer,
      }),
    });

    const feedback = await response.json();
    console.log(feedback);

    if (feedback.error) {
      toast('Error generating feedback');
      setLoading(false);
      return;
    }

    const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" + userAnswer + ", Depends on question and user answer for given interview question " +
      " please give us feedback for answer given by user as area of improvement if any " +
      "in just 3 to 5 lines to improve it in JSON format with feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    console.log(mockJsonResp)
    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    

    const resp = await db.insert(USerAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: feedback?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      });

    // Update overall rating
    if (feedback?.rating) {
      setOverallRating((prevRating) => prevRating + parseFloat(feedback?.rating));
    }

    // If the user answered the last question, calculate and store the overall rating
    if (activeQuestionIndex === mockInterviewQuestion.length - 1) {
      const overall_averageRating = overallRating / mockInterviewQuestion.length;
      const averageRating = overall_averageRating.toFixed(1);
      await updateOverallRating(interviewData?.mockId, averageRating);
      toast('User Answer recorded and User rated successfully');
      console.log("Average Overall Rating:-",averageRating)
    }

    if (resp) {
      toast('User Answer recorded successfully');
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  const updateOverallRating = async (mockId, overallRating) => {
    try {
      await fetch('/api/update-overall-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mockId, overallRating: overallRating }),
      });
      toast('Overall Rating Updated Successfully');
    } catch (error) {
      console.error('Error updating overall rating:', error);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-gray-200 rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
        <Webcam mirrored={true} style={{ height: 300, width: '100%', zIndex: 10 }} />
      </div>
      <Button
        variant="outline"
        className="my-10"
        disabled={loading}
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className='text-red-600 flex gap-2'>
            <Mic /> Stop Recording
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;

//---------------------------------
//-----------------------------------

// "use client"
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React, { useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic } from 'lucide-react';
// import { toast } from 'sonner';
// import { chatSession } from '@/utils/GeminiAIModel';
// import { db } from '@/utils/db';
// import { USerAnswer } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment';
// import * as tf from "@tensorflow/tfjs";
// import * as blazeface from "@tensorflow-models/blazeface";

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const [overallRating, setOverallRating] = useState(0);
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [model, setModel] = useState(null);
//   const [isLooking, setIsLooking] = useState(true);
//   const [confidence, setConfidence] = useState(100);
//   const [lookAwayCount, setLookAwayCount] = useState(0);
  
//   const penaltyFactor = 2;
//   const recoveryRate = 0.3;
//   const maxConfidence = 100;
//   const minConfidence = 0;

//   const webcamRef = useRef(null);
  
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results.map((result) => setUserAnswer((prevAns) => prevAns + result?.transcript));
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10) {
//       UpdateUserAnswer();
//     }
//   }, [userAnswer]);

//   useEffect(() => {
//     const loadModel = async () => {
//       const loadedModel = await blazeface.load();
//       setModel(loadedModel);
//     };
//     loadModel();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       detectFace();
//     }, 500);
//     return () => clearInterval(interval);
//   }, [model]);

//   const StartStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const detectFace = async () => {
//     if (webcamRef.current && model) {
//       const video = webcamRef.current.video;
//       const predictions = await model.estimateFaces(video, false);

//       if (predictions.length > 0) {
//         const face = predictions[0];
//         const rightEye = face.landmarks[0];
//         const leftEye = face.landmarks[1];

//         const centerX = video.videoWidth / 2;
//         const centerY = video.videoHeight / 2;
//         const strictThresholdX = 0.13 * video.videoWidth;
//         const strictThresholdY = 0.10 * video.videoHeight;

//         const eyeCenterX = (rightEye[0] + leftEye[0]) / 2;
//         const eyeCenterY = (rightEye[1] + leftEye[1]) / 2;

//         if (Math.abs(eyeCenterX - centerX) > strictThresholdX || Math.abs(eyeCenterY - centerY) > strictThresholdY) {
//           setIsLooking(false);
//           setLookAwayCount(prev => prev + 1);
//         } else {
//           setIsLooking(true);
//         }
//       } else {
//         setIsLooking(false);
//       }
//     }
//   };

//   useEffect(() => {
//     const updateConfidence = () => {
//       setConfidence(prev => {
//         if (isLooking) {
//           return Math.min(prev + recoveryRate, maxConfidence);
//         } else {
//           const adjustedPenalty = penaltyFactor;
//           return Math.max(prev - adjustedPenalty, minConfidence);
//         }
//       });
//     };

//     const confidenceInterval = setInterval(updateConfidence, 500);
//     return () => clearInterval(confidenceInterval);
//   }, [isLooking, lookAwayCount]);

//   // const UpdateUserAnswer = async () => {
//   //   console.log(userAnswer);
//   //   setLoading(true);

//   //   const response = await fetch('/api/generate-feedback', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
//   //       userAnswer,
//   //     }),
//   //   });

//   //   const feedback = await response.json();
//   //   if (feedback.error) {
//   //     toast('Error generating feedback');
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
//   //     ", User Answer:" + userAnswer + ", Provide feedback for improvement.";

//   //   const result = await chatSession.sendMessage(feedbackPrompt);

//   //   const mockJsonResp = (result.response.text()).replace('json', '').replace('', '');
//   //   const JsonFeedbackResp = JSON.parse(mockJsonResp);

//   //   await db.insert(USerAnswer)
//   //     .values({
//   //       mockIdRef: interviewData?.mockId,
//   //       question: mockInterviewQuestion[activeQuestionIndex]?.question,
//   //       correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//   //       userAns: userAnswer,
//   //       feedback: JsonFeedbackResp?.feedback,
//   //       rating: feedback?.rating,
//   //       userEmail: user?.primaryEmailAddress?.emailAddress,
//   //       createdAt: moment().format('DD-MM-YYYY'),
//   //     });

//   //   if (feedback?.rating) {
//   //     setOverallRating((prevRating) => prevRating + parseFloat(feedback?.rating));
//   //   }

//   //   if (activeQuestionIndex === mockInterviewQuestion.length - 1) {
//   //     const overall_averageRating = overallRating / mockInterviewQuestion.length;
//   //     const averageRating = overall_averageRating.toFixed(1);
//   //     await updateOverallRating(interviewData?.mockId, averageRating);
//   //     toast('User Answer recorded and User rated successfully');
//   //     console.log("Average Overall Rating:", averageRating);
//   //   }

//   //   setUserAnswer('');
//   //   setResults([]);
//   //   setLoading(false);
//   // };

//   const UpdateUserAnswer = async () => {
//     try {
//       console.log(userAnswer);
//       setLoading(true);
  
//       // Sending user answer and correct answer to the API
//       const response = await fetch('/api/generate-feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
//           userAnswer,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch feedback from the server');
//       }
  
//       const feedback = await response.json();
  
//       if (feedback.error) {
//         toast('Error generating feedback');
//         setLoading(false);
//         return;
//       }
  
//       // Preparing feedback prompt for the chat session
//       const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
//         User Answer: ${userAnswer}, Provide feedback for improvement.`;
  
//       const result = await chatSession.sendMessage(feedbackPrompt);
  
//       // Ensure result is a valid JSON response
//       let JsonFeedbackResp;
//       try {
//         const responseText = await result.response.text(); // Await the response text
//         const cleanedResponse = responseText
//           .replace(/json/i, '') // Remove occurrences of 'json'
//           .trim(); // Trim any extraneous whitespace
//         JsonFeedbackResp = JSON.parse(cleanedResponse);
//       } catch (error) {
//         console.error('Error parsing chat session response:', error);
//         toast('Error processing feedback response');
//         setLoading(false);
//         return;
//       }
  
//       // Insert user answer and feedback into the database
//       await db.insert(USerAnswer).values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback: JsonFeedbackResp?.feedback || 'No feedback provided',
//         rating: feedback?.rating,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format('DD-MM-YYYY'),
//       });
  
//       // Update overall rating if feedback includes a rating
//       if (feedback?.rating) {
//         setOverallRating((prevRating) => prevRating + parseFloat(feedback?.rating));
//       }
  
//       // Finalize and calculate the overall rating at the last question
//       if (activeQuestionIndex === mockInterviewQuestion.length - 1) {
//         const overallAverageRating = (overallRating / mockInterviewQuestion.length).toFixed(1);
//         await updateOverallRating(interviewData?.mockId, overallAverageRating);
//         toast('User Answer recorded and User rated successfully');
//         console.log('Average Overall Rating:', overallAverageRating);
//       }
  
//       // Reset state for the next question
//       setUserAnswer('');
//       setResults([]);
//       setLoading(false);
  
//     } catch (error) {
//       console.error('Error in UpdateUserAnswer:', error);
//       toast('An error occurred while processing the user answer');
//       setLoading(false);
//     }
//   };
   

//   const updateOverallRating = async (mockId, overallRating) => {
//     try {
//       await fetch('/api/update-overall-rating', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mockId, overallRating: overallRating }),
//       });
//       toast('Overall Rating Updated Successfully');
//     } catch (error) {
//       console.error('Error updating overall rating:', error);
//     }
//   };

//   return (
//     <div className='flex items-center justify-center flex-col'>
//       <div className='flex flex-col mt-20 justify-center items-center bg-gray-200 rounded-lg p-5'>
//         <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
//         <Webcam mirrored={true} ref={webcamRef} style={{ height: 300, width: '100%', zIndex: 10 }} />
//       </div>
//       <div style={{ textAlign: 'center', marginTop: 20 }}>
//         {isLooking ? (
//           <p style={{ color: "green" }}>Looking at the screen</p>
//         ) : (
//           <p style={{ color: "red" }}>Warning: Movement Detected!</p>
//         )}
//         <p>Confidence: {confidence.toFixed(1)}%</p>
//       </div>
//       <Button
//         variant="outline"
//         className="my-10"
//         disabled={loading}
//         onClick={StartStopRecording}
//       >
//         {isRecording ? (
//           <h2 className='text-red-600 flex gap-2'>
//             <Mic /> Stop Recording
//           </h2>
//         ) : (
//           'Record Answer'
//         )}
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;
