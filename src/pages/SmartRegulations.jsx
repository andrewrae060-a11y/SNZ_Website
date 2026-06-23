import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FlaskConical,
  GraduationCap,
  Lock,
  MonitorCheck,
  Radio,
  Scale,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Wifi,
  X,
} from "lucide-react";

const audienceCards = [
  {
    title: "Manufacturers",
    text: "Build compliant, secure and market-ready connected products from the start.",
    icon: Factory,
    colour: "from-emerald-300 to-green-500",
    accent: {
      text: "text-emerald-600",
      lightText: "text-emerald-300",
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      button: "from-emerald-500 to-green-600",
      glow:
        "radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.24),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.18),transparent_34%)",
    },
    challenge:
      "Manufacturers need to understand which connected product regulations apply, what security requirements must be designed in, and what evidence is needed before products are placed on the market.",
    support:
      "SNZ helps manufacturers assess regulatory obligations, identify gaps, build compliance roadmaps, prepare technical evidence and strengthen product security assurance.",
    outcomes: [
      "Clear view of applicable regulations",
      "Reduced risk of non-compliant product launch",
      "Improved product security evidence",
      "Stronger confidence with distributors and customers",
    ],
    cta: "Discuss Product Compliance",
  },
  {
    title: "Distributors & End Users",
    text: "Confidently procure, deploy and operate compliant devices and systems.",
    icon: Users,
    colour: "from-sky-300 to-blue-500",
    accent: {
      text: "text-sky-600",
      lightText: "text-sky-300",
      border: "border-sky-200",
      bg: "bg-sky-50",
      button: "from-sky-500 to-blue-600",
      glow:
        "radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.24),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.18),transparent_34%)",
    },
    challenge:
      "Distributors and end users need assurance that connected products are compliant, secure and suitable for deployment across operational environments.",
    support:
      "SNZ supports procurement assurance, supplier evidence review, deployment risk assessment and practical guidance for operating connected devices responsibly.",
    outcomes: [
      "Better supplier and product assurance",
      "Reduced procurement and deployment risk",
      "Clearer evidence for compliance decisions",
      "Improved confidence in connected device estates",
    ],
    cta: "Review Procurement Risk",
  },
  {
    title: "Smart Infrastructure Providers",
    text: "Deliver resilient, regulation-ready infrastructure across cities and communities.",
    icon: Building2,
    colour: "from-cyan-300 to-teal-500",
    accent: {
      text: "text-cyan-600",
      lightText: "text-cyan-300",
      border: "border-cyan-200",
      bg: "bg-cyan-50",
      button: "from-cyan-500 to-teal-600",
      glow:
        "radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.24),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.18),transparent_34%)",
    },
    challenge:
      "Smart infrastructure providers must manage connected systems, IoT, OT, data flows and security obligations across complex operational environments.",
    support:
      "SNZ helps providers assess connected infrastructure risk, align with regulatory expectations, improve security assurance and create practical compliance programmes.",
    outcomes: [
      "Improved infrastructure compliance readiness",
      "Better visibility of connected system risk",
      "Stronger OT and IoT assurance",
      "More resilient smart infrastructure delivery",
    ],
    cta: "Assess Infrastructure Readiness",
  },
];

const regulations = [
  {
    title: "PSTI Act",
    text: "UK security requirements for consumer connectable products.",
    badge: "UK",
    colour: "from-fuchsia-500 to-violet-700",
    image: "/psti-act-bg.png",
    link: "https://www.smartregulations.co.uk/psti",
  },
  {
    title: "Cyber Resilience Act",
    text: "EU cyber requirements for digital products and services.",
    badge: "EU",
    colour: "from-blue-500 to-cyan-600",
    image: "/cyber-resilience-act-bg.png",
    link: "https://www.smartregulations.co.uk/eu-cyber-resilience-act",
  },
  {
    title: "Radio Equipment Directive",
    text: "Cyber security requirements for connected radio equipment.",
    icon: Radio,
    colour: "from-teal-400 to-cyan-600",
    image: "/radio-equipment-directive-bg.png",
    link: "https://www.smartregulations.co.uk/radio-equipment-directive",
  },
];

const advisoryServices = [
  {
    title: "Compliance Gap Analysis",
    text: "Identify compliance gaps across regulations, standards and market requirements.",
    icon: ShieldCheck,
    colour: "text-emerald-600",
    image:
      "linear-gradient(180deg,rgba(255,255,255,0),rgba(6,17,46,.08)),url('/compliance-gap-analysis-bg.png')",
  },
  {
    title: "Compliance Planning & Assessments",
    text: "Develop compliance roadmaps and assess conformity to relevant regulations and standards.",
    icon: ClipboardCheck,
    colour: "text-teal-600",
    image:
      "linear-gradient(180deg,rgba(255,255,255,0),rgba(6,17,46,.08)),url('/compliance-planning-bg.png')",
  },
  {
    title: "Compliance Insight & Training",
    text: "Build in-house capability with expert training, workshops and practical guidance.",
    icon: GraduationCap,
    colour: "text-sky-600",
    image:
      "linear-gradient(180deg,rgba(255,255,255,0),rgba(6,17,46,.08)),url('/compliance-insight-training-bg.png')",
  },
  {
    title: "Product Compliance Testing",
    text: "Technical testing and evidence generation to demonstrate regulatory compliance.",
    icon: FlaskConical,
    colour: "text-violet-600",
    image:
      "linear-gradient(180deg,rgba(255,255,255,0),rgba(6,17,46,.08)),url('/product-compliance-testing-bg.png')",
  },
];

const advisoryServiceDetails = {
  "Compliance Gap Analysis": {
    provides:
      "A structured review of your connected products, systems, documentation and current compliance position against relevant regulations and standards.",
    benefit:
      "You receive a clear view of compliance gaps, risk areas and practical actions needed before launch, procurement or wider deployment.",
    highlights: [
      "Review against applicable regulations",
      "Clear gap report and recommendations",
      "Prioritised action plan",
      "Evidence requirements identified",
    ],
  },
  "Compliance Planning & Assessments": {
    provides:
      "A tailored compliance roadmap with assessments, milestones and evidence requirements for your products or smart infrastructure solutions.",
    benefit:
      "You can move forward with a controlled plan, reducing uncertainty, avoiding rework and improving confidence with customers and partners.",
    highlights: [
      "Compliance roadmap",
      "Assessment against requirements",
      "Defined roles and actions",
      "Support for market readiness",
    ],
  },
  "Compliance Insight & Training": {
    provides:
      "Focused briefings, workshops and practical training to help your teams understand regulatory obligations and how they apply.",
    benefit:
      "Your teams become more confident and consistent when designing, procuring, deploying or managing connected products and systems.",
    highlights: [
      "Executive briefings",
      "Team workshops",
      "Plain-English regulatory guidance",
      "Training tailored to your market",
    ],
  },
  "Product Compliance Testing": {
    provides:
      "Technical review, testing coordination and evidence gathering to support conformity, product security and connected device compliance.",
    benefit:
      "You can demonstrate that your product has been assessed, tested and supported with suitable evidence before launch or deployment.",
    highlights: [
      "Product security testing support",
      "Evidence pack preparation",
      "Technical documentation review",
      "Support for assurance decisions",
    ],
  },
};

const approach = [
  {
    number: "1.",
    title: "Assess",
    text: "Understand your products, risks and regulatory obligations.",
    icon: Search,
  },
  {
    number: "2.",
    title: "Plan",
    text: "Create a tailored compliance plan and define the evidence required.",
    icon: ClipboardCheck,
  },
  {
    number: "3.",
    title: "Assure",
    text: "Implement controls, test and document to achieve conformity.",
    icon: ShieldCheck,
  },
  {
    number: "4.",
    title: "Monitor",
    text: "Stay compliant with ongoing monitoring, updates and regulatory change tracking.",
    icon: MonitorCheck,
  },
];

function Hero({ openEnquiryForm }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_30%,rgba(20,184,166,.32),transparent_24%),radial-gradient(circle_at_88%_58%,rgba(6,182,212,.20),transparent_30%),linear-gradient(120deg,#06112e_0%,#071936_48%,#020817_100%)]" />

      <div className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover bg-center opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(6,17,46,0.98) 0%,rgba(6,17,46,0.88) 30%,rgba(6,17,46,0.34) 66%,rgba(6,17,46,0.06) 100%),url('/smart-regulations-hero-bg.png')",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 pt-36 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-32 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-teal-300" />
            A Smart Net Zero service
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Smart Regulations
            <br />& Compliance
          </h1>

          <div className="mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-lime-300" />

          <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-white/88">
            Connected device compliance advisory for smart infrastructure, IoT
            and OT environments.
          </p>

          <p className="mt-3 max-w-xl leading-7 text-white/72">
            Expert guidance to help manufacturers, suppliers, distributors and
            end users design, deliver and operate compliant, secure and
            future-ready connected products and systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 font-black shadow-xl transition hover:scale-[1.02]"
            >
              Explore Services <ArrowRight className="ml-2 inline h-5 w-5" />
            </a>

            <a
              href="https://www.smartregulations.co.uk"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-2xl border border-teal-300/45 bg-white/5 px-7 py-4 font-black backdrop-blur transition hover:bg-white/10"
            >
              Visit smartregulations.co.uk{" "}
              <ArrowRight className="ml-2 inline h-5 w-5" />
            </a>
          </div>          
        </motion.div>

        <div className="hidden min-h-[560px] lg:block" />
      </div>
    </section>
  );
}

function AudienceModal({ audience, onClose, openEnquiryForm }) {
  if (!audience) return null;

  const Icon = audience.icon;
  const accent = audience.accent || {
    text: "text-teal-600",
    lightText: "text-teal-300",
    border: "border-teal-200",
    bg: "bg-teal-50",
    button: "from-pink-600 to-violet-700",
    glow:
      "radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.20),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.16),transparent_34%)",
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto bg-slate-950/75 px-4 pb-6 pt-28 backdrop-blur-sm sm:pb-10 sm:pt-32">
      <div className="relative my-0 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl sm:my-0">
        <div className="relative overflow-hidden bg-[#06112e] p-7 text-white md:p-8">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: accent.glow,
            }}
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 rounded-full border border-white/15 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label="Close audience details"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10">
            <span
              className={`grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${audience.colour} text-white shadow-lg`}
            >
              <Icon className="h-10 w-10" />
            </span>

            <p
              className={`mt-6 text-sm font-black uppercase tracking-[0.18em] ${accent.lightText}`}
            >
              Audience guidance
            </p>

            <h3 className="mt-2 pr-12 text-4xl font-black leading-tight">
              {audience.title}
            </h3>

            <p className="mt-4 max-w-2xl text-white/76">
              {audience.text}
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="text-lg font-black text-slate-950">
              Typical challenge
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {audience.challenge}
            </p>
          </section>

          <section className={`rounded-2xl border ${accent.border} ${accent.bg} p-5`}>
            <h4 className="text-lg font-black text-slate-950">
              How SNZ helps
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {audience.support}
            </p>
          </section>
        </div>

        <div className="px-6 pb-8 md:px-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h4 className="text-lg font-black text-slate-950">
              Useful outcomes
            </h4>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {audience.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className={`flex gap-3 rounded-xl ${accent.bg} p-3`}
                >
                  <CheckCircle2
                    className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`}
                  />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-6 py-3 font-black text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>

            <button
              type="button"
              onClick={openEnquiryForm}
              className={`inline-flex items-center rounded-2xl bg-gradient-to-r ${accent.button} px-6 py-3 font-black text-white shadow-lg transition hover:scale-[1.02]`}
            >
              {audience.cta} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceSection({ openEnquiryForm }) {
  const [selectedAudience, setSelectedAudience] = useState(null);

  return (
    <section className="relative z-20 -mt-20 bg-transparent px-5 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-0 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/10 md:grid-cols-3">
        {audienceCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedAudience(item)}
              className={`group flex cursor-pointer items-center gap-5 border-slate-200 p-7 text-left transition hover:-translate-y-1 hover:bg-slate-50 ${
                index > 0 ? "md:border-l" : ""
              }`}
            >
              <span
                className={`grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br ${item.colour} text-white transition group-hover:scale-105`}
              >
                <Icon className="h-10 w-10" />
              </span>

              <div>
                <h3 className="text-xl font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>

                <p className="mt-3 inline-flex items-center text-sm font-black text-teal-700">
                  View relevant support <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>

              <ArrowRight className="ml-auto h-6 w-6 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-600" />
            </button>
          );
        })}
      </div>

      <AudienceModal
        audience={selectedAudience}
        onClose={() => setSelectedAudience(null)}
        openEnquiryForm={openEnquiryForm}
      />
    </section>
  );
}

function RegulationsSection() {
  return (
    <section className="bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black text-slate-950">
          Key Regulations We Help You Navigate
        </h2>

        <div className="mt-6 grid gap-7 md:grid-cols-3">
          {regulations.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="relative min-h-[150px] overflow-hidden rounded-2xl bg-[#06112e] bg-cover bg-center p-6 text-white shadow-xl shadow-slate-900/10"
                style={{
                  backgroundImage: item.image
                    ? `linear-gradient(90deg, rgba(6,17,46,0.50) 0%, rgba(6,17,46,0.72) 48%, rgba(6,17,46,0.36) 100%), url('${item.image}')`
                    : undefined,
                }}
              >
                {!item.image && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_64%,rgba(45,212,191,.34),transparent_28%)]" />
                    <div className="absolute bottom-0 right-0 h-24 w-48 bg-[linear-gradient(135deg,transparent,rgba(45,212,191,.20))]" />
                  </>
                )}

                <div className="relative z-10 flex gap-5">
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-teal-300/30 bg-teal-400/10 text-3xl font-black">
                    {Icon ? (
                      <Icon className="h-10 w-10 text-cyan-300" />
                    ) : (
                      item.badge
                    )}
                  </span>

                  <div>
                    <h3 className="text-xl font-black">{item.title}</h3>
                    <p className="mt-2 min-h-[52px] text-sm leading-6 text-white/74">
                      {item.text}
                    </p>

                    <a
                      href={item.link || "#"}
                      target={item.link ? "_blank" : undefined}
                      rel={item.link ? "noreferrer" : undefined}
                      className="mt-4 inline-flex cursor-pointer items-center text-sm font-black text-teal-300"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdvisoryServiceModal({ serviceTitle, onClose }) {
  if (!serviceTitle) return null;

  const details = advisoryServiceDetails[serviceTitle] || {
    provides: "Further service details will be added here.",
    benefit: "Customer benefits will be added here.",
    highlights: [
      "Practical support",
      "Clear guidance",
      "Actionable recommendations",
    ],
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="relative bg-[#06112e] p-7 text-white md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label="Close service details"
          >
            <X className="h-5 w-5" />
          </button>

          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-300">
            Advisory Service
          </p>

          <h3 className="mt-2 pr-12 text-3xl font-black leading-tight">
            {serviceTitle}
          </h3>

          <p className="mt-3 max-w-2xl text-white/72">
            Practical support to help your organisation understand, plan and
            evidence compliance.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="text-lg font-black text-slate-950">
                What this provides
              </h4>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {details.provides}
              </p>
            </section>

            <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
              <h4 className="text-lg font-black text-slate-950">
                Customer benefit
              </h4>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {details.benefit}
              </p>
            </section>
          </div>

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
            <h4 className="text-lg font-black text-slate-950">
              Key highlights
            </h4>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {details.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 flex justify-end border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-6 py-3 font-black text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvisoryServicesSection() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState(null);

  return (
    <section id="services" className="bg-white px-5 pb-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black text-slate-950">
          Advisory Services
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {advisoryServices.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-1 flex-col p-6 pb-4">
                  <Icon className={`h-10 w-10 ${item.colour}`} />

                  <h3 className="mt-4 min-h-[56px] text-xl font-black leading-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedServiceTitle(item.title)}
                    className="mt-auto inline-flex cursor-pointer items-center text-sm font-black text-teal-700"
                  >
                    Find out more <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                <div className="h-32 shrink-0 overflow-hidden">
                  <div
                    className={`h-full w-full bg-cover ${
                      item.title === "Compliance Gap Analysis"
                        ? "scale-150 bg-[center_75%]"
                        : "bg-center"
                    }`}
                    style={{
                      backgroundImage: item.image,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AdvisoryServiceModal
        serviceTitle={selectedServiceTitle}
        onClose={() => setSelectedServiceTitle(null)}
      />
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="bg-white px-5 py-4 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] p-7 text-white shadow-xl">
        <h2 className="text-center text-3xl font-black">
          Our 4-Step Compliance Approach
        </h2>

        <div className="mt-7 grid gap-5 lg:grid-cols-4">
          {approach.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="relative flex items-center gap-4">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-teal-300/30 bg-teal-400/10">
                  <Icon className="h-10 w-10 text-teal-300" />
                </span>

                <div>
                  <h3 className="text-lg font-black">
                    {item.number} {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {item.text}
                  </p>
                </div>

                {index < approach.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-7 w-7 -translate-y-1/2 text-white/55 lg:block" />
                )}
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
    <section id="contact" className="bg-white px-5 pb-14 pt-4 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl p-8 text-white shadow-2xl md:p-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,17,46,0.96) 0%, rgba(6,17,46,0.86) 42%, rgba(6,182,212,0.30) 100%), url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <span className="grid h-28 w-28 place-items-center rounded-full border border-cyan-300/30 bg-cyan-400/10">
            <ShieldCheck className="h-16 w-16 text-cyan-200" />
          </span>

          <div>
            <h2 className="text-3xl font-black leading-tight">
              Build compliant, resilient smart infrastructure with confidence
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              We help organisations meet today’s and tomorrow’s connected device
              regulations.
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

export default function SmartRegulations({ goToPage, openEnquiryForm }) {

    useEffect(() => {
    document.title = "Smart Regulations & Compliance | Smart Net Zero";
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SmartRegulations"
      />

      <main>
        <Hero openEnquiryForm={openEnquiryForm} />
        <AudienceSection openEnquiryForm={openEnquiryForm} />
        <RegulationsSection />
        <AdvisoryServicesSection />
        <ApproachSection />
        <CTASection openEnquiryForm={openEnquiryForm} />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}