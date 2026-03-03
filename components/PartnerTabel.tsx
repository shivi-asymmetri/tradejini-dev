"use client";
import { useEffect, useState } from "react";
import { PartnerData } from "../app/(home)/partner/(types)/PartnerData";

export default function PartnerTable() {
  const [json, setJson] = useState<PartnerData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1HLINR2o8wOxYCflStOJqDnPCZorM02oxfInzd7VNj60/values/Partners!A2:Z?key=AIzaSyC4HqoJdFT7E8FwliXxDdEOFX83GmtAYT0`,
      );
      const data = await res.json();
      let final: PartnerData[] = [];
      if (data) {
        data.values.forEach((f: string[]) => {
          final.push({
            srno: Number(f[0]),
            apName: f[1] as string,
            apCode: f[2] as string,
            constitution: f[3] as string,
            status: f[4] as string,
            address: f[5] as string,
            city: f[6] as string,
            state: f[7] as string,
            pinCode: Number(f[8]),
            terminal: f[9] as string,
            NSE: Number(f[10]),
            BSE: Number(f[11]),
            MCX: Number(f[12]),
          });
        });
      }
      setJson(final);
    })();
  }, []);

  if (json)
    return (
      <div className="select-none px-5 py-10 font-satoshi md:px-10 lg:px-20 xl:px-32">
      <h1 className="mb-6 text-center text-2xl font-bold md:text-4xl">
        Authorised Person
      </h1>

      <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md">
        <table className="w-full min-w-[1000px] table-auto text-left text-sm text-gray-700">
          <thead className="bg-[#1B707F] text-xs text-white md:text-sm">
            <tr>
              <th rowSpan={2} className="border border-white px-4 py-3">
                Sr. No
              </th>
              <th rowSpan={2} className="border border-white px-4 py-3">
                Authorised Person&apos;s Name
              </th>
              <th rowSpan={2} className="border border-white px-4 py-3">
                Code (Exchange wise)
              </th>
              <th rowSpan={2} className="border border-white px-4 py-3">
                Constitution
              </th>
              <th rowSpan={2} className="border border-white px-4 py-3">
                Status
              </th>
              <th colSpan={5} className="border border-white px-4 py-3 text-center">
                Registered Address
              </th>
              <th colSpan={4} className="border border-white px-4 py-3 text-center">
                Terminal Details
              </th>
            </tr>
            <tr>
              <th className="border border-white px-4 py-2">Address</th>
              <th className="border border-white px-4 py-2">City</th>
              <th className="border border-white px-4 py-2">State</th>
              <th className="border border-white px-4 py-2">Pincode</th>
              <th className="border border-white px-4 py-2">Terminal Alloted</th>
              <th className="border border-white px-4 py-2">NSE</th>
              <th className="border border-white px-4 py-2">BSE</th>
              <th className="border border-white px-4 py-2">MCX</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {json.map((item) => (
              <tr key={item.srno} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.srno}</td>
                <td className="px-4 py-2">{item.apName}</td>
                <td className="whitespace-pre-line px-4 py-2">{item.apCode}</td>
                <td className="px-4 py-2">{item.constitution}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">{item.address}</td>
                <td className="px-4 py-2">{item.city}</td>
                <td className="px-4 py-2">{item.state}</td>
                <td className="px-4 py-2">{item.pinCode}</td>
                <td className="px-4 py-2">{item.terminal}</td>
                <td className="px-4 py-2">{item.NSE}</td>
                <td className="px-4 py-2">{item.BSE}</td>
                <td className="px-4 py-2">{item.MCX}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}
