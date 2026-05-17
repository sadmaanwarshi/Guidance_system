import {
  LayoutDashboard,
  Upload,
  Brain,
  TrendingUp,
  Map,
  GraduationCap,
  Settings,
  LogOut,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-[300px] flex-col border-r border-white/10 bg-[#0b1120]/90 backdrop-blur-2xl">
      {/* LOGO */}

      <div className="flex items-center gap-3 px-8 py-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
          ✦
        </div>

        <h1 className="text-3xl font-bold text-white">
          Path
          <span className="text-cyan-400">
            .AI
          </span>
        </h1>
      </div>

      {/* NAVIGATION */}

      <div className="mt-10 flex flex-1 flex-col gap-3 px-5">
        <SidebarItem
          icon={
            <LayoutDashboard
              size={20}
            />
          }
          title="Overview"
          active={
            location.pathname ===
            "/dashboard"
          }
          onClick={() =>
            navigate("/dashboard")
          }
        />

        <SidebarItem
          icon={
            <Upload size={20} />
          }
          title="Upload Marksheet"
          active={
            location.pathname ===
            "/upload"
          }
          onClick={() =>
            navigate("/upload")
          }
        />

        <SidebarItem
          icon={
            <Brain size={20} />
          }
          title="AI Extraction"
          active={
            location.pathname ===
            "/extraction"
          }
          onClick={() =>
            navigate(
              "/extraction"
            )
          }
        />

        <SidebarItem
          icon={
            <TrendingUp
              size={20}
            />
          }
          title="Career Insights"
          active={
            location.pathname ===
            "/dashboard"
          }
          onClick={() =>
            navigate("/dashboard")
          }
        />

        <SidebarItem
          icon={<Map size={20} />}
          title="Roadmap"
          active={
            location.pathname ===
            "/roadmap"
          }
          onClick={() =>
            navigate("/roadmap")
          }
        />

        <SidebarItem
          icon={
            <GraduationCap
              size={20}
            />
          }
          title="Learning"
          active={
            location.pathname ===
            "/learning"
          }
          onClick={() =>
            navigate("/learning")
          }
        />
      </div>

      {/* FOOTER */}

      <div className="border-t border-white/10 p-5">
        <SidebarItem
          icon={
            <Settings size={20} />
          }
          title="Settings"
          active={
            location.pathname ===
            "/settings"
          }
          onClick={() =>
            navigate("/settings")
          }
        />

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-red-400 transition-all hover:bg-red-500/10"
        >
          <LogOut size={20} />

          <span className="text-lg font-medium">
            Logout
          </span>
        </button>

        {/* PRO CARD */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">
            Upgrade to Pro
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Unlock unlimited AI
            reports
          </h3>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({
  icon,
  title,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
        active
          ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}

      <span className="text-lg font-medium">
        {title}
      </span>
    </button>
  );
};

export default Sidebar;