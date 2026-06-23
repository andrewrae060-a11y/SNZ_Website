import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  HardHat,
  LockKeyhole,
  Network,
  Search,
  Settings2,
  ShieldCheck,
  Siren,
  Target,
  Users,
  X,
} from "lucide-react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";

/* -------------------------------------------------------------------------- */
/*                             LIFECYCLE CONTENT                              */
/* -------------------------------------------------------------------------- */

const lifecycleSteps = [
  {
    id: 1,
    number: "01",
    key: "secure-by-demand",
    title: "Secure by Demand Procurement",
    shortTitle: "Secure by Demand",
    icon: ClipboardCheck,
    colour: "from-teal-500 to-cyan-600",
    ringColour: "ring-teal-300/50",
    summary:
      "Assurance starts before a device is purchased. Embed security, resilience and compliance into procurement decisions, bids and tenders.",
    intro:
      "Secure by Demand creates a procurement-led assurance model so OT and IoT risk is addressed before products and suppliers enter the operational environment.",
    image: "/sia-step-01-secure-by-demand.png",
    miniSteps: [
      {
        title: "Define security requirements",
        text:
          "Translate operational, technical and regulatory needs into clear procurement requirements.",
      },
      {
        title: "Pre-procurement assurance",
        text:
          "Assess the market, available product types and security expectations before issuing the tender.",
      },
      {
        title: "Supplier and bid evaluation",
        text:
          "Evaluate supplier responses, evidence, architecture and declared security capabilities.",
      },
      {
        title: "Contract and acceptance controls",
        text:
          "Include assurance clauses, testing criteria, support requirements and remediation obligations.",
      },
      {
        title: "Acceptance testing and onboarding",
        text:
          "Validate that delivered products meet the agreed requirements before operational use.",
      },
      {
        title: "Ongoing assurance",
        text:
          "Maintain supplier oversight, vulnerability management and assurance throughout the contract.",
      },
    ],
    support: [
      "Bid and tender requirement development",
      "OT and IoT security use-case definition",
      "Supplier assurance and risk evaluation",
      "Standards and control alignment",
      "Procurement governance and audit readiness",
      "Contract assurance clauses and acceptance criteria",
    ],
    outputs: [
      "Secure by Demand procurement framework",
      "Security requirement schedule",
      "Supplier security questionnaire",
      "Bid evaluation scoring criteria",
      "Contract and acceptance clauses",
      "Product onboarding assurance checklist",
    ],
  },
  {
    id: 2,
    number: "02",
    key: "supplier-assurance",
    title: "Product & Supplier Assurance",
    shortTitle: "Supplier Assurance",
    icon: Users,
    colour: "from-blue-500 to-indigo-600",
    ringColour: "ring-blue-300/50",
    summary:
      "Assess products, suppliers and supporting evidence to confirm suitability for operational, security and compliance requirements.",
    intro:
      "Product and supplier assurance determines whether proposed solutions are credible, secure, maintainable and appropriate for the intended operating environment.",
    image: "/sia-step-02-product-supplier-assurance.png",
    miniSteps: [
      {
        title: "Supplier due diligence",
        text:
          "Review governance, capability, support arrangements and security responsibilities.",
      },
      {
        title: "Evidence review",
        text:
          "Assess product documentation, certifications, architecture and security claims.",
      },
      {
        title: "Requirement mapping",
        text:
          "Map supplier responses and product evidence to the agreed procurement requirements.",
      },
      {
        title: "Risk assessment",
        text:
          "Identify gaps, dependencies, limitations and residual operational risks.",
      },
      {
        title: "Remediation planning",
        text:
          "Define actions required before approval, deployment or contract award.",
      },
      {
        title: "Decision support",
        text:
          "Provide clear assurance conclusions for governance and approval forums.",
      },
    ],
    support: [
      "Supplier governance and due diligence reviews",
      "Product security evidence assessment",
      "Standards and certification review",
      "Product and supplier risk profiling",
      "Security gap and remediation analysis",
      "Governance decision support",
    ],
    outputs: [
      "Supplier assurance report",
      "Product risk profile",
      "Evidence and compliance register",
      "Gap assessment and action plan",
      "Approval recommendation",
      "Executive assurance summary",
    ],
  },
  {
    id: 3,
    number: "03",
    key: "deployment-integration",
    title: "Deployment & Integration",
    shortTitle: "Deployment",
    icon: Settings2,
    colour: "from-violet-500 to-purple-600",
    ringColour: "ring-violet-300/50",
    summary:
      "Support secure deployment and integration so connected infrastructure is introduced safely and consistently.",
    intro:
      "Deployment assurance validates that the approved design, configuration and controls are implemented correctly before systems enter live operation.",
    image: "/sia-step-03-deployment-integration.png",
    miniSteps: [
      {
        title: "Architecture review",
        text:
          "Review proposed system architecture, trust boundaries and operational dependencies.",
      },
      {
        title: "Integration planning",
        text:
          "Assess interfaces, data flows, network requirements and integration risks.",
      },
      {
        title: "Configuration assurance",
        text:
          "Validate secure configuration against approved design and baseline requirements.",
      },
      {
        title: "Testing and validation",
        text:
          "Review technical testing, control evidence and issue resolution.",
      },
      {
        title: "Go-live readiness",
        text:
          "Confirm that risks, actions, responsibilities and support arrangements are understood.",
      },
      {
        title: "Operational handover",
        text:
          "Assure documentation, training, ownership and support before transition to operations.",
      },
    ],
    support: [
      "Architecture and integration assurance",
      "Configuration and baseline review",
      "Secure deployment planning",
      "Testing oversight and issue tracking",
      "Go-live readiness assessment",
      "Operational handover assurance",
    ],
    outputs: [
      "Deployment assurance plan",
      "Design review report",
      "Configuration assessment",
      "Integration risk register",
      "Go-live assurance checklist",
      "Operational handover pack",
    ],
  },
  {
    id: 4,
    number: "04",
    key: "monitoring-operations",
    title: "Monitoring & Operations",
    shortTitle: "Monitoring",
    icon: Activity,
    colour: "from-fuchsia-500 to-pink-600",
    ringColour: "ring-fuchsia-300/50",
    summary:
      "Maintain confidence in live infrastructure through monitoring, operational oversight and continuous assurance.",
    intro:
      "Operational assurance provides ongoing visibility of control performance, asset condition, supplier obligations and emerging security risks.",
    image: "/sia-step-04-monitoring-operations.png",
    miniSteps: [
      {
        title: "Operational baseline",
        text:
          "Define expected configuration, behaviour, performance and assurance measures.",
      },
      {
        title: "Monitoring design",
        text:
          "Establish appropriate monitoring, logging, alerts and operational reporting.",
      },
      {
        title: "Control review",
        text:
          "Evaluate whether technical and procedural controls remain effective.",
      },
      {
        title: "Exception management",
        text:
          "Record, assess and escalate deviations, failures and emerging risks.",
      },
      {
        title: "Operational reporting",
        text:
          "Provide meaningful assurance information to operational and governance teams.",
      },
      {
        title: "Continuous improvement",
        text:
          "Use operational insight to strengthen controls, processes and performance.",
      },
    ],
    support: [
      "Operational monitoring framework design",
      "Control effectiveness reviews",
      "Dashboard and reporting development",
      "Exception and escalation management",
      "Supplier performance assurance",
      "Continuous improvement planning",
    ],
    outputs: [
      "Operational assurance framework",
      "Monitoring and reporting requirements",
      "Control performance dashboard",
      "Exception and issue register",
      "Operational assurance report",
      "Improvement action plan",
    ],
  },
  {
    id: 5,
    number: "05",
    key: "incident-response",
    title: "Incident Response & Recovery",
    shortTitle: "Incident Response",
    icon: Siren,
    colour: "from-rose-500 to-red-600",
    ringColour: "ring-rose-300/50",
    summary:
      "Prepare for disruption with clear incident response, recovery and resilience arrangements for connected infrastructure.",
    intro:
      "Incident response assurance helps organisations prepare for cyber incidents, technology failures, supplier disruption and operational emergencies.",
    image: "/sia-step-05-incident-response-recovery.png",
    miniSteps: [
      {
        title: "Scenario planning",
        text:
          "Identify realistic operational, cyber and supplier disruption scenarios.",
      },
      {
        title: "Response playbooks",
        text:
          "Create practical actions, decision points and escalation arrangements.",
      },
      {
        title: "Roles and communications",
        text:
          "Clarify ownership, authority, communication channels and stakeholder responsibilities.",
      },
      {
        title: "Recovery planning",
        text:
          "Define restoration priorities, dependencies, workarounds and recovery objectives.",
      },
      {
        title: "Exercises and validation",
        text:
          "Test plans through workshops, simulations and structured exercises.",
      },
      {
        title: "Lessons learned",
        text:
          "Capture findings and convert them into measurable resilience improvements.",
      },
    ],
    support: [
      "OT and IoT incident response planning",
      "Scenario and exercise development",
      "Recovery and continuity planning",
      "Escalation and communications design",
      "Post-incident review support",
      "Resilience improvement planning",
    ],
    outputs: [
      "Incident response framework",
      "Scenario-specific playbooks",
      "Escalation and communications matrix",
      "Recovery plan",
      "Exercise report",
      "Lessons-learned action register",
    ],
  },
  {
    id: 6,
    number: "06",
    key: "optimisation-governance",
    title: "Optimisation, Refresh & Governance",
    shortTitle: "Optimisation",
    icon: BarChart3,
    colour: "from-emerald-500 to-green-600",
    ringColour: "ring-emerald-300/50",
    summary:
      "Review performance, refresh assurance controls and maintain effective governance throughout the infrastructure lifecycle.",
    intro:
      "Infrastructure, threats, regulations and organisational needs change over time. This stage ensures assurance remains current and aligned to future investment and transformation.",
    image: "/sia-step-06-optimisation-governance.png",
    miniSteps: [
      {
        title: "Performance review",
        text:
          "Evaluate operational performance, assurance outcomes and unresolved risks.",
      },
      {
        title: "Control refresh",
        text:
          "Update technical and governance controls to reflect change and lessons learned.",
      },
      {
        title: "Governance review",
        text:
          "Assess responsibilities, oversight, reporting and decision-making arrangements.",
      },
      {
        title: "Lifecycle planning",
        text:
          "Identify support, maintenance, obsolescence and replacement requirements.",
      },
      {
        title: "Refresh readiness",
        text:
          "Prepare security and assurance requirements for upgrades and future procurement.",
      },
      {
        title: "Strategic roadmap",
        text:
          "Create a prioritised roadmap for capability, resilience and governance improvement.",
      },
    ],
    support: [
      "Governance and control review",
      "Operational maturity assessment",
      "Lifecycle and obsolescence planning",
      "Technology refresh assurance",
      "Audit and compliance readiness",
      "Strategic improvement roadmapping",
    ],
    outputs: [
      "Governance improvement plan",
      "Lifecycle assurance roadmap",
      "Maturity assessment",
      "Technology refresh plan",
      "Audit readiness report",
      "Executive assurance summary",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                              SHARED HEADING                                */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  align = "center",
}) {
  const wrapperClass =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${wrapperClass}`}>
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
            dark ? "text-white/70" : "text-slate-600"
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
  onScrollToLifecycle,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_74%_22%,rgba(6,182,212,.20),transparent_26%),radial-gradient(circle_at_92%_65%,rgba(59,130,246,.18),transparent_28%),linear-gradient(120deg,#06112e_0%,#071936_52%,#020817_100%)]" />

      <div className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(6,17,46,0.99) 0%,rgba(6,17,46,0.96) 32%,rgba(6,17,46,0.67) 58%,rgba(6,17,46,0.18) 100%),url('/smart-infrastructure-assurance-hero-bg.png')",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-24 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-teal-200 backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Assurance that starts before you buy
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            Smart Infrastructure
            <br />

            <span className="bg-gradient-to-r from-teal-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Assurance
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-bold leading-8 text-white/90">
            Assurance across the full lifecycle of connected infrastructure,
            operational technology and IoT.
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-white/68">
            From Secure by Demand procurement to deployment, monitoring,
            resilience and governance, Smart Net Zero helps organisations make
            informed decisions at every stage.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={openEnquiryForm}
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 font-black text-white shadow-xl shadow-violet-950/25 transition hover:scale-[1.02]"
            >
              Talk to an Assurance Expert

              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onScrollToLifecycle}
              className="inline-flex items-center rounded-2xl border border-teal-300/40 bg-white/5 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore the Lifecycle

              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="hidden min-h-[560px] lg:block" />
      </div>

      <div className="absolute -bottom-px left-0 right-0 h-12 bg-white [clip-path:polygon(0_78%,100%_0,100%_100%,0_100%)]" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            LIFECYCLE GRAPHIC                               */
/* -------------------------------------------------------------------------- */

function LifecycleSection({
  openEnquiryForm,
}) {
  const [modalStep, setModalStep] = useState(null);

  const nodePositions = [
    {
      left: "50%",
      top: "4%",
    },
    {
      left: "86%",
      top: "28%",
    },
    {
      left: "86%",
      top: "72%",
    },
    {
      left: "50%",
      top: "96%",
    },
    {
      left: "14%",
      top: "72%",
    },
    {
      left: "14%",
      top: "28%",
    },
  ];

  return (
    <section
      id="sia-lifecycle"
      className="scroll-mt-28 bg-white px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Lifecycle assurance"
          title="Support at every stage of smart infrastructure"
          text="Select any of the six lifecycle stages to explore the support activities and typical assurance outputs."
        />

        <div className="mx-auto mt-14 max-w-4xl rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-5 shadow-2xl shadow-slate-900/10 sm:p-8 lg:p-12">
          <div className="relative mx-auto aspect-square w-full max-w-[760px]">
            {/* Outer lifecycle rings */}
            <div className="absolute inset-[7%] rounded-full border-2 border-dashed border-slate-300" />

            <div className="absolute inset-[17%] rounded-full border border-teal-200/70 bg-white/45" />

            {/* Direction arrows */}
            <div className="pointer-events-none absolute inset-[10%] rounded-full border-[12px] border-transparent border-r-teal-200/40 border-t-cyan-200/40 opacity-70" />

            {/* Centre */}
            <div className="absolute inset-[29%] z-20 grid place-items-center rounded-full border border-slate-200 bg-white text-center shadow-2xl">
              <div className="px-5">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-white shadow-lg shadow-cyan-900/20 sm:h-20 sm:w-20">
                  <Network className="h-8 w-8 sm:h-10 sm:w-10" />
                </span>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
                  Smart Infrastructure
                </p>

                <h3 className="mt-1 text-xl font-black leading-tight text-slate-950 sm:text-3xl">
                  Assurance
                  <br />
                  Lifecycle
                </h3>

                <p className="mt-2 hidden text-xs font-semibold text-slate-500 sm:block">
                  Assured. Secure. Sustainable.
                </p>
              </div>
            </div>

            {/* Six lifecycle stage buttons */}
            {lifecycleSteps.map((step, index) => {
              const Icon = step.icon;
              const position = nodePositions[index];

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setModalStep(step)}
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                  className={`group absolute z-30 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br ${step.colour} text-white shadow-xl ring-4 ring-transparent transition duration-300 hover:scale-110 hover:${step.ringColour} focus:outline-none focus:ring-4 focus:ring-teal-300/50 sm:h-32 sm:w-32`}
                  aria-label={`Open ${step.title}`}
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" />

                  <span className="mt-1 text-lg font-black sm:text-2xl">
                    {step.id}
                  </span>

                  <span className="hidden max-w-[100px] text-center text-[9px] font-black leading-tight sm:block">
                    {step.shortTitle}
                  </span>

                  <span className="absolute inset-0 rounded-full bg-white/0 transition group-hover:bg-white/[0.08]" />
                </button>
              );
            })}
           
          </div>
        </div>

       </div>

      <LifecycleStepModal
        step={modalStep}
        onClose={() => setModalStep(null)}
        openEnquiryForm={openEnquiryForm}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              LIFECYCLE MODAL                               */
/* -------------------------------------------------------------------------- */

function LifecycleStepModal({
  step,
  onClose,
  openEnquiryForm,
}) {
  useEffect(() => {
    if (!step) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [step, onClose]);

  return (
    <AnimatePresence>
      {step && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-md sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`lifecycle-step-${step.id}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.article
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
          >
            <ModalHero
              step={step}
              onClose={onClose}
            />

            <div className="p-6 md:p-10">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                    Stage overview
                  </p>

                  <p className="mt-4 text-base leading-8 text-slate-700">
                    {step.intro}
                  </p>

                  <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5">
                    <p className="text-sm font-black text-teal-900">
                      Why this stage matters
                    </p>

                    <p className="mt-2 text-sm leading-6 text-teal-900/75">
                      {step.summary}
                    </p>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                    Typical assurance outputs
                  </p>

                  <div className="mt-4 grid gap-3">
                    {step.outputs.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />

                        <p className="text-sm font-semibold leading-6 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <SubCycleSection step={step} />

              <SupportSection step={step} />

              <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-6 text-slate-600">
                  Discuss this individual lifecycle stage or a complete
                  infrastructure assurance programme.
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
                    Talk to an Assurance Expert

                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalHero({
  step,
  onClose,
}) {
  const Icon = step.icon;

  return (
    <div
      className="relative min-h-[340px] bg-[#06112e] bg-cover p-7 text-white md:p-10"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(6,17,46,.99) 0%,
          rgba(6,17,46,.90) 52%,
          rgba(6,17,46,.28) 100%
        ), url('${step.image}')`,
        backgroundPosition: "center right",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/30 text-white transition hover:bg-white/15"
        aria-label="Close lifecycle detail"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative z-10 flex min-h-[270px] max-w-3xl flex-col justify-end">
        <div className="inline-flex w-fit items-center rounded-full border border-teal-300/25 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-teal-200">
          Lifecycle assurance stage
        </div>

        <div className="mt-5 flex items-start gap-5">
          <span
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${step.colour} text-white shadow-lg md:h-20 md:w-20`}
          >
            <Icon className="h-8 w-8 md:h-10 md:w-10" />
          </span>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.15em] text-teal-300">
              Stage {step.number}
            </p>

            <h2
              id={`lifecycle-step-${step.id}`}
              className="mt-2 text-4xl font-black leading-tight md:text-5xl"
            >
              {step.title}
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/76">
              {step.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubCycleSection({
  step,
}) {
  return (
    <section className="mt-9">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            {step.id === 1
              ? "Secure by Demand framework"
              : "Stage sub-cycle"}
          </p>

          <h3 className="mt-2 text-2xl font-black text-slate-950">
            How this stage is delivered
          </h3>
        </div>

        <p className="text-sm text-slate-500">
          Six connected assurance activities
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {step.miniSteps.map((item, index) => (
          <article
            key={item.title}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="absolute right-4 top-3 text-5xl font-black text-slate-100">
              {index + 1}
            </span>

            <span
              className={`relative z-10 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${step.colour} text-white`}
            >
              <span className="font-black">
                {index + 1}
              </span>
            </span>

            <h4 className="relative z-10 mt-4 text-lg font-black text-slate-950">
              {item.title}
            </h4>

            <p className="relative z-10 mt-3 text-sm leading-6 text-slate-600">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportSection({
  step,
}) {
  return (
    <section className="mt-9 rounded-3xl bg-[#06112e] p-7 text-white">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
        How Smart Net Zero supports
      </p>

      <h3 className="mt-2 text-2xl font-black">
        Practical assurance support for this stage
      </h3>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {step.support.map((item) => (
          <div
            key={item}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />

            <p className="text-sm font-semibold leading-6 text-white/78">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               VALUE SECTION                                */
/* -------------------------------------------------------------------------- */

function ValueSection() {
  const values = [
    {
      title: "Assurance before purchase",
      text:
        "Secure by Demand shapes procurement, supplier selection and contract expectations before devices enter the estate.",
      icon: Search,
    },
    {
      title: "Control through deployment",
      text:
        "Assurance continues through design validation, integration, go-live readiness and operational handover.",
      icon: Settings2,
    },
    {
      title: "Confidence in live operations",
      text:
        "Monitoring, resilience, governance and optimisation sustain value and reduce risk over time.",
      icon: Activity,
    },
  ];

  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why it matters"
          title="A full-lifecycle assurance model"
          text="Connected infrastructure needs more than a one-off technical review. It needs coordinated assurance from procurement through operations, recovery and change."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
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
/*                                    CTA                                     */
/* -------------------------------------------------------------------------- */

function CTASection({
  openEnquiryForm,
}) {
  return (
    <section className="bg-white px-5 pb-16 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] bg-cover bg-center p-8 text-white shadow-2xl md:p-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,17,46,0.97) 0%, rgba(6,17,46,0.90) 45%, rgba(6,17,46,0.56) 100%), url('/smart-infrastructure-cta-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,rgba(6,182,212,.18),transparent_28%),radial-gradient(circle_at_68%_100%,rgba(139,92,246,.12),transparent_34%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="grid h-24 w-24 place-items-center rounded-full border border-teal-300/30 bg-teal-300/10 backdrop-blur-sm">
            <Target className="h-12 w-12 text-teal-200" />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              Start a conversation
            </p>

            <h2 className="mt-2 text-3xl font-black leading-tight">
              Assurance today. Resilience tomorrow.
            </h2>

            <p className="mt-3 max-w-2xl text-white/75">
              Partner with Smart Net Zero to secure and assure your
              infrastructure across its full lifecycle.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-4 font-black text-slate-950 shadow-xl transition hover:scale-[1.02]"
          >
            Talk to an Assurance Expert

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

export default function SmartInfrastructureAssurance({
  goToPage,
  openEnquiryForm,
}) {

  useEffect(() => {
  document.title = "Smart Infrastructure Assurance | Smart Net Zero";
}, []);
  
  const scrollToLifecycle = () => {
    document
      .getElementById("sia-lifecycle")
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
        activePage="SmartInfrastructureAssurance"
      />

      <main>
        <Hero
          openEnquiryForm={openEnquiryForm}
          onScrollToLifecycle={scrollToLifecycle}
        />

        <LifecycleSection
          openEnquiryForm={openEnquiryForm}
        />

        <ValueSection />

        <CTASection
          openEnquiryForm={openEnquiryForm}
        />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}