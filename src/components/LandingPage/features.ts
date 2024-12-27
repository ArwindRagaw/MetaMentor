import { BrainCog, GraduationCap, Lightbulb } from "lucide-react";

export const features = [
  {
    Icon: BrainCog,
    title: "AI-Powered Insights",
    description: "Leverage cutting-edge AI technology to receive tailored career recommendations.",
    iconColor: "text-blue-600"
  },
  {
    Icon: GraduationCap,
    title: "Educational Guidance",
    description: "Get advice on educational paths that align with your career goals.",
    iconColor: "text-purple-600"
  },
  {
    Icon: Lightbulb,
    title: "Personalized Plans",
    description: "Receive customized action plans based on your skills and interests.",
    iconColor: "text-indigo-600"
  }
] as const;