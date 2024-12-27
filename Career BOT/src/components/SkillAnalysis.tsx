import React from 'react';
import { useCareerStore } from '../store/careerStore';
import { Plus, X } from 'lucide-react';

export function SkillAnalysis() {
  const { skills, addSkill, removeSkill } = useCareerStore();
  const [newSkill, setNewSkill] = React.useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
      <form onSubmit={handleAddSkill} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span className="dark:text-white">{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}