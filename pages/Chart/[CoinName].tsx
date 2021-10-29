import Head from "next/head";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/ChartContainer.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const Chart = dynamic(() => import("../../Component/Chart"), {
  ssr: false,
});

interface coinDataInterface {
  coin_id: string;
  coin_name: string;
  coin_symbol: string;
  coin_rank: string;
  coin_price_usd: string;
  coin_price_change: string;
  coin_percent_change_24h: string;
  url: string;
}
const ChartContainer = ({ Coin }: any) => {
  const [data, setData] = useState<any>("");
  const [ERROR, setError] = useState<any>(false);
  const router = useRouter();
  const SupportedCoins = useSelector((state: any) => state.coinsData.coinsData);

  let selectedCoin: Array<coinDataInterface> = SupportedCoins.filter(
    (coin: any) => coin.coin_name === Coin
  );

  useEffect(() => {
    if (selectedCoin.length === 0) {
      router.push("/404");
    }
  }, [selectedCoin]);

  const fetcher = async () => {
    if (data) {
      const limit = 1;
      await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin[0].coin_symbol}USDT&interval=1d&limit=${limit}`
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
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin[0].coin_symbol}USDT&interval=1d&limit=${limit}`
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
              <title>Chart ({selectedCoin[0].coin_symbol}-USDT) DAILY</title>
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
  let afterFilter: any;
  let result: any = [];

  await fetch("https://api.binance.com/api/v3/ticker/24hr").then(
    async (res) => {
      const data = await res.json();
      let newData = await data.filter((coin: any) =>
        coin.symbol.includes("USDT")
      );
      newData = await newData.map(function (coin: any) {
        return {
          Symbol: coin.symbol,
          Price: coin.lastPrice,
          PriceChange: coin.priceChange,
          priceChangePercent: coin.priceChangePercent,
        };
      });
      afterFilter = await newData;
    }
  );
  await fetch("https://cryptocurrencyliveprices.com/api/").then(async (res) => {
    const data = await res.json();
    let FINAL: any = data.filter(function (o1: any) {
      return afterFilter.some(function (o2: any) {
        return `${o1.coin_symbol}USDT` === o2.Symbol;
      });
    });
    //@ts-ignore
    for (let i = 0; i < FINAL.length; i++) {
      let price: any = await afterFilter.filter(
        (priceObject: any) =>
          priceObject.Symbol === `${FINAL[i].coin_symbol}USDT`
      );
      let obj = {
        coin_id: FINAL[i].coin_id,
        coin_name: FINAL[i].coin_name,
        coin_symbol: FINAL[i].coin_symbol,
        coin_rank: parseInt(FINAL[i].coin_rank),
        coin_price_usd: parseFloat(price[0].Price),
        coin_price_change: parseFloat(price[0].PriceChange),
        coin_percent_change_24h: parseFloat(
          price[0].priceChangePercent
        ).toFixed(2),
        url: `https://cryptocurrencyliveprices.com/img/${FINAL[i].coin_id}.png`,
      };
      result.push(obj);
    }
  });
  const paths = result.map((coin: any) => {
    return {
      params: { CoinName: coin.coin_name },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params }: any = context;
  const Coin = params.CoinName;
  return {
    props: { Coin },
  };
};
