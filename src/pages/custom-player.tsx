import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import AccountProvider from "@/components/AccountProvider";
import Layout from "@/components/Layout";
import { getAccount } from "@/services/account";
import Logo from "@/components/Logo";
import PlayerStage from "@/components/PlayerStage";
import ColorPicker from "@/components/ColorPicker";
import PatternPicker from "@/components/PatternPicker";
import Button from "@/components/Form/Button";
import { getAvailableSkins } from "@/services/skins";
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

export default function CustomPlayer(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { account, availableSkins } = props;
  const router = useRouter();

  return (
    <AccountProvider account={account}>
      <SkinsProvider availableSkins={availableSkins}>
        <Layout containerWidth="full" className="grid">
          <div className="w-full flex flex-col min-h-screen pt-6 sticky top-0">
            <div className="grid grid-cols-3">
              <Logo variant="small" className="col-span-2" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8 md:px-16 lg:px-64 h-full pt-8">
              <div className="flex justify-center items-center h-full md:mx-auto">
                <PlayerStage
                  player={{ id: account.id, username: account.username }}
                  skin={{
                    color: account.skin.color,
                    pattern: account.skin.pattern,
                  }}
                  className="md:row-start-2 md:col-start-2"
                  hideCustomButton
                />
              </div>
              <div className="flex flex-col items-center gap-10 pt-8 pb-10 md:mx-auto">
                <ColorPicker />
                <PatternPicker />
                <Button
                  type="button"
                  className="h-16 w-full max-w-md"
                  onClick={() => router.back()}
                >
                  Finish
                </Button>
              </div>
            </div>
          </div>
        </Layout>
      </SkinsProvider>
    </AccountProvider>
  );
}
