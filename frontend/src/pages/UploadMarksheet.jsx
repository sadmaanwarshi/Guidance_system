// src/pages/UploadMarksheet.jsx

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import API from "../services/api";

function UploadMarksheet() {

    const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;

    setSelectedFile(file);

    setUploaded(false);
  };

  const handleUpload = async () => {

    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("document", selectedFile);

    formData.append("documentType", "marksheet");

    try {

      const res = await API.post(
        "/upload/document",
        formData
      );

      console.log(res.data);

      setUploaded(true);

setTimeout(() => {
  navigate("/ai-extraction");
}, 1200);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  const clearFile = () => {

    setSelectedFile(null);

    setUploaded(false);
  };

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* STEP */}
        <p className="text-blue-400 text-sm font-semibold mb-2 tracking-wide">
          STEP 1 OF 3
        </p>

        {/* TITLE */}
        <h1 className="text-5xl leading-tight font-bold text-white mb-4">
          Upload your marksheet
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-400 mb-12">
          PDF, JPG, or PNG. We'll extract everything automatically.
        </p>

        {/* UPLOAD BOX */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="
          relative
          h-[300px]
          rounded-[36px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          flex
          flex-col
          items-center
          justify-center
          text-center
          cursor-pointer
          overflow-hidden
          transition-all
          duration-300
          hover:border-blue-500/40
          "
        >

          {/* GLOW */}
          <div
            className="
            absolute
            w-[350px]
            h-[350px]
            bg-purple-500/20
            blur-[120px]
            rounded-full
            bottom-[-180px]
            "
          />

          {/* ICON */}
          <div
            className="
            relative
            z-10
            w-20
            h-20
            rounded-[28px]
            bg-gradient-to-br
            from-[#7B61FF]
            to-[#12B5FF]
            flex
            items-center
            justify-center
            mb-7
            "
          >
            <UploadCloud size={36} className="text-white" />
          </div>

          {/* TEXT */}
          <h3 className="relative z-10 text-2xl font-semibold mb-3">
            Drop files here, or click to browse
          </h3>

          <p className="relative z-10 text-gray-400 text-lg">
            Maximum 10MB per file
          </p>

          {/* INPUT */}
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              handleFileSelect(e.target.files[0])
            }
          />
        </div>

        {/* FILE CARD */}
        {selectedFile && (

          <div
            className="
            mt-8
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.04]
            p-5
            "
          >

            <div className="flex items-center justify-between">

              {/* LEFT */}
              <div className="flex items-center gap-5">

                <div
                  className="
                  w-14
                  h-14
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  to-cyan-400
                  flex
                  items-center
                  justify-center
                  "
                >
                  <FileText size={24} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    {selectedFile.name}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {/* STATUS */}
              {uploaded && (
                <CheckCircle2
                  size={28}
                  className="text-green-400"
                />
              )}

            </div>

            {/* PROGRESS */}
            <div className="mt-5">

              <div
                className="
                w-full
                h-2
                rounded-full
                bg-white/10
                overflow-hidden
                "
              >
                <div
                  className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-[#7B61FF]
                  to-[#12B5FF]
                  w-full
                  "
                />
              </div>

            </div>

          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-10">

          {/* CLEAR */}
          <button
            onClick={clearFile}
            className="
            px-8
            py-3
            rounded-2xl
            border
            border-white/10
            bg-black/40
            font-semibold
            hover:bg-white/10
            transition-all
            "
          >
            Clear
          </button>

          {/* ANALYZE */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="
            flex
            items-center
            gap-3
            px-8
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-[#7B61FF]
            to-[#12B5FF]
            font-semibold
            text-lg
            transition-all
            hover:scale-[1.02]
            disabled:opacity-50
            disabled:cursor-not-allowed
            "
          >
            <Sparkles size={20} />

            {loading
              ? "Analyzing..."
              : "Analyze with AI"}
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default UploadMarksheet;