# Bank Stress Simulator (Inspired by Silicon Valley Bank, 2023)

**Built by:** Kayton Dean  
**Live Demo:** [kaaytondean.github.io/finance-portfolio/bank-stress-simulator](https://kaaytondean.github.io/finance-portfolio/bank-stress-simulator/)

Browser based bank simulator modeling balance sheet vulnerabilities and how they compound into liquidity crises.

## Overview
This interactive simulator models SVB-style bank fragility. Users can adjust interest rate shocks, securities duration, securities holdings relative to equity, uninsured deposit ratios, withdrawal speed, and depositor concentration to see how risk factors compound into liquidity stress.

## Features
- Slider-based scenario modeling with real-time stress score updates
- SVB / Stable / High Rate Shock / Fast Digital Run presets
- Chart showing how many points each channel (solvency, run risk, compounding) adds to the score
- Score history chart that tracks recent changes as you move the sliders

## Model
This is an educational prototype inspired by themes from my high school senior thesis on the Silicon Valley Bank collapse. It is not a regulatory model or investment tool.

**Score = 35 x solvency pressure + 35 x run risk + 30 x (solvency pressure x run risk)**

- **Solvency pressure:** unrealized losses as a share of capital, estimated as duration x rate shock x (securities / equity), capped at 100%
- **Run risk:** uninsured deposit share x (0.6 x withdrawal speed + 0.4 x depositor concentration)
- **Compounding:** the interaction term. Large unrealized losses are survivable if depositors stay; they become fatal when depositors who can run have a reason to

The weights are set by judgment, not estimated from data.

## Tech Stack
- HTML/CSS/JavaScript
- Chart.js

## Run Locally
Open `index.html` in a browser, or use VS Code Live Server.

## Future Work
- Calibrate weights using bank call report data (FFIEC) and failed bank examples (SVB, Signature, First Republic)
- Add scenario replay and exportable reports
- Improve unrealized loss estimates with convexity and AFS versus HTM accounting
