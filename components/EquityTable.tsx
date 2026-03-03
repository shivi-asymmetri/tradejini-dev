import { useEffect, useState } from "react";
import { EquityData } from "@/app/(home)/calculators/margin-calculator/(types)/EquityData";

export default function EquityTable({ data }: { data: EquityData[] }) {
  const [funds, setFunds] = useState(0);
  const [query, setQuery] = useState("");
  const [json, setJson] = useState<EquityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/equity");

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        setJson(data);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load equity data. Please try again later.");
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

  if (json.length > 0)
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
            .map((x) => (
              <div
                key={x.symbol}
                className="w-full rounded-2xl border p-5 font-satoshi shadow-lg"
              >
                <h4 className="text-center font-bold">{x.symbol}</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex flex-row justify-between">
                    <h5 className="text-start font-semibold">Multiplier</h5>
                    <h5 className="text-start font-semibold">Margin</h5>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[#555353]">{x.multiplier}</p>
                    <p className="text-[#555353]">
                      {funds === 0 ? "" : funds * x.multiplier}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <table className="relative mt-20 hidden h-full max-h-[40vh] w-full max-w-4xl table-auto overflow-y-auto rounded-3xl bg-white dark:bg-black md:table">
          <thead className="sticky left-0 top-0 z-30 rounded-t-3xl text-[#8b8b8b] dark:text-white/80">
            <tr className="relative rounded-t-3xl font-normal">
              <th className="min-w-40 rounded-tl-3xl font-normal">
                <p className="rounded-tl-2xl bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                  Symbol
                </p>
              </th>
              <th className="min-w-40 font-normal">
                <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">Multiplier</p>
              </th>
              <th className="min-w-40 font-normal">
                <p className="rounded-tr-2xl bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                  Percentage
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="w-full border-b border-t">
            {json
              ?.filter((item) =>
                item.symbol.toLowerCase().includes(query.toLowerCase()),
              )
              .map((x) => (
                <tr
                  key={x.symbol}
                  className="h-full min-h-full border-b-2 border-l-2 border-r-2 border-b-gray-200 border-r-gray-200"
                >
                  <td className="text-nowrap p-[14px] px-8 text-center">
                    {x.symbol}
                  </td>
                  <td className="text-nowrap p-[14px] px-8 text-center">
                    {x.multiplier}
                  </td>
                  <td className="text-nowrap p-[14px] px-8 text-center">
                    {Math.round(100 / x.multiplier)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  return <></>;
}
