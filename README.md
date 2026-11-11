# Kayton Dean | Finance Projects

Independent finance and quantitative projects: valuation, credit research, market mapping, and bank risk modeling.

**Live site:** https://kaaytondean.github.io/finance-portfolio/

| Project | What it is | Open |
|---|---|---|
| Bank Stress Simulator | Interactive model inspired by Silicon Valley Bank (2023) showing how rate shocks, uninsured deposits, and run speed compound into a liquidity crisis | [Live demo](https://kaaytondean.github.io/finance-portfolio/bank-stress-simulator/) · [Code](bank-stress-simulator/) |
| BDC Research Note (Harborline ER) | Equity research note arguing OBDC's ~29% discount to NAV is overdone given the lowest non-accrual rate in a seven-BDC peer group | [PDF](bdc-research-note/Harborline_ER_BDC_Note.pdf) |
| Sweetgreen DCF | 10-year discounted cash flow model of Sweetgreen (NYSE: SG) with bear/base/bull scenarios, two terminal value methods, sensitivity tables, and takeover premium math | [Excel model](sweetgreen-dcf/Sweetgreen_DCF.xlsx) |
| U.S. Consumer Fintech Market Map | About 40 companies across nine segments, with FY2025 metrics for the largest public players | [Live page](https://kaaytondean.github.io/finance-portfolio/fintech-market-map/) |
| Docebo Valuation | Three-slide valuation of Docebo (Nasdaq: DCBO) after Q3 2026: market-implied multiple, learning software peers, scenarios, and EV/EBITDA cross-check | [PDF](docebo-valuation/Docebo_Valuation.pdf) · [PowerPoint](docebo-valuation/Docebo_Valuation.pptx) |
| U.S. ETF Market Comparison | One-page comparison of BlackRock, Vanguard, and State Street on U.S. ETF assets, share, fees, and flows (November 2026) | [PDF](etf-market-comparison/Asset_Manager_ETF_Comparison.pdf) |

## Project notes

### Bank Stress Simulator
Slider-based scenario model with presets (SVB, Stable, High Rate Shock, Digital Run), a driver breakdown chart, and stress over time. Built with HTML, CSS, JavaScript, and Chart.js. Originally published at [kaaytondean/bank-sheet-stress-simulator](https://github.com/kaaytondean/bank-sheet-stress-simulator).

### BDC Research Note: "BDC Discounts Overdone: OBDC Priced for Credit It Doesn't Have"
Compares ARCC, BXSL, OBDC, MAIN, FSK, TSLX, and GBDC on price to NAV versus non-accruals at fair value using SEC filings. OBDC is the primary idea, GBDC is the secondary candidate, and FSK's discount is judged appropriate. Published October 13, 2026, using Q2 2026 data. Harborline ER is a student project name, not a registered firm.

### Sweetgreen DCF
- Revenue built from restaurant count times revenue per average restaurant
- Stock-based compensation treated as a real expense
- Terminal value uses NOPAT x (1+g) x (1 - g/ROIC) so growth capex isn't capitalized forever
- Exit multiple applied to EBITDA after stock comp, consistent with treating SBC as a real cost
- Funding check shows the opening plan is not self-funded, so the model sizes an equity raise and adds the new shares
- Beta is Blume adjusted from the sourced raw beta; the illiquid Wonder Group preferred stake is haircut rather than counted as cash
- Base case: about $6.35 a share on the primary EBITDA exit multiple method versus a ~$9.10 share price (October 2026); the perpetuity growth method (~$2.64) is shown as a cross-check

### Docebo Valuation
- Base case values Docebo at about $27.61 a share against a $27.53 ex-dividend price (Nov 3, 2026 close of $29.95 less the $2.42 special dividend), so the stock looks fairly priced
- FY2027 scenarios: 8%, 11% and 14% revenue growth at 2.0x, 2.65x (current market multiple) and 3.5x EV/revenue
- Net debt includes the $60M special dividend payable November 30, 2026
- Learning software peers (D2L, Skillsoft, Coursera) trade near 1x revenue on flat to single-digit growth

### U.S. Consumer Fintech Market Map
Segments: neobanks, payments and P2P, BNPL, investing, crypto, credit and lending, budgeting, infrastructure, and insurtech. Includes a metrics table, a revenue comparison, and three takeaways on where the industry is heading. Data as of October 13, 2026, from company earnings releases and filings.

---
*These projects are educational and are not investment advice.*

### U.S. ETF Market Comparison
- Sizes the U.S. ETF market at $15.2T (June 2026), up from $14.28T in February, with the top three issuers holding about 71%
- Vanguard passed BlackRock as the largest U.S. ETF issuer in June 2026 on a 4 bps average fee versus 16 bps
- State Street holds about 13% share, competing on SPY trading liquidity more than on fees
