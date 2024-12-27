import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MockTest from '../components/MockTest';
import ProctorCamera from '../components/ProctorCamera';
import { Recordings } from '../components/Recordings';
import { useExamStore } from '../store/examStore';
import useCourseStore from '../store/courseStore';
import { generateQuestions } from '../services/gemini';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function MockTestPage() {
  const { courseId, topicId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const navigate = useNavigate();
  const { courses, updateProgress } = useCourseStore();
  const { setExamActive } = useExamStore();

  const course = courses.find((c) => c.id === parseInt(courseId));
  const topic = course?.topics.find((t) => t.id === parseInt(topicId));

  useEffect(() => {
    const fetchQuestions = async () => {
      if (topic) {
        setLoading(true);
        setError(null);
        try {
          const questions = await generateQuestions(topic.title);
          setQuestions(questions);
        } catch (error) {
          setError(error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleTestComplete = (score) => {
    updateProgress(parseInt(courseId), parseInt(topicId), score);
    if (score >= 60) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    toast.success(`Test completed! Score: ${score}%`);
    navigate(`/course/${courseId}`);
  };

  const startExam = () => {
    setExamActive(true);
    setHasStarted(true);
  };

  useEffect(() => {
    return () => {
      setExamActive(false);
      const stream = useExamStore.getState().stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [setExamActive]);

  if (!hasStarted) {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Mock Test - {topic?.title}</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Before you begin:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>This is a proctored examination</li>
              <li>Your webcam will be activated during the test</li>
              <li>Multiple faces or no face detection will be flagged</li>
              <li>You need to complete all questions</li>
              <li>Passing score is 60%</li>
            </ul>
          </div>
          <button
            onClick={startExam}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ProctorCamera />
      <Recordings />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mock Test - {topic?.title}</h1>
        {!loading && !error && (
          <MockTest 
            questions={questions} 
            onComplete={(score) => {
              setExamActive(false);
              handleTestComplete(score);
            }} 
          />
        )}
      </div>
    </div>
  );
}