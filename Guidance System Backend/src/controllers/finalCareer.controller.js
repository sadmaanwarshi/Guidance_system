import buildStudentProfile
from "../services/carrer/profileAggregator.service.js";

import calculateCareerMatches
from "../services/carrer/careerEngine.service.js";

import generateCareerGuidance
from "../services/ai/careerGuidance.service.js";



export const generateFinalCareerReport =
async (req, res) => {

  try {

    const { studentId } = req.params;

    // AGGREGATED PROFILE
    const profile =
      await buildStudentProfile(studentId);

    // RULE ENGINE
    const careerMatches =
      calculateCareerMatches(profile);

    // GEMINI GUIDANCE
    const guidance =
      await generateCareerGuidance(
        profile,
        careerMatches
      );

    // FINAL RESPONSE
    const finalReport = {

      student: profile.student,

      academics:
        profile.academics,

      topCareerMatches:
        careerMatches,

      guidance
    };

    res.status(200).json({
      success: true,
      finalReport
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};