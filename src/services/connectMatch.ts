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

export type Skin = {
  playerId: string;
  color: string;
  pattern: string;
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
  playerSkin?: Skin;
  removePlayer?: string;
  match?: Match;
  food?: Food;
};

type OnReadHandler = (message: ReadMessage) => void;
type OnCloseHandler = () => void;

export type MatchConnection = {
  connected: boolean;
  send: (message: SendMessage) => void;
  onMessage: (handler: OnReadHandler) => void;
  onClose: (handler: OnCloseHandler) => void;
  close: WebSocket["close"];
};

export default function connectMatch(matchId: string) {
  const token = getCookie("token");
  const onReadHandlers: OnReadHandler[] = [];
  const onCloseHandlers: OnCloseHandler[] = [];

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
        onMessage(handler) {
          onReadHandlers.push(handler);
        },
        onClose(handler) {
          onCloseHandlers.push(handler);
        },
        send(message) {
          socket.send(JSON.stringify(message));
        },
        close: socket.close,
      });
    });

    socket.addEventListener("message", (e) => {
      onReadHandlers.forEach((handler) => {
        handler(JSON.parse(e.data));
      });
    });

    socket.addEventListener("close", () => {
      onCloseHandlers.forEach((handler) => {
        handler();
      });
    });
  });
}
