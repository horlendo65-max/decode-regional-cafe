import type {Transaction} from "../types.js";

export class ParseMpesaSkill {
  run(text:string):Transaction[]{
    return text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).flatMap(line=>{
      const amountMatches=[...line.matchAll(/(?:KES|Ksh|Kshs)?\s*([0-9,]+(?:\.\d{1,2})?)/gi)];
      if(!amountMatches.length) return [];
      const last=amountMatches.at(-1)?.[1];
      const amount=Number((last||"0").replaceAll(",",""));
      if(!Number.isFinite(amount)||amount<=0) return [];
      const lower=line.toLowerCase();
      const income=/received|salary|deposit|credited|from /.test(lower);
      const description=line.replace(/(?:KES|Ksh|Kshs)?\s*[0-9,]+(?:\.\d{1,2})?/gi," ").replace(/\s+/g," ").trim();
      return [{description:description||"Transaction",amount,direction:income?"in":"out"}];
    });
  }
}
