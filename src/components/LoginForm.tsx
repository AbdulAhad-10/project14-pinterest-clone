import { Input, Button, Form, Modal, notification } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  CloseOutlined,
  PinterestFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        notification.error({
          message: "Login Failed",
          description: result.error,
        });
      } else {
        // Update the session
        await update();

        notification.success({
          message: "Login Successful",
          description: "Welcome back!",
        });
        onClose();
        router.push("/home");
      }
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "An unexpected error occurred",
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
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-full"
        >
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
              placeholder="Password"
              className="rounded-lg"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-lg text-white bg-[var(--primary-color)] rounded-full hover:!bg-[var(--primary-color)]"
              loading={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default LoginForm;
