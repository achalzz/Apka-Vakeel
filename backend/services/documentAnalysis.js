const { PDFParse } = require("pdf-parse");

async function analyzeDocument(fileBuffer) {
    const parser = new PDFParse({ data: fileBuffer });
    await parser.load();
    const result = await parser.getText();
    const text = result.text;

    return `
PDF analyzed successfully

Characters extracted:
${text.length}

Preview:

${text.substring(0, 500)}
`;
}

module.exports = {
    analyzeDocument,
};