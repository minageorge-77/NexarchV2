import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  clinicName: {
    type: String,
    required: [true, 'Clinic name is required'],
    trim: true,
  },
  interestedService: {
    type: String,
    trim: true,
    default: "",
  },
  message: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    enum: ['New', 'Read'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
