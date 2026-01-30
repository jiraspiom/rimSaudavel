
import { GoogleGenAI } from "@google/genai";
import { DOCUMENT_CONTENT } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askAssistant(question: string, history: {role: 'user' | 'model', text: string}[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: question }] }
      ],
      config: {
        systemInstruction: `
          Você é um assistente de saúde especializado em prevenção de cálculos renais.
          Baseie suas respostas PRINCIPALMENTE no seguinte documento médico fornecido:
          ${DOCUMENT_CONTENT}
          
          Se o usuário perguntar sobre algo não mencionado no documento, use seu conhecimento médico geral (Gemini), mas sempre mencione que as orientações específicas do documento são a prioridade. 
          Seja empático, direto e encoraje bons hábitos. 
          Responda sempre em Português do Brasil.
        `,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, não consegui processar sua pergunta agora.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao consultar o assistente. Por favor, tente novamente mais tarde.";
  }
}
