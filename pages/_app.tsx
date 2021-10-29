import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Dispatcher from "../Component/Dispatcher";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Loading from "../Component/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <div className="main" id={"main"}>
          <Dispatcher />
          <Loading />
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
export default MyApp;
