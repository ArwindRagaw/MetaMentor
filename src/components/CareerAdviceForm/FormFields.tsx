import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EDUCATION_OPTIONS } from './constants'
import type { FormData } from './types'

interface FormFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleEducationChange: (value: string) => void;
}

export function FormFields({ formData, handleChange, handleEducationChange }: FormFieldsProps) {
  return (
    <>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="education">Education</Label>
        <Select onValueChange={handleEducationChange} value={formData.education}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your education level" />
          </SelectTrigger>
          <SelectContent>
            {EDUCATION_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="interests">Interests</Label>
        <Textarea
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}