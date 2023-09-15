import Link from "next/link";
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import Separator from "@/components/Form/Separator";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <Layout containerWidth="small" className="flex h-screen">
      <div className="w-full m-auto py-8">
        <Logo />
        <Form className="mt-10 md:mt-16">
          <span className="text-sm mb-3 block">Sign in</span>
          <div className="grid grid-rows-3 grid-flow-col gap-3">
            <Input type="text" placeholder="Username" required />
            <Input type="password" placeholder="Password" required />
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center col-span-2">
                <Link href="/recover-password" className="text-sm">
                  Recover password
                </Link>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Login</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-12">
            <Separator className="mb-6">Or</Separator>
            <div className="flex justify-center">
              <Button
                Component={Link}
                href="/register"
                variant="primary-reverse"
              >
                Create an account
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
