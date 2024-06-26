import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import animate from "transition-engine";
import { useMatch } from "@/components/MatchProvider";
import { renderFood, renderPlayer } from "@/lib/render";
import styles from "./Game.module.css";
import { useSkins } from "../SkinsProvider/SkinsProvider";

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useMemo<{ current?: CanvasRenderingContext2D }>(() => ({}), []);
  const { send, connected, state: matchState } = useMatch();
  const { availableSkins } = useSkins();
  const router = useRouter();
  const { match_id: matchId } = router.query;

  const gameLoop = useMemo(
    () =>
      animate({
        from: 0,
        to: 1,
        duration: 1000,
        iterationCount: Infinity,
        transition: () => {
          const { foods, match, players, playerSkins } = matchState;

          if (match.status === "ON_HOLD") {
            router.replace({
              pathname: "/lobby/[match_id]",
              query: {
                match_id: matchId,
              },
            });

            gameLoop.stop();

            return;
          }

          if (ctx.current) {
            ctx.current.clearRect(
              0,
              0,
              ctx.current.canvas.width,
              ctx.current.canvas.height
            );
          }

          Object.values(players).forEach((player) => {
            if (!ctx.current) return;

            if (player.alive) {
              renderPlayer(ctx.current, match.map, player, {
                color: availableSkins.colors[playerSkins[player.id].color],
                pattern:
                  availableSkins.patterns[playerSkins[player.id].pattern],
              });
            }
          });

          Object.values(foods).forEach((food) => {
            if (!ctx.current) return;
            renderFood(ctx.current, match.map, food);
          });
        },
      }),
    [
      availableSkins.colors,
      availableSkins.patterns,
      ctx,
      matchId,
      matchState,
      router,
    ]
  );

  useEffect(() => {
    const resizeCanvas = () => {
      const {
        match: { map },
      } = matchState;

      if (!canvasRef.current || !map) return;

      const tileWidth = window.innerWidth / map.tiles.horizontal;
      const tileHeight = window.innerHeight / map.tiles.vertical;
      const tileSize = Math.floor(Math.min(tileWidth, tileHeight));

      canvasRef.current.width = tileSize * map.tiles.horizontal;
      canvasRef.current.height = tileSize * map.tiles.vertical;
      canvasRef.current.style.backgroundSize = `${tileSize}px ${tileSize}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [matchState]);

  useEffect(() => {
    if (!canvasRef.current || gameLoop.running) return;

    ctx.current = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    gameLoop.start();
  }, [ctx, gameLoop]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (!send) return;

      switch (e.key) {
        case "ArrowRight":
          send({ moveTo: "right" });
          break;
        case "ArrowLeft":
          send({ moveTo: "left" });
          break;
        case "ArrowDown":
          send({ moveTo: "down" });
          break;
        case "ArrowUp":
          send({ moveTo: "up" });
          break;
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [send]);

  useEffect(() => {
    if (!connected) {
      router.replace({
        pathname: "/lobby/[match_id]",
        query: {
          match_id: matchId,
        },
      });
    }
  }, [connected, matchId, router]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <canvas ref={canvasRef} className={styles.game} />
    </div>
  );
};
