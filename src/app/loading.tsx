import { Spin } from "antd";

interface LoadingProps {
  tip?: string;
  size?: "small" | "default" | "large";
}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export default Loading;
