import type {Transaction} from "../types.js";
export class BudgetMathSkill {run(items:Array<Transaction&{category:string}>){
 const totalIncome=items.filter(x=>x.direction==="in").reduce((s,x)=>s+x.amount,0);
 const totalSpent=items.filter(x=>x.direction==="out").reduce((s,x)=>s+x.amount,0);
 const groups=new Map<string,number>();
 for(const x of items.filter(x=>x.direction==="out")) groups.set(x.category,(groups.get(x.category)||0)+x.amount);
 const categories=[...groups].map(([name,amount])=>({name,amount,percentage:totalSpent?Math.round(amount/totalSpent*100):0})).sort((a,b)=>b.amount-a.amount);
 return {totalIncome,totalSpent,balance:totalIncome-totalSpent,categories};
}}
