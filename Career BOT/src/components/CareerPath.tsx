import { useCareerStore } from '../store/careerStore';
import { Code, Briefcase, Palette, Database } from 'lucide-react';
import { FrontendCareerDetails } from './career/FrontendCareerDetails';
import { BackendCareerDetails } from './career/BackendCareerDetails';
import { UXUICareerDetails } from './career/UXUICareerDetails';
import { ProjectManagementCareerDetails } from './career/ProjectManagementCareerDetails';

const careerPaths = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code,
    description: 'Create beautiful and interactive user interfaces',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Database,
    description: 'Build robust server-side applications and APIs',
  },
  {
    id: 'ux',
    title: 'UX/UI Design',
    icon: Palette,
    description: 'Design intuitive and engaging user experiences',
  },
  {
    id: 'pm',
    title: 'Project Management',
    icon: Briefcase,
    description: 'Lead teams and deliver successful projects',
  },
];

export function CareerPath() {
  const { selectedPath, setSelectedPath } = useCareerStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerPaths.map(({ id, title, icon: Icon, description }) => (
          <button
            key={id}
            onClick={() => setSelectedPath(id)}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedPath === id
                ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500'
            } dark:bg-gray-800`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedPath === 'frontend' && <FrontendCareerDetails />}
      {selectedPath === 'backend' && <BackendCareerDetails />}
      {selectedPath === 'ux' && <UXUICareerDetails />}
      {selectedPath === 'pm' && <ProjectManagementCareerDetails />}
    </div>
  );
}