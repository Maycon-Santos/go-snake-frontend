import classNames from "classnames";
import { PropsWithChildren } from "react";
import localFont from "next/font/local";
import Head from "next/head";
import styles from "./Layout.module.css";

const eightBitWonder = localFont({
  src: "../../assets/fonts/8-BIT-WONDER.ttf",
});

interface LayoutProps extends PropsWithChildren<React.HTMLProps<HTMLElement>> {
  containerWidth?: "small" | "medium" | "large" | "full";
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { className, containerWidth = "full", children, ...rest } = props;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={classNames(
          eightBitWonder.className,
          styles.container,
          styles[`container-width-${containerWidth}`],
          "px-6",
          className
        )}
        {...rest}
      >
        {children}
      </main>
    </>
  );
};
