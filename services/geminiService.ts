import { GoogleGenAI } from "@google/genai";
import { PROVIDERS } from "../constants";

const apiKey = process.env.API_KEY || '';

// Construct a context string from our providers data to ground the AI
const providersContext = PROVIDERS.map(p => 
  `- Name: ${p.name}
   - Description: ${p.description}
   - Price: Starting at ¥${p.startPrice}/month
   - Rating: ${p.rating}/5
   - Tags: ${p.tags.join(', ')}
   - Features: ${p.features.join(', ')}`
).join('\n\n');

const systemInstruction = `
You are "CloudGuide", an expert consultant for network proxy/VPN services (commonly known as "Airports" in this context).
Your goal is to help users select the best service provider from the following list based on their needs (streaming, gaming, budget, stability).

Here is the data you have access to:
${providersContext}

Rules:
1. Only recommend providers from the list above.
2. If asked about a provider not in the list, politely mention you only cover the specific providers in your database.
3. Be objective but helpful. Highlight pros and cons based on the data (e.g. "Flying Pig is cheap but Galaxy is more stable").
4. Answer in Chinese (Simplified) as the user base is Chinese.
5. Keep answers concise and easy to read.
`;

let aiClient: GoogleGenAI | null = null;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "请先配置 API KEY (Please configure API KEY)";
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  try {
    const model = aiClient.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
    
    return response.text || "抱歉，我暂时无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务暂时不可用，请稍后再试。";
  }
};
