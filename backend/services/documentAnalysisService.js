const { PDFParse } = require("pdf-parse");
const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function analyzeDocument(fileBuffer) {
    const parser = new PDFParse({ data: fileBuffer });
    await parser.load();
    const result = await parser.getText();
    const text = result.text;

    if (!text || text.trim().length === 0) {
        throw new Error("Could not extract text from the PDF. The document may be scanned or image-based.");
    }

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are Apka Vakeel, an expert Indian legal document analyst.

Your job is to thoroughly analyze legal documents and provide actionable feedback.

You MUST structure your response EXACTLY in this format with these section headers:

📋 DOCUMENT SUMMARY
[2-3 lines summarizing what this document is about, parties involved, and purpose]

📌 IMPORTANT CLAUSES
• [clause 1 with brief explanation]
• [clause 2 with brief explanation]
• [clause 3 with brief explanation]

⚠️ KEY RISKS
• [risk 1 - explain why it's risky]
• [risk 2 - explain why it's risky]
• [risk 3 - explain why it's risky]

✏️ SUGGESTED CHANGES
• [specific change 1 - what to modify and why]
• [specific change 2 - what to modify and why]
• [specific change 3 - what to modify and why]
• [specific change 4 - what to modify and why]

🔍 MISSING CLAUSES
• [clause that should be added and why]
• [clause that should be added and why]

✅ RECOMMENDED ACTIONS
• [action 1 the user should take]
• [action 2 the user should take]
• [action 3 the user should take]

Rules:
- Be specific about suggested changes, referencing exact sections or language in the document
- Focus on Indian law and legal standards
- Flag anything that could be unfavorable to either party
- Suggest protective clauses that are missing
- Keep each bullet point concise (1-2 lines max)
- If the document is not a legal document, still analyze its content and provide relevant suggestions`,
            },
            {
                role: "user",
                content: `Analyze this document and suggest changes:\n\n${text}`,
            },
        ],
    });

    return response.choices[0].message.content;
}

module.exports = {
    analyzeDocument,
};
