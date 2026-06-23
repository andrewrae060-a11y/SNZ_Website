import { useMemo, useEffect, useState } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  CloudCog,
  Download,
  Factory,
  Leaf,
  LineChart,
  Menu,
  Recycle,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

const heroPillars = [
  {
    title: "Carbon Reduction",
    text: "Measure, manage and reduce emissions at scale.",
    icon: Leaf,
  },
  {
    title: "Net Zero Roadmaps",
    text: "Science-aligned pathways to net zero.",
    icon: CloudCog,
  },
  {
    title: "ESG & Reporting",
    text: "Strengthen disclosure and stakeholder confidence.",
    icon: BarChart3,
  },
  {
    title: "Sustainable Transformation",
    text: "Embed sustainability into strategy and operations.",
    icon: Recycle,
  },
];

const audienceCards = [
  {
    title: "Organisations & Asset Owners",
    text: "Develop strategies, reduce emissions and future-proof operations.",
    icon: Factory,
    colour: "from-green-200 to-emerald-500",
  },
  {
    title: "Developers & Investors",
    text: "De-risk investments and create long-term value through sustainability.",
    icon: Building2,
    colour: "from-sky-200 to-cyan-500",
  },
  {
    title: "Public Sector & Communities",
    text: "Deliver resilient, low-carbon outcomes for people and places.",
    icon: Users,
    colour: "from-teal-200 to-emerald-500",
  },
];

const solutionCards = [
  {
    title: "Decarbonisation Strategies",
    text: "Evidence-based strategies to reduce emissions and maximise value across the asset lifecycle.",
    icon: Recycle,
    image: "/sustainability-card-forest-bg.png",
    accent: "text-green-700",
  },
  {
    title: "Net Zero Delivery Planning",
    text: "Actionable plans with timelines, milestones and investment cases.",
    icon: Building2,
    image: "/sustainability-card-building-bg.png",
    accent: "text-teal-700",
  },
  {
    title: "Reporting & Assurance",
    text: "Deliver accurate reporting, assurance and continuous improvement.",
    icon: ShieldCheck,
    image: "/sustainability-card-reporting-bg.png",
    accent: "text-emerald-700",
  },
  {
    title: "Sustainable Transformation",
    text: "Embed sustainability into strategy and operations for lasting impact.",
    icon: Leaf,
    image: "/sustainability-card-wind-bg.png",
    accent: "text-green-700",
  },
];

const solutionDetails = {
  "Decarbonisation Strategies": {
    headline:
      "Build a clear, evidence-based strategy to reduce emissions and prioritise action.",
    bestFor:
      "Organisations that need to understand where to start, what to prioritise and how to turn carbon ambition into a practical plan.",
    outcomes: [
      "Clear carbon reduction priorities",
      "Evidence-based investment decisions",
      "Improved leadership confidence",
      "A practical route from baseline to action",
    ],
    pathway: [
      {
        step: "Understand",
        text: "Review current emissions, energy use, assets, operations and organisational priorities.",
      },
      {
        step: "Prioritise",
        text: "Identify the highest-impact opportunities across cost, carbon, risk and feasibility.",
      },
      {
        step: "Model",
        text: "Compare scenarios, estimated savings, carbon impact and delivery complexity.",
      },
      {
        step: "Mobilise",
        text: "Create a practical action plan with owners, milestones and reporting measures.",
      },
    ],
    impactMetrics: [
      { label: "Typical focus", value: "Portfolio-wide" },
      { label: "Planning horizon", value: "1–10 years" },
      { label: "Output", value: "Strategic roadmap" },
    ],
    relatedServices: [
      "Carbon Measurement & Analytics",
      "Net Zero Roadmaps & Strategy",
      "Climate Resilience & Risk",
    ],
  },

  "Net Zero Delivery Planning": {
    headline:
      "Translate net zero strategy into a funded, sequenced and deliverable programme.",
    bestFor:
      "Organisations with targets or strategies already in place that now need a structured delivery plan.",
    outcomes: [
      "Prioritised implementation plan",
      "Clear programme governance",
      "Stronger business cases",
      "Better sequencing of projects and investment",
    ],
    pathway: [
      {
        step: "Map",
        text: "Map projects, dependencies, assets, budgets, constraints and delivery responsibilities.",
      },
      {
        step: "Sequence",
        text: "Create a staged plan based on feasibility, impact, urgency and funding windows.",
      },
      {
        step: "Cost",
        text: "Develop outline costs, benefit assumptions, delivery risks and investment logic.",
      },
      {
        step: "Track",
        text: "Define KPIs, reporting cadence and benefits tracking for programme oversight.",
      },
    ],
    impactMetrics: [
      { label: "Typical focus", value: "Programme delivery" },
      { label: "Planning horizon", value: "12–36 months" },
      { label: "Output", value: "Delivery plan" },
    ],
    relatedServices: [
      "Net Zero Roadmaps & Strategy",
      "Energy Optimisation & Retrofit",
      "Carbon Measurement & Analytics",
    ],
  },

  "Reporting & Assurance": {
    headline:
      "Improve the quality, credibility and usefulness of sustainability reporting.",
    bestFor:
      "Organisations that need stronger carbon, ESG, board or stakeholder reporting with clearer evidence.",
    outcomes: [
      "More reliable sustainability data",
      "Clearer reporting evidence",
      "Improved stakeholder confidence",
      "Better audit and assurance readiness",
    ],
    pathway: [
      {
        step: "Review",
        text: "Assess reporting requirements, current evidence, data sources and governance controls.",
      },
      {
        step: "Strengthen",
        text: "Improve data quality, traceability, ownership and reporting processes.",
      },
      {
        step: "Structure",
        text: "Create clear KPIs, dashboards and reporting packs for different audiences.",
      },
      {
        step: "Assure",
        text: "Prepare evidence, assumptions and controls for internal or external assurance.",
      },
    ],
    impactMetrics: [
      { label: "Typical focus", value: "Data confidence" },
      { label: "Planning horizon", value: "Quarterly/annual" },
      { label: "Output", value: "Reporting pack" },
    ],
    relatedServices: [
      "Carbon Measurement & Analytics",
      "Net Zero Roadmaps & Strategy",
      "Climate Resilience & Risk",
    ],
  },

  "Sustainable Transformation": {
    headline:
      "Embed sustainability into everyday decisions, operating models and long-term change.",
    bestFor:
      "Organisations that want sustainability to become part of business-as-usual rather than a separate initiative.",
    outcomes: [
      "Stronger sustainability governance",
      "Better organisational engagement",
      "Practical change management",
      "More resilient operating models",
    ],
    pathway: [
      {
        step: "Align",
        text: "Connect sustainability priorities with business strategy, operations and stakeholder expectations.",
      },
      {
        step: "Embed",
        text: "Define roles, responsibilities, governance, behaviours and decision-making processes.",
      },
      {
        step: "Enable",
        text: "Support teams with tools, training, guidance and practical delivery support.",
      },
      {
        step: "Improve",
        text: "Track progress, learn from delivery and continuously improve sustainability outcomes.",
      },
    ],
    impactMetrics: [
      { label: "Typical focus", value: "Operating model" },
      { label: "Planning horizon", value: "Ongoing" },
      { label: "Output", value: "Change plan" },
    ],
    relatedServices: [
      "Net Zero Roadmaps & Strategy",
      "Energy Optimisation & Retrofit",
      "Climate Resilience & Risk",
    ],
  },
};

const advisoryServices = [
  {
    title: "Carbon Measurement & Analytics",
    text: "Measure, analyse and track emissions with robust data and insights.",
    icon: ShieldCheck,
    image: "/sustainability-advisory-carbon-bg.png",
    colour: "text-emerald-600",
  },
  {
    id: "net-zero-roadmaps-strategy",
    title: "Net Zero Roadmaps & Strategy",
    text: "Build science-aligned roadmaps tailored to your goals and context.",
    icon: ClipboardCheck,
    image: "/sustainability-advisory-roadmap-bg.png",
    colour: "text-teal-600",
  },
  {
    title: "Energy Optimisation & Retrofit",
    text: "Improve energy performance through smart technologies and retrofit planning.",
    icon: Zap,
    image: "/sustainability-advisory-energy-bg.png",
    colour: "text-sky-600",
  },
  {
    title: "Climate Resilience & Risk",
    text: "Strengthen resilience to climate risks and ensure business continuity.",
    icon: ShieldCheck,
    image: "/sustainability-advisory-risk-bg.png",
    colour: "text-violet-600",
  },
];

const advisoryServiceDetails = {
  "Carbon Measurement & Analytics": {
    summary:
      "Create a clear, evidence-based view of emissions, energy use and performance across buildings, assets and operations.",
    provides: [
      "Carbon baseline development across Scope 1, Scope 2 and relevant Scope 3 categories.",
      "Energy and emissions data review, cleansing and improvement planning.",
      "Carbon dashboards, KPI structures and trend analysis.",
      "Identification of high-impact reduction opportunities.",
    ],
    benefits: [
      "Understand where emissions and energy costs are concentrated.",
      "Improve confidence in reporting and decision-making.",
      "Prioritise the right interventions based on evidence.",
      "Create a stronger foundation for ESG, board and stakeholder reporting.",
    ],
    useCases: [
      "Multi-site carbon baselining for building portfolios.",
      "Energy spend and emissions hotspot analysis.",
      "Carbon reporting preparation for leadership teams.",
      "Data quality review before setting reduction targets.",
    ],
  },

  "Net Zero Roadmaps & Strategy": {
    summary:
      "Turn ambition into a practical, prioritised and costed pathway to net zero.",
    provides: [
      "Net zero maturity assessment and target review.",
      "Prioritised decarbonisation roadmap development.",
      "Scenario modelling for cost, carbon and delivery impact.",
      "Governance, reporting and delivery structure recommendations.",
    ],
    benefits: [
      "Move from broad targets to a clear delivery plan.",
      "Align investment decisions with carbon reduction priorities.",
      "Support internal business cases and leadership engagement.",
      "Reduce the risk of fragmented or unfunded sustainability activity.",
    ],
    useCases: [
      "Estate-wide net zero strategy creation.",
      "Board-level decarbonisation roadmap development.",
      "Prioritisation of retrofit, renewable and operational interventions.",
      "Strategic planning for public sector and commercial portfolios.",
    ],
  },

  "Energy Optimisation & Retrofit": {
    summary:
      "Improve building and asset performance through practical energy optimisation, smart controls and retrofit planning.",
    provides: [
      "Energy performance review and optimisation opportunity analysis.",
      "Building systems, controls and operational performance assessment.",
      "Retrofit opportunity identification and prioritisation.",
      "Savings, carbon and implementation pathway estimates.",
    ],
    benefits: [
      "Reduce energy waste and operating costs.",
      "Identify practical interventions before committing capital.",
      "Improve comfort, resilience and operational performance.",
      "Support investment planning for retrofit and smart energy systems.",
    ],
    useCases: [
      "Energy optimisation review for buildings and estates.",
      "Retrofit prioritisation across multiple assets.",
      "Smart metering and controls improvement planning.",
      "Operational energy reduction programmes.",
    ],
  },

  "Climate Resilience & Risk": {
    summary:
      "Understand climate-related risks and strengthen resilience across assets, operations and long-term planning.",
    provides: [
      "Climate risk screening for buildings, infrastructure and operations.",
      "Assessment of exposure to heat, flooding, storms and disruption.",
      "Resilience improvement recommendations.",
      "Integration of climate risk into business continuity and investment planning.",
    ],
    benefits: [
      "Identify climate risks before they become operational issues.",
      "Improve resilience of buildings, services and supply chains.",
      "Support better long-term asset and investment decisions.",
      "Strengthen reporting against climate risk expectations.",
    ],
    useCases: [
      "Climate risk review for property portfolios.",
      "Resilience planning for critical services and infrastructure.",
      "Flood, heat and severe weather exposure assessment.",
      "Climate adaptation planning for estates and operations.",
    ],
  },
};

const journeyStages = [
  {
    label: "Assess",
    title: "Assess",
    text: "Understand your baseline, risks and opportunities across assets and operations.",
    bullets: [
      "Benchmark current performance",
      "Identify material risks and hotspots",
      "Prioritise high-impact opportunities",
    ],
  },
  {
    label: "Measure",
    title: "Measure",
    text: "Build reliable carbon, energy and operational data foundations.",
    bullets: [
      "Capture emissions and energy data",
      "Improve data quality and traceability",
      "Create reporting-ready evidence",
    ],
  },
  {
    label: "Plan",
    title: "Plan",
    text: "Create a practical roadmap with milestones, investment cases and delivery actions.",
    bullets: [
      "Define science-aligned targets",
      "Prioritise interventions",
      "Build investment and delivery plans",
    ],
  },
  {
    label: "Deliver",
    title: "Deliver",
    text: "Implement solutions, mobilise teams and track measurable change.",
    bullets: [
      "Coordinate delivery programmes",
      "Track progress against milestones",
      "Manage operational change",
    ],
  },
  {
    label: "Monitor",
    title: "Monitor",
    text: "Measure impact, report transparently and continuously improve.",
    bullets: [
      "Monitor emissions and savings",
      "Report outcomes clearly",
      "Refresh plans as data improves",
    ],
  },
];

const journeyStageInsights = {
  Assess: {
    readiness: "45%",
    confidence: "Early",
    output: "Baseline view",
    risk: "Unclear priorities",
    data: "Asset and energy data",
    action: "Identify hotspots",
  },
  Measure: {
    readiness: "58%",
    confidence: "Building",
    output: "Reliable evidence",
    risk: "Poor data quality",
    data: "Meters and invoices",
    action: "Validate emissions",
  },
  Plan: {
    readiness: "67%",
    confidence: "Structured",
    output: "Delivery roadmap",
    risk: "Unfunded ambition",
    data: "Costs and scenarios",
    action: "Prioritise projects",
  },
  Deliver: {
    readiness: "74%",
    confidence: "Active",
    output: "Implemented actions",
    risk: "Slow mobilisation",
    data: "Project milestones",
    action: "Track benefits",
  },
  Monitor: {
    readiness: "82%",
    confidence: "Mature",
    output: "Impact dashboard",
    risk: "Outdated reporting",
    data: "Live performance data",
    action: "Optimise continuously",
  },
};

const fourStepJourney = [
  {
    number: "1.",
    title: "Assess",
    text: "Understand your baseline, risks and opportunities.",
    icon: Search,
  },
  {
    number: "2.",
    title: "Plan",
    text: "Create a tailored roadmap and define actions.",
    icon: ClipboardCheck,
  },
  {
    number: "3.",
    title: "Deliver",
    text: "Implement solutions, mobilise teams and drive impact.",
    icon: ShieldCheck,
  },
  {
    number: "4.",
    title: "Monitor",
    text: "Track progress, measure impact and improve continuously.",
    icon: TrendingUp,
  },
];

function getDailyImpactData() {
  const today = new Date();

  const daySeed = Number(
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
  );

  const dailyMultiplier = 1 + ((daySeed % 17) / 1000);

  return {
    carbonKg: (4.2 * dailyMultiplier).toFixed(1),
    energyGwh: Math.round(980 * dailyMultiplier),
    assets: Math.round(126 * dailyMultiplier),
    roadmaps: Math.round(32 * dailyMultiplier),
    carbonTrend: 18 + (daySeed % 5),
    energyTrend: 22 + (daySeed % 4),
    assetsTrend: 15 + (daySeed % 6),
    roadmapsTrend: 28 + (daySeed % 3),
    lastUpdated: today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
}

function Header({ goToPage, openEnquiryForm }) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const nav = [
    ["Home", false],
    ["Services", true],
    ["Solutions", true],
    ["Industries", true],
    ["Research", false],
    ["Social Media", false],
    ["About Us", false],
  ];

  const menuContent = {
    Services: [
      {
        title: "Sustainability & Net Zero",
        text: "Decarbonisation strategy, ESG support, carbon reduction planning and net zero delivery.",
        action: () => goToPage && goToPage("SustainabilityNetZero"),
      },
      {
        title: "OT Security & Resilience",
        text: "Operational technology security, critical infrastructure resilience and risk management.",
        action: () => goToPage && goToPage("Homepage"),
      },
      {
        title: "Smart Energy Management",
        text: "Real-time energy insight, optimisation, automation and smarter operational performance.",
        action: () => goToPage && goToPage("Homepage"),
      },
      {
        title: "Smart Regulations & Compliance",
        text: "Connected device compliance, product security and smart infrastructure regulation advisory.",
        action: () => goToPage && goToPage("SmartRegulations"),
      },
    ],
    Solutions: [
      {
        title: "Decarbonisation Roadmaps",
        text: "Create practical, prioritised plans to reduce emissions, cost and operational risk.",
        action: () => goToPage && goToPage("SustainabilityNetZero"),
      },
      {
        title: "Smart Infrastructure Assurance",
        text: "Assess smart infrastructure readiness, security, compliance and resilience.",
        action: () => goToPage && goToPage("Homepage"),
      },
      {
        title: "Data-led Energy Optimisation",
        text: "Use data, sensors and analytics to improve asset and energy performance.",
        action: () => goToPage && goToPage("Homepage"),
      },
      {
        title: "Research & Insights",
        text: "Access applied research, innovation programmes and evidence-led insight.",
        action: () => goToPage && goToPage("Research"),
      },
    ],
    Industries: [
      {
        title: "Built Environment",
        text: "Supporting buildings, estates and infrastructure portfolios to become smarter and lower carbon.",
        action: () => goToPage && goToPage("SustainabilityNetZero"),
      },
      {
        title: "Public Sector & Local Authorities",
        text: "Helping public organisations plan, assure and deliver sustainable infrastructure.",
        action: () => goToPage && goToPage("SustainabilityNetZero"),
      },
      {
        title: "Manufacturers & Connected Products",
        text: "Helping product companies understand connected device security and compliance obligations.",
        action: () => goToPage && goToPage("SmartRegulations"),
      },
      {
        title: "Energy, Utilities & Critical Infrastructure",
        text: "Supporting resilient, secure and optimised operational environments.",
        action: () => goToPage && goToPage("Homepage"),
      },
    ],
  };

  const handleNavClick = (label, hasDropdown) => {
    if (hasDropdown) {
      setActiveMenu((current) => (current === label ? null : label));
      return;
    }

    if (label === "Home" && goToPage) goToPage("Homepage");
    if (label === "Research" && goToPage) goToPage("Research");
    if (label === "Social Media" && goToPage) goToPage("SocialMedia");
    if (label === "About Us" && goToPage) goToPage("AboutUs");

    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06112e]/95 text-white backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <button
          type="button"
          onClick={() => goToPage && goToPage("Homepage")}
          className="flex cursor-pointer items-center"
          aria-label="Smart Net Zero home"
        >
          <img
            src="/snzlogo.png"
            alt="Smart Net Zero"
            className="h-20 w-20 rounded-xl object-contain"
          />
        </button>

        <nav className="hidden items-center gap-8 text-sm font-bold lg:flex">
          {nav.map(([label, hasDropdown]) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavClick(label, hasDropdown)}
              className="relative flex cursor-pointer items-center gap-1.5 text-white/88 transition hover:text-white"
            >
              {label}
              {hasDropdown && (
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    activeMenu === label ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={openEnquiryForm}
          className="hidden cursor-pointer rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-900/20 transition hover:scale-[1.02] lg:inline-flex"
        >
          Contact Us <ArrowRight className="ml-2 h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/20 bg-white/5 p-2 lg:hidden"
          aria-label="Open menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {activeMenu && (
        <div className="hidden border-t border-white/10 bg-[#06112e]/98 shadow-2xl shadow-slate-950/30 lg:block">
          <div className="mx-auto grid max-w-7xl gap-5 px-8 py-6 md:grid-cols-4">
            {menuContent[activeMenu].map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  item.action();
                  setActiveMenu(null);
                }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-teal-300/40 hover:bg-white/10"
              >
                <h3 className="text-base font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/68">
                  {item.text}
                </p>

                <span className="mt-4 inline-flex items-center text-sm font-black text-teal-300">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-white/10 bg-[#06112e] px-5 pb-5 lg:hidden">
          {nav.map(([label, hasDropdown]) => (
            <div key={label}>
              <button
                type="button"
                onClick={() => handleNavClick(label, hasDropdown)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold text-white/90 hover:bg-white/10"
              >
                {label}
                {hasDropdown && (
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      activeMenu === label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {activeMenu === label && hasDropdown && (
                <div className="mb-3 grid gap-2 rounded-2xl bg-white/5 p-3">
                  {menuContent[label].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        item.action();
                        setOpen(false);
                        setActiveMenu(null);
                      }}
                      className="rounded-xl p-3 text-left hover:bg-white/10"
                    >
                      <p className="text-sm font-black text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/65">
                        {item.text}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={openEnquiryForm}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-pink-600 to-violet-700 px-4 py-3 text-left text-sm font-black text-white"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-visible rounded-b-[2rem] bg-[#06112e] text-white">
      <div
        className="absolute inset-0 -z-20 rounded-b-[2rem] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.88) 34%, rgba(6,17,46,0.32) 72%, rgba(6,17,46,0.08) 100%), url('/sustainability-hero-bg.png')",
        }}
      />

      <div className="absolute inset-0 -z-10 rounded-b-[2rem] bg-[radial-gradient(circle_at_78%_28%,rgba(34,197,94,.24),transparent_28%),radial-gradient(circle_at_88%_58%,rgba(45,212,191,.18),transparent_30%)]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-44 pt-36 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-teal-300" />
            A Smart Net Zero service
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.04] tracking-tight md:text-7xl">
            Sustainability &
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
              Net Zero
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/88">
            We help organisations reduce carbon, improve resilience, and deliver
            sustainable infrastructure transformation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex cursor-pointer items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 font-black shadow-xl transition hover:scale-[1.02]"
            >
              Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <a
                href="/Smart_Net_Zero_Sustainability_Brochure_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center rounded-2xl border border-teal-300/40 bg-white/5 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                Download Brochure <Download className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <div className="hidden lg:block" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-3xl border-2 border-white/80 bg-[#06112e]/92 shadow-2xl shadow-slate-950/30 ring-4 ring-white/35 backdrop-blur md:grid-cols-4">
            {heroPillars.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 p-5 ${
                    index > 0
                      ? "border-t border-white/10 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-green-300/30 bg-green-400/10">
                    <Icon className="h-8 w-8 text-green-300" />
                  </span>

                  <div>
                    <h3 className="font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/68">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="bg-white px-5 pb-10 pt-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {audienceCards.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className={`grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br ${item.colour} text-white`}
              >
                <Icon className="h-10 w-10" />
              </span>

              <div>
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>

              <ArrowRight className="ml-auto h-6 w-6 text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-600" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ImpactStudio({ openEnquiryForm, goToPage }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [buildings, setBuildings] = useState(25);
  const [spend, setSpend] = useState(5);
  const [maturity, setMaturity] = useState("Developing");

  const dailyImpact = useMemo(() => getDailyImpactData(), []);

  const liveMetrics = [
    {
      value: dailyImpact.carbonKg,
      unit: "M",
      suffix: "kg CO₂e",
      label: "reduction opportunities identified",
      change: dailyImpact.carbonTrend,
      icon: CloudCog,
      colour: "text-green-300",
    },
    {
      value: dailyImpact.energyGwh,
      unit: "",
      suffix: "GWh",
      label: "energy optimisation opportunity mapped",
      change: dailyImpact.energyTrend,
      icon: Zap,
      colour: "text-cyan-300",
    },
    {
      value: dailyImpact.assets,
      unit: "+",
      suffix: "",
      label: "assets and buildings assessed",
      change: dailyImpact.assetsTrend,
      icon: Building2,
      colour: "text-sky-300",
    },
    {
      value: dailyImpact.roadmaps,
      unit: "",
      suffix: "",
      label: "net zero roadmaps developed",
      change: dailyImpact.roadmapsTrend,
      icon: LineChart,
      colour: "text-lime-300",
    },
  ];

  const selectedStage = journeyStages[stageIndex];
  const selectedInsight = journeyStageInsights[selectedStage.title];

  const formatNumber = (value) =>
    new Intl.NumberFormat("en-GB").format(Math.round(value));

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(Math.round(value));

  const maturityFactors = {
    "Starting out": {
      savingLower: 0.12,
      savingUpper: 0.22,
      priority: "Baseline, quick wins and roadmap",
      confidence: "Low confidence",
      rationale:
        "Higher opportunity range because early-stage portfolios often have more low/no-cost energy efficiency and operational optimisation opportunities.",
    },
    Developing: {
      savingLower: 0.08,
      savingUpper: 0.18,
      priority: "Optimisation and delivery planning",
      confidence: "Medium confidence",
      rationale:
        "Moderate opportunity range for organisations that have started improving energy and carbon performance but still have optimisation potential.",
    },
    Advanced: {
      savingLower: 0.05,
      savingUpper: 0.12,
      priority: "Performance assurance and deeper interventions",
      confidence: "High confidence",
      rationale:
        "Lower remaining opportunity range because advanced organisations may already have captured quick wins and now require deeper, more targeted interventions.",
    },
  };

  const estimatorAssumptions = {
    electricityPricePerKwh: 0.22,
    emissionsFactorKgPerKwh: 0.207,
  };

  const estimate = useMemo(() => {
    const factor = maturityFactors[maturity] || maturityFactors.Developing;

    const annualEnergySpendGbp = spend * 1000000;

    const lowerSavingGbp = annualEnergySpendGbp * factor.savingLower;
    const upperSavingGbp = annualEnergySpendGbp * factor.savingUpper;

    const lowerEnergyKwh =
      lowerSavingGbp / estimatorAssumptions.electricityPricePerKwh;
    const upperEnergyKwh =
      upperSavingGbp / estimatorAssumptions.electricityPricePerKwh;

    const lowerCarbonKg =
      lowerEnergyKwh * estimatorAssumptions.emissionsFactorKgPerKwh;
    const upperCarbonKg =
      upperEnergyKwh * estimatorAssumptions.emissionsFactorKgPerKwh;

    const lowerCarbonTonnes = lowerCarbonKg / 1000;
    const upperCarbonTonnes = upperCarbonKg / 1000;

    return {
      savingRangePercent: `${Math.round(
        factor.savingLower * 100
      )}–${Math.round(factor.savingUpper * 100)}%`,
      savings: `${formatCurrency(lowerSavingGbp)}–${formatCurrency(
        upperSavingGbp
      )}`,
      carbon: `${formatNumber(lowerCarbonTonnes)}–${formatNumber(
        upperCarbonTonnes
      )}`,
      priority: factor.priority,
      confidence: factor.confidence,
      rationale: factor.rationale,
    };
  }, [buildings, spend, maturity]);

  return (
    <section className="bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                SmartX360 Net Zero Impact Studio
              </h2>

              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Live
              </span>

              <span className="text-xs font-bold text-slate-400">
                Updated daily · {dailyImpact.lastUpdated}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => goToPage && goToPage("ImpactDashboard")}
            className="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
            View Full Impact Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
          <div className="grid gap-6">
            <div className="rounded-3xl bg-[#06112e] p-5 text-white shadow-2xl shadow-slate-900/10 md:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-white/85">
                  Live Impact Index
                </p>

                <span className="rounded-full border border-teal-300/20 bg-white/5 px-3 py-1 text-xs font-bold text-white/55">
                  Daily indexed
                </span>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.92fr_1.45fr]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {liveMetrics.map((metric) => {
                    const Icon = metric.icon;

                    return (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-teal-300/20 bg-[#081a36] p-5 shadow-inner shadow-cyan-950/30"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <Icon className={`h-8 w-8 ${metric.colour}`} />

                          <span className="rounded-full bg-green-400/10 px-2 py-1 text-[10px] font-black text-green-300">
                            ▲ {metric.change}%
                          </span>
                        </div>

                        <div className="mt-4 flex items-end gap-1">
                          <p className={`text-4xl font-black ${metric.colour}`}>
                            {metric.value}
                          </p>

                          <p className="pb-1 text-sm font-black text-white/75">
                            {metric.unit}
                          </p>
                        </div>

                        {metric.suffix && (
                          <p className="mt-1 text-sm font-black text-white/80">
                            {metric.suffix}
                          </p>
                        )}

                        <p className="mt-2 text-xs leading-5 text-white/64">
                          {metric.label}
                        </p>

                        <p className="mt-3 text-[11px] font-bold text-green-300/85">
                          vs last 30 days
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-white">
                        Carbon Reduction Potential Over Time
                      </p>

                      <p className="mt-2 text-4xl font-black">
                        {dailyImpact.carbonKg}M{" "}
                        <span className="text-base text-white/70">
                          kg CO₂e
                        </span>
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        Total potential identified
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-[#06112e] px-3 py-1 text-xs text-white/60">
                      Last 12 months
                    </span>
                  </div>

                  <div className="mt-6 h-72 rounded-xl bg-[linear-gradient(180deg,rgba(34,197,94,.20),rgba(34,197,94,.03))] p-4">
                    <svg viewBox="0 0 620 260" className="h-full w-full">
                      <defs>
                        <linearGradient id="snzImpactLine" x1="0" x2="1">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#86efac" />
                        </linearGradient>

                        <linearGradient
                          id="snzImpactArea"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(34,197,94,0.42)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(34,197,94,0.02)"
                          />
                        </linearGradient>
                      </defs>

                      {[50, 100, 150, 200, 250].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          y1={y}
                          x2="620"
                          y2={y}
                          stroke="rgba(255,255,255,0.08)"
                        />
                      ))}

                      <path
                        d="M0 230 L62 208 L124 188 L186 160 L248 150 L310 120 L372 100 L434 72 L496 58 L558 40 L620 22 L620 260 L0 260 Z"
                        fill="url(#snzImpactArea)"
                      />

                      <polyline
                        fill="none"
                        stroke="url(#snzImpactLine)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="0,230 62,208 124,188 186,160 248,150 310,120 372,100 434,72 496,58 558,40 620,22"
                      />

                      {[
                        [0, 230],
                        [124, 188],
                        [248, 150],
                        [372, 100],
                        [496, 58],
                        [620, 22],
                      ].map(([x, y]) => (
                        <circle
                          key={`${x}-${y}`}
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#86efac"
                          stroke="#06112e"
                          strokeWidth="3"
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="mt-3 flex justify-between text-[11px] font-bold text-white/45">
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>May</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    Net Zero Journey Explorer
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Select a stage to see what good progress looks like.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex w-fit cursor-pointer items-center rounded-xl border border-green-300 bg-white px-4 py-2 text-sm font-black text-green-700 transition hover:bg-green-50"
                >
                  Explore this stage <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="mt-5">
                <div className="relative px-2">
                  <div className="absolute left-8 right-8 top-5 h-2 rounded-full bg-slate-100" />
                  <div className="absolute left-8 right-8 top-5 h-2 rounded-full bg-gradient-to-r from-green-500 via-teal-400 to-cyan-400 opacity-80" />

                  <div className="relative grid grid-cols-5 gap-2">
                    {journeyStages.map((stage, index) => (
                      <button
                        key={stage.label}
                        type="button"
                        onClick={() => setStageIndex(index)}
                        className="group flex flex-col items-center text-center"
                      >
                        <span
                          className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 text-base font-black shadow-md transition ${
                            stageIndex === index
                              ? "border-green-200 bg-green-600 text-white shadow-green-600/25"
                              : "border-white bg-slate-200 text-slate-600 group-hover:bg-green-100 group-hover:text-green-700"
                          }`}
                        >
                          {index + 1}
                        </span>

                        <span
                          className={`mt-3 text-sm font-black leading-tight transition ${
                            stageIndex === index
                              ? "text-green-700"
                              : "text-slate-600"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-5 rounded-2xl bg-slate-50 p-5 md:grid-cols-[0.75fr_1.25fr] md:items-start">
                <div className="pt-0">
                  <h4 className="text-2xl font-black leading-tight text-slate-950">
                    {selectedStage.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedStage.text}
                  </p>
                </div>

                <div className="space-y-2">
                  {selectedStage.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                      <p className="text-sm font-semibold leading-6 text-slate-700">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-cyan-50 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-green-700">
                      Stage Readiness Snapshot
                    </p>

                    <h4 className="mt-2 text-2xl font-black text-slate-950">
                      {selectedInsight.readiness}
                    </h4>

                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {selectedInsight.confidence} confidence
                    </p>
                  </div>

                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200 md:max-w-xs">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-cyan-400"
                      style={{
                        width: selectedInsight.readiness,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      Output
                    </p>
                    <p className="mt-2 text-sm font-black leading-5 text-slate-800">
                      {selectedInsight.output}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      Risk reduced
                    </p>
                    <p className="mt-2 text-sm font-black leading-5 text-slate-800">
                      {selectedInsight.risk}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      Data needed
                    </p>
                    <p className="mt-2 text-sm font-black leading-5 text-slate-800">
                      {selectedInsight.data}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      Next action
                    </p>
                    <p className="mt-2 text-sm font-black leading-5 text-slate-800">
                      {selectedInsight.action}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 lg:h-full lg:min-h-[760px]">
            <div className="flex w-full flex-col">
              <div>
                <h3 className="text-xl font-black text-slate-950">
                  Opportunity Estimator
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Estimate potential annual impact from asset scale, energy
                  spend and current net zero maturity.
                </p>

                <label className="mt-5 block">
                  <span className="text-sm font-bold text-slate-700">
                    Number of buildings
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={buildings}
                    onChange={(event) =>
                      setBuildings(Number(event.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-green-400"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-sm font-bold text-slate-700">
                    Annual energy spend £m
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={spend}
                    onChange={(event) => setSpend(Number(event.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-green-400"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-sm font-bold text-slate-700">
                    Current maturity
                  </span>

                  <select
                    value={maturity}
                    onChange={(event) => setMaturity(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-green-400"
                  >
                    <option>Starting out</option>
                    <option>Developing</option>
                    <option>Advanced</option>
                  </select>
                </label>

                <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-slate-500">
                      Indicative opportunity range
                    </p>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                      {estimate.confidence}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                        Potential operating savings
                      </p>

                      <p className="mt-2 text-2xl font-black text-green-700">
                        {estimate.savings}
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-500">
                        equivalent to {estimate.savingRangePercent} of annual
                        energy spend
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                        Potential carbon reduction
                      </p>

                      <p className="mt-2 text-3xl font-black text-teal-700">
                        {estimate.carbon}
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-500">
                        tCO₂e per year
                      </p>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-green-700">
                        Suggested focus
                      </p>

                      <p className="mt-2 text-sm font-black leading-6 text-slate-800">
                        {estimate.priority}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {estimate.rationale}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-5">
                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-5 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Benchmark your net zero journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Results are indicative and for guidance only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionPathwayModal({ solution, onClose, openEnquiryForm }) {
  if (!solution) return null;

  const details = solutionDetails[solution.title];

  if (!details) return null;

  const Icon = solution.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-5 py-8 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl shadow-slate-950/40">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:bg-slate-100"
          aria-label="Close solution details"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] px-7 pb-14 pt-14 text-white md:px-10"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.84) 48%, rgba(6,17,46,0.40) 100%), url('${solution.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-white/10 px-4 py-2 text-sm font-black text-green-100 backdrop-blur">
              <Icon className={`h-5 w-5 ${solution.accent}`} />
              Solution Pathway
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              {solution.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/82">
              {details.headline}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-7 md:p-10 lg:grid-cols-[0.95fr_1.4fr_0.9fr]">
          <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-green-700">
              Best for
            </p>

            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">
              {details.bestFor}
            </p>

            <div className="mt-6 space-y-3">
              {details.impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-950">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-950">
              Solution pathway
            </h3>

            <div className="mt-6 space-y-5">
              {details.pathway.map((step, index) => (
                <div key={step.step} className="relative flex gap-4">
                  {index < details.pathway.length - 1 && (
                    <div className="absolute left-5 top-11 h-full w-0.5 bg-gradient-to-b from-green-400 to-cyan-300" />
                  )}

                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-green-500 to-cyan-500 text-sm font-black text-white shadow-lg">
                    {index + 1}
                  </span>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <h4 className="text-base font-black text-slate-950">
                      {step.step}
                    </h4>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              Expected outcomes
            </h3>

            <div className="mt-5 space-y-4">
              {details.outcomes.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-white bg-white/80 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Supported by
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {details.relatedServices.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-black text-green-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-7 py-6 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-black text-slate-950">
                Want to explore this solution pathway?
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Smart Net Zero can help assess your current position and define
                the right next step.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openEnquiryForm && openEnquiryForm();
                }}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
              >
                Start this pathway <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionsSection({ openEnquiryForm }) {
  const [selectedSolution, setSelectedSolution] = useState(null);

  return (
    <section className="bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
          Key Solutions & Focus Areas
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-center text-sm font-semibold leading-6 text-slate-500">
          Explore practical solution pathways that help organisations move from
          sustainability ambition to measurable planning, delivery and assurance.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {solutionCards.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex min-h-[380px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-1 flex-col p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-green-100">
                      <Icon className={`h-8 w-8 ${item.accent}`} />
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                      Pathway
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-black leading-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedSolution(item)}
                    className="mt-auto inline-flex cursor-pointer items-center text-sm font-black text-green-700 transition hover:text-green-900"
                  >
                    View pathway <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                <div className="relative h-32 shrink-0 overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0), rgba(6,17,46,.08)), url('${item.image}')`,
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/80 to-transparent" />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <SolutionPathwayModal
        solution={selectedSolution}
        onClose={() => setSelectedSolution(null)}
        openEnquiryForm={openEnquiryForm}
      />
    </section>
  );
}

function AdvisoryServiceModal({ service, onClose, openEnquiryForm }) {
  if (!service) return null;

  const details = advisoryServiceDetails[service.title];

  if (!details) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-5 py-8 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl shadow-slate-950/40">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:bg-slate-100"
          aria-label="Close service details"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] px-7 pb-12 pt-14 text-white md:px-10"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.82) 52%, rgba(6,17,46,0.45) 100%), url('${service.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-white/10 px-4 py-2 text-sm font-black text-green-100 backdrop-blur">
              <service.icon className={`h-5 w-5 ${service.colour}`} />
              Advisory Service
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              {service.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/82">
              {details.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-7 md:p-10 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              What this provides
            </h3>

            <div className="mt-5 space-y-4">
              {details.provides.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              Customer benefits
            </h3>

            <div className="mt-5 space-y-4">
              {details.benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              Suggested use cases
            </h3>

            <div className="mt-5 space-y-4">
              {details.useCases.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-7 py-6 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-black text-slate-950">
                Want to explore this service?
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Speak to Smart Net Zero about how this could apply to your
                organisation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openEnquiryForm && openEnquiryForm();
                }}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
              >
                Talk to an Expert <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvisoryServicesSection({ openEnquiryForm }) {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
  const modalToOpen = sessionStorage.getItem("sustainabilityOpenModal");

  if (!modalToOpen) return;

  const matchedService = advisoryServices.find(
    (service) =>
      service.id === modalToOpen ||
      service.title === "Net Zero Roadmaps & Strategy"
  );

  if (matchedService) {
    setSelectedService(matchedService);
  }

  sessionStorage.removeItem("sustainabilityOpenModal");
  }, []);

  return (
    <section id="services" className="bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
          Advisory Services
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {advisoryServices.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex min-h-[330px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-1 flex-col p-6 pb-4">
                  <Icon className={`h-10 w-10 ${item.colour}`} />

                  <h3 className="mt-4 text-lg font-black leading-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className="mt-auto inline-flex cursor-pointer items-center text-sm font-black text-teal-700 transition hover:text-teal-900"
                  >
                    Find out more <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                <div
                  className="h-24 shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0), rgba(6,17,46,.08)), url('${item.image}')`,
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>

      <AdvisoryServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        openEnquiryForm={openEnquiryForm}
      />
    </section>
  );
}

function JourneySection() {
  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl">
        <h2 className="text-center text-3xl font-black">
          Our 4-Step Sustainability Journey
        </h2>

        <div className="mt-7 grid gap-5 lg:grid-cols-4">
          {fourStepJourney.map((item) => {
            const Icon = item.icon;

            return (
                <div key={item.title} className="relative flex items-center gap-4">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-green-300/30 bg-green-400/10">
                    <Icon className="h-10 w-10 text-green-300" />
                </span>

                <div>
                    <h3 className="text-lg font-black">
                    {item.number} {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/72">
                    {item.text}
                    </p>
                </div>
                </div>
            );
            })}
        </div>
      </div>
    </section>
  );
}

function CTASection({ openEnquiryForm }) {
  return (
    <section className="bg-white px-5 pb-16 pt-6 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:p-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.90) 46%, rgba(34,197,94,0.20) 100%), url('/sustainability-cta-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <span className="grid h-28 w-28 place-items-center rounded-full border border-green-300/30 bg-green-400/10">
            <Leaf className="h-16 w-16 text-green-200" />
          </span>

          <div>
            <h2 className="text-3xl font-black leading-tight">
              Ready to accelerate your net zero journey?
            </h2>

            <p className="mt-3 max-w-2xl text-white/75">
              Let’s build a smarter, more sustainable future together.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 font-black shadow-xl transition hover:scale-[1.02]"
          >
            Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function SustainabilityNetZero({ goToPage, openEnquiryForm }) {

  useEffect(() => {
    document.title = "Sustainability & Net Zero | Smart Net Zero";
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SustainabilityNetZero"
      />

      <main>
        <Hero />
        <AudienceSection />
        <ImpactStudio
            openEnquiryForm={openEnquiryForm}
            goToPage={goToPage}
        />
        <SolutionsSection openEnquiryForm={openEnquiryForm} />
        <AdvisoryServicesSection openEnquiryForm={openEnquiryForm} />
        <JourneySection />
        <CTASection openEnquiryForm={openEnquiryForm} />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}