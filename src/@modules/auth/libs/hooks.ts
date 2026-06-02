import { useMutation } from "@tanstack/react-query"
import { AuthServices } from "./service"
import { MutationConfig } from "@/src/@libs/config/react-query";

// ---------------------Sign up hook-----------------------------------
type ISignUpProps={
    config?: MutationConfig<typeof AuthServices.signUp>
}

export const useSignUp = ({ config }: ISignUpProps) => {
  return useMutation({
    ...config,
    mutationFn: AuthServices.signUp,
  });
};

// ---------------------Sign In hook-----------------------------------
type ISignInProps = {
  config?: MutationConfig<typeof AuthServices.signIn>;
};
export const useSignIn = ({ config }: ISignInProps) => {
  return useMutation({
    ...config,
    mutationFn: AuthServices.signIn,
  });
};