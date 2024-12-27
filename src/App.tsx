import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import CareerAdviceForm from '@/components/CareerAdviceForm';

export default function App() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <CareerAdviceForm onBack={() => setShowForm(false)} />;
  }

  return <LandingPage onGetStarted={() => setShowForm(true)} />;
}