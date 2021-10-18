import Head from "next/head";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../Component/Chart"), {
  ssr: false,
});

export default function Home() {
  const [data, setData] = useState<any>("");
  const [ERROR, setError] = useState<any>(false);

  const fetcher = async () => {
    const limit = 300;
    await fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=${limit}`
    )
      .then(async (res) => {
        const data = await res.json();
        setData(data);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const time = 1000;
  useEffect(() => {
    const interval = setInterval(async () => {
      fetcher();
    }, time);
    return () => clearInterval(interval);
  }, []);

  if (!data && !ERROR) {
    return (
      <div>
        <Head>
          <title>Loading</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <div>Loading</div>
      </div>
    );
  }

  return (
    <>
      {ERROR ? (
        <div>
          <Head>
            <title>ERROR</title>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <div>
            Can Not Connect To The Api Binance If Your Country Ban By Binance
            Use Vpn
          </div>
        </div>
      ) : (
        <div>
          <Head>
            <title>Chart (BTC-USDT) DAILY</title>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>

          <div style={{ marginTop: "20px", fontSize: "25px" }}>
            Candle Static Chart (BTC-USDT) DAILY
          </div>
          <div>
            <Chart data={data} />
          </div>
        </div>
      )}
    </>
  );
}
