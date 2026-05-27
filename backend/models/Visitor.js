import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    hostEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'checked-in', 'checked-out'],
      default: 'pending',
    },
    checkInTime: {
      type: Date,
      default: null,
    },
    checkOutTime: {
      type: Date,
      default: null,
    },
    qrCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Visitor', visitorSchema);
