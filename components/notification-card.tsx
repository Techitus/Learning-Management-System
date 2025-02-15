import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Notifications() {
  return (
    <Card className="bg-black text-white border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Notifications</CardTitle>
        <p className="text-sm text-zinc-400">You have 5 unread notifications</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-9 w-9 border border-zinc-700">
            <Image src="/placeholder.svg?height=32&width=32" alt="Avatar" width={32} height={32}/>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">New message from Alex</p>
            <p className="text-sm text-zinc-400">Check your inbox for details</p>
          </div>
          <p className="text-xs text-zinc-400">5m ago</p>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="h-9 w-9 border border-zinc-700 bg-emerald-500">
            <span className="text-sm">✓</span>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Task completed</p>
            <p className="text-sm text-zinc-400">Project milestone reached</p>
          </div>
          <p className="text-xs text-zinc-400">2h ago</p>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="h-9 w-9 border border-zinc-700 bg-amber-500">
            <span className="text-sm">!</span>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">System update</p>
            <p className="text-sm text-zinc-400">Maintenance scheduled for tonight</p>
          </div>
          <p className="text-xs text-zinc-400">1d ago</p>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="h-9 w-9 border border-zinc-700">
          <Image src="/placeholder.svg?height=32&width=32" alt="Avatar" width={32} height={32}/>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Team invite</p>
            <p className="text-sm text-zinc-400">Join the Design team</p>
          </div>
          <p className="text-xs text-zinc-400">2d ago</p>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="h-9 w-9 border border-zinc-700">
          <Image src="/placeholder.svg?height=32&width=32" alt="Avatar" width={32} height={32}/>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Project update</p>
            <p className="text-sm text-zinc-400">New version deployed</p>
          </div>
          <p className="text-xs text-zinc-400">3d ago</p>
        </div>
      </CardContent>
    </Card>
  )
}

