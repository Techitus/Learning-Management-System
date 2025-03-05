import mongoose, { Schema, Document } from "mongoose";

export enum EnrollmentStatus {
  APPROVE = "approve",
  REJECTED = "rejected",
  PENDING = "pending",
}

interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  whatsapp: string;
  enrollAt: Date;
  enrollmentStatus: EnrollmentStatus;
  paymentVerification: string;
}

const enrollmentSchema = new Schema<IEnrollment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
  },
  whatsapp: {
    type: String,
    required: true,
  },
  paymentVerification: {
    type: String,
  },
  enrollmentStatus: {
    type: String,
    enum: Object.values(EnrollmentStatus),
    default: EnrollmentStatus.PENDING,
  },
  enrollAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

