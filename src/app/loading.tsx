import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader
        strokeWidth={0.5}
        size={160}
        className="animate-spin"
        color="#ffffff"
      />
    </div>
  );
};

export default Loading;
