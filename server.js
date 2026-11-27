import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";
dotenv.config();
const app=express(),root=path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({limit:"2mb"}));
app.use(express.static(path.join(root,"public")));
app.get("/api/health",(_req,res)=>res.json({ok:true,app:"LUBA STUDIO AI"}));
app.post("/api/ai-ideas",async(req,res)=>{
 const prompt=String(req.body?.prompt||"").slice(0,2000);
 if(!prompt)return res.status(400).json({error:"Escreve uma ideia."});
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"Configura OPENAI_API_KEY no servidor."});
 try{
  const r=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4.1-mini",input:`És o LUBA AI, especialista em criação e edição de vídeo. Responde em português com conceito, roteiro por cenas, estilo, música, textos no ecrã e formato recomendado. Pedido: ${prompt}`})});
  const d=await r.json();if(!r.ok)return res.status(502).json({error:"O serviço de IA não respondeu."});
  const ideas=d.output?.flatMap(o=>o.content||[]).filter(c=>c.type==="output_text").map(c=>c.text).join("\\n")||"Sem sugestões.";
  res.json({ideas});
 }catch{res.status(500).json({error:"Erro ao contactar a IA."});}
});
app.listen(process.env.PORT||3000,()=>console.log("LUBA STUDIO AI online"));
