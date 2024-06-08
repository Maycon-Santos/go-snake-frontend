import type { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Separator from "@/components/Form/Separator";
import Logo from "@/components/Logo";
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

export default function RecoverPassword() {
  return (
    <Layout containerWidth="small" className="flex h-screen">
      <div className="w-full m-auto py-8">
        <Logo />
        <Form className="mt-10 md:mt-16">
          <span className="text-sm mb-3 block">Recover password</span>
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Username or email"
              autoFocus
              required
            />
            <div className="flex justify-end">
              <Button type="submit">Send email</Button>
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
