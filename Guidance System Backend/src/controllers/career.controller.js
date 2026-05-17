import buildStudentProfile from "../services/carrer/profileAggregator.service.js";

import calculateCareerMatches from "../services/carrer/careerEngine.service.js";

export const generateCareerMatches = async (req, res) => {
  try {
    const { studentId } = req.params;

    // AI READY OBJECT
    const profile = await buildStudentProfile(studentId);

    // CAREER ENGINE
    const careers = calculateCareerMatches(profile);

    res.status(200).json({
      success: true,
      profile,
      careers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
