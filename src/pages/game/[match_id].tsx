import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getAccount } from "@/services/account";
import AccountProvider from "@/components/AccountProvider";
import { getAvailableSkins } from "@/services/skins";
import Game from "@/components/Game";
import SkinsProvider from "@/components/SkinsProvider";

export const getServerSideProps = (async (context) => {
  const account = await getAccount(context.req, context.res);
  const availableSkins = await getAvailableSkins(context.req, context.res);

  if (!account) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { account, availableSkins } };
}) satisfies GetServerSideProps;

export default function GamePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { account, availableSkins } = props;

  return (
    <AccountProvider account={account}>
      <SkinsProvider availableSkins={availableSkins}>
        <Game />
      </SkinsProvider>
    </AccountProvider>
  );
}
