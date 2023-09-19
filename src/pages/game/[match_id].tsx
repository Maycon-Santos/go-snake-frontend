import { useEffect, useLayoutEffect, useRef } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getAccount } from "@/lib/account";
import AccountProvider from "@/components/AccountProvider";

export const getServerSideProps = (async (context) => {
  const account = await getAccount(context.req, context.res);

  if (!account) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { account } };
}) satisfies GetServerSideProps;

export default function Game(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { account } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const router = useRouter();

  useLayoutEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <AccountProvider account={account}>
      <canvas ref={canvasRef} />
    </AccountProvider>
  );
}
