import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "../Component/PriceData";
import { volumeData } from "./volumeData";

const Chart = () => {
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

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    candleSeries.setData(priceData);

    const volumeSeries = chart.current.addHistogramSeries({
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

    volumeSeries.setData(volumeData);
  }, []);
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
