"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(home)/(stockslist)/non-cash-stocks/(components)/dataTable";
import {
  columns,
  PledgeStock,
} from "@/app/(home)/(stockslist)/non-cash-stocks/(components)/columns";

export default function MarginPledgeTable() {
  const [json, setJson] = useState<PledgeStock[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1HLINR2o8wOxYCflStOJqDnPCZorM02oxfInzd7VNj60/values/Margin_pledge_Stock_List!A2:Z?key=AIzaSyC4HqoJdFT7E8FwliXxDdEOFX83GmtAYT0`,
      );
      const data = await res.json();
      const final: PledgeStock[] = [];

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
        Eligible List for Margin Pledging
      </h1> */}
      <div className="mt-2 rounded-md">
        <DataTable columns={columns} data={json} />
      </div>
    </div>
  );
}
