import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypeCoinsData } from "../redux/coinsData/ActionType";
import { ActionTypeLoading } from "../redux/Loading/ActionType";
import { initialState } from "../redux/store";
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
interface coinInterface {
  coin_id: string;
  coin_slug: string;
  coin_name: string;
  coin_symbol: string;
  coin_rank: string;
  coin_price_usd: string;
  coin_price_eth: string;
  coin_price_btc: string;
  coin_24h_volume_usd: string;
  coin_24h_volume_eth: string;
  coin_24h_volume_btc: string;
  coin_market_cap_usd: string;
  coin_available_supply: string;
  coin_total_supply: string;
  coin_percent_change_1h: string;
  coin_percent_change_12h: string;
  coin_percent_change_24h: string;
  coin_percent_change_7d: string;
  coin_last_updated: string;
}

const Dispatcher = () => {
  const dispatch = useDispatch();
  const [Error, setError] = useState(false);
  useEffect(() => {
    dispatch({ type: ActionTypeLoading.ON_LOADING });
    setTimeout(() => {
      dispatch({ type: ActionTypeLoading.END_LOADING });
    }, 5000);
  }, []);

  const coinsData: Array<coinDataInterface> = useSelector(
    (state: typeof initialState) => state.coinsData.coinsData
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      fetcher();
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const fetcher = async () => {
    let afterFilter: any;
    await fetch("https://api.binance.com/api/v3/ticker/24hr")
      .then(async (res) => {
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
      })
      .catch((error) => {
        setError(true);
      });
    await fetch("https://cryptocurrencyliveprices.com/api/")
      .then(async (res) => {
        const data = await res.json();
        let FINAL: Array<coinInterface> = data.filter(function (o1: any) {
          return afterFilter.some(function (o2: any) {
            return `${o1.coin_symbol}USDT` === o2.Symbol;
          });
        });
        //@ts-ignore
        let result: any = [];
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

        dispatch({
          type: ActionTypeCoinsData.STORE_COINS_DATA,
          payload: result,
        });
      })
      .catch((error) => {
        setError(true);
      });
  };
  if (Error) {
    return (
      <div
        style={{
          top: "0",
          left: "0",
          position: "fixed",
          backgroundColor: "black",
          width: "100%",
          color: "white",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //@ts-ignore
          zIndex: "12",
        }}
      >
        Can Not Connect To The Api Binance If Your Country Ban By Binance Use
        Vpn!
      </div>
    );
  }
  return null;
};

export default Dispatcher;
