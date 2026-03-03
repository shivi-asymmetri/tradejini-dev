"use client";
import Marquee from "react-fast-marquee";
// Card item with shadow
function CardWithShadow({
  icon,
  text,
  index,
}: {
  icon: string;
  text: string;
  index: number;
}) {
  return (
    <div className="flex flex-shrink-0 cursor-pointer flex-row items-center gap-x-2 overflow-auto rounded-md bg-[#0C4E5B] px-2 py-2 font-bold text-white shadow-xl shadow-black/20 max-lg:mx-1 max-md:mx-3 lg:px-5">
      <div className="">
        <img src={icon} alt={text} className="max-md:w-3 md:w-4" />
      </div>
      <p className="font-manrope text-xs font-semibold md:text-sm">{text}</p>
    </div>
  );
}

export default function BlueBarSection() {
  const icons = [
    { icon: "/blueBar/stock.svg", text: "Stocks" },
    { icon: "/blueBar/option.svg", text: "Options" },
    { icon: "/blueBar/futures.svg", text: "Futures" },
    { icon: "/blueBar/commodities.svg", text: "Commodity" },
    { icon: "/blueBar/Mutual_funds.svg", text: "Mutual Funds" },
    { icon: "/blueBar/ETF.svg", text: "ETF" },
    { icon: "/blueBar/bond.svg", text: "Bonds" },
    { icon: "/blueBar/ipo.svg", text: "IPO" },
  ];

  return (
    <div className="bg-[#268896] px-5 pb-16 pt-5">
      {/* Mobile view with Marquee */}
      <Marquee className="lg:invisible lg:hidden lg:h-0 lg:opacity-0">
        {icons.map(({ icon, text }, idx) => (
          <CardWithShadow index={idx} key={idx} icon={icon} text={text} />
        ))}
      </Marquee>

      {/* Desktop view with center-aligned tiles in a single row */}
      <div className="max-w-screen flex justify-center gap-x-5 overflow-hidden max-lg:hidden lg:flex lg:px-[1%] xl:px-[5%] 2xl:px-[15%]">
        {icons.map(({ icon, text }, idx) => (
          <CardWithShadow key={idx} index={idx} icon={icon} text={text} />
        ))}
      </div>
    </div>
  );
}
