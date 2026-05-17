import buildStudentProfile
from "../services/carrer/profileAggregator.service.js";

export const getAggregatedProfile =
async (req, res) => {

  try {

    const { studentId } = req.params;

    const profile =
      await buildStudentProfile(studentId);

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};