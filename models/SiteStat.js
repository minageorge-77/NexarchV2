import mongoose from "mongoose";

const SiteStatSchema = new mongoose.Schema(
  {
    implantLeads: {
      type: Number,
      default: 412,
      required: [true, "Please provide implant leads count"],
    },
    implantLeadsLabel: {
      type: String,
      default: "Implant Leads",
    },
    consultations: {
      type: Number,
      default: 158,
      required: [true, "Please provide consultations count"],
    },
    consultationsLabel: {
      type: String,
      default: "Consultations",
    },
    monthlyProduction: {
      type: Number,
      default: 48920,
      required: [true, "Please provide monthly production value"],
    },
    monthlyProductionLabel: {
      type: String,
      default: "Monthly production",
    },
    featuredImageUrl: {
      type: String,
      default: "/results.png",
    },
    featuredClinicName: {
      type: String,
      default: "Summit Implant & Oral Surgery",
    },
    featuredLocation: {
      type: String,
      default: "Buda, TX",
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteStat || mongoose.model("SiteStat", SiteStatSchema);
