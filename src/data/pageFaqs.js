export const pageFaqs = {
  SustainabilityNetZero: {
    eyebrow: "Frequently asked questions",
    title: "Common guidance before starting a net zero journey",
    text:
      "Questions organisations often ask when moving from sustainability ambition to practical action, investment planning and measurable delivery.",
    faqs: [
      {
        question: "Where should we start with sustainability and net zero?",
        answer:
          "Most organisations should start by understanding their current emissions, energy use, asset performance, operational priorities and reporting obligations. This creates a clear baseline before moving into roadmaps, investment planning or delivery programmes.",
      },
      {
        question: "How do we know which carbon reduction actions to prioritise?",
        answer:
          "The best priorities are usually based on a combination of carbon impact, cost, feasibility, asset condition, operational disruption, compliance requirements and available funding. This helps avoid fragmented activity and focuses investment on the actions that can deliver the strongest overall value.",
      },
      {
        question: "Can Smart Net Zero help with ESG, board and stakeholder reporting?",
        answer:
          "Yes. Smart Net Zero can help improve the quality of carbon, energy, ESG and sustainability reporting by strengthening the underlying evidence, data quality, KPI structure, governance and assurance readiness. This gives leadership teams and stakeholders more confidence in the information being reported.",
      },
      {
        question: "Is this only relevant for large estates and building portfolios?",
        answer:
          "No. The approach can support single organisations, multi-site estates, public-sector bodies, developers, investors, asset owners and operational businesses. The scope can be scaled from an initial baseline review through to a full net zero roadmap, delivery plan or ongoing monitoring model.",
      },
      {
        question: "How does sustainability connect with smart infrastructure?",
        answer:
          "Sustainability outcomes increasingly depend on better energy data, connected assets, building systems, automation, monitoring and resilient infrastructure. Smart Net Zero connects sustainability, energy, smart building performance and infrastructure intelligence so organisations can reduce emissions while improving operational control.",
      },
    ],
  },

  OTSecurityResilience: {
    eyebrow: "Frequently asked questions",
    title: "Common OT security and resilience questions",
    text:
      "Questions organisations often ask when protecting operational technology, connected infrastructure and critical systems.",
    ctaLabel: "Ask Smart Net Zero",
    faqs: [
      {
        question: "What is OT security?",
        answer:
          "OT security protects operational technology, control systems, connected assets and industrial environments from cyber, operational and resilience risks.",
      },
      {
        question: "Why is OT different from normal IT security?",
        answer:
          "OT environments often control physical processes, buildings, infrastructure or industrial systems, so security decisions must consider safety, uptime, availability and operational continuity as well as confidentiality.",
      },
    ],
  },

  SmartEnergyManagement: {
    eyebrow: "Frequently asked questions",
    title: "Common smart energy management questions",
    text:
      "Questions organisations often ask when trying to reduce energy waste, improve visibility and optimise building performance.",
    ctaLabel: "Ask Smart Net Zero",
    faqs: [
      {
        question: "How can smart energy management reduce costs?",
        answer:
          "Smart energy management uses metering, monitoring, analytics and controls to identify waste, improve performance and reduce avoidable energy consumption.",
      },
      {
        question: "Do we need new equipment to start?",
        answer:
          "Not always. Many organisations can begin by reviewing existing meters, building systems, controls, invoices and operational data before deciding where new technology is needed.",
      },
    ],
  },

  SmartRegulations: {
    eyebrow: "Frequently asked questions",
    title: "Common compliance and regulation questions",
    text:
      "Questions organisations often ask when managing connected product security, smart infrastructure regulation and compliance evidence.",
    ctaLabel: "Ask Smart Net Zero",
    faqs: [
      {
        question: "What type of compliance support can Smart Net Zero provide?",
        answer:
          "Smart Net Zero can support connected device compliance, product security evidence, regulatory readiness, technical documentation and smart infrastructure assurance.",
      },
      {
        question: "When should compliance be considered?",
        answer:
          "Compliance should be considered as early as possible, ideally during product design, system planning or procurement, rather than being treated as a final-stage review.",
      },
    ],
  },
};

export function getPageFaqs(pageKey) {
  return pageFaqs[pageKey] || null;
}