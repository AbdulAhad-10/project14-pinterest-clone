import { useState } from "react";
import { notification } from "antd";
import { useSession } from "next-auth/react";

interface SaveButtonProps {
  pinId: string;
  className?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ pinId, className = "" }) => {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userId = session?.user.id;
      const response = await fetch("/api/savePin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pinId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save pin");
      }

      const data = await response.json();

      notification.success({
        message: "Pin Saved",
        description: "The pin has been successfully saved to your profile.",
      });
    } catch (err) {
      console.error("Error saving pin:", err);

      notification.error({
        message: "Save Failed",
        description:
          "An error occurred while saving the pin. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      className={`bg-[var(--primary-color)] text-white ${
        isSaving ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={handleSave}
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Save"}
    </button>
  );
};

export default SaveButton;
