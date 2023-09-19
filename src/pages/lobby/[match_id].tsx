import { useEffect, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import classNames from "classnames";
import { useRouter } from "next/router";
import Button from "@/components/Form/Button";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import MainMenu from "@/components/MainMenu";
import PlayerStage from "@/components/PlayerStage";
import ConnectMatchModal from "@/components/ConnectMatchModal";
import { useModal } from "@/components/Modal";
import { getAccount } from "@/lib/account";
import AccountProvider from "@/components/AccountProvider";
import createMatch from "@/services/createMatch";
import { useMatch } from "@/components/MatchProvider";

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

export default function Lobby(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { account } = props;
  const router = useRouter();
  const connectMatchModal = useModal();
  const {
    connect: connectMatch,
    send,
    state: { match, players },
  } = useMatch();
  const { match_id: matchId } = router.query;
  const hasMatch = typeof matchId === "string" && matchId != "_";
  const isReady = players !== undefined && players[account.id].ready;

  const [createMatchIsLoading, setCreateMatchIsLoading] = useState(false);

  const onCreateMatch = async () => {
    setCreateMatchIsLoading(true);
    const response = await createMatch();

    if (response.success) {
      const { match_id } = response.result;

      router.replace({
        pathname: "/lobby/[match_id]",
        query: {
          match_id,
        },
      });
    }

    setCreateMatchIsLoading(false);
  };

  useEffect(() => {
    if (hasMatch) connectMatch(matchId);
  }, [connectMatch, hasMatch, matchId]);

  useEffect(() => {
    if (match?.status === "RUNNING") {
      router.replace({
        pathname: "/game/[match_id]",
        query: {
          match_id: matchId,
        },
      });
    }
  }, [match?.status, matchId, router]);

  return (
    <AccountProvider account={account}>
      <Layout containerWidth="full" className="grid">
        <ConnectMatchModal state={connectMatchModal} />
        <div className="w-full flex flex-col min-h-screen pt-6 sticky top-0">
          <div className="grid grid-cols-3">
            <Logo variant="small" className="col-span-2" />
            <div className="justify-self-end self-center">
              {!hasMatch && <MainMenu />}
              {hasMatch && (
                <Button variant="error" slanted>
                  Exit
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex flex-col md:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 pt-12 pb-6 md:pr-6 w-full m-auto">
              {!players && (
                <PlayerStage
                  username={account.username}
                  className="md:row-start-2 md:col-start-2"
                />
              )}
              {players &&
                Object.keys(players).map((playerId) => {
                  const { username, ready } = players[playerId];

                  return (
                    <PlayerStage
                      key={playerId}
                      username={username}
                      className={classNames({
                        ["md:row-start-2 md:col-start-2"]:
                          playerId === account.id,
                      })}
                      ready={ready}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col mt-auto pt-3 pb-6 md:w-128 sticky bottom-0 bg-color">
              <div className="flex flex-col w-full gap-3">
                {hasMatch && <span>Match ID: {matchId}</span>}
                {!hasMatch && (
                  <Button
                    variant="primary-reverse"
                    onClick={connectMatchModal.toggle}
                  >
                    Connect match
                  </Button>
                )}
                {!hasMatch && (
                  <Button
                    onClick={onCreateMatch}
                    disabled={createMatchIsLoading}
                    loading={createMatchIsLoading}
                  >
                    Create match
                  </Button>
                )}
                {!hasMatch && (
                  <Button
                    variant="secondary"
                    className="text-4xl w-full w-full h-28"
                  >
                    Start
                  </Button>
                )}
                {hasMatch && (
                  <Button
                    variant={isReady ? "tertiary" : "secondary"}
                    className="text-4xl w-full w-full h-28"
                    onClick={() => {
                      if (send) send({ ready: !isReady });
                    }}
                  >
                    {isReady ? "Cancel" : "Ready"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AccountProvider>
  );
}
