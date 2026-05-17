import {
  Brain,
  Briefcase,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";
import API from "../api/axios";

const Dashboard = () => {
  const [report, setReport] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const studentId =
    localStorage.getItem(
      "studentId"
    );

  useEffect(() => {
    fetchCareerReport();
  }, []);

  const fetchCareerReport =
    async () => {
      try {
        const res = await API.get(
          `/final-career/report/${studentId}`
        );

        console.log(
          "CAREER REPORT:",
          res.data
        );

        setReport(
          res.data.finalReport ||
            res.data.report ||
            res.data
        );
      } catch (error) {
        console.log(
          error.response?.data ||
            error.message
        );
      } finally {
        setLoading(false);
      }
    };

  const trendData = [
    {
      month: "Jan",
      ai: 65,
      web: 50,
      data: 55,
    },
    {
      month: "Feb",
      ai: 70,
      web: 52,
      data: 58,
    },
    {
      month: "Mar",
      ai: 78,
      web: 55,
      data: 62,
    },
    {
      month: "Apr",
      ai: 84,
      web: 58,
      data: 66,
    },
    {
      month: "May",
      ai: 89,
      web: 60,
      data: 70,
    },
    {
      month: "Jun",
      ai: 96,
      web: 62,
      data: 75,
    },
  ];

  const salaryData = [
    {
      role: "Junior",
      salary: 150,
    },
    {
      role: "Mid",
      salary: 300,
    },
    {
      role: "Senior",
      salary: 500,
    },
    {
      role: "Lead",
      salary: 620,
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center bg-[#060816]">
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>

              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-indigo-500"></div>

              <div className="absolute inset-3 rounded-full bg-[#060816]"></div>
            </div>

            <h2 className="mt-8 text-xl font-semibold text-white">
              Generating AI Career Insights
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Please wait while we
              analyze your profile...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-full bg-[#060816] text-white">
        <div className="space-y-6 p-6 lg:p-8">
          {/* HERO */}

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#293462] to-[#402050] p-7">
            <div className="flex flex-col justify-between gap-8 xl:flex-row">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
                  AI INSIGHTS GENERATED
                </p>

                <h1 className="text-4xl font-bold lg:text-5xl">
                  Hello{" "}
                  {
                    report?.student
                      ?.name
                  }{" "}
                  👋
                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
                  Based on your{" "}
                  {
                    report
                      ?.academics
                      ?.percentage
                  }
                  % overall performance,
                  your top match is{" "}
                  <span className="font-semibold text-cyan-400">
                    {
                      report
                        ?.topCareerMatches?.[0]
                        ?.role
                    }
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
                    <Brain size={22} />
                  </div>

                  <p className="text-sm text-gray-400">
                    Top Match
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {
                      report
                        ?.topCareerMatches?.[0]
                        ?.score
                    }
                    %
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
                    <Brain size={22} />
                  </div>

                  <p className="text-sm text-gray-400">
                    Careers
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {
                      report
                        ?.topCareerMatches
                        ?.length
                    }
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
                    <Brain size={22} />
                  </div>

                  <p className="text-sm text-gray-400">
                    Skills Gap
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {
                      report
                        ?.guidance
                        ?.missingSkills
                        ?.length
                    }
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* CAREERS */}

          <div>
            <h2 className="text-3xl font-bold">
              Top Career Matches
            </h2>

            <p className="mt-2 text-gray-400">
              Roles best aligned with
              your profile
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {report?.topCareerMatches?.map(
                (career, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <Briefcase size={24} />
                    </div>

                    <p className="text-lg text-gray-300">
                      {career.role}
                    </p>

                    <h3 className="mt-4 text-4xl font-bold text-cyan-400">
                      {career.score}%
                    </h3>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        style={{
                          width: `${career.score}%`,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* STRENGTHS */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-full bg-green-500/20 p-4 text-green-400">
                  <TrendingUp />
                </div>

                <h2 className="text-2xl font-bold">
                  Strengths
                </h2>
              </div>

              <div className="space-y-4">
                {report?.guidance?.strengths?.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-green-400" />

                      <span className="text-base">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-full bg-yellow-500/20 p-4 text-yellow-400">
                  <AlertCircle />
                </div>

                <h2 className="text-2xl font-bold">
                  Areas to Improve
                </h2>
              </div>

              <div className="space-y-4">
                {report?.guidance?.weaknesses?.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />

                      <span className="text-base">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* CHARTS */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="col-span-2 rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Industry Demand Trends
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Hiring index last 6
                    months
                  </p>
                </div>

                <div className="rounded-full bg-indigo-500/20 px-4 py-1 text-sm text-indigo-400">
                  Live
                </div>
              </div>

              <div className="h-[280px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={trendData}
                  >
                    <XAxis
                      dataKey="month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="ai"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="web"
                      stroke="#06b6d4"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="data"
                      stroke="#14b8a6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">
                Salary Insights
              </h2>

              <div className="mt-6 h-[280px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={salaryData}
                  >
                    <XAxis
                      dataKey="role"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="salary"
                      fill="#06b6d4"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* SKILL GAP */}

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              Skill Gap Analysis
            </h2>

            <div className="mt-8 space-y-6">
              {report?.guidance?.missingSkills?.map(
                (skill, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {skill}
                      </h3>

                      <span className="text-sm text-gray-400">
                        40% / 90%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ROADMAP */}

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              Personalized Learning
              Roadmap
            </h2>

            <div className="mt-10 space-y-8">
              {report?.guidance?.learningRoadmap?.map(
                (step, i) => (
                  <div
                    key={i}
                    className="flex gap-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-lg font-bold">
                      {i + 1}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">
                        {step}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Python",
                          "AI",
                          "ML",
                        ].map(
                          (
                            tag,
                            idx
                          ) => (
                            <span
                              key={idx}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* TECH STACK */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">
                Recommended Tech Stack
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {report?.guidance?.recommendedTools?.map(
                  (tool, i) => (
                    <div
                      key={i}
                      className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold"
                    >
                      {tool}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="col-span-2 rounded-[24px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">
                Personalized AI
                Guidance
              </h2>

              <p className="mt-5 text-base leading-relaxed text-gray-300">
                {
                  report?.guidance
                    ?.personalizedGuidance
                }
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "ML Specialization",
                  "Portfolio Projects",
                  "Research Internship",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;