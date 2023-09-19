import MatchProvider from "@/components/MatchProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MatchProvider>
      <Component {...pageProps} />
    </MatchProvider>
  );
}
