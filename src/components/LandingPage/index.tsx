import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { features } from "./features";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI Career Guidance
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get personalized career advice powered by advanced AI. Make informed decisions about your professional future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg"
          >
            Get Career Advice
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}