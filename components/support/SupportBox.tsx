"use client";
import Link from "next/link";
import { useState, Dispatch, SetStateAction } from "react";

interface TicketModalProps {
  ticket: boolean;
  setTicket: Dispatch<SetStateAction<boolean>>;
}

function TicketModal({ ticket, setTicket }: TicketModalProps) {
  return (
    <div
      className={`fixed inset-0 z-[999999999] flex items-center justify-center ${
        ticket ? "block" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setTicket(false)}
      ></div>
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-y-auto rounded-lg bg-white p-8 shadow-lg"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.12)" }}
      >
        <button
          className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setTicket(false)}
          aria-label="Close"
        >
          ×
        </button>
        <h2
          className="mb-6"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0%",
            verticalAlign: "middle",
            color: "#1A1A1A",
          }}
        >
          Ticket details
        </h2>
        <form
          id="__vtigerWebForm_11"
          name="Raise A Ticket(New)"
          action="https://tradejini1.od2.vtiger.com/modules/Webforms/capture.php"
          method="post"
          acceptCharset="utf-8"
          encType="multipart/form-data"
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            try {
              const response = await fetch(
                "https://tradejini1.od2.vtiger.com/modules/Webforms/capture.php",
                {
                  method: "POST",
                  body: formData,
                },
              );
              if (response.ok) {
                alert("Form submitted successfully!");
              } else {
                alert("Failed to submit the form.");
              }
            } catch (error) {
              console.error("Error submitting the form:", error);
              alert("An error occurred.");
            } finally {
              setTicket(false);
            }
          }}
        >
          <input
            type="hidden"
            name="publicid"
            value="2e7c477255812aeade2997f42001c9ff"
          />
          <input type="hidden" name="urlencodeenable" value="1" />
          <input type="hidden" name="name" value="Raise A Ticket(New)" />
          <input type="hidden" name="__vtCurrency" value="1" />

          <div>
            <label
              className="mb-1 block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#1A1A1A",
              }}
            >
              Client Code
            </label>
            <input
              type="text"
              name="cf_cases_tradecode"
              placeholder="AAA01"
              maxLength={9}
              className="w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ fontSize: "15px" }}
            />
          </div>

          <div>
            <label
              className="mb-1 block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#1A1A1A",
              }}
            >
              Registered Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="contact_id::Contacts::email"
              required
              placeholder="johndoe@gmail.com"
              className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ fontSize: "15px" }}
            />
          </div>

          <div>
            <label
              className="mb-1 block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#1A1A1A",
              }}
            >
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact_id"
              required
              placeholder="John Doe"
              className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ fontSize: "15px" }}
            />
          </div>

          <div>
            <label
              className="mb-1 block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#1A1A1A",
              }}
            >
              What issue are you facing?<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              maxLength={255}
              required
              className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ fontSize: "15px" }}
            />
          </div>

          <div>
            <label
              className="mb-1 block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#1A1A1A",
              }}
            >
              Describe your issue in detail
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ fontSize: "15px", minHeight: "70px" }}
            ></textarea>
          </div>

          <div>
            <label
              className="mb-1 block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                color: "#1A1A1A",
              }}
            >
              Choose File
            </label>
            <input type="file" name="file_11_1" className="mt-1 w-full" />
          </div>

          <div className="mt-6 flex justify-start">
            <button
              type="submit"
              className="rounded"
              style={{
                width: "107px",
                height: "45px",
                borderRadius: "6px",
                padding: "10px 18px",
                gap: "10px",
                backgroundColor: "#128789",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "2%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                marginTop: "0",
                border: "none",
                transition: "background 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#117a7a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#128789")
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const SupportBox = () => {
  const [ticket, setTicket] = useState(false);

  return (
    <div className="mt-6 w-full p-4 px-5 md:mt-0 md:p-10">
      <div className="mx-auto max-w-[95vw] md:max-w-full">
        <div
          className="flex flex-col items-start justify-between gap-4 rounded-[16px] px-6 py-10 text-left md:flex-row md:gap-16 md:rounded-[20px] md:px-10 md:py-12 md:text-left"
          style={{
            backgroundColor: "#FDFFFE",
            boxShadow: "0px 8px 20px 0px #DBDBDB3D",
            border: "1px solid #EDEDED",
            backgroundImage: `
              linear-gradient(
                168.68deg,
                rgba(0, 159, 94, 0.05) 8.34%,
                rgba(255, 255, 255, 0.85) 143.81%
              )
            `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="mb-2 w-full max-w-none md:mb-0 md:max-w-[750px]">
            <h2
              className="mb-4 text-left text-[22px] font-semibold leading-7 md:mb-4 md:text-[36px] md:leading-[52px]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                color: "#1A1A1A",
                letterSpacing: "0%",
              }}
            >
              Still feeling stuck?
            </h2>
            <p
              className="text-left text-[16px] font-medium leading-6 text-[#666] md:text-[18px] md:leading-8"
              style={{
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-1%",
              }}
            >
              Try searching for an answer first. If you still need help, create
              a ticket, and we&apos;ll get back to you soon.
            </p>
          </div>

          <button
            onClick={() => setTicket(true)}
            className="h-[40px] w-[152px] rounded-[8px] px-0 py-0 text-white transition-colors duration-200 md:mb-1 md:h-auto md:w-[200px] md:min-w-[160px] md:px-6 md:py-3"
            style={{
              background:
                "linear-gradient(89.67deg, #00BE68 -9.95%, #006738 78.29%)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "17px",
              lineHeight: "150%",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(89.67deg, #00BE68 -9.95%, #006738 78.29%)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(89.67deg, #00BE68 -9.95%, #006738 78.29%)")
            }
          >
            Raise a ticket
          </button>
        </div>
      </div>
      <TicketModal ticket={ticket} setTicket={setTicket} />
    </div>
  );
};

export default SupportBox;
