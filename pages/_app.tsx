import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "@context/modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
