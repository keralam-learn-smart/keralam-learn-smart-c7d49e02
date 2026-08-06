import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import fs from "fs";
const b64 = fs.readFileSync("/mnt/user-uploads/Screenshot_20260806_123702.jpg").toString("base64");
const messages: UIMessage[] = [{ id:"1", role:"user", parts:[
  { type:"text", text:"What sign is this? one line" },
  { type:"file", mediaType:"image/jpeg", url:`data:image/jpeg;base64,${b64}` } as any,
]}];
const gw = createLovableAiGatewayProvider(process.env.LOVABLE_API_KEY!);
const r = streamText({ model: gw("google/gemini-3.6-flash"), messages: convertToModelMessages(messages) });
for await (const c of r.textStream) process.stdout.write(c);
console.log("\nDONE");
