import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("../Component/Chart"), {
  ssr: false,
});
export default function Home() {
  return (
    <div>
      <Head>
        <title>Mohsen_Bg</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={{ marginTop: "20px", fontSize: "25px" }}>
        Candle Static Chart
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
}
