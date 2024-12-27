import { useState } from 'react';
import { uxuiSalaryData, ageBasedGuidance } from '../../data/uxuiCareerData';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

export function UXUICareerDetails() {
  const [age, setAge] = useState('');
  const [showGuidance, setShowGuidance] = useState(false);

  const getGuidanceForAge = (age: string) => {
    const ageNum = parseInt(age);
    if (ageNum >= 13 && ageNum <= 17) return ageBasedGuidance[0];
    if (ageNum >= 18 && ageNum <= 24) return ageBasedGuidance[1];
    if (ageNum >= 25) return ageBasedGuidance[2];
    return null;
  };

  const guidance = age ? getGuidanceForAge(age) : null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          UX/UI Design Career Path
        </h3>
        
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          className="mb-4 p-2 border rounded"
        />
        
        {guidance && (
          <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <button
              onClick={() => setShowGuidance(!showGuidance)}
              className="flex items-center justify-between w-full"
            >
              <span className="text-indigo-700 dark:text-indigo-300 font-medium">
                Age-Based Guidance
              </span>
              {showGuidance ? (
                <ChevronUp className="w-5 h-5 text-indigo-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-indigo-500" />
              )}
            </button>
            {showGuidance && (
              <div className="mt-2 text-sm text-indigo-600 dark:text-indigo-300">
                <div>
                  {guidance.recommendations.map((rec, index) => (
                    <p key={index} className="mb-1">{rec}</p>
                  ))}
                </div>
                <div className="mt-2">
                  {guidance.learningPath.map((path, index) => (
                    <p key={index} className="mb-1">{path}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          {uxuiSalaryData.map((level) => (
            <div
              key={level.level}
              className="border dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {level.level}
                </h4>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{level.salaryRange}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Experience: {level.experience}
              </p>
              <div className="flex flex-wrap gap-2">
                {level.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}