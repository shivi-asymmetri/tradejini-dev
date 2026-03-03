// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// TODO : Fix No TS :(
"use client";

import { useEffect, useCallback, useState, useRef, Fragment } from "react";
import {
  CommonAPIResponse,
  FuturesAPIResponse,
  NSEAPIResponse,
} from "../app/calculators/margin-calculator/(types)/APIResponseTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import FadeInWrapper from "./FadeInWrapper";
import ReactMarkdown from "react-markdown";

type MarginData = {
  dispQty: string;
  dispSymbol: string;
  exc_id: string;
  exch: string;
  exd: Date | string;
  expo: string;
  expo_trade: string;
  instname: string;
  lotSize: number;
  netqty: string;
  prd: string;
  request_time: Date;
  span: string;
  span_trade: string;
  stat: string;
  symname: string;
};

function convertDate(date: string) {
  const [year, monthIndex, day] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[Number(monthIndex) - 1].toUpperCase();
  const formattedDay = String(day).padStart(2, "0");
  return `${formattedDay}-${monthName}-${year}`;
}

export default function FOForm({
  symbols,
}: {
  symbols: NSEAPIResponse | FuturesAPIResponse;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params?.set(name, value);
      return params?.toString();
    },
    [searchParams],
  );

  const [query, setQuery] = useState("");
  const answerRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<NSEAPIResponse | FuturesAPIResponse>(
    symbols,
  );

  const [selectedSymbol, setSelectedSymbol] = useState<
    keyof NSEAPIResponse | keyof FuturesAPIResponse | undefined
  >(undefined);
  const [dropdown, setDropdown] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined,
  );

  const [cepe, setcepe] = useState<"CE" | "PE">("CE");

  useEffect(() => {
    if (symbols) {
      setResults(
        Object.keys(symbols)
          .filter((key) => key.toLowerCase().includes(query.toLowerCase()))
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: (symbols as Record<string, any>)[key],
            }),
            {} as NSEAPIResponse | FuturesAPIResponse,
          ),
      );
    }
  }, [query, symbols]);

  // useEffect(() => {
  //   if (selectedSymbol) {
  //     fetch("/apis/getStrikePrices", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify({ symbol: selectedSymbol }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setStrikeprices(data.data);
  //         setSelectedPrice(data.data[0]);
  //       });
  //   }
  // }, [selectedSymbol]);

  const [product, setProduct] = useState<"futures" | "options">(
    (searchParams?.get("subtype") as "futures" | "options") || "options",
  );

  useEffect(() => {
    setTotals({
      span: 0.0,
      exposure: 0.0,
      total: 0.0,
      benefit: 0.0,
      multi: 0.0,
    });
    setQuery("");
    setResults({} as CommonAPIResponse);
    setSelectedPrice(0);
    setSelectedSymbol(undefined);
  }, [product]);
  const [type, setType] = useState<"buy" | "sell" | null>(null);

  const [added, setAdded] = useState<
    {
      prd: string;
      exch: string;
      symname: string;
      instname: string;
      exd: string | Date;
      netqty: string;
      exc_id: string;
      dispSymbol: string;
      lotSize: number;
      dispQty: string;
      strprc: string;
      optt: string;
    }[]
  >([]);

  const [lots, setLots] = useState(1);

  const [totals, setTotals] = useState({
    span: 0.0,
    exposure: 0.0,
    total: 0.0,
    benefit: 0.0,
    multi: 0.0,
  });

  useEffect(() => {
    // console.log(addedSymbols);
    const URL = "https://cube.tradejini.com//NorenWClient/SpanCalc";

    if (added.length > 0) {
      const promisesArray = added.map((item) =>
        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: `jData=${JSON.stringify({
            actid: "DUMMY",
            pos: [item],
          })}`,
        }).then((res) => res.json()),
      );

      promisesArray.push(
        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: `jData=${JSON.stringify({
            actid: "DUMMY",
            pos: added,
          })}`,
        }).then((res) => res.json()),
      );

      Promise.all(promisesArray).then(
        (
          data: {
            request_time: Date; // Format: "HH:mm:ss DD-MM-YYYY"
            stat: string; // Status, e.g., "Ok"
            span: string; // Span margin, e.g., "0.00"
            expo: string; // Exposure margin, e.g., "0.00"
            span_trade: string; // Span trade margin, e.g., "0.00"
            expo_trade: string; // Exposure trade margin, e.g., "0.00"
            pre_trade: string; // Pre-trade margin, e.g., "0.00"
            add: string; // Additional margin, e.g., "0.00"
            add_trade: string; // Additional trade margin, e.g., "0.00"
            ten: string; // Tender margin, e.g., "0.00"
            ten_trade: string; // Tender trade margin, e.g., "0.00"
            del: string; // Delivery margin, e.g., "0.00"
            del_trade: string; // Delivery trade margin, e.g., "0.00"
            spl: string; // Special margin, e.g., "0.00"
            spl_trade: string; // Special trade margin, e.g., "0.00"
          }[],
        ) => {
          const newArr: MarginData[] = [];
          const tot = {
            span: 0.0,
            exposure: 0.0,
            total: 0.0,
            benefit: 0.0,
            multi: 0.0,
          };
          data.forEach((item, idx) => {
            if (idx === data.length - 1) {
              tot.span = Number(item.span);
              tot.exposure = Number(item.expo);
              tot.multi = Number(item.expo) + Number(item.span);
              tot.benefit = tot.total - tot.multi;
            } else {
              newArr.push({ ...item, ...added[idx] });
              tot.total += Number(item.span) + Number(item.expo);
            }
          });
          setMarginData(newArr);
          setTotals(tot);
        },
      );
    } else {
      setMarginData([]);
    }
  }, [added]);

  const [marginData, setMarginData] = useState<MarginData[]>([]);

  const addItem = useCallback(() => {
    if (selectedSymbol) {
      const symbolData = symbols[selectedSymbol] as
        | NSEAPIResponse
        | FuturesAPIResponse; // Type assertion

      setAdded((x) => [
        ...x,
        {
          prd: "M",
          exch: symbolData.id.split("_")[2],
          symname: symbolData.id.split("_")[1],
          instname: symbolData.id.split("_")[0],
          exd: convertDate(symbolData.id.split("_")[3]),
          netqty: String((type === "sell" ? -1 : 1) * symbolData.lot * lots),
          exc_id: crypto.randomUUID(),
          dispSymbol: `${selectedSymbol} ${product === "futures" ? "FUT" : selectedPrice + cepe}`,
          lotSize: symbolData.lot,
          dispQty: String(symbolData.lot),
          strprc: String(selectedPrice),
          optt: cepe.toUpperCase(),
        },
      ]);
    } else {
      alert("SELECT A SYMBOL");
    }
  }, [selectedSymbol, symbols, type, lots, product, selectedPrice, cepe]);

  useEffect(() => {
    if (type) {
      // Check if we have all required data for the selected product
      if (
        selectedSymbol &&
        lots !== 0 &&
        (product === "futures" || (product === "options" && selectedPrice))
      ) {
        addItem();
        setType(null); // Reset type immediately after adding
      } else {
        setType(null); // Reset type even if conditions aren't met
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]); // Only depend on type to prevent multiple triggers

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",

    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [hoverIdx, setHoverIdx] = useState(-1);
  const hoverIdxRef = useRef(-1);
  useEffect(() => {
    hoverIdxRef.current = hoverIdx;
  }, [hoverIdx]);
  function keyDownEvent(evt: KeyboardEvent) {
    if (evt.code === "ArrowDown") {
      setHoverIdx((old) => (old + 1) % 10);
    } else if (evt.code === "ArrowUp") {
      setHoverIdx((old) => (old === 0 ? 9 : old - 1));
    } else if (evt.code === "Enter") {
      console.log(hoverIdxRef.current);
      const results = Object.keys(symbols)
        .filter((key) => key.toLowerCase().includes(query.toLowerCase()))
        .reduce(
          (obj, key) => ({ ...obj, [key]: symbols[key] }),
          {} as NSEAPIResponse | FuturesAPIResponse,
        );

      console.log(results);
      const resultKeys = Object.keys(results);
      const symbol = resultKeys[hoverIdxRef.current] as keyof typeof symbols;

      if (symbol) {
        console.log(symbol);
        setQuery(symbol);
        setSelectedSymbol(symbol);

        if (product === "options") {
          const selectedSymbolData = symbols[symbol] as {
            strikePrices: number[];
          };

          if (selectedSymbolData.strikePrices) {
            setSelectedPrice(
              selectedSymbolData.strikePrices[
                Math.floor(selectedSymbolData.strikePrices.length / 2)
              ],
            );
          }
        }

        setDropdown(false);
      }
    } else if (evt.code === "Escape") {
      setDropdown(false);
      setQuery("");
    }
  }

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (dropdown) {
      setHoverIdx(0);
      document.addEventListener("keydown", keyDownEvent);
    } else {
      document.removeEventListener("keydown", keyDownEvent);
    }
    return () => {
      document.removeEventListener("keydown", keyDownEvent);
    };
  }, [dropdown, query]);

  const faqs = [
    {
      title: "What sets Tradejini apart from other trading platforms?",
      text: `
Tradejini stands out for being faster, cheaper, and better. It offers a seamless trading experience with competitive brokerage fees, intuitive tools, stable & scalable API’s and a strong focus on transparency, making it an ideal platform for both traders and investors.
`,
    },
    {
      title: "Is Tradejini safe for trading?",
      text: `
Yes, Tradejini is a decade-old SEBI-registered entity with membership of all three exchanges, NSE, BSE, and MCX. Tradejini is also a trusted Depository Participant (DP) and a self-clearing entity. We ensure transparency, secure infrastructure, and data safety, trusted by thousands of traders and investors.`,
    },
    {
      title: "What are the brokerage charges on Tradejini?",
      text: `
Tradejini offers competitive and transparent brokerage charges, with a flat fee structure for equity, commodity, and options trading.
₹20 for Equity,  F&0
₹0 for API access
₹0 Commissions on Mutual Funds IPOs. 
For details, refer to our pricing page.
`,
    },
    {
      title: "How can I open an account with Tradejini?",
      text: `
You can open an account by visiting the EKYC portal or downloading the CubePlus app. Complete the online registration, upload the required documents, and verify your details to get started.
`,
    },
    {
      title: "What tools and features make Tradejini unique?",
      text: `
Tradejini offers unique state-of-the-art features such as a dedicated options trading platform, premium TradingView integration, custom trading modes for scalpers, option buyers, and investors, exclusive API support to enhance your automated trading experience, and much more.
`,
    },
    //     {
    //       title: "How to file taxes?",
    //       text: `
    // Tradejini is a SEBI-regulated trading platform and a Depository Participant (DP) compliant with all rules and regulations. You can rely on Dhan to invest in share market as thousands of others do as well. Furthermore, we take transparency and security very seriously. Our goal is to always ensure that you have visibility into pricing and other details. We also ensure that your data is safe at all times.

    // Tradejini is a SEBI-regulated trading platform and a Depository Participant (DP) compliant with all rules and regulations. You can rely on Dhan to invest in share market as thousands of others do as well. Furthermore, we take transparency and security very seriously. Our goal is to always ensure that you have visibility into pricing and other details. We also ensure that your data is safe at all times.`,
    //     },
  ];

  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState([
    true,
    ...Array.from({ length: faqs.length - 1 }).map(() => false),
  ]);
  return (
    <div className="mx-auto max-w-screen-2xl pb-14 font-satoshi">
      <div
        onClick={(_) => {
          setDropdown(false);
        }}
        className="mt-8 flex flex-col items-stretch justify-between px-5 pb-20 max-xl:text-sm xl:px-10 xl:pb-20"
      >
        <div className="grid grid-cols-1 gap-8 max-xl:w-full xl:grid-cols-2 xl:gap-x-16">
          <div className="flex flex-col justify-between gap-6 xl:h-full xl:gap-y-8">
            <div className="flex flex-col justify-start gap-x-2 gap-y-5 xl:flex-row xl:items-center">
              <div className="flex flex-col items-start gap-1 max-xl:w-full">
                <span className="font-semibold text-gray-500">Product</span>
                <div className="relative h-full rounded-lg border border-[#B3B3B3] p-[2px] dark:from-zinc-600 dark:to-zinc-400 max-xl:w-full">
                  <select
                    value={product}
                    onChange={(e) => {
                      router.push(
                        pathname +
                          "?" +
                          createQueryString("subtype", e.target.value),
                      );
                      setProduct(e.target.value as "futures" | "options");
                    }}
                    className="relative z-[99999999] w-full rounded-lg bg-white p-2 text-black dark:bg-black xl:w-60 2xl:w-72"
                  >
                    <option className="" value="futures">
                      Futures
                    </option>
                    <option className="" value="options">
                      Options
                    </option>
                  </select>
                </div>
              </div>
              <div className="relative flex flex-col items-start gap-1">
                <span className="font-semibold text-gray-500">
                  Select Symbols
                </span>
                <div className="relative h-full rounded-lg border border-[#B3B3B3] p-[2px] dark:from-zinc-600 dark:to-zinc-400 max-xl:w-full">
                  <input
                    className="relative z-[99999999] w-full rounded-lg bg-white p-2 text-black dark:bg-black xl:w-60 2xl:w-72"
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setDropdown(true);
                    }}
                  />
                </div>
                {query !== "" &&
                  dropdown &&
                  Object.keys(results).length > 0 && (
                    <div className="dropdown absolute top-[110%] z-[999999999999] h-64 w-72 overflow-y-scroll rounded-lg border-2 bg-white p-3 text-black shadow-lg dark:bg-zinc-800 dark:text-white">
                      {Object.keys(results)
                        .filter((_, idx) => idx < 10)
                        .map((symbol, idx) => (
                          <div
                            onClick={() => {
                              setDropdown(false);
                              setQuery(symbol);
                              setSelectedSymbol(symbol);
                              if (product === "options")
                                setSelectedPrice(
                                  symbols[symbol].strikePrices[
                                    Math.floor(
                                      symbols[symbol].strikePrices.length / 2,
                                    )
                                  ],
                                );
                            }}
                            style={{}}
                            className={`flex cursor-pointer items-center justify-between ${hoverIdx === idx ? "bg-blue-500" : ""}`}
                            key={symbol}
                          >
                            <p className="">{symbol}</p>
                            <p className="text-sm text-red-500">
                              {results[symbol].id.split("_")[2]}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-row items-end gap-x-5 gap-y-5 xl:gap-x-2">
              {product === "options" && (
                <div className="relative flex w-1/2 flex-col items-start gap-1 xl:w-60 2xl:w-72">
                  <span className="font-semibold text-gray-500">
                    Strike Price
                  </span>
                  <div className="relative h-full w-full rounded-lg border border-[#B3B3B3] p-[2px] dark:from-zinc-600 dark:to-zinc-400 xl:w-fit">
                    {selectedSymbol && selectedPrice !== undefined ? (
                      <select
                        name="strikeprice"
                        className="relative z-[99999999] w-full rounded-lg bg-white p-2 text-black dark:bg-black xl:w-60 2xl:w-72"
                        value={selectedPrice}
                        id=""
                        onChange={(e) =>
                          setSelectedPrice(Number(e.target.value))
                        }
                      >
                        {symbols[selectedSymbol].strikePrices?.map(
                          (item: number) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ),
                        )}
                      </select>
                    ) : (
                      <select className="relative z-[99999999] min-w-full rounded-lg bg-white p-2 text-black dark:bg-black xl:w-60 2xl:w-72">
                        <option value="" className="w-full" hidden></option>
                      </select>
                    )}
                  </div>
                </div>
              )}
              {product === "options" && (
                <div className="flex flex-col gap-1 max-xl:w-1/2 xl:hidden xl:w-60 2xl:w-72">
                  <p className="w-fit font-semibold text-gray-500 max-xl:hidden">
                    Option Type
                  </p>
                  <div className="flex h-fit cursor-pointer justify-between rounded-full border-2 border-[#f0f0f0] bg-[#f0f0f0] xl:w-40">
                    <label
                      className={`w-1/2 rounded-full border-2 p-2 text-center font-semibold transition-all duration-150 ${cepe === "CE" ? "border-[#005b6c] bg-[#005b6c] text-white" : "border-[#f0f0f0] bg-[#f0f0f0]"}`}
                      htmlFor="ce"
                    >
                      CE
                    </label>
                    <label
                      className={`w-1/2 rounded-full border-2 border-transparent p-2 text-center font-semibold transition-all duration-150 ${cepe === "PE" ? "border-[#005b6c] bg-[#005b6c] text-white" : "border-[#f0f0f0] bg-[#f0f0f0]"}`}
                      htmlFor="pe"
                    >
                      PE
                    </label>
                  </div>
                  <div className="hidden">
                    <input
                      onChange={() => {
                        setcepe("CE");
                      }}
                      value={"CE"}
                      type="radio"
                      id="ce"
                      name="cepe"
                    />
                  </div>
                  <div className="hidden">
                    <input
                      onChange={(_) => {
                        setcepe("PE");
                      }}
                      value={"PE"}
                      type="radio"
                      id="pe"
                      name="cepe"
                    />
                  </div>
                </div>
              )}

              <div className="flex w-full flex-col justify-end gap-1 max-xl:hidden xl:w-60 2xl:w-72">
                <span className="flex w-full items-start justify-between xl:items-end">
                  <p className="w-fit font-semibold text-gray-500">
                    No. Of Lots
                  </p>
                </span>
                <div className="relative flex h-full w-full flex-row items-center justify-between gap-x-3 rounded-lg dark:text-black">
                  <div className="w-1/2 rounded-lg border border-[#B3B3B3] p-[2px] dark:from-zinc-600 dark:to-zinc-400 xl:w-36">
                    <input
                      className="relative z-[99999999] w-full rounded-lg bg-white p-2 py-3 dark:bg-black"
                      type="number"
                      value={lots === 0 ? "" : lots}
                      onChange={(e) => {
                        setLots(parseInt(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col items-end overflow-ellipsis font-semibold xl:w-36 xl:gap-1">
                    <p className="w-full text-nowrap rounded-lg text-[10px]">
                      Lot Size:{" "}
                      {selectedSymbol ? symbols[selectedSymbol].lot : 0}
                    </p>

                    <p className="text-nowrapp-1 w-full overflow-ellipsis text-[10px]">
                      Net Qty.:{" "}
                      {selectedSymbol && lots > 0
                        ? lots * symbols[selectedSymbol].lot
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-x-5 gap-y-5 xl:flex-row xl:items-end xl:gap-x-2">
              {product === "options" && (
                <div className="flex flex-col gap-1 max-xl:hidden max-xl:w-1/2 xl:w-60 2xl:w-72">
                  <p className="w-fit font-semibold text-gray-500">
                    Option Type
                  </p>
                  <div className="flex h-fit cursor-pointer justify-between rounded-full border-2 border-[#f0f0f0] bg-[#f0f0f0] xl:w-40">
                    <label
                      className={`w-1/2 rounded-full border-2 p-2 text-center font-semibold transition-all duration-150 ${cepe === "CE" ? "border-[#005b6c] bg-[#005b6c] text-white" : "border-[#f0f0f0] bg-[#f0f0f0]"}`}
                      htmlFor="ce"
                    >
                      CE
                    </label>
                    <label
                      className={`w-1/2 rounded-full border-2 border-transparent p-2 text-center font-semibold transition-all duration-150 ${cepe === "PE" ? "border-[#005b6c] bg-[#005b6c] text-white" : "border-[#f0f0f0] bg-[#f0f0f0]"}`}
                      htmlFor="pe"
                    >
                      PE
                    </label>
                  </div>
                  <div className="hidden">
                    <input
                      onChange={() => {
                        setcepe("CE");
                      }}
                      value={"CE"}
                      type="radio"
                      id="ce"
                      name="cepe"
                    />
                  </div>
                  <div className="hidden">
                    <input
                      onChange={(_) => {
                        setcepe("PE");
                      }}
                      value={"PE"}
                      type="radio"
                      id="pe"
                      name="cepe"
                    />
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col justify-end gap-1 xl:hidden xl:w-60 2xl:w-72">
                <span className="flex w-full items-start justify-between xl:items-end">
                  <p className="w-fit font-semibold text-gray-500">
                    No. Of Lots
                  </p>
                </span>
                <div className="relative flex h-full w-full flex-row items-center justify-between gap-x-3 rounded-lg dark:text-black">
                  <div className="w-1/2 rounded-lg border border-[#B3B3B3] p-[2px] dark:from-zinc-600 dark:to-zinc-400 xl:w-36">
                    <input
                      className="relative z-[99999999] w-full rounded-lg bg-white p-2 py-3 dark:bg-black"
                      type="number"
                      value={lots === 0 ? "" : lots}
                      onChange={(e) => {
                        setLots(parseInt(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col items-end overflow-ellipsis font-semibold xl:w-36 xl:gap-1">
                    <p className="w-full text-nowrap rounded-lg text-[10px]">
                      Lot Size:{" "}
                      {selectedSymbol ? symbols[selectedSymbol].lot : 0}
                    </p>

                    <p className="text-nowrapp-1 w-full overflow-ellipsis text-[10px]">
                      Net Qty.:{" "}
                      {selectedSymbol && lots > 0
                        ? lots * symbols[selectedSymbol].lot
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-x-5 max-xl:w-1/2 xl:w-60 xl:items-end xl:gap-x-10 2xl:w-72">
                <button
                  disabled={selectedSymbol === undefined || lots === 0}
                  onClick={() => {
                    setType("buy");
                  }}
                  className={`w-1/2 rounded-sm border border-green-500 p-2 text-center font-semibold text-green-500 transition-all duration-150 disabled:border-gray-500 disabled:text-gray-500`}
                  htmlFor="buy"
                >
                  Buy
                </button>
                <button
                  disabled={selectedSymbol === undefined || lots === 0}
                  onClick={() => {
                    setType("sell");
                  }}
                  className={`w-1/2 rounded-sm border border-red-400 p-2 text-center font-semibold text-red-400 transition-all duration-150 disabled:border-gray-500 disabled:text-gray-500`}
                  htmlFor="sell"
                >
                  Sell
                </button>
              </div>
              <div className="hidden">
                <input
                  onChange={() => {
                    setType("buy");
                  }}
                  value={"buy"}
                  type="radio"
                  id="buy"
                  name="type"
                />
              </div>
              <div className="hidden">
                <input
                  onChange={(_) => {
                    setType("sell");
                  }}
                  value={"sell"}
                  type="radio"
                  id="sell"
                  name="type"
                />
                <div className="hidden w-full flex-row items-center justify-start gap-3 xl:flex-col-reverse xl:items-end">
                  <button
                    disabled={selectedSymbol === undefined || lots === 0}
                    onClick={() => {
                      addItem();
                    }}
                    className="disabled:cursor-no w-20 rounded-lg border-2 border-[#19AC63] px-3 py-2 text-[#19AC63] disabled:border-gray-500 disabled:text-gray-500"
                  >
                    Add
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPrice(0);
                      setLots(1);
                      setSelectedSymbol(undefined);
                      setQuery("");
                    }}
                    className="disabled:cursor-no w-20 rounded-lg border-2 border-red-500 px-3 py-2 text-red-500 disabled:bg-gray-500"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-auto flex w-full flex-row items-end gap-x-3 xl:w-full">
              <div className="flex w-full flex-col gap-1 rounded-xl border-2 border-gray-200 xl:w-full xl:gap-3">
                <div className="grid grid-cols-1 gap-1 text-nowrap px-5 py-1.5 xl:grid-cols-3 xl:gap-4 xl:py-3">
                  <div className="w-full flex-row rounded-xl px-6 py-3 dark:bg-zinc-800 max-xl:flex max-xl:items-center max-xl:justify-between xl:py-6 xl:text-center">
                    <div className="font-medium text-[#1b1b1b]">
                      Span Margin
                    </div>
                    <div className="font-semibold text-[#006F3F]">
                      {formatter.format(totals.span)}
                    </div>
                  </div>
                  <div className="w-full flex-row rounded-xl px-6 py-3 dark:bg-zinc-800 max-xl:flex max-xl:items-center max-xl:justify-between xl:py-6 xl:text-center">
                    <div className="font-medium text-[#1b1b1b]">
                      Exposure Margin
                    </div>
                    <div className="font-semibold text-[#006F3F]">
                      {formatter.format(totals.exposure)}
                    </div>
                  </div>
                  <div className="w-full flex-row rounded-xl px-6 py-3 dark:bg-zinc-800 max-xl:flex max-xl:items-center max-xl:justify-between xl:py-6 xl:text-center">
                    <div className="font-medium text-[#1b1b1b]">
                      Total Margin
                    </div>
                    <div className="font-semibold text-[#006F3F]">
                      {formatter.format(totals.multi)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#a3dec1] p-3 px-10 text-[#09552F] max-xl:hidden">
                  <div className="pl-1 text-lg font-semibold">
                    Margin Benefit
                  </div>
                  <div className="pr-1 text-lg font-semibold">
                    {formatter.format(totals.benefit)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="rounded-lg bg-white p-1 dark:bg-zinc-800 dark:text-white max-xl:hidden"
              >
                <img
                  src="/reset.png"
                  alt=""
                  className="h-[1.2em] dark:invert"
                />
              </button>
            </div>
          </div>
          <div className="hidden h-full flex-col justify-between rounded-l-3xl xl:flex">
            <table className="relative flex flex-row items-stretch justify-start self-stretch rounded-3xl border border-b border-l border-t border-[#B3B3B3] bg-white p-[2px] dark:bg-black dark:from-zinc-600 dark:to-zinc-400">
              <thead className="sticky left-0 top-0 z-30 flex flex-col rounded-l-3xl text-[#8b8b8b] dark:text-white/80">
                <tr className="relative flex flex-col gap-y-0.5 rounded-l-3xl border-r-2 border-r-gray-200 font-normal">
                  <th className="min-w-10 rounded-tl-3xl p-[2px] font-normal 2xl:min-w-40">
                    <p className="rounded-tl-2xl bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                      Action
                    </p>
                  </th>
                  <th className="2xk:min-w-40 min-w-10 p-[2px] font-normal">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                      Exchange
                    </p>
                  </th>
                  <th className="min-w-10 p-[2px] font-normal 2xl:min-w-40">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">Symbol</p>
                  </th>
                  <th className="min-w-10 p-[2px] font-normal 2xl:min-w-40">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">Strike</p>
                  </th>
                  <th className="min-w-10 p-[2px] font-normal 2xl:min-w-40">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">Lots</p>
                  </th>
                  <th className="min-w-10 p-[2px] font-normal 2xl:min-w-40">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                      Instrument
                    </p>
                  </th>
                  <th className="min-w-10 p-[2px] font-normal 2xl:min-w-40">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">Span</p>
                  </th>
                  <th className="min-w-10 p-[2px] font-normal 2xl:min-w-40">
                    <p className="bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                      Exposure
                    </p>
                  </th>

                  <th className="min-w-10 rounded-bl-3xl p-[2px] font-normal 2xl:min-w-40">
                    <p className="rounded-bl-2xl bg-[#f6f6f6] py-3 dark:bg-zinc-800">
                      Total
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody className="flex h-full min-h-full w-full flex-row overflow-x-auto rounded-r-3xl bg-white dark:bg-black">
                {marginData.map((x) => (
                  <tr
                    key={x.exc_id}
                    className="flex h-full min-h-full flex-col border-r border-r-gray-200"
                  >
                    <td className="grid place-items-center border-b-2 border-b-gray-200 py-[14px]">
                      <button
                        onClick={() => {
                          setAdded((a) =>
                            a.filter((y) => y.exc_id !== x.exc_id),
                          );
                        }}
                        className="w-5 border-none"
                      >
                        <img
                          src="/delete.svg"
                          className="h-[1.5em] invert dark:invert-0"
                          alt=""
                        />
                      </button>
                    </td>
                    <td className="text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center 2xl:px-8">
                      <p>{x.exch === "NFO" ? "NSE" : x.exch}</p>
                    </td>
                    <td className="text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center 2xl:px-8">
                      {x.dispSymbol.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td
                      className={`text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center 2xl:px-8 ${Number(x.netqty) > 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
                    >
                      {x.instname.slice(0, 3) === "OPT"
                        ? `${x.dispSymbol.split(" ")[2].slice(0, -2)} ${x.dispSymbol.split(" ")[2].slice(-2)}`
                        : "N/A"}
                    </td>
                    <td
                      className={`text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center font-bold 2xl:px-8`}
                    >
                      {Number(x.netqty) / x.lotSize}
                    </td>
                    <td className="text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center 2xl:px-8">
                      {x.instname.slice(0, 3) === "FUT" ? "Futures" : "Options"}
                    </td>
                    <td className="text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center 2xl:px-8">
                      {formatter.format(Number(x.span))}
                    </td>
                    <td className="text-nowrap border-b-2 border-b-gray-200 p-[14px] px-3 text-center 2xl:px-8">
                      {formatter.format(Number(x.expo))}
                    </td>
                    <td className="text-nowrap p-[14px] px-3 text-center 2xl:px-8">
                      {formatter.format(Number(x.span) + Number(x.expo))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="hidden flex-row items-end justify-end pt-5 xl:flex">
              <p className="w-full rounded-xl bg-[#a3dec1] p-3 text-center text-lg font-semibold text-[#09552F]">
                Total Margin: &nbsp; {formatter.format(totals.total)}
              </p>
            </div>
          </div>

          <div className="xl:hidden">
            {marginData.length > 0 && (
              <div className="px-5 pt-4 font-bold text-gray-400">
                Your Orders
              </div>
            )}
            <div className="space-y-4 pt-5">
              {marginData.map((x) => (
                <div
                  key={x.exc_id}
                  className="flex flex-row items-center justify-between gap-x-2 rounded-md border border-black/50 px-7 py-4 text-xs"
                >
                  <div className="">
                    <h4 className="font-bold">{x.dispSymbol}</h4>
                    <p>
                      {x.exch === "NFO" ? "NSE" : x.exch}{" "}
                      {x.dispSymbol.includes("FUT")
                        ? "FUT"
                        : x.dispSymbol.includes("CE") ||
                            x.dispSymbol.includes("PE")
                          ? "F&O"
                          : "EQ"}
                    </p>
                    <p className="pt-2">
                      {formatter.format(Number(x.span) + Number(x.expo))}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="">
                      <p>{x.dispQty} Qty</p>
                    </div>
                    <div className="">
                      {x.netqty > 0 ? (
                        <div className="bg-green-500 px-2 font-bold text-white">
                          B
                        </div>
                      ) : (
                        <div className="bg-red-500 px-2 font-bold text-white">
                          S
                        </div>
                      )}
                    </div>
                    <div className="">
                      <button
                        onClick={() => {
                          setAdded((a) =>
                            a.filter((y) => y.exc_id !== x.exc_id),
                          );
                        }}
                        className="w-5 border-none"
                      >
                        <img
                          src="/delete.svg"
                          className="h-[1.5em] invert dark:invert-0"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1 flex w-full flex-row items-end justify-between rounded-xl p-3 px-4 py-4 text-lg font-semibold xl:bg-[#a3dec1]">
              <p className="">Total Margin:</p>
              <p className="text-[#09552F]">{formatter.format(totals.total)}</p>
            </div>
          </div>
        </div>
      </div>

      <FadeInWrapper>
        <div className="m-auto mt-10 max-w-7xl px-4 md:px-6">
          <h4 className="mb-8 text-center font-satoshi text-2xl font-bold text-black md:text-4xl">
            Frequently Asked Questions
          </h4>

          <div className="flex w-full flex-col divide-y divide-gray-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="w-full">
                  <button
                    onClick={() => toggle(idx)}
                    className={`flex w-full flex-col items-start justify-between text-left transition-all duration-300 ${
                      isOpen ? "px-5 py-5" : "border-gray-200 px-5 py-5"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <h3
                        className={`text-base font-medium ${
                          isOpen ? "text-black" : "text-gray-900"
                        }`}
                      >
                        {faq.title}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 align-middle transition-transform duration-300 ${
                          isOpen ? "-rotate-180" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div
                      className="grid w-full transition-[grid-template-rows] duration-700 ease-in-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`pt-4 font-inter text-sm leading-relaxed text-black/80 transition-opacity duration-300 ease-in-out ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <ReactMarkdown
                            components={{
                              ol: ({ node, ...props }) => (
                                <ol className="list-disc pl-6" {...props} />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="mb-1" {...props} />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong
                                  className="font-semibold text-black"
                                  {...props}
                                />
                              ),
                              a: ({ node, ...props }) => (
                                <a
                                  {...props}
                                  className="text-[#005B6C] underline"
                                />
                              ),
                            }}
                          >
                            {faq.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInWrapper>

      <div className="sticky bottom-5 mx-5 mt-10 rounded-2xl border border-black bg-white px-5 pb-5 pt-5 font-satoshi xl:hidden xl:pb-5">
        <div className="hidden flex-row justify-between gap-x-5 pb-4 text-sm">
          <p>Span Margin : {formatter.format(totals.span)}</p>
          <p>|</p>
          <p className="">
            Exposure Margin : {formatter.format(totals.exposure)}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between py-2 text-lg">
          <h4 className="font-semibold">Margin Benefit </h4>
          <h4>
            <span className="font-semibold text-green-600">
              {formatter.format(totals.benefit)}
            </span>
          </h4>
          <a
            href={"https://ekyc.tradejini.com/#/onboarding"}
            className="relative z-40 hidden text-nowrap rounded-full bg-[#19AC63] px-3 py-3 font-satoshi text-sm font-bold text-white"
          >
            Open Account
          </a>
        </div>
      </div>
    </div>
  );
}
