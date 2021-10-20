import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

let candleSeries: any;
let volumeSeries: any;
let barsInfo: any;
const Chart = ({ data }: any) => {
  //!------------------------
  const [chartExist, setChartExist] = useState(false);
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [ERROR, setError] = useState<any>(false);
  const [lastTimeStamp, setLastTimeStamp] = useState(true);
  const [a, setA] = useState(true);
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);
  const chartContainerRef: any = useRef();
  const chart: any = useRef();

  const renderData = async () => {
    // if there less than 50 bars to the left of the visible area
    if (barsInfo !== null && barsInfo.barsBefore < 50) {
      let currentData: any;
      let limit = 500;
      await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&endTime=${lastTimeStamp}&limit=${limit}`
      )
        .then(async (res) => {
          currentData = await res.json();
          setLastTimeStamp(currentData[200][0]);
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

      candleSeries.setData(PriceData);
      console.log(barsInfo);
    }
    if (
      barsInfo !== null &&
      barsInfo.barsAfter < 50 &&
      data[200][0] !== lastTimeStamp
    ) {
      let currentData: any;
      let limit = 500;
      await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=${lastTimeStamp}&limit=${limit}`
      )
        .then(async (res) => {
          currentData = await res.json();
          setLastTimeStamp(currentData[200][0]);
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

      candleSeries.setData(PriceData);
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
      setLastTimeStamp(data[200][0]);
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
    chart.current.resize(size.x - 18, size.y - 58);
  }, [size]);

  return (
    <>
      <div style={{ marginTop: "20px", fontSize: "25px" }}>
        Candle Static Chart (BTC-USDT) DAILY
      </div>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
};

export default Chart;
