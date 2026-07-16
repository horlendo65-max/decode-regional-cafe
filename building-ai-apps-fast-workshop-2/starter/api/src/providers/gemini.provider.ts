import { GoogleGenAI } from "@google/genai";

export class GeminiProvider {
  private client: GoogleGenAI;
  private model: string;
  constructor() {
    const apiKey=process.env.GEMINI_API_KEY;
    if(!apiKey) throw new Error("GEMINI_API_KEY is not configured");
    this.client=new GoogleGenAI({apiKey});
    this.model=process.env.GEMINI_MODEL || "gemini-2.5-flash";
  }
  async generate(prompt:string):Promise<string>{
    const response=await this.client.models.generateContent({model:this.model,contents:prompt});
    return response.text ?? "";
  }
}
