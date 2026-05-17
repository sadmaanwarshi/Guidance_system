import prisma from "../../config/prisma.js";

const buildStudentProfile = async (
  studentId
) => {

  // STUDENT
  const student =
    await prisma.student.findUnique({
      where: {
        id: studentId
      }
    });

  // PROFILE
  const profile =
    await prisma.studentProfile.findUnique({
      where: {
        studentId
      }
    });

  // DOCUMENTS
  const documents =
    await prisma.document.findMany({
      where: {
        studentId
      },

      include: {
        extractedData: true
      }
    });

  // BUILD SUBJECTS ARRAY
  let subjectsData = [];

  if (
    profile?.subjects &&
    profile?.marks
  ) {

    subjectsData =
      profile.subjects.map((subject, index) => ({
        subject,
        marks: profile.marks[index] || null
      }));
  }

  // DOCUMENT SUMMARIES
  const documentSummaries =
    documents.map((doc) => ({

      documentType: doc.documentType,

      extractedData:
        doc.extractedData?.structuredData || null
    }));


  // FINAL AI OBJECT
  const aiReadyProfile = {

    student: {
      id: student.id,
      name: profile?.fullName || student.name,
      email: student.email
    },

    academics: {
      percentage: profile?.percentage || null,

      subjects: subjectsData,

      academicType:
        profile?.academicType || null
    },

    skills: profile?.skills || [],

    interests: profile?.interests || [],

    goals: profile?.goals || [],

    hobbies: profile?.hobbies || [],

    certifications:
      profile?.certifications || [],

    preferredCareers:
      profile?.preferredCareers || [],

    personalityTraits:
      profile?.personalityTraits || [],

    strengths:
      profile?.strengths || [],

    weaknesses:
      profile?.weaknesses || [],

    uploadedDocuments:
      documentSummaries
  };

  return aiReadyProfile;
};

export default buildStudentProfile;