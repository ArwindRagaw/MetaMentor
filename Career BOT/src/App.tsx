import React, { useEffect, useState } from 'react';
import { ChatBot } from './components/ChatBot';
import { SkillAnalysis } from './components/SkillAnalysis';
import { CareerPath } from './components/CareerPath';
import { ThemeToggle } from './components/ThemeToggle';
import { Rocket } from 'lucide-react';
import { useThemeStore } from './store/themeStore';
import { UserProfileForm } from './components/profile/UserProfileForm';

function App() {
  const { isDarkMode } = useThemeStore();
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Career Planner</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowProfileForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Complete Profile
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {showProfileForm && (
        <UserProfileForm
          onClose={() => setShowProfileForm(false)}
          careerPath=""
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Choose Your Path</h2>
              <CareerPath />
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Track Your Skills</h2>
              <SkillAnalysis />
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">AI Career Assistant</h2>
            <ChatBot />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;