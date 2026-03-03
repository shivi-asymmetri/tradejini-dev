"use client";
import { useState, useEffect } from "react";
import { CommodityDataType } from "@/app/(home)/calculators/margin-calculator/(types)/CommodityData";

export default function CommodityTable({
  data,
}: {
  data: CommodityDataType[];
}) {
  const [query, setQuery] = useState("");
  const [funds, setFunds] = useState(0);
  const [json, setJson] = useState<CommodityDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/commodity");

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        setJson(data);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load commodity data. Please try again later.");
        setJson([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-[#005B6C] px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (json)
    return (
      <div className="grid w-full place-items-center px-5 md:px-20 lg:mb-40">
        <div className="mt-5 flex w-full flex-grow flex-col items-center justify-center gap-x-5 gap-y-5 md:flex-row">
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            placeholder="Search"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-black placeholder:font-normal placeholder:text-gray-500 dark:bg-black dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400 outline-none focus:border-themeBlue transition-colors"
          />

          <input
            type="text"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-black placeholder:font-normal placeholder:text-gray-500 dark:bg-black dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400 outline-none focus:border-themeBlue transition-colors"
            value={funds === 0 ? "" : funds}
            placeholder="Funds"
            onChange={(e) =>
              !isNaN(Number(e.target.value)) && setFunds(Number(e.target.value))
            }
          />

          <button
            onClick={() => {
              setQuery("");
              setFunds(0);
            }}
            className="grid h-full place-items-center rounded-lg bg-white p-1 dark:bg-zinc-800 dark:text-white"
          >
            <img src="/reset.png" alt="" className="h-5 dark:invert md:h-6" />
          </button>
        </div>
        <div className="mt-5 w-full space-y-2 md:hidden">
          {json
            ?.filter((item) =>
              item.symbol.toLowerCase().includes(query.toLowerCase()),
            )
            .map((item) => (
              <div
                className="w-full rounded-2xl border p-5 font-satoshi shadow-lg"
                key={item.expiry + item.symbol}
              >
                <h4 className="text-center font-bold">
                  {item.symbol}{" "}
                  <span className="font-regular">{item.underGrp}</span>
                </h4>
                <p className="text-center text-sm text-[#555353]">
                  {item.expiry.toString()}
                </p>

                <div className="space-y-3 text-xs">
                  <div className="flex flex-row justify-between">
                    <h5 className="text-start font-semibold">
                      Total Long Margin
                    </h5>
                    <h5 className="text-end font-semibold">
                      Total Short Margin
                    </h5>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[#555353]">{item.totalLong}</p>
                    <p className="text-[#555353]">{item.totalShort}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h5 className="text-start font-semibold">Lot Size</h5>
                    <h5 className="text-end font-semibold">Lots</h5>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[#555353]">1</p>
                    <p className="text-[#555353]">
                      {funds === 0 ? "" : Math.round(funds / item.totalShort)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <table className="relative mt-20 table h-full max-h-[40vh] w-full table-auto overflow-auto rounded-3xl bg-white dark:bg-black max-md:hidden">
          <thead className="sticky left-0 top-0 z-30 rounded-t-3xl border-b-2 border-gray-200 text-[#8b8b8b] dark:text-white/80">
            <tr className="relative rounded-t-3xl font-normal">
              <th className="rounded-tl-3xl font-normal md:min-w-40">
                <p className="rounded-tl-2xl bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                  Commodity
                </p>
              </th>
              <th className="font-normal md:min-w-40">
                <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                  Total Long Margin
                </p>
              </th>
              <th className="font-normal md:min-w-40">
                <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                  Total Short Margin
                </p>
              </th>
              <th className="font-normal md:min-w-40">
                <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">Lots</p>
              </th>
            </tr>
          </thead>
          <tbody className="w-full overflow-clip border-b border-t max-md:w-[50vw]">
            {json
              ?.filter((item) =>
                item.symbol.toLowerCase().includes(query.toLowerCase()),
              )
              .map((x) => (
                <tr
                  key={x.symbol + x.expiry}
                  className="h-full min-h-full border-b-2 border-l-2 border-r-2 border-b-gray-200 border-r-gray-200"
                >
                  <td className="flex flex-col gap-y-1 text-nowrap py-2 pl-3 text-center md:p-[14px] md:px-8">
                    <div className="flex flex-col items-baseline gap-x-1">
                      <h5 className="font-semibold">
                        {x.symbol}{" "}
                        <span className="font-regular">{x.underGrp}</span>
                      </h5>
                      <h5 className="text-sm">{x.expiry.toString()}</h5>
                    </div>
                  </td>
                  <td className="text-nowrap px-3 py-2 text-center md:p-[14px] md:px-8">
                    {x.totalLong}
                  </td>
                  <td className="text-nowrap px-3 py-2 text-center md:p-[14px] md:px-8">
                    {x.totalShort}
                  </td>
                  <td className="text-nowrap px-3 py-2 text-center md:p-[14px] md:px-8">
                    {funds === 0 ? "" : Math.round(funds / x.totalLong)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  return <></>;
}
