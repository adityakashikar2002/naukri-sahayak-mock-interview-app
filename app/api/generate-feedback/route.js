// import { NextResponse } from 'next/server';
// import { spawn } from 'child_process';

// export async function POST(request) {
//   const { correctAnswer, userAnswer } = await request.json();

//   try {
//     // Escape quotes in answers
//     //const escapedCorrectAnswer = correctAnswer.replace(/"/g, '\\"'); // Escape double quotes
//     //const escapedUserAnswer = userAnswer.replace(/"/g, '\\"');

//     // Run Python script asynchronously
//     const pythonProcess = spawn('python', ['feedback_model.py', correctAnswer, userAnswer]);

//     let feedback='';
//     pythonProcess.stdout.on('data', (data) => {
//       feedback = JSON.parse(data.toString());
//     });

//     pythonProcess.stderr.on('data', (error) => {
//       console.error('Error running Python script:', error.toString());
//     });

//     await new Promise((resolve) => pythonProcess.on('close', resolve));

//     if (feedback) {
//       return NextResponse.json(feedback);
//     } else {
//       // Handle case where feedback is not received from Python script
//       throw new Error('Error generating feedback');
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//     return NextResponse.json({ error: 'Error generating feedback' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request) {
  const { correctAnswer, userAnswer } = await request.json();

  try {
    // Sanitize input to ensure it doesn't cause issues
  const sanitizedCorrectAnswer = correctAnswer.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const sanitizedUserAnswer = userAnswer.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    // Log request payload for debugging
    console.log('Request Payload:', { sanitizedCorrectAnswer, sanitizedUserAnswer });

    // Run Python script asynchronously
    const pythonProcess = spawn('python', ['feedback_model.py', sanitizedCorrectAnswer, sanitizedUserAnswer]);

    let feedback = '';
    pythonProcess.stdout.on('data', (data) => {
      feedback += data.toString(); // Accumulate data
    });

    pythonProcess.stderr.on('data', (error) => {
      console.error('Python script stderr:', error.toString());
    });

    pythonProcess.on('error', (err) => {
      console.error('Error spawning Python process:', err);
      throw new Error('Error spawning Python process');
    });

    // Ensure Python script completion
    await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}`));
        } else {
          resolve();
        }
      });
    });

    // Try parsing and returning the feedback
    try {
      const parsedFeedback = JSON.parse(feedback);
      return NextResponse.json(parsedFeedback);
    } catch (error) {
      console.error('Error parsing feedback:', error.message);
      return NextResponse.json({ error: 'Error parsing feedback' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: 'Error generating feedback' }, { status: 500 });
  }
}

    