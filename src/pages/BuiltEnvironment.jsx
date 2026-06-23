
import { useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Download,
  Factory,
  Gauge,
  Leaf,
  LineChart,
  Lock,
  Network,
  PlugZap,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";

const compatibleServices = [
  {
    title: "Sustainability & Net Zero",
    text: "Reduce emissions, plan decarbonisation pathways and strengthen ESG reporting.",
    icon: Leaf,
    page: "SustainabilityNetZero",
    colour: "text-emerald-300",
  },
  {
    title: "OT Security & Resilience",
    text: "Secure building systems, BMS, IoT, controls and connected infrastructure.",
    icon: ShieldCheck,
    page: "OTSecurityResilience",
    colour: "text-violet-300",
  },
  {
    title: "Smart Energy Management",
    text: "Optimise building performance, reduce waste and improve operational efficiency.",
    icon: Zap,
    page: "SustainabilityNetZero",
    colour: "text-cyan-300",
  },
  {
    title: "Smart Regulations & Compliance",
    text: "Manage connected-device assurance, cyber obligations and reporting requirements.",
    icon: ClipboardCheck,
    page: "SmartRegulations",
    colour: "text-pink-300",
  },
];

const audienceCards = [
  {
    title: "Building Owners & Operators",
    text: "Operate efficiently, reduce costs and achieve net zero across portfolios.",
    icon: Building2,
  },
  {
    title: "Developers & Investors",
    text: "Design for performance and future-proof assets to maximise value.",
    icon: Factory,
  },
  {
    title: "Public Sector & Communities",
    text: "Create resilient, inclusive and low-carbon places and services.",
    icon: ShieldCheck,
  },
  {
    title: "BMS Providers & Consultants",
    text: "Deliver smarter solutions, stronger assurance and measurable client outcomes.",
    icon: Cpu,
  },
];

const useCases = [
  {
    id: "office",
    label: "Office",
    icon: Building2,
    energyIntensity: 245,
    optimisationPotential: 0.22,
    tariff: 0.24,
    summary:
      "Improve energy performance, comfort and operational visibility across commercial office portfolios.",
    challenge:
      "Office estates often have inconsistent BMS settings, out-of-hours energy waste, HVAC inefficiencies and limited portfolio-wide performance visibility.",
    solution:
      "SNZ connects building data, energy use, controls, occupancy and carbon information to identify quick wins, prioritise retrofit actions and support ongoing optimisation.",
    outcomes: [
      "Reduce unnecessary out-of-hours plant operation",
      "Improve HVAC scheduling and zoning",
      "Identify poor-performing assets across the estate",
      "Create evidence for carbon and cost reduction reporting",
    ],
    example:
      "A multi-site office portfolio can use SmartX360 to compare asset performance, prioritise the worst-performing buildings and track savings from control optimisation.",
  },
  {
    id: "residential",
    label: "Residential",
    icon: Building2,
    energyIntensity: 160,
    optimisationPotential: 0.18,
    tariff: 0.22,
    summary:
      "Support lower-carbon housing, safer building systems and better resident outcomes.",
    challenge:
      "Residential portfolios can face fragmented asset data, ageing heating systems, fabric performance issues and limited insight into prioritised retrofit pathways.",
    solution:
      "SNZ helps assess portfolio readiness, model retrofit scenarios and prioritise interventions based on carbon, cost, comfort and operational risk.",
    outcomes: [
      "Prioritised retrofit planning",
      "Improved heating and controls strategy",
      "Better asset-level carbon visibility",
      "Stronger evidence for funding and investment cases",
    ],
    example:
      "A housing provider can identify which buildings should be prioritised for fabric upgrades, heating improvements or smart monitoring based on impact and deliverability.",
  },
  {
    id: "retail",
    label: "Retail",
    icon: Building2,
    energyIntensity: 310,
    optimisationPotential: 0.20,
    tariff: 0.25,
    summary:
      "Optimise shopping centres and retail estates where comfort, trading hours and energy use are closely linked.",
    challenge:
      "Retail environments often have long operating hours, landlord and tenant energy splits, complex HVAC loads and high lighting demand.",
    solution:
      "SNZ combines building performance data, operational patterns and energy insight to identify opportunities across common areas, plant rooms and tenant interfaces.",
    outcomes: [
      "Lower common-area energy consumption",
      "Improved plant scheduling",
      "Better landlord reporting and tenant engagement",
      "Clearer investment decisions for controls and retrofit",
    ],
    example:
      "A shopping centre can use SmartX360 to detect inefficient operating schedules, assess common-area loads and build a business case for smart controls upgrades.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: ShieldCheck,
    energyIntensity: 420,
    optimisationPotential: 0.16,
    tariff: 0.23,
    summary:
      "Strengthen resilience, compliance and energy performance across critical healthcare estates.",
    challenge:
      "Healthcare buildings are energy intensive, operationally critical and require careful balancing of efficiency, resilience, safety and continuity.",
    solution:
      "SNZ supports estate teams with risk-led optimisation, resilience assessment, smart monitoring and prioritised investment planning.",
    outcomes: [
      "Improved resilience of critical building systems",
      "Better visibility of energy and operational risk",
      "Prioritised capital planning",
      "Reduced avoidable energy waste without compromising safety",
    ],
    example:
      "A healthcare estate can identify high-energy buildings, evaluate resilience risks and prioritise interventions that protect continuity while reducing emissions.",
  },
  {
    id: "education",
    label: "Education",
    icon: ClipboardCheck,
    energyIntensity: 190,
    optimisationPotential: 0.19,
    tariff: 0.22,
    summary:
      "Help schools, colleges and universities reduce energy demand while improving learning environments.",
    challenge:
      "Education estates often include mixed-age buildings, variable occupancy, limited energy analytics and constrained capital budgets.",
    solution:
      "SNZ helps establish a trusted baseline, identify no-regret optimisation actions and build phased decarbonisation plans.",
    outcomes: [
      "Better campus-wide energy visibility",
      "Clearer retrofit prioritisation",
      "Improved comfort and operating performance",
      "Evidence for funding and sustainability reporting",
    ],
    example:
      "A university campus can use SmartX360 to compare buildings, prioritise controls optimisation and plan phased retrofit activity.",
  },
  {
    id: "hospitality",
    label: "Hospitality",
    icon: Building2,
    energyIntensity: 360,
    optimisationPotential: 0.21,
    tariff: 0.26,
    summary:
      "Improve energy performance across hotels, leisure and hospitality assets without impacting guest experience.",
    challenge:
      "Hospitality assets typically have long operating hours, high hot water demand, comfort requirements and fluctuating occupancy.",
    solution:
      "SNZ identifies opportunities across HVAC, hot water, lighting, controls and occupancy-led optimisation.",
    outcomes: [
      "Reduced energy cost per occupied room",
      "Improved HVAC and hot water control",
      "Better monitoring of comfort and performance",
      "Clearer investment cases for efficiency upgrades",
    ],
    example:
      "A hotel operator can model savings from smart controls, plant optimisation and improved operating schedules across multiple sites.",
  },
  {
    id: "industrial",
    label: "Industrial",
    icon: Factory,
    energyIntensity: 280,
    optimisationPotential: 0.15,
    tariff: 0.21,
    summary:
      "Support efficient, resilient and secure industrial buildings and operational environments.",
    challenge:
      "Industrial sites can combine building energy, process loads, OT systems, production constraints and operational resilience risks.",
    solution:
      "SNZ connects energy, asset and operational data to identify efficiency opportunities while considering operational continuity and OT security.",
    outcomes: [
      "Improved operational energy visibility",
      "Reduced avoidable consumption",
      "Better OT and building system resilience",
      "Prioritised investment decisions",
    ],
    example:
      "An industrial estate can use SNZ insight to separate building loads from process loads and identify practical efficiency actions.",
  },
  {
    id: "mixed-use",
    label: "Mixed-Use",
    icon: Network,
    energyIntensity: 260,
    optimisationPotential: 0.20,
    tariff: 0.24,
    summary:
      "Create better visibility across complex mixed-use developments with multiple systems, tenants and operating profiles.",
    challenge:
      "Mixed-use assets often have fragmented metering, shared services, varied occupancy patterns and complex responsibility boundaries.",
    solution:
      "SNZ provides a structured view of building performance, shared systems, carbon opportunities and investment priorities.",
    outcomes: [
      "Improved landlord and tenant performance insight",
      "Better shared-system optimisation",
      "Clearer carbon reporting boundaries",
      "Prioritised improvement roadmap",
    ],
    example:
      "A mixed-use development can use SmartX360 to compare office, retail and residential zones and identify shared plant optimisation opportunities.",
  },
  {
    id: "public",
    label: "Public Buildings",
    icon: Building2,
    energyIntensity: 230,
    optimisationPotential: 0.19,
    tariff: 0.23,
    summary:
      "Help public estates become more efficient, resilient and transparent in their route to net zero.",
    challenge:
      "Public buildings often face budget constraints, ageing assets, compliance pressure and the need to demonstrate social and environmental value.",
    solution:
      "SNZ supports baseline assessment, opportunity modelling, investment prioritisation and progress reporting.",
    outcomes: [
      "Prioritised public estate decarbonisation",
      "Improved building performance transparency",
      "Better capital planning evidence",
      "Measurable carbon and cost reduction reporting",
    ],
    example:
      "A council estate can identify which buildings offer the strongest carbon, cost and resilience returns from targeted interventions.",
  },
];

const portfolioSizes = [
  {
    id: "small",
    label: "25,000 – 50,000 m²",
    area: 37500,
  },
  {
    id: "medium",
    label: "50,000 – 100,000 m²",
    area: 75000,
  },
  {
    id: "large",
    label: "100,000 – 250,000 m²",
    area: 175000,
  },
  {
    id: "enterprise",
    label: "250,000+ m²",
    area: 300000,
  },
];

const maturityLevels = [
  {
    id: "early",
    label: "Early stage",
    multiplier: 1.15,
  },
  {
    id: "developing",
    label: "Developing",
    multiplier: 1,
  },
  {
    id: "advanced",
    label: "Advanced",
    multiplier: 0.78,
  },
];

function calculateBuiltEnvironmentEstimate({
  useCaseId,
  portfolioSizeId,
  maturityId,
}) {
  const useCase = useCases.find((item) => item.id === useCaseId) || useCases[0];
  const size =
    portfolioSizes.find((item) => item.id === portfolioSizeId) ||
    portfolioSizes[2];
  const maturity =
    maturityLevels.find((item) => item.id === maturityId) || maturityLevels[1];

  // Indicative calculation:
  // baseline energy = floor area × benchmark annual energy intensity
  // energy saving = baseline energy × optimisation potential × maturity multiplier
  // carbon saving = energy saving × indicative UK electricity emissions factor
  // cost saving = energy saving × indicative commercial tariff
  //
  // Values are intended for website estimation only and should be replaced
  // with verified site data during assessment.

  const annualBaselineEnergy = size.area * useCase.energyIntensity;
  const energySavingsKwh =
    annualBaselineEnergy * useCase.optimisationPotential * maturity.multiplier;

  const carbonFactorKgCO2ePerKwh = 0.207;
  const carbonSavingsTCO2e =
    (energySavingsKwh * carbonFactorKgCO2ePerKwh) / 1000;

  const costSavings = energySavingsKwh * useCase.tariff;

  return {
    useCase,
    size,
    maturity,
    energySavingsGwh: energySavingsKwh / 1_000_000,
    carbonSavingsTCO2e,
    costSavings,
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

const approachSteps = [
  {
    step: "1",
    title: "Assess the estate baseline",
    text: "Benchmark assets, energy use, emissions and performance.",
    icon: Search,
  },
  {
    step: "2",
    title: "Connect systems and data",
    text: "Integrate BMS, IoT and data sources for a trusted view.",
    icon: Network,
  },
  {
    step: "3",
    title: "Analyse performance and risk",
    text: "Use analytics and AI to find inefficiencies and opportunities.",
    icon: LineChart,
  },
  {
    step: "4",
    title: "Prioritise optimisation and retrofit actions",
    text: "Rank actions by impact, cost and carbon to build your roadmap.",
    icon: Target,
  },
  {
    step: "5",
    title: "Deliver improvements and automation",
    text: "Implement projects, automate operations and optimise settings.",
    icon: SlidersHorizontal,
  },
  {
    step: "6",
    title: "Monitor, report and continuously improve",
    text: "Track outcomes, report impact and refine for ongoing gains.",
    icon: BarChart3,
  },
];

const tools = [
  {
    title: "BDRR",
    text: "Portfolio and building decarbonisation decision support and prioritisation.",
    cta: "Explore BDDR",
    page: "SmartDecarb360",
    modal: "bdrr",
    stat: "↓ 36%",
    label: "Potential Carbon Reduction",
    image: "/built-env-tool-bddr.png",
  },
  {
    title: "SMAM",
    text: "Smart monitoring, asset management and real-time operational visibility.",
    cta: "Explore SMAM",
    page: "SmartDecarb360",
    modal: "smam",
    stat: "24/7",
    label: "Operational Insight",
    image: "/built-env-tool-smam.png",
  },
  {
    title: "Smart Decarb360",
    text: "Scenario modelling, planning and optimisation decisions for your net zero roadmap.",
    cta: "Explore Smart Decarb360",
    page: "SmartDecarb360",
    stat: "2040",
    label: "Net Zero Pathway",
    image: "/built-env-tool-decarb360.png",
  },
  {
    title: "Carbon Reporting",
    text: "Carbon measurement, emissions reporting and stakeholder-ready progress insight.",
    cta: "Explore Carbon Reporting",
    external: "https://www.co2impact.co.uk/",
    stat: "12,540",
    label: "tCO₂e tracked",
    image: "/built-env-tool-carbon-reporting.png",
  },
];

const resources = [
  {
    tag: "Live Case",
    title: "Multi-Site Office Portfolio",
    text: "Optimised HVAC scheduling and controls across 24 buildings.",
    metrics: ["18% Energy Savings", "2,100 tCO₂e/yr", "£450K Annual Savings"],
  },
  {
    tag: "Use Case",
    title: "University Campus",
    text: "Integrated data platform and automation across an academic estate.",
    metrics: ["23% Energy Savings", "1,850 tCO₂e/yr", "£380K Annual Savings"],
  },
  {
    tag: "Resource",
    title: "Retrofit Playbook",
    text: "Step-by-step guide to prioritising retrofits with highest impact.",
    cta: "Download Guide",
  },
  {
    tag: "Resource",
    title: "Regulation & Reporting Hub",
    text: "Stay ahead of building regulations, connected-device risk and ESG reporting.",
    cta: "Explore Hub",
  },
  {
    tag: "Resource",
    title: "Benchmarking Report",
    text: "See how your portfolio compares to similar asset classes.",
    cta: "View Report",
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
        <p className="mt-4 max-w-xs text-sm font-semibold leading-6 text-slate-600">
          {text}
        </p>
      )}
    </div>
  );
}

function UseCaseModal({ useCase, onClose }) {
  if (!useCase) return null;

  const Icon = useCase.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/15 bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close use case"
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-slate-950/10 text-slate-900 transition hover:bg-slate-950/20"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative overflow-hidden rounded-t-[2rem] bg-[#06112e] p-8 text-white md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(168,85,247,0.18),transparent_30%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative z-10 max-w-3xl">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
              <Icon className="h-9 w-9 text-cyan-300" />
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
              Built Environment Use Case
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight">
              {useCase.label}
            </h2>

            <p className="mt-4 text-lg font-semibold leading-8 text-white/76">
              {useCase.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">Challenge</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              {useCase.challenge}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">SNZ Solution</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              {useCase.solution}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">Example</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              {useCase.example}
            </p>
          </article>
        </div>

        <div className="px-6 pb-8 md:px-8">
          <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Potential outcomes
            </h3>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {useCase.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex gap-3 rounded-2xl border border-cyan-100 bg-white p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function safeGo(goToPage, page) {
  if (goToPage && page) goToPage(page);
}

export default function BuiltEnvironment({ goToPage, openEnquiryForm }) {
  useEffect(() => {
    document.title = "Built Environment | Smart Net Zero";
  }, []);

  const [selectedUseCaseId, setSelectedUseCaseId] = useState("office");
  const [modalUseCase, setModalUseCase] = useState(null);
  const [estimator, setEstimator] = useState({
    useCaseId: "office",
    portfolioSizeId: "large",
    maturityId: "developing",
  });

  const estimate = calculateBuiltEnvironmentEstimate(estimator);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="BuiltEnvironment"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
                backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.82) 34%, rgba(6,17,46,0.42) 62%, rgba(6,17,46,0.10) 100%), url('/built-environment-hero-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_35%_85%,rgba(168,85,247,0.14),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-sm font-black text-cyan-300">
                Industrial <span className="text-white/40">›</span> Built
                Environment
              </p>

              <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Built Environment
              </h1>

              <p className="mt-5 max-w-xl text-xl font-semibold leading-8 text-white/82">
                Smart infrastructure, resilient buildings and measurable net
                zero outcomes.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#solutions"
                  className="inline-flex items-center rounded-2xl bg-cyan-300 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-950/20 transition hover:scale-[1.02]"
                >
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center rounded-2xl border border-violet-300/40 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                  Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#07193f]/84 shadow-2xl backdrop-blur md:grid-cols-4">
              {compatibleServices.map((service, index) => {
                const Icon = service.icon;

                return (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => safeGo(goToPage, service.page)}
                    className={`group p-6 text-left transition hover:bg-white/8 ${
                      index > 0
                        ? "border-t border-white/10 md:border-l md:border-t-0"
                        : ""
                    }`}
                  >
                    <Icon className={`h-10 w-10 ${service.colour}`} />
                    <h3 className="mt-4 text-base font-black text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/62">
                      {service.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-9 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel title="Who we work with" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {audienceCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                  >
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cyan-50">
                      <Icon className="h-10 w-10 text-cyan-600" />
                    </div>

                    <h3 className="mt-5 text-lg font-black leading-tight text-[#07133c]">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {card.text}
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
                title="Built Environment Resource Hub"
                text="Explore data, scenarios and insights to accelerate better decisions."
                />

                <div className="grid gap-5 lg:grid-cols-3">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-black text-[#07133c]">
                        Built Environment Insights
                        </h3>
                        <p className="mt-1 text-xs font-black text-cyan-700">
                        Powered by SmartX360
                        </p>
                    </div>

                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                        Live
                    </span>
                    </div>

                    <div className="mt-5 space-y-4">
                    {[
                        ["Buildings Assessed", "1,248", "+28 this month", Building2],
                        ["Carbon Reduction Opportunities", "126,350 tCO₂e", "↑ 14%", Leaf],
                        ["Energy Savings Potential", "18.7 GWh/yr", "↑ 21%", Zap],
                        ["Active Retrofit Projects", "72", "+9 this month", Gauge],
                        ["Portfolio Resilience Score", "86/100", "↑ 6 pts", ShieldCheck],
                    ].map(([label, value, change, Icon]) => (
                        <div
                        key={label}
                        className="flex items-center justify-between gap-4"
                        >
                        <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-cyan-600" />
                            <div>
                            <p className="text-xs font-bold text-slate-500">{label}</p>
                            <p className="text-base font-black text-cyan-700">{value}</p>
                            </div>
                        </div>

                        <span className="text-xs font-black text-emerald-600">
                            {change}
                        </span>
                        </div>
                    ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                        SmartX360 brings building, energy, carbon and resilience indicators
                        into one view to support prioritised decision-making.
                    </p>
                    </div>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-black text-[#07133c]">Use Case Explorer</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                    Select a building type to open tailored use case intelligence.
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                    {useCases.map((item) => {
                        const Icon = item.icon;
                        const active = selectedUseCaseId === item.id;

                        return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                            setSelectedUseCaseId(item.id);
                            setModalUseCase(item);
                            setEstimator((current) => ({
                                ...current,
                                useCaseId: item.id,
                            }));
                            }}
                            className={`rounded-2xl border p-4 text-center transition hover:-translate-y-1 hover:shadow-md ${
                            active
                                ? "border-cyan-400 bg-cyan-50"
                                : "border-slate-200 bg-white"
                            }`}
                        >
                            <Icon className="mx-auto h-7 w-7 text-cyan-600" />
                            <span className="mt-2 block text-xs font-black text-[#07133c]">
                            {item.label}
                            </span>
                        </button>
                        );
                    })}
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-700">
                        Selected use case
                    </p>
                    <p className="mt-2 text-lg font-black text-[#07133c]">
                        {useCases.find((item) => item.id === selectedUseCaseId)?.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                        {useCases.find((item) => item.id === selectedUseCaseId)?.summary}
                    </p>
                    </div>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-black text-[#07133c]">Opportunity Estimator</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                    Indicative SNZ-led savings using building type, portfolio size and maturity.
                    </p>

                    <div className="mt-5 space-y-3">
                    <label className="block">
                        <span className="text-xs font-black text-slate-500">
                        Building Type
                        </span>
                        <select
                        value={estimator.useCaseId}
                        onChange={(event) =>
                            setEstimator((current) => ({
                            ...current,
                            useCaseId: event.target.value,
                            }))
                        }
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#07133c] outline-none focus:border-cyan-400"
                        >
                        {useCases.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.label}
                            </option>
                        ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-xs font-black text-slate-500">
                        Portfolio Size
                        </span>
                        <select
                        value={estimator.portfolioSizeId}
                        onChange={(event) =>
                            setEstimator((current) => ({
                            ...current,
                            portfolioSizeId: event.target.value,
                            }))
                        }
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#07133c] outline-none focus:border-cyan-400"
                        >
                        {portfolioSizes.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.label}
                            </option>
                        ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-xs font-black text-slate-500">
                        Current Maturity
                        </span>
                        <select
                        value={estimator.maturityId}
                        onChange={(event) =>
                            setEstimator((current) => ({
                            ...current,
                            maturityId: event.target.value,
                            }))
                        }
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#07133c] outline-none focus:border-cyan-400"
                        >
                        {maturityLevels.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.label}
                            </option>
                        ))}
                        </select>
                    </label>
                    </div>

                    <div className="mt-5 rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700">
                                Estimated savings
                            </p>
                            <p className="mt-1 text-xs font-semibold text-slate-500">
                                Indicative annual opportunity
                            </p>
                            </div>

                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100">
                            <BarChart3 className="h-6 w-6 text-cyan-700" />
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            <div className="flex items-center justify-between rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                                Carbon Savings
                                </p>
                                <p className="mt-1 text-xs font-bold text-slate-500">
                                Tonnes of CO₂e avoided
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-black text-cyan-700">
                                {Math.round(estimate.carbonSavingsTCO2e).toLocaleString("en-GB")}
                                </p>
                                <p className="text-xs font-bold text-slate-500">tCO₂e/yr</p>
                            </div>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                                Energy Savings
                                </p>
                                <p className="mt-1 text-xs font-bold text-slate-500">
                                Reduced energy demand
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-black text-blue-700">
                                {estimate.energySavingsGwh.toFixed(1)}
                                </p>
                                <p className="text-xs font-bold text-slate-500">GWh/yr</p>
                            </div>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                                Cost Savings
                                </p>
                                <p className="mt-1 text-xs font-bold text-slate-500">
                                Estimated annual reduction
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-black text-pink-700">
                                {formatCurrency(estimate.costSavings)}
                                </p>
                                <p className="text-xs font-bold text-slate-500">per year</p>
                            </div>
                            </div>
                        </div>
                        </div>
                </article>
                </div>
            </div>
            </section>

        <section id="solutions" className="border-t border-slate-100 bg-white px-5 py-9 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel
              title="Our Approach"
              text="A proven framework to make every building smart, efficient and optimised."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {approachSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-600 text-sm font-black text-white">
                      {step.step}
                    </span>

                    <Icon className="mt-5 h-8 w-8 text-cyan-600" />

                    <h3 className="mt-4 text-sm font-black leading-tight text-[#07133c]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                      {step.text}
                    </p>

                    {index < approachSteps.length - 1 && (
                      <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-cyan-200 xl:block" />
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white px-5 py-9 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel
              title="Tools & Insights"
              text="Powerful tools to plan, operate and decarbonise your built environment."
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {tools.map((tool) => (
                <article
                  key={tool.title}
                  className="relative min-h-[300px] overflow-hidden rounded-3xl bg-[#06112e] p-6 text-white shadow-xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-65"
                    style={{
                      backgroundImage: `linear-gradient(180deg,rgba(6,17,46,0.35),rgba(6,17,46,0.95)), url('${tool.image}')`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className="text-2xl font-black text-cyan-300">
                      {tool.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
                      {tool.text}
                    </p>

                    <div className="mt-auto">
                      <p className="text-3xl font-black text-cyan-300">
                        {tool.stat}
                      </p>
                      <p className="text-xs font-semibold text-white/60">
                        {tool.label}
                      </p>

                      {tool.external ? (
                        <a
                          href={tool.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex rounded-xl border border-cyan-300/40 px-4 py-3 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/10"
                        >
                          {tool.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      ) : (
                        <button
                            type="button"
                            onClick={() => {
                                if (tool.modal) {
                                sessionStorage.setItem("smartDecarb360OpenModal", tool.modal);
                                } else {
                                sessionStorage.removeItem("smartDecarb360OpenModal");
                                }

                                safeGo(goToPage, tool.page);
                            }}
                            className="mt-5 inline-flex rounded-xl border border-cyan-300/40 px-4 py-3 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/10"
                            >
                            {tool.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>        

        <section className="bg-white px-5 pb-16 pt-6 lg:px-8">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl md:p-10"
            style={{
                backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.82) 36%, rgba(6,17,46,0.48) 62%, rgba(6,17,46,0.10) 100%), url('/built-environment-cta-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
                  <Building2 className="h-9 w-9 text-cyan-300" />
                </div>

                <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight">
                  Build smarter, safer and lower-carbon environments.
                </h2>

                <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
                  Partner with Smart Net Zero to unlock value, reduce risk and
                  create a better future for people and places.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-8 py-4 text-sm font-black text-slate-950 shadow-lg transition hover:scale-[1.02]"
                >
                  Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
                </button>

              </div>
            </div>
          </div>
        </section>
      </main>
        {modalUseCase && (
            <UseCaseModal
                useCase={modalUseCase}
                onClose={() => setModalUseCase(null)}
            />
        )}
        <SNZFooter goToPage={goToPage} />
    </div>
  );
}