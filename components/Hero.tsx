import Image from "next/image";
import { GridBeam } from "./GridBeam";
// import "react-phone-input-2/lib/style.css";
import dynamic from "next/dynamic";
// import Form from "./Form";
const Form = dynamic(() => import("./Form"), {
  loading: () => null,
  // ssr: false,
});
export default function Hero() {
  return (
    <section className="w-full bg-black bg-grid-white/10">
      <GridBeam className="relative flex flex-col items-stretch overflow-hidden pt-16 md:max-h-[100vh] md:flex-row">
        <div className="flex flex-col justify-center space-y-0 px-5 text-white md:w-[65%] md:space-y-8 md:p-8 md:pl-20 xl:px-32">
          <div className="text-left text-4xl font-bold max-md:mb-4 max-md:text-center max-md:text-3xl max-md:font-medium md:text-5xl">
            <span>Unlock</span>{" "}
            <span className="text-themeGreen">Elite Trading</span>
            <br />
            Performance
          </div>
          <div>
            {/* Desktop Image */}
            <Image
              loading="eager"
              width={240}
              height={240}
              className="hidden w-60 md:block"
              src="/customers2.webp"
              sizes="240px"
              quality={80}
              alt="Customer testimonials"
            />
            {/* Mobile Image - smaller optimized version */}
            <Image
              loading="eager"
              width={180}
              height={180}
              className="mx-auto my-6 w-44 md:hidden"
              src="/customers2.webp"
              sizes="180px"
              quality={75}
              alt="Customer testimonials"
            />
          </div>

        
          <p className="font-bold text-white/60 max-md:mt-6 max-md:text-center">
            Open a free <span className="text-[#239AB8]">Demat</span> account in
            minutes.
          </p>

          <div className="grid place-items-center pt-3 md:hidden">
            <a
              href={`https://cp.tradejini.com/Ox1Ux9?`}
              className="specialBg w-fit rounded-[20px] px-6 py-4 text-center font-bold text-white"
            >
              Start Now!
            </a>
          </div>

          <div className="relative pt-4 md:hidden">
            <Image
              priority
              loading="eager"
              fetchPriority="high"
              alt="Mobile devices showcase"
              width={400}
              height={400}
              className="z-[99] px-14 pb-10"
              src="/devicesMobile.webp"
              sizes="(max-width: 768px) 400px, 0px"
              quality={80}
            />
            <div className="absolute bottom-0 left-0 right-0 z-[100] h-2/3 w-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          </div>
          <Form></Form>
          <div className="flex flex-col font-satoshi max-md:items-center max-md:gap-3 md:flex-row md:gap-x-6">
            <div className="h-fit w-64 rounded-xl border border-white/50 px-6 py-3 max-md:w-72">
              <h4 className="bg-gradient-to-b from-[#38B990] to-[#2C90B2] bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                Fast Execution
              </h4>
              <p className="text-white max-md:text-sm">
                Built on institutional-grade infrastructure
              </p>
            </div>
            <div className="w-64 rounded-xl border border-white/50 px-6 py-3 max-md:w-72">
              <h4 className="bg-gradient-to-b from-[#38B990] to-[#2C90B2] bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                Pro-Level
              </h4>
              <p className="text-white max-md:text-sm">
                Support &amp; tools designed by traders, for traders
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex items-start pt-16 md:w-1/2">
          <Image
            loading="eager"
            fetchPriority="high"
            alt="devices"
            width={543}
            height={543}
            className="z-[99] -translate-x-16 scale-125 max-md:hidden"
            src={"/hero-tab-mini.webp"}
            sizes="(max-width: 768px) 0px, 543px"
            quality={80}
            priority
          ></Image>
        </div>
      </GridBeam>
    </section>
  );
}
