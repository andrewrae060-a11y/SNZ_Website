import { useMemo, useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CloudRain,
  Coins,
  Gauge,
  Landmark,
  Leaf,
  Lock,
  MonitorCog,
  PoundSterling,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  Users,
  X,
  Zap,
} from "lucide-react";

const estateTypes = {
  "Mixed Estate": {
    baselineEnergyKwhM2: 185,
    baselineCarbonKgM2: 38,
    baselineCostM2: 32,
  },
  "Civic Offices": {
    baselineEnergyKwhM2: 170,
    baselineCarbonKgM2: 34,
    baselineCostM2: 30,
  },
  "Leisure Centres": {
    baselineEnergyKwhM2: 420,
    baselineCarbonKgM2: 86,
    baselineCostM2: 74,
  },
  "Schools & Community Buildings": {
    baselineEnergyKwhM2: 155,
    baselineCarbonKgM2: 31,
    baselineCostM2: 27,
  },
  "Housing & Regeneration Estate": {
    baselineEnergyKwhM2: 145,
    baselineCarbonKgM2: 29,
    baselineCostM2: 24,
  },
};

const floorAreas = {
  "50,000 m²": 50000,
  "100,000 m²": 100000,
  "250,000 m²": 250000,
  "500,000 m²": 500000,
  "1,000,000 m²": 1000000,
};

const ageProfiles = {
  "Predominantly pre-1960": 1.18,
  "Predominantly 1960–1990": 1.12,
  "Mixed age profile": 1,
  "Predominantly post-2000": 0.84,
};

const investmentScenarios = {
  "Light-touch Optimisation": {
    energyReduction: 0.09,
    costReduction: 0.08,
    carbonReduction: 0.09,
    label: "Controls, scheduling, metering and quick wins",
  },
  "Balanced Retrofit": {
    energyReduction: 0.2,
    costReduction: 0.18,
    carbonReduction: 0.2,
    label: "Targeted fabric, HVAC, BMS and energy upgrades",
  },
  "Deep Decarbonisation": {
    energyReduction: 0.34,
    costReduction: 0.28,
    carbonReduction: 0.36,
    label: "Whole-building retrofit, heat transition and renewables",
  },
  "Smart Infrastructure Programme": {
    energyReduction: 0.24,
    costReduction: 0.24,
    carbonReduction: 0.22,
    label: "Smart controls, analytics, monitoring and security assurance",
  },
};

const audienceCards = [
  {
    title: "Council Leaders",
    text: "Drive strategic decarbonisation and long-term resilience across your estate.",
    icon: Landmark,
  },
  {
    title: "Finance Teams",
    text: "Reduce operational spend and identify cost-saving opportunities.",
    icon: PoundSterling,
  },
  {
    title: "Estates & Facilities",
    text: "Optimise building performance and ensure compliance with regulations.",
    icon: Building2,
  },
  {
    title: "Sustainability Teams",
    text: "Track progress, report impact and achieve net zero targets.",
    icon: Leaf,
  },
  {
    title: "Service Managers",
    text: "Improve service delivery through efficient, resilient infrastructure.",
    icon: Users,
  },
];

const challengeCards = [
  {
    title: "Tight budgets",
    text: "Funding gaps and limited budgets to achieve net zero targets.",
    icon: Coins,
  },
  {
    title: "Ageing estates",
    text: "Diverse and ageing building stock with high retrofit requirements.",
    icon: Building2,
  },
  {
    title: "Rising energy costs",
    text: "Escalating energy costs with increasing demand on public services.",
    icon: Zap,
  },
  {
    title: "Climate resilience",
    text: "Mitigating climate impacts and ensuring service continuity for communities.",
    icon: CloudRain,
  },
  {
    title: "Cyber & security",
    text: "Protecting critical infrastructure and managing cyber risks in IoT systems.",
    icon: Lock,
  },
];

const solutionCards = [
  {
    id: "net-zero-estates",
    title: "Net Zero Estates & Decarbonisation",
    text: "Develop roadmaps, reduce emissions and deliver net zero aligned with your community goals.",
    icon: Leaf,
    image: "/public-sector-solution-net-zero.png",
    colour: "from-emerald-600 to-teal-700",
    modal: {
      title: "Net Zero Estates & Decarbonisation",
      eyebrow: "Sustainability & Net Zero",
      description:
        "Create a practical, prioritised route to lower-carbon public estates, linking building performance, investment readiness and measurable carbon impact.",
      points: [
        "Estate-wide carbon baseline and prioritised retrofit roadmap.",
        "Scope 1, 2 and relevant Scope 3 carbon reporting support.",
        "Building decarbonisation readiness and investment sequencing.",
        "Project pipeline creation for funding, governance and delivery.",
      ],
      outcomes: [
        "Clearer net zero delivery pathway.",
        "Better investment prioritisation.",
        "Measurable emissions reduction.",
      ],
    },
  },
  {
    id: "energy-performance",
    title: "Energy & Building Performance",
    text: "Optimise energy, improve building performance and reduce whole-life costs.",
    icon: Zap,
    image: "/public-sector-solution-energy.png",
    colour: "from-cyan-600 to-blue-700",
    modal: {
      title: "Energy & Building Performance",
      eyebrow: "Smart Energy Management",
      description:
        "Use building data, BMS insights and targeted interventions to reduce waste, cut operating costs and improve comfort across public assets.",
      points: [
        "Energy audits and BMS performance assessments.",
        "Fault detection, diagnostics and operational optimisation.",
        "HVAC, renewables, lighting and controls performance review.",
        "Active KPI monitoring for public estate energy performance.",
      ],
      outcomes: [
        "Reduced energy consumption.",
        "Lower operating spend.",
        "Improved building performance.",
      ],
    },
  },
  {
    id: "resilience-continuity",
    title: "Resilience & Business Continuity",
    text: "Strengthen critical services and ensure continuity through risk-informed planning.",
    icon: ShieldCheck,
    image: "/public-sector-solution-resilience.png",
    colour: "from-violet-600 to-purple-800",
    modal: {
      title: "Resilience & Business Continuity",
      eyebrow: "Operational resilience",
      description:
        "Support local authorities to understand infrastructure dependencies, climate risk, service continuity and operational resilience across essential services.",
      points: [
        "Climate and operational risk assessment for public estates.",
        "Service continuity planning for critical facilities.",
        "Maintenance, downtime and occupant safety improvement planning.",
        "Resilience dashboards and performance monitoring.",
      ],
      outcomes: [
        "Reduced downtime risk.",
        "Stronger service continuity.",
        "Improved public asset resilience.",
      ],
    },
  },
  {
    id: "smart-security",
    title: "Smart Infrastructure Security",
    text: "Secure systems, data and infrastructure with cyber-smart, future-ready solutions.",
    icon: Lock,
    image: "/public-sector-solution-security.png",
    colour: "from-pink-600 to-fuchsia-800",
    modal: {
      title: "Smart Infrastructure Security",
      eyebrow: "OT Security & Resilience",
      description:
        "Embed security-by-design into IoT, OT, BMS and smart infrastructure programmes so public services can innovate safely.",
      points: [
        "IoT/OT and smart building security assessments.",
        "Secure-by-demand procurement and supplier assurance.",
        "Cyber-physical protection for BMS controls and connected assets.",
        "Risk monitoring and future-ready cyber resilience planning.",
      ],
      outcomes: [
        "Reduced cyber-physical risk.",
        "Better supplier assurance.",
        "Secure smart infrastructure adoption.",
      ],
    },
  },
];

const impactStats = [
  {
    value: "20%",
    label: "Average reduction in energy consumption",
    icon: Zap,
  },
  {
    value: "123",
    label: "Tonnes CO₂e avoided per site, per year",
    icon: CloudRain,
  },
  {
    value: "£63K+",
    label: "Average savings identified per site",
    icon: PoundSterling,
  },
  {
    value: "40%",
    label: "Improvement in building performance",
    icon: BarChart3,
  },
];

const journeySteps = [
  {
    number: "1",
    title: "Assess",
    text: "Understand your estate, baseline performance, risks and opportunities using data-led assessment.",
    icon: ClipboardCheck,
  },
  {
    number: "2",
    title: "Prioritise",
    text: "Prioritise interventions using impact, cost, risk and funding readiness.",
    icon: Target,
  },
  {
    number: "3",
    title: "Deliver",
    text: "Design and deliver projects that reduce carbon, cost and risk across your estate.",
    icon: Sparkles,
  },
  {
    number: "4",
    title: "Monitor",
    text: "Continuously monitor performance, measure impact and drive ongoing improvement.",
    icon: MonitorCog,
  },
];

function SectionHeader({ title, text }) {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <h2 className="text-3xl font-black tracking-tight text-[#07133c]">
        {title}
      </h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-cyan-400" />
      {text && (
        <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">
          {text}
        </p>
      )}
    </div>
  );
}

function CouncilEstateOpportunityEstimator({ openEnquiryForm }) {
  const [estateType, setEstateType] = useState("Mixed Estate");
  const [floorArea, setFloorArea] = useState("250,000 m²");
  const [ageProfile, setAgeProfile] = useState("Predominantly 1960–1990");
  const [scenario, setScenario] = useState("Balanced Retrofit");

  const result = useMemo(() => {
    const estate = estateTypes[estateType];
    const area = floorAreas[floorArea];
    const ageFactor = ageProfiles[ageProfile];
    const selectedScenario = investmentScenarios[scenario];

    const baselineEnergy = estate.baselineEnergyKwhM2 * area * ageFactor;
    const baselineCost = estate.baselineCostM2 * area * ageFactor;
    const baselineCarbon = estate.baselineCarbonKgM2 * area * ageFactor;

    return {
      energySavingsKwh: baselineEnergy * selectedScenario.energyReduction,
      costSavings: baselineCost * selectedScenario.costReduction,
      carbonSavingsTonnes:
        (baselineCarbon * selectedScenario.carbonReduction) / 1000,
      scenarioLabel: selectedScenario.label,
      energyReduction: selectedScenario.energyReduction,
      costReduction: selectedScenario.costReduction,
      carbonReduction: selectedScenario.carbonReduction,
    };
  }, [estateType, floorArea, ageProfile, scenario]);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-black text-[#07133c]">
        Council Estate Opportunity Estimator
      </h3>
      <p className="mt-2 text-sm font-semibold text-slate-500">
        Model the indicative impact of smart investment using our SmartX360 engine and services portfolio across your public estate.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-black text-slate-700">Estate Type</span>
          <select
            value={estateType}
            onChange={(event) => setEstateType(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.keys(estateTypes).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Total Floor Area
          </span>
          <select
            value={floorArea}
            onChange={(event) => setFloorArea(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.keys(floorAreas).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Building Age Profile
          </span>
          <select
            value={ageProfile}
            onChange={(event) => setAgeProfile(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.keys(ageProfiles).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-black text-slate-700">
            Investment Scenario
          </span>
          <select
            value={scenario}
            onChange={(event) => setScenario(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-400"
          >
            {Object.keys(investmentScenarios).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 text-center">
            <Leaf className="mx-auto h-9 w-9 text-emerald-600" />
            <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Indicative Carbon Savings
            </p>
            <p className="mt-2 text-3xl font-black text-[#07133c]">
              {Math.round(result.carbonSavingsTonnes).toLocaleString()}
            </p>
            <p className="text-xs font-bold text-slate-500">tCO₂e / year</p>
            <p className="mt-2 text-xs font-black text-emerald-600">
              ~{Math.round(result.carbonReduction * 100)}% reduction
            </p>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-white p-5 text-center">
            <Zap className="mx-auto h-9 w-9 text-violet-600" />
            <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Indicative Energy Savings
            </p>
            <p className="mt-2 text-3xl font-black text-[#07133c]">
              {Math.round(result.energySavingsKwh / 1000).toLocaleString()}
            </p>
            <p className="text-xs font-bold text-slate-500">MWh / year</p>
            <p className="mt-2 text-xs font-black text-emerald-600">
              ~{Math.round(result.energyReduction * 100)}% reduction
            </p>
          </div>

          <div className="rounded-2xl border border-pink-200 bg-white p-5 text-center">
            <PoundSterling className="mx-auto h-9 w-9 text-pink-600" />
            <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-slate-500">
              Indicative Cost Savings
            </p>
            <p className="mt-2 text-3xl font-black text-[#07133c]">
              £{Math.round(result.costSavings).toLocaleString()}
            </p>
            <p className="text-xs font-bold text-slate-500">/ year</p>
            <p className="mt-2 text-xs font-black text-emerald-600">
              ~{Math.round(result.costReduction * 100)}% saving
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
          <p className="text-sm font-black text-[#07133c]">
            Scenario logic: {scenario}
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
            {result.scenarioLabel}. Figures are indicative and should be refined
            using metered energy data, asset condition and site-specific carbon
            factors.
          </p>
        </div>

        <div className="mt-5 flex justify-center">
            <button
                type="button"
                onClick={() => openEnquiryForm && openEnquiryForm()}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-xs font-black text-white shadow-md transition hover:scale-[1.03]"
            >
                Request Full Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </button>
        </div>
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
            backgroundImage: `linear-gradient(90deg, rgba(6,17,46,0.98), rgba(6,17,46,0.80), rgba(6,17,46,0.42)), url('${solution.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.20),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(236,72,153,0.16),transparent_30%)]" />

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

        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1fr_0.85fr]">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              What we support
            </h3>

            <div className="mt-5 space-y-3">
              {solution.modal.points.map((item) => (
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
              Customer outcomes
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
              Best fit for
            </h3>

            <div className="mt-5 space-y-3">
              {[
                "Public estate programmes",
                "Council transformation teams",
                "Funding-ready retrofit pipelines",
                "Smart infrastructure assurance",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4">
                  <p className="text-sm font-black text-[#07133c]">{item}</p>
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
          backgroundImage: `linear-gradient(180deg, rgba(6,17,46,0.05), rgba(6,17,46,0.45)), url('${solution.image}')`,
        }}
      >
        <div
          className={`absolute bottom-4 left-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-r ${solution.colour} text-white shadow-lg`}
        >
          <Icon className="h-8 w-8" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black leading-tight text-[#07133c]">
          {solution.title}
        </h3>

        <p className="mt-3 min-h-[78px] text-sm font-semibold leading-6 text-slate-600">
          {solution.text}
        </p>

        <button
          type="button"
          onClick={() => onOpen(solution)}
          className="mt-4 inline-flex items-center rounded-xl border border-cyan-200 px-4 py-2 text-sm font-black text-cyan-700 transition hover:bg-cyan-50"
        >
          Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function PublicSectorLocalAuthorities({
  goToPage,
  openEnquiryForm,
}) {

  useEffect(() => {
    document.title = "Public Sector & Local Authorities | Smart Net Zero";
  }, []);
  const [activeSolution, setActiveSolution] = useState(null);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="PublicSectorLocalAuthorities"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.88) 34%, rgba(6,17,46,0.48) 68%, rgba(6,17,46,0.16) 100%), url('/public-sector-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_42%_85%,rgba(236,72,153,0.16),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
                Industries &gt; Public Sector & Local Authorities
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Public Sector &
                <span className="block">Local Authorities</span>
              </h1>

              <p className="mt-6 max-w-2xl text-xl font-black leading-8 text-cyan-300">
                Data-led solutions for sustainable, resilient and cost-effective
                public services.
              </p>

              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/84">
                We help councils and public sector organisations achieve net
                zero targets, reduce costs and build resilience across every
                building, asset and community.
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
                  "Lower costs",
                  "Reduce energy use and operational spend.",
                  Leaf,
                ],
                [
                  "Achieve net zero",
                  "Meet carbon reduction targets with confidence.",
                  Target,
                ],
                [
                  "Build resilience",
                  "Strengthen infrastructure and service continuity.",
                  ShieldCheck,
                ],
                [
                  "Better outcomes",
                  "Create healthier, safer communities.",
                  Users,
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

        <section className="bg-white py-10">
          <SectionHeader title="Who we work with" />

          <div className="mx-auto mt-6 max-w-7xl px-5 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-0 md:grid-cols-5">
                {audienceCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className={`p-6 text-center ${
                        index > 0
                          ? "border-t border-slate-200 md:border-l md:border-t-0"
                          : ""
                      }`}
                    >
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-50 text-cyan-700">
                        <Icon className="h-8 w-8" />
                      </div>

                      <h3 className="mt-5 text-lg font-black text-[#07133c]">
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
          </div>
        </section>

        <section className="bg-white py-10">
          <SectionHeader title="Key challenges facing local authorities" />

          <div className="mx-auto mt-6 max-w-7xl px-5 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-0 md:grid-cols-5">
                {challengeCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className={`p-6 ${
                        index > 0
                          ? "border-t border-slate-200 md:border-l md:border-t-0"
                          : ""
                      }`}
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-700">
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mt-5 text-base font-black text-[#07133c]">
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
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#06112e] via-violet-950 to-[#06235a] p-8 text-white shadow-xl">
              <h2 className="text-3xl font-black text-cyan-200">
                Real Impact. Real Results.
              </h2>

              <p className="mt-3 text-sm font-semibold text-white/72">
                How we deliver measurable outcomes for councils and public sector
                organisations.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-4">
                {impactStats.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.label}
                      className={`flex items-center gap-4 ${
                        index > 0
                          ? "border-t border-white/15 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0"
                          : ""
                      }`}
                    >
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-cyan-300">
                        <Icon className="h-8 w-8" />
                      </div>

                      <div>
                        <p className="text-4xl font-black text-cyan-300">
                          {item.value}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-white/80">
                          {item.label}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <SectionHeader
            title="Council Estate Opportunity Estimator"
            text="Use the estimator to model indicative savings from retrofit, energy optimisation and smart infrastructure investment."
          />

          <div className="mx-auto mt-6 max-w-7xl px-5 lg:px-8">
            <CouncilEstateOpportunityEstimator openEnquiryForm={openEnquiryForm} />
          </div>
        </section>

        <section id="solutions" className="bg-white py-10">
          <SectionHeader title="Key Solutions & Focus Areas" />

          <div className="mx-auto mt-6 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {solutionCards.map((solution) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                onOpen={setActiveSolution}
              />
            ))}
          </div>
        </section>

        <section className="bg-white py-10">
          <SectionHeader
            title="A Practical Journey for Smarter Public Estates"
            text="A structured route from assessment through to continuous monitoring and improvement."
          />

          <div className="mx-auto mt-6 max-w-7xl px-5 lg:px-8">
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
                    },
                    {
                      card: "from-violet-50 to-white border-violet-200",
                      number: "from-violet-500 to-purple-700",
                      icon: "bg-violet-500/10 text-violet-700 border-violet-200",
                    },
                    {
                      card: "from-pink-50 to-white border-pink-200",
                      number: "from-pink-500 to-rose-600",
                      icon: "bg-pink-500/10 text-pink-700 border-pink-200",
                    },
                    {
                      card: "from-emerald-50 to-white border-emerald-200",
                      number: "from-emerald-500 to-teal-600",
                      icon: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
                    },
                  ][index];

                  return (
                    <article
                      key={step.title}
                      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${styles.card} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
                    >
                      <div
                        className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${styles.number}`}
                      />

                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r ${styles.number} text-sm font-black text-white shadow-lg`}
                        >
                          {step.number}
                        </span>

                        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-slate-600">
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

                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                        {step.text}
                      </p>
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
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.88) 42%, rgba(6,17,46,0.58) 72%, rgba(6,17,46,0.18) 100%), url('/public-sector-cta-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="max-w-3xl text-3xl font-black md:text-4xl">
                  Start your net zero journey today.
                </h2>

                <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
                  Partner with Smart Net Zero to build a smarter, more
                  sustainable and cost-effective future for your community.
                </p>
              </div>

              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black text-[#07133c] transition hover:scale-[1.02]"
              >
                Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="relative z-10 mt-8 grid gap-3 border-t border-white/15 pt-5 text-sm font-bold text-white/76 md:grid-cols-4">
              {[
                "No obligation consultation",
                "Tailored to your council’s needs",
                "Actionable insights",
                "Proven results",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  {item}
                </div>
              ))}
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