import { useExamStore } from '../store/examStore';

// Inside your exam component
const handleSubmit = () => {
  useExamStore.getState().submitExam();
}; 