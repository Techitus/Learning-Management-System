import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAppSelector } from "@/store/hooks";
import { EnrollmentStatus } from "@/database/models/enrolement.schema";
import { JSX } from "react";

type Notification = {
  avatar: string;
  isImage: boolean;
  message: JSX.Element;
  time?: string;
};

export default function Notifications() {
  const { users } = useAppSelector((state) => state.users);
  const { courses } = useAppSelector((state) => state.courses);
  const { enrollments } = useAppSelector((state) => state.enrollments);
  const { lessons } = useAppSelector((state) => state.lessons);
  const { categories } = useAppSelector((state) => state.categories);
  const { notes } = useAppSelector((state) => state.notes);

  const getInitials = (name: string) => name.slice(0, 2).toUpperCase();

  const formatTime = (timestamp: string) =>
    formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const notifications: Notification[] = [
    ...users.map((user) => ({
      avatar: user.profileImage || getInitials(user.username),
      isImage: !!user.profileImage,
      message: (
        <>
          <span className="text-blue-400">{user.username}</span> has joined
        </>
      ),
      time: formatTime(user.createdAt),
    })),
    ...courses.map((course) => ({
      avatar: getInitials(course.courseName),
      isImage: false,
      message: (
        <>
          <span className="text-green-400">{course.courseName}</span> was added by Admin
        </>
      ),
      time: formatTime(course.createdAt),
    })),
    ...enrollments.map((enrollment) => ({
      avatar: getInitials(enrollment.student.username),
      isImage: false,
      message: enrollment.enrollmentStatus === EnrollmentStatus.APPROVE ? (
        <>
          <span className="text-blue-400">{enrollment.student.username}</span> enrolled in{" "}
          <span className="text-green-400">{enrollment.course.courseName}</span>
        </>
      ) : (
        <>
          <span className="text-blue-400">{enrollment.student.username}</span> is trying to purchase{" "}
          <span className="text-green-400">{enrollment.course.courseName}</span>
        </>
      ),
      time: formatTime(new Date(enrollment.enrollAt).toISOString()),
    })),
    ...lessons.map((lesson) => ({
      avatar: getInitials(lesson.title),
      isImage: false,
      message: (
        <>
          A new lesson <span className="text-yellow-400">{lesson.title}</span> has been added
        </>
      ),
    })),
    ...categories.map((category) => ({
      avatar: getInitials(category.name),
      isImage: false,
      message: (
        <>
          New category <span className="text-purple-400">{category.name}</span> added
        </>
      ),
      time: formatTime(category.createdAt || new Date().toISOString()),
    })),
    ...notes.map((note) => ({
      avatar: getInitials(note.attachment),
      isImage: false,
      message: (
        <>
          A new note <span className="text-red-400">{note.attachment}</span> has been uploaded
        </>
      ),
    })),
  ];

  const latestNotifications = notifications.slice(0, 5);

  return (
    <Card className="bg-black text-white border-zinc-800 h-full max-h-[50vh] md:h-[35vh] 2xl:h-[40vh] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Notifications</CardTitle>
        <p className="text-sm text-zinc-400">{latestNotifications.length} unread notifications</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestNotifications.map((notification, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Avatar className="h-9 w-9 border border-zinc-700 bg-zinc-700 text-white flex items-center justify-center font-bold">
              {notification.isImage ? (
                <Image
                  src={notification.avatar as string}
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <span className="text-sm">{notification.avatar}</span>
              )}
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{notification.message}</p>
            </div>
            <p className="text-xs text-zinc-400">{notification.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
