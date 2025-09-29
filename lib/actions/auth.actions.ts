"use server";

import { auth } from "@/lib/betterAuth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });

    if (response) {
      console.log(response);
      await inngest.send({
        name: "app/user.created",
        data: {
          name: fullName,
          email,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });

      return { success: true, data: response };
    }
  } catch (error) {
    console.error("Sign up error", error);

    return { success: false, error };
  }
};

export const singInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Sign in error", error);



    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Sign out failed.", error);

    return { success: false, error };
  }
};
