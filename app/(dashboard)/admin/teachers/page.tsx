'use client'
import UserCard from "@/components/user-card-filter"
import { Role } from "@/database/models/user.schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users/userSlice";
import { useEffect } from "react";

export default function Teachers() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const filteredTeacher = users.filter((user) => user.role === Role.Teacher);

  return (
    <div className="container mx-auto p-4">
      {filteredTeacher.length > 0 ? (
        <UserCard users={filteredTeacher} />
      ) : (
        <span className=" text-gray-400 ">No Teacher found !!!</span>
      )}
    </div>
  );
}
