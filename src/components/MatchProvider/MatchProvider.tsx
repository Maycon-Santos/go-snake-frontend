import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import connectMatch, {
  Food,
  Match,
  MatchConnection,
  Player,
} from "@/services/connectMatch";

type MatchContextValue = {
  connect: (matchId: string) => void;
  send?: MatchConnection["send"];
  state: {
    match?: Match;
    players?: { [id: string]: Player };
    foods?: { [id: string]: Food };
  };
};

const MatchContext = createContext<MatchContextValue>({
  connect() {
    console.error("MatchProvider is not implemented");
  },
  state: {},
});

export const MatchProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [match, setMatch] = useState<Match>();
  const [players, setPlayers] = useState<{ [id: string]: Player }>();
  const [foods, setFoods] = useState<{ [id: string]: Food }>();
  const matchConnection = useMemo<{ current?: MatchConnection }>(
    () => ({}),
    []
  );

  const connect = useCallback(
    async (matchId: string) => {
      matchConnection.current = await connectMatch(matchId);

      let players: { [id: string]: Player };
      let foods: { [id: string]: Food };

      matchConnection.current.onMessage((message) => {
        const { match, player, food } = message;

        if (match) {
          setMatch(match);
        }

        if (player) {
          players = {
            ...players,
            [player.id]: player,
          };

          setPlayers(players);
        }

        if (food) {
          foods = {
            ...foods,
            [food.id]: food,
          };

          setFoods(foods);
        }
      });
    },
    [matchConnection]
  );

  return (
    <MatchContext.Provider
      value={{
        connect,
        send: matchConnection.current?.send,
        state: { match, players, foods },
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  return useContext(MatchContext);
};
