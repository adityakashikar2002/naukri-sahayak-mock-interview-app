// // Inside app/api/update-overall-rating/route.js
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   const { mockId, overallRating } = await request.json();

//   try {
//     // Update the MockInterview table with the overall rating
//     await db.update(MockInterview)
//       .set({ overallrating: overallRating })
//       .where({ mockId });

//     return NextResponse.json({ message: 'Overall rating updated successfully' });
//   } catch (error) {
//     console.error('Error updating overall rating:', error);
//     return NextResponse.json({ error: 'Error updating overall rating' }, { status: 500 });
//   }
// }
// Inside app/api/update-overall-rating/route.js
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm'; // Import equality operator for the where clause

export async function POST(request) {
  const { mockId, overallRating } = await request.json();

  try {
    // Update the MockInterview table with the overall rating
    await db.update(MockInterview)
      .set({ overallrating: overallRating })
      .where(eq(MockInterview.mockId, mockId)); // Use correct equality operator for the where clause

    return NextResponse.json({ message: 'Overall rating updated successfully' });
  } catch (error) {
    console.error('Error updating overall rating:', error);
    return NextResponse.json({ error: 'Error updating overall rating' }, { status: 500 });
  }
}
