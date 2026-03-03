export const tags = [
  "OptionsStrategies",
  "CalendarSpread",
  "ProfitStrategy",
  "CoveredCalls",
  "ProtectivePuts",
  "ShortSelling",
  "Delta",
  "Gamma",
  "Volume",
  "EMA",
  "RSI",
  "ADX",
  "CMP",
  "MACD",
  "RiskManagment",
  "StopLoss",
  "Leverage",
  "RiskManagement",
  "Automation",
  "Portfolio",
  "AssetClasses",
  "Diversification",
  "Strategies",
  "Scalping",
  "Mean",
  "Reversion",
  "GapUp",
  "GapDown",
  "TechnicalAnalysis",
  "SpreadOrder",
  "Intraday",
  "SwingTrading",
  "Rebalancing",
  "TakeProfit",
  "TrailingStopLoss",
  "BasketOrder",
  "FII",
  "DII",
  "ForeignInvestors",
  "Inflation",
  "InterestRates",
  "MonetaryPolicy",
  "FiscalPolicy",
  "Elections",
  "Volatility",
  "Growth",
  "Budget2024",
  "TaxReforms",
  "Startups",
  "Innovation",
  "Manufacturing",
  "Infrastructure",
  "Adani",
  "Hindenburg",
  "SEBI",
  "Railways",
  "Banking",
  "Fintech",
  "Energy",
  "IT",
  "GreenInitiatives",
  "Mergers",
  "Buyback",
  "Profitability",
  "StockSplit",
  "Liquidity",
  "Arbitrage",
  "Hedging",
  "Options",
  "Futures",
  "Equity",
  "Bonds",
  "MutualFunds",
  "ETFs",
  "SIP",
  "EmergencyFund",
  "Shareholders",
  "FixedDeposits",
  "Compounding",
  "Value",
  "Dividends",
  "ROI",
  "Retirement",
  "WealthManagement",
  "Goals",
  "TVM",
  "SwiggyIPO",
  "GMP",
  "EV",
  "Capital",
  "Valuation",
  "Budgeting",
  "Savings",
  "DebtManagement",
  "Education",
  "PublicFunds",
  "PrivateFunds",
  "TaxBenefits",
  "AI",
  "Markets",
  "Investing",
  "Scams",
  "Fraud",
  "Trust",
  "Strategy",
  "Demat",
  "GTT",
  "Orders",
  "Ethics",
  "ITR",
  "Compliance",
  "Investments",
  "Insurance",
  "PPF",
];

export function tagStyles(tag: string) {
  switch (tag) {
    case "OptionsStrategies":
      return "#FF6347"; // Tomato
    case "Delta":
      return "#FFD700"; // Gold
    case "Gamma":
      return "#6A5ACD"; // SlateBlue
    case "Volume":
      return "#1E90FF"; // DodgerBlue
    case "EMA":
      return "#32CD32"; // LimeGreen
    case "RSI":
      return "#FF1493"; // DeepPink
    case "ADX":
      return "#4B0082"; // Indigo
    case "CMP":
      return "#FF4500"; // OrangeRed
    case "MACD":
      return "#00CED1"; // DarkTurquoise
    case "RiskManagement":
      return "#2E8B57"; // SeaGreen
    case "StopLoss":
      return "#8B0000"; // DarkRed
    case "Scalping":
      return "#FF69B4"; // HotPink
    case "Mean Reversion":
      return "#9370DB"; // MediumPurple
    case "GapUp":
      return "#FFA500"; // Orange
    case "GapDown":
      return "#8B4513"; // SaddleBrown
    case "Intraday":
      return "#4682B4"; // SteelBlue
    case "SwingTrading":
      return "#FF7F50"; // Coral
    case "FII":
      return "#20B2AA"; // LightSeaGreen
    case "DII":
      return "#FF4500"; // OrangeRed
    case "Inflation":
      return "#FF6347"; // Tomato
    case "InterestRates":
      return "#8A2BE2"; // BlueViolet
    case "Startups":
      return "#00FA9A"; // MediumSpringGreen
    case "Innovation":
      return "#7B68EE"; // MediumSlateBlue
    case "Banking":
      return "#00BFFF"; // DeepSkyBlue
    case "Fintech":
      return "#DC143C"; // Crimson
    case "Energy":
      return "#FFD700"; // Gold
    case "IT":
      return "#6495ED"; // CornflowerBlue
    case "GreenInitiatives":
      return "#228B22"; // ForestGreen
    case "Mergers":
      return "#8B0000"; // DarkRed
    case "Hedging":
      return "#ADFF2F"; // GreenYellow
    case "Equity":
      return "#FF8C00"; // DarkOrange
    case "Bonds":
      return "#808080"; // Gray
    case "MutualFunds":
      return "#00FF7F"; // SpringGreen
    case "ETFs":
      return "#4682B4"; // SteelBlue
    case "SIP":
      return "#20B2AA"; // LightSeaGreen
    case "Compounding":
      return "#9932CC"; // DarkOrchid
    case "Retirement":
      return "#708090"; // SlateGray
    case "Budgeting":
      return "#FF4500"; // OrangeRed
    case "Savings":
      return "#00CED1"; // DarkTurquoise
    case "DebtManagement":
      return "#8B4513"; // SaddleBrown
    case "TaxBenefits":
      return "#6A5ACD"; // SlateBlue
    case "AI":
      return "#4682B4"; // SteelBlue
    case "Automation":
      return "#7FFF00"; // Chartreuse
    case "Markets":
      return "#FF6347"; // Tomato
    case "Elections":
      return "#FFD700"; // Gold
    case "Demat":
      return "#1E90FF"; // DodgerBlue
    case "Orders":
      return "#FF69B4"; // HotPink
    case "Insurance":
      return "#8A2BE2"; // BlueViolet
    default:
      return "#808080"; // Gray (fallback)
  }
}
