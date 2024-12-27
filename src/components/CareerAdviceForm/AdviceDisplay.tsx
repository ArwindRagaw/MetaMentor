import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface AdviceDisplayProps {
  advice: string;
  imagePath: string;
}

export function AdviceDisplay({ advice, imagePath }: AdviceDisplayProps) {
  if (!advice) return null;

  return (
    <Card className="mt-8 p-6 bg-white shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Your Personalized Career Advice</h2>
      <ScrollArea className="h-[500px] rounded-md border p-6">
        <div className="space-y-6">
          {advice.split('\n\n').map((paragraph, index) => {
            if (paragraph.includes(':')) {
              const [title, content] = paragraph.split(':');
              return (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {title.trim()}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {content.trim()}
                  </p>
                  <Separator className="my-4" />
                </div>
              );
            }
            return (
              <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </ScrollArea>
      {imagePath && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Career Path Visualization</h3>
          <div className="rounded-lg overflow-hidden">
            <img 
              src={imagePath} 
              alt="Career Path" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      )}
    </Card>
  );
}