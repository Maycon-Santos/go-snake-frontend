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
      <div className="w-full m-auto overflow-hidden py-8">
        <Logo />
        <Form className="mt-10 md:mt-16">
          <span className="text-sm mb-3 block">Sign up</span>
          <div className="grid grid-rows-3 grid-flow-col gap-3">
            <Input type="text" placeholder="Username" required />
            <Input type="password" placeholder="Password" required />
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </div>
          <div className="mt-8 md:mt-12">
            <Separator className="mb-6">Or</Separator>
            <div className="flex justify-center">
              <Button Component={Link} href="/" color="primary-reverse">
                Sign in
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
