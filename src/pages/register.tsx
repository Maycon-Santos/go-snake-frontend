import type { GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Separator from "@/components/Form/Separator";
import Logo from "@/components/Logo";
import { FormProps } from "@/components/Form/Form";
import signUp from "@/services/signUp";
import {
  ERROR_MAP,
  PASSWORD_ERROR_TYPES,
  USERNAME_ERROR_TYPES,
} from "@/constants";
import { getAccount } from "@/services/account";

export const getServerSideProps = (async (context) => {
  const account = await getAccount(context.req, context.res);

  if (account) {
    return {
      redirect: {
        destination: "/lobby",
        permanent: false,
      },
    };
  }

  return { props: {} };
}) satisfies GetServerSideProps;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const onSubmit: FormProps["onSubmit"] = async (data) => {
    setError({ type: "", message: "" });
    setIsLoading(true);

    const { username, password } = data;

    const signInResponse = await signUp(username, password);

    setIsLoading(false);

    if (signInResponse.success) {
      router.replace("/lobby");
    } else {
      setError({
        type: signInResponse.type,
        message: ERROR_MAP[signInResponse.type],
      });
    }
  };

  return (
    <Layout containerWidth="small" className="flex h-screen">
      <div className="w-full m-auto py-8">
        <Logo />
        <Form className="mt-10 md:mt-16" onSubmit={onSubmit}>
          <span className="text-sm mb-3 block">Sign up</span>
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Username"
              name="username"
              required
              autoFocus
            />
            {USERNAME_ERROR_TYPES.includes(error.type) && (
              <span className="text-xs error-color">{error.message}</span>
            )}
            <Input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            {PASSWORD_ERROR_TYPES.includes(error.type) && (
              <span className="text-xs error-color">{error.message}</span>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} loading={isLoading}>
                Create
              </Button>
            </div>
          </div>
          <div className="mt-8 md:mt-12">
            <Separator className="mb-6">Or</Separator>
            <div className="flex justify-center">
              <Button Component={Link} href="/" variant="primary-reverse">
                Sign in
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
