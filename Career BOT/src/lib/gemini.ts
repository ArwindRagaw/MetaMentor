import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserProfile } from '../types/user';

const genAI = new GoogleGenerativeAI('AIzaSyB7M6eP2qMS-nqqi-Rzp7GsAE-hUqDSRoI');

export async function getCareerAdvice(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  try {
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `As a career advisor, provide brief, focused advice about: ${prompt}
          
          Guidelines:
          - Use a warm and encouraging tone to foster confidence and motivation.
          - Be specific and actionable.
          - Provide concise, empathetic, and supportive advice tailored to women’s career journeys.
          - Highlight actionable steps with a focus on empowering the user to make informed decisions.
          - Include examples and resources that cater to women-specific challenges and opportunities.
          - Use words like darling, sweetheart, etc.
          - Highlight real-world resources such as courses, certifications, and tools.
          - Offer pathways for career growth and work-life balance.
          - Keep the language natural and conversational.
          - Focus on pathways that promote growth, flexibility, and work-life harmony.
          - Provide responses in Tanglish that are easy to understand and follow.
          - No asterisks or formatting.
          - No line breaks.
          - Give a short summary of the advice at the end.
          - Use emojis to make the response more engaging.
          - Use bullet points to make the response more readable.
          - Use **bold** to highlight important points.
          - Use *italic* to highlight important points.
          `
        }]
      }]
    });
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting career advice:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}

export async function getPersonalizedCareerAdvice(profile: UserProfile): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  
  try {
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `As a career advisor, provide personalized career advice for:
          Name: ${profile.name}
          Age: ${profile.age}
          Education: ${profile.education}
          Interests: ${profile.interests.join(', ')}
          Skills: ${profile.skills.join(', ')}
          Chosen Career Path: ${profile.careerPath}

          Guidelines:
          - Provide specific advice based on their background
          - Consider their age and education level
          - Suggest next steps based on their current skills
          - Recommend learning paths based on their interests
          - Keep response concise and actionable
          `
        }]
      }]
    });
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting personalized career advice:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}