"use client";

import { PathName } from "@/src/@libs/constant/_paths";
import { Button, Form, FormProps, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};
const SignInPage = () => {
  const [messageApi, messageHolder] = message.useMessage();
  const route = useRouter();
  // const signInFn = useSignIn({
  //   config: {
  //     onSuccess(data) {
  //       if (!data) return;
  //       console.log(data.user)
  //       storage.setData("token", data?.token);
  //       messageApi.loading('Welcome to Bazaryo', 1).then(() => {
  //         if (data?.user?.role === 'admin') {
  //          return route.push('/admin')
  //         }
  //         route.push('/')
  //       })
  //     },
  //     onError(error) {
  //        messageApi.error(`${error.message}`, 1)
  //     },
  //   },
  // });
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    // signInFn.mutate({ email, password });
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (error) => {
    console.log(error);
  };

  return (
    <section>
      {messageHolder}
      <div className="  mx-auto flex flex-col-reverse md:flex-row items-center justify-center md:h-screen gap-10 px-4 md:px-0">
        {/* form section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg  px-10 py-12 w-full ">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Login</h1>
          {/* <form
            onSubmit={formHandler}
            className="w-full flex flex-col gap-4 max-w-md"
          >
            {error.length > 0 && <div className="text-red-500">{error}</div>}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end w-full">
              <Link
                href={paths?.auth?.forgotPassword}
                className="text-gray-600 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-(--primary-color-700) text-white font-semibold rounded py-3 mt-2 hover:bg-(--hover-color) transition"
            >
              Sign In
            </button>
          </form> */}
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
                Log In
              </Button>
            </Form.Item>
          </Form>
          {/* google login  */}
          <div className="w-full flex flex-col max-w-md">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white border border-green-900 hover:bg-(--primary-color-700) text-gray-500 font-semibold rounded py-3 mt-4 hover:text-white transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm">Sign in with Google</span>
            </button>
          </div>
          <h1 className="text-gray-400 mt-3">
            Do not have an account?{" "}
            <Link
              href={PathName?.auth?.signUp}
              className="text-(--primary-color-700) hover:underline pl-1 font-medium"
            >
              Sign up..
            </Link>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
