
import { GoogleGenAI } from "@google/genai";
import { DOCUMENT_CONTENT } from "./constants";

export async function askAssistant(question: string, history: {role: 'user' | 'model', text: string}[]) {
  try {
    // Inicializa a instância dentro da função para garantir que process.env esteja disponível
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Tratamento de erro específico conforme regras
    if (error?.message?.includes("Requested entity was not found")) {
      return "Erro: Chave de API inválida ou projeto não encontrado. Verifique as variáveis de ambiente na Vercel.";
    }
    
    return "Ocorreu um erro ao consultar o assistente. Por favor, tente novamente mais tarde.";
  }
}
