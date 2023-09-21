import { useCallback, useEffect, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import classNames from "classnames";
import { useRouter } from "next/router";
import Button from "@/components/Form/Button";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import MainMenu from "@/components/MainMenu";
import PlayerStage from "@/components/PlayerStage";
import ConnectMatchModal from "@/components/ConnectMatchModal";
import Modal, { useModal } from "@/components/Modal";
import { getAccount } from "@/lib/account";
import AccountProvider from "@/components/AccountProvider";
import createMatch from "@/services/createMatch";
import { useMatch } from "@/components/MatchProvider";
import ErrConnMatchModal from "@/components/ErrConnMatchModal";

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
  const { match_id: matchId } = router.query;

  const connectMatchModal = useModal();
  const errorConnectMatchModal = useModal();

  const {
    connect,
    connected: matchConnected,
    loading: matchConnecting,
    send,
    state: { match, players },
  } = useMatch(true);

  const isReady = players[account.id] && players[account.id].ready;

  const [createMatchIsLoading, setCreateMatchIsLoading] = useState(false);
  const isLoading = createMatchIsLoading || matchConnecting;

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

  const connectMatch = useCallback(
    async (matchId: string) => {
      if (matchConnected || matchConnecting) {
        return;
      }

      if (errorConnectMatchModal.isOpen) {
        return;
      }

      try {
        await connect(matchId);
        return true;
      } catch (e) {
        router.replace("/lobby");
        errorConnectMatchModal.toggle();
      }

      return false;
    },
    [connect, errorConnectMatchModal, matchConnected, matchConnecting, router]
  );

  useEffect(() => {
    if (typeof matchId === "string" && matchId != "_") {
      connectMatch(matchId);
    }
  }, [connectMatch, matchId]);

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
        <ErrConnMatchModal state={errorConnectMatchModal} />
        <ConnectMatchModal
          state={connectMatchModal}
          connectMatch={connectMatch}
        />
        <div className="w-full flex flex-col min-h-screen pt-6 sticky top-0">
          <div className="grid grid-cols-3">
            <Logo variant="small" className="col-span-2" />
            <div className="justify-self-end self-center">
              {!matchConnected && <MainMenu />}
              {matchConnected && (
                <Button variant="error" slanted>
                  Exit
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex flex-col md:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 pt-5 pb-6 md:pr-6 w-full m-auto">
              {!players[account.id] && (
                <PlayerStage
                  player={{ id: account.id, username: account.username }}
                  className="md:row-start-2 md:col-start-2"
                />
              )}
              {players &&
                Object.keys(players).map((playerId) => {
                  const player = players[playerId];

                  return (
                    <PlayerStage
                      key={playerId}
                      player={player}
                      className={classNames({
                        ["md:row-start-2 md:col-start-2"]:
                          playerId === account.id,
                      })}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col mt-auto pt-3 pb-6 md:w-128 sticky bottom-0 bg-color">
              <div className="flex flex-col w-full gap-3">
                {matchConnected && <span>Match ID: {matchId}</span>}
                {!matchConnected && (
                  <Button
                    variant="primary-reverse"
                    onClick={connectMatchModal.toggle}
                    disabled={isLoading}
                    loading={matchConnecting}
                  >
                    Connect match
                  </Button>
                )}
                {!matchConnected && (
                  <Button
                    onClick={onCreateMatch}
                    disabled={isLoading}
                    loading={createMatchIsLoading}
                  >
                    Create match
                  </Button>
                )}
                {!matchConnected && (
                  <Button
                    variant="secondary"
                    className="text-4xl w-full h-28"
                    disabled={isLoading}
                  >
                    Start
                  </Button>
                )}
                {matchConnected && (
                  <Button
                    variant={isReady ? "tertiary" : "secondary"}
                    className="text-4xl w-full h-28"
                    disabled={isLoading}
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
