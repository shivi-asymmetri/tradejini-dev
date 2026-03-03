"use client";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { AiFillQuestionCircle } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FundTables() {
  const tabs = ["Fund pay in", "Fund pay out"];
  const [selected, setSelected] = useState(tabs[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto mb-10 mt-10 max-w-screen-xl px-5 font-satoshi md:px-10 lg:px-20 xl:px-32">
        <LayoutGroup>
          <div className="relative flex flex-row justify-center">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`relative flex w-fit cursor-pointer flex-row items-center gap-x-5 px-10 pb-4 ${
                  selected === "Equities & FNO"
                    ? "text-[#1b1b1b]"
                    : "text-[#595959]"
                }`}
                onClick={() => setSelected(tab)}
              >
                <h4 className="text-md text-nowrap font-bold md:text-xl">
                  {tab}
                </h4>
                {selected === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 right-0 h-1.5 w-full bg-[#005B6C] md:rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          {selected === "Fund pay in" && (
            <>
              <div
                id="bank-account-details"
                className="mt-8 scroll-mt-24 text-center text-2xl font-bold md:mt-16 md:text-4xl"
              >
                Bank Account Details
              </div>

              <div className="mt-5 text-left text-sm font-medium leading-normal text-black/60 md:mt-10 md:text-lg">
                Transfer up to ₹50 lakhs instantly via net banking through the
                CubePlus Funds page. A flat fee of ₹9 + GST is applicable per
                transfer, regardless of the amount. We support various
                nationalized and public sector banks to ensure smooth
                transactions.
              </div>

              <motion.table
                className="mt-10 w-full table-auto text-center"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <thead>
                  <tr>
                    {["Field", "Remarks"].map((item) => (
                      <th
                        className="border-r border-r-white bg-[#1B707F] px-2 py-3 text-white first:rounded-tl-md last:rounded-tr-md"
                        key={item}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6D6D6] bg-[#f9f9f9] px-2 py-2 font-manrope text-xs text-[#202020]/80 md:text-base">
                  <tr>
                    <td className="px-2 py-3">Account Name</td>
                    <td>TRADEJINI Financial Services Private Limited</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">ICICI Bank Account Number*</td>
                    <td>JINI</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">IFSC Code</td>
                    <td>ICIC0000104</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">Account Type</td>
                    <td>Current Account</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">Branch</td>
                    <td>CMS Branch, Mumbai</td>
                  </tr>
                </tbody>
              </motion.table>

              <div className="mt-10 text-left text-sm font-medium text-black/60 md:text-lg">
                *&quot;JINI&quot; is a unique virtual account ID assigned to
                Tradejini, consisting only alphabets. To transfer funds, just add
                &quot;JINI&quot; as a payee in your bank account. The funds will
                be credited directly to your Tradejini account.
              </div>
              {/* <div className="pt-8 text-justify md:text-left text-md md:text-xl font-medium text-[#242424]">
                There are 4 ways to transfer your funds to Tradejini account
              </div> */}
              <motion.table
                className="mt-10 w-full table-auto text-center"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                }}
                key={selected}
              >
                <thead>
                  <tr>
                    {["Method", "Time Required", "Charges"].map((item) => (
                      <th
                        className="border-r border-r-white bg-[#1B707F] px-2 py-3 text-white first:rounded-tl-md last:rounded-tr-md"
                        key={item}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6D6D6] bg-[#f9f9f9] font-manrope text-xs text-[#202020]/80 md:text-base">
                  <tr>
                    <td className="px-2 py-3">UPI from UPI app</td>
                    <td>Immediate</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">
                      Payment Gateway using CubePlus
                    </td>
                    <td>Immediate</td>
                    <td>
                      <div className="items-center gap-0 md:inline-flex md:gap-1">
                        ₹9 + 18% GST{" "}
                        <TooltipProvider>
                          <Tooltip open={open} onOpenChange={setOpen}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => setOpen((prev) => !prev)}
                                className="ml-1 focus:outline-none"
                              >
                                <AiFillQuestionCircle className="h-4 w-4 text-gray-500" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              align="center"
                              className="mr-5 w-[90vw] max-w-sm space-y-2 rounded-md p-3 text-left font-satoshi text-xs leading-relaxed shadow-md md:mr-0"
                            >
                              <p className="font-semibold">
                                💡 Why do we charge ₹9 + GST for payment gateway
                                transactions?
                              </p>
                              <p>
                                To facilitate seamless fund transfers through
                                the CubePlus application, we use Razorpay, a
                                trusted third-party Payment Gateway Service
                                Provider. Each time you add funds via CubePlus,
                                Razorpay processes the transaction securely, and
                                a service fee is incurred.
                              </p>
                              <p>
                                The nominal charge of ₹9 + GST helps us cover
                                this cost and continue providing a smooth,
                                secure payment experience through the app.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">
                      Net Banking IMPS (upto 5 lakhs)
                    </td>
                    <td>Immediate</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3">Net Banking NEFT/RTGS</td>
                    <td>Within 1 hour</td>
                    <td>Free</td>
                  </tr>
                </tbody>
              </motion.table>

              <motion.div className="mt-12 flex flex-col gap-4 text-left text-sm font-medium text-black/60 md:text-lg">
                <div>
                  Immediate fund transfers from your registered bank account
                  using a UPI app or IMPS through a banking app are free and
                  will reflect in your Tradejini account without any delay.
                </div>
                <div>
                  Other payment methods, such as NEFT, RTGS, or Cheque, may take
                  additional time to reflect in your Tradejini account. There
                  are no charges for adding funds to your account, except when
                  using the Payment Gateway through CubePlus.
                </div>
              </motion.div>
            </>
          )}

          {selected === "Fund pay out" && (
            <>
              <motion.div
                initial="initial"
                key={selected}
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="mt-8 rounded-3xl border-2 border-[#005B6C] p-4 md:mt-12 md:p-6">
                  <ul className="list-disc space-y-4 pl-5 text-left text-sm text-black md:text-base">
                    <li>
                      Fund payout requests can be placed from the Funds tab in
                      CubePlus which will navigate through the back office.
                    </li>
                    <li>
                      Fund payouts are processed only once in a working day.
                    </li>
                    <li>
                      Fund payout requests placed on a given calendar day will
                      be processed on the next working day morning.
                    </li>
                    <li>
                      Fund payouts will not be processed on Saturdays, Sundays,
                      Public holidays or Settlement holidays. Requests made on
                      these days will be processed on the next working day.
                    </li>
                    <li>
                      An SMS confirmation will be sent once the amount is
                      processed.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {selected === "Fund pay in" && (
          <div className="mt-8 rounded-3xl border-2 border-[#005B6C] p-6 md:mt-16 md:p-8">
            <div className="text-xl font-bold md:text-2xl">Note</div>
            <ul className="text-balck mt-4 list-disc space-y-3 pl-5 text-left text-sm leading-snug md:text-base">
              <li>
                Funds must be transferred from your registered bank account.
                Transfers from unregistered accounts will not be reflected in
                your Tradejini account.
              </li>
              <li>
                Tradejini does not accept payments via cash or Demand Draft
                (DD).
              </li>
              <li>
                Tradejini will never ask you to transfer funds to any account
                other than the one officially listed (JINI).
              </li>
              <li>
                Always verify bank details before initiating any transfer.
                Beware of fraudulent calls or emails claiming to be from
                Tradejini.
              </li>
              <li>
                Tradejini does not charge any fees for transfers made via NEFT,
                RTGS, or IMPS. Charges apply only when using the payment
                gateway.
              </li>
              <li>
                NEFT/RTGS transfers usually reflect within five minutes to one
                hour, depending on your bank.
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
