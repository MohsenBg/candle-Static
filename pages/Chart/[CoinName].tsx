import Head from "next/head";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps } from "next";
import { SupportedCoins } from "../../supportedCoins";
import styles from "../../styles/ChartContainer.module.scss";
const Chart = dynamic(() => import("../../Component/Chart"), {
  ssr: false,
});

interface coinObj {
  Name: string;
  Symbol: string;
  Image: any;
}

const ChartContainer = ({ Coin }: any) => {
  const [data, setData] = useState<any>("");
  const [ERROR, setError] = useState<any>(false);

  let selectedCoin: Array<coinObj> = SupportedCoins.filter(
    (coin) => coin.Name === Coin
  );
  const fetcher = async () => {
    if (data) {
      const limit = 1;
      await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin[0].Symbol}USDT&interval=1d&limit=${limit}`
      )
        .then(async (res) => {
          const data = await res.json();
          setData(data);
        })
        .catch((error) => {
          setError(true);
        });
    } else {
      const limit = 500;
      await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin[0].Symbol}USDT&interval=1d&limit=${limit}`
      )
        .then(async (res) => {
          const data = await res.json();
          setData(data);
        })
        .catch((error) => {
          setError(true);
        });
    }
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
      <div className={styles.container}>
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
              Use Vpn!
            </div>
          </div>
        ) : (
          <div>
            <Head>
              <title>Chart ({selectedCoin[0].Symbol}-USDT) DAILY</title>
              <meta charSet="UTF-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <div>
              <Chart data={data} coinData={selectedCoin} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChartContainer;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SupportedCoins.map((coin) => {
    return {
      params: { CoinName: coin.Name },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params }: any = context;
  const Coin = params.CoinName;
  return {
    props: { Coin },
  };
};
