import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Please provide the client name"],
    },
    clientTitle: {
      type: String,
      required: [true, "Please provide the client title"],
    },
    company: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
