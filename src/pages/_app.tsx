import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MatchProvider from "@/components/MatchProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MatchProvider>
      <Component {...pageProps} />
    </MatchProvider>
  );
}
