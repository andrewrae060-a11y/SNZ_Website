import {useEffect} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Binary,
  Boxes,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CloudCog,
  Code2,
  FileCheck2,
  FileSearch,
  FlaskConical,
  Gauge,
  Globe2,
  KeyRound,
  Laptop,
  LifeBuoy,
  ListChecks,
  Network,
  PackageCheck,
  Radio,
  RefreshCw,
  ScanSearch,
  Scale,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TestTube2,
  Wrench,
} from "lucide-react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";

const regulations = [
  {
    title: "Cyber Resilience Act",
    shortTitle: "CRA",
    region: "European Union",
    icon: ShieldCheck,
    colour: "from-violet-500 to-fuchsia-600",
    accent: "text-violet-600",
    border: "border-violet-200",
    background: "bg-violet-50",
    text:
      "Support for products with digital elements, including cybersecurity risk assessment, secure development, vulnerability handling and technical documentation.",
    points: [
      "Product cybersecurity risk assessment",
      "Security-by-design evidence",
      "Vulnerability handling processes",
      "Technical documentation support",
    ],
  },
  {
    title: "Product Security and Telecommunications Infrastructure",
    shortTitle: "PSTI",
    region: "United Kingdom",
    icon: Smartphone,
    colour: "from-emerald-500 to-teal-600",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    background: "bg-emerald-50",
    text:
      "Testing and evidence support for UK consumer connectable product security requirements and associated manufacturer duties.",
    points: [
      "Consumer connectable products",
      "Password and access-control review",
      "Vulnerability disclosure requirements",
      "Statement-of-compliance evidence",
    ],
  },
  {
    title: "Radio Equipment Cybersecurity",
    shortTitle: "RED",
    region: "European Union",
    icon: Radio,
    colour: "from-sky-500 to-cyan-600",
    accent: "text-sky-600",
    border: "border-sky-200",
    background: "bg-sky-50",
    text:
      "Cybersecurity assessment support for connected radio equipment, including relevant requirements and applicable technical standards.",
    points: [
      "Connected radio equipment",
      "Network protection",
      "Privacy and personal-data protection",
      "Fraud and misuse controls",
    ],
  },
];

const testingServices = [
  {
    title: "Product Security Assessment",
    text:
      "Structured assessment of the product, its interfaces, architecture, trust boundaries and intended operating environment.",
    icon: ScanSearch,
    colour: "text-teal-600",
    background: "bg-teal-50",
    checks: [
      "Product scope and architecture",
      "Threat and attack-surface review",
      "Security-control assessment",
    ],
  },
  {
    title: "Penetration Testing",
    text:
      "Evidence-led testing of devices, applications, APIs and supporting services to identify exploitable weaknesses.",
    icon: ShieldCheck,
    colour: "text-violet-600",
    background: "bg-violet-50",
    checks: [
      "Device and interface testing",
      "Application and API testing",
      "Exploitation and impact analysis",
    ],
  },
  {
    title: "Protocol & Interface Testing",
    text:
      "Testing of wireless, network and application protocols used by connected products and digital services.",
    icon: Network,
    colour: "text-sky-600",
    background: "bg-sky-50",
    checks: [
      "Wireless interfaces",
      "Network protocols",
      "Input and message handling",
    ],
  },
  {
    title: "Authentication & Access Control",
    text:
      "Review and testing of identity, credential, privilege and access-control mechanisms across the product ecosystem.",
    icon: KeyRound,
    colour: "text-amber-600",
    background: "bg-amber-50",
    checks: [
      "Authentication mechanisms",
      "Credential management",
      "Privilege separation",
    ],
  },
  {
    title: "Software & Firmware Review",
    text:
      "Review of software components, firmware behaviour, dependencies and update mechanisms for security weaknesses.",
    icon: Code2,
    colour: "text-fuchsia-600",
    background: "bg-fuchsia-50",
    checks: [
      "Firmware and software components",
      "Third-party dependencies",
      "Secure update mechanisms",
    ],
  },
  {
    title: "Cloud & Mobile Ecosystem Testing",
    text:
      "Assessment of cloud services, mobile applications and remote management functions supporting the connected product.",
    icon: CloudCog,
    colour: "text-cyan-600",
    background: "bg-cyan-50",
    checks: [
      "Cloud-service configuration",
      "Mobile application security",
      "Remote management functions",
    ],
  },
  {
    title: "Vulnerability Handling Review",
    text:
      "Assessment of vulnerability reporting, triage, remediation, disclosure and security-update arrangements.",
    icon: LifeBuoy,
    colour: "text-rose-600",
    background: "bg-rose-50",
    checks: [
      "Disclosure policy",
      "Triage and remediation workflow",
      "Support-period arrangements",
    ],
  },
  {
    title: "Technical Evidence & Reporting",
    text:
      "Clear reporting, traceable test evidence and remediation guidance to support conformity and market-access decisions.",
    icon: FileCheck2,
    colour: "text-indigo-600",
    background: "bg-indigo-50",
    checks: [
      "Detailed findings report",
      "Traceable test evidence",
      "Remediation and retest record",
    ],
  },
];

const productTypes = [
  {
    title: "Consumer IoT",
    text: "Smart-home products, cameras, hubs, appliances and connected consumer devices.",
    icon: Smartphone,
  },
  {
    title: "Industrial & OT Products",
    text: "Controllers, gateways, industrial devices and products used in operational environments.",
    icon: ServerCog,
  },
  {
    title: "Embedded Systems",
    text: "Firmware-led devices, modules, components and embedded digital functionality.",
    icon: Binary,
  },
  {
    title: "Software Products",
    text: "Applications, platforms and software products with digital or network connectivity.",
    icon: Laptop,
  },
  {
    title: "Cloud-Connected Products",
    text: "Products relying on cloud services, remote APIs, portals and managed digital services.",
    icon: CloudCog,
  },
  {
    title: "Radio Equipment",
    text: "Wi-Fi, Bluetooth, cellular and other connected products incorporating radio functionality.",
    icon: Radio,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Scope",
    text:
      "Define the product, variants, interfaces, target markets and applicable regulatory requirements.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Prepare",
    text:
      "Review architecture, product documentation, test samples and available security evidence.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Test",
    text:
      "Perform proportionate technical testing against the agreed requirements and test plan.",
    icon: FlaskConical,
  },
  {
    number: "04",
    title: "Report",
    text:
      "Provide clear findings, evidence, risk context and prioritised remediation recommendations.",
    icon: FileCheck2,
  },
  {
    number: "05",
    title: "Remediate & Retest",
    text:
      "Support corrective action and verify that identified issues have been addressed effectively.",
    icon: RefreshCw,
  },
];

const deliverables = [
  {
    title: "Testing scope and plan",
    text:
      "A defined assessment boundary covering products, interfaces, standards and agreed test activities.",
    icon: ListChecks,
  },
  {
    title: "Technical findings report",
    text:
      "Clear findings with evidence, severity, affected components and practical remediation guidance.",
    icon: FileSearch,
  },
  {
    title: "Compliance evidence mapping",
    text:
      "Traceability between test activity, findings, product controls and relevant regulatory requirements.",
    icon: ClipboardCheck,
  },
  {
    title: "Remediation support",
    text:
      "Technical guidance to help product, engineering and compliance teams address identified weaknesses.",
    icon: Wrench,
  },
  {
    title: "Retest confirmation",
    text:
      "Verification that corrective actions have been implemented and previously identified issues resolved.",
    icon: BadgeCheck,
  },
  {
    title: "Market-readiness insight",
    text:
      "A clearer understanding of remaining risks, evidence gaps and next steps before conformity assessment.",
    icon: Globe2,
  },
];

const benefits = [
  {
    title: "Earlier risk discovery",
    text:
      "Identify weaknesses before market launch, formal assessment or large-scale deployment.",
    icon: ScanSearch,
  },
  {
    title: "Stronger technical evidence",
    text:
      "Build a traceable body of evidence to support compliance and assurance decisions.",
    icon: FileCheck2,
  },
  {
    title: "Reduced rework",
    text:
      "Address security and documentation gaps before they become costly delivery blockers.",
    icon: Gauge,
  },
  {
    title: "Better market readiness",
    text:
      "Prepare products and teams for UK and EU cybersecurity obligations with greater confidence.",
    icon: PackageCheck,
  },
];

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "centre",
}) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>

      {text && (
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {text}
        </p>
      )}
    </div>
  );
}

function Hero({
  goToPage,
  openEnquiryForm,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_28%,rgba(6,182,212,.28),transparent_26%),radial-gradient(circle_at_88%_62%,rgba(45,212,191,.18),transparent_30%),linear-gradient(120deg,#06112e_0%,#071936_48%,#020817_100%)]" />

      <div className="absolute inset-0 -z-20">
        <div
            className="h-full w-full bg-cover bg-center"
            style={{
            backgroundImage:
                "linear-gradient(90deg, rgba(6,17,46,0.99) 0%, rgba(6,17,46,0.94) 34%, rgba(6,17,46,0.58) 62%, rgba(6,17,46,0.16) 100%), url('/lab-testing-product-compliance-hero-bg.png')",
            backgroundPosition: "center right",
            }}
        />
        </div>

      <div className="absolute inset-0 -z-10 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 pt-24 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:pb-32 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-20"
        >
          <button
            type="button"
            onClick={() => goToPage?.("SmartRegulations")}
            className="group inline-flex items-center gap-3 rounded-2xl border border-violet-300/25 bg-violet-300/10 px-4 py-3 text-left text-sm font-bold text-violet-100 backdrop-blur transition hover:border-violet-300/50 hover:bg-violet-300/15"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-300/30 bg-violet-300/10">
              <Scale className="h-5 w-5 text-violet-200" />
            </span>

            <span>
              <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-violet-200/70">
                Connected service
              </span>
              <span className="mt-0.5 block">
                Smart Regulations & Compliance
              </span>
            </span>

            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>

          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            Lab Testing
            <br />
            <span className="bg-gradient-to-r from-teal-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              & Product Compliance
            </span>
          </h1>

          <div className="mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-lime-300" />

          <p className="mt-7 max-w-2xl text-xl font-bold leading-8 text-white/92">
            Independent, evidence-led cybersecurity testing for connected
            products and products with digital elements.
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-white/70">
            Identify security weaknesses, validate product controls and develop
            the technical evidence needed to support UK and EU cybersecurity
            compliance and market-readiness decisions.
          </p>

        <div className="mt-9">
        <button
            type="button"
            onClick={() => {
            const testingSection =
                document.getElementById("testing-services");

            testingSection?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            }}
            className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 font-black text-white shadow-xl shadow-violet-950/25 transition hover:scale-[1.02]"
        >
            Explore Testing Services
            <ArrowRight className="ml-2 h-5 w-5" />
        </button>
        </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Product security",
                icon: ShieldCheck,
              },
              {
                label: "Technical testing",
                icon: TestTube2,
              },
              {
                label: "Compliance evidence",
                icon: FileCheck2,
              },
              {
                label: "Market readiness",
                icon: Globe2,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-300/10 text-teal-200">
                    <Icon className="h-5 w-5" />
                  </span>

                  <p className="text-xs font-black leading-5 text-white/78">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="hidden min-h-[560px] lg:block" />
      </div>

      <div className="absolute -bottom-px left-0 right-0 h-12 bg-white [clip-path:polygon(0_78%,100%_0,100%_100%,0_100%)]" />
    </section>
  );
}

function RegulationsSection() {
  return (
    <section className="bg-white px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Regulatory coverage"
          title="Supporting compliance with key product cybersecurity requirements"
          text="We help determine the applicable requirements, define a proportionate testing scope and develop evidence that supports your wider conformity process."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {regulations.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.shortTitle}
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border ${item.border} bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <div
                  className={`h-2 bg-gradient-to-r ${item.colour}`}
                />

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl ${item.background} ${item.accent}`}
                    >
                      <Icon className="h-7 w-7" />
                    </span>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      {item.region}
                    </span>
                  </div>

                  <p
                    className={`mt-6 text-xs font-black uppercase tracking-[0.16em] ${item.accent}`}
                  >
                    {item.shortTitle}
                  </p>

                  <h3 className="mt-2 text-xl font-black leading-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className={`flex gap-3 rounded-xl ${item.background} p-3`}
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${item.accent}`}
                        />
                        <p className="text-sm font-semibold leading-5 text-slate-700">
                          {point}
                        </p>
                      </div>
                    ))}
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

function TestingServicesSection() {
  return (
    <section
        id="testing-services"
        className="scroll-mt-28 bg-slate-50 px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testing and assurance"
          title="Technical testing across the connected-product ecosystem"
          text="Our assessment scope can cover the physical product, embedded software, communications, applications, cloud services and the processes used to maintain security after release."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testingServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl ${service.background} ${service.colour}`}
                >
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-xl font-black leading-tight text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.text}
                </p>

                <div className="mt-5 grid gap-2 border-t border-slate-100 pt-5">
                  {service.checks.map((check) => (
                    <div
                      key={check}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      <p className="text-xs font-semibold leading-5 text-slate-600">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductTypesSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Products we support"
              title="From consumer IoT to industrial and software products"
              text="Testing is tailored to the product’s functionality, architecture, interfaces, risk profile, intended use and target market."
            />

            <div className="mt-7 rounded-3xl bg-[#06112e] p-7 text-white shadow-xl">
              <Boxes className="h-10 w-10 text-teal-300" />

              <h3 className="mt-5 text-2xl font-black">
                One product, one connected ecosystem
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/70">
                Product cybersecurity is rarely limited to the physical
                device. A useful assessment considers firmware, mobile
                applications, APIs, cloud services, update mechanisms and
                operational support together.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {productTypes.map((product) => {
              const Icon = product.icon;

              return (
                <article
                  key={product.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon className="h-6 w-6" />
                  </span>

                  <div>
                    <h3 className="font-black text-slate-950">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {product.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-white px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] p-7 text-white shadow-2xl md:p-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-300">
            How engagement works
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-white md:text-4xl">
            A clear route from scope to evidence
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
            Testing is planned around your product, obligations, delivery stage
            and the assurance evidence you need.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-4xl font-black leading-none text-teal-300">
                    {step.number}
                  </span>

                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-300/10 text-teal-200">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-black text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/68">
                  {step.text}
                </p>

                {index < processSteps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-teal-300/55 lg:block" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section className="bg-slate-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Outputs"
          title="Clear evidence for engineering, compliance and decision-makers"
          text="Outputs are designed to help technical teams resolve weaknesses while giving compliance and leadership teams a clear view of readiness and residual risk."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <h3 className="font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why test early"
          title="Turn product security into practical market readiness"
          text="Testing earlier in the product lifecycle helps teams address weaknesses, documentation gaps and assurance risks before they delay launch or conformity activity."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="text-center"
              >
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-teal-200 bg-teal-50 text-teal-700">
                  <Icon className="h-9 w-9" />
                </span>

                <h3 className="mt-5 text-lg font-black text-slate-950">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StandardsStrip() {
  const standards = [
    "ETSI EN 303 645",
    "EN 18031",
    "Secure-by-design principles",
    "Vulnerability handling",
    "Technical evidence",
  ];

  return (
    <section className="bg-white px-5 pb-8 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-cyan-50 p-7 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#06112e] text-teal-300">
            <BadgeCheck className="h-8 w-8" />
          </span>

          <div>
            <h2 className="text-xl font-black text-slate-950">
              Standards-informed and evidence-led
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              The exact assessment basis is agreed during scoping and aligned
              to the product, market, applicable legislation and relevant
              technical standards.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {standards.map((standard) => (
                <span
                  key={standard}
                  className="rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-black text-teal-800"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({
  goToPage,
  openEnquiryForm,
}) {
  return (
    <section className="bg-white px-5 pb-16 pt-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06112e] p-8 text-white shadow-2xl md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_40%,rgba(6,182,212,.30),transparent_28%),radial-gradient(circle_at_68%_100%,rgba(139,92,246,.20),transparent_34%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="grid h-24 w-24 place-items-center rounded-full border border-teal-300/30 bg-teal-300/10">
            <FlaskConical className="h-12 w-12 text-teal-200" />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-300">
              Plan your assessment
            </p>

            <h2 className="mt-2 text-3xl font-black leading-tight">
              Ready to test your product with confidence?
            </h2>

            <p className="mt-3 max-w-2xl text-white/70">
              Discuss your product, target markets and assurance requirements
              with our connected-product compliance team.
            </p>

           </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 font-black text-white shadow-xl transition hover:scale-[1.02]"
          >
            Talk to an Expert
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function LabTestingCompliance({
  goToPage,
  openEnquiryForm,
}) {

    useEffect(() => {
    document.title = "Lab Testing & Compliance | Smart Net Zero";
    }, []);
  
    return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="LabTestingCompliance"
      />

      <main>
        <Hero
          goToPage={goToPage}
          openEnquiryForm={openEnquiryForm}
        />

        <RegulationsSection />
        <TestingServicesSection />
        <ProductTypesSection />
        <ProcessSection />
        <DeliverablesSection />
        <BenefitsSection />
        <StandardsStrip />

        <CTASection
          goToPage={goToPage}
          openEnquiryForm={openEnquiryForm}
        />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}