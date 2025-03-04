"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnrollmentStatus } from "@/database/models/enrolement.schema";

interface handleClickProps {
  handleClick: (status: EnrollmentStatus) => void;
}

export function StatusSelection({ handleClick }: handleClickProps) {
  const [status, setStatus] = useState<EnrollmentStatus>(EnrollmentStatus.PENDING);
  return (
    <div className="flex flex-col max-w-xs p-4 border rounded-md shadow-sm">
      <h2 className="text-sm font-semibold mb-2">Change Enrollment Status</h2>

      <RadioGroup
        value={status}
        onValueChange={(value: EnrollmentStatus) => setStatus(value as EnrollmentStatus)}
        className="space-y-1"
      >
        {[
          { value: EnrollmentStatus.APPROVE, label: "Approve", icon: CheckCircle2, color: "text-green-600", border: "border-green-500" },
          { value: EnrollmentStatus.PENDING, label: "Pending", icon: Clock, color: "text-yellow-500", border: "border-yellow-500" },
          { value: EnrollmentStatus.REJECTED, label: "Reject", icon: XCircle, color: "text-red-600", border: "border-red-500" }
        ].map(({ value, label, icon: Icon, color, border }) => (
          <div key={value} className={`flex items-center gap-2 p-2 border rounded-md text-sm ${border}`}>
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value} className={cn("flex items-center gap-1 cursor-pointer", status === value && color)}>
              <Icon className={`h-4 w-4 ${status === value ? color : "text-gray-500"}`} />
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button onClick={() => handleClick(status)}  variant="secondary" className="w-full mt-3 py-1 text-sm text-white">
        <Save className="h-4 w-4 mr-1" />
        Change
      </Button>
     

    </div>
  );
}
