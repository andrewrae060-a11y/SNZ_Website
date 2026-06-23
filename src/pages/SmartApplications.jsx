import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Coins,
  FileCheck2,
  Layers3,
  Leaf,
  LockKeyhole,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";

/* -------------------------------------------------------------------------- */
/*                                PRODUCT DATA                                */
/* -------------------------------------------------------------------------- */

const products = [
  {
    id: "smart-decarb-360",
    name: "SmartDecarb360",
    status: "Live",
    statusClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    accent: "from-pink-500 via-fuchsia-500 to-blue-600",
    borderClass: "border-pink-200",
    connectorClass: "bg-pink-400",
    iconBg: "bg-gradient-to-br from-pink-500 to-blue-600",
    icon: Leaf,
    logo: "/smartdecarb360-logo.png",
    image: "/smartdecarb360-application-bg.png",

    shortDescription:
      "Strategic decarbonisation planning, pathway optimisation and carbon performance management.",

    intro:
      "SmartDecarb360 is the first live application within the SmartX360 ecosystem. It helps organisations assess emissions, prioritise interventions and create an optimised pathway towards net zero.",

    included: [
      "Portfolio carbon and energy baselining",
      "Decarbonisation pathway modelling",
      "Measure prioritisation and sequencing",
      "Scenario comparison and investment planning",
      "Progress monitoring and executive reporting",
    ],

    benefits: [
      "Create an evidence-led net zero pathway",
      "Prioritise investment by cost and impact",
      "Improve visibility across buildings and assets",
      "Strengthen governance and decision-making",
    ],

    page: "SmartDecarb360",
    isLive: true,
  },

  {
    id: "smart-impact-360",
    name: "SmartImpact360",
    status: "Coming Soon",
    statusClass:
      "border-purple-200 bg-purple-50 text-purple-700",
    accent: "from-purple-700 via-violet-600 to-blue-600",
    borderClass: "border-purple-200",
    connectorClass: "bg-purple-500",
    iconBg: "bg-purple-700",
    icon: BarChart3,

    logo: "/smartimpact360-logo.png",
    image: "/smartimpact360-application-bg.png",

    shortDescription:
      "Measure, track and communicate ESG, sustainability and wider organisational impact.",

    intro:
      "SmartImpact360 is being developed as an intelligent impact-management platform that brings ESG, sustainability and social-value performance into one connected environment.",

    included: [
      "ESG and sustainability performance dashboard",
      "Environmental and social impact metrics",
      "Impact mapping by programme and location",
      "Framework and SDG alignment",
      "Executive and stakeholder reporting",
    ],

    benefits: [
      "Bring impact data into one platform",
      "Improve reporting transparency",
      "Track outcomes against strategic goals",
      "Communicate impact clearly",
    ],
  },

  {
    id: "smart-discovery-360",
    name: "SmartDiscovery360",
    status: "Coming Soon",
    statusClass:
      "border-cyan-200 bg-cyan-50 text-cyan-700",
    accent: "from-teal-500 via-cyan-500 to-blue-600",
    borderClass: "border-cyan-200",
    connectorClass: "bg-cyan-500",
    iconBg: "bg-teal-600",
    icon: Search,

    logo: "/smartdiscovery360-logo.png",
    image: "/smartdiscovery360-application-bg.png",

    shortDescription:
      "Discover, classify and contextualise assets, devices, data and emissions sources.",

    intro:
      "SmartDiscovery360 will help organisations build a clearer picture of connected infrastructure, operational assets, data sources and emissions-generating activities.",

    included: [
      "Automated asset and device discovery",
      "Site, system and equipment classification",
      "Data and emissions-source mapping",
      "Infrastructure relationship mapping",
      "Risk and opportunity insights",
    ],

    benefits: [
      "Improve asset and data visibility",
      "Reduce manual discovery effort",
      "Build a stronger evidence base",
      "Support resilience and sustainability programmes",
    ],
  },

  {
    id: "smart-finance-360",
    name: "SmartFinance360",
    status: "Coming Soon",
    statusClass:
      "border-green-200 bg-green-50 text-green-700",
    accent: "from-green-700 via-emerald-600 to-blue-600",
    borderClass: "border-green-200",
    connectorClass: "bg-green-500",
    iconBg: "bg-green-700",
    icon: Coins,

    logo: "/smartfinance360-logo.png",
    image: "/smartfinance360-application-bg.png",

    shortDescription:
      "Finance, risk and carbon accounting for better capital and operational decisions.",

    intro:
      "SmartFinance360 is planned as an intelligent capital-planning platform combining financial performance, sustainability outcomes and infrastructure risk.",

    included: [
      "Capital and operational cost planning",
      "Portfolio investment prioritisation",
      "Carbon and avoided-emissions accounting",
      "Financial scenario modelling",
      "Benefits and investment tracking",
    ],

    benefits: [
      "Connect finance with sustainability outcomes",
      "Strengthen investment business cases",
      "Compare capital options consistently",
      "Improve portfolio decision-making",
    ],
  },

  {
    id: "smart-compliance-360",
    name: "SmartCompliance360",
    status: "Coming Soon",
    statusClass:
      "border-blue-200 bg-blue-50 text-blue-700",
    accent: "from-blue-700 via-indigo-600 to-cyan-600",
    borderClass: "border-blue-200",
    connectorClass: "bg-blue-500",
    iconBg: "bg-blue-700",
    icon: FileCheck2,

    logo: "/smartcompliance360-logo.png",
    image: "/smartcompliance360-application-bg.png",

    shortDescription:
      "Compliance, governance, assurance and reporting made simpler and more connected.",

    intro:
      "SmartCompliance360 will provide a structured environment for managing requirements, evidence, controls and assurance across connected infrastructure programmes.",

    included: [
      "Requirement and obligation management",
      "Control and evidence mapping",
      "Compliance-status dashboards",
      "Audit and assurance workflows",
      "Executive and regulatory reporting",
    ],

    benefits: [
      "Create a single view of compliance",
      "Reduce fragmented evidence management",
      "Improve audit readiness",
      "Support consistent governance",
    ],
  },

  {
    id: "ot-s-soc",
    name: "OT S-SOC",
    status: "Coming Soon",
    statusClass:
      "border-blue-200 bg-blue-50 text-blue-700",
    accent: "from-slate-900 via-blue-800 to-cyan-600",
    borderClass: "border-blue-200",
    connectorClass: "bg-blue-600",
    iconBg: "bg-blue-800",
    icon: ShieldCheck,

    logo: "/ot-s-soc-logo.png",
    image: "/ot-s-soc-application-bg.png",

    shortDescription:
      "A Sustainability and Security Operations Centre concept for operational environments.",

    intro:
      "OT S-SOC is the developing concept for converging operational-technology security, sustainability performance and infrastructure resilience within one operational model.",

    included: [
      "OT asset and event visibility",
      "Security and sustainability monitoring",
      "Operational risk intelligence",
      "Incident and exception management",
      "Resilience and assurance reporting",
    ],

    benefits: [
      "Connect sustainability and security operations",
      "Improve visibility of operational risk",
      "Support more resilient infrastructure",
      "Create one operating picture across OT estates",
    ],
  },
];

const valueCards = [
  {
    title: "Powerful Custom AI Decision Engine",
    text: "Smarter insights. Better outcomes.",
    icon: BrainCircuit,
    colour: "text-emerald-700",
    bg: "bg-emerald-50",
  },
    {
    title: "Real-time Intelligence & Insights",
    text: "Understanding context and complexity.",
    icon: Layers3,
    colour: "text-violet-700",
    bg: "bg-violet-50",
  },
  {
    title: "Safer & Secure Connected Infrastructure",
    text: "Operational security & resilience by design & demand.",
    icon: ShieldCheck,
    colour: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    title: "Security & Sustainability Convergence",
    text: "One ecosystem. Compound impact & risk mitigations.",
    icon: Leaf,
    colour: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    title: "Future-Ready Operations",
    text: "Built for the future. Adapt. Optimise. Lead.",
    icon: Rocket,
    colour: "text-indigo-700",
    bg: "bg-indigo-50",
  },
];

/* -------------------------------------------------------------------------- */
/*                              SHARED ELEMENTS                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({ product }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${product.statusClass}`}
    >
      {product.status}
    </span>
  );
}

function ProductLogo({
  product,
  className = "",
  imageClassName = "",
}) {
  const Icon = product.icon;

  return (
    <div
      className={`relative flex min-w-0 items-center ${className}`}
    >
      <img
        src={product.logo}
        alt={`${product.name} logo`}
        className={`block h-full max-h-full w-full object-contain object-left ${imageClassName}`}
        onError={(event) => {
          event.currentTarget.style.display = "none";

          const fallback =
            event.currentTarget.nextElementSibling;

          if (fallback) {
            fallback.classList.remove("hidden");
            fallback.classList.add("flex");
          }
        }}
      />

      <div className="hidden min-w-0 items-center gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${product.iconBg} text-white`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="truncate text-xl font-black text-slate-950">
          {product.name}
        </span>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
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

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function Hero({
  onExplorePathway,
  onEarlyAccess,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#03112b] text-white">
      {/* Hero background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(3,17,43,0.99) 0%, rgba(3,17,43,0.94) 34%, rgba(3,17,43,0.38) 64%, rgba(3,17,43,0.08) 100%), url('/smart-applications-hero-bg.png')",
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_69%_48%,rgba(0,153,255,.23),transparent_31%),radial-gradient(circle_at_75%_54%,rgba(217,70,239,.14),transparent_27%)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-24 lg:pt-28">
        {/* Left-hand content */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative z-10"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Intelligent infrastructure applications
          </p>

          <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            Smart Applications
            <br />

            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
              &amp; Digital Tools
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-xl font-bold leading-8 text-white/90">
            The global-first pathway to a{" "}
            <span className="text-cyan-300">
              safe
            </span>
            ,{" "}
            <span className="text-blue-300">
              secure
            </span>{" "}
            and{" "}
            <span className="text-lime-300">
              sustainable
            </span>{" "}
            future.
          </p>

          <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400" />

          <p className="mt-6 max-w-xl leading-7 text-white/70">
            Smart Net Zero is building a suite of intelligent
            infrastructure tools powered by the proprietary SmartX360
            intelligent infrastructure layer.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onExplorePathway}
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-xl transition hover:scale-[1.02]"
            >
              Explore the Vision
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onEarlyAccess}
              className="inline-flex items-center rounded-2xl border border-white/30 bg-white/5 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white/10"
            >
              Join Early Access
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            CONNECTED ECOSYSTEM                             */
/* -------------------------------------------------------------------------- */

function EcosystemProductCard({
  product,
  direction,
  onSelect,
}) {
  const connectorOnRight =
    direction === "right";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className={`group relative z-10 w-full rounded-3xl border ${product.borderClass} bg-white p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl`}
      >
        <div className="flex items-start gap-4">
          <ProductLogo
            product={product}
            className="h-14 min-w-0 flex-1"
            imageClassName="max-w-[260px]"
          />

          <StatusBadge product={product} />
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex justify-end">
          <span
            className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${product.accent} text-white transition group-hover:scale-110`}
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </button>

      <span
        className={`absolute top-1/2 z-0 hidden h-[2px] w-16 -translate-y-1/2 lg:block ${product.connectorClass} ${
          connectorOnRight
            ? "-right-16"
            : "-left-16"
        }`}
      />

      <span
        className={`absolute top-1/2 z-20 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white shadow lg:block ${product.connectorClass} ${
          connectorOnRight
            ? "-right-[70px]"
            : "-left-[70px]"
        }`}
      />
    </div>
  );
}

function ProductEcosystem({
  onSelectProduct,
}) {
  const decarb = products.find(
    (product) =>
      product.id === "smart-decarb-360"
  );

  const impact = products.find(
    (product) =>
      product.id === "smart-impact-360"
  );

  const discovery = products.find(
    (product) =>
      product.id === "smart-discovery-360"
  );

  const finance = products.find(
    (product) =>
      product.id === "smart-finance-360"
  );

  const ssoc = products.find(
    (product) =>
      product.id === "ot-s-soc"
  );

  return (
    <section className="overflow-hidden bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The ecosystem"
          title="The Smart Net Zero Product Ecosystem"
          text="SmartX360 provides the central intelligent infrastructure layer connecting decarbonisation, impact, asset discovery, finance, security and operational resilience."
        />

        <div className="relative mt-14">
          {/* Large connected ecosystem ring */}
          <div className="pointer-events-none absolute left-1/2 top-[43%] hidden h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-200 lg:block" />

          {/* Inner ring */}
          <div className="pointer-events-none absolute left-1/2 top-[43%] hidden h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100 lg:block" />

          {/* Soft glow behind SmartX360 */}
          <div className="pointer-events-none absolute left-1/2 top-[43%] hidden h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_320px_1fr] lg:items-center lg:gap-16">
            {/* Left-side products */}
            <div className="grid gap-10">
              <EcosystemProductCard
                product={decarb}
                direction="right"
                onSelect={onSelectProduct}
              />

              <EcosystemProductCard
                product={impact}
                direction="right"
                onSelect={onSelectProduct}
              />
            </div>

            {/* Central SmartX360 engine and OT S-SOC */}
            <div className="relative mx-auto flex w-full max-w-[320px] flex-col items-center">
              {/* Engine centred inside the circular rings */}
              <motion.div
                className="relative z-10 mt-10 w-full"
                animate={{
                  scale: [1, 1.025, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/smartx360-engine-centre.png"
                  alt="SmartX360 intelligent infrastructure layer"
                  className="mx-auto w-full max-w-[300px] object-contain drop-shadow-[0_18px_38px_rgba(37,99,235,0.24)]"
                />
              </motion.div>

              {/* Vertical connector from SmartX360 to OT S-SOC */}
              <div className="relative z-10 flex h-14 flex-col items-center">
                <span className="h-full w-[2px] bg-blue-500" />

                <span className="absolute top-0 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 shadow" />

                <span className="absolute bottom-0 h-3 w-3 translate-y-1/2 rounded-full border-2 border-white bg-blue-600 shadow" />
              </div>

              {/* OT S-SOC remains beneath the engine */}
            <button
            type="button"
            onClick={() => onSelectProduct(ssoc)}
            className="relative z-10 w-full rounded-2xl border border-blue-200 bg-white p-5 text-left shadow-md transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
            >
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                <p className="text-xl font-black text-slate-950">
                    OT S-SOC
                </p>

                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    Sustainability & Security Operations Centre
                </p>
                </div>

                <StatusBadge product={ssoc} />
            </div>
            </button>
            </div>

            {/* Right-side products aligned with the left-side products */}
            <div className="grid gap-10">
              <EcosystemProductCard
                product={discovery}
                direction="left"
                onSelect={onSelectProduct}
              />

              <EcosystemProductCard
                product={finance}
                direction="left"
                onSelect={onSelectProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                     CONVERGED INFRASTRUCTURE VISION                        */
/* -------------------------------------------------------------------------- */

function ConvergedVisionSection({
  onEarlyAccess,
}) {
  return (
    <section
      id="product-pathway"
      className="scroll-mt-28 bg-slate-50 px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The product vision"
          title="The pathway to converged intelligent infrastructure"
          text="The long-term vision brings decarbonisation, energy, security, resilience, finance, compliance, governance and AI-enabled operations into one connected suite."
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-12 overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-2xl shadow-blue-950/10 sm:p-5"
        >
          <img
            src="/converged-intelligent-infrastructure.png"
            alt="Converged Intelligent Infrastructure Suite"
            className="w-full rounded-[1.4rem] object-cover"
          />
        </motion.div>

        <div className="mt-8 flex flex-col items-center text-center">
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Organisations joining the early-access
            programme can help shape product priorities,
            test developing capabilities and contribute
            practical use cases to this roadmap.
          </p>

          <button
            type="button"
            onClick={onEarlyAccess}
            className="mt-6 inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-xl transition hover:scale-[1.02]"
          >
            Help Shape the Product Vision

            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                       INTELLIGENT APPLICATION CARDS                        */
/* -------------------------------------------------------------------------- */

function ApplicationImage({
  product,
  heightClass = "h-64",
}) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${heightClass}`}
    >
      <img
        src={product.image}
        alt={`${product.name} application preview`}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        onError={(event) => {
          event.currentTarget.style.display =
            "none";
        }}
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${product.accent} opacity-[0.08]`}
      />
    </div>
  );
}

function ApplicationCard({
  product,
  onSelect,
}) {
  const Icon = product.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(product)}
      whileHover={{
        y: -5,
      }}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border ${product.borderClass} bg-white text-left shadow-lg transition`}
    >
      <div className="p-5">
        {/* Product logo row */}
        <div className="flex min-h-[64px] items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center">
            <img
              src={product.logo}
              alt={`${product.name} logo`}
              className="block h-auto max-h-10 w-auto max-w-full object-contain object-left"
              onError={(event) => {
                console.error(
                  `Unable to load product logo: ${product.logo}`
                );

                event.currentTarget.style.display = "none";

                const fallback =
                  event.currentTarget.nextElementSibling;

                if (fallback) {
                  fallback.classList.remove("hidden");
                  fallback.classList.add("flex");
                }
              }}
            />

            {/* Fallback shown only when the logo cannot load */}
            <div className="hidden min-w-0 items-center gap-3">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${product.iconBg} text-white`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="text-xl font-black text-slate-950">
                {product.name}
              </span>
            </div>
          </div>

          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${product.accent} text-white transition group-hover:scale-110`}
          >
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-3">
          <StatusBadge product={product} />
        </div>

        <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
          {product.shortDescription}
        </p>
      </div>

      <ApplicationImage product={product} />
    </motion.button>
  );
}

function LiveApplicationCard({
  product,
  onSelect,
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(product)}
      whileHover={{
        y: -5,
      }}
      className={`group grid w-full overflow-hidden rounded-[2rem] border ${product.borderClass} bg-white text-left shadow-xl transition lg:grid-cols-[0.8fr_1.2fr]`}
    >
      <div className="flex flex-col justify-center p-7 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <ProductLogo
            product={product}
            className="h-16 min-w-[220px] max-w-md flex-1"
            imageClassName="max-w-[390px]"
          />

          <StatusBadge product={product} />
        </div>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
          {product.shortDescription}
        </p>

        <span className="mt-7 inline-flex w-fit items-center rounded-2xl bg-gradient-to-r from-pink-600 to-blue-600 px-6 py-3 font-black text-white shadow-lg">
          Explore the Live Platform

          <ArrowRight className="ml-2 h-5 w-5" />
        </span>
      </div>

      <ApplicationImage
        product={product}
        heightClass="min-h-[320px] lg:h-full"
      />
    </motion.button>
  );
}

function SOCSecretTeaser() {
  const features = [
    ["AI-augmented", "Threat detection", Target],
    ["Multi-source", "Telemetry fusion", Activity],
    ["Automated", "Response orchestration", RefreshCw],
    ["Expert-led", "Insight & advisory", Sparkles],
  ];

  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#06112e] text-white shadow-2xl shadow-slate-900/20">
        <div
          className="relative grid gap-8 bg-cover bg-center p-8 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(6,17,46,0.98) 0%, rgba(6,17,46,0.94) 34%, rgba(6,17,46,0.70) 58%, rgba(6,17,46,0.20) 100%), url('/ot-soc-teaser-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <span className="inline-flex rounded-full bg-gradient-to-r from-pink-600 to-violet-700 px-4 py-2 text-xs font-black uppercase tracking-[0.12em]">
              Coming soon
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
              A new intelligence-led
              <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                OT SOC model
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/76">
              We’re developing the next generation of OT Security Operations:
              AI-supported analytics, threat hunting and response automation
              designed to transform how smart infrastructure is monitored,
              managed and kept secure.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([title, text, Icon]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <Icon className="h-7 w-7 text-cyan-300" />
                  <p className="mt-3 text-sm font-black">{title}</p>
                  <p className="text-xs font-semibold text-white/60">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden min-h-[360px] lg:block" />
        </div>
      </div>
    </section>
  );
}

function ApplicationsSection({
  onSelectProduct,
}) {
  const decarb = products.find(
    (product) =>
      product.id === "smart-decarb-360"
  );

  const primaryComingSoon = products.filter(
    (product) =>
      [
        "smart-impact-360",
        "smart-discovery-360",
        "smart-finance-360",
      ].includes(product.id)
  );

  const additionalProducts = products.filter(
    (product) =>
      [
        "smart-compliance-360",
        "ot-s-soc",
      ].includes(product.id)
  );

  return (
    <section className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Explore"
          title="Explore Our Intelligent Applications"
          text="SmartDecarb360 is live today. Explore the developing applications that will extend the SmartX360 ecosystem across impact, discovery, finance, compliance and operational resilience."
        />

        <div className="mt-12">
          <LiveApplicationCard
            product={decarb}
            onSelect={onSelectProduct}
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {primaryComingSoon.map((product) => (
            <ApplicationCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
              More coming soon
            </p>

            <div className="h-px flex-1 bg-slate-200" />
          </div>
         <SOCSecretTeaser />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                WHY IT MATTERS                              */
/* -------------------------------------------------------------------------- */

function WhyItMatters() {
  return (
    <section className="bg-slate-50 px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why it matters"
          title="Built for the next generation of infrastructure"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {valueCards.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <span
                  className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${item.bg} ${item.colour}`}
                >
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-4 text-sm font-black leading-5 text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
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
/*                              EARLY ACCESS CTA                              */
/* -------------------------------------------------------------------------- */

function EarlyAccessCTA({
  onEarlyAccess,
  openEnquiryForm,
}) {
  return (
    <section className="bg-white px-5 pb-16 pt-8 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#04132f] bg-cover bg-center p-8 text-white shadow-2xl md:p-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(3,17,43,.98) 0%,rgba(3,17,43,.92) 42%,rgba(3,17,43,.35) 100%),url('/smart-applications-cta-bg.png')",
        }}
      >
        <div className="relative z-10 grid gap-9 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="max-w-xl text-4xl font-black leading-tight">
              Be among the{" "}
              <span className="text-lime-300">
                first to shape
              </span>{" "}
              the next generation of intelligent
              infrastructure tools.
            </h2>

            <div className="mt-7 flex flex-wrap gap-5 text-sm font-bold text-white/72">
              <span className="inline-flex items-center gap-2">
                <Rocket className="h-5 w-5 text-cyan-300" />
                Early access to new tools
              </span>

              <span className="inline-flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-300" />
                Shape the roadmap
              </span>

              <span className="inline-flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-300" />
                Collaborate with innovators
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
              Request early access
            </p>

            <h3 className="mt-3 text-2xl font-black">
              Be first to test our systems.
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Register your interest for demonstrations,
              pilot opportunities and development updates.
            </p>

            <button
              type="button"
              onClick={onEarlyAccess}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-xl transition hover:scale-[1.01]"
            >
              Request Early Access

              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={openEnquiryForm}
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 font-black text-white transition hover:bg-white/10"
            >
              Talk to the Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PRODUCT MODAL                                */
/* -------------------------------------------------------------------------- */

function ProductModal({
  product,
  onClose,
  onEarlyAccess,
  goToPage,
}) {
  useEffect(() => {
    if (!product) {
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
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
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
          className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`product-modal-${product.id}`}
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              onClose();
            }
          }}
        >
          <motion.article
            initial={{
              opacity: 0,
              y: 25,
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
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
          >
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[390px] bg-slate-950">
                <img
                  src={product.image}
                  alt={`${product.name} preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <StatusBadge product={product} />

                  <h2
                    id={`product-modal-${product.id}`}
                    className="mt-4 text-4xl font-black"
                  >
                    {product.name}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/75">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-7 md:p-9">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-slate-50"
                  aria-label="Close product details"
                >
                  <X className="h-5 w-5" />
                </button>

                <ProductLogo
                  product={product}
                  className="h-14 max-w-sm"
                  imageClassName="max-w-[340px]"
                />

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {product.intro}
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-black text-slate-950">
                      What is included
                    </h3>

                    <div className="mt-4 grid gap-3">
                      {product.included.map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />

                            <p className="text-sm leading-6 text-slate-600">
                              {item}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950">
                      Key benefits
                    </h3>

                    <div className="mt-4 grid gap-3">
                      {product.benefits.map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                            <p className="text-sm leading-6 text-slate-600">
                              {item}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  {product.isLive ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        goToPage?.(product.page);
                      }}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-blue-600 px-7 py-4 font-black text-white shadow-xl"
                    >
                      Explore SmartDecarb360

                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onEarlyAccess(product);
                      }}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-xl"
                    >
                      Subscribe for an Early Demo

                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                          EARLY ACCESS FORM MODAL                            */
/* -------------------------------------------------------------------------- */

function EarlyAccessModal({
  product,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    email: "",
    role: "",
    interest:
      product?.name ||
      "SmartX360 Product Suite",
  });

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  useEffect(() => {
    if (product) {
      setFormData((current) => ({
        ...current,
        interest: product.name,
      }));

      setSubmitted(false);
      setSubmitError("");
    }
  }, [product]);

  useEffect(() => {
    if (!product) {
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
  }, [product, onClose]);

  const updateField = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setSubmitError("");

    try {
      await onSubmit?.(formData);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.message ||
          "The request could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {product && (
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
          className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="early-access-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 22,
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
            className="relative mx-auto max-w-2xl rounded-[2rem] bg-white p-7 shadow-2xl md:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600"
              aria-label="Close early access form"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Rocket className="h-7 w-7" />
                </span>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                  Early access programme
                </p>

                <h2
                  id="early-access-title"
                  className="mt-2 text-3xl font-black text-slate-950"
                >
                  Request an early demonstration
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Register your interest in{" "}
                  <strong>
                    {product.name}
                  </strong>
                  . The Smart Net Zero team can
                  contact you regarding demonstrations,
                  pilot opportunities and development
                  updates.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Name

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={updateField}
                        required
                        className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>

                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Work email

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={updateField}
                        required
                        className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Organisation

                      <input
                        type="text"
                        name="organisation"
                        value={
                          formData.organisation
                        }
                        onChange={updateField}
                        required
                        className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>

                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Role

                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={updateField}
                        className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    Product interest

                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={updateField}
                      className="h-12 rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      {products
                        .filter(
                          (item) =>
                            !item.isLive
                        )
                        .map((item) => (
                          <option
                            key={item.id}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}

                      <option value="SmartX360 Product Suite">
                        Full SmartX360 Product Suite
                      </option>
                    </select>
                  </label>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Early Access Request"}

                    {!submitting && (
                      <ArrowRight className="ml-2 h-5 w-5" />
                    )}
                  </button>

                  <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                    <LockKeyhole className="h-4 w-4" />
                    Your information will only be
                    used to respond to this request.
                  </p>
                </form>
              </>
            ) : (
              <div className="py-12 text-center">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="h-10 w-10" />
                </span>

                <h2 className="mt-6 text-3xl font-black text-slate-950">
                  Thank you
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                  Your early-access request has been
                  received. A member of the Smart Net
                  Zero team can follow up regarding
                  demonstrations and pilot
                  opportunities.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-2xl bg-slate-950 px-7 py-3 font-black text-white"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  MAIN PAGE                                 */
/* -------------------------------------------------------------------------- */

export default function SmartApplications({
  goToPage,
  openEnquiryForm,
  onEarlyAccessSubmit,
}) {
  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [
    earlyAccessProduct,
    setEarlyAccessProduct,
  ] = useState(null);

  useEffect(() => {
    document.title =
      "Smart Applications & Digital Tools | Smart Net Zero";
  }, []);

  const scrollToProductVision = () => {
    document
      .getElementById("product-pathway")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const openGeneralEarlyAccess = () => {
    setEarlyAccessProduct({
      name: "SmartX360 Product Suite",
    });
  };

  const handleEarlyAccessSubmit = async (
    formData
  ) => {
    const response = await fetch(
      "/api/early-access",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Unable to submit the early-access request."
      );
    }

    onEarlyAccessSubmit?.(formData);

    return result;
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SmartApplications"
      />

      <main>
        <Hero
          onExplorePathway={
            scrollToProductVision
          }
          onEarlyAccess={
            openGeneralEarlyAccess
          }
        />

        <ProductEcosystem
          onSelectProduct={
            setSelectedProduct
          }
        />

        <ConvergedVisionSection
          onEarlyAccess={
            openGeneralEarlyAccess
          }
        />

        <ApplicationsSection
          onSelectProduct={
            setSelectedProduct
          }
        />

        <WhyItMatters />

        <EarlyAccessCTA
          onEarlyAccess={
            openGeneralEarlyAccess
          }
          openEnquiryForm={
            openEnquiryForm
          }
        />
      </main>

      <SNZFooter goToPage={goToPage} />

      <ProductModal
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
        onEarlyAccess={(product) =>
          setEarlyAccessProduct(product)
        }
        goToPage={goToPage}
      />

      <EarlyAccessModal
        product={earlyAccessProduct}
        onClose={() =>
          setEarlyAccessProduct(null)
        }
        onSubmit={
          handleEarlyAccessSubmit
        }
      />
    </div>
  );
}