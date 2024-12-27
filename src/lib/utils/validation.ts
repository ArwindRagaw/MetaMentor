import { z } from 'zod';
import { EDUCATION_OPTIONS } from '@/components/CareerAdviceForm/constants';

export const careerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 16 && num <= 100;
  }, 'Age must be between 16 and 100'),
  education: z.enum([...EDUCATION_OPTIONS] as [string, ...string[]]),
  interests: z.string().min(10, 'Please provide more detail about your interests'),
  skills: z.string().min(10, 'Please provide more detail about your skills')
});