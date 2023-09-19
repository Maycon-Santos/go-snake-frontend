import React from "react";
import classNames from "classnames";
import localFont from "next/font/local";
import styles from "./PlayerStage.module.css";

const pressStart2P = localFont({
  src: "../../assets/fonts/PressStart2P-Regular.ttf",
});

interface PlayerStageProps extends React.HTMLProps<HTMLDivElement> {
  username: string;
  ready?: boolean;
}

export const PlayerStage: React.FC<PlayerStageProps> = (props) => {
  const { username, ready, className, ...rest } = props;

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
                  style={{ backgroundColor: "cyan" }}
                />
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
        {username}
      </span>
      {ready && (
        <div className="absolute left-2/4 bottom-10 py-2 px-3 text-sm bg-foreground-reverse-light">
          Ready
        </div>
      )}
    </div>
  );
};
