import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import MainLayout from "../components/MainLayout";

import API from "../api/axios";

const Upload = () => {
  const navigate =
    useNavigate();

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // FILE CHANGE

  const handleFileChange = (
    e
  ) => {
    setError("");

    const selectedFile =
      e.target.files[0];

    if (!selectedFile)
      return;

    // VALID TYPES

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {
      setError(
        "Only PDF, JPG and PNG files are allowed"
      );

      return;
    }

    // SIZE CHECK

    if (
      selectedFile.size >
      10 * 1024 * 1024
    ) {
      setError(
        "File size must be below 10MB"
      );

      return;
    }

    setFile(selectedFile);
  };

  // ANALYZE

  const handleAnalyze =
    async () => {
      if (!file || loading)
        return;

      try {
        setLoading(true);

        setError("");

        const studentId =
          localStorage.getItem(
            "studentId"
          );

        // AUTH CHECK

        if (!studentId) {
          setError(
            "Please login again"
          );

          navigate("/login");

          return;
        }

        const formData =
          new FormData();

        formData.append(
          "document",
          file
        );

        formData.append(
          "documentType",
          "marksheet"
        );

        formData.append(
          "studentId",
          studentId
        );

        const res =
          await API.post(
            "/upload/document",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        console.log(
          "UPLOAD RESPONSE:",
          res.data
        );

        // SAVE EXTRACTION

        localStorage.setItem(
          "extractedData",
          JSON.stringify(
            res.data
              .extractedData
          )
        );

        localStorage.setItem(
          "extractedFullData",
          JSON.stringify(
            res.data
          )
        );

        // NAVIGATE

        navigate(
          "/extraction",
          {
            state: res.data,
          }
        );
      } catch (error) {
        console.log(
          error.response
            ?.data ||
            error.message
        );

        // API ERRORS

        if (
          error.response
            ?.status === 500
        ) {
          setError(
            "Server error. Please try again later."
          );
        } else if (
          error.response
            ?.status === 400
        ) {
          setError(
            error.response
              ?.data
              ?.message ||
              "Invalid document upload"
          );
        } else {
          setError(
            "Failed to analyze document"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">
        {/* HEADER */}

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2">
            <Sparkles
              size={15}
              className="text-indigo-400"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              STEP 1 OF 3
            </p>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight lg:text-5xl">
            Upload your academic
            document
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
            Upload your
            marksheet or academic
            certificate. AI will
            automatically extract
            subjects, grades,
            marks and skills.
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

        {/* UPLOAD BOX */}

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl lg:p-14">
          {/* BG */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_30%)]" />

          <div className="relative flex flex-col items-center justify-center text-center">
            {/* ICON */}

            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-xl shadow-cyan-500/20">
              <UploadCloud className="h-12 w-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold">
              Drop your file here
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400">
              Supports PDF, JPG,
              PNG and scanned
              documents up to
              10MB.
            </p>

            {/* BUTTON */}

            <label className="mt-10 cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold transition-all hover:bg-white/10">
              Browse File

              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={
                  handleFileChange
                }
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* FILE CARD */}

        {file && (
          <div className="mt-8 flex flex-col gap-5 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-500 p-5">
                <FileText className="h-8 w-8 text-white" />
              </div>

              <div>
                <h3 className="max-w-md truncate text-xl font-semibold">
                  {file.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {(
                    file.size /
                    1024
                  ).toFixed(1)}{" "}
                  KB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-green-500/10 px-4 py-2">
              <CheckCircle2 className="text-green-400" />

              <span className="text-sm font-medium text-green-400">
                Ready to analyze
              </span>
            </div>
          </div>
        )}

        {/* ACTIONS */}

        <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
          <button
            onClick={() => {
              setFile(null);

              setError("");
            }}
            className="rounded-2xl border border-white/10 bg-black/20 px-7 py-4 text-sm font-semibold transition-all hover:bg-white/5"
          >
            Clear
          </button>

          <button
            onClick={
              handleAnalyze
            }
            disabled={
              loading || !file
            }
            className={`flex min-w-[240px] items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all ${
              loading
                ? "cursor-not-allowed bg-indigo-500/60"
                : "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-[1.01]"
            } ${
              !file
                ? "opacity-60"
                : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />

                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />

                Analyze with AI
              </>
            )}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Upload;