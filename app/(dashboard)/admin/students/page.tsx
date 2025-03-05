'use client'
import UserCard from "@/components/user-card-filter"
import { Role } from "@/database/models/user.schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users/userSlice";
import { useEffect } from "react";



export default function Students() {
   const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
     
    useEffect(() => {
      dispatch(fetchUsers()); 
    }, [dispatch]); 
    const filteredStudent = users.filter((user) => user.role === Role.Student);
  return (
    <div className="container mx-auto p-4">
      <UserCard users={filteredStudent} showAdminEnroll={true} />
    </div>
  )
}

