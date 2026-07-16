import {z} from "zod";
import {GeminiProvider} from "../providers/gemini.provider.js";
import type {ExpenseAnalysis} from "../types.js";

const schema=z.object({summary:z.string(),insights:z.array(z.string()),recommendations:z.array(z.string())});
export class ExpenseAdvisorAgent {
 constructor(private ai=new GeminiProvider()){}
 async advise(context:{totalIncome:number;totalSpent:number;balance:number;categories:unknown;question?:string}):Promise<Pick<ExpenseAnalysis,"summary"|"insights"|"recommendations">>{
  const prompt=`You are a cautious Kenyan expense coach. Analyze the computed figures below. Do not invent transactions. Give practical, non-judgmental guidance in Kenyan context. Return ONLY JSON with keys summary (string), insights (string array), recommendations (string array). Avoid investment, lending, tax or legal claims. Data: ${JSON.stringify(context)}`;
  const raw=await this.ai.generate(prompt);
  const cleaned=raw.replace(/^```json\s*/i,"").replace(/```$/," ").trim();
  return schema.parse(JSON.parse(cleaned));
 }
}
