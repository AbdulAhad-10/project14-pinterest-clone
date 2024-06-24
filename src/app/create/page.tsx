"use client";

import { Input, Button, Form, notification } from "antd";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const { TextArea } = Input;

const CreatePage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/createPin", {
        image: imageUrl,
        title: values.title,
        description: values.description,
      });

      notification.success({
        message: "Pin Created",
        description: "Your pin has been created successfully.",
      });
      router.push("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: "Error",
          description:
            error.response?.data?.error ||
            "Failed to create pin. Please try again.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className="relative left-0 min-h-screen top-20">
      <div className="flex flex-col items-center">
        <h2 className="my-4 text-3xl font-semibold">Create Pin</h2>
        <Form
          form={form}
          name="createPin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-1/2"
        >
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <UploadDropzone
              className="ut-button:bg-[var(--primary-color)] ut-button:ut-readying:bg-[var(--primary-color)] ut-button:ut-readying:opacity-50 ut-button:w-full ut-button:rounded-lg ut-button:focus-within:ring-[var(--primary-color)] ut-uploading:ut-button:bg-[#e60023]/50 ut-uploading:ut-button:after:bg-[var(--primary-color)] cursor-pointer"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
                form.setFieldsValue({ image: res[0].url });
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

          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input
              placeholder="Add a title"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Add a detailed description"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-lg text-white bg-[var(--primary-color)] rounded-full hover:!bg-[var(--primary-color)]"
              loading={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default CreatePage;
