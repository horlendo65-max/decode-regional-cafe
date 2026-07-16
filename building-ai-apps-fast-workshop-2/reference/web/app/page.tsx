"use client";
import {useState} from "react";
type Result={summary:string;totalIncome:number;totalSpent:number;balance:number;categories:{name:string;amount:number;percentage:number}[];insights:string[];recommendations:string[];disclaimer:string};
const sample=`01 Jul 2026 Salary received KES 85,000
02 Jul 2026 Paid to NAIVAS KES 4,850
03 Jul 2026 Uber trip KES 740
04 Jul 2026 KPLC Paybill KES 2,500
05 Jul 2026 Java House KES 1,200
06 Jul 2026 Sent to Jane KES 3,000`;
export default function Home(){
 const [statement,setStatement]=useState(sample),[question,setQuestion]=useState("Where can I reduce spending?"),[result,setResult]=useState<Result|null>(null),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 async function analyze(){setLoading(true);setError("");setResult(null);try{const r=await fetch(`${process.env.NEXT_PUBLIC_API_URL||"http://localhost:4000"}/api/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({statementText:statement,question})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Analysis failed");setResult(data)}catch(e){setError(e instanceof Error?e.message:"Analysis failed")}finally{setLoading(false)}}
 return <main><section className="hero"><span className="badge">Agent + Skills + Workflow</span><h1>AI M-PESA Expense Advisor</h1><p>Paste statement text, run a reusable workflow and receive a practical spending summary.</p></section><section className="grid"><div className="card"><label>Statement text</label><textarea value={statement} onChange={e=>setStatement(e.target.value)} rows={12}/><label>Your question</label><input value={question} onChange={e=>setQuestion(e.target.value)}/><button onClick={analyze} disabled={loading}>{loading?"Running workflow…":"Analyze expenses"}</button>{error&&<p className="error">{error}</p>}</div><div className="card result">{!result?<div className="empty"><h2>Workflow</h2><p>Parse → Categorize → Calculate → Advise</p></div>:<><h2>{result.summary}</h2><div className="metrics"><strong>Income<br/>KES {result.totalIncome.toLocaleString()}</strong><strong>Spent<br/>KES {result.totalSpent.toLocaleString()}</strong><strong>Balance<br/>KES {result.balance.toLocaleString()}</strong></div><h3>Categories</h3>{result.categories.map(c=><div className="row" key={c.name}><span>{c.name}</span><span>KES {c.amount.toLocaleString()} · {c.percentage}%</span></div>)}<h3>Insights</h3><ul>{result.insights.map(x=><li key={x}>{x}</li>)}</ul><h3>Recommended actions</h3><ol>{result.recommendations.map(x=><li key={x}>{x}</li>)}</ol><small>{result.disclaimer}</small></>}</div></section></main>
}
