
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
    text: "Plan lower-carbon operations, reduce energy losses and evidence transition progress.",
    icon: Leaf,
    page: "SustainabilityNetZero",
    colour: "text-emerald-300",
  },
  {
    title: "OT Security & Resilience",
    text: "Protect operational technology, telemetry, control systems and critical services.",
    icon: ShieldCheck,
    page: "OTSecurityResilience",
    colour: "text-violet-300",
  },
  {
    title: "Smart Energy Management",
    text: "Optimise demand, generation, storage, losses and asset performance.",
    icon: Zap,
    page: "SustainabilityNetZero",
    colour: "text-cyan-300",
  },
  {
    title: "Smart Regulations & Compliance",
    text: "Strengthen assurance for cyber, operational resilience, ESG and reporting duties.",
    icon: ClipboardCheck,
    page: "SmartRegulations",
    colour: "text-pink-300",
  },
];

const capabilities = [
  {
    title: "Operational Resilience Assessment",
    text: "Assess critical sites, dependencies, vulnerabilities and continuity risks across energy, utility and infrastructure operations.",
    cta: "Assess Resilience",
    page: "OTSecurityResilience",
    stat: "24/7",
    label: "Continuity Focus",
    image: "/energy-capability-resilience.png",
  },
  {
    title: "OT & Connected Asset Security",
    text: "Improve visibility and assurance across operational technology, industrial controls, IoT, telemetry and connected field assets.",
    cta: "See OT Security",
    page: "OTSecurityResilience",
    stat: "100%",
    label: "Asset Visibility",
    image: "/energy-capability-ot-security.png",
  },
  {
    title: "Energy & Carbon Optimisation",
    text: "Identify efficiency opportunities, reduce avoidable consumption and support lower-carbon infrastructure operations.",
    cta: "Explore Net Zero",
    page: "SustainabilityNetZero",
    stat: "↓ CO₂e",
    label: "Lower Emissions",
    image: "/energy-capability-carbon.png",
  },
  {
    title: "Regulatory & Risk Intelligence",
    text: "Support compliance, assurance and reporting across cyber, resilience, safety, environmental and operational obligations.",
    cta: "Learn Compliance",
    page: "SmartRegulations",
    stat: "Live",
    label: "Risk Insight",
    image: "/energy-capability-regulation.png",
  },
];

const audienceCards = [
  {
    title: "Energy Network Operators",
    text: "Improve resilience, efficiency and decarbonisation across transmission and distribution assets.",
    icon: Network,
  },
  {
    title: "Utility Providers",
    text: "Optimise water, wastewater, gas and district energy operations while reducing risk.",
    icon: PlugZap,
  },
  {
    title: "Renewables & Storage Developers",
    text: "Connect generation, storage and flexibility data to improve performance and assurance.",
    icon: Leaf,
  },
  {
    title: "Critical Infrastructure Owners",
    text: "Protect essential services with smarter monitoring, compliance and operational resilience.",
    icon: ShieldCheck,
  },
];

const useCases = [
  {
    id: "electricity-networks",
    label: "Electricity Networks",
    icon: Network,
    energyIntensity: 520,
    optimisationPotential: 0.13,
    tariff: 0.18,
    summary:
      "Improve visibility, resilience and efficiency across grid, substation and distribution operations.",
    challenge:
      "Electricity networks face rising demand, ageing assets, distributed generation, cyber exposure and pressure to improve reliability while enabling net zero.",
    solution:
      "SNZ connects asset, telemetry, energy, cyber and carbon data to help operators identify risk hotspots, reduce losses, prioritise investment and improve operational assurance.",
    outcomes: [
      "Improved asset and operational risk visibility",
      "Reduced technical and avoidable energy losses",
      "Stronger OT and substation resilience",
      "Better evidence for investment and regulatory reporting",
    ],
    example:
      "A distribution network operator can use SmartX360 to compare substations, identify high-loss areas and prioritise monitoring, resilience and control upgrades.",
  },
  {
    id: "water-wastewater",
    label: "Water & Wastewater",
    icon: Gauge,
    energyIntensity: 430,
    optimisationPotential: 0.16,
    tariff: 0.19,
    summary:
      "Reduce pumping, treatment and network energy demand while strengthening service continuity.",
    challenge:
      "Water and wastewater operations often include energy-intensive pumping, variable treatment loads, dispersed assets and limited integrated operational insight.",
    solution:
      "SNZ helps combine asset, process, energy and monitoring data to identify efficiency opportunities across pumping, aeration, treatment, leakage and resilience planning.",
    outcomes: [
      "Lower pumping and treatment energy consumption",
      "Improved operational visibility across dispersed assets",
      "Prioritised upgrades for resilience and carbon impact",
      "Better evidence for performance and environmental reporting",
    ],
    example:
      "A water utility can benchmark pumping stations and treatment works to identify high-energy assets and build a prioritised optimisation roadmap.",
  },
  {
    id: "gas-hydrogen",
    label: "Gas & Hydrogen",
    icon: Factory,
    energyIntensity: 360,
    optimisationPotential: 0.11,
    tariff: 0.16,
    summary:
      "Support safer, lower-carbon gas infrastructure and prepare for hydrogen transition pathways.",
    challenge:
      "Gas networks and emerging hydrogen systems must balance safety, continuity, asset integrity, emissions reduction and evolving technical standards.",
    solution:
      "SNZ supports risk-led asset insight, monitoring readiness, transition planning and operational assurance across gas distribution, storage and hydrogen-enabling infrastructure.",
    outcomes: [
      "Clearer transition and readiness assessment",
      "Improved asset integrity and monitoring visibility",
      "Reduced avoidable emissions and energy waste",
      "Stronger evidence for compliance and investment decisions",
    ],
    example:
      "A gas infrastructure operator can assess sites for monitoring maturity, resilience gaps and hydrogen-readiness constraints across a regional asset base.",
  },
  {
    id: "renewable-generation",
    label: "Renewable Generation",
    icon: Leaf,
    energyIntensity: 300,
    optimisationPotential: 0.14,
    tariff: 0.20,
    summary:
      "Optimise performance, availability and carbon value across solar, wind and distributed generation assets.",
    challenge:
      "Renewable portfolios require reliable performance data, asset condition insight, curtailment visibility and strong assurance across connected systems.",
    solution:
      "SNZ brings generation, metering, asset and control data together to improve performance analytics, operational resilience and portfolio-level decision-making.",
    outcomes: [
      "Improved generation performance visibility",
      "Reduced downtime and avoidable losses",
      "Better curtailment and grid interface insight",
      "Stronger reporting for investors and stakeholders",
    ],
    example:
      "A renewable portfolio owner can compare sites, identify underperforming assets and prioritise intervention based on yield, risk and operational impact.",
  },
  {
    id: "battery-storage",
    label: "Battery Storage",
    icon: Zap,
    energyIntensity: 340,
    optimisationPotential: 0.17,
    tariff: 0.21,
    summary:
      "Improve operational intelligence, safety assurance and value stacking for storage assets.",
    challenge:
      "Battery energy storage systems rely on complex controls, market signals, cyber-secure connectivity, asset health monitoring and strong safety management.",
    solution:
      "SNZ supports monitoring, control assurance, asset health insight and operational optimisation for storage portfolios and grid-connected flexibility assets.",
    outcomes: [
      "Better asset health and performance visibility",
      "Improved safety and operational assurance",
      "Stronger cyber and control-system resilience",
      "Clearer optimisation of storage value streams",
    ],
    example:
      "A storage operator can combine state-of-health, dispatch and market data to identify performance constraints and improve operational decision-making.",
  },
  {
    id: "district-energy",
    label: "District Energy",
    icon: PlugZap,
    energyIntensity: 410,
    optimisationPotential: 0.18,
    tariff: 0.20,
    summary:
      "Optimise heat networks, energy centres and local infrastructure for efficiency, resilience and decarbonisation.",
    challenge:
      "District energy schemes often have complex generation mixes, heat losses, customer interfaces, metering gaps and long-term decarbonisation obligations.",
    solution:
      "SNZ helps model demand, plant performance, losses, controls, metering and transition options to prioritise interventions across energy centres and networks.",
    outcomes: [
      "Reduced heat and distribution losses",
      "Improved plant sequencing and control strategy",
      "Clearer low-carbon heat transition roadmap",
      "Better customer and stakeholder reporting",
    ],
    example:
      "A heat network operator can use SmartX360 to identify inefficient plant operation and prioritise controls, metering and low-carbon heat upgrades.",
  },
  {
    id: "data-centres",
    label: "Data Centres",
    icon: Cpu,
    energyIntensity: 650,
    optimisationPotential: 0.12,
    tariff: 0.22,
    summary:
      "Strengthen efficiency, resilience and operational assurance for high-demand critical digital infrastructure.",
    challenge:
      "Data centres must balance energy demand, cooling performance, uptime, grid constraints, cyber risk and increasingly visible carbon commitments.",
    solution:
      "SNZ connects energy, cooling, resilience, controls and carbon insight to support optimisation without compromising availability or service continuity.",
    outcomes: [
      "Improved energy and cooling performance visibility",
      "Reduced avoidable demand and operational waste",
      "Stronger continuity and resilience evidence",
      "Clearer carbon and energy reporting for stakeholders",
    ],
    example:
      "A data centre operator can identify cooling inefficiencies, model optimisation opportunities and evidence resilience improvements across critical systems.",
  },
  {
    id: "transport-infrastructure",
    label: "Transport Structure",
    icon: Building2,
    energyIntensity: 390,
    optimisationPotential: 0.15,
    tariff: 0.19,
    summary:
      "Improve performance and resilience across electrified transport, depots, stations and operational estates.",
    challenge:
      "Transport infrastructure combines high energy demand, public service continuity, charging loads, connected controls and safety-critical operational systems.",
    solution:
      "SNZ helps integrate energy, asset, control and operational data to optimise demand, prioritise resilience upgrades and support decarbonisation planning.",
    outcomes: [
      "Reduced estate and traction-support energy waste",
      "Better visibility of charging and peak demand impacts",
      "Improved resilience of operational assets",
      "Prioritised capital planning for low-carbon infrastructure",
    ],
    example:
      "A transport operator can assess depots and stations to plan EV charging, controls optimisation and resilience improvements across the network.",
  },
  {
    id: "industrial-utilities",
    label: "Industrial Utilities",
    icon: Factory,
    energyIntensity: 470,
    optimisationPotential: 0.14,
    tariff: 0.17,
    summary:
      "Optimise steam, compressed air, process utilities and site energy systems in critical industrial environments.",
    challenge:
      "Industrial utility systems can be energy intensive, operationally embedded and difficult to optimise without disrupting production or safety requirements.",
    solution:
      "SNZ combines site energy, operational, asset and OT insight to identify no-regret improvements and prioritise projects by impact, risk and deliverability.",
    outcomes: [
      "Improved visibility of process utility demand",
      "Reduced losses from steam, air and auxiliary systems",
      "Better OT resilience and operational assurance",
      "Prioritised investment roadmap for efficiency and carbon reduction",
    ],
    example:
      "An industrial site can separate production loads from utility losses and identify practical opportunities across compressed air, steam and cooling systems.",
  },
];

const portfolioSizes = [
  {
    id: "local",
    label: "Local / single region",
    area: 40,
  },
  {
    id: "regional",
    label: "Regional portfolio",
    area: 90,
  },
  {
    id: "national",
    label: "National portfolio",
    area: 180,
  },
  {
    id: "enterprise",
    label: "Enterprise / complex network",
    area: 320,
  },
];

const maturityLevels = [
  {
    id: "early",
    label: "Limited data visibility",
    multiplier: 1.18,
  },
  {
    id: "developing",
    label: "Developing controls",
    multiplier: 1,
  },
  {
    id: "advanced",
    label: "Advanced optimisation",
    multiplier: 0.74,
  },
];

function calculateCriticalInfrastructureEstimate({
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
  // baseline energy = operational scale × indicative annual energy benchmark
  // energy saving = baseline energy × optimisation potential × maturity multiplier
  // carbon saving = energy saving × indicative UK electricity emissions factor
  // cost saving = energy saving × indicative commercial tariff
  //
  // Values are intended for website estimation only and should be replaced
  // with verified operational, metering and asset data during assessment.

  const annualBaselineEnergy = size.area * useCase.energyIntensity * 1000;
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
    title: "Map critical assets and dependencies",
    text: "Identify essential services, systems, sites, data flows and operational dependencies.",
    icon: Search,
  },
  {
    step: "2",
    title: "Connect operational and energy data",
    text: "Integrate telemetry, OT, metering, asset and environmental data into one trusted view.",
    icon: Network,
  },
  {
    step: "3",
    title: "Analyse performance, carbon and risk",
    text: "Use analytics to identify losses, inefficiencies, vulnerabilities and resilience gaps.",
    icon: LineChart,
  },
  {
    step: "4",
    title: "Prioritise interventions",
    text: "Rank actions by service criticality, carbon, cost, risk reduction and deliverability.",
    icon: Target,
  },
  {
    step: "5",
    title: "Improve controls and resilience",
    text: "Implement smarter controls, monitoring, assurance and operational improvement projects.",
    icon: SlidersHorizontal,
  },
  {
    step: "6",
    title: "Monitor, evidence and improve",
    text: "Track savings, resilience outcomes, compliance evidence and continuous improvement.",
    icon: BarChart3,
  },
];

const tools = [
  {
    title: "Critical Asset Intelligence",
    text: "Portfolio visibility, risk scoring and prioritised investment support for essential infrastructure.",
    cta: "Explore Smart Decarb360",
    page: "SmartDecarb360",
    modal: "bdrr",
    stat: "24/7",
    label: "Critical Asset Insight",
    image: "/energy-critical-tool-asset-intelligence.png",
  },
  {
    title: "OT Resilience Monitor",
    text: "Operational technology, control-system and connected-infrastructure assurance.",
    cta: "Explore OT Resilience",
    page: "OTSecurityResilience",
    stat: "360°",
    label: "Operational Assurance",
    image: "/energy-critical-tool-ot-resilience.png",
  },
  {
    title: "Energy Optimisation Model",
    text: "Scenario modelling for demand, generation, storage, losses and decarbonisation decisions.",
    cta: "Explore Smart Decarb360",
    page: "SmartDecarb360",
    stat: "18%",
    label: "Indicative Optimisation",
    image: "/energy-critical-tool-optimisation.png",
  },
  {
    title: "Carbon Reporting",
    text: "Carbon measurement, emissions reporting and stakeholder-ready progress insight.",
    cta: "Explore Carbon Reporting",
    external: "https://www.co2impact.co.uk/",
    stat: "12,540",
    label: "tCO₂e tracked",
    image: "/energy-critical-tool-carbon-reporting.png",
  },
];

const resources = [
  {
    tag: "Live Case",
    title: "Water Utility Optimisation",
    text: "Reduced pumping energy and improved asset visibility across dispersed sites.",
    metrics: ["14% Energy Savings", "1,900 tCO₂e/yr", "Improved resilience insight"],
  },
  {
    tag: "Use Case",
    title: "Distribution Network Resilience",
    text: "Integrated asset, energy and OT risk insight across critical network assets.",
    metrics: ["Priority risk hotspots", "Loss reduction roadmap", "Regulatory evidence pack"],
  },
  {
    tag: "Resource",
    title: "Critical Infrastructure Playbook",
    text: "Step-by-step guide to prioritising resilience, energy and decarbonisation interventions.",
    cta: "Download Guide",
  },
  {
    tag: "Resource",
    title: "OT & Compliance Hub",
    text: "Stay ahead of operational technology, cyber resilience and connected infrastructure obligations.",
    cta: "Explore Hub",
  },
  {
    tag: "Resource",
    title: "Infrastructure Benchmarking Report",
    text: "Compare asset performance, energy intensity and resilience maturity across infrastructure types.",
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
              Energy & Critical Infrastructure Use Case
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

export default function EnergyUtilitiesCriticalInfrastructure({ goToPage, openEnquiryForm }) {

  useEffect(() => {
    document.title = "Energy, Utilities & Critical Infrastructure | Smart Net Zero";
  }, []);
  const [selectedUseCaseId, setSelectedUseCaseId] = useState("electricity-networks");
  const [modalUseCase, setModalUseCase] = useState(null);
  const [estimator, setEstimator] = useState({
    useCaseId: "electricity-networks",
    portfolioSizeId: "national",
    maturityId: "developing",
  });

  const estimate = calculateCriticalInfrastructureEstimate(estimator);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="EnergyUtilitiesCriticalInfrastructure"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.90) 28%, rgba(6,17,46,0.58) 52%, rgba(6,17,46,0.18) 78%, rgba(6,17,46,0.04) 100%), url('/energy-utilities-critical-infrastructure-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_35%_85%,rgba(168,85,247,0.14),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-sm font-black text-cyan-300">
                Industrial <span className="text-white/40">›</span> Energy, Utilities & Critical Infrastructure
              </p>

              <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Energy, Utilities & Critical Infrastructure
              </h1>

              <p className="mt-5 max-w-xl text-xl font-semibold leading-8 text-white/82">
                Smarter energy systems, resilient utilities and measurable net zero outcomes.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#solutions"
                  className="inline-flex items-center rounded-2xl bg-cyan-300 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-950/20 transition hover:scale-[1.02]"
                >
                  Explore our Approach <ArrowRight className="ml-2 h-5 w-5" />
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
                title="Energy & Infrastructure Resource Hub"
                text="Explore operational data, resilience scenarios and decarbonisation insight to accelerate better decisions."
                />

                <div className="grid gap-5 lg:grid-cols-3">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-black text-[#07133c]">
                        Critical Infrastructure Insights
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
                        ["Critical Assets Assessed", "842", "+17 this month", Building2],
                        ["Carbon Reduction Opportunities", "94,820 tCO₂e", "↑ 14%", Leaf],
                        ["Energy Optimisation Potential", "32.4 GWh/yr", "↑ 21%", Zap],
                        ["Active Resilience Projects", "72", "+9 this month", Gauge],
                        ["Operational Resilience Score", "86/100", "↑ 6 pts", ShieldCheck],
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
                        SmartX360 brings asset, energy, carbon, cyber and resilience indicators into one view to support prioritised infrastructure decision-making.
                    </p>
                    </div>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-black text-[#07133c]">Infrastructure Use Case Explorer</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                    Select an asset type to open tailored infrastructure use case intelligence.
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
                            <span className="mt-2 block text-center text-[10px] font-black text-[#07133c]">
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
                    Indicative SNZ-led savings using asset type, operational scale and maturity.
                    </p>

                    <div className="mt-5 space-y-3">
                    <label className="block">
                        <span className="text-xs font-black text-slate-500">
                        Asset Type
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
                        Operational Scale
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
                                Reduced operational energy demand
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
              text="A proven framework to make essential infrastructure smarter, safer, resilient and lower carbon."
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
              title="Critical Infrastructure Capabilities"
              text="Focused capabilities to strengthen resilience, improve visibility and support secure, lower-carbon operations."
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {capabilities.map((capability) => (
                <article
                  key={capability.title}
                  className="relative min-h-[300px] overflow-hidden rounded-3xl bg-[#06112e] p-6 text-white shadow-xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-65"
                    style={{
                      backgroundImage: `linear-gradient(180deg,rgba(6,17,46,0.35),rgba(6,17,46,0.95)), url('${capability.image}')`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className="text-2xl font-black text-cyan-300">
                      {capability.title}
                    </h3>

                    <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
                      {capability.text}
                    </p>

                    <div className="mt-auto">
                      <p className="text-3xl font-black text-cyan-300">
                        {capability.stat}
                      </p>

                      <p className="text-xs font-semibold text-white/60">
                        {capability.label}
                      </p>

                      <button
                        type="button"
                        onClick={() => safeGo(goToPage, capability.page)}
                        className="mt-5 inline-flex rounded-xl border border-cyan-300/40 px-4 py-3 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/10"
                      >
                        {capability.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
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
                "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.82) 36%, rgba(6,17,46,0.48) 62%, rgba(6,17,46,0.10) 100%), url('/energy-utilities-critical-infrastructure-cta-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>           

                <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight">
                  Build smarter, safer and lower-carbon critical infrastructure.
                </h2>

                <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
                  Partner with Smart Net Zero to reduce risk, improve resilience and accelerate measurable decarbonisation across essential services.
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