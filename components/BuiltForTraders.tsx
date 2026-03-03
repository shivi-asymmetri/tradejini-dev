import Investors from "./Investors";
import OptionTraders from "./OptionTraders";
import Scalpers from "./Scalpers";

export default function BuiltForTraders() {
  return (
    <>
      <div className="px-5 py-10 md:px-10 md:py-20 lg:px-20 xl:px-32">
        <h3 className="py-2 text-center text-xl font-bold md:text-3xl">
          Built for <span className="text-[#005B6C]">Every Trader</span>
        </h3>
        <p className="my-5 text-center text-sm text-[#000000]/50 md:my-10 md:text-xl">
          We&apos;re on a mission to provide advanced trading tools and
          experiences for every kind of&nbsp;
          <br className="max-md:hidden" />
          trader. Whether you&apos;re a professional options trader, a
          high-speed scalper, or a long-
          <br className="max-md:hidden" />
          term investor, we have the features that matter to you!
        </p>
        <div className="space-y-5 py-10 md:space-y-20">
          <OptionTraders />
          <Scalpers />
          <Investors />
        </div>

        {/* <FadeInWrapper></FadeInWrapper> */}
      </div>
    </>
  );
}
