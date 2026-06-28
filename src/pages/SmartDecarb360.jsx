import { useEffect, useState } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Database,
  Download,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  LineChart,
  Lock,
  MapPin,
  Rocket,
  Scale,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  X,
  Zap,
} from "lucide-react";

const capabilityCards = [
  {
    title: "Readiness-led sequencing",
    text: "Prioritise the right actions, in the right order, for the greatest emissions and value impact.",
    icon: ClipboardCheck,
    colour: "from-violet-700 to-purple-500",
  },
  {
    title: "Security & resilience built in",
    text: "Role-based access, UK data residency and cyber-physical assurance for connected estates.",
    icon: ShieldCheck,
    colour: "from-blue-600 to-cyan-500",
  },
  {
    title: "Auditable evidence and governance",
    text: "Full audit trails, evidence capture and reporting aligned to UK standards and frameworks.",
    icon: FileText,
    colour: "from-purple-700 to-fuchsia-500",
  },
  {
    title: "Portfolio scenario planning",
    text: "Model multiple pathways, costs and carbon outcomes to make decisions with confidence.",
    icon: BarChart3,
    colour: "from-teal-600 to-cyan-500",
  },
];

const audienceCards = [
  {
    title: "Public Sector",
    text: "Councils and public bodies driving net zero across complex estates.",
    icon: Landmark,
  },
  {
    title: "Commercial Estates",
    text: "Property owners and asset managers optimising value and performance.",
    icon: Building2,
  },
  {
    title: "Education",
    text: "Universities, colleges and schools building low-carbon learning environments.",
    icon: GraduationCap,
  },
  {
    title: "Health",
    text: "NHS trusts and health organisations improving resilience and sustainability.",
    icon: HeartPulse,
  },
  {
    title: "Social Housing & Asset Portfolios",
    text: "Housing providers managing large, diverse housing stock.",
    icon: Home,
  },
];

const whyItMatters = [
  {
    title: "Lower emissions",
    value: "Up to 40%",
    text: "reduction in emissions by 2030",
    icon: Sparkles,
  },
  {
    title: "Reduce risk",
    value: "Up to 30%",
    text: "lower risk of stranded assets and non-compliance",
    icon: ShieldCheck,
  },
  {
    title: "Invest with confidence",
    value: "Up to 25%",
    text: "better capex efficiency through prioritisation",
    icon: Zap,
  },
  {
    title: "Better decisions",
    value: "2–3x",
    text: "faster decision-making with AI-powered insights",
    icon: LineChart,
  },
];

function BDRRLearnMoreModal({ open, onClose }) {
  const [selectedProfile, setSelectedProfile] = useState("legacyEstate");
  const [strategyLens, setStrategyLens] = useState("balanced");
  const [ambition, setAmbition] = useState("phased");

  if (!open) return null;

  const dimensions = [
    {
      key: "energy",
      label: "Energy Efficiency",
      shortLabel: "Energy",
      icon: Zap,
    },
    {
      key: "complexity",
      label: "Installation Complexity",
      shortLabel: "Complexity",
      icon: Settings2,
    },
    {
      key: "impact",
      label: "Net-Zero Impact",
      shortLabel: "Impact",
      icon: Target,
    },
    {
      key: "resilience",
      label: "Cyber & Climate Resilience",
      shortLabel: "Resilience",
      icon: ShieldCheck,
    },
    {
      key: "wellbeing",
      label: "Wellbeing & Safety",
      shortLabel: "Wellbeing",
      icon: HeartPulse,
    },
    {
      key: "data",
      label: "Smart/Data Readiness",
      shortLabel: "Data",
      icon: Database,
    },
    {
      key: "finance",
      label: "Financial Feasibility",
      shortLabel: "Finance",
      icon: Scale,
    },
  ];

  const profiles = {
    legacyEstate: {
      name: "Legacy public estate",
      description:
        "Older buildings with fragmented data, ageing plant and high operational constraints.",
      scores: {
        energy: 3.1,
        complexity: 2.0,
        impact: 3.6,
        resilience: 2.2,
        wellbeing: 2.8,
        data: 1.7,
        finance: 2.6,
      },
    },
    smartCampus: {
      name: "Smart campus",
      description:
        "A connected estate with existing metering, analytics and staged capital planning.",
      scores: {
        energy: 3.8,
        complexity: 3.2,
        impact: 4.1,
        resilience: 3.7,
        wellbeing: 3.6,
        data: 4.4,
        finance: 3.9,
      },
    },
    commercialPortfolio: {
      name: "Commercial portfolio",
      description:
        "Multi-site commercial assets focused on ROI, value protection and tenant outcomes.",
      scores: {
        energy: 3.5,
        complexity: 3.0,
        impact: 3.4,
        resilience: 3.1,
        wellbeing: 3.2,
        data: 3.5,
        finance: 4.2,
      },
    },
    highRiskCritical: {
      name: "High-risk critical site",
      description:
        "A building with higher cyber, climate, supply chain and operational resilience exposure.",
      scores: {
        energy: 3.0,
        complexity: 2.7,
        impact: 3.8,
        resilience: 4.4,
        wellbeing: 3.1,
        data: 3.6,
        finance: 3.0,
      },
    },
  };

  const lensAdjustments = {
    balanced: {
      name: "Balanced",
      description: "Equal emphasis across carbon, resilience, data and finance.",
      adjustments: {},
    },
    climateFirst: {
      name: "Climate-first",
      description: "Prioritises energy savings and net-zero target impact.",
      adjustments: {
        energy: 0.4,
        impact: 0.5,
        finance: -0.1,
      },
    },
    financeFirst: {
      name: "Finance-first",
      description:
        "Prioritises ROI, payback and investable programme sequencing.",
      adjustments: {
        finance: 0.5,
        complexity: 0.2,
        impact: -0.1,
      },
    },
    resilienceFirst: {
      name: "Resilience-first",
      description:
        "Prioritises cyber, climate, operational and supply chain resilience.",
      adjustments: {
        resilience: 0.6,
        data: 0.25,
        wellbeing: 0.15,
      },
    },
  };

  const ambitionAdjustments = {
    quickWins: {
      name: "Quick wins",
      description:
        "Low-disruption actions, controls tuning and short-payback upgrades.",
      adjustments: {
        complexity: 0.35,
        finance: 0.25,
        impact: -0.1,
      },
    },
    phased: {
      name: "Phased pathway",
      description:
        "Balanced programme across data, fabric, controls and capital planning.",
      adjustments: {},
    },
    deepRetrofit: {
      name: "Deep retrofit",
      description:
        "Higher-impact pathway with more complex technical interventions.",
      adjustments: {
        impact: 0.45,
        energy: 0.25,
        complexity: -0.25,
        finance: -0.15,
      },
    },
  };

  const selectedProfileData = profiles[selectedProfile];
  const selectedLens = lensAdjustments[strategyLens];
  const selectedAmbition = ambitionAdjustments[ambition];

  const clampScore = (score) => Math.max(1, Math.min(5, score));

  const adjustedScores = dimensions.reduce((acc, dimension) => {
    const base = selectedProfileData.scores[dimension.key];
    const lensAdjustment = selectedLens.adjustments[dimension.key] || 0;
    const ambitionAdjustment = selectedAmbition.adjustments[dimension.key] || 0;

    acc[dimension.key] = Number(
      clampScore(base + lensAdjustment + ambitionAdjustment).toFixed(1)
    );

    return acc;
  }, {});

  const averageScore =
    dimensions.reduce(
      (sum, dimension) => sum + adjustedScores[dimension.key],
      0
    ) / dimensions.length;

  const classification =
    averageScore >= 4.5
      ? "Platinum"
      : averageScore >= 3.5
      ? "Gold"
      : averageScore >= 2.5
      ? "Silver"
      : averageScore >= 1.5
      ? "Bronze"
      : "Baseline";

  const classificationClass =
    classification === "Platinum"
      ? "bg-violet-100 text-violet-900"
      : classification === "Gold"
      ? "bg-amber-100 text-amber-900"
      : classification === "Silver"
      ? "bg-slate-100 text-slate-900"
      : classification === "Bronze"
      ? "bg-orange-100 text-orange-900"
      : "bg-rose-100 text-rose-900";

  const recommendation =
    classification === "Platinum"
      ? "Ready for automated, predictive optimisation and portfolio-scale delivery."
      : classification === "Gold"
      ? "Strong candidate for integrated smart controls, capital planning and accelerated decarbonisation."
      : classification === "Silver"
      ? "Good candidate for connected analytics, staged investment and targeted retrofit packages."
      : classification === "Bronze"
      ? "Start with data, business case, supply chain and low-disruption preparation work."
      : "Requires foundational assessment before major smart or decarbonisation investment.";

  const radarPoints = dimensions.map((dimension, index) => {
    const angle = -90 + index * (360 / dimensions.length);
    const score = adjustedScores[dimension.key];
    const radius = (score / 5) * 195;
    const x = 250 + radius * Math.cos((Math.PI / 180) * angle);
    const y = 250 + radius * Math.sin((Math.PI / 180) * angle);

    return [x, y];
  });

  const topCards = [
    {
      number: "1",
      title: "What is BDRR?",
      text: "A seven-dimension readiness rating that reveals retrofit opportunity, delivery risk and confidence to act.",
      icon: Building2,
    },
    {
      number: "2",
      title: "How it works",
      text: "Each dimension is scored 1–5, weighted to strategy and translated into a clear readiness profile.",
      icon: Gauge,
    },
    {
      number: "3",
      title: "What it unlocks",
      text: "A practical investment signal that connects technical performance, resilience, data and financial feasibility.",
      icon: LineChart,
    },
  ];

  const innovationCards = [
    {
      title: "Whole-building perspective",
      text: "Balances energy, resilience, wellbeing, data and finance in one readiness view.",
      icon: Building2,
    },
    {
      title: "Customisable to your goals",
      text: "Weightings can reflect finance-first, climate-first or resilience-first priorities.",
      icon: Settings2,
    },
    {
      title: "Actionable sequencing",
      text: "Shows what to do first, what to defer and what needs more evidence.",
      icon: TrendingUp,
    },
    {
      title: "Resilience by design",
      text: "Includes cyber, climate, supply chain and economic risk in decarbonisation planning.",
      icon: ShieldCheck,
    },
    {
      title: "Data-driven intelligence",
      text: "Feeds SmartDecarb360 with readiness signals that improve recommendations over time.",
      icon: Database,
    },
  ];

  const powerPoints = [
    {
      title: "Benchmark & compare",
      text: "Assess buildings and portfolios consistently to understand relative performance.",
      icon: Target,
    },
    {
      title: "Prioritise with confidence",
      text: "Focus on the actions that deliver the greatest value and impact.",
      icon: MapPin,
    },
    {
      title: "Plan, invest and deliver",
      text: "Build robust business cases and secure funding for confident delivery.",
      icon: BarChart3,
    },
    {
      title: "Track and improve",
      text: "Monitor progress and demonstrate impact against targets.",
      icon: ClipboardCheck,
    },
    {
      title: "Aligned to UK context",
      text: "Designed for UK standards, risks and opportunities across the built environment.",
      icon: Rocket,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/70 px-4 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl shadow-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-20 grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            aria-label="Close BDRR information"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6 md:p-8 lg:p-10">
            <div className="max-w-5xl pr-16">
              <h2 className="text-4xl font-black tracking-tight text-[#140633] md:text-4xl">
                BDRR – Building Decarbonisation Readiness Rating
              </h2>

              <p className="mt-3 max-w-4xl text-xl font-semibold leading-8 text-black">
                A 7-dimension framework that assesses, compares and prioritises
                retrofit opportunities.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {topCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-violet-700 text-white shadow-lg shadow-violet-950/20">
                        <span className="text-3xl font-black">
                          {card.number}
                        </span>
                      </div>

                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-violet-800 shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-black text-violet-900">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-[#f4f7ff] via-[#fff7fb] to-[#eef7ff] p-6 shadow-xl shadow-blue-950/10">
                <div className="rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-left shadow-sm backdrop-blur">
                  <h3 className="text-2xl font-black text-violet-900">
                    Live readiness radar
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    The radar shows a seven-point readiness profile shaped by
                    building type, strategy and ambition.
                  </p>
                </div>

                <div className="mt-5">
                  <div className="relative mx-auto h-[590px] w-full max-w-[760px]">
                    <svg viewBox="0 0 500 500" className="h-full w-full">
                      <defs>
                        <linearGradient
                          id="bdrrRadarGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>

                      {[65, 110, 155, 200].map((radius) => (
                        <polygon
                          key={radius}
                          points={Array.from({ length: 7 })
                            .map((_, index) => {
                              const angle = -90 + index * (360 / 7);
                              const x =
                                250 +
                                radius * Math.cos((Math.PI / 180) * angle);
                              const y =
                                250 +
                                radius * Math.sin((Math.PI / 180) * angle);
                              return `${x},${y}`;
                            })
                            .join(" ")}
                          fill="none"
                          stroke="#c7d2fe"
                          strokeWidth="1.5"
                        />
                      ))}

                      {Array.from({ length: 7 }).map((_, index) => {
                        const angle = -90 + index * (360 / 7);
                        const x =
                          250 + 200 * Math.cos((Math.PI / 180) * angle);
                        const y =
                          250 + 200 * Math.sin((Math.PI / 180) * angle);

                        return (
                          <line
                            key={index}
                            x1="250"
                            y1="250"
                            x2={x}
                            y2={y}
                            stroke="#dbeafe"
                            strokeWidth="1"
                          />
                        );
                      })}

                      <polygon
                        points={radarPoints
                          .map(([x, y]) => `${x},${y}`)
                          .join(" ")}
                        fill="url(#bdrrRadarGradient)"
                        opacity="0.23"
                        stroke="url(#bdrrRadarGradient)"
                        strokeWidth="5"
                      />

                      {radarPoints.map(([x, y], index) => (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="8"
                          fill="#ffffff"
                          stroke="url(#bdrrRadarGradient)"
                          strokeWidth="4"
                        />
                      ))}

                      {[1, 2, 3, 4, 5].map((value, index) => (
                        <text
                          key={value}
                          x="258"
                          y={250 - (index + 1) * 37}
                          fontSize="13"
                          fontWeight="800"
                          fill="#581c87"
                        >
                          {value}
                        </text>
                      ))}
                    </svg>

                    {dimensions.map((dimension, index) => {
                      const Icon = dimension.icon;
                      const angle = -90 + index * (360 / dimensions.length);

                      const baseRadius = 232;

                      const customRadiusByKey = {
                        energy: 258,
                        impact: 222,
                        data: 222,
                      };

                      const radius =
                        customRadiusByKey[dimension.key] || baseRadius;

                      const x =
                        250 + radius * Math.cos((Math.PI / 180) * angle);
                      const y =
                        250 + radius * Math.sin((Math.PI / 180) * angle);

                      return (
                        <div
                          key={dimension.key}
                          className="absolute w-32 -translate-x-1/2 -translate-y-1/2 text-center"
                          style={{
                            left: `${(x / 500) * 100}%`,
                            top: `${(y / 500) * 100}%`,
                          }}
                        >
                          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-violet-800 shadow-lg shadow-blue-950/15 ring-1 ring-violet-100">
                            <Icon className="h-7 w-7" />
                          </div>

                          <p className="mt-1.5 text-xs font-black leading-4 text-slate-900">
                            {dimension.shortLabel}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mx-auto mt-4 max-w-3xl rounded-3xl bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                      Current simulated profile
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-black ${classificationClass}`}
                      >
                        {classification}
                      </span>

                      <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-sm">
                        BDRR {averageScore.toFixed(1)} / 5
                      </span>
                    </div>

                    <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-700">
                      {recommendation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-black text-violet-900">
                  Try readiness profiles
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Select a user profile and refine the strategy to see how BDRR
                  changes the readiness view.
                </p>

                <div className="mt-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    Example user profile
                  </p>

                  <div className="mt-3 grid gap-2">
                    {Object.entries(profiles).map(([key, profile]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedProfile(key)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          selectedProfile === key
                            ? "border-violet-500 bg-violet-50 shadow-sm"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <p className="text-sm font-black text-slate-950">
                          {profile.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                          {profile.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Strategy lens
                    </span>

                    <select
                      value={strategyLens}
                      onChange={(event) => setStrategyLens(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 outline-none focus:border-violet-500"
                    >
                      {Object.entries(lensAdjustments).map(([key, lens]) => (
                        <option key={key} value={key}>
                          {lens.name}
                        </option>
                      ))}
                    </select>

                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                      {selectedLens.description}
                    </p>
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Retrofit ambition
                    </span>

                    <select
                      value={ambition}
                      onChange={(event) => setAmbition(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 outline-none focus:border-violet-500"
                    >
                      {Object.entries(ambitionAdjustments).map(
                        ([key, item]) => (
                          <option key={key} value={key}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>

                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                      {selectedAmbition.description}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
              <h3 className="text-2xl font-black text-violet-900">
                Why it’s unique & innovative
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-5">
                {innovationCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className="rounded-2xl bg-violet-50 p-4"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-violet-800 shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h4 className="mt-4 text-base font-black leading-5 text-violet-900">
                        {card.title}
                      </h4>

                      <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                        {card.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-800 via-blue-700 to-pink-500 p-6 text-white shadow-xl shadow-violet-950/20">
              <h3 className="text-2xl font-black">Powering SmartDecarb360</h3>

              <div className="mt-6 grid gap-5 md:grid-cols-5">
                {powerPoints.map((point, index) => {
                  const Icon = point.icon;

                  return (
                    <div
                      key={point.title}
                      className={`text-center ${
                        index > 0
                          ? "md:border-l md:border-white/25 md:pl-5"
                          : ""
                      }`}
                    >
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/10">
                        <Icon className="h-9 w-9 text-white" />
                      </div>

                      <h4 className="mt-4 text-lg font-black">
                        {point.title}
                      </h4>

                      <p className="mt-2 text-sm font-medium leading-6 text-white/86">
                        {point.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SMAMLearnMoreModal({ open, onClose, onRequestDemo }) {
  const [selectedDimension, setSelectedDimension] = useState("energy");
  const [valuePanelOpen, setValuePanelOpen] = useState(false);

  const [dimensionScores, setDimensionScores] = useState({
    energy: 2,
    asset: 2,
    operations: 2,
    data: 2,
    people: 2,
    governance: 2,
    finance: 2,
  });

  if (!open) return null;

  const stages = [
    {
      score: 0,
      title: "Baseline",
      colour: "from-red-500 to-rose-500",
      summary: "Unmeasured, fragmented or ad hoc.",
      cellClass:
        "border-red-200 bg-gradient-to-br from-red-50 to-rose-100 text-red-900 hover:from-red-100 hover:to-rose-200",
      selectedClass:
        "border-red-500 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-950/20",
    },
    {
      score: 1,
      title: "Aware",
      colour: "from-orange-500 to-amber-500",
      summary: "Known, documented or planned.",
      cellClass:
        "border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 text-orange-900 hover:from-orange-100 hover:to-amber-200",
      selectedClass:
        "border-orange-500 bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-950/20",
    },
    {
      score: 2,
      title: "Developing",
      colour: "from-yellow-500 to-amber-400",
      summary: "Structured, standardised or managed.",
      cellClass:
        "border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-100 text-yellow-950 hover:from-yellow-100 hover:to-amber-200",
      selectedClass:
        "border-yellow-500 bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-yellow-950/20",
    },
    {
      score: 3,
      title: "Managed",
      colour: "from-emerald-600 to-green-500",
      summary: "Integrated, proactive and value-driven.",
      cellClass:
        "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-950 hover:from-emerald-100 hover:to-green-200",
      selectedClass:
        "border-emerald-500 bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-md shadow-emerald-950/20",
    },
    {
      score: 4,
      title: "Optimised",
      colour: "from-blue-600 to-sky-500",
      summary: "Predictive, intelligent and optimised.",
      cellClass:
        "border-blue-200 bg-gradient-to-br from-blue-50 to-sky-100 text-blue-950 hover:from-blue-100 hover:to-sky-200",
      selectedClass:
        "border-blue-500 bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md shadow-blue-950/20",
    },
    {
      score: 5,
      title: "Transforming",
      colour: "from-violet-700 to-purple-600",
      summary: "Net zero aligned, adaptive and strategic.",
      cellClass:
        "border-violet-200 bg-gradient-to-br from-violet-50 to-purple-100 text-violet-950 hover:from-violet-100 hover:to-purple-200",
      selectedClass:
        "border-violet-600 bg-gradient-to-br from-violet-700 to-purple-600 text-white shadow-md shadow-violet-950/20",
    },
  ];

  const dimensions = [
    {
      key: "energy",
      title: "Energy & Carbon Performance",
      icon: Sparkles,
      colour: "text-green-600",
      bg: "bg-green-50",
      rows: [
        "Unmeasured",
        "Measured",
        "Monitored",
        "Managed",
        "Optimised",
        "Net Zero Aligned",
      ],
      description:
        "Measure, manage and optimise energy, carbon outcomes and reduction pathways.",
    },
    {
      key: "asset",
      title: "Asset & Infrastructure",
      icon: Building2,
      colour: "text-blue-600",
      bg: "bg-blue-50",
      rows: [
        "Manual / Siloed",
        "Documented",
        "Structured",
        "Integrated",
        "Predictive",
        "Resilient & Adaptive",
      ],
      description:
        "Manage asset health, infrastructure condition, lifecycle value and investment readiness.",
    },
    {
      key: "operations",
      title: "Operations & Maintenance",
      icon: Settings2,
      colour: "text-violet-700",
      bg: "bg-violet-50",
      rows: [
        "Reactive",
        "Planned",
        "Standardised",
        "Proactive",
        "Optimised",
        "Autonomous",
      ],
      description:
        "Standardise, automate and continuously improve operational performance.",
    },
    {
      key: "data",
      title: "Data & Digital",
      icon: Database,
      colour: "text-blue-700",
      bg: "bg-blue-50",
      rows: [
        "Disconnected",
        "Collected",
        "Consolidated",
        "Integrated",
        "Intelligent",
        "AI-Driven",
      ],
      description:
        "Connect, govern and use data to drive intelligence and better decisions.",
    },
    {
      key: "people",
      title: "People & Skills",
      icon: GraduationCap,
      colour: "text-pink-600",
      bg: "bg-pink-50",
      rows: [
        "Basic",
        "Aware",
        "Developing",
        "Competent",
        "Expert",
        "Innovative",
      ],
      description:
        "Build capability, adoption, knowledge and culture for continuous improvement.",
    },
    {
      key: "governance",
      title: "Governance & Risk",
      icon: ShieldCheck,
      colour: "text-orange-600",
      bg: "bg-orange-50",
      rows: [
        "Ad Hoc",
        "Identified",
        "Managed",
        "Assured",
        "Predictive",
        "Adaptive",
      ],
      description:
        "Embed governance, assurance, risk management and compliance into delivery.",
    },
    {
      key: "finance",
      title: "Finance & Value",
      icon: Scale,
      colour: "text-teal-600",
      bg: "bg-teal-50",
      rows: [
        "Cost Focused",
        "Budgeted",
        "Value Aware",
        "Value Driven",
        "Optimised",
        "Strategic Value",
      ],
      description:
        "Make value-driven investment decisions and optimise cost, risk and outcomes.",
    },
  ];

  const stageScoreMap = {
    0: 0,
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
  };

  const updateDimensionScore = (dimensionKey, stageScore) => {
    setSelectedDimension(dimensionKey);
    setDimensionScores((current) => ({
      ...current,
      [dimensionKey]: stageScore,
    }));
  };

  const selectedStage = dimensionScores[selectedDimension] ?? 0;
  const selectedStageData = stages[selectedStage];

  const selectedDimensionData =
    dimensions.find((item) => item.key === selectedDimension) || dimensions[0];

  const selectedDimensionMaturityScore = stageScoreMap[selectedStage];

  const overallMaturityScore = Math.round(
    Object.values(dimensionScores).reduce(
      (total, stageScore) => total + stageScoreMap[stageScore],
      0
    ) / Object.values(dimensionScores).length
  );

  const maturityBand =
    overallMaturityScore >= 85
      ? "Transforming"
      : overallMaturityScore >= 70
      ? "Optimised"
      : overallMaturityScore >= 50
      ? "Managed"
      : overallMaturityScore >= 30
      ? "Developing"
      : overallMaturityScore >= 10
      ? "Aware"
      : "Baseline";

  const valueCards = [
    {
      title: "Lower Carbon",
      text: "Improve efficiency and cut emissions.",
      icon: Sparkles,
      colour: "text-green-400",
    },
    {
      title: "Lower Cost",
      text: "Reduce downtime and operating costs.",
      icon: Scale,
      colour: "text-blue-300",
    },
    {
      title: "Lower Risk",
      text: "Strengthen resilience, compliance and security.",
      icon: ShieldCheck,
      colour: "text-pink-400",
    },
    {
      title: "Higher Value",
      text: "Better decisions. Better outcomes.",
      icon: TrendingUp,
      colour: "text-violet-300",
    },
  ];

  const whyCards = [
    {
      title: "Holistic view",
      text: "Looks across the whole organisation: people, process, data, assets and performance.",
      icon: Target,
    },
    {
      title: "Actionable clarity",
      text: "Clear actions for each dimension and stage to move forward with confidence.",
      icon: ClipboardCheck,
    },
    {
      title: "Measurable impact",
      text: "Quantify improvements in cost, carbon, risk and resilience.",
      icon: BarChart3,
    },
    {
      title: "Future ready",
      text: "Builds capability to adapt, innovate and achieve net zero securely.",
      icon: ShieldCheck,
    },
    {
      title: "Aligned to best practice",
      text: "Informed by industry frameworks and UK standards and policy.",
      icon: FileText,
    },
  ];

  const useCases = [
    {
      title: "Portfolio maturity baselining",
      text: "Compare buildings, services and asset groups using a consistent maturity lens.",
      icon: Building2,
    },
    {
      title: "Decarbonisation roadmap design",
      text: "Translate maturity gaps into staged improvement plans and investment packages.",
      icon: LineChart,
    },
    {
      title: "Capex prioritisation",
      text: "Rank actions by impact, feasibility, cost, risk reduction and delivery readiness.",
      icon: Scale,
    },
    {
      title: "Compliance and evidence planning",
      text: "Identify assurance, testing, reporting and governance actions needed for delivery.",
      icon: ShieldCheck,
    },
    {
      title: "Operational improvement",
      text: "Move from reactive activity to proactive, optimised and automated ways of working.",
      icon: Settings2,
    },
    {
      title: "Skills and adoption planning",
      text: "Understand workforce capability, training needs and change management priorities.",
      icon: GraduationCap,
    },
  ];

  const whatYouGet = [
    "Dimension-by-dimension maturity scoring",
    "Overall compounded SMAM score",
    "Stage profile and gap analysis",
    "Prioritised roadmap actions",
    "Risk, value and compliance evidence",
    "Portfolio report outputs",
  ];

  const gridTemplateColumns = "260px repeat(6, minmax(108px, 0.8fr))";

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/75 px-4 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl shadow-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-30 grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            aria-label="Close SMAM information"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className={`grid transition-all duration-300 ${
              valuePanelOpen
                ? "lg:grid-cols-[minmax(0,2fr)_minmax(500px,1fr)]"
                : "lg:grid-cols-[minmax(0,1fr)_84px]"
            }`}
          >
            <div className="bg-white p-5 md:p-6 lg:p-7">
              <h2 className="pr-16 text-4xl font-black tracking-tight text-[#140633] md:text-4xl">
                SMAM — Smart Maturity Action Matrix
              </h2>

              <p className="mt-2 text-xl font-black leading-8 text-pink-600">
                From insight to action.{" "}
                <span className="text-blue-600">
                  From maturity to measurable impact.
                </span>
              </p>

              <p className="mt-3 max-w-5xl text-base font-semibold leading-7 text-slate-700">
                SMAM maps your organisation’s maturity across seven critical
                dimensions to clear actions that drive better performance,
                lower risk and higher value.
              </p>

              <div className="mt-5 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-4">
                {[
                  {
                    title: "Understand your maturity",
                    text: "Assess where you are across key dimensions.",
                    icon: Target,
                  },
                  {
                    title: "Identify what to do next",
                    text: "Receive clear, prioritised actions to progress.",
                    icon: ClipboardCheck,
                  },
                  {
                    title: "Improve performance",
                    text: "Optimise assets, reduce costs and cut carbon.",
                    icon: TrendingUp,
                  },
                  {
                    title: "Build resilience and confidence",
                    text: "Strengthen compliance, security and future readiness.",
                    icon: ShieldCheck,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`p-5 ${
                        index > 0 ? "border-t md:border-l md:border-t-0" : ""
                      } border-slate-200`}
                    >
                      <div className="grid h-24 w-24 place-items-center rounded-3xl bg-violet-50 text-violet-800 shadow-sm">
                        <Icon className="h-12 w-12" />
                      </div>

                      <h3 className="mt-4 text-base font-black leading-5 text-[#140633]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5">
                <h3 className="text-2xl font-black text-violet-900">
                  The SMAM Framework
                </h3>

                <p className="mt-2 max-w-4xl text-sm font-semibold leading-6 text-slate-600">
                  Seven maturity dimensions assessed across six maturity stages.
                  Select a maturity stage for each dimension to create a
                  compounded SMAM score across the portfolio.
                </p>

                <div className="mt-4 overflow-x-auto rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="min-w-[1060px]">
                    <div
                      className="grid gap-2"
                      style={{ gridTemplateColumns }}
                    >
                      <div className="rounded-2xl bg-slate-950 p-4 text-white">
                        <p className="text-xs font-black uppercase tracking-[0.14em]">
                          Dimension
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-5 text-white/70">
                          Click a cell to set the maturity level for that
                          dimension.
                        </p>
                      </div>

                      {stages.map((stage) => (
                        <button
                          key={stage.score}
                          type="button"
                          onClick={() =>
                            updateDimensionScore(
                              selectedDimension,
                              stage.score
                            )
                          }
                          className={`overflow-hidden rounded-2xl border text-left transition ${
                            selectedStage === stage.score
                              ? "border-violet-700 shadow-lg shadow-violet-950/10"
                              : "border-slate-200 hover:border-violet-300"
                          }`}
                        >
                          <div
                            className={`bg-gradient-to-r ${stage.colour} p-3 text-white`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-2xl font-black">
                                {stage.score}
                              </p>
                              <p className="rounded-full bg-white/18 px-2 py-1 text-[9px] font-black">
                                {stageScoreMap[stage.score]}
                              </p>
                            </div>

                            <p className="mt-1 text-xs font-black">
                              {stage.title}
                            </p>
                          </div>

                          <p className="min-h-[50px] bg-white p-2.5 text-[10px] font-semibold leading-4 text-slate-600">
                            {stage.summary}
                          </p>
                        </button>
                      ))}
                    </div>

                    <div
                      className="mt-2 grid gap-2"
                      style={{ gridTemplateColumns }}
                    >
                      {dimensions.map((dimension) => {
                        const Icon = dimension.icon;
                        const dimensionActive =
                          selectedDimension === dimension.key;
                        const dimensionStage =
                          dimensionScores[dimension.key] ?? 0;

                        return (
                          <div key={dimension.key} className="contents">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedDimension(dimension.key)
                              }
                              className={`grid min-h-[82px] grid-cols-[44px_1fr] items-center gap-3 rounded-2xl border p-4 text-left transition ${
                                dimensionActive
                                  ? "border-violet-600 bg-violet-50 shadow-sm"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                              }`}
                            >
                              <div
                                className={`grid h-11 w-11 place-items-center rounded-2xl ${dimension.bg}`}
                              >
                                <Icon
                                  className={`h-6 w-6 ${dimension.colour}`}
                                />
                              </div>

                              <div>
                                <p className="text-sm font-black leading-5 text-[#140633]">
                                  {dimension.title}
                                </p>
                                <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">
                                  {dimension.description}
                                </p>
                              </div>
                            </button>

                            {dimension.rows.map((cell, index) => {
                              const active =
                                selectedDimension === dimension.key &&
                                dimensionStage === index;

                              const completed = index <= dimensionStage;

                              return (
                                <button
                                  key={`${dimension.key}-${cell}`}
                                  type="button"
                                  onClick={() =>
                                    updateDimensionScore(dimension.key, index)
                                  }
                                  className={`min-h-[82px] rounded-2xl border px-2.5 py-4 text-center text-[11px] font-black leading-5 transition ${
                                    active
                                      ? stages[index].selectedClass
                                      : completed
                                      ? stages[index].cellClass
                                      : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
                                  }`}
                                >
                                  {cell}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 text-xs font-black">
                      <div className="text-red-500">
                        Lower maturity
                        <br />
                        Higher risk
                      </div>

                      <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-violet-700" />

                      <div className="text-violet-700">
                        Higher maturity
                        <br />
                        Higher value
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-900 via-blue-800 to-pink-700 p-5 text-white shadow-xl shadow-violet-950/20">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                      Selected maturity snapshot
                    </p>

                    <div className="mt-4 grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
                      <div
                        className={`grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br ${selectedStageData.colour} text-white shadow-lg shadow-slate-950/25`}
                      >
                        <div className="text-center">
                          <p className="text-5xl font-black">
                            {selectedStageData.score}
                          </p>
                          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-white/80">
                            Stage
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-3xl font-black">
                          {selectedStageData.title}
                        </h4>
                        <p className="mt-1 text-sm font-semibold leading-6 text-white/74">
                          {selectedStageData.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                      <p className="text-sm font-black text-white">
                        {selectedDimensionData.title}
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-white/74">
                        {selectedDimensionData.description}
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white px-4 py-3 text-violet-900">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-violet-600">
                            Dimension score
                          </p>
                          <p className="mt-1 text-3xl font-black">
                            {selectedDimensionMaturityScore}/100
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white px-4 py-3 text-violet-900">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-violet-600">
                            Overall SMAM score
                          </p>
                          <p className="mt-1 text-3xl font-black">
                            {overallMaturityScore}/100
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-black uppercase tracking-[0.14em] text-white/70">
                            Portfolio maturity band
                          </span>
                          <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-violet-900">
                            {maturityBand}
                          </span>
                        </div>

                        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-red-400 via-yellow-300 via-green-400 to-violet-400"
                            style={{ width: `${overallMaturityScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-violet-900">
                    Why SMAM Matters
                  </h3>

                  <div className="mt-4 grid gap-4 md:grid-cols-5">
                    {whyCards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <div
                          key={card.title}
                          className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-800">
                            <Icon className="h-6 w-6" />
                          </div>

                          <h4 className="mt-3 text-sm font-black leading-5 text-violet-900">
                            {card.title}
                          </h4>

                          <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                            {card.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-r from-violet-50 via-blue-50 to-pink-50 p-5 text-center">
                <p className="text-lg font-black text-violet-900">
                  ✦ SMAM turns complexity into a clear roadmap for continuous
                  improvement.
                </p>
              </div>
            </div>

            <aside
              className={`relative overflow-hidden bg-[#080536] text-white transition-all duration-300 ${
                valuePanelOpen
                  ? "p-6 md:p-8 lg:p-8"
                  : "flex min-h-full items-start justify-center p-4"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-bottom opacity-100"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(8,5,54,0.94) 0%, rgba(8,5,54,0.82) 42%, rgba(8,5,54,0.54) 100%), url('/smam-right-pane-bg.png')",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#080536]/70 via-[#080536]/35 to-[#080536]/70" />

              {!valuePanelOpen ? (
                <button
                  type="button"
                  onClick={() => setValuePanelOpen(true)}
                  className="relative z-10 mt-20 flex w-full flex-col items-center gap-4 rounded-3xl border border-white/15 bg-white/5 px-3 py-5 text-center backdrop-blur transition hover:bg-white/10"
                  aria-label="Open SMAM value panel"
                >
                  <Sparkles className="h-7 w-7 text-pink-300" />
                  <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-black tracking-[0.18em] text-white/80">
                    VALUE PANEL
                  </span>
                  <ChevronDown className="-rotate-90 h-5 w-5 text-white/70" />
                </button>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-pink-300" />
                      <h3 className="text-2xl font-black">
                        The Value SMAM Delivers
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setValuePanelOpen(false)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10"
                      aria-label="Collapse SMAM value panel"
                    >
                      <ChevronDown className="-rotate-90 h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {valueCards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <div
                          key={card.title}
                          className="rounded-3xl border border-white/15 bg-[#080536]/45 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-md"
                        >
                          <Icon className={`h-9 w-9 ${card.colour}`} />

                          <h4 className="mt-4 text-base font-black">
                            {card.title}
                          </h4>

                          <p className="mt-2 text-xs font-semibold leading-5 text-white/72">
                            {card.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/15 bg-[#080536]/45 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-md">
                    <h4 className="text-xl font-black">
                      Applicable use cases
                    </h4>

                    <p className="mt-2 text-sm font-semibold leading-6 text-white/64">
                      Where SMAM helps turn maturity evidence into action.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {useCases.map((useCase) => {
                        const Icon = useCase.icon;

                        return (
                          <div
                            key={useCase.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4"
                          >
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-cyan-300">
                              <Icon className="h-5 w-5" />
                            </div>

                            <h5 className="mt-3 text-sm font-black text-white">
                              {useCase.title}
                            </h5>

                            <p className="mt-1 text-xs font-semibold leading-5 text-white/66">
                              {useCase.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/15 bg-[#080536]/45 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-md">
                    <h4 className="text-xl font-black">What You Get</h4>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {whatYouGet.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                          <p className="text-xs font-semibold leading-5 text-white/76">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl bg-white p-3 text-slate-950 shadow-xl">
                      <p className="text-xs font-black text-violet-900">
                        SMAM PORTFOLIO REPORT
                      </p>

                      <img
                        src="/smam-portfolio-report-preview.png"
                        alt="SMAM Portfolio Report preview showing maturity profile, stage distribution, action priorities and maturity action matrix"
                        className="mt-3 w-full rounded-xl object-contain shadow-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onRequestDemo && onRequestDemo();
                    }}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-violet-800 transition hover:bg-white/90"
                  >
                    Request a demo <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestDemoModal({ open, onClose }) {
  const [selectedInterests, setSelectedInterests] = useState([
    "Portfolio overview",
    "BDRR readiness rating",
  ]);
  const [demoFormat, setDemoFormat] = useState("1:1 demo");
  const [urgent, setUrgent] = useState(false);

  if (!open) return null;

  const interestOptions = [
    { label: "Portfolio overview", icon: Building2 },
    { label: "Decarbonisation pathways", icon: LineChart },
    { label: "BDRR readiness rating", icon: Gauge },
    { label: "SMAM framework", icon: BarChart3 },
    { label: "Scenario planning", icon: Target },
    { label: "Investment sequencing", icon: BarChart3 },
    { label: "Reporting & evidence", icon: FileText },
    { label: "Integration / data", icon: Database },
  ];

  const toggleInterest = (label) => {
    setSelectedInterests((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  };

  const demoMinutes =
    selectedInterests.length <= 1 ? 30 : selectedInterests.length <= 3 ? 45 : 60;

  const demoLabel = demoMinutes === 60 ? "1 hour" : `${demoMinutes} min`;

  const sessionFocus =
    selectedInterests.length === 0
      ? "Introductory platform overview"
      : selectedInterests.length === 1
      ? `Focused walkthrough of ${selectedInterests[0]}`
      : selectedInterests.length <= 3
      ? "Targeted walkthrough across selected priority areas"
      : "Full platform walkthrough with prioritised use-case deep dive";

  const summaryItems = [
    selectedInterests.length > 0
      ? `Interested in ${selectedInterests.slice(0, 3).join(", ")}${
          selectedInterests.length > 3 ? " +" : ""
        }`
      : "Interests not selected yet",
    sessionFocus,
    urgent ? "Urgent demo request" : "Preferred date and time requested",
    `${demoFormat} format selected`,
  ];

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/75 px-4 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl shadow-slate-950/40">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur transition hover:bg-white/20"
            aria-label="Close request demo form"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid lg:grid-cols-[1.75fr_0.75fr]">
            <div className="bg-white p-6 md:p-8 lg:p-10">
              <img
                src="/smartdecarb360-popup-logo.png"
                alt="SmartDecarb360"
                className="h-auto w-[280px] max-w-full object-contain"
              />

              <h2 className="mt-4 text-4xl font-black tracking-tight text-[#140633] md:text-5xl">
                Request a tailored demo
              </h2>

              <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-600">
                Tell us what you want to see, when you want to see it and what
                matters most, so we can prepare a focused SmartDecarb360
                walkthrough.
              </p>

              <div className="mt-7 space-y-5">
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-800">
                      <User className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-black text-[#140633]">
                      1. Your details
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Full name *
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jones"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Work email *
                      </span>
                      <input
                        type="email"
                        placeholder="e.g. sarah.jones@yourorg.co.uk"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Organisation *
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. Your Organisation"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Job title *
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. Head of Sustainability"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Phone optional
                      </span>
                      <input
                        type="tel"
                        placeholder="e.g. +44 7700 900123"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-800">
                      <Target className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-black text-[#140633]">
                      2. What would you like to see?
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {interestOptions.map((option) => {
                      const Icon = option.icon;
                      const active = selectedInterests.includes(option.label);

                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => toggleInterest(option.label)}
                          className={`grid min-h-[76px] grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            active
                              ? "border-violet-500 bg-violet-50 shadow-sm"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <Icon
                              className={`h-5 w-5 shrink-0 ${
                                active ? "text-violet-700" : "text-slate-500"
                              }`}
                            />

                            <span className="text-xs font-black leading-4 text-slate-900">
                              {option.label}
                            </span>
                          </div>

                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                              active
                                ? "border-violet-600 bg-violet-600"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {active && (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-800">
                      <Calendar className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-black text-[#140633]">
                      3. Preferred demo timing
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Preferred date
                      </span>
                      <input
                        type="date"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Preferred time
                      </span>
                      <input
                        type="time"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-black text-slate-700">
                        Time zone
                      </span>
                      <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none transition focus:border-violet-500">
                        <option>(GMT) London</option>
                        <option>(CET) Central Europe</option>
                        <option>(EST) Eastern Time</option>
                        <option>(PST) Pacific Time</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <p className="text-xs font-black text-slate-700">
                        Demo format
                      </p>

                      <div className="mt-2 grid gap-3 sm:grid-cols-3">
                        {["1:1 demo", "Team demo", "Executive briefing"].map(
                          (format) => (
                            <button
                              key={format}
                              type="button"
                              onClick={() => setDemoFormat(format)}
                              className={`rounded-xl border px-4 py-3 text-sm font-black transition ${
                                demoFormat === format
                                  ? "border-violet-600 bg-violet-50 text-violet-800"
                                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {format}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUrgent((value) => !value)}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm font-black text-slate-700">
                        We need this urgently
                      </span>

                      <span
                        className={`relative h-7 w-12 rounded-full transition ${
                          urgent ? "bg-violet-700" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                            urgent ? "left-6" : "left-1"
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-800">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-black text-[#140633]">
                      4. Tell us your priorities and challenges
                    </h3>
                  </div>

                  <textarea
                    rows={4}
                    maxLength={500}
                    placeholder="What are your main challenges, goals, audience, buildings or questions?"
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
                  />

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-violet-950/20 transition hover:scale-[1.01]"
                    >
                      Request demo <ArrowRight className="ml-2 h-5 w-5" />
                    </button>

                    <a
                      href="/SmartDecarb360_White_Paper_SmartNetZero.pdf"
                      download
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-violet-300 bg-white px-6 py-4 text-sm font-black text-violet-700 transition hover:bg-violet-50"
                    >
                      Download brochure <Download className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </section>
              </div>
            </div>

            <aside className="relative overflow-hidden bg-[#080536] p-6 text-white md:p-8 lg:p-10">
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(236,72,153,0.25), transparent 28%), radial-gradient(circle at 80% 75%, rgba(37,99,235,0.28), transparent 35%), linear-gradient(145deg, #080536 0%, #12034d 55%, #050221 100%)",
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-pink-300" />
                    <h3 className="text-2xl font-black">
                      Your demo will be tailored around
                    </h3>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                    <p className="text-sm font-black text-white/70">
                      You’re interested in
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedInterests.length > 0 ? (
                        selectedInterests.map((item) => (
                          <span
                            key={item}
                            className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white"
                          >
                            {item}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white/70">
                          Select topics to personalise the demo
                        </span>
                      )}
                    </div>

                    <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                      {summaryItems.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                          <p className="text-sm font-semibold leading-6 text-white/82">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-black">
                          Suggested session
                        </h4>
                        <p className="mt-2 text-sm font-semibold text-white/70">
                          Based on your selections
                        </p>
                      </div>

                      <Clock className="h-7 w-7 text-cyan-300" />
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-[90px_1fr] sm:items-center">
                      <div className="rounded-2xl bg-white p-4 text-center text-violet-900">
                        <p className="text-4xl font-black">{demoMinutes}</p>
                        <p className="text-sm font-black">min</p>
                      </div>

                      <ul className="space-y-2 text-sm font-semibold leading-6 text-white/82">
                        <li>• {demoLabel} recommended session</li>
                        <li>• {sessionFocus}</li>
                        <li>• Q&A and recommended next steps</li>
                        <li>• Suggested attendees and data needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                    <div className="flex items-start gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500">
                        <ShieldCheck className="h-8 w-8 text-white" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white/65">
                          Prepared by
                        </p>
                        <h4 className="text-xl font-black">
                          Smart Net Zero specialists
                        </h4>
                        <p className="mt-2 text-sm font-semibold text-white/70">
                          Expert guidance. Practical outcomes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3 text-white/65">
                    <Lock className="mt-0.5 h-5 w-5 shrink-0" />
                    <p className="text-xs font-semibold leading-5">
                      Your information is secure and will only be used to
                      prepare your demo.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SmartDecarb360({ goToPage, openEnquiryForm }) {

  useEffect(() => {
        document.title = "SmartDecarb360 | Smart Net Zero";
      }, []);

  const [bdrrModalOpen, setBdrrModalOpen] = useState(false);
  const [smamModalOpen, setSmamModalOpen] = useState(false);
  const [requestDemoOpen, setRequestDemoOpen] = useState(false);

  useEffect(() => {
  const modalToOpen = sessionStorage.getItem("smartDecarb360OpenModal");

  if (!modalToOpen) return;

  const normalisedModal = modalToOpen.toLowerCase();

  if (normalisedModal === "bddr" || normalisedModal === "bdrr") {
    setBdrrModalOpen(true);
  }

  if (normalisedModal === "smam") {
    setSmamModalOpen(true);
  }

  sessionStorage.removeItem("smartDecarb360OpenModal");
  }, []);

  const whitePaperLink = "/SmartDecarb360_White_Paper_SmartNetZero.pdf";
  const dashboardLink = "https://smartdecarb360.snzdev.co.uk/#/login";

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={() => setRequestDemoOpen(true)}
       />

      <main id="product">
        <section className="relative overflow-hidden bg-[#080536] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(59,130,246,0.28),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(219,39,119,0.24),transparent_32%)]" />

          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(8,5,54,0.98) 0%, rgba(8,5,54,0.92) 30%, rgba(8,5,54,0.54) 58%, rgba(8,5,54,0.10) 100%), url('/smartdecarb360-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center right",
            }}
          />

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-36 bg-gradient-to-t from-white via-white/70 to-transparent" />

          <div className="relative z-20 mx-auto max-w-7xl px-5 pb-40 pt-20 lg:px-8 lg:pb-48 lg:pt-28">
            <div className="max-w-2xl text-left">
              <div className="flex justify-start">
                <img
                  src="/smartdecarb360-logowhite.png"
                  alt="SmartDecarb360"
                  className="-ml-3 h-auto w-[560px] max-w-full object-contain"
                />
              </div>

              <h1 className="mt-6 max-w-2xl text-3xl font-black leading-tight md:text-4xl">
                Smarter Decarbonisation:
                <br />
                Optimise. Sequence. Deliver.
              </h1>

              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/78">
                The AI-driven building decarbonisation decision engine for
                commercial and public sector estates in the UK.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={dashboardLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:scale-[1.02]"
                >
                  Log In <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <a
                  href={whitePaperLink}
                  download
                  className="inline-flex items-center rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                  Download White Paper <Download className="ml-2 h-5 w-5" />
                </a>
              </div>

              <div className="mt-8 flex max-w-xl flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-white/75">
                {[
                  "AI-powered insights",
                  "Evidence-led decisions",
                  "Built for all estates",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="frameworks"
          className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        >
          <h2 className="text-center text-3xl font-black text-[#180b52]">
            Two proven frameworks. One intelligent platform.
          </h2>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-violet-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-95 transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.28) 100%), url('/bdrr-tile-bg.png')",
                }}
              />

              <div className="relative z-10 flex h-full max-w-xl flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-violet-700">
                    BDRR — Building Decarbonisation Readiness Rating
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    A data-driven assessment of building and portfolio readiness
                    across key dimensions including energy, asset condition,
                    operational performance, governance and risk.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setBdrrModalOpen(true)}
                  className="mt-6 w-fit rounded-xl border border-violet-300 bg-white/80 px-5 py-3 text-sm font-black text-violet-700 shadow-sm backdrop-blur transition hover:bg-violet-50"
                >
                  Learn more <ArrowRight className="ml-2 inline h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-teal-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-95 transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.25) 100%), url('/smam-tile-bg.png')",
                }}
              />

              <div className="relative z-10 flex h-full max-w-xl flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-teal-700">
                    SMAM — Smart Maturity Action Matrix
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    Maps capability maturity to recommended actions, helping
                    organisations understand current readiness, prioritise next
                    steps and sequence practical delivery.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSmamModalOpen(true)}
                  className="mt-6 w-fit rounded-xl border border-teal-300 bg-white/80 px-5 py-3 text-sm font-black text-teal-700 shadow-sm backdrop-blur transition hover:bg-teal-50"
                >
                  Learn more <ArrowRight className="ml-2 inline h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <h2 className="text-center text-3xl font-black text-[#180b52]">
            Powerful capabilities. Practical outcomes.
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capabilityCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${card.colour} text-white`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-violet-900">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <h2 className="text-center text-3xl font-black text-[#180b52]">
            Who it’s for
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {audienceCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Icon className="h-10 w-10 text-violet-700" />

                  <h3 className="mt-4 text-base font-black text-violet-900">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#090536] px-5 py-10 text-white lg:px-8">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(9,5,54,0.94) 0%, rgba(9,5,54,0.78) 45%, rgba(9,5,54,0.92) 100%), url('/why-it-matters-bg.png')",
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-black">Why it matters</h2>

            <p className="mt-2 text-center text-lg font-semibold text-white/72">
              Smarter decisions today. A net zero tomorrow.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-4">
              {whyItMatters.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="text-center">
                    <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-cyan-300/30 bg-white/5">
                      <Icon className="h-12 w-12 text-cyan-300" />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-white/65">
                      {item.title}
                    </p>

                    <p className="mt-1 text-4xl font-black">{item.value}</p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="resources"
          className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
        >
          <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[340px_1fr_300px] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 to-blue-50 p-4 shadow-xl shadow-violet-950/10">
              <img
                src="/smartdecarb360-whitepaper-cover.png"
                alt="Smart Building Decarbonisation in Scotland and Wider UK white paper cover"
                className="mx-auto h-auto w-full max-w-[300px] rounded-2xl object-contain shadow-2xl shadow-slate-950/20"
              />

              <div className="pointer-events-none absolute inset-x-8 bottom-2 h-10 rounded-full bg-slate-950/20 blur-2xl" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Research-led. Practice-proven.
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#180b52]">
                Smart Building Decarbonisation in Scotland & Wider UK
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                Explore the white paper outlining the challenges, opportunities
                and practical frameworks for delivering net zero across the built
                environment.
              </p>

              <a
                href={whitePaperLink}
                download
                className="mt-6 inline-flex items-center rounded-xl border border-violet-300 px-5 py-3 text-sm font-black text-violet-700 transition hover:bg-violet-50"
              >
                Download White Paper <Download className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="space-y-4">
              {[
                "Practical frameworks for real-world estates",
                "Data-driven insight and case evidence",
                "Actionable guidance for decision makers",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-violet-700" />
                  <p className="text-sm font-black text-violet-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-12 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-violet-800 to-blue-700 p-8 text-white shadow-2xl shadow-violet-950/20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl text-left">
                <h2 className="text-3xl font-black">
                  Ready to transform your estate?
                </h2>

                <p className="mt-2 text-white/72">
                  See SmartDecarb360 in action and start making smarter
                  decarbonisation decisions today.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setRequestDemoOpen(true)}
                  className="inline-flex justify-center rounded-xl bg-white px-6 py-4 text-sm font-black text-violet-800"
                >
                  Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <a
                  href={dashboardLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center rounded-xl border border-white/30 px-6 py-4 text-sm font-black text-white"
                >
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BDRRLearnMoreModal
        open={bdrrModalOpen}
        onClose={() => setBdrrModalOpen(false)}
      />

      <SMAMLearnMoreModal
        open={smamModalOpen}
        onClose={() => setSmamModalOpen(false)}
        onRequestDemo={() => setRequestDemoOpen(true)}
      />

      <RequestDemoModal
        open={requestDemoOpen}
        onClose={() => setRequestDemoOpen(false)}
      />
    <SNZFooter goToPage={goToPage} />
    </div>
  );
}