import { LucideIcon } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

export function FeatureCard({ Icon, title, description, iconColor }: FeatureCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <Icon className={`w-12 h-12 ${iconColor} mb-4`} />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Card>
  );
}