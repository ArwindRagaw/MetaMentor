import { FormData } from '@/components/CareerAdviceForm/types';

const API_KEY = 'AIzaSyB7M6eP2qMS-nqqi-Rzp7GsAE-hUqDSRoI';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateCareerAdvice(formData: FormData) {
  const prompt = `As a friendly career advisor, provide personalized advice for:

    Name: ${formData.name}
    Age: ${formData.age}
    Education: ${formData.education}
    Interests: ${formData.interests}
    Skills: ${formData.skills}
    
    Please structure your response in the following sections, maintaining a warm and encouraging tone throughout. Address ${formData.name} by name and provide specific advice based on their age of ${formData.age}:

    1. Personal Introduction
    - Start with a friendly greeting using their name
    - Acknowledge their current situation and aspirations

    2. Career Recommendations
    - Suggest 3-4 specific career paths
    - Include salary ranges for each role (entry-level to experienced)
    - Explain why these align with their interests and skills

    3. Growth Opportunities
    - Discuss potential career progression
    - Mention specific certifications or additional qualifications
    - Include timeline estimates for career milestones

    4. Next Steps
    - Provide actionable items they can start today
    - Suggest networking opportunities
    - Recommend specific learning resources

    5. Salary Insights
    - Provide detailed salary progression timelines
    - Include factors that can increase earning potential
    - Mention industry-specific bonuses or benefits

    Keep the tone conversational and encouraging, focusing on practical advice and realistic salary expectations based on their age and experience level.`;

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response from API:', errorData);
    console.error('Response status:', response.status);
    console.error('Response status text:', response.statusText);
    throw new Error(`Failed to generate career advice: ${errorData.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  
  // Clean up any remaining asterisks or markdown formatting
  return rawText.replace(/\*/g, '').trim();
}