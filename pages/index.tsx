import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Loading from "../public/assets/svg/Loading.svg";
import Link from "next/link";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypeCoinsData } from "../redux/coinsData/ActionType";

export default function Home() {
  const [dots, setDots] = useState<any>([]);
  const [countItem, setCountItem] = useState(10);
  const [Page, setPage] = useState(1);
  const SupportedCoins: Array<coinDataInterface> = useSelector(
    (state: any) => state.coinsData.coinsData
  );
  const LoadingStatus = useSelector((state: any) => state.loading.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    let dots = [];
    for (let i = 1; i < SupportedCoins.length / countItem; i++) {
      let obj = {
        id: i,
      };
      dots.push(obj);
    }
    setDots(dots);
  }, [SupportedCoins, countItem]);

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
      <div
        className={styles.container}
        style={LoadingStatus ? { height: "100vh", overflow: "hidden" } : {}}
      >
        {SupportedCoins.length > 0 ? (
          <>
            <div className={styles.title}>COIN PRICE (USDT)</div>
            <div className={styles.mainContent}>
              <div className={styles.CoinsContainer}>
                <div className={styles.option}>
                  <div className={styles.firstRow}>
                    <div className={styles.coinContainer}>
                      <div className={styles.secondColumn}>Name</div>
                      <div className={styles.thirdColumn}>Price</div>
                      <div className={styles.fourthColumn}>PriceChange</div>
                    </div>
                  </div>
                </div>
                {SupportedCoins.slice(
                  (Page - 1) * countItem,
                  Page * countItem
                ).map((coin) => {
                  return (
                    <Link href={`/Chart/${coin.coin_name}`} key={coin.coin_id}>
                      <div className={styles.coinContainer}>
                        <div className={styles.secondColumn}>
                          <div className={styles.CoinIcon}>
                            <img
                              width={45}
                              height={45}
                              src={coin.url}
                              alt={coin.coin_id}
                            />
                          </div>
                          <div className={styles.coinData}>
                            <div>{coin.coin_name}</div>
                            <div>{coin.coin_symbol}</div>
                          </div>
                        </div>
                        <div className={styles.thirdColumn}>
                          <div>
                            {coin.coin_price_usd === "" ? (
                              <div>
                                <Image src={Loading} alt="loading" />
                              </div>
                            ) : (
                              <div> {coin.coin_price_usd} $</div>
                            )}
                          </div>
                        </div>
                        <div className={styles.fourthColumn}>
                          <div>
                            {coin.coin_price_change === "" ||
                            coin.coin_percent_change_24h === "" ? (
                              <div>
                                <Image src={Loading} alt="loading" />
                              </div>
                            ) : (
                              <div
                                style={
                                  parseFloat(coin.coin_price_change) < 0
                                    ? { color: "red" }
                                    : parseFloat(coin.coin_price_change) > 0
                                    ? { color: "green" }
                                    : { color: "gray" }
                                }
                              >
                                {coin.coin_price_change}$ (
                                {parseFloat(
                                  coin.coin_percent_change_24h
                                ).toFixed(2)}
                                %)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className={styles.dots}>
                <div>
                  {dots.map((dot: any) => {
                    return (
                      <span
                        className={styles.dot}
                        style={dot.id === Page ? { color: "red" } : {}}
                        key={dot.id}
                        onClick={() => setPage(dot.id)}
                      >
                        {dot.id}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
