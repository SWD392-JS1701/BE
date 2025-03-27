import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI, GenerateContentRequest } from "@google/generative-ai";

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException('GEMINI_API_KEY is missing in environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async askGemini(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const request: GenerateContentRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      };

      const result = await model.generateContent(request);

      if (!result.response?.candidates?.length) {
        throw new InternalServerErrorException("Invalid response from Gemini API.");
      }

      return result.response.candidates[0].content.parts[0].text || "No response generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new InternalServerErrorException("Failed to get response from Gemini AI.");
    }
  }
}
