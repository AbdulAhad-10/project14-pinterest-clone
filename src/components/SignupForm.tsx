import { Input, Button, Form, Modal, notification } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  CloseOutlined,
  PinterestFilled,
} from "@ant-design/icons";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const router = useRouter();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const userData = {
        ...values,
        profilePicture: profilePictureUrl,
      };
      const response = await axios.post("/api/signup", userData);

      // Sign in the user
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      notification.success({
        message: "Signup Successful",
        description: response.data.message,
      });
      onClose();
      router.push("/home"); // Redirect to home page
    } catch (error: any) {
      notification.error({
        message: "Signup Failed",
        description:
          error.response?.data?.error ||
          error.message ||
          "An error occurred during signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      open={true}
      footer={null}
      closeIcon={<CloseOutlined />}
      onCancel={onClose}
      centered
      bodyStyle={{ padding: "20px 50px" }}
    >
      <div className="flex flex-col items-center">
        <PinterestFilled className="text-[var(--primary-color)] text-[32px]" />
        <h2 className="my-4 text-3xl font-semibold">Welcome to Pinterest</h2>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-full"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input placeholder="Username" className="rounded-lg" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" className="rounded-lg" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              placeholder="Create a password"
              className="rounded-lg focus:bg-[var(--primary-color)]"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item name="profilePicture">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Upload Profile Picture:
            </label>
            <UploadButton
              className="ut-button:bg-[var(--primary-color)] ut-button:ut-readying:bg-[var(--primary-color)] ut-button:ut-readying:opacity-50  ut-button:w-full ut-button:rounded-lg ut-button:focus-within:ring-[var(--primary-color)] ut-uploading:ut-button:bg-[#e60023]/50 ut-uploading:ut-button:after:bg-[var(--primary-color)]"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setProfilePictureUrl(res[0].url);
                form.setFieldsValue({ profilePicture: res[0].url });
                console.log("Files: ", res);
                notification.success({
                  message: "Upload Completed",
                  description: "Your image has been uploaded successfully.",
                });
              }}
              onUploadError={(error) => {
                notification.error({
                  message: "Upload Error",
                  description: `ERROR! ${error.message}`,
                });
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-lg text-white bg-[var(--primary-color)] rounded-full hover:!bg-[var(--primary-color)]"
              loading={isLoading}
            >
              {isLoading ? "Signing Up..." : "Continue"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default SignupForm;
