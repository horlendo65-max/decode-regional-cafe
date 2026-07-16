import type {Transaction} from "../types.js";
const rules=[
 ["Food & Groceries",/naivas|carrefour|quickmart|food|restaurant|cafe|java|kfc/i],
 ["Transport",/uber|bolt|matatu|fuel|shell|total|transport/i],
 ["Bills & Utilities",/kplc|electric|water|airtime|bundle|internet|zuku|dstv/i],
 ["Transfers",/sent to|transfer|paybill|till/i],
 ["Income",/received|salary|deposit|credited/i]
] as const;
export class CategorizeSkill { run(t:Transaction[]){return t.map(x=>({...x,category:rules.find(([,r])=>r.test(x.description))?.[0] ?? "Other"}));}}
