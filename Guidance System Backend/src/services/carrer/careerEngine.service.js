const calculateCareerMatches = (
  profile
) => {

  const careers = [];

  const subjects =
    profile.academics.subjects || [];

  const skills =
    profile.skills || [];

  const interests =
    profile.interests || [];

  const certifications =
    profile.certifications || [];



  // HELPERS
  const hasSkill = (skill) =>
    skills.includes(skill);

  const hasInterest = (interest) =>
    interests.includes(interest);

  const hasCertification = (cert) =>
    certifications.includes(cert);

  const getSubjectMarks = (subjectName) => {

    const subject = subjects.find(
      (s) =>
        s.subject
          .toLowerCase()
          .includes(subjectName.toLowerCase())
    );

    return subject?.marks || 0;
  };



  // SUBJECT MARKS
  const mathMarks =
    getSubjectMarks("math");

  const physicsMarks =
    getSubjectMarks("physics");

  const csMarks =
    getSubjectMarks("computer");



  // AI ENGINEER
  let aiEngineerScore = 0;

  if (mathMarks >= 85)
    aiEngineerScore += 30;

  if (hasSkill("Programming"))
    aiEngineerScore += 30;

  if (hasInterest("AI"))
    aiEngineerScore += 25;

  if (hasCertification("Python"))
    aiEngineerScore += 15;

  careers.push({
    role: "AI Engineer",
    score: aiEngineerScore
  });



  // FULL STACK DEVELOPER
  let fullStackScore = 0;

  if (hasSkill("Programming"))
    fullStackScore += 40;

  if (
    hasInterest("Web Development")
  )
    fullStackScore += 30;

  if (
    hasCertification("React")
  )
    fullStackScore += 20;

  fullStackScore += 10;

  careers.push({
    role: "Full Stack Developer",
    score: fullStackScore
  });



  // DATA SCIENTIST
  let dataScienceScore = 0;

  if (mathMarks >= 80)
    dataScienceScore += 35;

  if (physicsMarks >= 80)
    dataScienceScore += 20;

  if (hasInterest("Data Science"))
    dataScienceScore += 30;

  if (hasSkill("Python"))
    dataScienceScore += 15;

  careers.push({
    role: "Data Scientist",
    score: dataScienceScore
  });



  // CYBERSECURITY
  let cyberScore = 0;

  if (hasInterest("Cybersecurity"))
    cyberScore += 40;

  if (hasSkill("Networking"))
    cyberScore += 35;

  if (physicsMarks >= 70)
    cyberScore += 25;

  careers.push({
    role: "Cybersecurity Engineer",
    score: cyberScore
  });



  // UI UX
  let uiuxScore = 0;

  if (hasInterest("Design"))
    uiuxScore += 40;

  if (hasSkill("Creativity"))
    uiuxScore += 35;

  uiuxScore += 25;

  careers.push({
    role: "UI/UX Designer",
    score: uiuxScore
  });



  // SORT DESCENDING
  careers.sort(
    (a, b) => b.score - a.score
  );

  return careers;
};

export default calculateCareerMatches;