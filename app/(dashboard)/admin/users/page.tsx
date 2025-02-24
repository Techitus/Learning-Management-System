"use client"
import UserCard from "@/components/user-card-filter"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchUsers } from "@/store/users/userSlice"
import { useEffect } from "react"

export default function Users() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
   
  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]); 

  return (
    <div className="container mx-auto p-4">
     
        <UserCard users={users} />
     
    </div>
  );
}
