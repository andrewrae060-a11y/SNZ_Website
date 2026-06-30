import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  Building2,
  CloudLightning,
  Leaf,
  MessageCircle,
  Scale,
  ShieldCheck,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";

const services = [
  {
    title: "Sustainability & Net Zero",
    text: "Strategic roadmaps, emissions reduction, ESG integration and measurement that drive real, lasting impact.",
    cta: "Explore Services",
    icon: Leaf,
    accent: "from-lime-400 to-emerald-500",
    textAccent: "text-lime-700",
    page: "SustainabilityNetZero",
    image:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(231,255,233,0.22) 100%), url('/sustainability-netzero-card.png')",
  },
    {
    title: "Smart Energy Management",
    text: "Optimise energy performance with real-time insights, automation and intelligent operations across your energy ecosystem.",
    cta: "Explore Services",
    icon: Zap,
    accent: "from-pink-500 to-fuchsia-500",
    textAccent: "text-pink-600",
    page: "SmartEnergyManagement",
    image:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,185,232,0.18) 100%), url('/smart-energy-card.png')",
  },
  {
    title: "OT Security & Resilience",
    text: "Protect critical infrastructure and industrial systems with end-to-end cyber security, risk management and operational resilience.",
    cta: "Explore Services",
    icon: ShieldCheck,
    accent: "from-violet-500 to-fuchsia-500",
    textAccent: "text-violet-700",
    page: "OTSecurityResilience",
    image:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(179,117,255,0.22) 100%), url('/ot-security-card.png')",
  },

  {
    title: "Smart Regulations & Compliance",
    text: "Regulatory advisory, connected device compliance, product security and guidance for smart infrastructure across global markets.",
    cta: "Explore Smart Regulations",
    icon: Scale,
    accent: "from-purple-600 to-blue-600",
    textAccent: "text-violet-700",
    page: "SmartRegulations",
    badge: "New",
    image:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(193,165,255,0.16) 100%), url('/smart-regulations-card.png')",
  },
];

const impactStats = [
  {
    value: "$2.2tn",
    label: "is flowing globally into clean energy technologies and infrastructure",
    source: "IEA",
    icon: Banknote,
    bg: "bg-lime-50",
    colour: "text-lime-700",
  },
  {
    value: "70%",
    label: "of global greenhouse gas emissions are from urban areas",
    source: "IEA",
    icon: Building2,
    bg: "bg-purple-50",
    colour: "text-violet-700",
  },
  {
    value: "41%",
    label: "of organisations factor climate disruption into cyber risk planning",
    source: "WEF",
    icon: CloudLightning,
    bg: "bg-lime-50",
    colour: "text-lime-700",
  },
  {
    value: "73%",
    label: "reported cyber intrusions impacting OT systems in the past year.",
    source: "Fortinet",
    icon: ShieldCheck,
    bg: "bg-violet-50",
    colour: "text-violet-700",
  },
  {
    value: "3.5x",
    label: "increase in cyber attacks targeting energy & utilities since 2022",
    source: "ENISA",
    icon: BarChart3,
    bg: "bg-pink-50",
    colour: "text-pink-600",
  },
];

function HeroLighting() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      {/* Large teal moving glow */}
      <motion.div
        style={{
          position: "absolute",
          left: "-8rem",
          bottom: "-10rem",
          width: "38rem",
          height: "38rem",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(45,212,191,0.92) 0%, rgba(45,212,191,0.42) 30%, rgba(45,212,191,0) 72%)",
          filter: "blur(35px)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.28 }
            : {
                x: [0, 180, 320, 80, 0],
                y: [0, -90, -25, -55, 0],
                scale: [0.8, 1.15, 0.95, 1.1, 0.8],
                opacity: [0.25, 0.8, 0.4, 0.7, 0.25],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan moving glow */}
      <motion.div
        style={{
          position: "absolute",
          right: "-9rem",
          top: "-5rem",
          width: "34rem",
          height: "34rem",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.86) 0%, rgba(34,211,238,0.35) 32%, rgba(34,211,238,0) 72%)",
          filter: "blur(38px)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.22 }
            : {
                x: [0, -160, -280, -90, 0],
                y: [0, 70, 130, 40, 0],
                scale: [0.85, 1.15, 0.95, 1.08, 0.85],
                opacity: [0.2, 0.7, 0.35, 0.6, 0.2],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Violet atmospheric pulse */}
      <motion.div
        style={{
          position: "absolute",
          left: "54%",
          top: "54%",
          width: "24rem",
          height: "24rem",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.72) 0%, rgba(139,92,246,0.28) 35%, rgba(139,92,246,0) 72%)",
          filter: "blur(30px)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.18 }
            : {
                scale: [0.7, 1.2, 0.85, 1.1, 0.7],
                opacity: [0.12, 0.65, 0.25, 0.5, 0.12],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving light sweep */}
      {!reduceMotion && (
        <motion.div
          style={{
            position: "absolute",
            top: "-40%",
            left: "-30%",
            width: "18%",
            height: "190%",
            rotate: 18,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), rgba(45,212,191,0.38), rgba(255,255,255,0.08), transparent)",
            filter: "blur(14px)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
          animate={{
            x: ["0vw", "0vw", "145vw", "145vw"],
            opacity: [0, 0.9, 0.35, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            times: [0, 0.15, 0.78, 1],
            ease: "easeInOut",
          }}
        />
      )}

      {/* Breathing glow over the background image */}
      <motion.div
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          width: "62%",
          background:
            "radial-gradient(circle at 66% 45%, rgba(45,212,191,0.22), transparent 42%)",
          mixBlendMode: "screen",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.18 }
            : {
                opacity: [0.08, 0.34, 0.16, 0.08],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Flashing beacon one */}
      <motion.span
        style={{
          position: "absolute",
          left: "61%",
          top: "45%",
          width: "8px",
          height: "8px",
          borderRadius: "9999px",
          background: "#ffffff",
          boxShadow:
            "0 0 8px 3px rgba(255,255,255,1), 0 0 24px 10px rgba(45,212,191,0.95), 0 0 50px 20px rgba(45,212,191,0.45)",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.4 }
            : {
                opacity: [0.15, 0.15, 1, 0.2, 0.95, 0.15],
                scale: [0.7, 0.7, 2.2, 0.9, 1.7, 0.7],
              }
        }
        transition={{
          duration: 4.2,
          repeat: Infinity,
          times: [0, 0.66, 0.72, 0.78, 0.85, 1],
        }}
      />

      {/* Flashing beacon two */}
      <motion.span
        style={{
          position: "absolute",
          right: "18%",
          top: "48%",
          width: "7px",
          height: "7px",
          borderRadius: "9999px",
          background: "#ffffff",
          boxShadow:
            "0 0 8px 3px rgba(255,255,255,1), 0 0 25px 10px rgba(34,211,238,0.95), 0 0 50px 20px rgba(34,211,238,0.45)",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.38 }
            : {
                opacity: [0.12, 0.12, 1, 0.18, 0.85, 0.12],
                scale: [0.7, 0.7, 2.1, 0.85, 1.6, 0.7],
              }
        }
        transition={{
          duration: 5.1,
          repeat: Infinity,
          delay: 1.2,
          times: [0, 0.68, 0.74, 0.8, 0.87, 1],
        }}
      />

      {/* Flashing beacon three */}
      <motion.span
        style={{
          position: "absolute",
          right: "34%",
          top: "34%",
          width: "6px",
          height: "6px",
          borderRadius: "9999px",
          background: "#ffffff",
          boxShadow:
            "0 0 7px 3px rgba(255,255,255,1), 0 0 22px 9px rgba(168,85,247,0.95), 0 0 45px 18px rgba(168,85,247,0.4)",
        }}
        animate={
          reduceMotion
            ? { opacity: 0.34 }
            : {
                opacity: [0.1, 0.1, 0.95, 0.15, 0.8, 0.1],
                scale: [0.7, 0.7, 2, 0.85, 1.5, 0.7],
              }
        }
        transition={{
          duration: 4.7,
          repeat: Infinity,
          delay: 2.3,
          times: [0, 0.67, 0.73, 0.79, 0.86, 1],
        }}
      />

        {/* Additional green atmospheric glow */}
        <motion.div
          style={{
            position: "absolute",
            right: "24%",
            bottom: "-8rem",
            width: "28rem",
            height: "28rem",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.7) 0%, rgba(34,197,94,0.3) 32%, rgba(34,197,94,0) 72%)",
            filter: "blur(34px)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
          animate={
            reduceMotion
              ? { opacity: 0.18 }
              : {
                  x: [0, -120, 40, 0],
                  y: [0, -80, -30, 0],
                  scale: [0.75, 1.15, 0.9, 0.75],
                  opacity: [0.1, 0.55, 0.25, 0.1],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Additional blue atmospheric glow */}
        <motion.div
          style={{
            position: "absolute",
            left: "28%",
            top: "-9rem",
            width: "27rem",
            height: "27rem",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.68) 0%, rgba(59,130,246,0.28) 34%, rgba(59,130,246,0) 72%)",
            filter: "blur(36px)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
          animate={
            reduceMotion
              ? { opacity: 0.16 }
              : {
                  x: [0, 130, -40, 0],
                  y: [0, 80, 35, 0],
                  scale: [0.8, 1.12, 0.95, 0.8],
                  opacity: [0.1, 0.5, 0.22, 0.1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: 0.8,
            ease: "easeInOut",
          }}
        />

        {/* Additional pink-violet pulse */}
        <motion.div
          style={{
            position: "absolute",
            right: "7%",
            bottom: "20%",
            width: "18rem",
            height: "18rem",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.62) 0%, rgba(168,85,247,0.24) 38%, rgba(168,85,247,0) 74%)",
            filter: "blur(28px)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
          animate={
            reduceMotion
              ? { opacity: 0.15 }
              : {
                  scale: [0.7, 1.18, 0.88, 0.7],
                  opacity: [0.08, 0.48, 0.18, 0.08],
                }
          }
          transition={{
            duration: 6.5,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Flashing beacon four */}
        <motion.span
          style={{
            position: "absolute",
            left: "45%",
            top: "57%",
            width: "7px",
            height: "7px",
            borderRadius: "9999px",
            background: "#ffffff",
            boxShadow:
              "0 0 8px 3px rgba(255,255,255,1), 0 0 24px 10px rgba(34,197,94,0.95), 0 0 48px 18px rgba(34,197,94,0.42)",
          }}
          animate={
            reduceMotion
              ? { opacity: 0.36 }
              : {
                  opacity: [0.1, 0.1, 1, 0.18, 0.8, 0.1],
                  scale: [0.7, 0.7, 2.1, 0.9, 1.55, 0.7],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            delay: 0.6,
            times: [0, 0.67, 0.73, 0.79, 0.86, 1],
          }}
        />

        {/* Flashing beacon five */}
        <motion.span
          style={{
            position: "absolute",
            left: "76%",
            top: "78%",
            width: "6px",
            height: "6px",
            borderRadius: "9999px",
            background: "#ffffff",
            boxShadow:
              "0 0 7px 3px rgba(255,255,255,1), 0 0 22px 9px rgba(59,130,246,0.95), 0 0 46px 18px rgba(59,130,246,0.4)",
          }}
          animate={
            reduceMotion
              ? { opacity: 0.34 }
              : {
                  opacity: [0.1, 0.1, 0.95, 0.16, 0.82, 0.1],
                  scale: [0.7, 0.7, 2, 0.85, 1.5, 0.7],
                }
          }
          transition={{
            duration: 5.4,
            repeat: Infinity,
            delay: 1.8,
            times: [0, 0.68, 0.74, 0.8, 0.87, 1],
          }}
        />

        {/* Flashing beacon six */}
        <motion.span
          style={{
            position: "absolute",
            right: "7%",
            top: "25%",
            width: "8px",
            height: "8px",
            borderRadius: "9999px",
            background: "#ffffff",
            boxShadow:
              "0 0 8px 3px rgba(255,255,255,1), 0 0 25px 10px rgba(236,72,153,0.95), 0 0 52px 20px rgba(168,85,247,0.45)",
          }}
          animate={
            reduceMotion
              ? { opacity: 0.38 }
              : {
                  opacity: [0.12, 0.12, 1, 0.2, 0.9, 0.12],
                  scale: [0.7, 0.7, 2.2, 0.9, 1.65, 0.7],
                }
          }
          transition={{
            duration: 4.4,
            repeat: Infinity,
            delay: 3,
            times: [0, 0.66, 0.72, 0.78, 0.85, 1],
          }}
        />

    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#05072a] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_66%_35%,rgba(139,92,246,.36),transparent_28%),radial-gradient(circle_at_88%_58%,rgba(34,211,238,.20),transparent_22%),linear-gradient(120deg,#040622_0%,#070a33_48%,#070924_100%)]" />

      <div className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover bg-center opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(5,7,42,0.98) 0%,rgba(5,7,42,0.86) 30%,rgba(5,7,42,0.30) 62%,rgba(5,7,42,0.05) 100%),url('/Website_HomeBg.png')",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(168,85,247,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,.05)_1px,transparent_1px)] bg-[size:46px_46px] opacity-40" />
      
      <HeroLighting />

      <div className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-20 mx-auto grid max-w-[1500px] items-center gap-8 px-5 pb-32 pt-36 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:pb-36 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20"
        >
          <h1 className="text-[2.55rem] font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.7rem]">
            <span className="block lg:whitespace-nowrap">
              Making Infrastructure
            </span>
            <span className="block lg:whitespace-nowrap">
              Smarter, Safer and
            </span>
            <span className="block lg:whitespace-nowrap">
              Built to Last.
            </span>
          </h1>

          <div className="mt-7 h-1.5 w-24 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/82">
           We turn disconnected infrastructure, systems and data into trusted intelligence so organisations can perform better, manage risk, strengthen resilience and move faster towards net zero.
          </p>

         <div className="mt-7 max-w-5xl">
          <img
            src="/homepage-hero-four-point-banner.png"
            alt="Sustainable by Design, Secure by Default, Smarter by Data, Compliant by Choice"
            className="w-full rounded-2xl object-contain shadow-2xl shadow-cyan-950/30"
          />
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative hidden min-h-[560px] lg:block"
        >
         
        </motion.div>
      </div>
    </section>
  );
}

function WhatWeDoSection() {
  const capabilities = [
    {
      title: "Connect systems and data",
      text: "Bring building, energy, operational and business data into one trusted view.",
      icon: Wifi,
      iconStyle: "bg-violet-50 text-violet-700",
    },
    {
      title: "Create trusted intelligence",
      text: "Turn complex infrastructure information into clear and useful insight.",
      icon: BarChart3,
      iconStyle: "bg-purple-50 text-purple-700",
    },
    {
      title: "Protect connected operations",
      text: "Build security, resilience and governance into the connected environment.",
      icon: ShieldCheck,
      iconStyle: "bg-fuchsia-50 text-fuchsia-700",
    },
    {
      title: "Turn insight into action",
      text: "Improve decisions, performance and measurable operational outcomes.",
      icon: ArrowRight,
      iconStyle: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <section className="bg-white px-5 pb-14 pt-8 lg:px-8 lg:pb-18 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="relative min-h-[420px] overflow-hidden rounded-[2rem] shadow-xl shadow-slate-950/10 lg:min-h-[500px]"
          >
            <img
              src="/what-we-do-intelligent-infrastructure.png"
              alt="Infrastructure intelligence operations centre displaying connected systems and live data"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#09072f]/55 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="flex h-full flex-col justify-center py-1 lg:py-3"
          >
            <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
              What we do
            </p>

            <h2 className="mt-2 max-w-2xl text-4xl font-black leading-[1.08] text-slate-950 md:text-5xl">
              Creating intelligent infrastructure to drive insights into action.
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              We connect infrastructure, systems, frameworks and data so organisations can
              understand what is happening, manage risk and make better decisions.
            </p>

            <div className="mt-6 grid gap-x-7 gap-y-4 sm:grid-cols-2">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="grid grid-cols-[46px_1fr] gap-3 border-t border-slate-200 pt-4"
                  >
                    <div
                      className={`grid h-11 w-11 place-items-center rounded-xl ${item.iconStyle}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-950 md:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TransformingTypicalSection() {
  return (
    <section className="bg-[#f7f6fb] px-5 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Transforming the typical
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            Most organisations see parts. 
             <br />
             We see the whole.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="mt-12"
        >
          <img
            src="/transforming-the-typical.png"
            alt="Comparison between siloed infrastructure data and a connected 360 degree intelligent infrastructure view"
            className="mx-auto h-auto w-full rounded-[2rem] object-contain shadow-xl shadow-violet-950/10"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection({ goToPage }) {
  const navigateToService = (page) => {
    if (!page || !goToPage) return;

    goToPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="bg-white px-5 pb-20 pt-6 lg:px-8 lg:pb-24 lg:pt-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Solutions
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            Connected solutions for smarter, safer and more sustainable
            infrastructure.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => navigateToService(card.page)}
                className="group relative min-h-[470px] cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/10"
              >
                {card.badge && (
                  <span className="absolute right-5 top-5 z-20 rounded-lg bg-violet-700 px-3 py-1 text-xs font-black text-white">
                    {card.badge}
                  </span>
                )}

                <div className="relative z-10 p-6 pb-48">
                  <span
                    className={`inline-grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${card.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-8 w-8" />
                  </span>

                  <h3 className="mt-6 text-2xl font-black leading-tight text-slate-950">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {card.text}
                  </p>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      navigateToService(card.page);
                    }}
                    className={`mt-6 inline-flex cursor-pointer items-center text-sm font-black ${card.textAccent}`}
                  >
                    {card.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-48 overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: card.image }}
                  />

                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white via-white/80 to-transparent" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function ImpactSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Our Impact
          </p>

          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950">
            Where sustainability, security and compliance converge
          </h2>

          <p className="mt-5 max-w-md leading-7 text-slate-600">
            We combine deep expertise and innovative technology to deliver
            measurable outcomes at scale across industries.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {impactStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.value}
                className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div
                  className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${stat.bg}`}
                >
                  <Icon className={`h-8 w-8 ${stat.colour}`} />
                </div>

                <p className="mt-4 text-3xl font-black text-slate-950">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {stat.label}
                </p>

                <p className="mt-3 text-[11px] text-slate-400">
                  Source: {stat.source}
                </p>
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
    <section id="contact" className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#100044] via-violet-900 to-[#07124d] p-8 text-white shadow-2xl shadow-violet-950/20 md:p-12">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_40%_50%,rgba(77,208,225,.28),transparent_35%),linear-gradient(90deg,transparent,rgba(255,255,255,.06))]" />

        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(16,0,68,0.96) 0%, rgba(16,0,68,0.78) 38%, rgba(7,18,77,0.30) 100%), url('/cta-smart-net-zero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/10">
            <MessageCircle className="h-12 w-12 text-fuchsia-200" />
          </div>

          <div>
            <h2 className="text-3xl font-black">
              Ready to start your smart net zero journey?
            </h2>

            <p className="mt-3 max-w-2xl text-white/75">
              Talk to our experts to build a secure, compliant and sustainable
              future for your organisation.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 font-black shadow-xl transition hover:scale-[1.02]"
          >
            Talk to Experts <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Homepage({
  goToPage,
  openEnquiryForm,
}) {
  useEffect(() => {
    document.title =
      "Smart Net Zero | Smart Infrastructure for a secure, safe and sustainable future";
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#fbfbff_54%,#ffffff_100%)] text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="Homepage"
      />

      <main>
        <Hero />

        <WhatWeDoSection />

        <TransformingTypicalSection />

        <ServicesSection goToPage={goToPage} />

        <ImpactSection />

        <CTASection openEnquiryForm={openEnquiryForm} />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}