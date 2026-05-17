import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({
  children,
}) => {
  return (
    <div className="h-screen overflow-hidden bg-[#030712] text-white">
      {/* SIDEBAR */}

      <div className="fixed left-0 top-0 z-50">
        <Sidebar />
      </div>

      {/* MAIN */}

      <div className="ml-[300px] flex h-screen flex-col">
        {/* HEADER */}

        <div className="sticky top-0 z-40">
          <Header />
        </div>

        {/* PAGE CONTENT */}

        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.18),transparent_40%)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;