import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../components/MainLayout";

import {
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import API from "../api/axios";

const CompleteProfile = () => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const extractedData =
    location.state
      ?.extractedData;

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      studentId:
        localStorage.getItem(
          "studentId"
        ) || "",

      fullName: "",

      percentage: "",

      subjects: [],

      marks: [],

      grades: [],

      skills: [],

      interests: [],

      goals: [],

      hobbies: [],

      certifications: [],

      preferredCareers: [],

      personalityTraits: [],

      strengths: [],

      weaknesses: [],

      academicType: "",
    });

  const [skillInput,
    setSkillInput] =
    useState("");

  const [interestInput,
    setInterestInput] =
    useState("");

  // EXTRACTION DATA

 // EXTRACTION DATA

useEffect(() => {
  if (!extractedData) return;

  // HANDLE BOTH API FORMATS

  const studentName =
    extractedData?.student_name ||
    extractedData?.[
      "Student Name"
    ] ||
    extractedData?.studentName ||
    "";

  const subjects =
    extractedData?.subjects ||
    extractedData?.Subjects ||
    [];

  const marks =
    extractedData?.marks ||
    extractedData?.Marks ||
    {};

  const grades =
    extractedData?.grades ||
    extractedData?.Grades ||
    {};

  const percentage =
    extractedData?.percentage ||
    extractedData?.Percentage ||
    "";

  const skills =
    extractedData?.skills ||
    extractedData?.Skills ||
    extractedData?.skills_if_certificate ||
    extractedData?.[
      "Skills if certificate"
    ] ||
    [];

  // SAFE ARRAY

  const safeSubjects =
    Array.isArray(subjects)
      ? subjects
      : [];

  // SAFE OBJECTS

  const safeMarks =
    typeof marks === "object"
      ? marks
      : {};

  const safeGrades =
    typeof grades ===
    "object"
      ? grades
      : {};

  // CONVERT OBJECT → ARRAY

  const marksArray =
    safeSubjects.map(
      (subject) =>
        safeMarks?.[
          subject
        ] || ""
    );

  const gradesArray =
    safeSubjects.map(
      (subject) =>
        safeGrades?.[
          subject
        ] || ""
    );

  setFormData((prev) => ({
    ...prev,

    fullName:
      studentName,

    percentage:
      percentage,

    subjects:
      safeSubjects,

    marks:
      marksArray,

    grades:
      gradesArray,

    skills:
      Array.isArray(
        skills
      )
        ? skills
        : skills
        ? [skills]
        : [],
  }));
}, [extractedData]);

  // FETCH PROFILE

  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          setLoading(true);

          const studentId =
            localStorage.getItem(
              "studentId"
            );

          const res =
            await API.get(
              `/profile/${studentId}`
            );

          const profile =
            res.data.profile;

          if (profile) {
            setFormData({
              studentId:
                profile.studentId ||
                "",

              fullName:
                profile.fullName ||
                "",

              percentage:
                profile.percentage ||
                "",

              subjects:
                profile.subjects ||
                [],

              marks:
                profile.marks ||
                [],

              grades:
                profile.grades ||
                [],

              skills:
                profile.skills ||
                [],

              interests:
                profile.interests ||
                [],

              goals:
                profile.goals ||
                [],

              hobbies:
                profile.hobbies ||
                [],

              certifications:
                profile.certifications ||
                [],

              preferredCareers:
                profile.preferredCareers ||
                [],

              personalityTraits:
                profile.personalityTraits ||
                [],

              strengths:
                profile.strengths ||
                [],

              weaknesses:
                profile.weaknesses ||
                [],

              academicType:
                profile.academicType ||
                "",
            });
          }
        } catch (error) {
          console.log(
            "NEW PROFILE"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProfile();
  }, []);

  // ADD SKILL

  const addSkill = () => {
    if (!skillInput.trim())
      return;

    setFormData({
      ...formData,

      skills: [
        ...formData.skills,
        skillInput.trim(),
      ],
    });

    setSkillInput("");
  };

  // ADD INTEREST

  const addInterest = () => {
    if (
      !interestInput.trim()
    )
      return;

    setFormData({
      ...formData,

      interests: [
        ...formData.interests,
        interestInput.trim(),
      ],
    });

    setInterestInput("");
  };

  // SAVE PROFILE

  const handleSubmit =
    async () => {
      try {
        setSaving(true);

        setError("");

        setSuccess("");

        // VALIDATION

        if (
          !formData.fullName
        ) {
          setError(
            "Full name is required"
          );

          return;
        }

        if (
          !formData.percentage
        ) {
          setError(
            "Percentage is required"
          );

          return;
        }

        // AUTO ADD INPUTS

        const updatedSkills =
          [
            ...new Set([
              ...formData.skills,
              skillInput.trim(),
            ]),
          ].filter(Boolean);

        const updatedInterests =
          [
            ...new Set([
              ...formData.interests,
              interestInput.trim(),
            ]),
          ].filter(Boolean);

        // CLEAN ARRAYS

        const cleanArray = (
          arr
        ) =>
          arr
            .filter(Boolean)
            .map((item) =>
              item.trim()
            );

        const payload = {
          studentId:
            formData.studentId,

          fullName:
            formData.fullName,

          percentage:
            Number(
              formData.percentage
            ),

          subjects:
            cleanArray(
              formData.subjects
            ),

          marks:
            formData.marks.map(
              Number
            ),

          grades:
            cleanArray(
              formData.grades
            ),

          skills:
            updatedSkills,

          interests:
            updatedInterests,

          goals:
            cleanArray(
              formData.goals
            ),

          hobbies:
            cleanArray(
              formData.hobbies
            ),

          certifications:
            cleanArray(
              formData.certifications
            ),

          preferredCareers:
            cleanArray(
              formData.preferredCareers
            ),

          personalityTraits:
            cleanArray(
              formData.personalityTraits
            ),

          strengths:
            cleanArray(
              formData.strengths
            ),

          weaknesses:
            cleanArray(
              formData.weaknesses
            ),

          academicType:
            formData.academicType,
        };

        console.log(
          payload
        );

        try {
          await API.post(
            "/profile/complete",
            payload
          );

          setSuccess(
            "Profile created successfully"
          );
        } catch (error) {
          if (
            error.response
              ?.data
              ?.message ===
            "Profile already exists"
          ) {
            await API.put(
              `/profile/${formData.studentId}`,
              payload
            );

            setSuccess(
              "Profile updated successfully"
            );
          } else {
            throw error;
          }
        }

        setTimeout(() => {
          navigate(
            "/dashboard"
          );
        }, 1200);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data
            ?.message ||
            "Failed to save profile"
        );
      } finally {
        setSaving(false);
      }
    };

  // LOADER

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>

              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-indigo-500"></div>

              <div className="absolute inset-3 rounded-full bg-[#060816]"></div>
            </div>

            <h2 className="mt-6 text-lg font-semibold text-white">
              Loading Profile
            </h2>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl p-6 lg:p-8 text-white">
        {/* HEADER */}

        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            STEP {step} OF 2
          </p>

          <h1 className="text-4xl font-bold lg:text-5xl">
            Complete Your
            Profile
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
            AI extracted your
            academic details.
            Complete remaining
            information for
            personalized career
            insights.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            <AlertCircle
              size={18}
            />

            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
            <CheckCircle2
              size={18}
            />

            {success}
          </div>
        )}

        {/* STEP BAR */}

        <div className="mb-8 flex gap-3">
          <div
            className={`h-1 flex-1 rounded-full ${
              step >= 1
                ? "bg-gradient-to-r from-indigo-500 to-cyan-500"
                : "bg-white/10"
            }`}
          />

          <div
            className={`h-1 flex-1 rounded-full ${
              step >= 2
                ? "bg-gradient-to-r from-indigo-500 to-cyan-500"
                : "bg-white/10"
            }`}
          />
        </div>

        {/* STEP 1 */}

        {step === 1 && (
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-xl">
            <h2 className="mb-8 text-2xl font-bold lg:text-3xl">
              Academic Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Full Name"
                value={
                  formData.fullName
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Percentage"
                value={
                  formData.percentage
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    percentage:
                      e.target.value,
                  })
                }
              />
            </div>

            {/* TABLE */}

            <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
              <table className="min-w-full">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Subject
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Marks
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Grade
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {formData.subjects.map(
                    (
                      subject,
                      index
                    ) => (
                      <tr
                        key={
                          index
                        }
                        className="border-t border-white/10"
                      >
                        {/* SUBJECT */}

                        <td className="px-5 py-4">
                          <input
                            value={
                              formData
                                .subjects[
                                index
                              ]
                            }
                            onChange={(
                              e
                            ) => {
                              const updated =
                                [
                                  ...formData.subjects,
                                ];

                              updated[
                                index
                              ] =
                                e.target.value;

                              setFormData(
                                {
                                  ...formData,
                                  subjects:
                                    updated,
                                }
                              );
                            }}
                            className="w-full rounded-xl border border-white/10 bg-[#1b2140] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                          />
                        </td>

                        {/* MARKS */}

                        <td className="px-5 py-4">
                          <input
                            value={
                              formData
                                .marks[
                                index
                              ]
                            }
                            onChange={(
                              e
                            ) => {
                              const updated =
                                [
                                  ...formData.marks,
                                ];

                              updated[
                                index
                              ] =
                                e.target.value;

                              setFormData(
                                {
                                  ...formData,
                                  marks:
                                    updated,
                                }
                              );
                            }}
                            className="w-full rounded-xl border border-white/10 bg-[#1b2140] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                          />
                        </td>

                        {/* GRADES */}

                        <td className="px-5 py-4">
                          <input
                            value={
                              formData
                                .grades[
                                index
                              ]
                            }
                            onChange={(
                              e
                            ) => {
                              const updated =
                                [
                                  ...formData.grades,
                                ];

                              updated[
                                index
                              ] =
                                e.target.value;

                              setFormData(
                                {
                                  ...formData,
                                  grades:
                                    updated,
                                }
                              );
                            }}
                            className="w-full rounded-xl border border-white/10 bg-[#1b2140] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() =>
                  setStep(2)
                }
                className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 text-sm font-semibold text-white"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-xl">
            <h2 className="mb-8 text-2xl font-bold lg:text-3xl">
              Career &
              Personality
            </h2>

            {/* SKILLS */}

            <SectionTitle
              title="Skills"
            />

            <TagInput
              input={skillInput}
              setInput={
                setSkillInput
              }
              onAdd={addSkill}
            />

            <TagList
              items={
                formData.skills
              }
            />

            {/* INTERESTS */}

            <SectionTitle
              title="Interests"
            />

            <TagInput
              input={
                interestInput
              }
              setInput={
                setInterestInput
              }
              onAdd={
                addInterest
              }
            />

            <TagList
              items={
                formData.interests
              }
            />

            {/* TEXT AREAS */}

            <TextAreaField
              title="Goals"
              defaultValue={
                formData.goals.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goals:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            <TextAreaField
              title="Hobbies"
              defaultValue={
                formData.hobbies.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hobbies:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            <TextAreaField
              title="Certifications"
              defaultValue={
                formData.certifications.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certifications:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            <TextAreaField
              title="Preferred Careers"
              defaultValue={
                formData.preferredCareers.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferredCareers:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            <TextAreaField
              title="Personality Traits"
              defaultValue={
                formData.personalityTraits.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalityTraits:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            <TextAreaField
              title="Strengths"
              defaultValue={
                formData.strengths.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  strengths:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            <TextAreaField
              title="Weaknesses"
              defaultValue={
                formData.weaknesses.join(
                  ", "
                )
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  weaknesses:
                    e.target.value
                      .split(",")
                      .map((i) =>
                        i.trim()
                      ),
                })
              }
            />

            {/* STREAM */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Academic Type
              </label>

              <select
                value={
                  formData.academicType
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    academicType:
                      e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-[#1b2140] px-5 py-4 text-sm outline-none focus:border-cyan-400"
              >
                <option value="">
                  Select Stream
                </option>

                <option value="Science">
                  Science
                </option>

                <option value="Commerce">
                  Commerce
                </option>

                <option value="Arts">
                  Arts
                </option>
              </select>
            </div>

            {/* BUTTONS */}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() =>
                  setStep(1)
                }
                className="rounded-2xl border border-white/10 bg-black/20 px-7 py-4 text-sm font-semibold text-white"
              >
                ← Back
              </button>

              <button
                onClick={
                  handleSubmit
                }
                disabled={saving}
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" />

                    Saving...
                  </>
                ) : (
                  "Save Profile →"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// INPUT FIELD

const InputField = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      {label}
    </label>

    <input
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl border border-white/10 bg-[#1b2140] px-5 py-4 text-sm outline-none focus:border-cyan-400"
    />
  </div>
);

// SECTION TITLE

const SectionTitle = ({
  title,
}) => (
  <h3 className="mb-4 mt-8 text-xl font-bold">
    {title}
  </h3>
);

// TAG INPUT

const TagInput = ({
  input,
  setInput,
  onAdd,
}) => (
  <div className="flex gap-3">
    <input
      value={input}
      onChange={(e) =>
        setInput(
          e.target.value
        )
      }
      className="flex-1 rounded-2xl border border-white/10 bg-[#1b2140] px-5 py-4 text-sm outline-none focus:border-cyan-400"
    />

    <button
      type="button"
      onClick={onAdd}
      className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 text-white"
    >
      <Plus size={18} />
    </button>
  </div>
);

// TAG LIST

const TagList = ({
  items,
}) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {items.map((item, i) => (
      <div
        key={i}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium"
      >
        {item}
      </div>
    ))}
  </div>
);

// TEXTAREA

const TextAreaField = ({
  title,
  defaultValue,
  onChange,
}) => (
  <div className="mt-6">
    <label className="mb-2 block text-sm font-medium text-gray-300">
      {title}
    </label>

    <textarea
      rows={4}
      defaultValue={
        defaultValue
      }
      placeholder={`Add ${title}`}
      onChange={onChange}
      className="w-full rounded-3xl border border-white/10 bg-[#1b2140] px-5 py-5 text-sm outline-none focus:border-cyan-400"
    />
  </div>
);

export default CompleteProfile;