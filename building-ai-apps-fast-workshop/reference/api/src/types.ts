export type Transaction={date?:string;description:string;amount:number;direction:"in"|"out"};
export type ExpenseAnalysis={summary:string;totalIncome:number;totalSpent:number;balance:number;categories:Array<{name:string;amount:number;percentage:number}>;insights:string[];recommendations:string[];disclaimer:string};
export type WorkflowInput={statementText:string;question?:string};
