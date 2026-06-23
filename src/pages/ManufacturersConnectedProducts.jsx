import { useMemo, useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Factory,
  FileCheck2,
  FileText,
  FlaskConical,
  Globe2,
  HelpCircle,
  Lock,
  PackageCheck,
  Radio,
  Router,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Target,
  Timer,
  Truck,
  Users,
  Wifi,
  X,
} from "lucide-react";

const audienceCards = [
  {
    title: "Manufacturers",
    text: "Build compliant, secure and market-ready connected and digital products.",
    icon: Factory,
  },
  {
    title: "Connected Product Teams",
    text: "Validate designs, understand regulatory scope and plan testing early.",
    icon: Users,
  },
  {
    title: "Importers & Distributors",
    text: "Ensure products meet EU/UK requirements before entering the market.",
    icon: Truck,
  },
  {
    title: "Procurement & Assurance Teams",
    text: "Make confident purchasing decisions with verified evidence and assurance.",
    icon: ClipboardCheck,
  },
];

const useCases = [
  {
    id: "smart-thermostat",
    title: "Smart Thermostat / HVAC Controller",
    category: "Consumer",
    image: "/connected-usecase-thermostat.png",
    description:
      "Wi-Fi enabled thermostat controlling HVAC systems and collecting usage data.",
    likelyScope: ["CRA", "PSTI", "RED v3.3"],
    considerations: [
      "Wireless radio function",
      "Cloud connectivity",
      "Personal or usage data",
      "Software update lifecycle",
    ],
  },
  {
    id: "connected-cctv",
    title: "Connected CCTV / Access Device",
    category: "Commercial",
    image: "/connected-usecase-cctv.png",
    description:
      "Networked security camera with cloud connectivity and remote access.",
    likelyScope: ["CRA", "PSTI", "RED v3.3"],
    considerations: [
      "Cybersecurity and access control",
      "Video/data processing",
      "Wireless or network connectivity",
      "Vulnerability handling",
    ],
  },
  {
    id: "industrial-sensor",
    title: "Industrial Sensor / Gateway",
    category: "Industrial",
    image: "/connected-usecase-industrial-sensor.png",
    description:
      "Industrial IoT device transmitting telemetry to cloud platforms.",
    likelyScope: ["CRA", "RED v3.3"],
    considerations: [
      "Operational environment",
      "Cloud telemetry",
      "Remote management",
      "Security update obligations",
    ],
  },
  {
    id: "bms-controller",
    title: "Building Management System / BMS Controller",
    category: "Commercial",
    image: "/connected-usecase-bms-controller.png",
    description:
      "A connected building management controller used to monitor and control HVAC, lighting, access systems, energy use and other smart building functions.",
    likelyScope: ["CRA", "RED v3.3", "Secure-by-Design Assurance"],
    considerations: [
      "BMS or building automation connectivity",
      "Remote access and supplier maintenance routes",
      "Integration with HVAC, metering, lighting or access systems",
      "Operational resilience and lifecycle security",
      "Potential wireless, network or cloud connectivity",
    ],
  },
  {
    id: "smart-appliance",
    title: "Consumer Smart Appliance",
    category: "Consumer",
    image: "/connected-usecase-appliance.png",
    description: "Smart appliance with Wi-Fi connectivity and app control.",
    likelyScope: ["CRA", "PSTI", "RED v3.3"],
    considerations: [
      "Consumer product security",
      "Radio equipment requirements",
      "App and cloud security",
      "User data handling",
    ],
  },
];

const demandItems = [
  {
    title: "Supplier Evidence",
    text: "Request compliance evidence, test reports and declarations.",
    icon: FileCheck2,
  },
  {
    title: "Secure-by-Design Questions",
    text: "Evaluate security controls, data protection and threat modelling.",
    icon: ShieldCheck,
  },
  {
    title: "Update & Support Policy",
    text: "Review software update commitments and end-of-life policies.",
    icon: Timer,
  },
  {
    title: "Vulnerability Management",
    text: "Assess vulnerability handling, disclosure process and response SLAs.",
    icon: AlertTriangle,
  },
  {
    title: "Product Assurance",
    text: "Review conformity assessments, markings and technical documentation.",
    icon: PackageCheck,
  },
];

const journeySteps = [
  {
    number: "1",
    title: "Assess",
    text: "Understand your product, features and intended market.",
    icon: Search,
  },
  {
    number: "2",
    title: "Classify",
    text: "Determine regulatory scope including CRA, RED v3.3, PSTI and more.",
    icon: Target,
  },
  {
    number: "3",
    title: "Test",
    text: "Plan and execute testing with accredited labs and specialists.",
    icon: FlaskConical,
  },
  {
    number: "4",
    title: "Assure",
    text: "Compile technical file, evidence and declarations of conformity.",
    icon: ShieldCheck,
  },
  {
    number: "5",
    title: "Monitor",
    text: "Maintain compliance through updates, monitoring and change management.",
    icon: BarChart3,
  },
];

const gainCards = [
  {
    title: "Faster Compliance Decisions",
    text: "Quickly understand scope and required actions.",
    icon: Timer,
  },
  {
    title: "Reduced Regulatory Uncertainty",
    text: "Clear guidance on CRA, RED v3.3, PSTI and other obligations.",
    icon: ShieldCheck,
  },
  {
    title: "Clear Testing Pathways",
    text: "Know what to test, why and how to evidence compliance.",
    icon: FlaskConical,
  },
  {
    title: "Improved Device Assurance",
    text: "Stronger security, reliability and customer trust.",
    icon: Lock,
  },
  {
    title: "Stronger Market Readiness",
    text: "Confidently launch and sell in the UK, EU and globally.",
    icon: Globe2,
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

function ComplianceFlow({ openEnquiryForm }) {
  const questions = [
    {
      id: "connected",
      label: "Is your product connected, digital or smart-enabled?",
      help: "For example: Wi-Fi, Bluetooth, Ethernet, app control, cloud service, data exchange, remote monitoring or embedded software.",
    },
    {
      id: "wireless",
      label: "Does it communicate wirelessly or over a network?",
      help: "This includes Wi-Fi, Bluetooth, Zigbee, cellular, LoRaWAN, Ethernet or communication through a gateway.",
      dependsOn: "connected",
    },
    {
      id: "radio",
      label: "Does it include radio equipment or wireless capability?",
      help: "Products with wireless communication may need assessment under Radio Equipment Directive requirements, including RED cybersecurity requirements.",
      dependsOn: "wireless",
    },
    {
      id: "euuk",
      label: "Will it be sold, supplied or used in the UK or EU market?",
      help: "Market location matters because UK and EU product security, safety and conformity requirements may apply.",
      dependsOn: "connected",
    },
    {
      id: "data",
      label:
        "Does it collect, transmit, process or store user, operational or device data?",
      help: "This includes personal data, telemetry, access logs, sensor readings, usage data or operational performance data.",
      dependsOn: "connected",
    },
    {
      id: "consumer",
      label: "Is it a consumer product or likely to be used by consumers?",
      help: "Consumer connectable products may trigger UK PSTI and similar consumer product security expectations.",
      dependsOn: "connected",
    },
    {
      id: "critical",
      label:
        "Could the device affect safety, security, building operation or service continuity?",
      help: "Examples include BMS, access control, CCTV, HVAC controllers, industrial gateways, sensors or operational equipment.",
      dependsOn: "connected",
    },
  ];

  const [answers, setAnswers] = useState({});

  const visibleQuestions = questions.filter((question, index) => {
    if (index === 0) return true;
    if (!question.dependsOn) return true;
    return answers[question.dependsOn] === "yes";
  });

  const visibleAnsweredCount = visibleQuestions.filter(
    (question) => answers[question.id]
  ).length;

  const totalQuestions = visibleQuestions.length;

  const complete =
    totalQuestions > 0 && visibleAnsweredCount === totalQuestions;

  const nextQuestion = visibleQuestions.find(
    (question) => !answers[question.id]
  );

  const handleAnswer = (questionId, value) => {
    setAnswers((current) => {
      const updated = {
        ...current,
        [questionId]: value,
      };

      const questionIndex = questions.findIndex(
        (question) => question.id === questionId
      );

      questions.slice(questionIndex + 1).forEach((question) => {
        delete updated[question.id];
      });

      return updated;
    });
  };

  const resetNavigator = () => {
    setAnswers({});
  };

  const yes = (id) => answers[id] === "yes";
  const no = (id) => answers[id] === "no";

  const getResult = () => {
    const likely = [];
    const notes = [];
    let rating = "Low";
    let tone = "text-emerald-700";
    let bg = "bg-emerald-50";
    let border = "border-emerald-200";

    if (yes("connected")) {
      rating = "Medium";
      tone = "text-amber-700";
      bg = "bg-amber-50";
      border = "border-amber-200";

      likely.push("Cyber Resilience Act / connected product security review");
      notes.push(
        "Because the product is connected, digital or software-enabled, cyber and product security requirements may be relevant."
      );
    }

    if (yes("radio")) {
      rating = "High";
      tone = "text-rose-700";
      bg = "bg-rose-50";
      border = "border-rose-200";

      likely.push("Radio Equipment Directive including RED v3.3");
      notes.push(
        "Wireless capability usually means radio equipment obligations should be checked, including RED cybersecurity requirements where applicable."
      );
    }

    if (yes("consumer")) {
      rating = "High";
      tone = "text-rose-700";
      bg = "bg-rose-50";
      border = "border-rose-200";

      likely.push("UK PSTI / consumer connectable product security");
      notes.push(
        "Consumer connectable products may need security features, vulnerability disclosure information and support period information."
      );
    }

    if (yes("euuk")) {
      notes.push(
        "Because the product is intended for the UK or EU market, conformity, documentation and market access obligations should be reviewed."
      );
    }

    if (yes("data")) {
      likely.push("Data protection and secure data handling review");
      notes.push(
        "Products that collect or transmit data should be reviewed for privacy, security, logging, retention and access control expectations."
      );
    }

    if (yes("critical")) {
      likely.push("Secure-by-design and operational resilience assurance");
      notes.push(
        "Products affecting buildings, safety, access, operations or service continuity should be assessed for resilience, update support and lifecycle security."
      );
    }

    if (no("connected")) {
      rating = "Lower";
      tone = "text-emerald-700";
      bg = "bg-emerald-50";
      border = "border-emerald-200";

      likely.push("Likely outside CRA / RED v3.3 connected-product scope");
      notes.push(
        "If the product is not connected, digital or smart-enabled, connected-product cybersecurity requirements may be less likely, but other product safety or conformity rules may still apply."
      );
    }

    return {
      rating,
      tone,
      bg,
      border,
      likely: [...new Set(likely)],
      notes: [...new Set(notes)],
    };
  };

  const result = getResult();

  const processingChecks = [
    "Checking connected-product scope",
    "Reviewing radio and network indicators",
    "Assessing product security triggers",
    "Preparing indicative compliance route",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#06112e] text-sm font-black text-white">
              1
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700">
                Compliance Navigator
              </p>
              <h3 className="mt-1 text-2xl font-black text-[#07133c]">
                Check whether your device may need compliance testing
              </h3>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">
            Answer a short set of yes/no questions. The navigator builds an
            indicative view of whether CRA, RED v3.3, PSTI, data protection or
            secure-by-design assurance may be relevant to your product.
          </p>
        </div>

        <button
          type="button"
          onClick={resetNavigator}
          className="shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black text-slate-500">
              Assessment progress
            </p>
            <p className="text-xs font-black text-cyan-700">
              {visibleAnsweredCount}/{totalQuestions} answered
            </p>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.round((visibleAnsweredCount / totalQuestions) * 100)
                )}%`,
              }}
            />
          </div>

          <div className="mt-5 space-y-4">
            {visibleQuestions.map((question, index) => {
              const answered = answers[question.id];
              const isCurrent = nextQuestion?.id === question.id;
              const isLocked = !answered && !isCurrent;

              return (
                <div
                  key={question.id}
                  className={`rounded-2xl border p-4 transition ${
                    answered
                      ? "border-cyan-200 bg-cyan-50"
                      : isCurrent
                      ? "border-violet-200 bg-white shadow-md"
                      : "border-slate-200 bg-white opacity-65"
                  }`}
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_150px] md:items-start">
                    <div className="flex gap-3">
                      <div
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black ${
                          answered
                            ? "bg-cyan-600 text-white"
                            : isCurrent
                            ? "bg-[#06112e] text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <h4 className="text-sm font-black leading-6 text-[#07133c]">
                          {question.label}
                        </h4>
                        <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                          {question.help}
                        </p>
                      </div>
                    </div>

                    <select
                      value={answered || ""}
                      disabled={isLocked}
                      onChange={(event) =>
                        handleAnswer(question.id, event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#07133c] outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#06112e] shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <p className="ml-3 text-xs font-black uppercase tracking-[0.14em] text-white/50">
              SNZ Compliance Screen
            </p>
          </div>

          <div className="p-5">
            {!complete ? (
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-cyan-300" />
                  <p className="text-sm font-black text-cyan-200">
                    Processing answers...
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {processingChecks.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white/70">
                          {item}
                        </p>
                        <span
                          className={`text-xs font-black ${
                            visibleAnsweredCount > index
                              ? "text-emerald-300"
                              : "text-white/35"
                          }`}
                        >
                          {visibleAnsweredCount > index ? "Checked" : "Waiting"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-xs font-semibold leading-5 text-cyan-100">
                    Complete the remaining questions to generate an indicative
                    compliance view.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={`rounded-2xl border p-4 ${result.bg} ${result.border}`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Indicative compliance likelihood
                  </p>
                  <p className={`mt-2 text-4xl font-black ${result.tone}`}>
                    {result.rating}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <h4 className="text-sm font-black text-white">
                    Likely relevant areas
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.likely.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-black text-cyan-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <h4 className="text-sm font-black text-white">
                    What your answers mean
                  </h4>

                  <div className="mt-4 space-y-3">
                    {result.notes.map((item) => (
                      <div key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <p className="text-xs font-semibold leading-5 text-white/68">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={openEnquiryForm}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-5 py-3 text-sm font-black text-white transition hover:scale-[1.02]"
                  >
                    Speak to an Expert <ArrowRight className="ml-2 h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={resetNavigator}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Start again
                  </button>
                </div>

                <p className="mt-4 text-xs font-semibold leading-5 text-white/45">
                  This is an indicative self-assessment only. A product-specific
                  review is needed before making compliance, testing or market
                  access decisions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function UseCaseModal({ useCase, onClose }) {
  if (!useCase) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          aria-label="Close use case"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative overflow-hidden rounded-t-[2rem] bg-[#06112e] p-8 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.18),transparent_30%)]" />
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
              Product use case
            </p>
            <h2 className="mt-3 text-4xl font-black">{useCase.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-white/75">
              {useCase.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Likely compliance scope
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {useCase.likelyScope.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-[#07133c]">
              Key considerations
            </h3>
            <div className="mt-4 space-y-3">
              {useCase.considerations.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

const secureByDemandSections = [
  {
    id: "define-requirements",
    title: "Define requirements",
    text: "Set product security, compliance and assurance baselines before procurement.",
    icon: FileText,
    scope: [
      "Product security requirements for connected devices, software and cloud services.",
      "Regulatory scope including CRA, RED v3.3, PSTI and product security expectations.",
      "Secure-by-design and secure-by-default requirements.",
      "Data protection, logging, authentication and update requirements.",
      "Evidence requirements for technical file, testing, conformity and assurance.",
    ],
    questions: [
      "What product security requirements must the supplier meet before contract award?",
      "Does the product have wireless, cloud, remote access or software update capability?",
      "Which regulations or standards has the supplier mapped the product against?",
      "What security controls must be enabled by default?",
      "What evidence will be required before the product is accepted?",
    ],
  },
  {
    id: "evaluate-suppliers",
    title: "Evaluate suppliers",
    text: "Assess capability, evidence and past product-security performance.",
    icon: Users,
    scope: [
      "Supplier product security governance and ownership.",
      "Secure development lifecycle and security testing practices.",
      "Vulnerability disclosure and coordinated vulnerability management.",
      "Software bill of materials and third-party component management.",
      "Track record of security updates, support and vulnerability response.",
    ],
    questions: [
      "Can the supplier evidence a secure development lifecycle?",
      "Who owns product security in the supplier organisation?",
      "Does the supplier operate a vulnerability disclosure process?",
      "How does the supplier manage third-party software and components?",
      "Can the supplier provide examples of previous security fixes and update timelines?",
    ],
  },
  {
    id: "request-evidence",
    title: "Request evidence",
    text: "Use standard evidence checklists, test outputs and artefacts.",
    icon: FileCheck2,
    scope: [
      "Test reports, security assessments and conformity documentation.",
      "Architecture diagrams, data-flow diagrams and threat models.",
      "Patch, update and vulnerability handling policies.",
      "Secure configuration guidance and hardening documentation.",
      "Product lifecycle evidence including support period and end-of-life process.",
    ],
    questions: [
      "Can the supplier provide test reports or independent assurance evidence?",
      "Is there a documented product architecture and data-flow model?",
      "What is the minimum security configuration delivered by default?",
      "How are updates signed, delivered and verified?",
      "What support period and end-of-life commitments are provided?",
    ],
  },
  {
    id: "decide-with-confidence",
    title: "Decide with confidence",
    text: "Make data-driven decisions with documented assurance.",
    icon: BadgeCheck,
    scope: [
      "Procurement scoring and comparison across suppliers.",
      "Risk acceptance records and documented decision rationale.",
      "Contractual security obligations and acceptance criteria.",
      "Residual risk review before product selection.",
      "Board, audit or client evidence packs for assurance.",
    ],
    questions: [
      "How does this supplier compare against other suppliers on product security?",
      "What risks remain after reviewing the evidence?",
      "Are security obligations included in the contract or statement of work?",
      "What evidence must be supplied before go-live or deployment?",
      "Who signs off residual risk and assurance acceptance?",
    ],
  },
  {
    id: "monitor-improve",
    title: "Monitor & improve",
    text: "Track performance and drive continuous product assurance.",
    icon: BarChart3,
    scope: [
      "Post-deployment monitoring and security update tracking.",
      "Supplier performance reviews and service-level reporting.",
      "Vulnerability notifications and patch management governance.",
      "Change control for new features, integrations and cloud services.",
      "Continuous improvement of procurement security questions and evidence templates.",
    ],
    questions: [
      "How will product security be monitored after purchase?",
      "How will the supplier notify customers about vulnerabilities?",
      "What patching and update service levels apply?",
      "How will product changes or new integrations be assessed?",
      "How will lessons learned improve future procurement decisions?",
    ],
  },
];

function SecureByDemandModal({ open, onClose }) {
  const [activeSection, setActiveSection] = useState(
    secureByDemandSections[0]
  );

  if (!open) return null;

  const ActiveIcon = activeSection.icon;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          aria-label="Close framework"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative overflow-hidden rounded-t-[2rem] bg-[#06112e] p-8 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.18),transparent_30%)]" />

          <div className="relative z-10 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
              Procurement assurance linked to Secure by Demand principles
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Secure by Demand Framework
            </h2>

            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/75">
              A practical SNZ framework inspired by CISA Secure by Demand
              guidance. It helps buyers, manufacturers and assurance teams ask
              better product-security questions, request meaningful evidence and
              select connected products with confidence.
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="px-2 text-lg font-black text-[#07133c]">
              Framework stages
            </h3>

            <div className="mt-4 space-y-3">
              {secureByDemandSections.map((item, index) => {
                const Icon = item.icon;
                const active = activeSection.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item)}
                    className={`grid w-full grid-cols-[52px_1fr_auto] items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-cyan-300 bg-white shadow-md"
                        : "border-slate-200 bg-white hover:border-cyan-200 hover:bg-cyan-50"
                    }`}
                  >
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl ${
                        active
                          ? "bg-[#06112e] text-cyan-300"
                          : "bg-cyan-50 text-cyan-700"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-pink-600">
                        Stage {index + 1}
                      </p>
                      <h4 className="mt-1 text-sm font-black text-[#07133c]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>

                    <ArrowRight
                      className={`h-5 w-5 ${
                        active ? "text-cyan-600" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#06112e] text-cyan-300">
                  <ActiveIcon className="h-8 w-8" />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700">
                    Selected stage
                  </p>
                  <h3 className="mt-2 text-3xl font-black text-[#07133c]">
                    {activeSection.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {activeSection.text}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-700">
                  Procurement focus
                </p>
                <p className="mt-1 text-sm font-black text-[#07133c]">
                  Ask • Evidence • Decide
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <article className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
                <h4 className="text-xl font-black text-[#07133c]">
                  What is in scope
                </h4>

                <div className="mt-5 space-y-3">
                  {activeSection.scope.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                      <p className="text-sm font-bold leading-6 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                <h4 className="text-xl font-black text-[#07133c]">
                  Key questions to ask
                </h4>

                <div className="mt-5 space-y-3">
                  {activeSection.questions.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                      <p className="text-sm font-bold leading-6 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-black text-[#07133c]">
                    Evidence output
                  </h4>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                    Use this stage to build a procurement evidence pack covering
                    supplier responses, product-security evidence, residual risk
                    and decision rationale.
                  </p>
                </div>

                <span className="inline-flex shrink-0 rounded-full bg-[#06112e] px-4 py-2 text-xs font-black text-cyan-200">
                  Secure by Demand checklist
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-slate-200 px-6 py-5">
          <p className="text-xs font-semibold leading-5 text-slate-500">
            Note: This framework is an SNZ interpretation for connected products,
            smart infrastructure and procurement assurance. It should be tailored
            to the product, risk context, regulatory scope and procurement route.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ManufacturersConnectedProducts({
  goToPage,
  openEnquiryForm,
}) {

  useEffect(() => {
    document.title = "Manufacturers & Connected Products | Smart Net Zero";
  }, []);
  const [activeCase, setActiveCase] = useState(null);
  const [frameworkOpen, setFrameworkOpen] = useState(false);
  const [caseFilter, setCaseFilter] = useState("All Cases");

  const filteredUseCases = useMemo(() => {
    if (caseFilter === "All Cases") return useCases;
    return useCases.filter((item) => item.category === caseFilter);
  }, [caseFilter]);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="ManufacturersConnectedProducts"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.99) 0%, rgba(6,17,46,0.92) 32%, rgba(6,17,46,0.50) 62%, rgba(6,17,46,0.12) 100%), url('/manufacturers-connected-products-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_40%_85%,rgba(236,72,153,0.18),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-18">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
                Manufacturing & Products
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Manufacturers &
                <span className="block">Connected Products</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/82">
                Helping organisations understand whether their devices need
                compliance testing, achieve product security compliance, and
                align with CRA, RED v3.3, PSTI and other regulatory
                requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#resource-hub"
                  className="inline-flex items-center rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-black text-[#06112e] shadow-xl transition hover:scale-[1.02]"
                >
                  Check My Device <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <button
                  type="button"
                  onClick={openEnquiryForm}
                  className="inline-flex items-center rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
                >
                  Speak to an Expert <HelpCircle className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#07193f]/84 shadow-2xl backdrop-blur md:grid-cols-4">
              {[
                [
                  "Regulation Aligned",
                  "Stay aligned with CRA, RED v3.3, PSTI and global requirements.",
                  ShieldCheck,
                ],
                [
                  "Risk & Security Focused",
                  "Identify risk early and build secure, resilient products.",
                  Lock,
                ],
                [
                  "Test with Confidence",
                  "Access accredited labs and specialist testing expertise.",
                  Radio,
                ],
                [
                  "Procure with Assurance",
                  "Make confident decisions with evidence and documentation.",
                  ShoppingCart,
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
                  <h3 className="mt-4 text-base font-black">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/64">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel title="Who this page helps" />

            <div className="grid gap-5 md:grid-cols-4">
              {audienceCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-50">
                      <Icon className="h-9 w-9 text-cyan-700" />
                    </div>
                    <h3 className="mt-4 text-base font-black leading-tight text-[#07133c]">
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

        <section
            id="resource-hub"
            className="border-t border-slate-100 bg-white px-5 py-8 lg:px-8"
            >
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
                <SectionLabel
                title="Compliance Resource Hub"
                text="Three expert tools to help you evaluate, plan and prove compliance."
                />

                <div className="space-y-5">
                <ComplianceFlow openEnquiryForm={openEnquiryForm} />

                <div className="grid gap-5 lg:grid-cols-2">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#06112e] text-sm font-black text-white">
                        2
                        </span>

                        <div>
                        <h3 className="text-lg font-black text-[#07133c]">
                            Use Case Explorer
                        </h3>
                        <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                            Explore examples similar to your product and the likely
                            compliance implications.
                        </p>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {["All Cases", "Industrial", "Commercial", "Consumer"].map(
                        (filter) => (
                            <button
                            key={filter}
                            type="button"
                            onClick={() => setCaseFilter(filter)}
                            className={`rounded-xl px-4 py-2 text-xs font-black transition ${
                                caseFilter === filter
                                ? "bg-cyan-600 text-white"
                                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                            >
                            {filter}
                            </button>
                        )
                        )}
                    </div>

                    <div className="mt-5 space-y-3">
                        {filteredUseCases.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveCase(item)}
                            className="grid w-full grid-cols-[64px_1fr_24px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50"
                            >
                            <div className="grid h-16 w-16 place-items-center rounded-xl bg-slate-100">
                                {item.id === "smart-thermostat" && (
                                <Wifi className="h-8 w-8 text-cyan-700" />
                                )}

                                {item.id === "connected-cctv" && (
                                <Cloud className="h-8 w-8 text-cyan-700" />
                                )}

                                {item.id === "industrial-sensor" && (
                                <Router className="h-8 w-8 text-cyan-700" />
                                )}

                                {item.id === "smart-appliance" && (
                                <Smartphone className="h-8 w-8 text-cyan-700" />
                                )}

                                {item.id === "bms-controller" && (
                                <Building2 className="h-8 w-8 text-cyan-700" />
                                )}
                            </div>

                            <div className="min-w-0">
                                <h4 className="text-sm font-black leading-5 text-[#07133c]">
                                {item.title}
                                </h4>

                                <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                                Likely scope: {item.likelyScope.join(", ")}
                                </p>
                            </div>

                            <ArrowRight className="h-5 w-5 text-cyan-600" />
                            </button>
                        ))}
                    </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#06112e] text-sm font-black text-white">
                        3
                        </span>

                        <div>
                        <h3 className="text-lg font-black text-[#07133c]">
                            Secure by Demand Framework
                        </h3>
                        <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                            Assurance and evidence you should request from suppliers and
                            product teams.
                        </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        {demandItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                            key={item.title}
                            type="button"
                            onClick={() => setFrameworkOpen(true)}
                            className="grid w-full grid-cols-[52px_1fr_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-cyan-300 hover:bg-cyan-50"
                            >
                            <div className="grid h-12 w-12 place-items-center rounded-full bg-cyan-50 text-cyan-700">
                                <Icon className="h-6 w-6" />
                            </div>

                            <div>
                                <h4 className="text-sm font-black text-[#07133c]">
                                {item.title}
                                </h4>
                                <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                                {item.text}
                                </p>
                            </div>

                            <ArrowRight className="h-5 w-5 text-cyan-600" />
                            </button>
                        );
                        })}
                    </div>

                    </article>
                </div>                
                </div>
            </div>
            </section>

        <section className="border-t border-slate-100 bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel
              title="Your Compliance Journey"
              text="A proven 5-step path from assessment to ongoing assurance."
            />

            <div className="rounded-3xl bg-[#06112e] p-5 text-white shadow-xl">
              <div className="grid gap-4 md:grid-cols-5">
                {journeySteps.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className={`relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 ${
                        index < journeySteps.length - 1
                          ? "after:absolute after:right-[-18px] after:top-1/2 after:hidden after:h-px after:w-8 after:bg-cyan-300/40 md:after:block"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-sm font-black">
                          {item.number}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-black">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs font-semibold leading-5 text-white/62">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white px-5 py-8 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_2.45fr]">
            <SectionLabel title="What You Gain" />

            <div className="grid gap-5 md:grid-cols-5">
              {gainCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm"
                  >
                    <Icon className="mx-auto h-10 w-10 text-cyan-700" />
                    <h3 className="mt-4 text-sm font-black leading-tight text-[#07133c]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-16 pt-4 lg:px-8">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-8 text-white shadow-xl md:p-10"
            style={{
                backgroundImage:
                    "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.86) 38%, rgba(6,17,46,0.58) 66%, rgba(6,17,46,0.18) 100%), url('/manufacturers-products-cta-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
          >
            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="max-w-3xl text-3xl font-black md:text-4xl">
                  Need to understand whether your device requires compliance
                  testing?
                </h2>
                <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/82">
                  Talk to our experts and get clear, tailored guidance for your
                  product.
                </p>
              </div>

              <button
                type="button"
                onClick={openEnquiryForm}
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-8 py-4 text-sm font-black text-[#06112e] shadow-lg transition hover:scale-[1.02]"
              >
                Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {activeCase && (
        <UseCaseModal
          useCase={activeCase}
          onClose={() => setActiveCase(null)}
        />
      )}

      <SecureByDemandModal
        open={frameworkOpen}
        onClose={() => setFrameworkOpen(false)}
      />
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}