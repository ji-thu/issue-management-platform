import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {

  private ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  async analyzeIssue(issue: any, discussions: any[]) {

    const prompt = `
Issue Title:
${issue.title}

Issue Description:
${issue.description}

Discussion History:
${JSON.stringify(discussions)}

Provide:
1. Summary
2. Possible Root Cause
3. Recommended Fix
4. Priority Assessment
`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    console.log(response);

    return response.text;
  } catch (error) {
    console.error("GEMINI ERROR:");
    console.error(error);
    throw error;
  }
}