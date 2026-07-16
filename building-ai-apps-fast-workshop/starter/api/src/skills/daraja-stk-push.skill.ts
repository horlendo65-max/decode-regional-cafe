type StkInput={phone:string;amount:number;accountReference?:string};
export class DarajaStkPushSkill {
 async run(input:StkInput){
  const key=process.env.DARAJA_CONSUMER_KEY,secret=process.env.DARAJA_CONSUMER_SECRET;
  const shortcode=process.env.DARAJA_SHORTCODE,passkey=process.env.DARAJA_PASSKEY,callback=process.env.DARAJA_CALLBACK_URL;
  if(!key||!secret||!shortcode||!passkey||!callback) throw new Error("Daraja Sandbox is not configured");
  const auth=Buffer.from(`${key}:${secret}`).toString("base64");
  const tokenRes=await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{headers:{Authorization:`Basic ${auth}`}});
  if(!tokenRes.ok) throw new Error("Daraja authentication failed");
  const {access_token}=await tokenRes.json() as {access_token:string};
  const timestamp=new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14);
  const password=Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
  const res=await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",{method:"POST",headers:{Authorization:`Bearer ${access_token}`,"Content-Type":"application/json"},body:JSON.stringify({BusinessShortCode:shortcode,Password:password,Timestamp:timestamp,TransactionType:"CustomerPayBillOnline",Amount:Math.round(input.amount),PartyA:input.phone,PartyB:shortcode,PhoneNumber:input.phone,CallBackURL:callback,AccountReference:input.accountReference||"AI-SAVINGS",TransactionDesc:"Savings action demo"})});
  const body=await res.json(); if(!res.ok) throw new Error(`STK Push failed: ${JSON.stringify(body)}`); return body;
 }
}
