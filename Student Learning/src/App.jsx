import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import CoursePage from './pages/CoursePage';
import TopicPage from './pages/TopicPage';
import MockTestPage from './pages/MockTestPage';
import Login from './components/Login';
import useAuthStore from './store/authStore';
import ProctorCamera from './components/ProctorCamera';

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && (
          <nav className="bg-indigo-600 text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Learning Platform</h1>
              <button
                onClick={logout}
                className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <CourseList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-course"
            element={
              <PrivateRoute>
                <CourseForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <PrivateRoute>
                <CoursePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:courseId/topic/:topicId"
            element={
              <PrivateRoute>
                <TopicPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:courseId/topic/:topicId/test"
            element={
              <PrivateRoute>
                <div>
                  <ProctorCamera />
                  <MockTestPage />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;