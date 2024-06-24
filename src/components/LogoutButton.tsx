import { LogoutOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <button
      className="bg-[var(--primary-color)] text-white text-nowrap"
      onClick={handleLogout}
    >
      <LogoutOutlined /> {"Logout"}
    </button>
  );
};

export default LogoutButton;
