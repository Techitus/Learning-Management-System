import UserCard from "@/components/user-card-filter"

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-01-15",
    email: "alice@example.com",
    mobile: "+1234567890",
    courses: ["React", "Node.js"],
  },
  {
    id: 2,
    name: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-03-22",
    email: "bob@example.com",
    mobile: "+1987654321",
    courses: ["Python", "Data Science"],
  },
  {
    id: 3,
    name: "Charlie Brown",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-02-10",
    email: "charlie@example.com",
    mobile: "+1122334455",
    courses: ["JavaScript", "React"],
  },
  {
    id: 4,
    name: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-01-15",
    email: "alice@example.com",
    mobile: "+1234567890",
    courses: ["React", "Node.js"],
  },
  {
    id: 5,
    name: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-03-22",
    email: "bob@example.com",
    mobile: "+1987654321",
    courses: ["Python", "Data Science"],
  },
  {
    id: 6,
    name: "Charlie Brown",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-02-10",
    email: "charlie@example.com",
    mobile: "+1122334455",
    courses: ["JavaScript", "React"],
  },
  {
    id: 7,
    name: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-01-15",
    email: "alice@example.com",
    mobile: "+1234567890",
    courses: ["React", "Node.js"],
  },
  {
    id: 8,
    name: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-03-22",
    email: "bob@example.com",
    mobile: "+1987654321",
    courses: ["Python", "Data Science"],
  },
  {
    id: 9,
    name: "Charlie Brown",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-02-10",
    email: "charlie@example.com",
    mobile: "+1122334455",
    courses: ["JavaScript", "React"],
  },
  {
    id: 10,
    name: "Alice Johnson",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-01-15",
    email: "alice@example.com",
    mobile: "+1234567890",
    courses: ["React", "Node.js"],
  },
  {
    id: 11,
    name: "Bob Smith",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-03-22",
    email: "bob@example.com",
    mobile: "+1987654321",
    courses: ["Python", "Data Science"],
  },
  {
    id: 12,
    name: "Charlie Brown",
    image: "/placeholder.svg?height=100&width=100",
    joinedDate: "2023-02-10",
    email: "charlie@example.com",
    mobile: "+1122334455",
    courses: ["JavaScript", "React"],
  },
]

export default function Users() {
  return (
    <div className="container mx-auto p-4">
      <UserCard users={users} />
    </div>
  )
}

