import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const analyzeSoil = async (soilData: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: `Analyze this soil data for a farmer in India: ${JSON.stringify(soilData)}. 
    Provide a health score (0-100), nutrient deficiency alerts, fertilizer advice, and carbon sequestration potential.
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          alerts: { type: Type.ARRAY, items: { type: Type.STRING } },
          advice: { type: Type.STRING },
          carbonPotential: { type: Type.STRING },
        },
        required: ["score", "alerts", "advice", "carbonPotential"],
      },
    },
  });
  return JSON.parse(response.text || "{}");
};

export const getCropRecommendations = async (soilData: any, location: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: `Based on soil data ${JSON.stringify(soilData)} and location ${location}, recommend top 3 crops for the current season in India.
    Include estimated yield, estimated income per acre (in INR), and carbon credit potential.
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            yield: { type: Type.STRING },
            income: { type: Type.STRING },
            carbonPotential: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["name", "yield", "income", "carbonPotential", "reason"],
        },
      },
    },
  });
  return JSON.parse(response.text || "[]");
};

export const detectDisease = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: "Identify the crop disease in this image. Provide the disease name, treatment, and prevention tips in JSON format." },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          treatment: { type: Type.STRING },
          prevention: { type: Type.STRING },
        },
        required: ["diseaseName", "treatment", "prevention"],
      },
    },
  });
  return JSON.parse(response.text || "{}");
};

export const getRainfallForecast = async (location: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: `Provide a simulated 7-day rainfall forecast for ${location}, India. 
    Include day name, probability (%), intensity (Light/Moderate/Heavy), and average temperature (°C).
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING },
            probability: { type: Type.INTEGER },
            intensity: { type: Type.STRING },
            temp: { type: Type.INTEGER },
          },
          required: ["day", "probability", "intensity", "temp"],
        },
      },
    },
  });
  return JSON.parse(response.text || "[]");
};

export const getAIResponse = async (query: string, context: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: `You are a helpful agricultural assistant for Krishi Carbon. 
    User Query: "${query}"
    Context: ${JSON.stringify(context)}
    Provide a helpful, concise response in the user's language (English or Hindi). 
    If the user asks about sowing, rainfall, or carbon, use the provided context.
    Return the response in JSON format with 'text' and 'language' fields.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          language: { type: Type.STRING },
        },
        required: ["text", "language"],
      },
    },
  });
  return JSON.parse(response.text || "{}");
};

export const estimateProfit = async (data: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: `Estimate farm profit for: ${JSON.stringify(data)}. 
    Include estimated yield, expected income (INR), carbon bonus earnings (INR), and total profit.
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedYield: { type: Type.STRING },
          expectedIncome: { type: Type.STRING },
          carbonBonus: { type: Type.STRING },
          totalProfit: { type: Type.STRING },
        },
        required: ["estimatedYield", "expectedIncome", "carbonBonus", "totalProfit"],
      },
    },
  });
  return JSON.parse(response.text || "{}");
};

export const findSchemes = async (location: string, farmSize: number) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-preview",
    contents: `Find 3 relevant Indian government agricultural schemes or subsidies for a farmer in ${location} with a farm size of ${farmSize} acres.
    Include scheme name, description, benefit, eligibility, and a simulated link.
    Return the response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            benefit: { type: Type.STRING },
            eligibility: { type: Type.STRING },
            link: { type: Type.STRING },
          },
          required: ["name", "description", "benefit", "eligibility", "link"],
        },
      },
    },
  });
  return JSON.parse(response.text || "[]");
};
