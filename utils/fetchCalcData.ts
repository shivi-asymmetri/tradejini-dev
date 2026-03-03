import { EquityFutureData } from "@/app/(home)/calculators/margin-calculator/(types)/EquityFutureData";

export async function getCalc(type: string) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/1HLINR2o8wOxYCflStOJqDnPCZorM02oxfInzd7VNj60/values/Equity_Features!A2:Z?key=AIzaSyC4HqoJdFT7E8FwliXxDdEOFX83GmtAYT0`,
  );
  const data = await res.json();
  let final: EquityFutureData[] = [];
  if (data) {
    data.values.forEach((f: string[]) => {
      final.push({
        symbol: f[1] as string,
        expiry: f[2] as string,
        lotSize: parseFloat(f[3]),
        span: parseFloat(f[4]),
        exposure: parseFloat(f[5]),
        total: parseFloat(f[6]),
        totPerc: parseFloat(f[7]),
      });
    });
  }
}
