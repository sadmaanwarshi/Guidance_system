import { useAuth } from "../context/AuthContext";

const DashboardNavbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-8 py-5 backdrop-blur-xl">
      <h1 className="text-2xl font-bold text-white">
        Career<span className="text-blue-400">.AI</span>
      </h1>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardNavbar;