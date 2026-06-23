import { useMemo, useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import { useSocialHubContent, subscribeToUpdates } from "../hooks/useSocialHubContent";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Globe2,
  Heart,
  Mail,
  Megaphone,
  MessageCircle,
  Mic2,
  Play,
  RefreshCw,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";

const BrandIcon = ({ label, className = "" }) => (
  <span className={`inline-grid place-items-center rounded-full font-black leading-none ${className}`}>
    {label}
  </span>
);

const LinkedInIcon = ({ className = "" }) => <BrandIcon label="in" className={className} />;
const XIcon = ({ className = "" }) => <BrandIcon label="𝕏" className={className} />;
const YouTubeIcon = ({ className = "" }) => <BrandIcon label="▶" className={className} />;
const InstagramIcon = ({ className = "" }) => <BrandIcon label="◎" className={className} />;

const fallbackChannelPosts = [
  {
    id: 1,
    channel: "LinkedIn",
    icon: LinkedInIcon,
    time: "3h ago",
    title: "Great discussion at today's #SmartBuildings roundtable. Collaboration is key to real progress.",
    tags: ["#NetZero", "#BuiltEnv"],
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    likes: 23,
    comments: 4,
    shares: 6,
    accent: "from-sky-500 to-blue-700",
  },
  {
    id: 2,
    channel: "X",
    icon: XIcon,
    time: "5h ago",
    title: "The road to net zero is a journey we take together. Here's what's happening this week 🌱",
    tags: ["#NetZero", "#Sustainability"],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
    likes: 18,
    comments: 2,
    shares: 3,
    accent: "from-slate-800 to-black",
  },
  {
    id: 3,
    channel: "YouTube",
    icon: YouTubeIcon,
    time: "1d ago",
    title: "New video out now! Smart Infrastructure Explained in 90 Seconds. Watch now on YouTube.",
    tags: ["Video", "Explainer"],
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=900&q=80",
    likes: 31,
    comments: 5,
    shares: 120,
    video: true,
    accent: "from-red-500 to-rose-600",
  },
  {
    id: 4,
    channel: "Instagram",
    icon: InstagramIcon,
    time: "2d ago",
    title: "Innovation. Collaboration. Impact. That's how we build a sustainable future.",
    tags: ["#SmartNetZero"],
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    likes: 42,
    comments: 7,
    shares: 0,
    accent: "from-pink-500 via-fuchsia-500 to-orange-400",
  },
];

const fallbackEditorPicks = [
  {
    type: "Article",
    title: "5 Ways Data is Driving Smarter Infrastructure",
    cta: "Read article",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    icon: BookOpen,
  },
  {
    type: "Case Study",
    title: "How IoT Sensors Reduced Energy Use by 32%",
    cta: "Explore case study",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    icon: CheckCircle2,
  },
  {
    type: "Report",
    title: "The State of Smart Infrastructure 2026",
    cta: "Read report",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    icon: Globe2,
  },
  {
    type: "Podcast",
    title: "The Net Zero Conversation",
    cta: "Listen now",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    icon: Mic2,
  },
  {
    type: "Webinar",
    title: "Climate Risk & Resilience in the Built Environment",
    cta: "Watch webinar",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
    icon: Video,
  },
];

const fallbackPartnerContent = [
  {
    partner: "AUTODESK",
    type: "Thought Leadership",
    title: "Designing for a Low Carbon Future",
    cta: "Read more",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    partner: "Schneider Electric",
    type: "Case Study",
    title: "Smart Buildings, Real Impact",
    cta: "Explore case study",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  },
  {
    partner: "SIEMENS",
    type: "Innovation Story",
    title: "Digital Twins Driving Smarter Cities",
    cta: "Read more",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  },
  {
    partner: "ARUP",
    type: "Event",
    title: "Net Zero Summit: Key Insights and Takeaways",
    cta: "Watch now",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=80",
  },
];

const fallbackEvents = [
  { month: "MAY", day: "22", type: "Webinar", title: "Smart Compliance in a Changing World", time: "10:00 AM GMT", action: "Register now" },
  { month: "JUN", day: "10", type: "Webinar", title: "Decarbonising Buildings at Scale", time: "11:00 AM GMT", action: "Register now" },
  { month: "JUN", day: "22", type: "Event", title: "Smart Net Zero Summit 2026", time: "London, UK", action: "Learn more" },
  { month: "JUL", day: "09", type: "Webinar", title: "Financing the Net Zero Transition", time: "10:00 AM GMT", action: "Register now" },
];

const fallbackHeroCards = [
  { type: "New Research", title: "The Role of IoT in Smart Buildings", cta: "Read more" },
  { type: "Case Study", title: "Delivering Measurable Carbon Reductions", cta: "View case study" },
  { type: "Event", title: "Smart Net Zero Summit 2026", cta: "Register now" },
];

const fallbackChannels = [
  { name: "LinkedIn", icon: LinkedInIcon, action: "Follow", color: "text-blue-600" },
  { name: "X (Twitter)", icon: XIcon, action: "Follow", color: "text-slate-950" },
  { name: "YouTube", icon: YouTubeIcon, action: "Subscribe", color: "text-red-600" },
  { name: "Instagram", icon: InstagramIcon, action: "Follow", color: "text-pink-600" },
];

const fallbackQuickActions = [
  { title: "Subscribe for updates", text: "Get the latest insights, research and events straight to your inbox.", cta: "Subscribe now", icon: Mail, color: "from-teal-400 to-emerald-500" },
  { title: "Follow our channels", text: "Stay connected and join the conversation.", cta: "Follow now", icon: Users, color: "from-blue-500 to-cyan-500" },
  { title: "Contribute a story", text: "Share your success story or thought leadership.", cta: "Get involved", icon: Edit3, color: "from-fuchsia-500 to-purple-600" },
  { title: "Explore partner content", text: "Discover innovative solutions and stories from our partners.", cta: "Explore now", icon: Share2, color: "from-indigo-500 to-blue-600" },
  { title: "Become a partner", text: "Collaborate with us to accelerate impact together.", cta: "Learn more", icon: Megaphone, color: "from-pink-500 to-fuchsia-600" },
];


const fallbackPageSettings = {
  eyebrow: "Social Media & Content Hub",
  headingLineOne: "Inspiring action.",
  headingLineTwo: "Driving change.",
  intro:
    "Bringing net zero, smart infrastructure and compliance to life through engaging content, expert insights and meaningful conversations.",
  heroImage:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80",
  socialHandle: "@smartnetzero",
  phoneCardText: "Building a smarter, greener future together.",
};

const channelPresentation = {
  linkedin: { icon: LinkedInIcon, accent: "from-sky-500 to-blue-700", color: "text-blue-600" },
  x: { icon: XIcon, accent: "from-slate-800 to-black", color: "text-slate-950" },
  twitter: { icon: XIcon, accent: "from-slate-800 to-black", color: "text-slate-950" },
  youtube: { icon: YouTubeIcon, accent: "from-red-500 to-rose-600", color: "text-red-600" },
  instagram: { icon: InstagramIcon, accent: "from-pink-500 via-fuchsia-500 to-orange-400", color: "text-pink-600" },
};

const editorIcons = {
  article: BookOpen,
  "case study": CheckCircle2,
  "case-study": CheckCircle2,
  report: Globe2,
  podcast: Mic2,
  webinar: Video,
  video: Video,
};

const quickActionPresentation = {
  subscribe: { icon: Mail, color: "from-teal-400 to-emerald-500" },
  follow: { icon: Users, color: "from-blue-500 to-cyan-500" },
  contribute: { icon: Edit3, color: "from-fuchsia-500 to-purple-600" },
  "explore-partners": { icon: Share2, color: "from-indigo-500 to-blue-600" },
  partners: { icon: Share2, color: "from-indigo-500 to-blue-600" },
  "become-partner": { icon: Megaphone, color: "from-pink-500 to-fuchsia-600" },
  partner: { icon: Megaphone, color: "from-pink-500 to-fuchsia-600" },
};

function unwrapCmsItems(section) {
  if (!Array.isArray(section)) return [];
  return section.map((item, index) => ({
    id: item?.id ?? item?.itemKey ?? item?.key ?? index,
    itemKey: item?.itemKey ?? item?.key,
    ...(item?.data && typeof item.data === "object" ? item.data : item),
  }));
}

function getCmsSection(content, names) {
  for (const name of names) {
    if (Array.isArray(content?.[name])) return unwrapCmsItems(content[name]);
  }
  return [];
}

function getChannelPresentation(name = "") {
  const value = String(name).toLowerCase();
  if (value.includes("linkedin")) return channelPresentation.linkedin;
  if (value === "x" || value.includes("twitter")) return channelPresentation.x;
  if (value.includes("youtube")) return channelPresentation.youtube;
  if (value.includes("instagram")) return channelPresentation.instagram;
  return { icon: Sparkles, accent: "from-teal-500 to-violet-600", color: "text-teal-700" };
}

function getEditorIcon(value = "article") {
  return editorIcons[String(value).toLowerCase()] || BookOpen;
}

function getQuickActionPresentation(value = "") {
  return quickActionPresentation[String(value).toLowerCase()] || {
    icon: Sparkles,
    color: "from-teal-500 to-blue-600",
  };
}

function getEventDisplayDate(event) {
  if (event.month && event.day) {
    return { month: String(event.month).toUpperCase(), day: String(event.day).padStart(2, "0") };
  }
  if (!event.date) return { month: "", day: "" };
  const date = new Date(`${event.date}T12:00:00`);
  if (Number.isNaN(date.getTime())) return { month: "", day: "" };
  return {
    month: date.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    day: String(date.getDate()).padStart(2, "0"),
  };
}

function openContent(item, onOpenContent) {
  if (item?.url) {
    window.open(item.url, "_blank", "noopener,noreferrer");
    return;
  }
  onOpenContent(item);
}

function Hero({ onOpenContent, pageSettings, heroCards }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06112e] text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_52%_44%,rgba(6,182,212,.24),transparent_25%),radial-gradient(circle_at_76%_28%,rgba(168,85,247,.35),transparent_26%),linear-gradient(120deg,#06112e_0%,#071836_48%,#020817_100%)]" />

      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
        <div
          className="h-full w-full bg-cover bg-center opacity-90"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(6,17,46,1) 0%,rgba(6,17,46,.80) 28%,rgba(6,17,46,.20) 100%),url('${pageSettings.heroImage || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80"}')`,
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(45,212,191,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
            {pageSettings.eyebrow || "Social Media & Content Hub"}
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[1.04] tracking-tight md:text-7xl">
            {pageSettings.headingLineOne || pageSettings.heading || "Inspiring action."}
            <br />
            {pageSettings.headingLineTwo || "Driving change."}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/82">
            {pageSettings.intro || pageSettings.description || "Bringing net zero, smart infrastructure and compliance to life through engaging content, expert insights and meaningful conversations."}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              ["Engage", "Join conversations that matter", Users, "text-emerald-300"],
              ["Learn", "Access insights and expert perspectives", BookOpen, "text-sky-300"],
              ["Inspire", "Discover solutions that drive change", TrendingUp, "text-fuchsia-300"],
              ["Act", "Accelerate sustainable outcomes", Globe2, "text-teal-300"],
              ["Watch", "See stories in motion", Play, "text-red-300"],
            ].map(([title, text, Icon, color]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <Icon className={`h-7 w-7 ${color}`} />
                <h3 className="mt-3 font-black">{title}</h3>
                <p className="mt-1 text-xs leading-4 text-white/68">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative hidden min-h-[430px] lg:block">
          <div className="absolute left-[8%] top-[12%] grid h-16 w-16 place-items-center rounded-full border border-blue-300/25 bg-blue-500/20 shadow-xl shadow-blue-500/20 backdrop-blur-xl">
            <LinkedInIcon className="h-8 w-8 text-blue-300" />
          </div>
          <div className="absolute left-[14%] top-[45%] grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-black/50 shadow-xl shadow-black/30 backdrop-blur-xl">
            <XIcon className="h-8 w-8 text-white" />
          </div>
          <div className="absolute right-[30%] top-[8%] grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/8 backdrop-blur-xl">
            <Sparkles className="h-7 w-7 text-white/80" />
          </div>
          <div className="absolute right-[22%] top-[42%] grid h-16 w-16 place-items-center rounded-full border border-pink-300/25 bg-gradient-to-br from-pink-500 to-orange-400 shadow-xl shadow-pink-500/20">
            <InstagramIcon className="h-8 w-8 text-white" />
          </div>
          <div className="absolute left-[24%] bottom-[18%] grid h-16 w-16 place-items-center rounded-full border border-red-300/25 bg-red-600 shadow-xl shadow-red-500/20">
            <YouTubeIcon className="h-8 w-8 text-white" />
          </div>

          <div className="absolute left-[34%] top-[5%] w-60 rotate-[-5deg] rounded-[2.2rem] border border-white/20 bg-slate-950 p-3 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-[1.7rem] bg-[#081831] p-4">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <img
                  src="/snzlogo.png"
                  alt="Smart Net Zero"
                  className="h-10 w-10 rounded-md object-contain"
                />
                <span>{pageSettings.socialHandle || "@smartnetzero"}</span>
              </div>
              <div
                className="mt-4 h-36 rounded-2xl bg-cover bg-center p-4"
                style={{
                  backgroundImage: `linear-gradient(
                    180deg,
                    rgba(6,17,46,.1),
                    rgba(6,17,46,.75)
                  ),url('${pageSettings.heroImage || fallbackPageSettings.heroImage}')`,
                }}
              >
                <p className="text-xl font-black leading-tight">
                  {pageSettings.phoneCardText ||
                    "Building a smarter, greener future together."}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-3 text-white/80">
                <Heart className="h-4 w-4 text-pink-400" />
                <MessageCircle className="h-4 w-4" />
                <RefreshCw className="h-4 w-4" />
                <Share2 className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 grid w-64 gap-4">
            {heroCards.map((item) => (
              <button
                key={item.id || item.itemKey || item.title}
                onClick={() => openContent(item, onOpenContent)} className="rounded-2xl border border-violet-300/35 bg-violet-950/45 p-4 text-left shadow-xl shadow-violet-950/30 backdrop-blur-xl transition hover:scale-[1.02]">
                <span className="rounded-full bg-violet-500 px-3 py-1 text-[10px] font-black">{item.type}</span>
                <h3 className="mt-3 font-black leading-tight">{item.title}</h3>
                <p className="mt-3 inline-flex items-center text-sm font-bold text-emerald-300">
                  {item.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LatestChannels({ onOpenContent, channelPosts, channels }) {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () =>
      filter === "All"
        ? channelPosts
        : channelPosts.filter((post) => post.channel === filter),
    [filter, channelPosts]
  );

  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Latest from our channels</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["All", "LinkedIn", "X", "YouTube", "Instagram"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                    filter === item ? "border-teal-400 bg-teal-50 text-teal-800" : "border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => onOpenContent({ title: "All content" })} className="inline-flex items-center self-start text-sm font-black text-teal-700 md:self-auto">
            View all content <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_260px]">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => {
                const presentation = getChannelPresentation(post.channel);
                const Icon = post.icon || presentation.icon;
                const isVideoPost =
                  post.mediaType === "video" || Boolean(post.videoUrl);

                return (
                  <motion.article
                    layout
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                  >
                    <div className="relative h-32 overflow-hidden bg-slate-900">
                      {isVideoPost && post.videoUrl ? (
                        <video
                          src={post.videoUrl}
                          poster={
                            post.image ||
                            undefined
                          }
                          controls
                          preload="metadata"
                          className="h-full w-full object-cover"
                        >
                          Your browser does not support
                          embedded video.
                        </video>
                      ) : post.image ? (
                        <img
                          src={post.image}
                          alt={
                            post.imageAlt ||
                            post.title ||
                            ""
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-950" />
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/5 to-slate-950/35" />

                      <span
                        className={`absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${
                          post.accent ||
                          presentation.accent
                        } text-white shadow-lg`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      {(post.video || isVideoPost) &&
                        !post.videoUrl && (
                          <span className="pointer-events-none absolute inset-0 grid place-items-center">
                            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/18 text-white backdrop-blur">
                              <Play className="h-7 w-7 fill-current" />
                            </span>
                          </span>
                        )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-slate-500">{post.publishedLabel || post.time || ""}</p>
                      <h3 className="mt-3 min-h-[80px] text-sm font-bold leading-5 text-slate-950">
                        {post.title} <span className="text-teal-700">{Array.isArray(post.tags) ? post.tags.join(" ") : ""}</span>
                      </h3>
                      <div className="mt-4 flex items-center gap-5 border-t border-slate-100 pt-3 text-xs font-bold text-slate-600">
                        <span>👍 {post.likes ?? 0}</span>
                        <span>💬 {post.comments ?? 0}</span>
                        <span>
                          {isVideoPost ? "▶" : "↻"} {post.shares ?? 0}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-gradient-to-b from-violet-50 to-white p-5 shadow-sm">
            <h3 className="text-2xl font-black text-slate-950">Follow us for daily insights</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Join our community across platforms and stay up to date with the latest news, research and events.</p>
            <div className="mt-5 space-y-3">
              {channels.map((ch) => {
                const presentation = getChannelPresentation(ch.name);
                const Icon = ch.icon || presentation.icon;
                return (
                  <button
                    key={ch.id || ch.itemKey || ch.name}
                    onClick={() => openContent(ch, onOpenContent)} className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 text-left text-sm font-bold shadow-sm transition hover:shadow-md">
                    <span className="flex items-center gap-3"><Icon className={`h-5 w-5 ${ch.color || presentation.color}`} />{ch.name}</span>
                    <span className="text-blue-700">{ch.action}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => onOpenContent({ title: "All channels" })} className="mt-5 inline-flex items-center text-sm font-black text-teal-700">
              View all channels <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function EditorPicks({ onOpenContent, editorPicks }) {
  return (
    <section className="bg-white px-5 py-2 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-black text-slate-950">Editor’s picks</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {editorPicks.map((item) => {
            const Icon = item.icon || getEditorIcon(item.iconType || item.type);
            return (
              <button
                key={item.id || item.itemKey || item.title}
                onClick={() => openContent(item, onOpenContent)}
                className="grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 xl:grid-cols-1">
                <div className="relative h-24 overflow-hidden rounded-xl bg-slate-100 xl:h-28">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={
                        item.imageAlt ||
                        item.title ||
                        ""
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-violet-100 to-slate-200" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/5 to-slate-950/25" />
                </div>
                <div className="p-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[10px] font-black text-violet-700">
                    <Icon className="h-3 w-3" />{item.type}
                  </span>
                  <h3 className="mt-2 text-sm font-black leading-5 text-slate-950">{item.title}</h3>
                  <p className="mt-2 inline-flex items-center text-xs font-black text-teal-700">{item.cta} <ArrowRight className="ml-1 h-3 w-3" /></p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnerContent({ onOpenContent, partnerContent }) {
  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-950">
            From our partners
          </h2>
          <button
            type="button"
            onClick={() => onOpenContent({ title: "Partner content" })}
            className="inline-flex items-center text-sm font-black text-teal-700"
          >
            View all partner content
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {partnerContent.map((item) => (
            <button
              key={item.id || item.itemKey || item.title}
              type="button"
              onClick={() => openContent(item, onOpenContent)}
              className="relative min-h-[150px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-5 text-left text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title || ""}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-950" />
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/5 to-slate-950/90" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-white/90 px-2 py-1 text-sm font-black text-slate-950">
                    {item.partner}
                  </span>
                  <span className="rounded-full bg-teal-100 px-2 py-1 text-[10px] font-black text-teal-800">
                    {item.type}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-black leading-tight">
                  {item.title}
                </h3>

                <p className="mt-3 inline-flex items-center text-sm font-bold text-emerald-300">
                  {item.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events({ onOpenContent, events }) {
  return (
    <section className="bg-white px-5 py-3 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-950">
            Upcoming events & webinars
          </h2>
          <button
            type="button"
            onClick={() => onOpenContent({ title: "Events and webinars" })}
            className="inline-flex items-center text-sm font-black text-teal-700"
          >
            View all events
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {events.map((event) => {
            const displayDate = getEventDisplayDate(event);

            return (
              <article
                key={event.id || event.itemKey || event.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {event.image && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.imageAlt || event.title || ""}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex gap-4">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-violet-50 text-center text-violet-700">
                      <CalendarDays className="h-7 w-7" />
                      <div>
                        <p className="text-xl font-black leading-none">
                          {displayDate.day}
                        </p>
                        <p className="text-xs font-black">
                          {displayDate.month}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-black text-violet-700">
                        {event.type}
                      </span>
                      <h3 className="mt-2 font-black leading-tight text-slate-950">
                        {event.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openContent(event, onOpenContent)}
                    className="mt-5 w-full rounded-xl border border-violet-400 px-4 py-3 text-sm font-black text-violet-700 transition hover:bg-violet-50"
                  >
                    {event.action || event.cta || "Learn more"}
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuickActions({ onSubscribe, onOpenContent, quickActions }) {
  return (
    <section id="contact" className="bg-white px-5 pb-14 pt-5 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-1 overflow-hidden rounded-3xl bg-[#06112e] p-5 text-white shadow-2xl md:grid-cols-5">
        {quickActions.map((action, index) => {
          const actionType = action.actionType || action.action || action.itemKey || action.id || (index === 0 ? "subscribe" : "");
          const presentation = getQuickActionPresentation(actionType);
          const Icon = action.icon || presentation.icon;
          const color = action.color || presentation.color;
          const click = actionType === "subscribe" || index === 0 ? onSubscribe : () => openContent(action, onOpenContent);
          return (
            <div key={action.title} className="border-white/10 p-5 md:border-l first:md:border-l-0">
              <Icon className="h-9 w-9 text-teal-300" />
              <h3 className="mt-4 text-lg font-black">{action.title}</h3>
              <p className="mt-2 min-h-[48px] text-sm leading-6 text-white/68">{action.text}</p>
              <button onClick={click} className={`mt-4 rounded-full bg-gradient-to-r ${color} px-5 py-2 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]`}>
                {action.cta} <ArrowRight className="ml-2 inline h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContentModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 p-5 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} className="max-w-xl rounded-3xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Preview</p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">{item.title || item.name}</h2>
              </div>
              <button onClick={onClose} className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-5 leading-7 text-slate-600">{item.description || item.text || "Add a destination URL in the CMS to link this item to its social post, article, partner story, webinar registration page, or embedded media."}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer" className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 px-5 py-3 font-black text-white">
                  <ExternalLink className="mr-2 inline h-4 w-4" /> Open content
                </a>
              )}
              <button onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SubscribeModal({ open, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please confirm that you agree to receive email updates.");
      return;
    }
    try {
      setError("");
      setSubmitting(true);
      await onSubmit(normalizedEmail, consent);
      setEmail("");
      setConsent(false);
    } catch (submissionError) {
      setError(submissionError?.message || "We could not complete your subscription.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 p-5 backdrop-blur-sm" onClick={onClose}>
          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} className="max-w-lg rounded-3xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Subscribe</p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">Get Smart Net Zero updates</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-2 hover:bg-slate-50"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-4 leading-7 text-slate-600">Receive the latest insights, social updates, research, events and partner stories.</p>
            <label className="relative mt-6 block">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" disabled={submitting} className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none focus:border-teal-400 disabled:bg-slate-100" />
            </label>
            <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-600">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} disabled={submitting} className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600" />
              <span>I agree to receive Smart Net Zero news, insights and event updates by email. I understand that I can unsubscribe at any time.</span>
            </label>
            {error && <p className="mt-2 text-sm font-bold text-pink-600">{error}</p>}
            <button type="submit" disabled={submitting} className="mt-5 w-full rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 px-5 py-4 font-black text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Subscribing…" : "Subscribe now"}</button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-2xl border border-teal-200 bg-white px-5 py-4 text-sm font-bold text-slate-900 shadow-2xl">
          <CheckCircle2 className="mr-2 inline h-5 w-5 text-teal-600" /> {message}
          <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-700">Dismiss</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SocialMedia({ goToPage, openEnquiryForm }) {
  useEffect(() => {
    document.title = "Content Hub | Smart Net Zero";
  }, []);

  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useSocialHubContent();
  const [content, setContent] = useState(null);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [toast, setToast] = useState("");

  const pageItems = getCmsSection(cmsContent, ["page", "pageSettings", "settings"]);
  const pageSettings = { ...fallbackPageSettings, ...(pageItems[0] || {}) };

  const cmsHeroCards = getCmsSection(cmsContent, ["heroCards", "hero_cards"]);
  const cmsChannelPosts = getCmsSection(cmsContent, ["channelPosts", "channel_posts", "socialPosts", "social_posts"]);
  const cmsEditorPicks = getCmsSection(cmsContent, ["editorPicks", "editor_picks"]);
  const cmsPartnerContent = getCmsSection(cmsContent, ["partnerContent", "partner_content"]);
  const cmsEvents = getCmsSection(cmsContent, ["events"]);
  const cmsQuickActions = getCmsSection(cmsContent, ["quickActions", "quick_actions"]);
  const cmsChannels = getCmsSection(cmsContent, ["channels", "socialChannels"]);

  const heroCards = cmsHeroCards.length ? cmsHeroCards : fallbackHeroCards;
  const channelPosts = cmsChannelPosts.length ? cmsChannelPosts : fallbackChannelPosts;
  const editorPicks = cmsEditorPicks.length ? cmsEditorPicks : fallbackEditorPicks;
  const partnerContent = cmsPartnerContent.length ? cmsPartnerContent : fallbackPartnerContent;
  const events = cmsEvents.length ? cmsEvents : fallbackEvents;
  const quickActions = cmsQuickActions.length ? cmsQuickActions : fallbackQuickActions;
  const channels = cmsChannels.length ? cmsChannels : fallbackChannels;

  const subscribe = async (email, consent) => {
    await subscribeToUpdates(email, consent);
    setSubscribeOpen(false);
    setToast(`Subscribed ${email}. You’ll receive Smart Net Zero updates.`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="SocialMedia"
      />

      {cmsLoading && (
        <div className="border-b border-sky-100 bg-sky-50 px-5 py-2 text-center text-xs font-bold text-sky-800">
          Loading the latest Smart Net Zero content…
        </div>
      )}

      {cmsError && (
        <div className="border-b border-amber-200 bg-amber-50 px-5 py-2 text-center text-xs font-bold text-amber-900">
          Live CMS content is temporarily unavailable. Saved fallback content is being displayed.
        </div>
      )}

      <main>
        <Hero onOpenContent={setContent} pageSettings={pageSettings} heroCards={heroCards} />
        <LatestChannels onOpenContent={setContent} channelPosts={channelPosts} channels={channels} />
        <EditorPicks onOpenContent={setContent} editorPicks={editorPicks} />
        <PartnerContent onOpenContent={setContent} partnerContent={partnerContent} />
        <Events onOpenContent={setContent} events={events} />
        <QuickActions
          onSubscribe={() => setSubscribeOpen(true)}
          onOpenContent={setContent}
          quickActions={quickActions}
        />
      </main>

      <ContentModal item={content} onClose={() => setContent(null)} />
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} onSubmit={subscribe} />
      <Toast message={toast} onClose={() => setToast("")} />
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}
