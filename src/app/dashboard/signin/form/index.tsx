"use client";
import { ActionResult, handleSignIn } from "./action";
import { useActionState } from "react";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface FormSignInProps {}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormSignIn: FC<FormSignInProps> = () => {
  const [state, formAction] = useActionState(handleSignIn, initialFormState);

  console.log(state); // Output: { errorTitle: null, errorDesc: [] }

  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form action={formAction} className="space-y-6">
              <input type="email" placeholder="Email..." name="email" />
              <input
                type="password"
                placeholder="Password..."
                name="password"
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
