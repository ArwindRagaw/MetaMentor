import { useState } from 'react';
import type { FormData } from './types';
import { generateCareerAdvice } from '@/lib/gemini';

export function useCareerAdvice() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    education: '',
    interests: '',
    skills: ''
  });
  const [advice, setAdvice] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const generatedAdvice = await generateCareerAdvice(formData);
      setAdvice(generatedAdvice);
      // Set a relevant career path image from Unsplash
      setImagePath('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80');
    } catch (err) {
      setError('An error occurred while generating career advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEducationChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      education: value
    }));
  };

  return {
    formData,
    advice,
    imagePath,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleEducationChange
  };
}