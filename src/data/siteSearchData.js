const siteSearchData = [
  {
    title: "Sustainability & Net Zero",
    page: "SustainabilityNetZero",
    category: "Service",
    description:
      "Decarbonisation strategy, ESG support, carbon reduction planning and net zero delivery.",
    headings: [
      "Sustainability and Net Zero",
      "Net Zero Roadmaps and Strategy",
      "Carbon Reduction Planning",
      "Climate Risk and Resilience",
      "ESG and Sustainability Reporting",
    ],
    content: [
      "Develop practical and prioritised pathways towards net zero.",
      "Assess operational emissions, energy use, buildings, assets and supply-chain impacts.",
      "Translate sustainability ambitions into funded and deliverable programmes.",
      "Support carbon baselining, target setting, transition planning and emissions reporting.",
      "Identify energy-efficiency, renewable-energy and estate decarbonisation opportunities.",
      "Integrate climate resilience, sustainability and operational risk.",
    ],
    keywords: [
      "net zero",
      "decarbonisation",
      "carbon",
      "emissions",
      "ESG",
      "sustainability",
      "climate risk",
      "transition plan",
      "carbon reduction plan",
      "roadmap",
    ],
  },

  {
    title: "OT Security & Resilience",
    page: "OTSecurityResilience",
    category: "Service",
    description:
      "Operational technology security, critical infrastructure resilience and risk management.",
    headings: [
      "OT Security and Resilience",
      "Secure by Design Smart Infrastructure",
      "Operational Technology Risk",
      "Asset Visibility",
      "Incident Response and Recovery",
    ],
    content: [
      "Secure operational technology, industrial control systems and connected infrastructure.",
      "Improve visibility across OT, IoT, building controls, telemetry and connected assets.",
      "Assess cyber risk without compromising safety, availability or operational continuity.",
      "Support IEC 62443, NIS2, NCSC CAF and sector-specific assurance requirements.",
      "Develop OT incident response, recovery and continuity arrangements.",
      "Embed security into smart-building and critical-infrastructure programmes.",
    ],
    keywords: [
      "OT",
      "operational technology",
      "IoT",
      "industrial control systems",
      "ICS",
      "SCADA",
      "IEC 62443",
      "NIS2",
      "NCSC CAF",
      "cyber resilience",
      "critical infrastructure",
      "asset visibility",
    ],
  },

  {
    title: "Smart Energy Management",
    page: "SmartEnergyManagement",
    category: "Service",
    description:
      "Real-time energy insight, optimisation, automation and smarter operational performance.",
    headings: [
      "Smart Energy Management",
      "Energy Data and Analytics",
      "Building Performance",
      "Connected Asset Optimisation",
      "Energy Monitoring",
    ],
    content: [
      "Use energy, building and asset data to improve operational performance.",
      "Identify avoidable energy consumption and performance gaps.",
      "Connect meters, sensors, building management systems and operational platforms.",
      "Create actionable dashboards, alerts and performance insights.",
      "Support energy optimisation across individual sites and building portfolios.",
      "Align energy savings with carbon-reduction and investment priorities.",
    ],
    keywords: [
      "energy management",
      "energy monitoring",
      "BMS",
      "building management system",
      "meters",
      "sensors",
      "analytics",
      "energy optimisation",
      "building performance",
      "connected assets",
    ],
  },

  {
    title: "Smart Regulations & Compliance",
    page: "SmartRegulations",
    category: "Service",
    description:
      "Connected-device compliance, product security and smart infrastructure regulation advisory.",
    headings: [
      "Smart Regulations",
      "Connected Product Compliance",
      "Cyber Resilience Act",
      "PSTI",
      "Radio Equipment Directive",
      "Secure by Design",
    ],
    content: [
      "Support manufacturers and technology providers with connected-product regulation.",
      "Understand obligations under the Cyber Resilience Act, PSTI and Radio Equipment Directive.",
      "Prepare product-security evidence, technical documentation and compliance plans.",
      "Align product design, testing, vulnerability management and market-access requirements.",
      "Improve assurance across connected devices, IoT products and smart infrastructure.",
    ],
    keywords: [
      "CRA",
      "Cyber Resilience Act",
      "PSTI",
      "RED",
      "Radio Equipment Directive",
      "EN 18031",
      "EN 303 645",
      "product security",
      "market access",
      "connected products",
    ],
  },

  {
    title: "Smart Decarbonisation 360",
    page: "SmartDecarb360",
    category: "Solution",
    description:
      "Building decarbonisation planning, optimisation and investment prioritisation.",
    headings: [
      "Smart Decarbonisation 360",
      "Building Retrofit Optimisation",
      "Investment Sequencing",
      "Carbon and Energy Modelling",
    ],
    content: [
      "Assess and prioritise building retrofit measures across complex portfolios.",
      "Compare cost, carbon, energy, risk and operational benefits.",
      "Create phased implementation plans aligned with budgets and asset strategies.",
      "Identify no-regret actions and longer-term capital investment priorities.",
    ],
    keywords: [
      "retrofit",
      "building decarbonisation",
      "optimisation",
      "investment",
      "carbon modelling",
      "energy modelling",
      "portfolio planning",
    ],
  },

  {
    title: "Built Environment",
    page: "BuiltEnvironment",
    category: "Industry",
    description:
      "Smarter, more secure and lower-carbon buildings, estates and infrastructure.",
    headings: [
      "Built Environment",
      "Commercial Buildings",
      "Estates and Portfolios",
      "Smart Buildings",
      "Building Retrofit",
    ],
    content: [
      "Support owners, operators and occupiers across the built environment.",
      "Improve building energy performance, resilience and connected-asset security.",
      "Develop decarbonisation plans for estates and property portfolios.",
      "Integrate sustainability, building controls, data and operational assurance.",
    ],
    keywords: [
      "buildings",
      "property",
      "estates",
      "facilities management",
      "commercial buildings",
      "smart buildings",
      "retrofit",
    ],
  },

  {
    title: "Public Sector & Local Authorities",
    page: "PublicSectorLocalAuthorities",
    category: "Industry",
    description:
      "Sustainable, secure and resilient public estates and infrastructure.",
    headings: [
      "Public Sector",
      "Local Authorities",
      "Public Estates",
      "Civic Infrastructure",
    ],
    content: [
      "Support local authorities and public bodies with estate decarbonisation.",
      "Develop investable programmes for public buildings and infrastructure.",
      "Improve cyber resilience across connected public assets and operational environments.",
      "Support governance, compliance and evidence-based decision making.",
    ],
    keywords: [
      "public sector",
      "local authority",
      "council",
      "public buildings",
      "public estates",
      "civic infrastructure",
    ],
  },

  {
    title: "Manufacturers & Connected Products",
    page: "ManufacturersConnectedProducts",
    category: "Industry",
    description:
      "Connected-device security, product compliance and market readiness.",
    headings: [
      "Manufacturers",
      "Connected Products",
      "IoT Product Security",
      "Product Compliance",
    ],
    content: [
      "Help manufacturers prepare connected products for UK and European markets.",
      "Integrate cybersecurity, compliance testing and technical evidence.",
      "Reduce regulatory delay, redesign risk and market-access uncertainty.",
      "Support secure product development and vulnerability-management processes.",
    ],
    keywords: [
      "manufacturer",
      "IoT",
      "connected device",
      "product security",
      "compliance testing",
      "market readiness",
    ],
  },

  {
    title: "Energy, Utilities & Critical Infrastructure",
    page: "EnergyUtilitiesCriticalInfrastructure",
    category: "Industry",
    description:
      "Operational resilience, OT security and energy optimisation for critical environments.",
    headings: [
      "Energy and Utilities",
      "Critical Infrastructure",
      "Operational Resilience",
      "OT Security",
      "Connected Infrastructure",
    ],
    content: [
      "Support energy, utility and infrastructure operators with secure digital transformation.",
      "Improve resilience across operational technology and connected field assets.",
      "Assess dependencies, vulnerabilities and continuity risks.",
      "Optimise energy, carbon and infrastructure performance.",
    ],
    keywords: [
      "energy",
      "utilities",
      "critical infrastructure",
      "water",
      "electricity",
      "networks",
      "OT security",
      "operational resilience",
    ],
  },

  {
    title: "Data Centres",
    page: "DataCentres",
    category: "Industry",
    description:
      "Performance, resilience, energy and sustainability support for data-centre environments.",
    headings: [
      "Data Centres",
      "Energy Performance",
      "Operational Resilience",
      "Cooling Optimisation",
      "Critical Systems",
    ],
    content: [
      "Improve data-centre efficiency, resilience and environmental performance.",
      "Assess cooling, energy, controls and connected infrastructure.",
      "Support secure and reliable operation of critical building systems.",
      "Align capacity planning with energy, carbon and operational priorities.",
    ],
    keywords: [
      "data centre",
      "data center",
      "cooling",
      "PUE",
      "critical systems",
      "resilience",
      "energy efficiency",
    ],
  },

  {
    title: "Research & Insights",
    page: "Research",
    category: "Page",
    description:
      "Applied research, innovation programmes and evidence-led insight.",
    headings: [
      "Research",
      "Innovation",
      "Insights",
      "Applied Research",
    ],
    content: [
      "Explore research into sustainability, smart infrastructure and cybersecurity.",
      "Translate evidence and emerging technologies into practical applications.",
      "Work with academic, industry and delivery partners on innovation programmes.",
    ],
    keywords: [
      "research",
      "innovation",
      "evidence",
      "academic",
      "insights",
      "studies",
    ],
  },

  {
    title: "About Smart Net Zero",
    page: "AboutUs",
    category: "Page",
    description:
      "Our organisation, leadership team, approach and partner network.",
    headings: [
      "About Us",
      "Our Story",
      "Leadership",
      "Partner Network",
    ],
    content: [
      "Learn about Smart Net Zero and our integrated approach to sustainability and security.",
      "Meet the leadership team and specialist delivery partners.",
      "Discover how our partner network expands technology, engineering and assurance capability.",
    ],
    keywords: [
      "about",
      "leadership",
      "team",
      "partners",
      "company",
      "our story",
    ],
  },

  {
    title: "Careers",
    page: "Careers",
    category: "Page",
    description:
      "Career opportunities with Smart Net Zero.",
    headings: [
      "Careers",
      "Work With Us",
      "Current Opportunities",
    ],
    content: [
      "Explore opportunities to work across sustainability, security, energy and smart infrastructure.",
      "Join a multidisciplinary organisation focused on real-world outcomes.",
    ],
    keywords: [
      "jobs",
      "vacancies",
      "employment",
      "career",
      "work with us",
    ],
  },

  {
    title: "Content Hub",
    page: "SocialMedia",
    category: "Page",
    description:
      "News, articles, updates and social content from Smart Net Zero.",
    headings: [
      "Content Hub",
      "News",
      "Updates",
      "Articles",
    ],
    content: [
      "Read news and commentary from Smart Net Zero.",
      "Explore updates covering sustainability, cybersecurity, energy and regulation.",
    ],
    keywords: [
      "news",
      "articles",
      "updates",
      "social media",
      "content",
    ],
  },
];

export default siteSearchData;
