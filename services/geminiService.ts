
import { GoogleGenAI } from "@google/genai";

export const askPedagogyAssistant = async (prompt: string, currentSlideTitle: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto do slide atual: "${currentSlideTitle}". Pergunta do professor: "${prompt}". 
      Atue como um consultor pedagógico especialista em IA. Responda de forma curta, inspiradora e prática em português.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 500,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um problema ao processar sua consulta pedagógica. Tente novamente em instantes.";
  }
};
