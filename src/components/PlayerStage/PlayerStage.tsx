/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import localFont from "next/font/local";
import { Player } from "@/services/connectMatch";
import styles from "./PlayerStage.module.css";
import { useAccount } from "../AccountProvider";
import Button from "../Form/Button";
import { useSkins } from "../SkinsProvider/SkinsProvider";

const pressStart2P = localFont({
  src: "../../assets/fonts/PressStart2P-Regular.ttf",
});

interface PlayerStageProps extends React.HTMLProps<HTMLDivElement> {
  player: Partial<Player>;
  skin?: {
    color: string;
    pattern: string;
  };
  hideCustomButton?: boolean;
}

export const PlayerStage: React.FC<PlayerStageProps> = (props) => {
  const { player, skin: skinIds, className, hideCustomButton, ...rest } = props;
  const { account } = useAccount();
  const { availableSkins } = useSkins();

  const skin = {
    color: availableSkins.colors[skinIds ? skinIds.color : "3"],
    pattern: availableSkins.patterns[skinIds ? skinIds.pattern : "1"],
  };

  const snakeBody = [
    ["■", "■", "□"],
    ["■", "□", "□"],
    ["■", "■", "■"],
    ["□", "□", "■"],
    ["■", "■", "■"],
  ];

  return (
    <div
      className={classNames(
        "grid grid-rows-4 justify-center",
        styles.wrapper,
        className
      )}
      {...rest}
    >
      <div
        className={`grid grid-rows-${snakeBody.length} grid-cols-${snakeBody[0].length} row-span-3 w-fit m-auto`}
      >
        {snakeBody.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <React.Fragment key={`col-${colIndex}`}>
                <div
                  className={classNames(styles.bodyFragment, {
                    [styles.whiteSpace]: col === "□",
                  })}
                  style={{ backgroundColor: skin.color || "black" }}
                >
                  {skin.pattern?.type === "svg" && (
                    <img
                      src={`data:image/svg+xml;utf8,${skin.pattern.source}`}
                      className={styles.pattern}
                      alt=""
                    />
                  )}
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
      <span
        className={classNames(
          pressStart2P.className,
          "grid items-end",
          "text-2xl font-bold text-center"
        )}
      >
        {player.username}
      </span>
      {account.id === player.id && !hideCustomButton && (
        <Button className="mt-3" Component={Link} href="/custom-player">
          Customize
        </Button>
      )}
      {player.ready && (
        <div className="absolute left-2/4 bottom-10 py-2 px-3 text-sm bg-foreground-reverse-light">
          Ready
        </div>
      )}
    </div>
  );
};
