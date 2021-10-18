import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

let candleSeries: any;
let volumeSeries: any;
const Chart = ({ data }: any) => {
  //!------------------------
  const [chartExist, setChartExist] = useState(false);
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);
  const chartContainerRef: any = useRef();
  const chart: any = useRef();

  useEffect(() => {
    const PriceData = data.map((item: any) => {
      const time = new Date(item[0]);
      const KoreanTimeFormat = new Intl.DateTimeFormat("ko-KR").format(time);
      let replaceDot = KoreanTimeFormat.replace(".", "-");
      replaceDot = replaceDot.replace(".", "-");
      const removeDot = replaceDot.replace(".", "");
      const removeSpace = removeDot.replaceAll(" ", "");
      return {
        time: removeSpace,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      };
    });

    const volumeData = data.map((item: any) => {
      const time = new Date(item[0]);
      const KoreanTimeFormat = new Intl.DateTimeFormat("ko-KR").format(time);
      let replaceDot = KoreanTimeFormat.replace(".", "-");
      replaceDot = replaceDot.replace(".", "-");
      const removeDot = replaceDot.replace(".", "");
      const removeSpace = removeDot.replaceAll(" ", "");
      return {
        time: removeSpace,
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
      setChartExist(true);
      candleSeries.setData(PriceData);
      volumeSeries.setData(volumeData);
    } else {
      candleSeries.update(PriceData[PriceData.length - 1]);
      volumeSeries.update(volumeData[volumeData.length - 1]);
    }
  }, [data]);
  useEffect(() => {
    chart.current.resize(size.x - 18, size.y - 58);
  }, [size]);

  return (
    <>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
};

export default Chart;
