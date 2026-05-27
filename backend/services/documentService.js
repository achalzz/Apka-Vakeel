const { askLegalAI } = require("./aiService");

async function generateDocument(type, details) {
    const prompt = `
Generate a professional legal ${type}.

Details:
${JSON.stringify(details, null, 2)}

Requirements:
- Formal legal format
- Proper headings
- Complete content
- Professional language
`;

    const response = await askLegalAI(prompt);

    return response;
}

module.exports = {
    generateDocument,
};
