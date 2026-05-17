import {
  Bell,
  Search,
  User,
} from "lucide-react";

const Header = () => {
  const studentName =
    localStorage.getItem(
      "studentName"
    );

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#0b1120]/80 px-8 py-4 backdrop-blur-2xl">
      {/* SEARCH */}

      <div className="relative w-full max-w-2xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search careers, skills, courses..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none"
        />
      </div>

      {/* RIGHT */}

      <div className="ml-8 flex items-center gap-5">
        <button className="rounded-full border border-white/10 bg-white/5 p-3">
          <Bell className="text-white" />
        </button>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <h3 className="font-semibold text-white">
              {studentName}
            </h3>

            <p className="text-sm text-gray-400">
              Student
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
            <User className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;