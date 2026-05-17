import {
  GoogleGenerativeAI
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });



const generateCareerGuidance =
async (
  profile,
  careerMatches
) => {

  try {

    const prompt = `
You are an advanced AI Career Counselor.

Analyze the student profile carefully.

STUDENT PROFILE:
${JSON.stringify(profile)}

PREDICTED CAREERS:
${JSON.stringify(careerMatches)}

Generate:

1. Strengths
2. Weaknesses
3. Why these careers suit student
4. Personalized career guidance
5. Learning roadmap
6. Missing skills
7. Industry opportunities
8. Salary insights
9. Recommended technologies/tools
10. Final motivational advice

IMPORTANT:
Return ONLY valid JSON.

FORMAT:

{
  "strengths": [],
  "weaknesses": [],
  "careerExplanation": "",
  "personalizedGuidance": "",
  "learningRoadmap": [],
  "missingSkills": [],
  "industryOpportunities": [],
  "salaryInsights": [],
  "recommendedTools": [],
  "finalAdvice": ""
}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    // CLEAN JSON
    const cleaned =
      response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(error);

    throw new Error(
      "Career guidance generation failed"
    );
  }
};

export default generateCareerGuidance;