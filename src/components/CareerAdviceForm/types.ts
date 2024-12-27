export interface FormData {
  name: string;
  age: string;
  education: string;
  interests: string;
  skills: string;
}

export interface CareerAdviceFormProps {
  onBack: () => void;
}