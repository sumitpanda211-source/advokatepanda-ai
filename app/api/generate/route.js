import Groq from "groq-sdk";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { documentType, details } = await request.json();

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `You are an expert Indian lawyer. Draft a professional and legally sound ${documentType} document based on these details:

${Object.entries(details).map(([key, value]) => `${key}: ${value}`).join("\n")}

Important instructions:
- Use proper legal language suitable for Indian law
- Include all standard clauses for this document type
- Format it professionally with clear sections
- Include date, signatures section at the bottom
- Make it complete and ready to use
- Follow Indian legal standards and requirements`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const document = completion.choices[0]?.message?.content || "Could not generate document.";
    return Response.json({ document });

  } catch (error) {
    console.error("Generate Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}