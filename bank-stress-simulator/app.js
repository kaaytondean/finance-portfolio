// ---------- Utilities ----------
function clamp(min, max, x) {
  return Math.max(min, Math.min(max, x));
}

function fmt(n, digits = 1) {
  return Number(n).toFixed(digits);
}

// ---------- Model (SVB-inspired scoring) ----------
// Two channels drive a bank failure:
//   1. Solvency: rate shock x duration gives the price drop on securities; multiplied by
//      securities / equity it gives unrealized losses as a share of capital.
//   2. Run risk: uninsured deposits that can leave quickly and together.
// The interaction term is what makes the risks compound: large losses only become fatal
// when depositors who can run have a reason to run (SVB, March 2023).
const WEIGHTS = { solvency: 35, run: 35, interaction: 30 }; // sum = 100

// Bond price sensitivity approximation: duration 6 years, +2% rates => ~ -12% price.
function estimateDurationLossPct(durationYears, rateShockPct) {
  return clamp(0, 100, durationYears * rateShockPct);
}

function unrealizedLossPctCapital(inputs) {
  return estimateDurationLossPct(inputs.durationYears, inputs.rateShockPct) * inputs.securitiesToCapital;
}

function computeChannels(inputs) {
  const solvency = clamp(0, 1, unrealizedLossPctCapital(inputs) / 100); // 1 = losses wipe out capital
  const u = clamp(0, 1, inputs.uninsuredPct / 100);
  const w = clamp(0, 1, inputs.withdrawalSpeed / 100);
  const c = clamp(0, 1, inputs.concentration / 100);
  const run = u * (0.6 * w + 0.4 * c); // uninsured share, scaled by how fast and how together it can leave
  return {
    solvency: WEIGHTS.solvency * solvency,
    run: WEIGHTS.run * run,
    interaction: WEIGHTS.interaction * solvency * run
  };
}

function computeStressScore(inputs) {
  const ch = computeChannels(inputs);
  return clamp(0, 100, ch.solvency + ch.run + ch.interaction);
}

function classifyStatus(score) {
  if (score < 40) return { label: "Stable", colorVar: "--good" };
  if (score < 70) return { label: "At Risk", colorVar: "--warn" };
  return { label: "Critical", colorVar: "--bad" };
}

function interpretationText(score) {
  if (score < 40) {
    return "Balance-sheet and run dynamics appear resilient in this simplified scenario. Stress factors do not compound fast enough to trigger a run.";
  }
  if (score < 70) {
    return "Multiple risk factors are present. A confidence shock or faster withdrawals could push the bank into a self-reinforcing liquidity spiral.";
  }
  return "Conditions resemble high fragility: rate sensitivity + deposit flight dynamics can accelerate rapidly. Liquidity pressure would likely dominate decision-making.";
}

// ---------- DOM wiring ----------
const el = (id) => document.getElementById(id);

const sliders = {
  rateShock: el("rateShock"),
  uninsured: el("uninsured"),
  duration: el("duration"),
  securities: el("securities"),
  withdrawal: el("withdrawal"),
  concentration: el("concentration")
};

const readInputs = () => ({
  rateShockPct: Number(sliders.rateShock.value),
  uninsuredPct: Number(sliders.uninsured.value),
  durationYears: Number(sliders.duration.value),
  securitiesToCapital: Number(sliders.securities.value),
  withdrawalSpeed: Number(sliders.withdrawal.value),
  concentration: Number(sliders.concentration.value)
});

function syncValueLabels(inputs) {
  el("rateShockVal").textContent = fmt(inputs.rateShockPct, 2) + "%";
  el("uninsuredVal").textContent = fmt(inputs.uninsuredPct, 0) + "%";
  el("durationVal").textContent = fmt(inputs.durationYears, 1);
  el("securitiesVal").textContent = fmt(inputs.securitiesToCapital, 1) + "x";
  el("withdrawalVal").textContent = fmt(inputs.withdrawalSpeed, 0);
  el("concentrationVal").textContent = fmt(inputs.concentration, 0);
}

// ---------- Charts ----------
let stressChart, driversChart;

function initCharts() {
  const stressCtx = el("stressChart");
  const driversCtx = el("driversChart");

  stressChart = new Chart(stressCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Stress score (recent slider changes)",
        data: [],
        tension: 0.25,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 100 }
      }
    }
  });

  driversChart = new Chart(driversCtx, {
    type: "bar",
    data: {
      labels: ["Solvency (unrealized losses)", "Run risk (uninsured deposits)", "Compounding (losses x run risk)"],
      datasets: [{
        label: "Points contributed to stress score",
        data: [0, 0, 0]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 35 }
      }
    }
  });

  // Make charts taller
  stressCtx.parentElement.style.height = "220px";
  driversCtx.parentElement.style.height = "220px";
}

function updateCharts(inputs, score) {
  // Update stress time-series (last 30 points)
  const nowLabel = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  stressChart.data.labels.push(nowLabel);
  stressChart.data.datasets[0].data.push(score);

  if (stressChart.data.labels.length > 30) {
    stressChart.data.labels.shift();
    stressChart.data.datasets[0].data.shift();
  }
  stressChart.update();

  // Points each channel contributes to the score
  const ch = computeChannels(inputs);
  driversChart.data.datasets[0].data = [ch.solvency, ch.run, ch.interaction];
  driversChart.update();
}

// ---------- Presets ----------
function setPreset(p) {
  sliders.rateShock.value = p.rateShockPct;
  sliders.uninsured.value = p.uninsuredPct;
  sliders.duration.value = p.durationYears;
  sliders.securities.value = p.securitiesToCapital;
  sliders.withdrawal.value = p.withdrawalSpeed;
  sliders.concentration.value = p.concentration;
  render(); // refresh UI
}

const presets = {
  svb: {
    rateShockPct: 2.5,
    uninsuredPct: 80,
    durationYears: 6.5,
    securitiesToCapital: 7.5,
    withdrawalSpeed: 85,
    concentration: 85
  },
  stable: {
    rateShockPct: 1.0,
    uninsuredPct: 25,
    durationYears: 3.0,
    securitiesToCapital: 3.0,
    withdrawalSpeed: 25,
    concentration: 30
  },
  rateShock: {
    rateShockPct: 4.5,
    uninsuredPct: 45,
    durationYears: 7.5,
    securitiesToCapital: 4.0,
    withdrawalSpeed: 40,
    concentration: 45
  },
  run: {
    rateShockPct: 2.0,
    uninsuredPct: 70,
    durationYears: 5.5,
    securitiesToCapital: 3.0,
    withdrawalSpeed: 95,
    concentration: 90
  }
};

// ---------- Render loop ----------
function render() {
  const inputs = readInputs();
  syncValueLabels(inputs);

  const score = computeStressScore(inputs);
  el("stressScore").textContent = fmt(score, 1);

  const status = classifyStatus(score);
  const pill = el("statusPill");
  pill.textContent = status.label;
  pill.style.background = `color-mix(in srgb, var(${status.colorVar}) 22%, transparent)`;
  pill.style.borderColor = `color-mix(in srgb, var(${status.colorVar}) 55%, var(--border))`;

  const durLoss = estimateDurationLossPct(inputs.durationYears, inputs.rateShockPct);
  const lossCap = unrealizedLossPctCapital(inputs);
  el("durationLoss").textContent = `~${fmt(durLoss, 1)}% price drop · ${fmt(lossCap, 0)}% of capital`;
  el("interpretation").textContent = interpretationText(score);

  updateCharts(inputs, score);
}

// ---------- Initialization ----------
function attachListeners() {
  Object.values(sliders).forEach((s) => s.addEventListener("input", render));

  el("presetSVB").addEventListener("click", () => setPreset(presets.svb));
  el("presetStable").addEventListener("click", () => setPreset(presets.stable));
  el("presetRateShock").addEventListener("click", () => setPreset(presets.rateShock));
  el("presetRun").addEventListener("click", () => setPreset(presets.run));
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  attachListeners();
  render(); // initial render
});
