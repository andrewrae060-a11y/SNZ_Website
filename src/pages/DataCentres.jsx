import { useMemo, useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CloudLightning,
  Droplets,
  FileText,
  Gauge,
  Leaf,
  Lock,
  MonitorCog,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  Wind,
  X,
  Zap,
} from "lucide-react";

const ASSUMPTIONS = {
  hoursPerYear: 8760,
  baseYear: 2026,
  electricityPricePerKwh: 0.145,
  annualElectricityPriceIncrease: 0.035,
  gridCarbonKgPerKwh: 0.207,
  annualGridCarbonReduction: 0.045,
  baselinePueBySize: {
    "1 MW IT Load": 1.55,
    "5 MW IT Load": 1.48,
    "10 MW IT Load": 1.42,
    "25 MW IT Load": 1.36,
  },
  targetPueFloor: 1.16,
};

const initiatives = {
  cooling: {
    label: "Upgrade cooling system",
    pueReduction: 0.1,
    waterReduction: 0.12,
    carbonMultiplier: 1,
  },
  analytics: {
    label: "AI monitoring and analytics",
    pueReduction: 0.06,
    waterReduction: 0.04,
    carbonMultiplier: 1,
  },
  heatReuse: {
    label: "Heat reuse and recovery",
    pueReduction: 0.04,
    waterReduction: 0.03,
    carbonMultiplier: 1.2,
  },
  renewables: {
    label: "Renewable energy procurement",
    pueReduction: 0.02,
    waterReduction: 0.02,
    carbonMultiplier: 1.65,
  },
  resilience: {
    label: "Resilience and uptime optimisation",
    pueReduction: 0.045,
    waterReduction: 0.02,
    carbonMultiplier: 0.9,
  },
};

const sizeOptions = {
  "1 MW IT Load": 1,
  "5 MW IT Load": 5,
  "10 MW IT Load": 10,
  "25 MW IT Load": 25,
};

const electricityMix = {
  "UK Grid Average": 1,
  "Renewable-backed supply": 0.35,
  "Mixed supply with PPAs": 0.62,
};

const audienceCards = [
  {
    title: "Colocation Operators",
    text: "Improve efficiency, uptime and customer value across multi-tenant facilities.",
    icon: Server,
  },
  {
    title: "Enterprise Data Centres",
    text: "Run secure, efficient data centres aligned to corporate sustainability goals.",
    icon: Building2,
  },
  {
    title: "Developers & Investors",
    text: "Design future-ready assets with strong ESG and operational performance.",
    icon: BarChart3,
  },
  {
    title: "Consultants & Technology Partners",
    text: "Deliver data-driven insights and trusted advisory for better outcomes.",
    icon: Users,
  },
];

const solutionCards = [
  {
    id: "energy-cooling",
    title: "Energy & Cooling Optimisation",
    text: "Optimise PUE, right-size infrastructure and leverage advanced cooling technologies to reduce energy use.",
    image: "/data-centre-solution-energy.png",
    icon: Zap,
    color: "text-cyan-500",
    modal: {
      eyebrow: "Energy performance",
      title: "Energy & Cooling Optimisation",
      description:
        "Reduce energy overheads, improve cooling effectiveness and optimise power usage across high-density data centre environments.",
      highlights: [
        "PUE improvement roadmap and benchmarking",
        "Cooling system assessment and optimisation",
        "Airflow, containment and thermal risk review",
        "AI-led monitoring and anomaly detection",
      ],
      outcomes: [
        "Reduced energy consumption",
        "Lower operating costs",
        "Improved thermal resilience",
        "Clearer investment priorities",
      ],
      stats: [
        ["PUE Target", "≤1.30"],
        ["Cooling Efficiency", "+12–25%"],
        ["Cost Reduction", "10–20%"],
      ],
    },
  },
  {
    id: "water-resource",
    title: "Water & Resource Strategy",
    text: "Reduce water demand, implement circular water systems and manage resources responsibly.",
    image: "/data-centre-solution-water.png",
    icon: Droplets,
    color: "text-blue-500",
    modal: {
      eyebrow: "Water stewardship",
      title: "Water & Resource Strategy",
      description:
        "Manage water risk, cooling demand and resource efficiency while supporting planning, ESG and operational resilience.",
      highlights: [
        "WUE baseline and improvement roadmap",
        "Cooling technology water-impact review",
        "Rainwater, greywater and closed-loop options",
        "Local water stress and planning risk assessment",
      ],
      outcomes: [
        "Reduced water intensity",
        "Stronger planning evidence",
        "Improved community confidence",
        "Better climate adaptation",
      ],
      stats: [
        ["WUE Target", "≤0.30 L/kWh"],
        ["Water Reduction", "10–35%"],
        ["Resource Risk", "Lower"],
      ],
    },
  },
  {
    id: "resilience-continuity",
    title: "Resilience & Continuity",
    text: "Strengthen power, cooling and network resilience to ensure high availability and business continuity.",
    image: "/data-centre-solution-resilience.png",
    icon: ShieldCheck,
    color: "text-violet-500",
    modal: {
      eyebrow: "Operational resilience",
      title: "Resilience & Continuity",
      description:
        "Assess critical dependencies and strengthen operational resilience across power, cooling, communications, cyber and supply chain risks.",
      highlights: [
        "Power, cooling and network dependency mapping",
        "Business continuity and incident response planning",
        "Scenario testing for outages and climate risks",
        "Supplier and maintenance model assurance",
      ],
      outcomes: [
        "Reduced downtime risk",
        "Stronger recovery planning",
        "Board-ready resilience evidence",
        "Improved operational confidence",
      ],
      stats: [
        ["Uptime Target", "99.99%+"],
        ["Recovery Readiness", "High"],
        ["Risk Visibility", "360°"],
      ],
    },
  },
  {
    id: "carbon-esg",
    title: "Carbon & ESG Reporting",
    text: "Measure, reduce and report carbon emissions with robust ESG and regulatory reporting.",
    image: "/data-centre-solution-carbon.png",
    icon: Leaf,
    color: "text-emerald-500",
    modal: {
      eyebrow: "Carbon visibility",
      title: "Carbon & ESG Reporting",
      description:
        "Turn energy, water and operational performance data into carbon insight, ESG evidence and credible reduction plans.",
      highlights: [
        "Scope 1, 2 and relevant Scope 3 reporting support",
        "Carbon intensity and renewable energy tracking",
        "Customer reporting packs and ESG dashboards",
        "Reduction pathway and investment prioritisation",
      ],
      outcomes: [
        "Clear carbon baseline",
        "Improved ESG reporting",
        "Customer-ready evidence",
        "Credible reduction roadmap",
      ],
      stats: [
        ["Carbon Visibility", "Live"],
        ["Reporting Confidence", "High"],
        ["Reduction Pathway", "Prioritised"],
      ],
    },
  },
];

const helpCards = [
  {
    title: "Plan & Design",
    text: "Sustainable masterplanning, capacity modelling and infrastructure design.",
    icon: ClipboardCheck,
  },
  {
    title: "Strategy & Roadmap",
    text: "Net Zero roadmaps, energy strategies and investment prioritisation.",
    icon: BarChart3,
  },
  {
    title: "Monitor & Optimise",
    text: "Real-time monitoring, analytics and continuous optimisation of performance.",
    icon: MonitorCog,
  },
  {
    title: "Compliance & Assurance",
    text: "Regulatory compliance, standards assurance and independent verification.",
    icon: BadgeCheck,
  },
];

const journeySteps = [
  {
    number: "1",
    title: "Assess",
    text: "Assess current performance, risk and opportunities across energy, water and resilience.",
    icon: ClipboardCheck,
  },
  {
    number: "2",
    title: "Design",
    text: "Co-create solutions and roadmaps tailored to your data centre and business goals.",
    icon: FileText,
  },
  {
    number: "3",
    title: "Optimise",
    text: "Implement solutions and optimise operations for maximum efficiency and impact.",
    icon: RefreshCw,
  },
  {
    number: "4",
    title: "Monitor",
    text: "Continuously monitor, report and improve performance over time.",
    icon: MonitorCog,
  },
];

function SectionLabel({ title, text }) {
  return (
    <div>
      <h2 className="text-2xl font-black leading-tight text-[#07133c]">
        {title}
      </h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-cyan-400" />
      {text && (
        <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
          {text}
        </p>
      )}
    </div>
  );
}

function InsightHub() {
  const metrics = [
    ["PUE", "1.28", "Target: ≤1.40", "Good"],
    ["WUE", "0.28", "L/kWh", "Good"],
    ["Energy Intensity", "412", "kWh/m²/yr", "↓ 6% vs last month"],
    ["Cooling Efficiency", "0.82", "kW/ton", "Good"],
    ["Uptime (MTBF)", "99.99", "% average", "Excellent"],
    ["Renewable Energy Mix", "62%", "of total consumption", "↑ 8% vs last month"],
  ];

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
              Snapshot
            </span>
            <div>
              <h3 className="text-xl font-black text-[#07133c]">
                Overall Performance
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Last updated: June 2026
              </p>
            </div>
          </div>
        </div>

        <Activity className="h-8 w-8 text-cyan-500" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map(([label, value, unit, status]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              {label}
            </p>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-4xl font-black text-cyan-700">{value}</p>
              <p className="pb-1 text-xs font-bold text-slate-500">{unit}</p>
            </div>
            <p className="mt-3 text-xs font-black text-emerald-600">{status}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Carbon Impact
            </p>
            <p className="mt-2 text-4xl font-black text-cyan-700">
              1,245 <span className="text-sm text-slate-500">tCO₂e</span>
            </p>
          </div>

          <div className="h-20 min-w-[260px] flex-1">
            <svg viewBox="0 0 500 100" className="h-full w-full">
              <path
                d="M0 35 C40 20, 60 80, 105 55 C140 35, 165 45, 200 30 C250 8, 260 88, 315 60 C355 40, 365 42, 410 50 C445 56, 460 22, 500 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-cyan-500"
              />
            </svg>
          </div>

          <p className="text-sm font-black text-emerald-600">
            ↓ 12% vs last month
          </p>
        </div>
      </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                    Efficiency Opportunity Map
                </p>
                <h4 className="mt-2 text-xl font-black text-[#07133c]">
                    Highest impact areas this month
                </h4>
                </div>

                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
                SmartX360-ranked
                </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                {
                    label: "Cooling Load",
                    value: 82,
                    status: "High impact",
                    detail: "Optimise chilled water and airflow controls",
                },
                {
                    label: "Power Distribution",
                    value: 64,
                    status: "Medium impact",
                    detail: "Review UPS losses and transformer efficiency",
                },
                {
                    label: "Water Consumption",
                    value: 58,
                    status: "Medium impact",
                    detail: "Reduce WUE through cooling strategy changes",
                },
                {
                    label: "Resilience Risk",
                    value: 76,
                    status: "High impact",
                    detail: "Strengthen cooling and power redundancy planning",
                },
                ].map((item) => (
                <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-[#07133c]">
                        {item.label}
                    </p>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600">
                        {item.status}
                    </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
                        style={{ width: `${item.value}%` }}
                    />
                    </div>

                    <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
                    {item.detail}
                    </p>
                </div>
                ))}
            </div>
            </div>

    </article>
  );
}

function OpportunityEstimator() {
  const [initiative, setInitiative] = useState("cooling");
  const [size, setSize] = useState("10 MW IT Load");
  const [mix, setMix] = useState("UK Grid Average");
  const [year, setYear] = useState("2026");

  const result = useMemo(() => {
  const itMw = sizeOptions[size];
  const baselinePue = ASSUMPTIONS.baselinePueBySize[size];
  const selectedInitiative = initiatives[initiative];

  const implementationYear = Number(year);
  const yearsFromBase = Math.max(0, implementationYear - ASSUMPTIONS.baseYear);

  const adjustedElectricityPrice =
    ASSUMPTIONS.electricityPricePerKwh *
    Math.pow(1 + ASSUMPTIONS.annualElectricityPriceIncrease, yearsFromBase);

  const adjustedGridCarbonKgPerKwh =
    ASSUMPTIONS.gridCarbonKgPerKwh *
    Math.pow(1 - ASSUMPTIONS.annualGridCarbonReduction, yearsFromBase);

  const targetPue = Math.max(
    ASSUMPTIONS.targetPueFloor,
    baselinePue - selectedInitiative.pueReduction
  );

  const annualItKwh = itMw * 1000 * ASSUMPTIONS.hoursPerYear;
  const energySavingsKwh = annualItKwh * (baselinePue - targetPue);
  const energySavingsMwh = energySavingsKwh / 1000;

  const costSavings = energySavingsKwh * adjustedElectricityPrice;

  const carbonSavingsTonnes =
    (energySavingsKwh *
      adjustedGridCarbonKgPerKwh *
      electricityMix[mix] *
      selectedInitiative.carbonMultiplier) /
    1000;

  const waterSavingsM3 =
    annualItKwh * 0.00035 * selectedInitiative.waterReduction;

  return {
    baselinePue,
    targetPue,
    energySavingsMwh,
    costSavings,
    carbonSavingsTonnes,
    waterSavingsM3,
    adjustedElectricityPrice,
    adjustedGridCarbonKgPerKwh,
    yearsFromBase,
  };
}, [initiative, size, mix, year]);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-[#07133c]">
        Opportunity Estimator
      </h3>
      <p className="mt-1 text-sm font-semibold text-slate-500">
        Estimate impact from key initiatives.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs font-black text-slate-700">Initiative</span>
          <select
            value={initiative}
            onChange={(event) => setInitiative(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.entries(initiatives).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Data Centre Size
          </span>
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.keys(sizeOptions).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Electricity Mix
          </span>
          <select
            value={mix}
            onChange={(event) => setMix(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.keys(electricityMix).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Implementation Year
          </span>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {["2026", "2027", "2028", "2029"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
        <p className="text-sm font-black text-[#07133c]">Estimated Savings</p>

        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Annual Energy Savings
            </p>
            <p className="mt-1 text-3xl font-black text-cyan-700">
              {Math.round(result.energySavingsMwh).toLocaleString()}{" "}
              <span className="text-sm">MWh/yr</span>
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Annual Cost Savings
            </p>
            <p className="mt-1 text-3xl font-black text-cyan-700">
              £{Math.round(result.costSavings / 1000).toLocaleString()}k
              <span className="text-sm">/yr</span>
            </p>
          </div>

          <div className="rounded-xl border border-pink-200 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Annual Carbon Reduction
            </p>
            <p className="mt-1 text-3xl font-black text-pink-600">
              {Math.round(result.carbonSavingsTonnes).toLocaleString()}{" "}
              <span className="text-sm">tCO₂e/yr</span>
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Indicative Water Saving
            </p>
            <p className="mt-1 text-3xl font-black text-blue-600">
              {Math.round(result.waterSavingsM3).toLocaleString()}{" "}
              <span className="text-sm">m³/yr</span>
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
          Implementation year adjusts estimated cost savings using assumed electricity
          price escalation and adjusts carbon savings using assumed grid decarbonisation.
          Validate with metered site data before investment decisions.
        </p>
      </div>
    </article>
  );
}

function SolutionModal({ solution, onClose }) {
  if (!solution) return null;

  const Icon = solution.icon;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/15 bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close solution details"
          className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
        >
          <X className="h-7 w-7" />
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] bg-[#06112e] p-8 text-white md:p-10"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(6,17,46,0.98), rgba(6,17,46,0.82), rgba(6,17,46,0.45)), url('${solution.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(236,72,153,0.18),transparent_30%)]" />

          <div className="relative z-10 max-w-3xl">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
              <Icon className="h-9 w-9 text-cyan-300" />
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
              {solution.modal.eyebrow}
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {solution.modal.title}
            </h2>

            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/78">
              {solution.modal.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1fr_0.8fr]">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              What we assess
            </h3>

            <div className="mt-5 space-y-3">
              {solution.modal.highlights.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Client outcomes
            </h3>

            <div className="mt-5 space-y-3">
              {solution.modal.outcomes.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Impact snapshot
            </h3>

            <div className="mt-5 space-y-3">
              {solution.modal.stats.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-black text-cyan-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 text-sm font-black text-white"
            >
              Back to page <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </article>
        </div>
      </div>
    </div>
  );
}

function SolutionCard({ solution, onOpen }) {
  const Icon = solution.icon;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative h-40 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(6,17,46,0.05), rgba(6,17,46,0.35)), url('${solution.image}')`,
        }}
      >
        <div className="absolute bottom-4 left-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/30 bg-white/90 shadow-lg">
          <Icon className={`h-8 w-8 ${solution.color}`} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black leading-tight text-[#07133c]">
          {solution.title}
        </h3>

        <p className="mt-3 min-h-[72px] text-sm font-semibold leading-6 text-slate-600">
          {solution.text}
        </p>

        <button
          type="button"
          onClick={() => onOpen(solution)}
          className="mt-4 inline-flex items-center text-sm font-black text-cyan-700"
        >
          Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function DataCentres({ goToPage, openEnquiryForm }) {

  useEffect(() => {
    document.title = "Data Centres | Smart Net Zero";
  }, []);
  const [activeSolution, setActiveSolution] = useState(null);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="DataCentres"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.86) 34%, rgba(6,17,46,0.42) 68%, rgba(6,17,46,0.10) 100%), url('/data-centres-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_40%_85%,rgba(236,72,153,0.18),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
                Industries &gt; Data Centres
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Data Centres
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/84">
                Plan, operate and optimise data centre infrastructure for
                maximum performance, resilience and sustainability.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#solutions"
                  className="inline-flex items-center rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-black text-[#06112e] shadow-xl transition hover:scale-[1.02]"
                >
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center rounded-2xl border border-cyan-300/40 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                  Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#07193f]/84 shadow-2xl backdrop-blur md:grid-cols-4">
              {[
                [
                  "Energy Optimisation",
                  "Reduce energy use and improve PUE with intelligent systems and analytics.",
                  Zap,
                ],
                [
                  "Water Efficiency",
                  "Minimise water consumption with efficient cooling and smart water strategies.",
                  Droplets,
                ],
                [
                  "Operational Resilience",
                  "Ensure high availability with robust infrastructure and risk-aware operations.",
                  ShieldCheck,
                ],
                [
                  "Sustainable Growth",
                  "Support growth with low-carbon solutions and responsible resource management.",
                  Leaf,
                ],
              ].map(([title, text, Icon], index) => (
                <div
                  key={title}
                  className={`p-6 ${
                    index > 0
                      ? "border-t border-white/10 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <Icon className="h-10 w-10 text-cyan-300" />
                  <h3 className="mt-4 text-base font-black text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/62">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-9 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel title="Who we work with" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {audienceCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-50 text-cyan-700">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 text-lg font-black leading-tight text-[#07133c]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white px-5 py-9 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel
              title="Data Centre Insight Hub"
              text="Real-time visibility and benchmarking to drive smarter, more sustainable operations. Example snapshot of a data centre performance dashboard, showing key metrics, trends and an efficiency opportunity map."
            />

            <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
              <InsightHub />
              <OpportunityEstimator />
            </div>
          </div>
        </section>

        <section
          id="solutions"
          className="border-t border-slate-100 bg-white px-5 py-9 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel title="Key Solutions & Focus Areas" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {solutionCards.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  onOpen={setActiveSolution}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white px-5 py-9 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel title="How We Help" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {helpCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mt-5 text-lg font-black text-[#07133c]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {item.text}
                    </p>

                    <button
                      type="button"
                      onClick={openEnquiryForm}
                      className="mt-5 inline-flex items-center text-sm font-black text-cyan-700"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white px-5 py-9 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel
            title="A Proven Journey to Net Zero"
            text="A practical route from baseline understanding to continuous improvement across energy, water, resilience and carbon."
            />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.10),transparent_26%),radial-gradient(circle_at_88%_74%,rgba(236,72,153,0.10),transparent_28%)]" />

            <div className="relative grid gap-4 md:grid-cols-4">
                {journeySteps.map((step, index) => {
                const Icon = step.icon;

                const styles = [
                    {
                    card: "from-cyan-50 to-white border-cyan-200",
                    number: "from-cyan-500 to-blue-600",
                    icon: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
                    line: "from-cyan-400 to-blue-500",
                    badge: "text-cyan-700 bg-cyan-50 border-cyan-200",
                    },
                    {
                    card: "from-violet-50 to-white border-violet-200",
                    number: "from-violet-500 to-purple-700",
                    icon: "bg-violet-500/10 text-violet-700 border-violet-200",
                    line: "from-violet-400 to-purple-600",
                    badge: "text-violet-700 bg-violet-50 border-violet-200",
                    },
                    {
                    card: "from-pink-50 to-white border-pink-200",
                    number: "from-pink-500 to-rose-600",
                    icon: "bg-pink-500/10 text-pink-700 border-pink-200",
                    line: "from-pink-400 to-rose-600",
                    badge: "text-pink-700 bg-pink-50 border-pink-200",
                    },
                    {
                    card: "from-emerald-50 to-white border-emerald-200",
                    number: "from-emerald-500 to-teal-600",
                    icon: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
                    line: "from-emerald-400 to-teal-600",
                    badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
                    },
                ][index];

                return (
                    <article
                    key={step.title}
                    className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${styles.card} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
                    >
                   <div
                        className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${styles.line}`}
                    />

                    <div className="flex items-center justify-between gap-3">
                        <span
                        className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r ${styles.number} text-sm font-black text-white shadow-lg`}
                        >
                        {step.number}
                        </span>

                        <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${styles.badge}`}
                        >
                        Step {step.number}
                        </span>
                    </div>

                    <div
                        className={`mt-5 grid h-16 w-16 place-items-center rounded-2xl border ${styles.icon}`}
                    >
                        <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 text-xl font-black text-[#07133c]">
                        {step.title}
                    </h3>

                    <p className="mt-3 min-h-[96px] text-sm font-semibold leading-6 text-slate-600">
                        {step.text}
                    </p>

                    <div className="mt-5 rounded-2xl border border-white/70 bg-white/70 p-3">
                        <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                        Focus
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#07133c]">
                        {
                            [
                            "Baseline, risk and opportunity visibility",
                            "Prioritised roadmap and investment logic",
                            "Implementation and performance improvement",
                            "Continuous reporting and optimisation",
                            ][index]
                        }
                        </p>
                    </div>
                    </article>
                );
                })}
            </div>
            </div>
        </div>
        </section>

        <section className="bg-white px-5 pb-16 pt-4 lg:px-8">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl md:p-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.88) 42%, rgba(6,17,46,0.58) 72%, rgba(6,17,46,0.18) 100%), url('/data-centres-cta-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <h2 className="max-w-3xl text-3xl font-black md:text-4xl">
                  Ready to build a smarter, more resilient data centre?
                </h2>

                <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
                  Talk to our experts and get a tailored roadmap for a more
                  efficient and sustainable future.
                </p>
              </div>

              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-black text-[#06112e] transition hover:scale-[1.02]"
              >
                Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
              </button>              
            </div>
          </div>
        </section>
      </main>

      <SolutionModal
        solution={activeSolution}
        onClose={() => setActiveSolution(null)}
      />
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}