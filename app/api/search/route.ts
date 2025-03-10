import dbConnect from '@/database/connection';
import Courses from '@/database/models/course.schema';
import User from '@/database/models/user.schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const searchRegex = new RegExp(query, 'i');

    const [courses, users] = await Promise.all([
      Courses.find({
        $or: [
          { courseName: { $regex: searchRegex } },
          { courseDescription: { $regex: searchRegex } },
        ],
      }).limit(10).lean(),

      User.find({
        $or: [
          { username: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      }).limit(10).lean(),
    ]);

    return NextResponse.json({ courses, users }, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
