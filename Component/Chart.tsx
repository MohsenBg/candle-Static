import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import styles from "./Chart.module.scss";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
let candleSeries: any;
let volumeSeries: any;
let barsInfo: any;
let box = document.getElementById("chart");
const Chart = ({ data, coinData }: any) => {
  //!------------------------
  const [chartExist, setChartExist] = useState(false);
  const [size, setSize] = useState({
    x: innerWidth,
    y: innerHeight,
  });

  const [ERROR, setError] = useState<any>(false);
  const [lastTimeStamp, setLastTimeStamp] = useState<any>(null);
  const updateSize = () => {
    setSize({
      x: innerWidth,
      y: innerHeight,
    });
  };
  useEffect(() => (window.onresize = updateSize), []);
  const chartContainerRef: any = useRef();
  const chart: any = useRef();

  const renderData = async () => {
    // if there less than 50 bars to the left of the visible area
    if (barsInfo !== null && barsInfo.barsBefore < 50) {
      let currentData: any;
      let limit = 200;
      await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${coinData[0].Symbol}USDT&interval=1d&endTime=${lastTimeStamp}&limit=${limit}`
      )
        .then(async (res) => {
          currentData = await res.json();
          setLastTimeStamp(currentData[0][0]);
        })
        .catch((error) => {
          setError(true);
        });
      const PriceData = await currentData.map((item: any) => {
        const time = new Date(item[0]).toLocaleDateString("en-CA", {
          timeZone: "UTC",
        });
        return {
          time: time,
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        };
      });
      const volumeData = await currentData.map((item: any) => {
        const time = new Date(item[0]).toLocaleDateString("en-CA", {
          timeZone: "UTC",
        });
        return {
          time: time,
          value: item[5],
        };
      });

      const newCandleSeries = await chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      const newVolumeSeries = chart.current.addHistogramSeries({
        color: "rgba(31, 31, 31, 0.5)",
        base: 2,
        baseLineWidth: 2,
        overlay: true,
        priceFormat: {
          type: "volume",
        },
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      await newCandleSeries.applyOptions({
        priceLineVisible: false,
        baseLineVisible: true,
        lastValueVisible: false,
      });
      await newVolumeSeries.applyOptions({
        priceLineVisible: false,
        baseLineVisible: true,
        lastValueVisible: false,
      });
      await newCandleSeries.setData(PriceData);
      await newVolumeSeries.setData(volumeData);

      barsInfo = newCandleSeries.barsInLogicalRange(
        chart.current.timeScale().getVisibleLogicalRange()
      );
      console.log(barsInfo);
    }
  };

  useEffect(() => {
    const PriceData = data.map((item: any) => {
      const time = new Date(item[0]).toLocaleDateString("en-CA", {
        timeZone: "UTC",
      });
      return {
        time: time,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      };
    });

    const volumeData = data.map((item: any) => {
      const time = new Date(item[0]).toLocaleDateString("en-CA", {
        timeZone: "UTC",
      });
      return {
        time: time,
        value: item[5],
      };
    });

    if (!chartExist) {
      chart.current = createChart(chartContainerRef.current, {
        width: size.x,
        height: size.y,

        layout: {
          backgroundColor: "#253248",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "#334158",
          },
          horzLines: {
            color: "#334158",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },

        timeScale: {
          borderColor: "#485c7b",
        },
      });

      candleSeries = chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });
      volumeSeries = chart.current.addHistogramSeries({
        color: "rgba(31, 31, 31, 0.5)",
        base: 2,
        baseLineWidth: 2,
        overlay: true,
        priceFormat: {
          type: "volume",
        },
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
    }

    if (!chartExist) {
      setLastTimeStamp(data[0][0]);
      candleSeries.setData(PriceData);
      volumeSeries.setData(volumeData);
      setChartExist(true);
    } else {
      candleSeries.update(PriceData[PriceData.length - 1]);
      volumeSeries.update(volumeData[volumeData.length - 1]);
      barsInfo = candleSeries.barsInLogicalRange(
        chart.current.timeScale().getVisibleLogicalRange()
      );
      renderData();
    }
  }, [data]);

  useEffect(() => {
    chart.current.resize(size.x, size.y);
  }, [size]);

  return (
    <>
      <div className={styles.chart}>
        <div className={styles.icon}>
          <Link href="/">
            <BiArrowBack />
          </Link>
        </div>
        <div className={styles.title}>
          Candle Static Chart ({coinData[0].Symbol}-USDT) DAILY
        </div>
        <div id="chart" ref={chartContainerRef} className="chart-container" />
      </div>
    </>
  );
};

export default Chart;
