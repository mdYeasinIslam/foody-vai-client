"use client";
import { Button, Form, FormProps, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

type FieldType = {
  userName: string;
  email: string;
  password: string;
  remember?: string;
};
const SignUpPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();

  // const signUpFn = useSignUp({
  //   config: {
  //     onSuccess(data) {
  //       console.log(data);
  //       if (!data) return;
  //       messageApi
  //         .loading("User created successfully")
  //         .then(() => router.push("/signIn"));
  //     },
  //     onError(error) {
  //       console.log(error);
  //       messageApi.error(`${error.message}`, 1);
  //     },
  //   },
  // });
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { userName, email, password } = values;
    if (email.toLowerCase().includes('admin')) {
      // signUpFn.mutate({ userName, email, password, role: "admin" });
    } else {
      // signUpFn.mutate({ userName, email, password });
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (error) => {
    console.log(error);
  };
  return (
    <section>
      {messageHolder}
      <div className=" mx-auto flex flex-col-reverse md:flex-row items-center justify-center h-screen gap-10 px-4 md:px-0">
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg  px-10 py-12 w-full ">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Register</h1>
          <Form
            name="signup"
            layout="vertical"
            className="max-w-md! w-full"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            scrollToFirstError={true}
            size="large"
            rootClassName="[&_.ant-form-item-label]:p-0! "
          >
            <Form.Item<FieldType>
              label="UserName"
              name="userName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              className="m-0! "
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
              className="m-0!"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              // hasFeedback
              className="m-0!"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                className="bg-(--primary-color-800)! text-white! w-full mt-3 border! border-(--primary-color-800)!"
                htmlType="submit"
                size="large"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          {/* google login  */}
          <div className="w-full flex flex-col max-w-md">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white border border-green-900 hover:bg-(--primary-color-700) text-gray-500 font-semibold rounded py-3 hover:text-white transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm">Sign in with Google</span>
            </button>
          </div>
          <h1 className="text-gray-400 pt-3">
            Already have an account?{" "}
            <Link
              href="signIn"
              className="text-(--primary-color-700) hover:underline pl-1 font-medium"
            >
              Sign In..
            </Link>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
