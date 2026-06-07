import Groq from "groq-sdk";
import { readdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { getJson } from "serpapi";

async function getDocumentContext() {
  try {
    const docsDir = path.join(process.cwd(), "documents");
    if (!existsSync(docsDir)) return "";
    const files = await readdir(docsDir);
    const txtFiles = files.filter(f => f.endsWith(".txt"));
    let context = "";
    for (const file of txtFiles) {
      const filePath = path.join(docsDir, file);
      const content = await readFile(filePath, "utf-8");
      context += `\n--- From document: ${file} ---\n${content.slice(0, 2000)}\n`;
    }
    return context;
  } catch {
    return "";
  }
}

async function searchInternet(query) {
  try {
    const result = await getJson({
      engine: "google",
      q: query + " India law site:indiankanoon.org OR site:barandbench.com OR site:livelaw.in",
      api_key: process.env.SERPAPI_KEY,
      num: 3,
    });
    const results = result.organic_results || [];
    let searchContext = "";
    for (const r of results) {
      searchContext += `\nSource: ${r.title}\nLink: ${r.link}\nSummary: ${r.snippet}\n`;
    }
    return searchContext;
  } catch {
    return "";
  }
}

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { message, history } = await request.json();
    
    const [docContext, searchContext] = await Promise.all([
      getDocumentContext(),
      searchInternet(message)
    ]);

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are an expert Indian legal assistant. You help users understand Indian law, their legal rights, legal procedures, and legal documents. Always mention that users should consult a qualified lawyer for their specific situation.
${docContext ? `\nYou have access to these uploaded legal documents:\n${docContext}` : ""}
${searchContext ? `\nYou also have access to these live search results from Indian legal websites:\n${searchContext}` : ""}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I could not process your request.";
    return Response.json({ reply });

  } catch (error) {
    console.error("API Error:", error.message);
    return Response.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}