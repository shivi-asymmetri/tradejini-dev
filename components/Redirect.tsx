"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const redirects = [
      {
        source: "/%e2%82%b9250-sip-a-game-changer/",
        destination: "https://tradejini.com/blogs/250-sip-a-game-changer/",
        permanent: true,
      },
      {
        source: "/250-sip-a-game-changer/",
        destination: "https://tradejini.com/blogs/250-sip-a-game-changer/",
        permanent: true,
      },
      {
        source: "/10-years-of-tradejini/",
        destination: "https://tradejini.com/blogs/10-years-of-tradejini",
        permanent: true,
      },
      {
        source: "/2024-us-presidential-elections-affect-indian-stock-market/",
        destination:
          "https://tradejini.com/blogs/2024-us-presidential-elections-affect-indian-stock-market",
        permanent: true,
      },
      {
        source: "/5-red-flags-to-spot-while-picking-stocks/",
        destination:
          "https://tradejini.com/blogs/5-red-flags-to-spot-while-picking-stocks",
        permanent: true,
      },
      {
        source: "/a-cheat-sheet-to-portfolio-rebalancing/",
        destination:
          "https://tradejini.com/blogs/a-cheat-sheet-to-portfolio-rebalancing",
        permanent: true,
      },
      {
        source: "/active-vs-passive-investing/",
        destination: "https://tradejini.com/blogs/active-vs-passive-investing",
        permanent: true,
      },
      {
        source: "/a-day-off-for-your-portfolio/",
        destination: "https://tradejini.com/blogs/a-day-off-for-your-portfolio",
        permanent: true,
      },
      {
        source: "/a-guide-to-bond-market-and-stock-market-investments/",
        destination:
          "https://tradejini.com/blogs/a-guide-to-bond-market-and-stock-market-investments",
        permanent: true,
      },
      {
        source: "/a-legacy-of-trust-innovation-and-excellence/",
        destination:
          "https://tradejini.com/blogs/a-legacy-of-trust-innovation-and-excellence",
        permanent: true,
      },
      {
        source: "/all-about-a-demat-account/",
        destination: "https://tradejini.com/blogs/all-about-a-demat-account",
        permanent: true,
      },
      {
        source:
          "/all-a-person-who-puts-their-hard-earned-money-into-the-capital-market-hopes-for-is-a-100-return-on-investment/",
        destination:
          "https://tradejini.com/blogs/pros-and-cons-of-high-risk-investments",
        permanent: true,
      },
      {
        source: "/analysis-of-bse-and-nasdaq/",
        destination: "https://tradejini.com/blogs/analysis-of-bse-and-nasdaq",
        permanent: true,
      },
      {
        source: "/arbitrage-trading-types-benefits-challenges/",
        destination:
          "https://tradejini.com/blogs/arbitrage-trading-types-benefits-challenges",
        permanent: true,
      },
      {
        source: "/are-corporate-actions-causing-the-domino-effect/",
        destination:
          "https://tradejini.com/blogs/are-corporate-actions-causing-the-domino-effect",
        permanent: true,
      },
      {
        source:
          "/artificial-intelligence-has-quietly-and-not-so-quietly-crept-into-the-fabric-of-our-lives-and-has-taken-our-world-by-storm/",
        destination:
          "https://tradejini.com/blogs/artificial-intelligence-has-quietly-and-not-so-quietly-crept-into-the-fabric-of-our-lives-and-has-taken-our-world-by-storm",
        permanent: true,
      },
      {
        source: "/baap-baap-hota-hai/",
        destination: "https://tradejini.com/blogs/baap-baap-hota-hai",
        permanent: true,
      },
      {
        source: "/bad-banks-n-notorious-p-protective-a-agents/",
        destination:
          "https://tradejini.com/blogs/bad-banks-n-notorious-p-protective-a-agents",
        permanent: true,
      },
      {
        source: "/best-stock-market-movies-web-series/",
        destination:
          "https://tradejini.com/blogs/best-stock-market-movies-web-series",
        permanent: true,
      },
      {
        source: "/bonus-issues-a-win-win-for-investors/",
        destination:
          "https://tradejini.com/blogs/bonus-issues-a-win-win-for-investors",
        permanent: true,
      },
      {
        source:
          "/bse-sensex-recently-crossed-the-80000-mark-for-the-first-time-on-july-4-2024/",
        destination:
          "https://tradejini.com/blogs/bse-sensex-recently-crossed-the-80000-mark-for-the-first-time-on-july-4-2024",
        permanent: true,
      },
      {
        source: "/btst-buy-today-sell-tomorrow-trading-strategy/",
        destination:
          "https://tradejini.com/blogs/btst-buy-today-sell-tomorrow-trading-strategy",
        permanent: true,
      },
      {
        source: "/budget-2024-impact-women-students-professionals/",
        destination:
          "https://tradejini.com/blogs/budget-2024-impact-women-students-professionals",
        permanent: true,
      },
      {
        source: "/budget-2024-key-terms/",
        destination: "https://tradejini.com/blogs/budget-2024-key-terms",
        permanent: true,
      },
      {
        source: "/budgeting-brahmastras-financial-planning-beginners/",
        destination:
          "https://tradejini.com/blogs/budgeting-brahmastras-financial-planning-beginners",
        permanent: true,
      },
      {
        source: "/bulk-deals-block-deals-stock-market/",
        destination:
          "https://tradejini.com/blogs/bulk-deals-block-deals-stock-market",
        permanent: true,
      },
      {
        source:
          "/byjus-rights-issue-amidst-valuation-freefall-a-strategic-reset/",
        destination:
          "https://tradejini.com/blogs/byjus-rights-issue-amidst-valuation-freefall-a-strategic-reset",
        permanent: true,
      },
      {
        source: "/calculating-correct-investment-returns/",
        destination:
          "https://tradejini.com/blogs/calculating-correct-investment-returns",
        permanent: true,
      },
      {
        source: "/can-a-government-employee-do-trading/",
        destination:
          "https://tradejini.com/blogs/can-a-government-employee-do-trading",
        permanent: true,
      },
      {
        source: "/can-you-make-money-from-stock-trading/",
        destination:
          "https://tradejini.com/blogs/can-you-make-money-from-stock-trading",
        permanent: true,
      },
      {
        source: "/capital-market-instruments-types-and-features/",
        destination:
          "https://tradejini.com/blogs/capital-market-instruments-types-and-features",
        permanent: true,
      },
      {
        source:
          "/changes-to-indias-bankruptcy-law-to-save-airlines-over-1-billion/",
        destination:
          "https://tradejini.com/blogs/changes-to-indias-bankruptcy-law-to-save-airlines-over-1-billion",
        permanent: true,
      },
      {
        source: "/china-panda-diplomacy-stratergy/",
        destination:
          "https://tradejini.com/blogs/china-panda-diplomacy-stratergy",
        permanent: true,
      },
      {
        source:
          "/cloud-kitchens-a-revolution-in-the-food-and-beverage-industry/",
        destination:
          "https://tradejini.com/blogs/cloud-kitchens-a-revolution-in-the-food-and-beverage-industry",
        permanent: true,
      },
      {
        source: "/common-trading-mistake-how-to-avoid-them/",
        destination:
          "https://tradejini.com/blogs/common-trading-mistake-how-to-avoid-them",
        permanent: true,
      },
      {
        source: "/company-demergers-impact-on-investors/",
        destination:
          "https://tradejini.com/blogs/company-demergers-impact-on-investors",
        permanent: true,
      },
      {
        source:
          "/comprehensive-go-to-for-beginners-who-will-understand-how-to-control-risk-get-opportunities-and-with-confidence-begin-their-trading-options/",
        destination:
          "https://tradejini.com/blogs/beginners-guide-to-option-trading-control-risk-find-opportunities-trade-confidently",
        permanent: true,
      },
      {
        source: "/cost-of-carry-in-futures-contract/",
        destination:
          "https://tradejini.com/blogs/cost-of-carry-in-futures-contract",
        permanent: true,
      },
      {
        source: "/covered-call-options-strategy/",
        destination:
          "https://tradejini.com/blogs/covered-call-options-strategy",
        permanent: true,
      },
      {
        source: "/cover-order/",
        destination: "https://tradejini.com/blogs/cover-order",
        permanent: true,
      },
      {
        source:
          "/credit-cards-are-powerful-but-mismanagement-can-lead-to-debt-high-rates-and-credit-woes/",
        destination:
          "https://tradejini.com/blogs/credit-card-misuse-can-lead-to-debt-and-financial-trouble",
        permanent: true,
      },
      {
        source: "/dabba-trading-in-india/",
        destination: "https://tradejini.com/blogs/dabba-trading-in-india",
        permanent: true,
      },
      {
        source: "/decoding-inflation-understanding-the-economic-pulse/",
        destination:
          "https://tradejini.com/blogs/decoding-inflation-understanding-the-economic-pulse",
        permanent: true,
      },
      {
        source: "/demat-and-trading-account-difference/",
        destination:
          "https://tradejini.com/blogs/demat-and-trading-account-difference",
        permanent: true,
      },
      {
        source: "/dematerialisation-rematerialisation-of-shares/",
        destination:
          "https://tradejini.com/blogs/dematerialisation-rematerialisation-of-shares",
        permanent: true,
      },
      {
        source: "/demystifying-the-macd-your-trading-sidekick/",
        destination:
          "https://tradejini.com/blogs/demystifying-the-macd-your-trading-sidekick",
        permanent: true,
      },
      {
        source: "/different-types-of-investments/",
        destination:
          "https://tradejini.com/blogs/different-types-of-investments",
        permanent: true,
      },
      {
        source: "/diversification/",
        destination: "https://tradejini.com/blogs/diversification",
        permanent: true,
      },
      {
        source: "/d-marts-rk-damani-raises-markets-eyebrows/",
        destination:
          "https://tradejini.com/blogs/d-marts-rk-damani-raises-markets-eyebrows",
        permanent: true,
      },
      {
        source:
          "/dont-panic-7-mistakes-investors-make-while-market-is-crashing/",
        destination:
          "https://tradejini.com/blogs/dont-panic-7-mistakes-investors-make-while-market-is-crashing",
        permanent: true,
      },
      {
        source: "/dont-start-fo-trading-without-reading-this-article/",
        destination:
          "https://tradejini.com/blogs/dont-start-fo-trading-without-reading-this-article",
        permanent: true,
      },
      {
        source: "/empower-your-investments-trading-styles/",
        destination:
          "https://tradejini.com/blogs/empower-your-investments-trading-styles",
        permanent: true,
      },
      {
        source: "/ev-gets-its-own-index/",
        destination: "https://tradejini.com/blogs/ev-gets-its-own-index",
        permanent: true,
      },
      {
        source: "/expiry-date-of-options/",
        destination: "https://tradejini.com/blogs/expiry-date-of-options",
        permanent: true,
      },
      {
        source: "/fiat-money/",
        destination: "https://tradejini.com/blogs/fiat-money",
        permanent: true,
      },
      {
        source: "/fii-foreign-institutional-investors-exiting-india/",
        destination:
          "https://tradejini.com/blogs/fii-foreign-institutional-investors-exiting-india",
        permanent: true,
      },
      {
        source: "/finance-frenzy-of-the-gen-z/",
        destination: "https://tradejini.com/blogs/finance-frenzy-of-the-gen-z",
        permanent: true,
      },
      {
        source: "/financial-pitfalls-to-avoid-in-their-20s/",
        destination:
          "https://tradejini.com/blogs/financial-pitfalls-to-avoid-in-their-20s",
        permanent: true,
      },
      {
        source: "/fixed-income-securities/",
        destination: "https://tradejini.com/blogs/fixed-income-securities",
        permanent: true,
      },
      {
        source: "/from-boom-to-bust-the-inside-story-of-the-2008-crisis/",
        destination:
          "https://tradejini.com/blogs/from-boom-to-bust-the-inside-story-of-the-2008-crisis",
        permanent: true,
      },
      {
        source: "/from-chetak-to-pulsar-bajajs-iconic-journey-on-indian-roads/",
        destination:
          "https://tradejini.com/blogs/from-chetak-to-pulsar-bajajs-iconic-journey-on-indian-roads",
        permanent: true,
      },
      {
        source: "/from-sinking-ships-to-second-chances-can-npas-be-rescued/",
        destination:
          "https://tradejini.com/blogs/from-sinking-ships-to-second-chances-can-npas-be-rescued",
        permanent: true,
      },
      {
        source: "/futures-contract-expiration-dates/",
        destination:
          "https://tradejini.com/blogs/futures-contract-expiration-dates",
        permanent: true,
      },
      {
        source: "/ghar-wapsi-effect/",
        destination: "https://tradejini.com/blogs/ghar-wapsi-effect",
        permanent: true,
      },
      {
        source: "/gold-rush-a-cultural-and-financial-asset/",
        destination:
          "https://tradejini.com/blogs/gold-rush-a-cultural-and-financial-asset",
        permanent: true,
      },
      {
        source: "/good-till-triggered-gtt/",
        destination: "https://tradejini.com/blogs/good-till-triggered-gtt",
        permanent: true,
      },
      {
        source: "/govts-pli-scheme-stocks-and-sectors-likely-to-benefit-most/",
        destination:
          "https://tradejini.com/blogs/govts-pli-scheme-stocks-and-sectors-likely-to-benefit-most",
        permanent: true,
      },
      {
        source: "/grab-shares-at-a-discount-rights-issue-decoded/",
        destination:
          "https://tradejini.com/blogs/grab-shares-at-a-discount-rights-issue-decoded",
        permanent: true,
      },
      {
        source: "/hdfc-bank-shares-tank-7-after-q3-results/",
        destination:
          "https://tradejini.com/blogs/hdfc-bank-shares-tank-7-after-q3-results",
        permanent: true,
      },
      {
        source: "/heatmap/",
        destination: "https://tradejini.com/blogs/heatmap",
        permanent: true,
      },
      {
        source:
          "/here-are-some-insights-into-some-of-the-most-expensive-publicly-traded-companies-in-india/",
        destination:
          "https://tradejini.com/blogs/most-expensive-publicly-traded-companies-in-india",
        permanent: true,
      },
      {
        source: "/hindenburg-report-buried-sc-says-no-more-probes/",
        destination:
          "https://tradejini.com/blogs/hindenburg-report-buried-sc-says-no-more-probes",
        permanent: true,
      },
      {
        source: "/how-are-bonus-shares-credited-to-a-demat-account/",
        destination:
          "https://tradejini.com/blogs/how-are-bonus-shares-credited-to-a-demat-account",
        permanent: true,
      },
      {
        source:
          "/how-artificial-intelligence-is-reshaping-the-landscape-of-finance/",
        destination:
          "https://tradejini.com/blogs/how-artificial-intelligence-is-reshaping-the-landscape-of-finance",
        permanent: true,
      },
      {
        source: "/how-asias-richest-man-regained-his-crown/",
        destination:
          "https://tradejini.com/blogs/how-asias-richest-man-regained-his-crown",
        permanent: true,
      },
      {
        source: "/how-can-you-structure-your-financial-groundwork/",
        destination:
          "https://tradejini.com/blogs/how-can-you-structure-your-financial-groundwork",
        permanent: true,
      },
      {
        source: "/how-do-elections-affect-the-stock-market/",
        destination:
          "https://tradejini.com/blogs/how-do-elections-affect-the-stock-market",
        permanent: true,
      },
      {
        source: "/how-rate-cuts-affect-global-markets-and-the-economy/",
        destination:
          "https://tradejini.com/blogs/how-rate-cuts-affect-global-markets-and-the-economy",
        permanent: true,
      },
      {
        source: "/how-stocks-enter-exit-nifty-index/",
        destination:
          "https://tradejini.com/blogs/how-stocks-enter-exit-nifty-index",
        permanent: true,
      },
      {
        source: "/how-to-choose-the-right-stocks-for-intraday-trading/",
        destination:
          "https://tradejini.com/blogs/how-to-choose-the-right-stocks-for-intraday-trading",
        permanent: true,
      },
      {
        source: "/how-to-get-funds-for-trading-in-india/",
        destination:
          "https://tradejini.com/blogs/how-to-get-funds-for-trading-in-india",
        permanent: true,
      },
      {
        source: "/how-to-invest-in-physical-and-mental-health/",
        destination:
          "https://tradejini.com/blogs/how-to-invest-in-physical-and-mental-health",
        permanent: true,
      },
      {
        source: "/how-to-know-your-demat-account-number/",
        destination:
          "https://tradejini.com/blogs/how-to-know-your-demat-account-number",
        permanent: true,
      },
      {
        source: "/how-to-reactivate-demat-account/",
        destination:
          "https://tradejini.com/blogs/how-to-reactivate-demat-account",
        permanent: true,
      },
      {
        source: "/how-to-select-stocks-for-swing-trading-a-beginners-guide/",
        destination:
          "https://tradejini.com/blogs/how-to-select-stocks-for-swing-trading-a-beginners-guide",
        permanent: true,
      },
      {
        source: "/how-to-trade-in-options-with-low-capital/",
        destination:
          "https://tradejini.com/blogs/how-to-trade-in-options-with-low-capital",
        permanent: true,
      },
      {
        source: "/how-to-transfer-shares-from-one-demat-account-to-another/",
        destination:
          "https://tradejini.com/blogs/how-to-transfer-shares-from-one-demat-account-to-another",
        permanent: true,
      },
      {
        source:
          "/imagine-being-so-wealthy-that-the-economies-of-the-cities-and-empires-you-visit-collapse/",
        destination:
          "https://tradejini.com/blogs/imagine-being-so-wealthy-that-the-economies-of-the-cities-and-empires-you-visit-collapse",
        permanent: true,
      },
      {
        source: "/impact-of-inflation/",
        destination: "https://tradejini.com/blogs/impact-of-inflation",
        permanent: true,
      },
      {
        source: "/impact-reduced-rate-indexation-removal-property-sales/",
        destination:
          "https://tradejini.com/blogs/impact-reduced-rate-indexation-removal-property-sales",
        permanent: true,
      },
      {
        source: "/implied-volatility-iv-works-with-options/",
        destination:
          "https://tradejini.com/blogs/implied-volatility-iv-works-with-options",
        permanent: true,
      },
      {
        source:
          "/importance-of-choosing-asset-classes-to-invest-in-asset-allocation/",
        destination:
          "https://tradejini.com/blogs/importance-of-choosing-asset-classes-to-invest-in-asset-allocation",
        permanent: true,
      },
      {
        source: "/improve-market-analysis-seasonality-charts/",
        destination:
          "https://tradejini.com/blogs/improve-market-analysis-seasonality-charts",
        permanent: true,
      },
      {
        source:
          "/in-an-era-where-financial-frauds-are-becoming-increasingly-sophisticated-its-crucial-to-be-aware-of-money-doubling-scams/",
        destination:
          "https://tradejini.com/blogs/beware-of-financial-frauds-money-doubling-scams",
        permanent: true,
      },
      {
        source:
          "/in-a-nutshell-a-demat-account-is-like-a-digital-wallet-for-your-investments-it-keeps-everything-safe-and-organized-while-also-making-it-easier-to-buy-sell-and-manage-your-money/",
        destination:
          "https://tradejini.com/blogs/7-best-applications-of-demat-accounts-in-stock-market",
        permanent: true,
      },
      {
        source: "/indias-booming-booze-bazaar/",
        destination: "https://tradejini.com/blogs/indias-booming-booze-bazaar",
        permanent: true,
      },
      {
        source: "/indias-consumption-boom-writing-the-next-growth-story/",
        destination:
          "https://tradejini.com/blogs/indias-consumption-boom-writing-the-next-growth-story",
        permanent: true,
      },
      {
        source:
          "/indias-financial-transactions-have-entered-a-new-era-thanks-to-the-upi-which-has-transformed-the-countrys-payment-practices-and-greatly-boosted-its-digital-economy/",
        destination:
          "https://tradejini.com/blogs/upi-revolutionizes-indias-payments-and-digital-economy",
        permanent: true,
      },
      {
        source:
          "/indias-startup-ecosystem-once-a-poster-child-for-growth-has-been-particularly-affected-by-the-funding-winter/",
        destination:
          "https://tradejini.com/blogs/indias-startup-growth-hit-by-funding-winter",
        permanent: true,
      },
      {
        source: "/indias-upi-reaches-paris/",
        destination: "https://tradejini.com/blogs/indias-upi-reaches-paris",
        permanent: true,
      },
      {
        source: "/india-vix-index-meaning-calculation/",
        destination:
          "https://tradejini.com/blogs/india-vix-index-meaning-calculation",
        permanent: true,
      },
      {
        source: "/insider-trading-india-says-namaste-not-today/",
        destination:
          "https://tradejini.com/blogs/insider-trading-india-says-namaste-not-today",
        permanent: true,
      },
      {
        source: "/insider-trading-meaning-examples-why-illegal/",
        destination:
          "https://tradejini.com/blogs/insider-trading-meaning-examples-why-illegal",
        permanent: true,
      },
      {
        source: "/intraday-trading-vs-delivery-trading/",
        destination:
          "https://tradejini.com/blogs/intraday-trading-vs-delivery-trading",
        permanent: true,
      },
      {
        source: "/intraday-trading-vs-swing-trading/",
        destination:
          "https://tradejini.com/blogs/intraday-trading-vs-swing-trading",
        permanent: true,
      },
      {
        source: "/introduction-to-various-asset-classes/",
        destination:
          "https://tradejini.com/blogs/introduction-to-various-asset-classes",
        permanent: true,
      },
      {
        source: "/investing-for-the-pre-and-post-election-periods/",
        destination:
          "https://tradejini.com/blogs/investing-for-the-pre-and-post-election-periods",
        permanent: true,
      },
      {
        source: "/investing-vs-trading/",
        destination: "https://tradejini.com/blogs/investing-vs-trading",
        permanent: true,
      },
      {
        source: "/ipl-india-favourite-sport-cricket/",
        destination:
          "https://tradejini.com/blogs/ipl-india-favourite-sport-cricket",
        permanent: true,
      },
      {
        source: "/iran-israel-war-impacts-indian-stock-market/",
        destination:
          "https://tradejini.com/blogs/iran-israel-war-impacts-indian-stock-market",
        permanent: true,
      },
      {
        source: "/is-trading-a-gamble/",
        destination: "https://tradejini.com/blogs/is-trading-a-gamble",
        permanent: true,
      },
      {
        source: "/key-take-on-how-to-manage-and-revive-a-declining-portfolio/",
        destination:
          "https://tradejini.com/blogs/key-take-on-how-to-manage-and-revive-a-declining-portfolio",
        permanent: true,
      },
      {
        source:
          "/learn-how-to-create-unforgettable-travel-experiences-without-going-over-budget/",
        destination:
          "https://tradejini.com/blogs/learn-how-to-create-unforgettable-travel-experiences-without-going-over-budget",
        permanent: true,
      },
      {
        source: "/long-position-vs-short-position-in-trading/",
        destination:
          "https://tradejini.com/blogs/long-position-vs-short-position-in-trading",
        permanent: true,
      },
      {
        source: "/lot-size-in-futures-options-trading/",
        destination:
          "https://tradejini.com/blogs/lot-size-in-futures-options-trading",
        permanent: true,
      },
      {
        source:
          "/market-sentiment-affects-stock-prices-impact-insights-analysis/",
        destination:
          "https://tradejini.com/blogs/market-sentiment-affects-stock-prices-impact-insights-analysis",
        permanent: true,
      },
      {
        source: "/mastering-technical-analysis-in-futures-options-trading/",
        destination:
          "https://tradejini.com/blogs/mastering-technical-analysis-in-futures-options-trading",
        permanent: true,
      },
      {
        source:
          "/maximising-your-earnings-strategies-to-minimise-tax-on-stock-gains-in-india/",
        destination:
          "https://tradejini.com/blogs/maximising-your-earnings-strategies-to-minimise-tax-on-stock-gains-in-india",
        permanent: true,
      },
      {
        source: "/maximize-your-returns-this-fiscal-year/",
        destination:
          "https://tradejini.com/blogs/maximize-your-returns-this-fiscal-year",
        permanent: true,
      },
      {
        source: "/money-habits-that-are-keeping-you-poor/",
        destination:
          "https://tradejini.com/blogs/money-habits-that-are-keeping-you-poor",
        permanent: true,
      },
      {
        source: "/money-is-the-root-cause-of-every-evil-hawala/",
        destination:
          "https://tradejini.com/blogs/money-is-the-root-cause-of-every-evil-hawala",
        permanent: true,
      },
      {
        source: "/muhurat-trading-guide-for-investors/",
        destination:
          "https://tradejini.com/blogs/muhurat-trading-guide-for-investors",
        permanent: true,
      },
      {
        source: "/muhurat-trading-when-tradition-meets-market-savvy/",
        destination:
          "https://tradejini.com/blogs/muhurat-trading-when-tradition-meets-market-savvy",
        permanent: true,
      },
      {
        source: "/mutual-fund-investment-inheritance/",
        destination:
          "https://tradejini.com/blogs/mutual-fund-investment-inheritance",
        permanent: true,
      },
      {
        source: "/nifty-50-journey-25000/",
        destination: "https://tradejini.com/blogs/nifty-50-journey-25000",
        permanent: true,
      },
      {
        source: "/nifty-breaches-25000-celebration-dalal-street/",
        destination:
          "https://tradejini.com/blogs/nifty-breaches-25000-celebration-dalal-street",
        permanent: true,
      },
      {
        source: "/nifty-pre-diwali-drop-largest-drop-in-a-decade/",
        destination:
          "https://tradejini.com/blogs/nifty-pre-diwali-drop-largest-drop-in-a-decade",
        permanent: true,
      },
      {
        source: "/one-stamp-duty-unified-stamp-duty-effective-01st-july-2020/",
        destination:
          "https://tradejini.com/blogs/one-stamp-duty-unified-stamp-duty-effective-01st-july-2020",
        permanent: true,
      },
      {
        source: "/open-high-open-low-ohol-trading-strategy/",
        destination:
          "https://tradejini.com/blogs/open-high-open-low-ohol-trading-strategy",
        permanent: true,
      },
      {
        source: "/order-slicing-manage-large-orders/",
        destination:
          "https://tradejini.com/blogs/order-slicing-manage-large-orders",
        permanent: true,
      },
      {
        source:
          "/origins-and-evolution-of-futures-trading-how-it-started-in-india/",
        destination:
          "https://tradejini.com/blogs/origins-and-evolution-of-futures-trading-how-it-started-in-india",
        permanent: true,
      },
      {
        source: "/pe-and-ce-in-stock-market/",
        destination: "https://tradejini.com/blogs/pe-and-ce-in-stock-market",
        permanent: true,
      },
      {
        source: "/pied-piper-to-prisoner-he-was-harshad-mehta/",
        destination:
          "https://tradejini.com/blogs/pied-piper-to-prisoner-he-was-harshad-mehta",
        permanent: true,
      },
      {
        source: "/portfolio-red-after-market-crash/",
        destination:
          "https://tradejini.com/blogs/portfolio-red-after-market-crash",
        permanent: true,
      },
      {
        source: "/power-of-compounding/",
        destination: "https://tradejini.com/blogs/power-of-compounding",
        permanent: true,
      },
      {
        source: "/protective-put-strategy-how-it-works/",
        destination:
          "https://tradejini.com/blogs/protective-put-strategy-how-it-works",
        permanent: true,
      },
      {
        source: "/pump-and-dump-stock-market-schemes/",
        destination:
          "https://tradejini.com/blogs/pump-and-dump-stock-market-schemes",
        permanent: true,
      },
      {
        source: "/railway-stocks-soars/",
        destination: "https://tradejini.com/blogs/railway-stocks-soars",
        permanent: true,
      },
      {
        source: "/rbi-monetary-policy-2024-repo-rate-unchanged/",
        destination:
          "https://tradejini.com/blogs/rbi-monetary-policy-2024-repo-rate-unchanged",
        permanent: true,
      },
      {
        source: "/risk-averse-investors-equity-markets/",
        destination:
          "https://tradejini.com/blogs/risk-averse-investors-equity-markets",
        permanent: true,
      },
      {
        source: "/rollover-futures-contract/",
        destination: "https://tradejini.com/blogs/rollover-futures-contract",
        permanent: true,
      },
      {
        source: "/sebi-eyes-same-day-settlement/",
        destination:
          "https://tradejini.com/blogs/sebi-eyes-same-day-settlement",
        permanent: true,
      },
      {
        source: "/sebi-new-rules-stock-market-changes-from-oct-1/",
        destination:
          "https://tradejini.com/blogs/sebi-new-rules-stock-market-changes-from-oct-1",
        permanent: true,
      },
      {
        source: "/selecting-and-filing-the-right-itr-form/",
        destination:
          "https://tradejini.com/blogs/selecting-and-filing-the-right-itr-form",
        permanent: true,
      },
      {
        source: "/setup-stock-trading-plan-for-muhurat-samvat-2081/",
        destination:
          "https://tradejini.com/blogs/setup-stock-trading-plan-for-muhurat-samvat-2081",
        permanent: true,
      },
      {
        source: "/shares-and-commodity-trading-in-one-account/",
        destination:
          "https://tradejini.com/blogs/shares-and-commodity-trading-in-one-account",
        permanent: true,
      },
      {
        source: "/short-selling-for-long-term-investors/",
        destination:
          "https://tradejini.com/blogs/short-selling-for-long-term-investors",
        permanent: true,
      },
      {
        source: "/should-you-consider-buying-blue-chip-stocks/",
        destination:
          "https://tradejini.com/blogs/should-you-consider-buying-blue-chip-stocks",
        permanent: true,
      },
      {
        source: "/stock-delisting-meaning-types-process/",
        destination:
          "https://tradejini.com/blogs/stock-delisting-meaning-types-process",
        permanent: true,
      },
      {
        source: "/stock-market-lessons-from-mumbai-dabbawala/",
        destination:
          "https://tradejini.com/blogs/stock-market-lessons-from-mumbai-dabbawala",
        permanent: true,
      },
      {
        source: "/straddle-options-trading-strategy/",
        destination:
          "https://tradejini.com/blogs/straddle-options-trading-strategy",
        permanent: true,
      },
      {
        source: "/strategies-and-styles-of-investment/",
        destination:
          "https://tradejini.com/blogs/strategies-and-styles-of-investment",
        permanent: true,
      },
      {
        source: "/strategy-worth-considering-indian-stock-market/",
        destination:
          "https://tradejini.com/blogs/strategy-worth-considering-indian-stock-market",
        permanent: true,
      },
      {
        source:
          "/tax-season-is-here-to-affirm-honest-income-declaration-and-details-about-your-financial-activities-throughout-the-year/",
        destination:
          "https://tradejini.com/blogs/tax-season-is-here-to-affirm-honest-income-declaration-and-details-about-your-financial-activities-throughout-the-year",
        permanent: true,
      },
      {
        source:
          "/tcs-and-infosys-q3-results-modest-profit-increase-ai-ventures-and-more/",
        destination:
          "https://tradejini.com/blogs/tcs-and-infosys-q3-results-modest-profit-increase-ai-ventures-and-more",
        permanent: true,
      },
      {
        source: "/technical-analysis-beginners-guide/",
        destination:
          "https://tradejini.com/blogs/technical-analysis-beginners-guide",
        permanent: true,
      },
      {
        source: "/technical-analysis-charts-tools-profitable-trading/",
        destination:
          "https://tradejini.com/blogs/technical-analysis-charts-tools-profitable-trading",
        permanent: true,
      },
      {
        source:
          "/the-brand-is-synonymous-with-safety-and-security-trusted-by-millions-worldwide/",
        destination: "https://tradejini.com/blogs/the-story-behind-godrej",
        permanent: true,
      },
      {
        source:
          "/the-future-is-artificial-will-ai-inherit-the-earth-or-save-it/",
        destination:
          "https://tradejini.com/blogs/the-future-is-artificial-will-ai-inherit-the-earth-or-save-it",
        permanent: true,
      },
      {
        source:
          "/the-impact-of-rising-interest-rates-on-markets-and-investments/",
        destination:
          "https://tradejini.com/blogs/the-impact-of-rising-interest-rates-on-markets-and-investments",
        permanent: true,
      },
      {
        source:
          "/the-market-is-fundamentally-driven-by-sentiment-a-well-understood-by-those-delving-into-trading-day-in-and-day-out/",
        destination:
          "https://tradejini.com/blogs/market-sentiments-drive-daily-trading-decisions",
        permanent: true,
      },
      {
        source:
          "/the-role-and-impact-of-the-international-monetary-fund-in-the-global-economy/",
        destination:
          "https://tradejini.com/blogs/the-role-and-impact-of-the-international-monetary-fund-in-the-global-economy",
        permanent: true,
      },
      {
        source: "/the-smart-taxpayers-tax-phobia-heres-the-remedy-deductions/",
        destination:
          "https://tradejini.com/blogs/the-smart-taxpayers-tax-phobia-heres-the-remedy-deductions",
        permanent: true,
      },
      {
        source: "/the-top-10-twists-of-2023-that-made-global-waves/",
        destination:
          "https://tradejini.com/blogs/the-top-10-twists-of-2023-that-made-global-waves",
        permanent: true,
      },
      {
        source: "/time-value-of-money/",
        destination: "https://tradejini.com/blogs/time-value-of-money",
        permanent: true,
      },
      {
        source: "/top-banks-offer-these-interest-rates-on-fixed-deposits/",
        destination:
          "https://tradejini.com/blogs/top-banks-offer-these-interest-rates-on-fixed-deposits",
        permanent: true,
      },
      {
        source: "/trade-to-trade-t2t-stocks-segment/",
        destination:
          "https://tradejini.com/blogs/trade-to-trade-t2t-stocks-segment",
        permanent: true,
      },
      {
        source: "/trading-psychology-role-of-discipline-and-consistency/",
        destination:
          "https://tradejini.com/blogs/trading-psychology-role-of-discipline-and-consistency",
        permanent: true,
      },
      {
        source: "/trump-47th-president-usa/",
        destination: "https://tradejini.com/blogs/trump-47th-president-usa",
        permanent: true,
      },
      {
        source: "/tsl-orders-integration-exchange-use/",
        destination:
          "https://tradejini.com/blogs/tsl-orders-integration-exchange-use",
        permanent: true,
      },
      {
        source: "/tujhe-sab-hai-patameri-maa/",
        destination: "https://tradejini.com/blogs/tujhe-sab-hai-patameri-maa",
        permanent: true,
      },
      {
        source: "/turbulence-in-paytm-stock-40-plunge-post-rbi-crackdown/",
        destination:
          "https://tradejini.com/blogs/turbulence-in-paytm-stock-40-plunge-post-rbi-crackdown",
        permanent: true,
      },
      {
        source: "/types-of-investors-retail-vs-institutional/",
        destination:
          "https://tradejini.com/blogs/types-of-investors-retail-vs-institutional",
        permanent: true,
      },
      {
        source: "/types-of-stocks/",
        destination: "https://tradejini.com/blogs/types-of-stocks",
        permanent: true,
      },
      {
        source: "/understanding-debit-and-credit-cards-and-how-they-work/",
        destination:
          "https://tradejini.com/blogs/understanding-debit-and-credit-cards-and-how-they-work",
        permanent: true,
      },
      {
        source: "/understanding-dynamics-of-volatile-stocks/",
        destination:
          "https://tradejini.com/blogs/understanding-dynamics-of-volatile-stocks",
        permanent: true,
      },
      {
        source: "/understanding-tax-havens/",
        destination: "https://tradejini.com/blogs/understanding-tax-havens",
        permanent: true,
      },
      {
        source: "/understanding-the-relationship-of-risk-return/",
        destination:
          "https://tradejini.com/blogs/understanding-the-relationship-of-risk-return",
        permanent: true,
      },
      {
        source: "/union-budget-2024-key-expectations-and-sectors-at-spotlight/",
        destination:
          "https://tradejini.com/blogs/union-budget-2024-key-expectations-and-sectors-at-spotlight",
        permanent: true,
      },
      {
        source: "/union-budget-highlights-2024-key-takeaways-insights/",
        destination:
          "https://tradejini.com/blogs/union-budget-highlights-2024-key-takeaways-insights",
        permanent: true,
      },
      {
        source: "/value-stocks-vs-growth-stocks/",
        destination:
          "https://tradejini.com/blogs/value-stocks-vs-growth-stocks",
        permanent: true,
      },
      {
        source: "/warning-mutual-funds-demat-account-might-get-frozen/",
        destination:
          "https://tradejini.com/blogs/warning-mutual-funds-demat-account-might-get-frozen",
        permanent: true,
      },
      {
        source: "/what-and-who-is-a-stockbroker/",
        destination:
          "https://tradejini.com/blogs/what-and-who-is-a-stockbroker",
        permanent: true,
      },
      {
        source: "/what-are-dividends-meaning-types-jargons/",
        destination:
          "https://tradejini.com/blogs/what-are-dividends-meaning-types-jargons",
        permanent: true,
      },
      {
        source: "/what-are-mergers-process-effects/",
        destination:
          "https://tradejini.com/blogs/what-are-mergers-process-effects",
        permanent: true,
      },
      {
        source: "/what-are-stock-splits/",
        destination: "https://tradejini.com/blogs/what-are-stock-splits",
        permanent: true,
      },
      {
        source: "/what-causes-a-stock-to-enter-an-fo-ban/",
        destination:
          "https://tradejini.com/blogs/what-causes-a-stock-to-enter-an-fo-ban",
        permanent: true,
      },
      {
        source: "/what-happens-to-trending-stocks-after-the-event-is-over/",
        destination:
          "https://tradejini.com/blogs/what-happens-to-trending-stocks-after-the-event-is-over",
        permanent: true,
      },
      {
        source: "/what-is-a-hedge-fund/",
        destination: "https://tradejini.com/blogs/what-is-a-hedge-fund",
        permanent: true,
      },
      {
        source: "/what-is-algo-trading-benefits-and-how-it-works/",
        destination:
          "https://tradejini.com/blogs/what-is-algo-trading-benefits-and-how-it-works",
        permanent: true,
      },
      {
        source: "/what-is-colour-trading-in-options/",
        destination:
          "https://tradejini.com/blogs/what-is-colour-trading-in-options",
        permanent: true,
      },
      {
        source: "/what-is-hedging-in-futures-and-options-trading/",
        destination:
          "https://tradejini.com/blogs/what-is-hedging-in-futures-and-options-trading",
        permanent: true,
      },
      {
        source: "/what-is-scalping-in-trading-strategy/",
        destination:
          "https://tradejini.com/blogs/what-is-scalping-in-trading-strategy",
        permanent: true,
      },
      {
        source: "/what-is-stock-market-and-how-does-it-works/",
        destination:
          "https://tradejini.com/blogs/what-is-stock-market-and-how-does-it-works",
        permanent: true,
      },
      {
        source: "/what-is-time-frame-in-trading-and-their-types/",
        destination:
          "https://tradejini.com/blogs/what-is-time-frame-in-trading-and-their-types",
        permanent: true,
      },
      {
        source: "/what-to-know-before-opening-a-demat-account/",
        destination:
          "https://tradejini.com/blogs/what-to-know-before-opening-a-demat-account",
        permanent: true,
      },
      {
        source:
          "/while-shorting-can-offer-potential-rewards-it-is-fraught-with-risks-and-complications-making-it-a-particularly-unwise-strategy-for-long-term-investors/",
        destination:
          "https://tradejini.com/blogs/short-selling-risky-and-unsuitable-for-long-term-investors",
        permanent: true,
      },
      {
        source:
          "/whopping-28-gst-online-gaming-nazara-delta-corp-investors-on-edge/",
        destination:
          "https://tradejini.com/blogs/whopping-28-gst-online-gaming-nazara-delta-corp-investors-on-edge",
        permanent: true,
      },
      {
        source: "/why-are-railway-stocks-making-new-highs-everyday/",
        destination:
          "https://tradejini.com/blogs/why-are-railway-stocks-making-new-highs-everyday",
        permanent: true,
      },
      {
        source: "/why-esg-matters-for-indian-businesses-and-investors/",
        destination:
          "https://tradejini.com/blogs/why-esg-matters-for-indian-businesses-and-investors",
        permanent: true,
      },
      {
        source: "/why-is-there-a-need-to-invest-in-stock-market/",
        destination:
          "https://tradejini.com/blogs/why-is-there-a-need-to-invest-in-stock-market",
        permanent: true,
      },
      {
        source: "/why-you-should-start-sips-in-your-20s/",
        destination:
          "https://tradejini.com/blogs/why-you-should-start-sips-in-your-20s",
        permanent: true,
      },
      {
        source: "/will-the-jio-disney-jodi-dominate-indian-content-ahead/",
        destination:
          "https://tradejini.com/blogs/will-the-jio-disney-jodi-dominate-indian-content-ahead",
        permanent: true,
      },
      {
        source: "/withdraw-funds-from-demat-account/",
        destination:
          "https://tradejini.com/blogs/withdraw-funds-from-demat-account",
        permanent: true,
      },
      {
        source:
          "/with-the-indian-union-budget-2024-approaching-indias-political-landscape-buzzes-with-anticipation/",
        destination:
          "https://tradejini.com/blogs/with-the-indian-union-budget-2024-approaching-indias-political-landscape-buzzes-with-anticipation",
        permanent: true,
      },
      {
        source:
          "/you-might-have-come-across-a-lot-of-financial-terms-and-jargon-but-do-you-know-what-they-mean/",
        destination:
          "https://tradejini.com/blogs/you-might-have-come-across-a-lot-of-financial-terms-and-jargon-but-do-you-know-what-they-mean",
        permanent: true,
      },
      {
        source: "/your-portfolio-is-losing-value-so-what-should-you-do/",
        destination:
          "https://tradejini.com/blogs/your-portfolio-is-losing-value-so-what-should-you-do",
        permanent: true,
      },
      {
        source: "/zomato-vs-swiggy-comaprison-of-food-delivery-giants/",
        destination:
          "https://tradejini.com/blogs/zomato-vs-swiggy-comaprison-of-food-delivery-giants",
        permanent: true,
      },
      {
        source: "/flipkart-quick-commerce-valuation-market-impact/",
        destination:
          "https://tradejini.com/blogs/flipkart-quick-commerce-valuation-market-impactt",
        permanent: true,
      },
      {
        source: "/impact-of-the-2024-tax-rule-changes-on-share-buybacks/",
        destination:
          "https://tradejini.com/blogs/impact-of-the-2024-tax-rule-changes-on-share-buybackst",
        permanent: true,
      },
      {
        source:
          "/in-the-mutual-funds-series-we-will-uncover-the-truth-behind-popular-beliefs/",
        destination:
          "https://tradejini.com/blogs/busting-5-common-myths-about-mutual-funds",
        permanent: true,
      },
      {
        source:
          "/chop-chop-we-have-10-minutes-we-will-help-you-select-the-best-mutual-fund-for-you-so-ready-set-go/",
        destination:
          "https://tradejini.com/blogs/unlock-top-mutual-funds-in-just-10-minutes",
        permanent: true,
      },
    ];

    // Remove leading slash
    const path = pathname?.slice(1);

    // Check if path exists in redirects
    const redirect = redirects.find((r) => {
      const source = r.source.toLowerCase();
      const pathToMatch = ("/" + path).toLowerCase();
      return source === pathToMatch;
    });

    if (redirect) {
      // Redirect to destination
      router.push(redirect.destination);
    }
  }, [pathname, router]);

  return <div></div>;
}
