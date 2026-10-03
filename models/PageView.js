import mongoose from "mongoose";

const PageViewSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: "90d" }, // TTL index to automatically delete documents after 90 days
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// Index on path and createdAt for faster dashboard querying
PageViewSchema.index({ path: 1, createdAt: -1 });

export default mongoose.models.PageView || mongoose.model("PageView", PageViewSchema);
