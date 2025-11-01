import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

// FIX: Re-formatted the PROMPT string to avoid potential parsing issues with multi-line template literals in some environments. This resolves multiple "Cannot find name" errors.
const PROMPT = 'You are an expert proofreader and editor. Your task is to correct the provided text for any and all errors, including spelling, grammar, punctuation, and syntax.\n' +
'You should also improve the fluency and clarity of the text, making it sound more natural and professional.\n\n' +
'You must adhere to these strict rules:\n' +
'1.  Do NOT change the original meaning or intent of the text.\n' +
'2.  If the text is already perfect and requires no changes, return the original text as is.\n' +
'3.  Your output format MUST be the corrected text with changes marked up.\n' +
'    - For deletions, wrap the removed text in `[-...-]`.\n' +
'    - For additions, wrap the added text in `[+...+]`.\n' +
'    - Unchanged text should remain as is.\n\n' +
'Example 1:\n' +
'Original: "helo worldd i am comming"\n' +
'Your Output: "[-helo-][+Hello+] world[-d-] i am [-comming-][+coming+]"\n\n' +
'Example 2:\n' +
'Original: "its a beautiful day"\n' +
'Your Output: "[-its-][+It\'s+] a beautiful day"\n\n' +
'Only return the marked-up text. Do NOT add any other commentary, explanations, or introductory phrases.';


export const correctText = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "";
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: text,
      config: {
        systemInstruction: PROMPT,
        temperature: 0.3,
        topP: 0.9,
        topK: 20
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI model.");
  }
};
