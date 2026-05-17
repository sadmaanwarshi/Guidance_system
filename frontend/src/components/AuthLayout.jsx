import GradientBackground from "./GradientBackground";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4">
      <GradientBackground />

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;