// "use client"
// import { Lightbulb, Volume2,} from 'lucide-react'
// import React from 'react'

// function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {
//     // method for hearing question
//     console.log(mockInterviewQuestion);
//     const textToSpeech=(text)=>{
//         if('speechSynthesis' in window)
//         {
//             const speech=new SpeechSynthesisUtterance(text);
//             window.speechSynthesis.speak(speech)
//         }
//         else
//         {
//             alert('Sorry Your Browser does not support Text-to-Speech')
//         }
//     }
  
//     return mockInterviewQuestion&&(
//     <div className='p-5 border rounded-lg my-10'>
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//             {mockInterviewQuestion&&mockInterviewQuestion.map((question,index) =>
//                 <h2 className={`p-2 bg-secondary rounded-full
//                  text-xs md:text-sm text-center cursor-pointer font-bold
//                  ${activeQuestionIndex==index&&'bg-blue-700 text-white'}`}>Question #{index+1}</h2>
//             )}
//         </div>
//         <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
//         <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>

//         <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
//             <h2 className='flex gap-2 items-center text-blue-800'>
//                 <Lightbulb/>
//                 <strong>Note:</strong>
//                 <strong className='text-yellow-600'>All Questions are Compulsory</strong>
//             </h2>
//             <h2 className='text-sm text-blue-700 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
//         </div>
//     </div>
//   )
// }

// export default QuestionsSection

"use client"
import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    // Method for hearing question
    console.log(mockInterviewQuestion);
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, Your Browser does not support Text-to-Speech');
        }
    };

    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 key={index} className={`p-2 bg-secondary rounded-full
                     text-xs md:text-sm text-center cursor-pointer font-bold
                     ${activeQuestionIndex === index && 'bg-blue-700 text-white'}`}>
                        Question #{index + 1}
                    </h2>
                ))}
            </div>
            {mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex] ? (
                <>
                    <h2 className='my-5 text-md md:text-lg'>
                        {mockInterviewQuestion[activeQuestionIndex].question}
                    </h2>
                    <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex].question)} />
                </>
            ) : (
                <h2 className='my-5 text-md md:text-lg text-red-500'>Question not available</h2>
            )}

            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-blue-800'>
                    <Lightbulb />
                    <strong>Note:</strong>
                    <strong className='text-yellow-600'>All Questions are Compulsory</strong>
                </h2>
                <h2 className='text-sm text-blue-700 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    );
}

export default QuestionsSection;

