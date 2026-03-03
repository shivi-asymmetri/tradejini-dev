"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(home)/(stockslist)/non-cash-mutual-funds/(components)/dataTable";
import {
    columns,
    PledgeStockMF,
} from "@/app/(home)/(stockslist)/non-cash-mutual-funds/(components)/columns";

export default function MarginPledgeMFTable() {
  const [json, setJson] = useState<PledgeStockMF[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1HLINR2o8wOxYCflStOJqDnPCZorM02oxfInzd7VNj60/values/Margin_Pledge_Mutual_Fund!A2:Z?key=AIzaSyC4HqoJdFT7E8FwliXxDdEOFX83GmtAYT0`,
      );
      const data = await res.json();
      const final: PledgeStockMF[] = [];

      if (data?.values) {
        data.values.forEach((f: string[]) => {
          final.push({
            srno: Number(f[0]),
            symbol: f[1],
            isin: f[2],
            securityName: f[3],
          });
        });
      }

      setJson(final);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-7xl flex-col items-center justify-center gap-10 overflow-hidden px-6 pt-2 font-satoshi md:px-0 md:pt-4">
      {/* <h1 className="text-2xl font-bold md:text-4xl">
        Eligible Stocks for Margin Pledging Mutual Fund
      </h1> */}
      <div className="mt-2 rounded-md">
        <DataTable columns={columns} data={json} />
      </div>
    </div>
  );
}
