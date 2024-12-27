import * as React from 'react';
import { useExamStore } from '../store/examStore';

const SubmitButton: React.FC = () => {
  const { submitExam } = useExamStore();

  const handleSubmit = async () => {
    await submitExam();
  };

  return (
    <button 
      onClick={handleSubmit}
      className="submit-button"
    >
      Submit Test
    </button>
  );
};

export default SubmitButton; 