import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";

import MainLayout from "../components/MainLayout";

const Extraction = () => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // LOAD DATA

  useEffect(() => {
    try {
      // FROM NAVIGATION

      if (location.state) {
        setData(location.state);

        localStorage.setItem(
          "extractedFullData",
          JSON.stringify(
            location.state
          )
        );
      }

      // FROM LOCAL STORAGE

      else {
        const saved =
          localStorage.getItem(
            "extractedFullData"
          );

        if (saved) {
          setData(
            JSON.parse(saved)
          );
        } else {
          setError(
            "No extracted data found"
          );
        }
      }
    } catch (err) {
      console.log(err);

      setError(
        "Failed to load extraction data"
      );
    } finally {
      setLoading(false);
    }
  }, [location]);

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
              Loading Extraction
            </h2>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ERROR UI

  if (error || !data) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md rounded-[28px] border border-red-500/20 bg-red-500/10 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <AlertCircle className="text-red-400" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Extraction Failed
            </h2>

            <p className="mt-3 text-sm text-red-200">
              {error}
            </p>

            <button
              onClick={() =>
                navigate("/upload")
              }
              className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white"
            >
              Upload Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // SAFE DATA

  const extracted =
    data?.extractedData ||
    {};

  const document =
    data?.document || {};

  // FIXED DATA ACCESS

  const studentName =
    extracted?.student_name ||
    "Unknown Student";

  const subjects =
    Array.isArray(
      extracted?.subjects
    )
      ? extracted.subjects
      : [];

  const marks =
    Array.isArray(
      extracted?.marks
    )
      ? extracted.marks
      : [];

  const grades =
    Array.isArray(
      extracted?.grades
    )
      ? extracted.grades
      : [];

  const percentage =
    extracted?.percentage ||
    0;

  const skills =
    extracted?.skills_if_certificate ||
    "";

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl p-6 text-white lg:p-8">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
              <CheckCircle2
                size={16}
                className="text-green-400"
              />

              <p className="text-xs font-semibold uppercase tracking-widest text-green-400">
                AI EXTRACTION
                COMPLETE
              </p>
            </div>

            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              Review Extracted
              Data
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
              Verify your
              academic details
              before continuing to
              profile completion.
            </p>
          </div>

          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2">
            <p className="text-sm font-semibold text-cyan-400">
              98% AI Accuracy
            </p>
          </div>
        </div>

        {/* STEP BAR */}

        <div className="mb-10 flex gap-3">
          <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />

          <div className="h-1 flex-1 rounded-full bg-white/10" />

          <div className="h-1 flex-1 rounded-full bg-white/10" />
        </div>

        {/* DOCUMENT */}

        <div className="mb-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500">
              <FileText />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Uploaded Document
              </h2>

              <p className="text-sm text-gray-400">
                AI processed your
                uploaded marksheet
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard
              title="Document Type"
              value={
                document?.documentType ||
                "N/A"
              }
            />

            <InfoCard
              title="File Name"
              value={
                document?.fileName ||
                "N/A"
              }
            />

            <InfoCard
              title="File Size"
              value={`${(
                (document?.fileSize ||
                  0) / 1024
              ).toFixed(1)} KB`}
            />

            <InfoCard
              title="Status"
              value={
                document?.uploadStatus ||
                "Processed"
              }
            />
          </div>
        </div>

        {/* STUDENT DETAILS */}

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-3">
            <Field
              label="Student Name"
              value={studentName}
            />

            <Field
              label="Percentage"
              value={`${percentage}%`}
            />

            <Field
              label="Subjects"
              value={`${subjects.length}`}
            />
          </div>

          {/* SUBJECT TABLE */}

          <div className="mt-10">
            <h2 className="mb-5 text-2xl font-bold">
              Subject Performance
            </h2>

            <div className="overflow-x-auto rounded-3xl border border-white/10">
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
                  {subjects.length >
                  0 ? (
                    subjects.map(
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
                              type="text"
                              defaultValue={
                                subject
                              }
                              className="w-full rounded-xl border border-white/10 bg-[#1b2140] px-4 py-3 text-sm outline-none"
                            />
                          </td>

                          {/* MARKS */}

                          <td className="px-5 py-4">
                            <input
                              type="text"
                              defaultValue={
                                marks[
                                  index
                                ] ??
                                ""
                              }
                              className="w-full rounded-xl border border-white/10 bg-[#1b2140] px-4 py-3 text-sm outline-none"
                            />
                          </td>

                          {/* GRADES */}

                          <td className="px-5 py-4">
                            <input
                              type="text"
                              defaultValue={
                                grades[
                                  index
                                ] ??
                                ""
                              }
                              className="w-full rounded-xl border border-white/10 bg-[#1b2140] px-4 py-3 text-sm outline-none"
                            />
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-5 py-8 text-center text-gray-400"
                      >
                        No subjects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SKILLS */}

          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">
              Extracted Skills
            </h2>

            <textarea
              rows={4}
              defaultValue={
                skills ||
                "No skills extracted"
              }
              className="w-full rounded-3xl border border-white/10 bg-[#1b2140] px-5 py-5 text-sm outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() =>
              navigate("/upload")
            }
            className="rounded-2xl border border-white/10 bg-black/20 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/5"
          >
            ← Back
          </button>

          <button
            onClick={() =>
              navigate(
                "/complete-profile",
                {
                  state: {
                    extractedData:
                      extracted,

                    document,
                  },
                }
              )
            }
            className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.01]"
          >
            Continue →
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

// INFO CARD

const InfoCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1b2140] p-5">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        {title}
      </p>

      <h3 className="mt-2 truncate text-base font-semibold">
        {value}
      </h3>
    </div>
  );
};

// FIELD

const Field = ({
  label,
  value,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        type="text"
        defaultValue={value}
        className="w-full rounded-2xl border border-white/10 bg-[#1b2140] px-5 py-4 text-sm outline-none"
      />
    </div>
  );
};

export default Extraction;