const GradientBackground = () => {
  return (
    <>
      <div className="absolute top-[-120px] left-[-120px] h-[400px] w-[400px] rounded-full bg-blue-600/30 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[400px] w-[400px] rounded-full bg-purple-600/30 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
    </>
  );
};

export default GradientBackground;