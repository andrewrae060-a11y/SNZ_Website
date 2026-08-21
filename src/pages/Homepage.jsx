import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import useGoogleTag from "../hooks/useGoogleTag";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  Building2,
  CloudLightning,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Leaf,
  MessageCircle,
  Network,
  Play,
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
  {
  value: "18",
  label: "critical sectors now within NIS2 scope as cyber obligations expand across connected operations",
  source: "EC",
  icon: Scale,
  bg: "bg-blue-50",
  colour: "text-blue-700",
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

function HeroInfrastructureScreen() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;
    video.volume = 1;

    if (hasEnded) {
      video.currentTime = 0;
    }

    setIsPlaying(true);
    setHasEnded(false);

    try {
      await video.play();
    } catch (error) {
      console.error("Video playback failed:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-400/20 blur-3xl" />
      <div className="absolute -inset-3 rounded-[2.25rem] bg-violet-500/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-[#020817] p-3 shadow-2xl shadow-cyan-950/40">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            SNZ InfraVision
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-white/10 bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/MA_Waves_SoDoI.mp4"
            playsInline
            preload="metadata"
            controls={isPlaying && !hasEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setHasEnded(true);
            }}
          />

          {!isPlaying && (
            <div className="absolute inset-0">
              <img
                src="/infrastructure-video-poster.png"
                alt="Infrastructure intelligence display preview"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />
              <button
                type="button"
                onClick={playVideo}
                aria-label={hasEnded ? "Watch again" : "Play video"}
                className="absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-full border border-cyan-300/45 bg-[#06112e]/90 text-white shadow-xl shadow-cyan-950/40 backdrop-blur transition hover:scale-[1.06] hover:bg-[#071a42]"
              >
                <Play className="ml-0.5 h-7 w-7 fill-white" />
              </button>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.12)_100%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}

function Hero({ openEnquiryForm }) {
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

      <div className="relative z-20 mx-auto grid max-w-[1500px] items-center gap-8 px-5 pb-32 pt-36 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:pb-36 lg:pt-20">
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
              More Sustainable.
            </span>
          </h1>

          <div className="mt-7 h-1.5 w-24 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/82">
            We turn disconnected infrastructure, systems and data into trusted
            intelligence so organisations can perform better, manage risk,
            strengthen resilience and move faster towards net zero.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={openEnquiryForm}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-7 py-4 text-sm font-black text-white shadow-xl shadow-violet-950/30 transition hover:scale-[1.02]"
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/35 bg-white/5 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-20 hidden min-h-[560px] items-start justify-center pt-2 lg:flex"
        >
          <HeroInfrastructureScreen />
        </motion.div>
      </div>
    </section>
  );
}

function HomepageSectionNav() {
  const sections = [
    {
      label: "The Challenge",
      href: "#infrastructure-challenge",
      icon: GitBranch,
    },
    {
      label: "Our Approach",
      href: "#transforming-the-typical",
      icon: Layers3,
    },
    {
      label: "SmartX360",
      href: "#smartx360",
      icon: Network,
    },
    {
      label: "Services",
      href: "#services",
      icon: Zap,
    },
    {
      label: "Why Now",
      href: "#why-now",
      icon: CloudLightning,
    },
    {
      label: "Outcomes",
      href: "#business-outcomes",
      icon: BarChart3,
    },
    {
      label: "Industries",
      href: "#industries",
      icon: Building2,
    },
  ];

  const handleAnchorClick = (event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Homepage sections"
      className="sticky top-[88px] z-40 border-b border-slate-200 bg-white/95 px-5 py-4 shadow-lg shadow-slate-950/5 backdrop-blur-xl lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 overflow-x-auto px-1 py-2 scrollbar-hide">
          <span className="hidden shrink-0 text-xs font-black uppercase tracking-[0.16em] text-slate-400 xl:block">
            Explore
          </span>

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <a
                key={section.href}
                href={section.href}
                onClick={(event) =>
                  handleAnchorClick(event, section.href)
                }
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-[#07133c] shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md"
              >
                <Icon className="h-4 w-4 text-violet-600 transition group-hover:scale-110" />

                {section.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function InfrastructureProblemSection() {
  const challenges = [
    {
      title: "Systems stay siloed",
      text: "No single view of assets, data and performance.",
      icon: GitBranch,
      accent: "from-violet-500 to-purple-600",
    },
    {
      title: "Data lacks trust",
      text: "Gaps and inconsistency hide risk and opportunity.",
      icon: Database,
      accent: "from-fuchsia-500 to-pink-500",
    },
    {
      title: "Risks now overlap",
      text: "Energy, OT, cyber, carbon and compliance collide.",
      icon: Network,
      accent: "from-cyan-500 to-blue-600",
    },
    {
      title: "Priorities stay unclear",
      text: "Teams struggle to know what to fix or fund first.",
      icon: Gauge,
      accent: "from-blue-500 to-violet-600",
    },
  ];

  return (
    <section
      id="infrastructure-challenge"
      className="scroll-mt-40 bg-white px-5 py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
              The infrastructure problem
            </p>

            <h2 className="mt-3 max-w-xl text-4xl font-black leading-[1.06] text-slate-950 md:text-5xl">
              Connected infrastructure.
              <span className="block text-violet-700">Disconnected decisions.</span>
            </h2>

            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-slate-600">
              More systems. More data. More dependencies. Yet often less clarity.
            </p>

            <div className="mt-7 inline-flex items-center rounded-2xl bg-[#06112e] px-5 py-4 text-sm font-black text-white shadow-lg">
              <Layers3 className="mr-3 h-5 w-5 text-cyan-300" />
              SNZ turns fragmentation into one clearer operating view.
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {challenges.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.accent}`} />

                  <div className="flex items-start gap-4">
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TransformingTypicalSection() {
  return (
    <section
      id="transforming-the-typical"
      className="scroll-mt-40 bg-[#f7f6fb] px-5 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10"
    >
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
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4"
        >
          {/* Left-hand image */}
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-violet-950/10">
            <img
              src="/transforming-the-typical-left.png"
              alt="Typical fragmented infrastructure with disconnected systems, data and organisational silos"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Right-hand image */}
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-violet-950/10">
            <img
              src="/transforming-the-typical-right.png"
              alt="Smart Net Zero connected infrastructure approach providing a complete intelligent view"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IntelligenceLayerSection({ goToPage }) {
  const intelligenceOutcomes = [
    {
      title: "One connected view",
      text: "Systems, teams, assets and data brought into a clearer operating picture.",
      icon: Network,
    },
    {
      title: "Data gaps exposed",
      text: "See what is missing, duplicated, unreliable or slowing decisions down.",
      icon: Database,
    },
    {
      title: "Risk made visible",
      text: "Understand where performance, compliance, cyber and resilience risks overlap.",
      icon: ShieldCheck,
    },
    {
      title: "Actions prioritised",
      text: "Move from fragmented information to practical next steps and measurable outcomes.",
      icon: BarChart3,
    },
  ];

  const openSmartApplications = () => {
    if (goToPage) {
      goToPage("SmartApplications");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.href = "/solutions/smart-applications";
  };

  return (
    <section
      id="smartx360"
      className="relative isolate scroll-mt-40 overflow-hidden bg-[#06112f] px-5 py-16 text-white lg:px-8 lg:py-20"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,.16),transparent_30%),radial-gradient(circle_at_78%_52%,rgba(59,130,246,.22),transparent_34%),linear-gradient(135deg,#020617_0%,#06112f_48%,#03091f_100%)]" />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(45,212,191,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.06)_1px,transparent_1px)] bg-[size:54px_54px] opacity-25" />

      <div className="absolute left-[-12rem] top-[-12rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-[-15rem] right-[-10rem] -z-10 h-[36rem] w-[36rem] rounded-full bg-blue-600/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="flex h-full flex-col justify-center"
          >
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              The Intelligence Layer
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
              SmartX360 Engine.
              <span className="block text-cyan-200">
                The intelligence layer behind delivery.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/76 md:text-lg">
              SmartX360 connects the information sitting across buildings,
              assets, systems, teams and suppliers so customers can move from
              fragmented views to clearer decisions and measurable action.
            </p>

            <div className="mt-7 rounded-[1.75rem] border border-cyan-300/18 bg-white/[0.055] p-5 shadow-2xl shadow-cyan-950/25 backdrop-blur">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                    What our intelligence delivers
                  </p>

                  <h3 className="mt-2 text-2xl font-black leading-tight text-white">
                    Clarity from disconnected complexity.
                  </h3>
                </div>

              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {intelligenceOutcomes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-white/10 bg-[#071a42]/70 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-white">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-xs leading-5 text-white/66">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={openSmartApplications}
              className="mt-7 inline-flex w-fit cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-cyan-950/30 transition hover:scale-[1.02]"
            >
              Explore Smart Applications
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="h-full"
          >
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-[2rem] border border-cyan-300/18 bg-[#020817] shadow-2xl shadow-cyan-950/35 lg:min-h-0">
              <img
                src="/smart-city-network-interface-at-night.png"
                alt="SmartX360 Engine acting as a connected intelligence layer across the built environment"
                className="h-full w-full object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
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
      className="scroll-mt-40 bg-white px-5 pb-20 pt-6 lg:px-8 lg:pb-24 lg:pt-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Our Connected Services
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            Connected services for smarter, safer and more sustainable
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

function WhyThisMattersSection() {

  return (
    <section
      id="why-now"
      className="relative isolate scroll-mt-40 overflow-hidden bg-[#050816] px-5 py-16 text-white lg:px-8 lg:py-20"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_24%,rgba(236,72,153,.18),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(34,211,238,.18),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(139,92,246,.20),transparent_34%),linear-gradient(135deg,#020617_0%,#07142d_48%,#030712_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
            Why this matters now
          </p>

          <h2 className="mx-auto mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
            Five pressures are becoming
            <span className="block bg-gradient-to-r from-pink-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              one connected challenge.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-white/70 md:text-lg">
            Decisions can no longer be made in isolation. Change in one area now creates consequences across the rest.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#020817] shadow-2xl shadow-black/30 lg:min-h-full"
          >
            <img
              src="/why-this-matters-five-pressures.png"
              alt="Five connected pressures across sustainability, energy, operational resilience, cyber risk and compliance"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/30 via-transparent to-[#020617]/10" />

            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              const accents = [
                "from-lime-400 to-emerald-500",
                "from-violet-400 to-purple-600",
                "from-pink-500 to-fuchsia-500",
                "from-cyan-400 to-blue-600",
                "from-blue-500 to-violet-600",
                "from-fuchsia-500 to-pink-500",
              ];

              return (
                <article
                  key={`${stat.value}-${stat.label}`}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accents[index % accents.length]}`} />

                  <div className="flex items-center justify-between gap-4">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${accents[index % accents.length]} text-white shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/55">
                      {stat.source}
                    </span>
                  </div>

                  <p className="mt-5 text-4xl font-black text-white md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/72">
                    {stat.label}
                  </p>
                </article>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-cyan-300/20 bg-gradient-to-r from-cyan-300/10 via-violet-300/10 to-pink-300/10 p-6 text-center">
          <p className="text-lg font-black text-white md:text-xl">
            The organisations that connect these decisions will move faster, reduce risk and invest with greater confidence.
          </p>
        </div>
      </div>
    </section>
  );
}

function BusinessOutcomesSection() {
  const customerBenefits = [
    {
      value: "20%+",
      title: "Lower energy cost",
      label:
        "Hidden energy waste becomes visible, prioritised and turned into a clear savings plan.",
      icon: Zap,
      accent: "from-pink-500 to-fuchsia-500",
      border: "border-pink-200",
      bg: "bg-pink-50",
      text: "text-pink-700",
    },
    {
      value: "30% faster",
      title: "Less time lost",
      label:
        "Teams spend less time chasing issues and more time acting on clear operational priorities.",
      icon: Gauge,
      accent: "from-violet-500 to-purple-600",
      border: "border-violet-200",
      bg: "bg-violet-50",
      text: "text-violet-700",
    },
    {
      value: "Lower",
      title: "Operational risk",
      label:
        "Risk exposure is easier to see across assets, systems, suppliers and compliance areas.",
      icon: ShieldCheck,
      accent: "from-blue-500 to-cyan-400",
      border: "border-cyan-200",
      bg: "bg-cyan-50",
      text: "text-cyan-700",
    },
    {
      value: "Stronger",
      title: "Evidence and reporting",
      label:
        "Manual reporting gaps become connected evidence for audits, decisions and board reporting.",
      icon: BarChart3,
      accent: "from-sky-500 to-blue-600",
      border: "border-blue-200",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      value: "Clearer",
      title: "Carbon progress",
      label:
        "Energy, emissions and delivery evidence are connected so progress can be measured and explained.",
      icon: Leaf,
      accent: "from-lime-500 to-emerald-600",
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      value: "Better",
      title: "Investment decisions",
      label:
        "Projects can be compared by cost, risk, carbon, resilience and practical deliverability.",
      icon: Banknote,
      accent: "from-amber-500 to-orange-500",
      border: "border-amber-200",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  ];

  return (
    <section
      id="business-outcomes"
      className="scroll-mt-40 bg-white px-5 py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Business outcomes
          </p>

          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            Benefits you can feel in cost, time, risk and confidence.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            The value is not more dashboards. It is less waste, faster action,
            lower exposure, clearer proof and better-informed investment.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {customerBenefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`group relative overflow-hidden rounded-[1.75rem] border ${item.border} ${item.bg} p-6 shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <div
                  className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${item.accent}`}
                />

                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <div>
                    <p className={`text-3xl font-black leading-none ${item.text}`}>
                      {item.value}
                    </p>
                    <h3 className="mt-2 text-lg font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection({ goToPage }) {
  const industries = [
    {
      title: "Built Environment",
      text:
        "Smarter buildings, stronger resilience and measurable energy and carbon improvement.",
      icon: Building2,
      page: "BuiltEnvironment",
      accent: "from-cyan-500 to-blue-600",
    },
    {
      title: "Public Sector & Local Authorities",
      text:
        "Better estate intelligence, prioritised investment and stronger public-service resilience.",
      icon: Users,
      page: "PublicSectorLocalAuthorities",
      accent: "from-violet-500 to-purple-600",
    },
    {
      title: "Manufacturers & Connected Products",
      text:
        "Product security, connected-device compliance and lifecycle assurance across global markets.",
      icon: Scale,
      page: "ManufacturersConnectedProducts",
      accent: "from-pink-500 to-fuchsia-600",
    },
    {
      title: "Energy, Utilities & Critical Infrastructure",
      text:
        "Secure, resilient and efficient connected operations where continuity is essential.",
      icon: CloudLightning,
      page: "EnergyUtilitiesCriticalInfrastructure",
      accent: "from-emerald-500 to-cyan-600",
    },
    {
      title: "Data Centres",
      text:
        "Capacity, cooling, energy and resilience intelligence for high-performance digital infrastructure.",
      icon: Database,
      page: "DataCentres",
      accent: "from-blue-500 to-indigo-600",
    },
  ];

  const navigate = (page) => {
    if (!goToPage) return;
    goToPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="industries"
      className="scroll-mt-40 bg-[#f7f6fb] px-5 py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Where Smart Net Zero works
          </p>

          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
            Built for complex, connected operating environments.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Smart Net Zero works across environments where infrastructure
            performance, energy, resilience, sustainability and compliance
            increasingly overlap. Our approach reflects the realities of
            connected assets, operational systems and organisations that need
            better visibility to make confident decisions.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <motion.button
                key={industry.title}
                type="button"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                onClick={() => navigate(industry.page)}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${industry.accent} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-lg font-black leading-tight text-slate-950">
                  {industry.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {industry.text}
                </p>

                <span className="mt-5 inline-flex items-center text-sm font-black text-violet-700">
                  Explore industry
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection({ openEnquiryForm }) {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 pb-14 pt-12 lg:px-8 lg:pt-16">
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
             Not sure where to start? Let’s make it clearer.
            </h2>

            <p className="mt-3 max-w-2xl text-white/75">
              Tell us what is getting in the way. We will help you identify the clearest next step.
            </p>
          </div>

          <button
            type="button"
            onClick={openEnquiryForm}
            className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 font-black shadow-xl transition hover:scale-[1.02]"
          >
            Book a Discovery Call <ArrowRight className="ml-2 h-5 w-5" />
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
  useGoogleTag();
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
        <Hero openEnquiryForm={openEnquiryForm} />

        <HomepageSectionNav />
        
        <InfrastructureProblemSection />

        <TransformingTypicalSection />

        <IntelligenceLayerSection goToPage={goToPage} />

        <ServicesSection goToPage={goToPage} />

        <WhyThisMattersSection />

        <BusinessOutcomesSection />

        <IndustriesSection goToPage={goToPage} />

        <CTASection openEnquiryForm={openEnquiryForm} />
      </main>

      <SNZFooter goToPage={goToPage} />
    </div>
  );
}