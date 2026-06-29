"use client";

import BaseButton from "@/src/@base/components/BaseButton";
import { PathName } from "@/src/@libs/constant/_paths";
import { Checkbox, CheckboxProps, Form, FormProps, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useSignIn } from "../libs/hooks";
import { useAuthState } from "../libs/hooks/useAuthState";
import { useCartProducts } from "../../cart/libs/hooks";
import { useCartState } from "../../cart/libs/hooks/useCartState";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
  signInAsGuest?: boolean;
};
const SignInPage = () => {
  const [messageApi, messageHolder] = message.useMessage();
  const { setAuthUser } = useAuthState();
  const { cart, syncGuestCartToDB } = useCartState(messageApi);
  const { refetch } = useCartProducts({});
  const [form] = Form.useForm();

  const route = useRouter();
  const { mutate: signInMutate } = useSignIn({
    config: {
      onSuccess: async (data) => {
        if (!data?.success) return;
        setAuthUser(data?.user, data.token);
        messageApi.loading("Welcome to FoodyVai", 1).then(() => {
          if (data?.user && data?.user?.email && cart.length > 0) {
            syncGuestCartToDB(data?.user);
          }
          if (data?.user?.role === "admin") {
            return route.push("/admin");
          }
          route.push("/");
        });
        await refetch();
      },
      onError(error) {
        console.log(error);
        messageApi.error(`${error.message}`, 1);
      },
    },
  });

  const onChange: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      form.setFieldsValue({
        email: "test@test.com",
        password: "aassdd",
      });
    } else {
      form.setFieldsValue({
        email: "",
        password: "",
      });
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    signInMutate({ email, password });
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

          <Form
            form={form}
            name="signup"
            layout="vertical"
            className="max-w-md! w-full"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            scrollToFirstError={true}
            size="large"
            rootClassName="[&_.ant-form-item-label]:p-0!"
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
              className="m-0!"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="signInAsGuest"
              valuePropName="checked"
              className="m-0! flex! items-center!"
            >
              <Checkbox onChange={onChange}>Sign in as guest</Checkbox>

              {/* <>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleGuestCheckboxFn}
                />
                <span className="ml-2">Sign in as guest</span>
              </> */}
            </Form.Item>
            <Form.Item>
              {/* <Button
                type="default"
                className="bg-(--primary-color-700)! text-white! w-full mt-3 border! border-(--primary-color-800)!"
                htmlType="submit"
                size="large"
              >
                Log In
              </Button> */}
              <BaseButton content="Log In" />
            </Form.Item>
          </Form>
          {/* google login  */}
          <div className="w-full flex flex-col max-w-md">
            <button
              type="button"
              className="btn-primary flex items-center justify-center gap-2  font-semibold rounded  max-md:py-1!"
            >
              <FcGoogle className="w-5 h-5 md:w-6 md:h-6" />
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
