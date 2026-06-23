import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Factory,
  Handshake,
  Landmark,
  Leaf,
  Lightbulb,
  Network,
  RefreshCw,
  Scale,
  Search,
  Settings2,
  ShieldCheck,
  Target,
  Truck,
  X,
  Zap,
} from "lucide-react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";

/* -------------------------------------------------------------------------- */
/*                                SERVICE AREAS                               */
/* -------------------------------------------------------------------------- */

const serviceAreas = [
  {
    key: "sustainability",
    number: "01",
    title: "Sustainability & Net Zero",
    shortTitle: "Sustainability",
    icon: Leaf,
    page: "SustainabilityNetZero",
    colour: "text-emerald-600",
    circleColour: "bg-emerald-50",
    borderColour: "border-emerald-200",
    examples: [
      "Net zero strategy and roadmaps",
      "Carbon reduction planning",
      "Climate risk and resilience",
      "ESG and sustainability reporting",
    ],
  },
  {
    key: "security",
    number: "02",
    title: "OT Security & Resilience",
    shortTitle: "OT Security",
    icon: ShieldCheck,
    page: "OTSecurityResilience",
    colour: "text-sky-600",
    circleColour: "bg-sky-50",
    borderColour: "border-sky-200",
    examples: [
      "OT and IoT security assessments",
      "Operational resilience planning",
      "Secure-by-design assurance",
      "Incident and continuity readiness",
    ],
  },
  {
    key: "energy",
    number: "03",
    title: "Smart Energy Management",
    shortTitle: "Smart Energy",
    icon: Zap,
    page: "SmartEnergyManagement",
    colour: "text-amber-600",
    circleColour: "bg-amber-50",
    borderColour: "border-amber-200",
    examples: [
      "Energy performance strategy",
      "Monitoring and analytics",
      "Demand and load optimisation",
      "Smart controls and integration",
    ],
  },
  {
    key: "compliance",
    number: "04",
    title: "Smart Regulations & Compliance",
    shortTitle: "Smart Regulations",
    icon: Scale,
    page: "SmartRegulations",
    colour: "text-violet-600",
    circleColour: "bg-violet-50",
    borderColour: "border-violet-200",
    examples: [
      "Regulatory applicability reviews",
      "Product compliance planning",
      "Technical evidence and testing",
      "Governance and audit readiness",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                HOW WE HELP                                 */
/* -------------------------------------------------------------------------- */

const helpTopics = [
  {
    key: "strategy",
    label: "Strategy & Roadmapping",
    icon: Compass,
    title: "Build clear strategies that create long-term value.",
    text:
      "We turn complex priorities into practical roadmaps aligned to business goals, risk appetite and measurable outcomes.",
    points: [
      "Define strategic direction and priorities",
      "Assess maturity, risk and opportunity",
      "Create phased roadmaps with clear milestones",
      "Align leadership, delivery teams and partners",
    ],
  },
  {
    key: "assurance",
    label: "Technical Assurance",
    icon: ShieldCheck,
    title: "Strengthen confidence in technology and infrastructure.",
    text:
      "Independent assurance helps organisations understand whether systems, products and operational controls are suitable, secure and effective.",
    points: [
      "Review technical architecture and controls",
      "Assess security, resilience and compliance",
      "Identify weaknesses and improvement priorities",
      "Provide evidence for governance decisions",
    ],
  },
  {
    key: "risk",
    label: "Risk & Gap Assessments",
    icon: Search,
    title: "Identify the gaps that matter most.",
    text:
      "Our assessments focus attention on the issues most likely to affect delivery, compliance, performance or operational resilience.",
    points: [
      "Establish the current position",
      "Benchmark against requirements and good practice",
      "Prioritise risks by business impact",
      "Create clear, actionable recommendations",
    ],
  },
  {
    key: "compliance",
    label: "Compliance & Governance",
    icon: Scale,
    title: "Create proportionate governance and compliance arrangements.",
    text:
      "We translate regulatory and standards requirements into practical controls, responsibilities, evidence and oversight.",
    points: [
      "Clarify applicable requirements",
      "Develop policies and control frameworks",
      "Create evidence and reporting structures",
      "Improve audit and assurance readiness",
    ],
  },
  {
    key: "implementation",
    label: "Implementation Support",
    icon: Settings2,
    title: "Move from strategy into effective delivery.",
    text:
      "Our consultants provide practical support through implementation, helping internal teams and suppliers maintain focus and momentum.",
    points: [
      "Support programme mobilisation",
      "Coordinate delivery activities",
      "Review supplier and solution outputs",
      "Track actions, risks and benefits",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                  APPROACH                                  */
/* -------------------------------------------------------------------------- */

const approachSteps = [
  {
    number: "01",
    title: "Discover",
    text: "Understand your organisation, priorities, constraints and desired outcomes.",
    icon: Search,
  },
  {
    number: "02",
    title: "Assess",
    text: "Evaluate the current position, risks, capabilities and opportunities.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Design",
    text: "Develop proportionate strategies, roadmaps and practical recommendations.",
    icon: Lightbulb,
  },
  {
    number: "04",
    title: "Deliver",
    text: "Support implementation, integration and stakeholder coordination.",
    icon: Settings2,
  },
  {
    number: "05",
    title: "Evolve",
    text: "Measure progress, improve controls and adapt as requirements change.",
    icon: RefreshCw,
  },
];

/* -------------------------------------------------------------------------- */
/*                                   SECTORS                                  */
/* -------------------------------------------------------------------------- */

const sectors = [
  {
    title: "Public Sector",
    icon: Landmark,
    text:
      "Supporting public organisations to improve resilience, sustainability and regulatory confidence.",
  },
  {
    title: "Built Environment",
    icon: Building2,
    text:
      "Helping estates, buildings and infrastructure become smarter, more efficient and lower carbon.",
  },
  {
    title: "Manufacturing",
    icon: Factory,
    text:
      "Improving product compliance, operational resilience, energy performance and delivery assurance.",
  },
  {
    title: "Energy & Utilities",
    icon: Zap,
    text:
      "Supporting secure, resilient and efficient energy infrastructure and operational environments.",
  },
  {
    title: "Critical Infrastructure",
    icon: Network,
    text:
      "Protecting connected assets, operational systems and essential services from disruption.",
  },
  {
    title: "Transport & Logistics",
    icon: Truck,
    text:
      "Improving connected infrastructure assurance, operational performance and resilience.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CASE STUDY DATA                               */
/* -------------------------------------------------------------------------- */

const caseStudy = {
  type: "Case study",
  title: "Strengthening operational resilience across connected assets",
  summary:
    "An integrated consultancy programme combining operational risk assessment, OT security, governance and implementation support.",
  image: "/specialist-consultancy-case-study-bg.png",
  projectImage: "/specialist-consultancy-project-image.png",
  clientProfile:
    "A multi-site organisation operating connected building systems, operational technology and business-critical infrastructure.",
  challenge:
    "The organisation had expanded its connected-asset estate over several years. Responsibilities were distributed across facilities, IT, security, procurement and operational teams, with no single view of technology risk, resilience or assurance evidence.",
  objectives: [
    "Create a consolidated view of connected assets and dependencies",
    "Identify priority operational and cybersecurity risks",
    "Clarify ownership, governance and escalation arrangements",
    "Develop a practical improvement roadmap",
    "Support implementation of priority actions",
  ],
  approach: [
    {
      title: "Discovery and mobilisation",
      text:
        "Stakeholder interviews, document review and scoping workshops established the operating context, critical services and existing governance arrangements.",
    },
    {
      title: "Asset and dependency assessment",
      text:
        "Connected systems, operational dependencies, external suppliers and critical information flows were mapped and assessed.",
    },
    {
      title: "Risk and resilience review",
      text:
        "The programme evaluated technical controls, operational vulnerabilities, continuity arrangements and recovery dependencies.",
    },
    {
      title: "Governance and roadmap",
      text:
        "Clear responsibilities, reporting routes, assurance requirements and a phased delivery roadmap were developed.",
    },
  ],
  outcomes: [
    "A prioritised register of connected-asset risks",
    "Improved visibility of critical dependencies",
    "Clearer ownership and governance arrangements",
    "A phased security and resilience improvement roadmap",
    "Better evidence for leadership and assurance decisions",
  ],
  executiveConclusion:
    "The engagement gave the organisation a single, evidence-led view of its connected operational environment. This enabled leadership to focus investment on the controls and resilience measures most closely linked to critical services and business outcomes.",
};

/* -------------------------------------------------------------------------- */
/*                               INSIGHT DATA                                 */
/* -------------------------------------------------------------------------- */

const latestInsight = {
  type: "Latest insight",
  title: "Turning regulatory complexity into practical action",
  summary:
    "How organisations can connect compliance, technology and operational priorities through a single delivery roadmap.",
  image: "/specialist-consultancy-insight-bg.png",
  introduction:
    "Regulation, cyber risk, sustainability obligations and energy performance are often managed through separate programmes. This can create duplicated activity, inconsistent evidence and competing priorities.",
  sections: [
    {
      title: "Start with business outcomes",
      text:
        "Compliance should support organisational goals rather than operate as a separate administrative exercise. Begin by identifying the services, products, assets and outcomes that matter most.",
    },
    {
      title: "Create one view of obligations and risk",
      text:
        "Map regulatory duties, standards, operational risks and strategic commitments into a common framework. This reveals overlaps and reduces duplicated assessments.",
    },
    {
      title: "Connect technical and governance decisions",
      text:
        "Technical controls need clear ownership, evidence and oversight. Governance arrangements should help teams make informed decisions without slowing delivery unnecessarily.",
    },
    {
      title: "Prioritise by value and exposure",
      text:
        "Not every issue requires the same response. Prioritise actions using business impact, regulatory exposure, implementation effort and potential value.",
    },
    {
      title: "Build a measurable delivery roadmap",
      text:
        "A useful roadmap defines milestones, owners, evidence, dependencies and expected outcomes. It should be updated as risks, regulations and organisational priorities change.",
    },
  ],
  takeaways: [
    "Combine related assessments wherever practical",
    "Link compliance activity to strategic and operational outcomes",
    "Use shared evidence across regulation, assurance and governance",
    "Prioritise actions according to risk, value and delivery effort",
    "Treat the roadmap as a living management tool",
  ],
};

/* -------------------------------------------------------------------------- */
/*                              SHARED HEADING                                */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "centre",
  dark = false,
}) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <p
          className={`text-xs font-black uppercase tracking-[0.18em] ${
            dark ? "text-teal-300" : "text-teal-700"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`mt-3 max-w-4xl text-3xl font-black tracking-tight md:text-4xl ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>

      {text && (
        <p
          className={`mt-4 max-w-3xl text-base leading-7 ${
            dark ? "text-white/68" : "text-slate-600"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function Hero({
  openEnquiryForm,
  scrollToServices,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_26%,rgba(6,182,212,.24),transparent_28%),radial-gradient(circle_at_90%_70%,rgba(45,212,191,.12),transparent_30%),linear-gradient(120deg,#06112e_0%,#071936_48%,#020817_100%)]" />

      <div className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(6,17,46,0.99) 0%,rgba(6,17,46,0.96) 30%,rgba(6,17,46,0.72) 54%,rgba(6,17,46,0.20) 100%),url('/specialist-consultancy-hero-bg.png')",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 pt-24 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pb-32 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-teal-200 backdrop-blur">
            <Target className="h-4 w-4" />
            Smarter decisions. Secure outcomes.
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            Specialist
            <br />
            <span className="bg-gradient-to-r from-teal-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Consultancy
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-bold leading-8 text-white/90">
            Multidisciplinary advisory support across four connected service
            areas.
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-white/68">
            We combine sustainability, security, energy and regulatory
            expertise to help organisations manage complexity, reduce risk and
            deliver measurable outcomes.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={openEnquiryForm}
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 font-black text-white shadow-xl shadow-violet-950/25 transition hover:scale-[1.02]"
            >
              Discuss Your Priorities
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={scrollToServices}
              className="inline-flex items-center rounded-2xl border border-teal-300/40 bg-white/5 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore Service Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="hidden min-h-[520px] lg:block" />
      </div>

      <div className="absolute -bottom-px left-0 right-0 h-12 bg-white [clip-path:polygon(0_78%,100%_0,100%_100%,0_100%)]" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         INTERACTIVE SERVICE IMAGE                          */
/* -------------------------------------------------------------------------- */

function ServiceQuadrantSection({ goToPage }) {
  const [activeService, setActiveService] = useState(
    serviceAreas[0].key
  );

  const selectedService =
    serviceAreas.find(
      (service) => service.key === activeService
    ) || serviceAreas[0];

  const SelectedIcon = selectedService.icon;

  const imageMapAreas = [
    {
      key: "sustainability",
      label: "Sustainability & Net Zero",
      className:
        "left-[2%] top-[2%] h-[46%] w-[46%] rounded-tl-[100%]",
    },
    {
      key: "security",
      label: "OT Security & Resilience",
      className:
        "right-[2%] top-[2%] h-[46%] w-[46%] rounded-tr-[100%]",
    },
    {
      key: "energy",
      label: "Smart Energy Management",
      className:
        "bottom-[2%] left-[2%] h-[46%] w-[46%] rounded-bl-[100%]",
    },
    {
      key: "compliance",
      label: "Smart Regulations & Compliance",
      className:
        "bottom-[2%] right-[2%] h-[46%] w-[46%] rounded-br-[100%]",
    },
  ];

  return (
    <section
      id="service-areas"
      className="scroll-mt-28 bg-white px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
            Integrated expertise
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Four connected service areas.
          </h2>

          <h2 className="mt-1 text-3xl font-black tracking-tight text-teal-700 md:text-4xl">
            One coordinated approach.
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Hover over or select a section to see what we can do.
            Click the link to the main service page.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[650px]">
              <img
                src="/specialist-consultancy-quadrant.png"
                alt="Four connected Smart Net Zero consultancy service areas"
                className="h-full w-full select-none object-contain"
                draggable="false"
              />

              {imageMapAreas.map((area) => {
                const active =
                  activeService === area.key;

                return (
                  <button
                    key={area.key}
                    type="button"
                    onMouseEnter={() =>
                      setActiveService(area.key)
                    }
                    onFocus={() =>
                      setActiveService(area.key)
                    }
                    onTouchStart={() =>
                      setActiveService(area.key)
                    }
                    onClick={() =>
                      setActiveService(area.key)
                    }
                    aria-label={`Show details for ${area.label}`}
                    aria-pressed={active}
                    className={`absolute z-10 cursor-pointer border-2 transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/50 ${area.className} ${
                      active
                        ? "border-white/85 bg-white/[0.08] shadow-[inset_0_0_45px_rgba(255,255,255,0.14)]"
                        : "border-transparent bg-transparent hover:border-white/60 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="sr-only">
                      {area.label}
                    </span>
                  </button>
                );
              })}

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[29%] w-[29%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </div>
          </div>

          <motion.div
            key={selectedService.key}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-lg shadow-slate-900/5 md:p-9"
          >
            <div className="flex items-start gap-5">
              <span
                className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border ${selectedService.borderColour} ${selectedService.circleColour} ${selectedService.colour}`}
              >
                <SelectedIcon className="h-8 w-8" />
              </span>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-teal-700">
                  Service area {selectedService.number}
                </p>

                <h3 className="mt-2 text-3xl font-black leading-tight text-slate-950">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.14em] text-slate-500">
              Example support
            </p>

            <div className="mt-4 grid gap-3">
              {selectedService.examples.map(
                (example) => (
                  <motion.div
                    key={example}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />

                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {example}
                    </p>
                  </motion.div>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                goToPage?.(selectedService.page)
              }
              className="mt-7 inline-flex items-center rounded-2xl bg-[#06112e] px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b1d46]"
            >
              Explore {selectedService.shortTitle}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HOW WE HELP                                  */
/* -------------------------------------------------------------------------- */

function HowWeHelpSection() {
  const [selectedTopic, setSelectedTopic] = useState(
    helpTopics[0].key
  );

  const selected = useMemo(
    () =>
      helpTopics.find(
        (topic) => topic.key === selectedTopic
      ) || helpTopics[0],
    [selectedTopic]
  );

  return (
    <section className="bg-white px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] p-7 text-white shadow-2xl md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              How we help
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Select a challenge to see how we create value.
            </h2>

            <div className="mt-7 grid gap-2">
              {helpTopics.map((topic) => {
                const Icon = topic.icon;
                const active =
                  selectedTopic === topic.key;

                return (
                  <button
                    key={topic.key}
                    type="button"
                    onClick={() =>
                      setSelectedTopic(topic.key)
                    }
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-black transition ${
                      active
                        ? "border-teal-300 bg-teal-300/15 text-teal-100"
                        : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {topic.label}
                    </span>

                    <ArrowRight
                      className={`h-4 w-4 transition ${
                        active ? "translate-x-1" : ""
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={selected.key}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-7 rounded-3xl border border-white/10 bg-white/[0.06] p-7 md:grid-cols-[1fr_0.8fr]"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
                {selected.label}
              </p>

              <h3 className="mt-3 text-3xl font-black leading-tight">
                {selected.title}
              </h3>

              <p className="mt-4 leading-7 text-white/68">
                {selected.text}
              </p>

              <div className="mt-6 grid gap-3">
                {selected.points.map((point) => (
                  <div
                    key={point}
                    className="flex gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />

                    <p className="text-sm font-semibold leading-6 text-white/78">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative grid h-64 w-64 place-items-center rounded-full border border-teal-300/20 bg-teal-300/[0.05]">
                <div className="absolute h-48 w-48 rounded-full border border-cyan-300/15" />
                <div className="absolute h-32 w-32 rounded-full border border-violet-300/20" />

                <span className="relative z-10 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 shadow-xl shadow-cyan-950/30">
                  <Target className="h-12 w-12" />
                </span>

                {[
                  {
                    label: "Assess",
                    icon: Search,
                    position:
                      "-top-2 left-1/2 -translate-x-1/2",
                  },
                  {
                    label: "Design",
                    icon: Lightbulb,
                    position:
                      "right-0 top-1/2 -translate-y-1/2",
                  },
                  {
                    label: "Deliver",
                    icon: Settings2,
                    position:
                      "-bottom-2 left-1/2 -translate-x-1/2",
                  },
                  {
                    label: "Assure",
                    icon: ShieldCheck,
                    position:
                      "left-0 top-1/2 -translate-y-1/2",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={`absolute ${item.position} flex flex-col items-center gap-1`}
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#0b1a3a] text-teal-200">
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="text-[10px] font-black text-white/65">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 APPROACH                                   */
/* -------------------------------------------------------------------------- */

function ApproachSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our approach"
          title="A clear route from complexity to measurable progress"
          text="Our work is structured, proportionate and focused on practical outcomes rather than unnecessary process."
        />

        <div className="relative mt-12">
          <div className="absolute left-[10%] right-[10%] top-12 hidden border-t-2 border-dashed border-teal-300 lg:block" />

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative text-center"
                >
                  <span className="relative z-10 mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-teal-50 text-teal-700 shadow-lg">
                    <Icon className="h-9 w-9" />
                  </span>

                  <p className="mt-6 text-4xl font-black leading-none text-teal-700">
                    {step.number}
                  </p>

                  <h3 className="mt-3 text-lg font-black text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            STATIC WHERE WE WORK                            */
/* -------------------------------------------------------------------------- */

function SectorsSection() {
  return (
    <section className="bg-white px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] p-7 text-white shadow-2xl md:p-9">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
            Sectors
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Where we work
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/65">
            Specialist support for organisations managing complex, connected
            and regulated environments.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => {
            const Icon = sector.icon;

            return (
              <article
                key={sector.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:border-teal-300/35 hover:bg-white/[0.08]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-300/10 text-teal-300">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-5 text-lg font-black">
                  {sector.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/62">
                  {sector.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MODAL BEHAVIOUR                               */
/* -------------------------------------------------------------------------- */

function useModalBehaviour(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
}

/* -------------------------------------------------------------------------- */
/*                            CASE STUDY MODAL                                */
/* -------------------------------------------------------------------------- */

function CaseStudyModal({
  study,
  onClose,
  openEnquiryForm,
}) {
  useModalBehaviour(Boolean(study), onClose);

  if (!study) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-md sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div
          className="relative min-h-[350px] bg-[#06112e] bg-cover p-7 text-white md:p-10"
          style={{
            backgroundImage: `linear-gradient(
              90deg,
              rgba(6,17,46,.99) 0%,
              rgba(6,17,46,.90) 52%,
              rgba(6,17,46,.30) 100%
            ), url('${study.image}')`,
            backgroundPosition: "center right",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/30 text-white transition hover:bg-white/15"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10 flex min-h-[280px] max-w-3xl flex-col justify-end">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              Executive case study
            </p>

            <h2
              id="case-study-title"
              className="mt-3 text-4xl font-black leading-tight md:text-5xl"
            >
              {study.title}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">
              {study.summary}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                Client profile
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-700">
                {study.clientProfile}
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                Executive challenge
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-700">
                {study.challenge}
              </p>
            </section>
          </div>

          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="relative min-h-[360px]">
              <img
                src={study.projectImage}
                alt="Project case study"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200 text-center">
                <div className="max-w-md p-8">
                  <Building2 className="mx-auto h-14 w-14 text-slate-400" />

                  <p className="mt-4 text-sm font-black uppercase tracking-[0.15em] text-slate-500">
                    Project image
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Add an appropriate project or client-environment image as
                    specialist-consultancy-project-image.png.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
              Engagement objectives
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {study.objectives.map((objective) => (
                <div
                  key={objective}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />

                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
              Delivery approach
            </p>

            <div className="mt-4 grid gap-5 md:grid-cols-2">
              {study.approach.map((stage, index) => (
                <article
                  key={stage.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="text-3xl font-black text-teal-600">
                    0{index + 1}
                  </span>

                  <h3 className="mt-3 text-xl font-black text-slate-950">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {stage.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-9 rounded-3xl bg-[#06112e] p-7 text-white">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
              Outcomes
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {study.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />

                  <p className="text-sm font-semibold leading-6 text-white/78">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-teal-200 bg-teal-50 p-7">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
              Executive conclusion
            </p>

            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {study.executiveConclusion}
            </p>
          </section>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Need a similar assessment across your connected assets or
              operational environments?
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 px-6 py-3 font-black text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openEnquiryForm?.();
                }}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 font-black text-white shadow-lg"
              >
                Discuss Your Requirements
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              INSIGHT MODAL                                 */
/* -------------------------------------------------------------------------- */

function InsightModal({
  insight,
  onClose,
  openEnquiryForm,
}) {
  useModalBehaviour(Boolean(insight), onClose);

  if (!insight) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-md sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="insight-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div
          className="relative min-h-[340px] bg-[#06112e] bg-cover p-7 text-white md:p-10"
          style={{
            backgroundImage: `linear-gradient(
              90deg,
              rgba(6,17,46,.99) 0%,
              rgba(6,17,46,.90) 50%,
              rgba(6,17,46,.30) 100%
            ), url('${insight.image}')`,
            backgroundPosition: "center right",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/30 text-white transition hover:bg-white/15"
            aria-label="Close latest insight"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10 flex min-h-[270px] max-w-2xl flex-col justify-end">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              {insight.type}
            </p>

            <h2
              id="insight-modal-title"
              className="mt-3 text-4xl font-black leading-tight md:text-5xl"
            >
              {insight.title}
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/76">
              {insight.summary}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-lg font-semibold leading-8 text-slate-700">
            {insight.introduction}
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {insight.sections.map((section, index) => (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="text-3xl font-black text-teal-700">
                  0{index + 1}
                </span>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {section.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {section.text}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-3xl bg-[#06112e] p-7 text-white">
            <h3 className="text-2xl font-black">
              Key takeaways
            </h3>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {insight.takeaways.map((takeaway) => (
                <div
                  key={takeaway}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />

                  <p className="text-sm font-semibold leading-6 text-white/78">
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Need help turning several requirements into one practical
              delivery roadmap?
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 px-6 py-3 font-black text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openEnquiryForm?.();
                }}
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 font-black text-white shadow-lg"
              >
                Discuss Your Priorities
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         CASE STUDY AND INSIGHT CARDS                        */
/* -------------------------------------------------------------------------- */

function InsightsSection({
  openEnquiryForm,
}) {
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState(null);

  const [selectedInsight, setSelectedInsight] =
    useState(null);

  return (
    <>
      <section className="bg-white px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Evidence and insight"
            title="Explore practical thinking and real-world application"
            text="See how integrated consultancy can strengthen resilience, support compliance and improve strategic decision-making."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article
              className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-slate-200 bg-[#06112e] text-white shadow-xl"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,rgba(6,17,46,.98) 0%,rgba(6,17,46,.86) 52%,rgba(6,17,46,.28) 100%),url('/specialist-consultancy-case-study-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center right",
              }}
            >
              <div className="relative z-10 flex min-h-[340px] max-w-[72%] flex-col justify-end p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
                  Case study
                </p>

                <h3 className="mt-3 text-2xl font-black leading-tight">
                  {caseStudy.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/68">
                  {caseStudy.summary}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCaseStudy(caseStudy)
                  }
                  className="mt-5 inline-flex items-center text-sm font-black text-teal-300"
                >
                  View case study
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </article>

            <article
              className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-slate-200 bg-[#06112e] text-white shadow-xl"
              style={{
                backgroundImage: `linear-gradient(
                  90deg,
                  rgba(6,17,46,.98) 0%,
                  rgba(6,17,46,.84) 52%,
                  rgba(6,17,46,.24) 100%
                ), url('${latestInsight.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
              }}
            >
              <div className="relative z-10 flex min-h-[340px] max-w-[72%] flex-col justify-end p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
                  {latestInsight.type}
                </p>

                <h3 className="mt-3 text-2xl font-black leading-tight">
                  {latestInsight.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/68">
                  {latestInsight.summary}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedInsight(latestInsight)
                  }
                  className="mt-5 inline-flex items-center text-sm font-black text-teal-300"
                >
                  Read insight
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() =>
          setSelectedCaseStudy(null)
        }
        openEnquiryForm={openEnquiryForm}
      />

      <InsightModal
        insight={selectedInsight}
        onClose={() =>
          setSelectedInsight(null)
        }
        openEnquiryForm={openEnquiryForm}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    CTA                                     */
/* -------------------------------------------------------------------------- */

function CTASection({
  openEnquiryForm,
}) {
  return (
    <section className="bg-white px-5 pb-16 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] p-8 text-white shadow-2xl md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,rgba(6,182,212,.30),transparent_28%),radial-gradient(circle_at_68%_100%,rgba(139,92,246,.20),transparent_34%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="grid h-24 w-24 place-items-center rounded-full border border-teal-300/30 bg-teal-300/10">
            <Handshake className="h-12 w-12 text-teal-200" />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              Start a conversation
            </p>

            <h2 className="mt-2 text-3xl font-black leading-tight">
              Ready to gain clarity and confidence?
            </h2>

            <p className="mt-3 max-w-2xl text-white/68">
              Speak to a Smart Net Zero specialist about your priorities,
              challenges and intended outcomes.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 font-black text-white shadow-xl transition hover:scale-[1.02]"
          >
            Speak to an Expert
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  MAIN PAGE                                 */
/* -------------------------------------------------------------------------- */

export default function SpecialistConsultancy({
  goToPage,
  openEnquiryForm,
}) {

    useEffect(() => {
        document.title = "Specialist Consultancy | Smart Net Zero";
    }, []);
    
  const scrollToServices = () => {
    document
      .getElementById("service-areas")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SpecialistConsultancy"
      />

      <main>
        <Hero
          openEnquiryForm={openEnquiryForm}
          scrollToServices={scrollToServices}
        />

        <ServiceQuadrantSection
          goToPage={goToPage}
        />

        <HowWeHelpSection />
        <ApproachSection />
        <SectorsSection />

        <InsightsSection
          openEnquiryForm={openEnquiryForm}
        />

        <CTASection
          openEnquiryForm={openEnquiryForm}
        />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}