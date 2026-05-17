import prisma from "../config/prisma.js";


// CREATE FINAL PROFILE
export const completeProfile = async (
  req,
  res
) => {

  try {

    const data = req.body;

    const existingProfile =
      await prisma.studentProfile.findUnique({
        where: {
          studentId: data.studentId
        }
      });

    // Prevent duplicate
    if (existingProfile) {

      return res.status(400).json({
        success: false,
        message: "Profile already exists"
      });
    }

    const profile =
      await prisma.studentProfile.create({
        data: {

          studentId: data.studentId,

          fullName: data.fullName,

          percentage: data.percentage,

          subjects: data.subjects,

          marks: data.marks,

          grades: data.grades,

          skills: data.skills,

          interests: data.interests,

          goals: data.goals,

          hobbies: data.hobbies,

          certifications: data.certifications,

          preferredCareers:
            data.preferredCareers,

          personalityTraits:
            data.personalityTraits,

          strengths: data.strengths,

          weaknesses: data.weaknesses,

          academicType: data.academicType
        }
      });

    res.status(201).json({
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



// GET PROFILE
export const getProfile = async (
  req,
  res
) => {

  try {

    const { studentId } = req.params;

    const profile =
      await prisma.studentProfile.findUnique({
        where: {
          studentId
        }
      });

    if (!profile) {

      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// UPDATE PROFILE
export const updateProfile = async (
  req,
  res
) => {

  try {

    const { studentId } = req.params;

    const data = req.body;

    const updatedProfile =
      await prisma.studentProfile.update({
        where: {
          studentId
        },

        data
      });

    res.status(200).json({
      success: true,
      updatedProfile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};