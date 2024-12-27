import { useState } from 'react';
import { pmSalaryData, ageBasedGuidance } from '../../data/projectManagementCareerData';
import { ChevronDown, ChevronUp, DollarSign, GraduationCap } from 'lucide-react';

export function ProjectManagementCareerDetails() {
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
          Project Management Career Path
        </h3>
        
        <div className="space-y-4">
          {pmSalaryData.map((level) => (
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
                {level.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <button
          onClick={() => setShowGuidance(!showGuidance)}
          className="w-full flex items-center justify-between text-xl font-semibold text-gray-900 dark:text-white mb-4"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span>Age-Based Guidance</span>
          </div>
          {showGuidance ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showGuidance && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="number"
                min="13"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age..."
                className="p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {guidance && (
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    Recommendations for age {age}:
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {guidance.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    Suggested Learning Path:
                  </h5>
                  <ul className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {guidance.learningPath.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 