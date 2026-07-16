import {ParseMpesaSkill} from "../skills/parse-mpesa.skill.js";
import {CategorizeSkill} from "../skills/categorize.skill.js";
import {BudgetMathSkill} from "../skills/budget-math.skill.js";
import {ExpenseAdvisorAgent} from "../agents/expense-advisor.agent.js";
import type {ExpenseAnalysis,WorkflowInput} from "../types.js";
export class ExpenseAnalysisWorkflow {
 async run(input:WorkflowInput):Promise<ExpenseAnalysis>{
  const transactions=new ParseMpesaSkill().run(input.statementText);
  if(!transactions.length) throw new Error("No transactions found. Paste lines that include descriptions and amounts.");
  const categorized=new CategorizeSkill().run(transactions);
  const totals=new BudgetMathSkill().run(categorized);
  const advice=await new ExpenseAdvisorAgent().advise({...totals,question:input.question});
  return {...totals,...advice,disclaimer:"Educational budgeting guidance only; verify parsed transactions before acting."};
 }
}
