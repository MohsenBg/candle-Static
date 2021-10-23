import Head from "next/head";
import React, { useEffect, useState } from "react";
import { SupportedCoins } from "../supportedCoins";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Loading from "../public/assets/svg/Loading.svg";
import Link from "next/link";
export default function Home() {
  const [ERROR, setError] = useState<any>(false);
  const [Price, setPrice] = useState<any>([
    {
      LastPrice: "",
      Symbol: "BTC",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "ETH",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "BNB",
      PriceChange: "",
      PriceChangePercent: "",
    },
    { LastPrice: "", Symbol: "ADA", PriceChange: "", PriceChangePercent: "" },
    {
      LastPrice: "",
      Symbol: "SOL",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "XRP",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "DOT",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "DOGE",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "LUNA",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "LTC",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "BCH",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "VET",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "ALGO",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "ICP",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "MATIC",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "ATOM",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "XLM",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "AVAX",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "TRX",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "ETC",
      PriceChange: "",
      PriceChangePercent: "",
    },
    {
      LastPrice: "",
      Symbol: "FIL",
      PriceChange: "",
      PriceChangePercent: "",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(async () => {
      getPrice();
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getPrice = async () => {
    for (let i = 0; i < Price.length; i++) {
      await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${Price[i].Symbol}USDT`
      )
        .then(async (res) => {
          const data: any = await res.json();
          let newPrice = Price;
          newPrice[i].LastPrice = parseFloat(data.lastPrice);
          newPrice[i].PriceChange = parseFloat(data.priceChange);
          newPrice[i].PriceChangePercent = parseFloat(data.priceChangePercent);
          setPrice([...newPrice]);
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  if (ERROR) {
    return (
      <div>
        <Head>
          <title>Error</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <div style={{ margin: "20px" }}>
          Can Not Connect To The Api Binance If Your Country Ban By Binance Use
          Vpn!
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Head>
          <title>HOME</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>COIN PRICE (USDT)</div>

        <div className={styles.mainContent}>
          <div className={styles.CoinsContainer}>
            <div className={styles.option}>
              <div className={styles.firstRow}>
                <div className={styles.coinContainer}>
                  <div className={styles.firstColumn}>#</div>
                  <div className={styles.secondColumn}>Name</div>
                  <div className={styles.thirdColumn}>Price</div>
                  <div className={styles.fourthColumn}>PriceChange</div>
                </div>
              </div>
            </div>
            {SupportedCoins.map((coin) => {
              return (
                <Link href={`/Chart/${coin.Name}`} key={coin.id}>
                  <div className={styles.coinContainer}>
                    <div className={styles.firstColumn}>{coin.id}</div>
                    <div className={styles.secondColumn}>
                      <div className={styles.CoinIcon}>
                        <Image src={coin.Image} />
                      </div>
                      <div className={styles.coinData}>
                        <div>{coin.Name}</div>
                        <div>{coin.Symbol}</div>
                      </div>
                    </div>
                    <div className={styles.thirdColumn}>
                      {Price.map((item: any) => {
                        if (item.Symbol === `${coin.Symbol}`) {
                          return (
                            <div key={item.Symbol}>
                              {item.LastPrice === "" ? (
                                <div>
                                  <Image src={Loading} alt="loading" />
                                </div>
                              ) : (
                                <div> {item.LastPrice} $</div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className={styles.fourthColumn}>
                      {Price.map((item: any) => {
                        if (item.Symbol === `${coin.Symbol}`)
                          return (
                            <div key={item.Symbol}>
                              {item.PriceChangePercent === "" ||
                              item.PriceChangePercent === "" ? (
                                <div>
                                  <Image src={Loading} alt="loading" />
                                </div>
                              ) : (
                                <div
                                  style={
                                    item.PriceChangePercent < 0
                                      ? { color: "red" }
                                      : item.PriceChangePercent > 0
                                      ? { color: "green" }
                                      : { color: "gray" }
                                  }
                                >
                                  {item.PriceChange}$ (
                                  {item.PriceChangePercent.toFixed(2)}%)
                                </div>
                              )}
                            </div>
                          );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
