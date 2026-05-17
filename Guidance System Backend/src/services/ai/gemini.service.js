import fs from "fs";
import dotenv from "dotenv";

import {
  GoogleGenerativeAI
} from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview"
});

export const analyzeDocumentWithGemini = async (
  filePath
) => {

  const fileData = fs.readFileSync(filePath);

  const imagePart = {
    inlineData: {
      data: fileData.toString("base64"),
      mimeType: "image/png"
    }
  };

  const prompt = `
Analyze this student document carefully.

Extract:
1. Student Name
2. Subjects
3. Marks
4. Grades
5. Percentage
6. Skills if certificate

Return ONLY valid JSON.
`;

  const result = await model.generateContent([
    prompt,
    imagePart
  ]);

  const response = result.response.text();

  return response;
};