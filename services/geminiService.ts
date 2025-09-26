
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateBookDescription(title: string, author: string): Promise<string> {
  if (!API_KEY) {
    return "AI service is not configured. Please enter a description manually.";
  }

  const prompt = `Generate a short, one-paragraph, engaging description for the book titled '${title}' by ${author} for a library catalogue. The description should be captivating and around 50-70 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate description from Gemini API.");
  }
}
