import { getCookie } from "cookies-next";
import { WS_BASE_URL } from "@/constants";

type SendMessage = {
  ready?: boolean;
  moveTo?: "right" | "left" | "up" | "down";
};

export type Player = {
  id: string;
  username: string;
  body: { x: number; y: number }[];
  ready: boolean;
  alive: boolean;
};

export type MatchStatus = "ON_HOLD" | "RUNNING";

export type Map = {
  tiles: {
    horizontal: number;
    vertical: number;
  };
};

export type Match = {
  id: string;
  status: MatchStatus;
  map: Map;
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
  removePlayer?: string;
};

type ReaderFn = (message: ReadMessage) => void;

export type MatchConnection = {
  connected: boolean;
  send: (message: SendMessage) => void;
  onMessage: (reader: ReaderFn) => void;
  close: WebSocket["close"];
};

export default function connectMatch(matchId: string) {
  const token = getCookie("token");
  const readers: ReaderFn[] = [];

  return new Promise<MatchConnection>((resolve, reject) => {
    const socket = new WebSocket(
      `${WS_BASE_URL}/v1/match/connect/${matchId}?token=${token}`
    );

    socket.addEventListener("error", () => {
      reject();
    });

    socket.addEventListener("open", () => {
      resolve({
        connected: true,
        onMessage(reader) {
          readers.push(reader);
        },
        send(message) {
          socket.send(JSON.stringify(message));
        },
        close: socket.close,
      });
    });

    socket.addEventListener("message", (e) => {
      readers.forEach((reader) => {
        reader(JSON.parse(e.data));
      });
    });

    socket.addEventListener("close", () => {});
  });
}
