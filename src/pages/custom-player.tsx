import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AccountProvider from "@/components/AccountProvider";
import Layout from "@/components/Layout";
import { getAccount } from "@/lib/account";
import Logo from "@/components/Logo";
import PlayerStage from "@/components/PlayerStage";

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

export default function CustomPlayer(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { account } = props;

  return (
    <AccountProvider account={account}>
      <Layout containerWidth="full" className="grid">
        <div className="w-full flex flex-col min-h-screen pt-6 sticky top-0">
          <div className="grid grid-cols-3">
            <Logo variant="small" className="col-span-2" />
          </div>
          <div className="flex flex-col h-full">
            <div className="flex justify-center items-center h-full">
              <PlayerStage
                player={{ id: account.id, username: account.username }}
                className="md:row-start-2 md:col-start-2"
                hideCustomButton
              />
            </div>
            <div className="">Controles aqui</div>
          </div>
        </div>
      </Layout>
    </AccountProvider>
  );
}
