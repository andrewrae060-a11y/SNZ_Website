import { useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileCheck2,
  Gauge,
  Globe2,
  Handshake,
  LineChart,
  LockKeyhole,
  Monitor,
  PlugZap,
  Radio,
  RadioTower,
  Settings2,
  ShieldCheck,
  ShieldPlus,
  Smartphone,
  Snowflake,
  Star,
  Target,
  Users,
  Wifi,
  X,
} from "lucide-react";

const leaders = [
  {
    name: "Richard Jennings",
    role: "Managing Director",
    text: "Sets the strategic direction and leads the business in delivering innovative, future-ready solutions.",
    image: "/richard-jennings-profile.png",
    linkedin: "https://uk.linkedin.com/in/richard-jennings-10048972",
  },
  {
    name: "Danny Carroll",
    role: "Operations & Energy Director",
    text: "Leads delivery excellence across projects, operations and smart energy initiatives.",
    image: "/danny-carroll-profile.png",
    linkedin: "https://uk.linkedin.com/in/danny-carroll-28262b16",
  },
  {
    name: "Alison MacLeod",
    role: "Finance Director",
    text: "Drives financial strategy and governance, ensuring long-term stability and sustainable growth.",
    image: "/alison-macleod-profile.png",
    linkedin: "https://www.linkedin.com/in/alison-macleod-26652035/",
  },
  {
    name: "Andrew Rae",
    role: "Innovation & Resilience Director",
    text: "Focuses on innovation and building resilient infrastructure that adapts to future challenges.",
    image: "/andrew-rae-profile.png",
    linkedin: "https://www.linkedin.com/in/andrew-rae-a880611b6/",
  },
  {
    name: "Sajan Shivshanker",
    role: "Growth & Strategy Director",
    text: "Leads growth initiatives and partnerships that expand our impact and create long-term value.",
    image: "/sajan-shivshanker-profile.png",
    linkedin: "https://www.linkedin.com/in/sajan-shivshanker-b45312b/",
  },
];

const promises = [
  {
    title: "Sustainable by design",
    text: "We embed sustainability into every solution we deliver.",
    icon: "🌱",
  },
  {
    title: "Data-driven outcomes",
    text: "We use data and technology to drive measurable results.",
    icon: "📊",
  },
  {
    title: "Collaborative partners",
    text: "We work alongside our clients and partners every step of the way.",
    icon: "🤝",
  },
  {
    title: "Trusted expertise",
    text: "Our team brings deep experience and a commitment to excellence.",
    icon: "🛡️",
  },
];

const boomPartnerDetails = {
  website: "https://www.boominc.ai/",
  pedigree:
    "BOOM Interactive is an AI technology company focused on the built world, supporting workflows from design through to facilities management. Its platform capabilities include image recognition, drawing-to-data conversion, editable 3D metadata, real-time collaboration and digital twin workflows.",
  benefits: [
    {
      title: "Faster building insight",
      text: "Combines Smart Net Zero advisory with BOOM digital twin and building data capabilities to accelerate better decisions.",
      icon: "⚡",
    },
    {
      title: "Better retrofit planning",
      text: "Clearer spatial and as-built data can support decarbonisation, resilience, asset planning and compliance programmes.",
      icon: "🏢",
    },
    {
      title: "Improved lifecycle outcomes",
      text: "Better asset visibility helps customers improve performance, collaboration and long-term sustainability outcomes.",
      icon: "🛡️",
    },
  ],
  tags: [
    "AI building data",
    "Digital twins",
    "3D metadata",
    "Real-time collaboration",
    "Facilities management",
    "Asset intelligence",
  ],
};

const safeSharkPartnerDetails = {
  website: "https://www.safeshark.co.uk/",
  background: [
    "Specialist cybersecurity compliance testing for connected consumer and IoT products.",
    "RED, CRA and PSTI compliance testing specialists for UK and EU market access.",
    "Full product tests against EN 18031 and EN 303 645 standards.",
    "Supports manufacturers in proving connected products are ready for market access.",
    "Provides continuous RED, CRA and PSTI compliance testing to identify vulnerabilities before they become threats.",
    "Works closely with governments, standards organisations and Notified Body partners.",
  ],
  benefits: [
    "Joined-up regulatory advisory from Smart Net Zero, strengthened by SafeShark’s specialist product cybersecurity testing capability.",
    "A clearer route from connected product requirements through compliance testing, evidence and market readiness.",
    "Stronger support for customers deploying smart, connected and IoT-enabled infrastructure across regulated UK and EU markets.",
    "Reduced risk of delays, rework or market access issues by aligning regulation, security, deployment and assurance early.",
    "Improved confidence that connected products, devices and smart technologies are secure, compliant and ready to scale.",
  ],
  tags: [
    "RED",
    "CRA",
    "PSTI",
    "EN 18031",
    "EN 303 645",
    "Product Testing",
    "IoT Security",
    "UK Market Access",
    "EU Market Access",
  ],
};

const loweConexPartnerDetails = {
  website: "https://loweconex.com/",
  background: [
    "Unified asset intelligence platform for connected estates.",
    "Conex OS connects BMS, assets, energy meters, controllers and IoT devices into one platform.",
    "Supports estate-wide visibility, automation and control of connected devices.",
    "Helps resolve scattered FM data across BMS, CAFM, energy meters, controllers and IoT devices.",
    "Enables a no-hardware, no-CapEx approach to smarter estate optimisation.",
    "Three-phase methodology covering BMS integration, data visualisation, automated workflows, AI analytics, energy and maintenance optimisation.",
  ],
  benefits: [
    "Joined-up smart estate advisory from Smart Net Zero, strengthened by LoweConex’s unified asset intelligence platform.",
    "Better visibility of energy, maintenance and connected asset performance across complex estates.",
    "Stronger pathway from decarbonisation strategy to operational control and measurable optimisation.",
    "Improved ability to identify energy waste, maintenance issues and capital replacement priorities.",
    "More practical support for customers managing smart buildings, connected assets, FM data and net zero delivery.",
  ],
  tags: [
    "Conex OS",
    "BMS Integration",
    "IoT",
    "Asset Intelligence",
    "Energy Optimisation",
    "HVAC",
    "Refrigeration",
    "Fault Detection",
    "Work Order Automation",
  ],
};

const kmcConsultingPartnerDetails = {
  website: "https://www.kmccontrols.com/consulting/",
  background: [
    "KMC Consulting brings together 40+ experienced specialists across strategy, operations, technology and cybersecurity.",
    "700+ years of combined subject matter expertise across the consulting team.",
    "22 graduate degrees and 30+ specialty areas supporting complex transformation challenges.",
    "Focused expertise across business process, strategic alignment and cybersecurity.",
    "Specialist smart building and OT cybersecurity insight for connected, operational environments.",
  ],
  benefits: [
    "Joined-up sustainability, resilience and smart building advisory, strengthened by KMC Consulting’s strategy, process and cybersecurity expertise.",
    "Better alignment between net zero ambition, operational execution and secure smart infrastructure delivery.",
    "Stronger support for the convergence of carbon, energy, building systems, OT security and business risk.",
    "Practical pathways from strategy to implementation across complex estates and connected environments.",
    "Greater confidence when making investment, transformation and resilience decisions.",
  ],
  tags: [
    "Business Process",
    "Strategic Alignment",
    "Cybersecurity",
    "OT Security",
    "Smart Buildings",
    "Data & Analytics",
    "Consulting Services",
    "Trusted Advisors",
  ],
};

function Header({ goToPage, openEnquiryForm }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    ["Home", "Homepage"],
    ["Sustainability", "SustainabilityNetZero"],
    ["Smart Regulations", "SmartRegulations"],
    ["Research", "Research"],
    ["Social Media", "SocialMedia"],
    ["About Us", "AboutUs"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 text-slate-950 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
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

        <nav className="hidden items-center gap-8 text-sm font-black lg:flex">
          {navItems.map(([label, page]) => (
            <button
              key={label}
              type="button"
              onClick={() => goToPage && goToPage(page)}
              className={`relative transition hover:text-violet-700 ${
                page === "AboutUs"
                  ? "text-slate-950 after:absolute after:-bottom-5 after:left-0 after:h-0.5 after:w-full after:bg-emerald-400"
                  : "text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("partners")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative transition hover:text-violet-700"
          >
            Partnerships
          </button>
        </nav>

        <button
          type="button"
          onClick={openEnquiryForm}
          className="hidden cursor-pointer rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-900/20 transition hover:scale-[1.02] lg:inline-flex"
        >
          Contact Us →
        </button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xl lg:hidden"
          aria-label="Open menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 lg:hidden">
          {navItems.map(([label, page]) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                goToPage && goToPage(page);
                setOpen(false);
              }}
              className="block w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("partners")
                ?.scrollIntoView({ behavior: "smooth" });
              setOpen(false);
            }}
            className="block w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            Partnerships
          </button>

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

function OurStorySection() {
  const keyStats = [
    {
      value: "£1.8m+",
      label: "UK grant funding secured",
    },
    {
      value: "20+",
      label: "JVs, partnerships and pilots in development",
    },
    {
      value: "12m+",
      label: "sq ft estate rollout planned",
    },
  ];

  const storyPillars = [
    {
      number: "01",
      title: "Defensible Technology & IP",
      text: "SNZ is developing proprietary smart infrastructure tools, AI-enabled decision workflows and frameworks that support smarter, safer and lower-carbon estates.",
      points: [
        "SmartDecarb360™ established as a registered product trademark",
        "Developed our own SmartX360 AI engine and neural-network architecture",
        "Proprietary frameworks for building decarbonisation readiness and smart building maturity",
      ],
    },
    {
      number: "02",
      title: "Government & Academic Validation",
      text: "Our work has been validated through public funding, research partnerships and government-supported innovation activity.",
      points: [
        "Over £1.8m in UK grant funding secured",
        "Further R&D funding of over £2.5m pipeline developing",
        "Government-supported pilots with UK academic partners",
      ],
    },
    {
      number: "03",
      title: "National Leadership",
      text: "SNZ has helped shape the future skills and standards agenda for smart infrastructure and OT cybersecurity.",
      points: [
        "Led in establishing the UK’s first National Occupational Standard in Smart Infrastructure and OT Cybersecurity",
        "Underway in Global First SMart Infrastructure Skills Centres of Excellence programme",
        "Supporting the smart skills transition across the UK's Cold Chain",
  
      ],
    },
    {
      number: "04",
      title: "Strong Market Traction",
      text: "SNZ is moving from innovation and pilots into commercial scale, partnerships and platform-led delivery.",
      points: [
        "Over 20 JVs, partnerships and pilots in development",
        "More than 12 million sq ft of building estate rollout planned",
        "Growing global pipeline across infrastructure, estates, energy and smart building markets",
      ],
    },
  ];

  const focusPoints = [
    {
      title: "Carbon",
      text: "Helping organisations prioritise decarbonisation decisions and evidence measurable progress.",
    },
    {
      title: "Resilience",
      text: "Strengthening infrastructure against operational, climate and cyber-physical disruption.",
    },
    {
      title: "Capital",
      text: "Turning net zero into an investable programme with clearer business cases and prioritised actions.",
    },
    {
      title: "Operations",
      text: "Using data and smart systems to improve asset performance, efficiency and long-term value.",
    },
  ];

  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-white px-5 py-16 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(168,85,247,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-600">
              Our Story
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#07133c] md:text-5xl">
              Building smarter, safer and lower-carbon infrastructure.
            </h2>

            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              Smart Net Zero was created to help organisations make better
              infrastructure decisions by connecting sustainability, resilience,
              technology and investment. We bring together practical delivery,
              innovation and evidence-led insight to help customers move from
              ambition to measurable impact.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {keyStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-4xl font-black text-teal-600">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-5 text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[#06112e] p-7 text-white shadow-2xl shadow-slate-950/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(236,72,153,0.18),transparent_32%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

            <div className="relative z-10">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
                What makes SNZ different
              </p>

              <h3 className="mt-4 text-3xl font-black leading-tight">
                We connect carbon, resilience, capital and operations into one
                practical delivery model.
              </h3>

              <p className="mt-4 text-base font-semibold leading-7 text-white/72">
                Our work is designed for organisations that need more than
                strategy documents. We help customers understand the estate,
                prioritise action, evidence value and build smarter operating
                models for the future.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {focusPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <p className="text-lg font-black text-cyan-200">
                      {point.title}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/64">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>
             
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {storyPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-sm font-black text-white">
                {pillar.number}
              </span>

              <h3 className="mt-5 text-xl font-black leading-tight text-[#07133c]">
                {pillar.title}
              </h3>

              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                {pillar.text}
              </p>

              <ul className="mt-5 space-y-3">
                {pillar.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function BoomPartnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const focusAreas = [
    {
      label: "AI Building Data",
      icon: BarChart3,
      colour: "border-pink-400/50 text-pink-300",
    },
    {
      label: "Digital Twins",
      icon: Building2,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "3D Metadata",
      icon: Monitor,
      colour: "border-yellow-300/60 text-yellow-200",
    },
    {
      label: "Real-time Collaboration",
      icon: Users,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "Facilities Management",
      icon: Settings2,
      colour: "border-pink-400/50 text-pink-300",
    },
    {
      label: "Asset Intelligence",
      icon: Gauge,
      colour: "border-yellow-300/60 text-yellow-200",
    },
    {
      label: "Retrofit Planning",
      icon: LineChart,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "Lifecycle Insight",
      icon: ShieldCheck,
      colour: "border-pink-400/50 text-pink-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-5 py-8 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#080d14] text-white shadow-2xl shadow-slate-950/60">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close BOOM partner spotlight"
          className="absolute right-5 top-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-3xl text-white transition hover:bg-white/20"
        >
          ×
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] border-b border-white/10 bg-cover bg-center px-7 py-10 md:px-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(7,11,16,0.98) 0%, rgba(7,11,16,0.90) 34%, rgba(7,11,16,0.56) 52%, rgba(7,11,16,0.20) 76%, rgba(7,11,16,0.08) 100%), url('/boom-partner-header-bg.png')",
          }}
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
                Partner Spotlight
              </p>

              <div className="mt-7">
                <img
                  src="/boom-logo-white.png"
                  alt="BOOM Interactive"
                  className="h-auto w-[390px] max-w-full object-contain"
                />
              </div>

              <h3 className="mt-8 max-w-xl text-3xl font-black leading-tight md:text-4xl">
                AI, 3D data and digital twin workflows for the built world.
              </h3>

              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300 via-pink-400 to-yellow-300" />

              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/76">
                BOOM Interactive helps turn building information into more
                usable, collaborative and intelligent digital asset data —
                supporting smarter planning, retrofit, operations and lifecycle
                decision-making.
              </p>
            </div>

            <div className="hidden min-h-[330px] lg:block" />
          </div>
        </div>

        <div className="grid gap-5 px-7 py-7 md:px-10 lg:grid-cols-[0.95fr_0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
                <Building2 className="h-7 w-7 text-cyan-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">Background</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  BOOM Interactive is an AI technology company focused on the
                  built world.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Supports workflows from design through to facilities
                  management.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Platform capabilities include image recognition,
                  drawing-to-data conversion and editable 3D metadata.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Enables real-time collaboration and digital twin workflows for
                  intelligent building assets.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Helps create clearer, more actionable building data for asset
                  owners, operators and project teams.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-pink-400/50 bg-pink-400/10">
                <Star className="h-7 w-7 text-pink-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Customer Benefits
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-pink-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Joined-up Smart Net Zero advisory strengthened by BOOM’s AI,
                  3D data and digital twin capabilities.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Faster building insight to support decarbonisation,
                  resilience, retrofit and asset planning decisions.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Better as-built and spatial data to improve collaboration
                  across estates, projects and operational teams.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Stronger pathway from building data capture to practical
                  retrofit, compliance and lifecycle improvement actions.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                <p className="text-sm font-semibold leading-6 text-white/76">
                  Greater confidence when making investment decisions across
                  complex, data-poor or hard-to-assess building portfolios.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-yellow-300/50 bg-yellow-300/10">
                <Globe2 className="h-7 w-7 text-yellow-200" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Website Snapshot
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-yellow-300" />
              </div>
            </div>

            <a
              href={boomPartnerDetails.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 block overflow-hidden rounded-2xl border border-white/15 bg-[#05080c] shadow-2xl shadow-black/40 transition hover:-translate-y-1 hover:border-yellow-300/50"
            >
              <div className="h-3 rounded-t-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-300" />

              <div className="overflow-hidden">
                <img
                  src="/boom-website-snapshot.png"
                  alt="BOOM Interactive website snapshot"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-black text-yellow-200">
                  www.boominc.ai
                </span>

                <ExternalLink className="h-5 w-5 shrink-0 text-yellow-200 transition group-hover:translate-x-1" />
              </div>
            </a>
          </article>
        </div>

        <div className="border-t border-white/10 px-7 py-5 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-white">
              Key Tags
            </p>

            <div className="flex flex-wrap gap-3">
              {focusAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className={`inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-5 py-2 text-sm font-bold ${item.colour}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-7 py-2 md:px-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111d] px-4 py-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_50%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_86%_50%,rgba(250,204,21,0.14),transparent_30%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(34,211,238,.12)_1px,transparent_1px),linear-gradient(rgba(236,72,153,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10 flex h-16 items-center justify-center">
              <img
                src="/snz-partner-network-logo.png"
                alt="SNZ Partner Network"
                className="h-auto w-[255px] max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafeSharkPartnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const focusAreas = [
    {
      label: "RED",
      icon: Radio,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "CRA",
      icon: ShieldPlus,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "PSTI",
      icon: FileCheck2,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "EN 18031",
      icon: ClipboardCheck,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "EN 303 645",
      icon: BookOpenCheck,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "Product Testing",
      icon: CheckCircle2,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "IoT Security",
      icon: Smartphone,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "Market Access",
      icon: Globe2,
      colour: "border-cyan-400/50 text-cyan-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-5 py-8 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#06112e] text-white shadow-2xl shadow-slate-950/60">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close SafeShark partner spotlight"
          className="absolute right-5 top-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-3xl text-white transition hover:bg-white/20"
        >
          ×
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] border-b border-white/10 bg-cover bg-center px-7 py-10 md:px-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 32%, rgba(255,255,255,0.66) 48%, rgba(6,17,46,0.38) 68%, rgba(6,17,46,0.10) 100%), url('/safeshark-header-bg.png')",
          }}
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-[#07133c]">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-600">
                Partner Spotlight
              </p>

              <div className="mt-7">
                <img
                  src="/safeshark-logo.png"
                  alt="SafeShark"
                  className="h-auto w-[390px] max-w-full object-contain"
                />
              </div>

              <h3 className="mt-8 max-w-xl text-3xl font-black leading-tight md:text-4xl">
                Cybersecurity compliance testing for connected products.
              </h3>

              <div className="mt-5 h-1 w-16 rounded-full bg-blue-500" />

              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-700">
                SafeShark helps manufacturers prove connected products are ready
                for UK and EU market access through straightforward RED, CRA and
                PSTI cybersecurity compliance testing.
              </p>
            </div>

            <div className="hidden min-h-[330px] lg:block" />
          </div>
        </div>

        <div className="grid gap-5 px-7 py-7 md:px-10 lg:grid-cols-[0.95fr_0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-blue-400/40 bg-blue-400/10">
                <ShieldCheck className="h-7 w-7 text-blue-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">Background</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-blue-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {safeSharkPartnerDetails.background.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-cyan-400/50 bg-cyan-400/10">
                <Star className="h-7 w-7 text-cyan-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Customer Benefits
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {safeSharkPartnerDetails.benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-blue-400/40 bg-blue-400/10">
                <Globe2 className="h-7 w-7 text-blue-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Website Snapshot
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-blue-400" />
              </div>
            </div>

            <a
              href={safeSharkPartnerDetails.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 block overflow-hidden rounded-2xl border border-white/15 bg-[#05080c] shadow-2xl shadow-black/40 transition hover:-translate-y-1 hover:border-blue-300/50"
            >
              <div className="h-3 rounded-t-2xl bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400" />

              <div className="overflow-hidden">
                <img
                  src="/safeshark-website-snapshot.png"
                  alt="SafeShark website snapshot"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-black text-cyan-300">
                  www.safeshark.co.uk
                </span>

                <ExternalLink className="h-5 w-5 shrink-0 text-cyan-300 transition group-hover:translate-x-1" />
              </div>
            </a>
          </article>
        </div>

        <div className="border-t border-white/10 px-7 py-5 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-white">
              Key Tags
            </p>

            <div className="flex flex-wrap gap-3">
              {focusAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className={`inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-5 py-2 text-sm font-bold ${item.colour}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-7 py-2 md:px-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111d] px-4 py-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_50%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_86%_50%,rgba(34,211,238,0.18),transparent_30%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(59,130,246,.12)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10 flex h-16 items-center justify-center">
              <img
                src="/snz-partner-network-logo.png"
                alt="SNZ Partner Network"
                className="h-auto w-[255px] max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoweConexPartnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const focusAreas = [
    {
      label: "Conex OS",
      icon: Monitor,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "BMS Integration",
      icon: Building2,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "IoT",
      icon: Wifi,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "Asset Intelligence",
      icon: Gauge,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "Energy Optimisation",
      icon: PlugZap,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "HVAC",
      icon: Settings2,
      colour: "border-cyan-400/50 text-cyan-300",
    },
    {
      label: "Refrigeration",
      icon: Snowflake,
      colour: "border-blue-400/50 text-blue-300",
    },
    {
      label: "Fault Detection",
      icon: LineChart,
      colour: "border-cyan-400/50 text-cyan-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-5 py-8 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#06112e] text-white shadow-2xl shadow-slate-950/60">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close LoweConex partner spotlight"
          className="absolute right-5 top-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-3xl text-white transition hover:bg-white/20"
        >
          ×
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] border-b border-white/10 bg-cover bg-center px-7 py-10 md:px-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 32%, rgba(255,255,255,0.66) 48%, rgba(6,17,46,0.38) 68%, rgba(6,17,46,0.10) 100%), url('/loweconex-header-bg.png')",
          }}
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-[#07133c]">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-600">
                Partner Spotlight
              </p>

              <div className="mt-7">
                <img
                  src="/loweconex-logo.png"
                  alt="LoweConex"
                  className="h-auto w-[430px] max-w-full object-contain"
                />
              </div>

              <h3 className="mt-8 max-w-xl text-3xl font-black leading-tight md:text-4xl">
                Unified asset intelligence for every connected device.
              </h3>

              <div className="mt-5 h-1 w-16 rounded-full bg-blue-500" />

              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-700">
                LoweConex connects building systems, assets and IoT data into a
                unified intelligence layer, helping organisations improve
                visibility, automate workflows and optimise energy and
                maintenance performance.
              </p>
            </div>

            <div className="hidden min-h-[330px] lg:block" />
          </div>
        </div>

        <div className="grid gap-5 px-7 py-7 md:px-10 lg:grid-cols-[0.95fr_0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-blue-400/40 bg-blue-400/10">
                <RadioTower className="h-7 w-7 text-blue-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">Background</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-blue-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {loweConexPartnerDetails.background.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-cyan-400/50 bg-cyan-400/10">
                <Star className="h-7 w-7 text-cyan-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Customer Benefits
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {loweConexPartnerDetails.benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-blue-400/40 bg-blue-400/10">
                <Globe2 className="h-7 w-7 text-blue-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Website Snapshot
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-blue-400" />
              </div>
            </div>

            <a
              href={loweConexPartnerDetails.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 block overflow-hidden rounded-2xl border border-white/15 bg-[#05080c] shadow-2xl shadow-black/40 transition hover:-translate-y-1 hover:border-blue-300/50"
            >
              <div className="h-3 rounded-t-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" />

              <div className="overflow-hidden">
                <img
                  src="/loweconex-website-snapshot.png"
                  alt="LoweConex website snapshot"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-black text-cyan-300">
                  www.loweconex.com
                </span>

                <ExternalLink className="h-5 w-5 shrink-0 text-cyan-300 transition group-hover:translate-x-1" />
              </div>
            </a>
          </article>
        </div>

        <div className="border-t border-white/10 px-7 py-5 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-white">
              Key Tags
            </p>

            <div className="flex flex-wrap gap-3">
              {focusAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className={`inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-5 py-2 text-sm font-bold ${item.colour}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-7 py-2 md:px-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111d] px-4 py-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_50%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_86%_50%,rgba(34,211,238,0.18),transparent_30%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(59,130,246,.12)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10 flex h-16 items-center justify-center">
              <img
                src="/snz-partner-network-logo.png"
                alt="SNZ Partner Network"
                className="h-auto w-[255px] max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KMCConsultingPartnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const focusAreas = [
    {
      label: "Business Process",
      icon: BriefcaseBusiness,
      colour: "border-sky-400/50 text-sky-300",
    },
    {
      label: "Strategic Alignment",
      icon: Target,
      colour: "border-orange-400/60 text-orange-300",
    },
    {
      label: "Cybersecurity",
      icon: ShieldCheck,
      colour: "border-sky-400/50 text-sky-300",
    },
    {
      label: "OT Security",
      icon: LockKeyhole,
      colour: "border-orange-400/60 text-orange-300",
    },
    {
      label: "Smart Buildings",
      icon: Building2,
      colour: "border-sky-400/50 text-sky-300",
    },
    {
      label: "Data & Analytics",
      icon: BarChart3,
      colour: "border-orange-400/60 text-orange-300",
    },
    {
      label: "Consulting Services",
      icon: Users,
      colour: "border-sky-400/50 text-sky-300",
    },
    {
      label: "Trusted Advisors",
      icon: Handshake,
      colour: "border-orange-400/60 text-orange-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-5 py-8 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#07111d] text-white shadow-2xl shadow-slate-950/60">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close KMC Consulting partner spotlight"
          className="absolute right-5 top-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-3xl text-white transition hover:bg-white/20"
        >
          ×
        </button>

        <div
          className="relative overflow-hidden rounded-t-[2rem] border-b border-white/10 bg-cover bg-center px-7 py-10 md:px-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 32%, rgba(255,255,255,0.64) 48%, rgba(7,17,29,0.38) 68%, rgba(7,17,29,0.12) 100%), url('/kmc-consulting-header-bg.png')",
          }}
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-[#07133c]">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-sky-500">
                Partner Spotlight
              </p>

              <div className="mt-7">
                <img
                  src="/kmc-consulting-logo.png"
                  alt="KMC Consulting"
                  className="h-auto w-[430px] max-w-full object-contain"
                />
              </div>

              <h3 className="mt-8 max-w-xl text-3xl font-black leading-tight md:text-4xl">
                Strategy, process and cybersecurity consulting for smarter, more
                resilient organisations.
              </h3>

              <div className="mt-5 h-1 w-16 rounded-full bg-sky-400" />

              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-700">
                KMC Consulting brings together experienced specialists across
                strategy, operations, technology and cybersecurity — deployable
                as a focused team against critical business challenges.
              </p>
            </div>

            <div className="hidden min-h-[330px] lg:block" />
          </div>
        </div>

        <div className="grid gap-5 px-7 py-7 md:px-10 lg:grid-cols-[0.95fr_0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-sky-400/40 bg-sky-400/10">
                <Users className="h-7 w-7 text-sky-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">Background</h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-sky-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {kmcConsultingPartnerDetails.background.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-orange-400/50 bg-orange-400/10">
                <Star className="h-7 w-7 text-orange-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Customer Benefits
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-400" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {kmcConsultingPartnerDetails.benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-sky-400/40 bg-sky-400/10">
                <Globe2 className="h-7 w-7 text-sky-300" />
              </span>

              <div>
                <h3 className="text-xl font-black text-white">
                  Website Snapshot
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-sky-400" />
              </div>
            </div>

            <a
              href={kmcConsultingPartnerDetails.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 block overflow-hidden rounded-2xl border border-white/15 bg-[#05080c] shadow-2xl shadow-black/40 transition hover:-translate-y-1 hover:border-sky-300/50"
            >
              <div className="h-3 rounded-t-2xl bg-gradient-to-r from-sky-500 via-slate-800 to-orange-500" />

              <div className="overflow-hidden">
                <img
                  src="/kmc-consulting-website-snapshot.png"
                  alt="KMC Consulting website snapshot"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-black text-sky-300">
                  www.kmccontrols.com/consulting/
                </span>

                <ExternalLink className="h-5 w-5 shrink-0 text-sky-300 transition group-hover:translate-x-1" />
              </div>
            </a>
          </article>
        </div>

        <div className="border-t border-white/10 px-7 py-5 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-white">
              Key Tags
            </p>

            <div className="flex flex-wrap gap-3">
              {focusAreas.map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className={`inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-5 py-2 text-sm font-bold ${item.colour}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-7 py-2 md:px-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111d] px-4 py-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_50%,rgba(14,165,233,0.20),transparent_30%),radial-gradient(circle_at_86%_50%,rgba(249,115,22,0.18),transparent_30%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(56,189,248,.12)_1px,transparent_1px),linear-gradient(rgba(249,115,22,.08)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10 flex h-16 items-center justify-center">
              <img
                src="/snz-partner-network-logo.png"
                alt="SNZ Partner Network"
                className="h-auto w-[255px] max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadershipCard({ leader }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200">
        {leader.image ? (
          <img
            src={leader.image}
            alt={`${leader.name} profile`}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 rounded-full bg-slate-300" />
            <div className="absolute bottom-0 left-1/2 h-24 w-32 -translate-x-1/2 rounded-t-full bg-slate-300" />
            <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-[4rem] bg-white/45" />
          </>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black text-[#07133c]">{leader.name}</h3>
        <p className="mt-1 text-xs font-black text-teal-600">{leader.role}</p>
        <p className="mt-4 min-h-[84px] text-sm font-semibold leading-6 text-[#07133c]">
          {leader.text}
        </p>

        {leader.linkedin && (
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${leader.name} LinkedIn`}
          className="mt-4 inline-flex h-6 w-6 items-center justify-center rounded bg-[#0a66c2] text-xs font-black text-white transition hover:scale-110 hover:bg-[#004182]"
        >
          in
        </a>
        )}
      </div>
    </article>
  );
}

function StatIcon({ type }) {
  const common =
    "h-10 w-10 text-current";

  if (type === "people") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none">
        <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="30" cy="18" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="15" r="5.5" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M10 35c1.5-6 6-9 12-9M38 35c-1.5-6-6-9-12-9M15 36c1.5-6.5 5-10 9-10s7.5 3.5 9 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "building") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none">
        <path
          d="M13 39V13h14v26M27 22h9v17"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 18h4M18 24h4M18 30h4M31 27h2M31 33h2M10 39h28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "leaf") {
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none">
        <path
          d="M12 35c13-2 23-12 24-25-13 1-25 11-25 23 0 4 2 7 6 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 30c4-6 9-10 17-15"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={common} fill="none">
      <path
        d="M18 24l5-5c2-2 5-2 7 0l1 1"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 20l5 5c2 2 2 5 0 7l-5 5c-2 2-5 2-7 0l-10-10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 21l-3 3c-2 2-2 5 0 7l4 4M33 17l3-3M12 34l-3 3M39 25l3-3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutUs({ goToPage, openEnquiryForm }) {

  useEffect(() => {
      document.title = "About Us | Smart Net Zero";
    }, []);
  const [boomModalOpen, setBoomModalOpen] = useState(false);
  const [safeSharkModalOpen, setSafeSharkModalOpen] = useState(false);
  const [kmcConsultingModalOpen, setKmcConsultingModalOpen] = useState(false);
  const [loweConexModalOpen, setLoweConexModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#07133c] antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="AboutUs"
      />

      <main>
       <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.86) 34%, rgba(6,17,46,0.42) 68%, rgba(6,17,46,0.12) 100%), url('/about-hero-bg.png')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_40%_85%,rgba(45,212,191,0.18),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-10 lg:px-8">
            <div className="max-w-xl py-8">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-300">
                About Us
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Experts in smart infrastructure and net zero solutions.
              </h1>

              <p className="mt-5 text-lg font-semibold leading-8 text-white/86">
                We help organisations design, optimise and operate smarter
                infrastructure that delivers measurable environmental, operational and
                financial outcomes.
              </p>

              <a
                href="#our-story"
                className="mt-6 inline-flex items-center text-base font-black text-teal-300 transition hover:text-white"
              >
                Our story →
              </a>
            </div>

            <div className="mt-6 grid overflow-hidden rounded-2xl border border-teal-300/30 bg-[#07193f]/80 shadow-2xl backdrop-blur md:grid-cols-4">
              {[
                {
                  icon: "people",
                  value: "150+",
                  label: "Years of combined industry experience",
                  colour: "text-cyan-200",
                  ring: "border-teal-300/50 bg-teal-300/10",
                },
                {
                  icon: "building",
                  value: "250+",
                  label: "Projects deliveted by the team",
                  colour: "text-lime-300",
                  ring: "border-teal-300/50 bg-teal-300/10",
                },
                {
                  icon: "leaf",
                  value: "Proven",
                  label: "Impact in reducing carbon and costs",
                  colour: "text-lime-300",
                  ring: "border-teal-300/50 bg-teal-300/10",
                },
                {
                  icon: "handshake",
                  value: "Trusted",
                  label: "By public and private sector partners",
                  colour: "text-white",
                  ring: "border-blue-400/60 bg-blue-500/10",
                },
              ].map((item, index) => (
                <div
                  key={item.value}
                  className={`flex items-center gap-5 p-7 ${
                    index > 0
                      ? "border-t border-white/15 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <span
                    className={`grid h-20 w-20 shrink-0 place-items-center rounded-full border ${item.ring} ${item.colour}`}
                  >
                    <StatIcon type={item.icon} />
                  </span>

                  <div>
                    <p className="text-3xl font-black text-teal-300">{item.value}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-white">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> 

        <section id="story" className="bg-white px-5 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-[#07133c]">
                  Our Leadership Team
                </h2>
                <div className="mt-4 h-1 w-12 rounded-full bg-teal-400" />
              </div>

              <p className="max-w-2xl text-base font-semibold leading-7 text-[#07133c]">
                A collaborative team of specialists with deep industry knowledge
                and a shared passion for building a smarter, more sustainable
                future.
              </p>
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {leaders.map((leader) => (
                <LeadershipCard key={leader.name} leader={leader} />
              ))}
            </div>
          </div>
        </section>

        <OurStorySection />        

        <section className="bg-white px-5 pb-8 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-slate-50 via-white to-violet-50 p-8 shadow-sm">
            <h2 className="text-center text-3xl font-black text-[#07133c]">
              Our approach. Our promise.
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {promises.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex gap-4 ${
                    index > 0
                      ? "border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                      : ""
                  }`}
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm">
                    {item.icon}
                  </span>

                  <div>
                    <h3 className="text-lg font-black text-[#07133c]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#07133c]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="partners" className="bg-white px-5 py-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-600">
                  Partner Network
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07133c] md:text-4xl">
                  Working with leading partners
                </h2>

                <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-600">
                  We collaborate with specialist technology, cyber, compliance and smart
                  infrastructure partners to help customers move faster from strategy to
                  measurable outcomes.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setBoomModalOpen(true)}
                  className="flex min-h-[150px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-900/10"
                  aria-label="Open BOOM Interactive partner details"
                >
                  <img
                    src="/boom-logo-dark.png"
                    alt="BOOM Interactive"
                    className="max-h-20 w-full max-w-[260px] object-contain"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setSafeSharkModalOpen(true)}
                  className="flex min-h-[150px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-900/10"
                  aria-label="Open SafeShark partner details"
                >
                  <img
                    src="/safeshark-logo.png"
                    alt="SafeShark"
                    className="max-h-24 w-full max-w-[280px] object-contain"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setLoweConexModalOpen(true)}
                  className="flex min-h-[150px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-900/10"
                  aria-label="Open LoweConex partner details"
                >
                  <img
                    src="/loweconex-logo.png"
                    alt="LoweConex"
                    className="max-h-24 w-full max-w-[300px] object-contain"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setKmcConsultingModalOpen(true)}
                  className="flex min-h-[150px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-slate-900/10"
                  aria-label="Open KMC Consulting partner details"
                >
                  <img
                    src="/kmc-consulting-logo.png"
                    alt="KMC Consulting"
                    className="max-h-24 w-full max-w-[320px] object-contain"
                  />
                </button>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                More partners coming soon
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-16 pt-4 lg:px-8">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#06112e] p-8 text-white shadow-xl md:p-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.88) 42%, rgba(6,17,46,0.62) 72%, rgba(6,17,46,0.35) 100%), url('/about-cta-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_40%,rgba(34,211,238,0.18),transparent_32%)]" />

            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="max-w-3xl text-3xl font-black md:text-4xl">
                  Let’s build a smarter, net zero future together.
                </h2>

                <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
                  Whether you’re starting your journey or accelerating progress,
                  we’re here to help.
                </p>
              </div>

              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
              >
                Get in touch →
              </button>
            </div>
          </div>
        </section>
      </main>

      <BoomPartnerModal
        isOpen={boomModalOpen}
        onClose={() => setBoomModalOpen(false)}
      />
      <SafeSharkPartnerModal
        isOpen={safeSharkModalOpen}
        onClose={() => setSafeSharkModalOpen(false)}
      />
      <LoweConexPartnerModal
        isOpen={loweConexModalOpen}
        onClose={() => setLoweConexModalOpen(false)}
      />
      <KMCConsultingPartnerModal
        isOpen={kmcConsultingModalOpen}
        onClose={() => setKmcConsultingModalOpen(false)}
      />
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}