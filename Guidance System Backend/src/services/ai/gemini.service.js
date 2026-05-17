import fs from "fs";

import path from "path";

import dotenv from "dotenv";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

dotenv.config();

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

// STABLE MODEL

const model =
  genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

export const analyzeDocumentWithGemini =
  async (filePath) => {
    try {
      // READ FILE

      const fileData =
        fs.readFileSync(
          filePath
        );

      // MIME TYPE

      const ext =
        path.extname(
          filePath
        );

      let mimeType =
        "image/jpeg";

      if (ext === ".png") {
        mimeType =
          "image/png";
      }

      if (ext === ".pdf") {
        mimeType =
          "application/pdf";
      }

      // IMAGE/PDF DATA

      const filePart = {
        inlineData: {
          data:
            fileData.toString(
              "base64"
            ),
          mimeType,
        },
      };

      // STRONG STRUCTURED PROMPT

      const prompt = `
You are an AI document extraction system.

Analyze this student academic document carefully.

Extract these fields:

1. student_name
2. subjects
3. marks
4. grades
5. percentage
6. skills_if_certificate

IMPORTANT RULES:

- Return ONLY valid JSON
- No markdown
- No explanation
- No backticks
- Use exact JSON keys
- marks must be object
- grades must be object
- subjects must be array
- percentage must be number only
- If data missing return null

JSON FORMAT:

{
  "student_name": "",
  "subjects": [],
  "marks": {},
  "grades": {},
  "percentage": 0,
  "skills_if_certificate": []
}
`;

      // GEMINI RESPONSE

      const result =
        await model.generateContent(
          [
            prompt,
            filePart,
          ]
        );

      let response =
        result.response.text();

      // REMOVE MARKDOWN JSON BLOCKS

      response =
        response.replace(
          /```json/g,
          ""
        );

      response =
        response.replace(
          /```/g,
          ""
        );

      response =
        response.trim();

      // PARSE JSON

      let parsed;

      try {
        parsed =
          JSON.parse(
            response
          );
      } catch (jsonError) {
        console.log(
          "INVALID JSON RESPONSE:",
          response
        );

        throw new Error(
          "Gemini returned invalid JSON"
        );
      }

      // NORMALIZE DATA

      parsed.student_name =
        parsed.student_name ||
        null;

      parsed.subjects =
        Array.isArray(
          parsed.subjects
        )
          ? parsed.subjects
          : [];

      parsed.marks =
        typeof parsed.marks ===
        "object"
          ? parsed.marks
          : {};

      parsed.grades =
        typeof parsed.grades ===
        "object"
          ? parsed.grades
          : {};

      parsed.percentage =
        Number(
          parsed.percentage
        ) || 0;

      parsed.skills_if_certificate =
        Array.isArray(
          parsed.skills_if_certificate
        )
          ? parsed.skills_if_certificate
          : [];

      return parsed;
    } catch (error) {
      console.log(
        "GEMINI ERROR:",
        error.message
      );

      throw new Error(
        "Document analysis failed"
      );
    }
  };