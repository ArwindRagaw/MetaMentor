import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const sanitizeAndParseJSON = (text) => {
  try {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']') + 1;
    if (start === -1 || end === 0) {
      throw new Error('Invalid JSON structure in response');
    }
    const jsonStr = text.slice(start, end);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Parse error:', error);
    throw new Error('Failed to parse API response');
  }
};

export const generateTopics = async (course, level) => {
  try {
    const prompt = `Generate a structured learning path for ${course} at ${level} level. 
      Return ONLY a JSON array with exactly 10 topics in this format:
      [{"title": "Topic Name", "description": "Brief topic description"}]`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from API');
    }
    
    return sanitizeAndParseJSON(text);
  } catch (error) {
    console.error('Error generating topics:', error);
    throw new Error('Failed to generate topics. Please try again.');
  }
};

export const generateSubTopics = async (topicTitle) => {
  try {
    const prompt = `Generate a detailed learning breakdown for "${topicTitle}".
      Return ONLY a JSON array with exactly 10 subtopics in this format:
      [{
        "title": "Subtopic Name",
        "description": "Brief description"
      }]`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from API');
    }
    
    return sanitizeAndParseJSON(text);
  } catch (error) {
    console.error('Error generating subtopics:', error);
    throw new Error('Failed to generate subtopics. Please try again.');
  }
};

export const generateSubtopicExplanation = async (subtopicTitle) => {
  try {
    const prompt = `Explain "${subtopicTitle}" in 5 clear points that are easy to understand. 
    Make each point a single paragraph without any special formatting or markdown. 
    Make it simple and beginner-friendly.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating explanation:', error);
    throw new Error('Failed to generate explanation. Please try again.');
  }
};

export const generateDetailedExplanation = async (subtopicTitle) => {
  try {
    const prompt = `Provide a detailed, easy-to-understand explanation of "${subtopicTitle}" with examples and real-world applications. 
    Write in clear paragraphs without any special formatting or markdown. 
    Make it engaging and accessible for beginners.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating detailed explanation:', error);
    throw new Error('Failed to generate detailed explanation. Please try again.');
  }
};

export const generateQuestions = async (topic) => {
  try {
    const prompt = `Generate a mock test for "${topic}". 
      Return ONLY a JSON array with exactly 10 questions in this format:
      [{"question": "Question text", "options": ["Option 1", "Option 2", "Option 3", "Option 4"], "correctAnswer": 0}]
      where correctAnswer is the index (0-3) of the correct option.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from API');
    }
    
    return sanitizeAndParseJSON(text);
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions. Please try again.');
  }
};

export const getChatResponse = async (context, question) => {
  try {
    const prompt = `As a friendly tutor helping someone learn about "${context}":
      Answer this question in a natural, conversational way: "${question}"
      Keep it simple, clear, and directly related to the question.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw new Error('Failed to get response. Please try again.');
  }
};