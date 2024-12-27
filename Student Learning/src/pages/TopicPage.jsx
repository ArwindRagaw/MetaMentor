import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateSubTopics, generateSubtopicExplanation, generateDetailedExplanation } from '../services/gemini';
import useCourseStore from '../store/courseStore';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import LearningChat from '../components/LearningChat';

export default function TopicPage() {
  const { courseId, topicId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [detailedExplanation, setDetailedExplanation] = useState('');
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);
  const { courses, updateSubTopics } = useCourseStore();
  
  const course = courses.find((c) => c.id === parseInt(courseId));
  const topic = course?.topics.find((t) => t.id === parseInt(topicId));

  useEffect(() => {
    const loadTopicDetails = async () => {
      if (!topic?.subtopics?.length) {
        setLoading(true);
        try {
          const subtopics = await generateSubTopics(topic.title);
          updateSubTopics(parseInt(courseId), parseInt(topicId), subtopics);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    loadTopicDetails();
  }, [topic, courseId, topicId, updateSubTopics]);

  const handleSubtopicClick = async (subtopic) => {
    setSelectedSubtopic(subtopic);
    setShowDetailedExplanation(false);
    setLoading(true);
    try {
      const explanationText = await generateSubtopicExplanation(subtopic.title);
      const cleanExplanation = explanationText
        .replace(/\*\*/g, '')
        .split('\n')
        .filter(line => line.trim())
        .join('\n');
      setExplanation(cleanExplanation);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailedExplanation = async () => {
    if (!selectedSubtopic) return;
    setLoading(true);
    try {
      const detailed = await generateDetailedExplanation(selectedSubtopic.title);
      const cleanDetailed = detailed
        .replace(/\*\*/g, '')
        .split('\n')
        .filter(line => line.trim())
        .join('\n');
      setDetailedExplanation(cleanDetailed);
      setShowDetailedExplanation(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!topic) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Topic not found</p>
        <Link to={`/course/${courseId}`} className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          Return to Course
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Link to={`/course/${courseId}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Course
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {topic.title}
          </h1>
          <p className="text-gray-600">{topic.description}</p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Subtopics List */}
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Subtopics</h2>
              {topic.subtopics?.map((subtopic, index) => (
                <div key={index} className="space-y-2">
                  <button
                    onClick={() => handleSubtopicClick(subtopic)}
                    className={`w-full p-4 rounded-lg text-left transition-all transform hover:scale-105 ${
                      selectedSubtopic?.title === subtopic.title
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <h3 className="font-medium">{subtopic.title}</h3>
                  </button>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="md:col-span-2 space-y-6">
              {selectedSubtopic && (
                <>
                  {/* Basic Explanation */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      {selectedSubtopic.title}
                    </h2>
                    <div className="prose max-w-none">
                      {explanation.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleDetailedExplanation}
                      className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all"
                    >
                      {showDetailedExplanation ? 'Hide Detailed Explanation' : 'Show Detailed Explanation'}
                    </button>
                  </div>

                  {/* Detailed Explanation */}
                  {showDetailedExplanation && detailedExplanation && (
                    <div className="bg-white rounded-lg shadow-lg p-6 animate-slideUp">
                      <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Detailed Explanation
                      </h2>
                      <div className="prose max-w-none">
                        {detailedExplanation.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat Interface */}
                  <div className="mt-6">
                    <LearningChat context={selectedSubtopic.title} />
                  </div>
                </>
              )}

              {!selectedSubtopic && (
                <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-8 text-center animate-pulse">
                  <p className="text-gray-600">Select a subtopic to view its content</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}