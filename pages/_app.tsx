import "../styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="main" id={"main"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
