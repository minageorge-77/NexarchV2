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
    required: [true, 'Phone number is required'],
    trim: true,
  },
  clinicName: {
    type: String,
    required: [true, 'Clinic name is required'],
    trim: true,
  },
  monthlyEnquiries: {
    type: String,
    required: [true, 'Monthly enquiries is required'],
    trim: true,
  },
  consultationDate: {
    type: String,
    required: [true, 'Consultation date is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
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
