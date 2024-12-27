import { Button } from "@/components/ui/button"
import { FormFields } from './FormFields'
import { AdviceDisplay } from './AdviceDisplay'
import { useCareerAdvice } from './useCareerAdvice'
import type { CareerAdviceFormProps } from './types'

export default function CareerAdviceForm({ onBack }: CareerAdviceFormProps) {
  const {
    formData,
    advice,
    imagePath,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleEducationChange
  } = useCareerAdvice();

  return (
    <div className="container mx-auto p-4">
      <Button onClick={onBack} variant="outline" className="mb-4">
        Back to Quick Advice
      </Button>
      <h1 className="text-2xl font-bold mb-4">Career Advice Generator</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormFields
          formData={formData}
          handleChange={handleChange}
          handleEducationChange={handleEducationChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating Advice...' : 'Get Career Advice'}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <AdviceDisplay advice={advice} imagePath={imagePath} />
    </div>
  );
}