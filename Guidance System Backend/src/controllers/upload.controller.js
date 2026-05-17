import prisma from "../config/prisma.js";

import {
  analyzeDocumentWithGemini
} from "../services/ai/gemini.service.js";

export const uploadDocument = async (
  req,
  res
) => {

  try {

    const file = req.file;

    const {
      studentId,
      documentType
    } = req.body;

    // Save document record
    const document = await prisma.document.create({
      data: {
        studentId,
        documentType,

        fileName: file.filename,

        fileUrl: file.path,

        mimeType: file.mimetype,

        fileSize: file.size
      }
    });

    // Analyze with Gemini
    const aiResponse =
      await analyzeDocumentWithGemini(file.path);

    // Clean AI response
    const cleaned = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "");

    const parsedData = JSON.parse(cleaned);

    // Save extracted data
    await prisma.extractedData.create({
      data: {
        documentId: document.id,

        extractedText: JSON.stringify(parsedData),

        structuredData: parsedData,

        confidenceScore: 0.95
      }
    });

    res.status(201).json({
      success: true,
      document,
      extractedData: parsedData
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};