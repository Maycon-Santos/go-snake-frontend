import { getCookie } from "cookies-next";
import { WS_BASE_URL } from "@/constants";

type SendMessage = {
  ready?: boolean;
  moveTo?: "right" | "left" | "top" | "bottom";
};

export type Player = {
  id: string;
  username: string;
  body: { x: number; y: number }[];
  ready: boolean;
  alive: boolean;
};

export type MatchStatus = "ON_HOLD" | "RUNNING";

export type Match = {
  id: string;
  status: MatchStatus;
  map: {
    tiles: {
      horizontal: number;
      vertical: number;
    };
  };
};

export type Food = {
  id: string;
  position: {
    x: number;
    y: number;
  };
};

type ReadMessage = {
  player?: Player;
  match?: Match;
  food?: Food;
};

type ReaderFn = (message: ReadMessage) => void;

export type MatchConnection = {
  send: (message: SendMessage) => void;
  onMessage: (reader: ReaderFn) => void;
};

export default function connectMatch(matchId: string) {
  const token = getCookie("token");
  const readers: ReaderFn[] = [];

  return new Promise<MatchConnection>((resolve) => {
    const socket = new WebSocket(
      `${WS_BASE_URL}/v1/match/connect/${matchId}?token=${token}`
    );

    socket.addEventListener("open", () => {
      resolve({
        onMessage(reader) {
          readers.push(reader);
        },
        send(message) {
          socket.send(JSON.stringify(message));
        },
      });
    });

    socket.addEventListener("message", (e) => {
      readers.forEach((reader) => {
        reader(JSON.parse(e.data));
      });
    });
  });
}
