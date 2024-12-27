import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCourseStore = create(
  persist(
    (set) => ({
      courses: [],
      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, { 
            ...course, 
            id: Date.now(), 
            topics: [], 
            progress: 0 
          }],
        })),
      updateTopics: (courseId, topics) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId ? {
              ...course,
              topics: topics.map(t => ({
                ...t,
                id: t.id,
                completed: false,
                subtopics: [],
                isLearning: false
              }))
            } : course
          ),
        })),
      updateSubTopics: (courseId, topicId, subtopics) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  topics: course.topics.map((topic) =>
                    topic.id === topicId
                      ? { ...topic, subtopics, isLearning: true }
                      : topic
                  ),
                }
              : course
          ),
        })),
      updateProgress: (courseId, topicId, score) =>
        set((state) => ({
          courses: state.courses.map((course) => {
            if (course.id === courseId) {
              const updatedTopics = course.topics.map((topic) =>
                topic.id === topicId ? { ...topic, completed: true, score } : topic
              );
              const completedTopics = updatedTopics.filter((t) => t.completed).length;
              const progress = Math.round((completedTopics / updatedTopics.length) * 100);
              return { ...course, topics: updatedTopics, progress };
            }
            return course;
          }),
        })),
      updateFinalScore: (courseId, score) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? { ...course, finalScore: score, finalTestCompleted: true }
              : course
          ),
        })),
    }),
    {
      name: 'course-storage',
    }
  )
);

export default useCourseStore;