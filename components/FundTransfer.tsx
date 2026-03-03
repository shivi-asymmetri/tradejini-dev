export default function FundTransfer() {
  return (
    <div>
      <div className="flex flex-col-reverse items-center justify-end md:flex-row">
        <div className="flex w-1/3 flex-col gap-5 max-md:w-full max-md:px-10">
          <h1 className="font-satoshi text-2xl font-black md:mt-6 md:text-4xl">
            Fund Transfer
          </h1>
          <div className="flex flex-col gap-2 text-left font-satoshi text-xl font-medium text-black/50 md:text-2xl">
            <div>
              Experience fast, secure, and effortless fund transfers and
              withdrawals directly from your registered bank account with
              Tradejini—no delays, no hassle.
              {/* Transfer and withdraw money seamlessly <br />
              through the registered bank account with TRADEJINI */}
            </div>
            <div className="mt-4">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/q4o9RS421yQ"
                title="Fund Transfer Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-end max-md:w-full">
          <img src="rupee.webp" className="h-[80vh] max-md:h-64" />
        </div>
      </div>
    </div>
  );
}
