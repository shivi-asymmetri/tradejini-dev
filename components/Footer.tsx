"use client";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ChevronDown, Facebook, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { smoothScrollToTop } from "@/utils/smoothScroll";

export default function Footer() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [linkopen, setLinkopen] = useState(false);
  const isDecoders = path?.startsWith("/decoders");
  const [decodersDark, setDecodersDark] = useState(false);

  // Handle Press Coverage click - navigate to page and scroll to top
  const handlePressCoverageClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // If already on press-coverage page, just scroll to top
    if (path === "/press-coverage") {
      await smoothScrollToTop({ duration: 800 });
      // Trigger a custom event to reset the section in Articles component
      window.dispatchEvent(new CustomEvent("resetToLatestArticles"));
    } else {
      // Navigate to press coverage page
      router.push("/press-coverage");
    }
  };

  useEffect(() => {
    if (!isDecoders) return;

    // 1) hydrate from the real DOM state
    const body = typeof document !== "undefined" ? document.body : null;
    const compute = () => setDecodersDark(!!body?.classList.contains("dark"));
    compute();

    // 2) keep in sync if the theme class changes on <body>
    const obs = new MutationObserver(() => compute());
    if (body) {
      obs.observe(body, { attributes: true, attributeFilter: ["class"] });
    }

    // 3) also respond to storage changes (another tab toggled)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "decoder-theme") compute();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      obs.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, [isDecoders]);
  return (
    <footer
      className={`footer relative z-[99] px-5 pb-20 pt-20 md:px-10 md:pt-40 lg:px-20 xl:px-32 ${
        isDecoders && decodersDark
          ? "decoder-footer-bg"
          : "bg-gradient-to-b from-[#0C4E5B] via-black to-black"
      }`}
    >
      {path !== "/" && (
        <div className="flex flex-col-reverse justify-between font-poppins md:flex-row">
          <div className="mt-12 max-md:text-center md:mt-0 md:w-[40%]">
            <div className="relative -top-14 w-fit flex-col items-center justify-center max-md:flex max-md:w-full">
              <h3 className="text-2xl font-bold text-white md:text-4xl">
                <span className="text-[#00FEAF]">Trading</span> Made Simple
              </h3>
              <p className="mt-3 text-sm text-white md:text-base">
                Open your <span className="text-[#00FEAF]">Demat Account</span>{" "}
                now!
              </p>
              <div className="mt-5 grid place-items-start">
                <a
                  href="https://cp.tradejini.com/Ox1Ux9"
                  className="specialBg w-fit rounded-[20px] px-6 py-4 text-center font-bold text-white"
                >
                  Start Now!
                </a>
              </div>
            </div>
          </div>

          {/* Image block; keep position the same. Class stays to let globals.css color it in dark */}
          <div className="decoder-footer-bg relative h-[20vh] md:h-[30vh] md:w-1/2">
            <img
              src="/footer-image2.svg"
              className="absolute right-0 top-[-60px] hidden h-[50vh] w-auto -translate-y-1/2 object-contain md:block"
              alt="Footer Image Desktop"
            />
            <img
              src="/footer-image4.svg"
              className="absolute right-0 top-[-60px] block h-[50vh] w-auto -translate-y-1/2 object-contain md:hidden"
              alt="Footer Image Mobile"
            />
          </div>
        </div>
      )}
      <div className="mt-5 flex flex-col gap-y-5 md:mt-10 md:flex-row">
        <div className="max-md:grid max-md:place-items-center md:w-1/4">
          <img
            src="/logo_white.svg"
            className="w-32 md:w-52"
            alt="logo_white"
          />
          <p className="my-4 text-white md:mt-10">Join us on</p>
          <a
            href="https://www.whatsapp.com/channel/0029VaylTGWADTOHkEncTU14"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/tc.svg"
              alt="tradejini_community"
              className="w-40 md:w-48"
            />
          </a>
          <p className="mt-8 text-white">Follow us on</p>
          <div className="mt-3 flex flex-row items-center gap-x-[5px] text-white *:h-8 *:w-8 *:rounded-full *:border *:border-white *:p-2 max-md:justify-center">
            <a
              href="https://www.instagram.com/tradejini_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <InstagramLogoIcon />
            </a>
            <a
              href="https://www.facebook.com/tradejini/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Facebook className="-translate-x-1 -translate-y-1 transform" />
            </a>
            <a
              href="https://twitter.com/tradejini?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <TwitterLogoIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/tradejini/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <LinkedInLogoIcon />
            </a>
            <a
              href="https://www.youtube.com/user/tradejini"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <YoutubeIcon className="-translate-x-1 -translate-y-1 transform" />
            </a>
          </div>
        </div>

        <div className="md:gap-x-15 grid w-full grid-cols-1 gap-5 md:ml-12 md:grid-cols-5 md:justify-between md:gap-y-10">
          <div className="flex w-full flex-col gap-x-4 gap-y-5">
            <div className="">
              <h4 className="font-bold text-white md:text-lg">Company</h4>
            </div>
            <ul className="flex flex-row flex-wrap gap-3 text-xs md:flex-col">
              <li className="font-bold text-white/50">
                <Link href="/about-us">About Us</Link>
              </li>

              <li className="font-bold text-white/50">
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/careers">Careers</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/contactus">Contact Us</Link>
              </li>
              <li className="relative font-bold text-white/50">
                <button
                  onClick={() => setLinkopen((prev) => !prev)}
                  className="flex w-full items-center justify-start"
                >
                  Products
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${linkopen ? "rotate-180" : ""}`}
                  />
                </button>
                {linkopen && (
                  <ul className="mt-3 flex flex-col gap-2 text-xs italic">
                    <li className="font-bold text-white/50">
                      <Link
                        href="http://cp.tradejini.com/profile"
                        target="_balnk"
                      >
                        CubePlus Web
                      </Link>
                    </li>
                    <li className="font-bold text-white/50">
                      <Link
                        href="http://cp.tradejini.com/profile"
                        target="_blank"
                      >
                        CubePlus App
                      </Link>
                    </li>
                    <li className="font-bold text-white/50">
                      <Link
                        href="https://app.nxtoption.com/auth/login"
                        target="_blank"
                      >
                        NxtOption
                      </Link>
                    </li>
                    <li className="font-bold text-white/50">
                      <Link
                        href="http://cp.tradejini.com/mutual-funds?tab=dashboard"
                        target="_blank"
                      >
                        Mutual Fund Jini
                      </Link>
                    </li>
                    <li className="font-bold text-white/50">
                      <Link
                        href="https://api.tradejini.com/api-doc/#overview"
                        target="_blank"
                      >
                        CubePlus API
                      </Link>
                    </li>
                    <li className="font-bold text-white/50">
                      <Link
                        href="http://cp.tradejini.com/orders?tab=ipo"
                        target="_blank"
                      >
                        IPO Invest
                      </Link>
                    </li>
                    <li className="font-bold text-white/50">
                      <Link
                        href="http://cp.tradejini.com/profile"
                        target="_blank"
                      >
                        Hive - Backoffice
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* <li className="font-bold text-white/50">Careers</li> */}
            </ul>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-5">
            <div className="">
              <h4 className="font-bold text-white md:text-lg">Support</h4>
            </div>
            <ul className="flex flex-row flex-wrap gap-3 text-xs md:flex-col">
              <li className="font-bold text-white/50">
                <Link href="/support">FAQ - Knowledge Base</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="https://wa.me/6363809751" target="_blank">
                  Chat with us
                </Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/fundTransfer">Fund Transfer</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/non-cash-stocks">Margin Pledge List</Link>
              </li>

              {/* <li className="font-bold text-white/50">Partners</li> */}
              {/* <li className="font-bold text-white/50">Referral</li> */}
            </ul>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-5">
            <div className="">
              <h4 className="font-bold text-white md:text-lg">Tools</h4>
            </div>
            <ul className="flex flex-row flex-wrap gap-3 text-xs md:flex-col">
              <li className="font-bold text-white/50">
                <Link href="/ipo">IPO Invest</Link>
              </li>

              <li className="font-bold text-white/50">
                <Link href="/api">Algo Traders</Link>
              </li>

              <li className="font-bold text-white/50">
                <Link href="/calculators">Calculators</Link>
              </li>

              {/* <li className="font-bold text-white/50">Referral Calculator</li> */}

              <li className="font-bold text-white/50">
                <Link
                  href="https://whatsapp.com/channel/0029VaylTGWADTOHkEncTU14"
                  target="_blank"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex w-full flex-col gap-x-4 gap-y-5">
            <div className="">
              <h4 className="font-bold text-white md:text-lg">Learn</h4>
            </div>
            <ul className="flex flex-row flex-wrap gap-3 text-xs md:flex-col">
              <li className="font-bold text-white/50">
                <Link href="/blogs">Jiniversity</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/finance-kickstarter">Finance Kickstarter</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/decoders">Business Decoder</Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/chart-speaks">Chart Speaks</Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col gap-x-4 gap-y-5">
            <div className="">
              <h4 className="font-bold text-white md:text-lg">Quick Links</h4>
            </div>
            <ul className="flex flex-row flex-wrap gap-3 text-xs md:flex-col">
              <li className="font-bold text-white/50">
                <Link href="/authorised-partner">Authorised Person</Link>
              </li>

              <li className="font-bold text-white/50">
                <Link href="/code-of-conduct-for-authorised-partners">
                  AP - Code of Conduct
                </Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/downloads">Download Forms</Link>
              </li>
              {/* <li className="font-bold text-white/50">
                <Link href="">
                  Partner Dashbaord
                </Link>
              </li> */}
              {/* <li className="font-bold text-white/50">
                <Link href="/authorised-partner">Authorised Partner</Link>
              </li> */}
              {/* <li className="font-bold text-white/50">Software</li> */}
              {/* <li className="font-bold text-white/50">Charges</li> */}
              <li className="font-bold text-white/50">
                <Link href="/holiday-page">Holiday Calendar</Link>
              </li>

              <li className="font-bold text-white/50">
                <Link href="/press-coverage" onClick={handlePressCoverageClick}>
                  Press Coverage
                </Link>
              </li>
              <li className="font-bold text-white/50">
                <Link href="/press-coverage#podcasts">Podcasts</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <div className="flex flex-row items-center gap-x-2">
          <img
            src="/dil.svg"
            className="max-md:h-[2em] max-md:text-sm"
            alt="like_tradejini"
          />
          <p className="font-medium text-white/70 max-md:text-sm">
            Crafted with care
            <br />
            For Indians to invest and trade smartly.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <a
            target="_blank"
            href="https://apps.apple.com/in/app/tradejini-cubeplus-fno-stocks/id6445836933"
            className="mx-3"
          >
            <img
              src="/astore.png"
              className="h-12 object-contain md:h-12"
              alt="applestore"
            />
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1"
          >
            <img
              src="/gplay.webp"
              className="h-12 object-contain md:h-12"
              alt="googleplay"
            />
          </a>
        </div>
      </div>

      <button
        onClick={() => setOpen((old) => !old)}
        className="mt-16 w-full border-b border-b-white/60 py-3 text-left font-satoshi font-bold"
      >
        <div className="flex flex-row items-center justify-between">
          <h4 className="text-[14px] font-black text-white md:text-lg">
            Attention Investors & Disclaimer
          </h4>

          <ChevronDown
            className={`${open && "-rotate-180"} text-white transition-transform duration-500 ease-in-out`}
          />
        </div>
      </button>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: open ? "fit-content" : 0 }}
        className="overflow-hidden"
      >
        <br />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-500 text-[10px] text-white/50">
            <thead>
              <tr className="text- border-gray-500">
                <th className="border border-gray-500 p-1">
                  Stock Broker Name
                </th>
                <th className="border border-gray-500 p-1">
                  Registration Number
                </th>
                <th className="border border-gray-500 p-1">
                  Registered Address
                </th>
                <th className="border border-gray-500 p-1">
                  Corporate Address
                </th>
                <th className="border border-gray-500 p-1">
                  Branch Address (if any)
                </th>
                <th className="border border-gray-500 p-1">Contact Number</th>
                <th className="border border-gray-500 p-1">Email Id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="whitespace-nowrap border border-gray-500 p-1">
                  TRADEJINI <br />
                  Financial Services <br />
                  Pvt Ltd
                </td>
                <td className="border border-gray-500 p-1">
                  SEBI REGISTRATION NO.: INZ000160938
                  <br />
                  (NSE: 14655 CM-FO-CD, BSE: 6517 CM-FO-CD, MCX: 46430 CO, MSEI:
                  85000 CM-FO-CD)
                  <br />
                  CDSL Depository Participant: IN-DP-470-2020
                  <br />
                  Mutual Fund ARN: 87156
                </td>
                <td className="border border-gray-500 p-1">
                  Suvas, No. 4, Shankarmutt Road, 3rd Cross, Shankarpuram,
                  Bangalore – 560004
                </td>
                <td className="border border-gray-500 p-1">
                  Vasavi Square, 2nd Floor, No. 75/757, 10th Main Road, 4th
                  Block, Jayanagar, Bangalore – 560011
                </td>
                <td className="border border-gray-500 p-1">-</td>
                <td className="whitespace-nowrap border border-gray-500 p-1">
                  {/* <a
                    href="tel:+91-80-40204020"
                    className="underline decoration-gray-500"
                  >
                    +91-80-40204020
                  </a>
                  <br /> */}
                  <a
                    href="tel:+91-80-35735608"
                    className="underline decoration-gray-500"
                  >
                    080-35735608
                  </a>
                </td>
                <td className="whitespace-nowrap border border-gray-500 p-1">
                  <a
                    href="mailto:help@tradejini.com"
                    className="underline decoration-gray-500"
                  >
                    help@tradejini.com
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-5 flex flex-row gap-x-2 md:gap-x-5">
          {[
            { name: "BSE", url: "https://www.bseindia.com/" },
            {
              name: "NSE",
              url: "https://www.nseindia.com/",
            },
            { name: "MSEI", url: "https://www.msei.in/" },
            { name: "MCX", url: "https://www.mcxindia.com/" },
            {
              name: "CDSL",
              url: "https://www.cdslindia.com/",
            },
            {
              name: "India INX",
              url: "https://www.clientam.com/Universal/servlet/OpenAccount.IBrokerGuestLogin?partnerID=INXGALITE&invitedBy=&template=Tradejini_plan1&invitation_id=83160548",
            },
          ].map(({ name, url }, idx) => (
            <a
              href={url}
              target="_blank"
              className="text-nowrap rounded-xl bg-[#118b64] px-2 py-1 text-[9px] font-bold text-white md:px-4 md:py-3 md:text-base"
              key={idx}
            >
              {name}
            </a>
          ))}
        </div>
        <div className="my-5 flex flex-row flex-wrap items-center gap-x-5 text-[8px] font-bold text-white/50 md:my-10 md:text-xs">
          <div className="md:divide-x-black/50 flex flex-row flex-wrap items-center gap-x-3 md:gap-x-5 md:gap-y-5 md:divide-x">
            <Link
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FPolicy%20and%20Procedures%2Fpolicy_and_procedures.pdf?alt=media&token=b91e8634-855f-40ec-b3f5-508aebf6302a"
              className="underline"
            >
              Policy and Procedures
            </Link>
            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FPMLA%2FPMLA_POLICY.pdf?alt=media&token=ca041344-1220-463e-ab3d-7a93bc06f86a"
              className="underline md:pl-5"
            >
              PMLA
            </a>
            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FData%20Classification%20and%20Protection%2FDATACLASIFICATION_AND_PROTECTION_POLICY-DCP.pdf?alt=media&token=2d2ec6fa-aefd-4822-aeb2-bf8016763c93"
              className="underline md:pl-5"
            >
              Data Classification and Protection
            </a>
            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FSample%20Contract%20Note%2FSample-Contract-Note-1.pdf?alt=media&token=5b02e27b-2e44-442e-8eae-3491ac1b6f46"
              className="underline md:pl-5"
            >
              Sample Contract Note
            </a>
            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FDetails%20of%20Client%20Bank%20Accounts%2FDetails-of-Tradejini-Client-Bank-Accounts.pdf?alt=media&token=db452a23-47bf-4a76-99fe-60312dcabd4e"
              className="underline md:pl-5"
            >
              Details of Client Bank Accounts
            </a>
            <Link href="/downloads#investor-corner" className="pl-5 underline">
              Investor&apos;s Corner
            </Link>
            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FFlow%20For%20Opening%20Account%2FGrievance%20Redressal%20Mechanism.pdf?alt=media&token=4c134d14-838b-42fb-a7b5-968d1e96209c"
              className="underline md:pl-5"
            >
              Grievance Redressal Mechanism
            </a>

            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FFlow%20For%20Opening%20Account%2FFlow%20for%20Opening%20an%20Account%20with%20Tradejini.pdf?alt=media&token=12006e17-d2bd-4590-8f65-f600b110ac15"
              className="underline md:pl-5"
            >
              Flow for Opening an Account with Tradejini
            </a>

            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FFlow%20For%20Opening%20Account%2FSaarthi-2.0-Mobile-App-for-Investors.pdf?alt=media&token=a694cda0-2fdb-4b27-8c92-e015fcdaae6b"
              className="underline md:pl-5"
            >
              Saarthi 2.0 Mobile App for Investors
            </a>

            <a
              target="_blank"
              href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FSOP%20for%20Incapacitated%20investor%2FSOP%20for%20Incapacitated%20investor.pdf?alt=media&token=c5bfc08d-a12a-4c2b-b997-05eb0cfae3e0"
              className="underline md:pl-5"
            >
              SOP for Incapacitated investor
            </a>
          </div>
        </div>
        <p className="text-[8px] font-bold text-white/50 md:text-xs">
          Please ensure you carefully read the Risk Disclosure Documents as
          prescribed by SEBI. For any complaints email at&nbsp;
          <a
            href="mailto:complaints@tradejini.com"
            className="text-blue-500 underline decoration-blue-500 underline-offset-4"
          >
            complaints@tradejini.com
          </a>
        </p>

        <p className="text-[8px] font-bold text-white/50 md:text-xs">
          <br />
          Investments in securities market are subject to market risks, read all
          the related documents carefully before investing. The securities are
          quoted as an example and not as a recommendation.
          <br />
          <br />
          “Prevent Unauthorized Transactions in your trading/demat account
          Update your Mobile Number/Email IDs with your Stock brokers/Depository
          Participant.Receive alerts/information of your transactions on your
          Registered Mobile/Email for all debit and other important transactions
          in your trading/demat account directly from Exchange/CDSL on the same
          day”.
          <br />
          <br />
          “KYC is one time exercise while dealing in securities markets – once
          KYC is done through a SEBI registered intermediary (broker, DP, Mutual
          Fund etc.),you need not undergo the same process again when you
          approach another intermediary.
          <br />
          <br />
          No need to issue cheques by investors while subscribing to IPO. Just
          write the bank account number and sign in the application form to
          authorize your bank to make payment in case of allotment. No worry for
          refund as the money remains in investor’s account.
          <br />
          <br />
          This is to inform you as per Rules, Regulations and Bye-laws of Multi
          Commodity Exchange of India Ltd (MCX),that we do client based trading
          and proprietary trading.
          <br />
          Procedure to file a complaint on&nbsp;
          <a
            href="https://scores.sebi.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline decoration-blue-500"
          >
            SCORES
          </a>
          &nbsp;(Easy & quick). Register on SCORES portal and have the mandatory
          details for filing complaints on SCORES (Name, PAN, Address, Mobile
          Number and E-mail ID). Benefits: Effective Communication and Speedy
          redressal of the grievances.
          <br />
          <br />
          Stock Brokers can accept securities as margin from clients only by way
          of pledge in the depository system w.e.f. September 01, 2020 Update
          your email id and mobile number with your stock broker / depository
          participant and receive OTP directly from depository on your email id
          and/or mobile number to create pledge Check your securities / MF /
          bonds in the consolidated account statement issued by NSDL/CDSL every
          month.
          <br />
          <br />
          Please be informed that we, TRADEJINI Financial Services Pvt. Ltd.,
          are not associated with and have not granted any right/permission to
          use our name, trademark, logo etc. to any third-party platform and/or
          service provider which is directly or indirectly providing any
          reference to the past or expected future return/performance of any
          algorithm and/or trading strategy.
          <br />
          <br />
          Accordingly, any such third-party should not be deemed to be our
          agent, business partner and/or associate in any manner whatsoever.
          <br />
          <br />
          In case our name, trademark, logo etc., is being reflected/used by any
          such third-party platform and/or service provider, kindly inform us at
          the earliest to enable us to take appropriate action in law.
        </p>
        <br />
        <div className="md:divide-y-white flex flex-wrap items-center gap-5 text-[9px] font-bold text-white/50 md:flex-nowrap md:gap-x-4 md:text-xs">
          <a
            href="https://evoting.cdslindia.com/Evoting/EVotingLogin"
            target="_blank"
            className="text-blue-500 underline decoration-blue-500 underline-offset-4"
          >
            e-Voting facility for Shareholders
          </a>
          <div className="hidden text-white/50 md:block">|</div>
          <a
            href="https://smartodr.in/login"
            target="_blank"
            className="text-blue-500 underline decoration-blue-500 underline-offset-4"
          >
            Common Online Dispute Resolution Portal
          </a>
          <div className="hidden text-white/50 md:block">|</div>
          <a
            href="https://clientreports.mcxccl.com/#/"
            target="_blank"
            className="text-blue-500 underline decoration-blue-500 underline-offset-4"
          >
            MCXCCL Client Collateral Link
          </a>
          <div className="hidden text-white/50 md:block">|</div>
          <a
            target="_blank"
            href="https://investorhelpline.nseclearing.in/ClientCollateral/welcomeCLUser"
            className="text-blue-500 underline decoration-blue-500 underline-offset-4"
          >
            NCL Client Collateral Link
          </a>
        </div>

        <div className="divide-y-white my-5 flex flex-wrap items-center gap-5 text-nowrap text-[9px] font-bold text-white/50 md:my-5 md:flex-nowrap md:gap-x-4 md:text-xs">
          <a
            href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FDisclaimer%2Fdisclaimer.pdf?alt=media&token=763757cc-b3f8-48c7-b43b-36a2f3bcf86c"
            target="_blank"
          >
            Disclaimer
          </a>
          <div className="hidden text-white/50 md:block">|</div>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FCopyright%20Policy%2Fcopyright-information.pdf?alt=media&token=d95e4cb8-dd41-4816-9237-5c3b9ef9344a"
            target="_blank"
          >
            Copyright Policy
          </a>
          <div className="hidden text-white/50 md:block">|</div>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Tradejini-compliance-pdf%2FFooter%2FFraud%20Prevention%2Ffraud-prevention.pdf?alt=media&token=0ccdd9eb-feb3-4322-b85a-e19f8e588559"
            target="_blank"
          >
            Fraud Prevention
          </a>
          <div className="hidden text-white/50 md:block">|</div>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>

        {/* <div className="mt-10 grid place-items-center gap-5 text-xs">
        <p className="ml-5 mr-4 font-bold text-white md:mr-20">
              Live Market insights only at...
            </p>
            <button className="text-nowrap rounded-full bg-white px-4 py-2 text-xs font-bold text-[#221182] md:px-6 md:text-2xl">
              Explore Now
            </button>
        </div> */}
      </motion.div>
    </footer>
  );
}
