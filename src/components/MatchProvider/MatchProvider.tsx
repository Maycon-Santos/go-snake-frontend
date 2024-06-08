import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import connectMatch, {
  Food,
  Match,
  MatchConnection,
  Player,
  Skin,
} from "@/services/connectMatch";
import Modal, { useModal } from "../Modal";
import Button from "../Form/Button";

type MatchContextValue = {
  connect: (matchId: string) => void;
  send?: MatchConnection["send"];
  listeners: (() => void)[];
  connected: boolean;
  loading: boolean;
  state: {
    match: Match;
    players: { [id: string]: Player };
    playerSkins: { [playerId: string]: Skin };
    foods: { [id: string]: Food };
  };
};

const MatchContext = createContext<MatchContextValue>({
  connect() {
    console.error("MatchProvider is not implemented");
  },
  listeners: [],
  state: {
    match: {} as Match,
    foods: {},
    players: {},
    playerSkins: {},
  },
  connected: false,
  loading: false,
});

export const MatchProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const lostConnectionModal = useModal();
  const router = useRouter();
  const matchConnection = useMemo<{ current?: MatchConnection }>(
    () => ({}),
    []
  );

  const matchState = useMemo(
    () => ({
      match: {} as Match,
      players: {} as { [id: string]: Player },
      playerSkins: {} as { [playerId: string]: Skin },
      foods: {} as { [id: string]: Food },
    }),
    []
  );

  const listeners = useMemo<MatchContextValue["listeners"]>(() => [], []);

  const connect = useCallback(
    async (matchId: string) => {
      try {
        setLoading(true);
        matchConnection.current = await connectMatch(matchId);
        setConnected(true);
        setLoading(false);

        matchConnection.current.onClose(() => {
          setConnected(false);
          lostConnectionModal.toggle();
        });

        matchConnection.current.onMessage((message) => {
          const { match, player, playerSkin, removePlayer, food } = message;

          if (match) {
            Object.assign(matchState.match, match);
          }

          if (player) {
            Object.assign(matchState.players, {
              [player.id]: player,
            });
          }

          if (playerSkin) {
            Object.assign(matchState.playerSkins, {
              [playerSkin.playerId]: playerSkin,
            });
          }

          if (removePlayer) {
            delete matchState.players[removePlayer];
          }

          if (food) {
            Object.assign(matchState.foods, {
              [food.id]: food,
            });
          }

          listeners.forEach((fn) => fn());
        });
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    [
      listeners,
      lostConnectionModal,
      matchConnection,
      matchState.foods,
      matchState.match,
      matchState.playerSkins,
      matchState.players,
    ]
  );

  return (
    <MatchContext.Provider
      value={{
        connect,
        connected,
        loading,
        get send() {
          return matchConnection.current?.send;
        },
        listeners,
        state: matchState,
      }}
    >
      <Modal
        title="Lost match connection"
        text="This may occur due to network instability or internal server problems."
        state={lostConnectionModal}
      >
        <Button
          onClick={() => {
            lostConnectionModal.toggle();
            router.replace("/lobby");
          }}
          autoFocus
        >
          Ok
        </Button>
      </Modal>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = (rerenderOnChangeState?: boolean) => {
  const { connect, loading, state, send, connected, listeners } =
    useContext(MatchContext);
  const [, rerender] = useState(0);

  useEffect(() => {
    if (!rerenderOnChangeState) return;

    const listenerIndex = listeners.push(() => rerender((v) => v + 1)) - 1;
    return () => {
      delete listeners[listenerIndex];
    };
  }, [listeners, rerenderOnChangeState]);

  return { connect, loading, state, connected, send };
};
