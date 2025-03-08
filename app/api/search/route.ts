// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';


import dbConnect from '@/database/connection';
import Courses from '@/database/models/course.schema';
import User from '@/database/models/user.schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
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

    return res.status(200).json({
      courses,
      users,
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}