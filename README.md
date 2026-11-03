# Kayton Dean | Finance Projects

Independent finance and quantitative projects: valuation, credit research, market mapping, and bank risk modeling.

**Live site:** https://kaaytondean.github.io/finance-portfolio/

| Project | What it is | Open |
|---|---|---|
| Bank Stress Simulator | Interactive model inspired by Silicon Valley Bank (2023) showing how rate shocks, uninsured deposits, and run speed compound into a liquidity crisis | [Live demo](https://kaaytondean.github.io/finance-portfolio/bank-stress-simulator/) · [Code](bank-stress-simulator/) |
| BDC Research Note (Harborline ER) | Equity research note arguing OBDC's ~29% discount to NAV is overdone given the lowest non-accrual rate in a seven-BDC peer group | [PDF](bdc-research-note/Harborline_ER_BDC_Note.pdf) |
| Sweetgreen DCF | 10-year discounted cash flow model of Sweetgreen (NYSE: SG) with bear/base/bull scenarios, two terminal value methods, sensitivity tables, and takeover premium math | [Excel model](sweetgreen-dcf/Sweetgreen_DCF.xlsx) |
| U.S. Consumer Fintech Market Map | About 40 companies across nine segments, with FY2025 metrics for the largest public players | [Live page](https://kaaytondean.github.io/finance-portfolio/fintech-market-map/) |

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

### U.S. Consumer Fintech Market Map
Segments: neobanks, payments and P2P, BNPL, investing, crypto, credit and lending, budgeting, infrastructure, and insurtech. Includes a metrics table, a revenue comparison, and three takeaways on where the industry is heading. Data as of October 13, 2026, from company earnings releases and filings.

---
*These projects are educational and are not investment advice.*
