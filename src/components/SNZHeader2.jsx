import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Menu,
  Scale,
  Search,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

import siteSearchData from "../data/siteSearchData";

export default function SNZHeader({
  goToPage,
  openEnquiryForm,
  activePage,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);

  const navItems = [
    ["Home", false],
    ["Services", true],
    ["Solutions", true],
    ["Industries", true],
    ["Research", false],
    ["About Us", false],
    ["Careers", false],
  ];

  const serviceDefinitions = {
    sustainability: {
      label: "Sustainability & Net Zero",
      shortLabel: "Net Zero",
      icon: Leaf,
      page: "SustainabilityNetZero",
      classes:
        "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
    },

    security: {
      label: "OT Security & Resilience",
      shortLabel: "OT Security",
      icon: ShieldCheck,
      page: "OTSecurityResilience",
      classes:
        "border-sky-300/25 bg-sky-300/10 text-sky-200",
    },

    energy: {
      label: "Smart Energy Management",
      shortLabel: "Energy",
      icon: Zap,
      page: "SmartEnergyManagement",
      classes:
        "border-amber-300/25 bg-amber-300/10 text-amber-200",
    },

    compliance: {
      label: "Smart Regulations & Compliance",
      shortLabel: "Compliance",
      icon: Scale,
      page: "SmartRegulations",
      classes:
        "border-violet-300/25 bg-violet-300/10 text-violet-200",
    },
  };

  const menuContent = {
    Services: [
      {
        title: "Sustainability & Net Zero",
        text: "Decarbonisation strategy, ESG support, carbon reduction planning and net zero delivery.",
        page: "SustainabilityNetZero",
        icon: Leaf,
      },
      {
        title: "OT Security & Resilience",
        text: "Operational technology security, critical infrastructure resilience and risk management.",
        page: "OTSecurityResilience",
        icon: ShieldCheck,
      },
      {
        title: "Smart Energy Management",
        text: "Real-time energy insight, optimisation, automation and smarter operational performance.",
        page: "SmartEnergyManagement",
        icon: Zap,
      },
      {
        title: "Smart Regulations & Compliance",
        text: "Connected device compliance, product security and smart infrastructure regulation advisory.",
        page: "SmartRegulations",
        icon: Scale,
      },
    ],

    Solutions: [
      {
        title: "Decarbonisation Optimisation",
        text: "Prioritise measures, sequence investment and create an optimised decarbonisation pathway using SmartDecarb360.",
        page: "SmartDecarb360",
        services: ["sustainability", "energy"],
        keywords: [
          "decarbonisation optimisation",
          "SmartDecarb360",
          "retrofit planning",
          "investment sequencing",
          "net zero pathway",
        ],
      },
      {
        title: "Smart Applications & Digital Tools",
        text: "Use digital applications, connected data and decision-support tools to improve sustainability, energy and infrastructure outcomes.",
        page: "SmartApplications",
        services: ["sustainability", "energy"],
        keywords: [
          "smart applications",
          "digital tools",
          "decision support",
          "data analytics",
          "connected data",
        ],
      },
      {
        title: "Specialist Consultancy",
        text: "Access multidisciplinary advisory, assessment and implementation support across all four service areas.",
        page: "SpecialistConsultancy",
        services: [
          "sustainability",
          "security",
          "energy",
          "compliance",
        ],
        keywords: [
          "specialist consultancy",
          "advisory",
          "strategy",
          "assessment",
          "implementation support",
        ],
      },
      {
        title: "Lab Testing & Product Compliance",
        text: "Test connected products, review technical evidence and support compliance with cybersecurity and smart-product regulations.",
        page: "LabTestingCompliance",
        services: ["compliance", "security"],
        keywords: [
          "lab testing",
          "product testing",
          "connected products",
          "cybersecurity compliance",
          "technical evidence",
        ],
      },
      {
        title: "Smart Infrastructure Assurance",
        text: "Assess connected assets, operational technology and smart infrastructure for security, resilience and regulatory compliance.",
        page: "SmartInfrastructureAssurance",
        services: ["security", "compliance"],
        keywords: [
          "smart infrastructure assurance",
          "secure by design",
          "OT assurance",
          "connected assets",
          "resilience",
        ],
      },
      {
        title: "Energy Performance Optimisation",
        text: "Use monitoring, analytics and intelligent controls to improve building, asset and operational energy performance.",
        page: "EnergyOptimisation",
        services: ["energy", "sustainability"],
        keywords: [
          "energy optimisation",
          "energy performance",
          "monitoring",
          "analytics",
          "building controls",
        ],
      },
    ],

    Industries: [
      {
        title: "Built Environment",
        text: "Supporting buildings, estates and infrastructure portfolios to become smarter and lower carbon.",
        page: "BuiltEnvironment",
      },
      {
        title: "Public Sector & Local Authorities",
        text: "Helping public organisations plan, assure and deliver sustainable infrastructure.",
        page: "PublicSectorLocalAuthorities",
      },
      {
        title: "Manufacturers & Connected Products",
        text: "Helping product companies understand connected device security and compliance obligations.",
        page: "ManufacturersConnectedProducts",
      },
      {
        title: "Energy, Utilities & Critical Infrastructure",
        text: "Supporting resilient, secure and optimised operational environments.",
        page: "EnergyUtilitiesCriticalInfrastructure",
      },
      {
        title: "Data Centres",
        text: "Plan, operate and optimise data centre environments for maximum performance, resilience and sustainability.",
        page: "DataCentres",
      },
    ],
  };

  const directPages = [
    {
      title: "Home",
      page: "Homepage",
      category: "Page",
      description: "Return to the Smart Net Zero homepage.",
      headings: ["Smart Net Zero"],
      content: [
        "Explore Smart Net Zero services, solutions, industries and insight.",
      ],
      keywords: ["home", "homepage", "SNZ", "Smart Net Zero"],
    },
    {
      title: "Research",
      page: "Research",
      category: "Page",
      description:
        "Explore applied research, innovation projects and evidence-led insight.",
      headings: ["Research", "Innovation", "Insights"],
      content: [
        "Research into sustainability, smart infrastructure, energy and cybersecurity.",
      ],
      keywords: ["research", "innovation", "studies", "insights"],
    },
    {
      title: "About Us",
      page: "AboutUs",
      category: "Page",
      description:
        "Learn about Smart Net Zero, our leadership team and partner network.",
      headings: ["About Us", "Our Story", "Leadership", "Partners"],
      content: [
        "Meet the Smart Net Zero leadership team and specialist delivery partners.",
      ],
      keywords: ["about", "team", "leadership", "partners", "company"],
    },
    {
      title: "Careers",
      page: "Careers",
      category: "Page",
      description:
        "Explore career opportunities and work with Smart Net Zero.",
      headings: ["Careers", "Current Opportunities", "Work With Us"],
      content: [
        "Join a multidisciplinary team working across sustainability, security and smart infrastructure.",
      ],
      keywords: ["jobs", "careers", "vacancies", "employment"],
    },
    {
      title: "Content Hub",
      page: "SocialMedia",
      category: "Page",
      description:
        "Read Smart Net Zero news, updates, articles and social content.",
      headings: ["Content Hub", "News", "Articles", "Updates"],
      content: [
        "Explore news and commentary covering sustainability, cybersecurity, energy and regulation.",
      ],
      keywords: ["news", "articles", "content", "social media", "updates"],
    },
  ];

  const dropdownSearchItems = useMemo(
    () =>
      Object.entries(menuContent).flatMap(([category, items]) =>
        items.map((item) => ({
          ...item,
          category,
          description: item.text,
          headings: [item.title],
          content: [item.text],
          keywords: item.keywords || [],
        }))
      ),
    []
  );

  const searchItems = useMemo(() => {
    const combinedItems = [
      ...siteSearchData,
      ...directPages,
      ...dropdownSearchItems,
    ];

    const uniqueItems = new Map();

    combinedItems.forEach((item) => {
      const key = `${item.page}-${item.title}`;

      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, item);
      } else {
        const existingItem = uniqueItems.get(key);

        uniqueItems.set(key, {
          ...existingItem,
          ...item,
          headings: [
            ...(existingItem.headings || []),
            ...(item.headings || []),
          ],
          content: [
            ...(existingItem.content || []),
            ...(item.content || []),
          ],
          keywords: [
            ...(existingItem.keywords || []),
            ...(item.keywords || []),
          ],
        });
      }
    });

    return Array.from(uniqueItems.values());
  }, [dropdownSearchItems]);

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return searchItems.slice(0, 9);
    }

    const queryWords = query.split(/\s+/).filter(Boolean);

    return searchItems
      .map((item) => {
        const title = item.title?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";

        const headings = item.headings || [];
        const content = item.content || [];
        const keywords = item.keywords || [];

        const searchableText = [
          item.title,
          item.description,
          item.text,
          item.category,
          ...headings,
          ...content,
          ...keywords,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        let score = 0;

        if (title === query) score += 160;
        if (title.startsWith(query)) score += 100;
        if (title.includes(query)) score += 70;
        if (category.includes(query)) score += 30;

        if (
          headings.some((heading) =>
            heading.toLowerCase().includes(query)
          )
        ) {
          score += 50;
        }

        if (
          keywords.some((keyword) =>
            keyword.toLowerCase().includes(query)
          )
        ) {
          score += 40;
        }

        if (
          content.some((paragraph) =>
            paragraph.toLowerCase().includes(query)
          )
        ) {
          score += 30;
        }

        if (searchableText.includes(query)) {
          score += 20;
        }

        queryWords.forEach((word) => {
          if (title.includes(word)) score += 18;

          if (
            headings.some((heading) =>
              heading.toLowerCase().includes(word)
            )
          ) {
            score += 12;
          }

          if (
            keywords.some((keyword) =>
              keyword.toLowerCase().includes(word)
            )
          ) {
            score += 10;
          }

          if (searchableText.includes(word)) {
            score += 4;
          }
        });

        return {
          ...item,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }, [searchItems, searchQuery]);

  const navigateToPage = (page, beforeNavigate) => {
    beforeNavigate?.();

    if (page && goToPage) {
      goToPage(page);
    }

    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (label, hasDropdown) => {
    if (hasDropdown) {
      setActiveMenu((current) =>
        current === label ? null : label
      );
      return;
    }

    const pageMap = {
      Home: "Homepage",
      Research: "Research",
      "About Us": "AboutUs",
      Careers: "Careers",
    };

    navigateToPage(pageMap[label]);
  };

  const isActive = (label) => {
    const pageMap = {
      Home: "Homepage",
      Research: "Research",
      "About Us": "AboutUs",
      Careers: "Careers",
    };

    return pageMap[label] === activePage;
  };

  const openSearch = () => {
    setSearchOpen(true);
    setSearchQuery("");
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navigateToSearchResult = (item) => {
    navigateToPage(item.page, item.beforeNavigate);
    closeSearch();
  };

  const getSearchExcerpt = (item) => {
    const query = searchQuery.trim().toLowerCase();

    const possibleMatches = [
      ...(item.headings || []),
      ...(item.content || []),
      item.description || item.text || "",
    ].filter(Boolean);

    if (!query) {
      return item.description || item.text || possibleMatches[0] || "";
    }

    const exactMatch = possibleMatches.find((text) =>
      text.toLowerCase().includes(query)
    );

    if (exactMatch) {
      return exactMatch;
    }

    const queryWords = query.split(/\s+/).filter(Boolean);

    const partialMatch = possibleMatches.find((text) =>
      queryWords.some((word) =>
        text.toLowerCase().includes(word)
      )
    );

    return (
      partialMatch ||
      item.description ||
      item.text ||
      "Open this page to learn more."
    );
  };

  const highlightText = (text) => {
    const query = searchQuery.trim();

    if (!query || !text) {
      return text;
    }

    const escapedQuery = query.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const parts = text.split(
      new RegExp(`(${escapedQuery})`, "gi")
    );

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-teal-300/20 px-0.5 text-teal-200"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      const userIsTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (event.key === "/" && !userIsTyping) {
        event.preventDefault();
        openSearch();
      }

      if (event.key === "Escape") {
        closeSearch();
        setMobileMenuOpen(false);
        setActiveMenu(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06112e]/95 text-white backdrop-blur-xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <button
            type="button"
            onClick={() => navigateToPage("Homepage")}
            className="flex cursor-pointer items-center"
            aria-label="Smart Net Zero home"
          >
            <img
              src="/snzlogo.png"
              alt="Smart Net Zero"
              className="h-14 w-auto max-w-[130px] object-contain sm:h-16 lg:h-16"
              loading="eager"
            />
          </button>

          <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
            {navItems.map(([label, hasDropdown]) => (
              <button
                key={label}
                type="button"
                onClick={() =>
                  handleNavClick(label, hasDropdown)
                }
                className={`relative flex cursor-pointer items-center gap-1.5 transition hover:text-white ${
                  isActive(label)
                    ? "text-white"
                    : "text-white/88"
                }`}
              >
                {label}

                {isActive(label) && (
                  <span className="absolute -bottom-5 left-0 h-0.5 w-full rounded-full bg-teal-300" />
                )}

                {hasDropdown && (
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      activeMenu === label
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                )}
              </button>
            ))}

            <button
              type="button"
              onClick={() => navigateToPage("SocialMedia")}
              className={`relative cursor-pointer transition hover:text-white ${
                activePage === "SocialMedia"
                  ? "text-white"
                  : "text-white/88"
              }`}
            >
              Content Hub

              {activePage === "SocialMedia" && (
                <span className="absolute -bottom-5 left-0 h-0.5 w-full rounded-full bg-teal-300" />
              )}
            </button>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the Smart Net Zero website"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-bold text-white/80 transition hover:border-teal-300/40 hover:bg-white/10 hover:text-white"
            >
              <Search className="h-5 w-5" />

              <span className="hidden xl:inline">Search</span>

              <span className="hidden rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/45 xl:inline">
                /
              </span>
            </button>

            <button
              type="button"
              onClick={openEnquiryForm}
              className="cursor-pointer rounded-2xl bg-gradient-to-r from-pink-600 to-violet-700 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-900/20 transition hover:scale-[1.02]"
            >
              Contact Us
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-xl border border-white/20 bg-white/5 p-2"
              aria-label="Search the Smart Net Zero website"
            >
              <Search className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((current) => !current)
              }
              className="rounded-xl border border-white/20 bg-white/5 p-2"
              aria-label={
                mobileMenuOpen ? "Close menu" : "Open menu"
              }
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {activeMenu && menuContent[activeMenu] && (
          <div className="hidden border-t border-white/10 bg-[#06112e]/98 shadow-2xl shadow-slate-950/30 lg:block">
            <div
              className={`mx-auto grid max-w-7xl px-8 py-6 ${
                activeMenu === "Industries"
                  ? "grid-cols-5 gap-3"
                  : activeMenu === "Solutions"
                    ? "gap-4 md:grid-cols-2 lg:grid-cols-3"
                    : "gap-5 md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {menuContent[activeMenu].map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`group rounded-2xl border border-white/10 bg-white/5 text-left transition hover:-translate-y-1 hover:border-teal-300/40 hover:bg-white/10 ${
                      activeMenu === "Industries"
                        ? "p-4"
                        : "p-5"
                    }`}
                  >
                    {activeMenu === "Solutions" &&
                      item.services?.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {item.services.map((serviceKey) => {
                            const service =
                              serviceDefinitions[serviceKey];

                            if (!service) {
                              return null;
                            }

                            const ServiceIcon = service.icon;

                            return (
                              <button
                                key={serviceKey}
                                type="button"
                                onClick={() =>
                                  navigateToPage(service.page)
                                }
                                title={`View ${service.label}`}
                                aria-label={`View ${service.label}`}
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.06em] transition hover:-translate-y-0.5 hover:brightness-125 ${service.classes}`}
                              >
                                <ServiceIcon className="h-3.5 w-3.5" />
                                {service.shortLabel}
                              </button>
                            );
                          })}
                        </div>
                      )}

                    <button
                      type="button"
                      onClick={() =>
                        navigateToPage(
                          item.page,
                          item.beforeNavigate
                        )
                      }
                      className="block w-full text-left"
                    >
                      {activeMenu === "Services" && ItemIcon && (
                        <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-teal-300/20 bg-teal-300/10 text-teal-200">
                          <ItemIcon className="h-5 w-5" />
                        </span>
                      )}

                      <h3
                        className={`font-black text-white ${
                          activeMenu === "Industries"
                            ? "text-[13px] leading-tight"
                            : "text-base"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-3 text-white/68 ${
                          activeMenu === "Industries"
                            ? "min-h-[72px] text-[11px] leading-5"
                            : activeMenu === "Solutions"
                              ? "min-h-[96px] text-sm leading-6"
                              : "min-h-[72px] text-sm leading-6"
                        }`}
                      >
                        {item.text}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigateToPage(
                          item.page,
                          item.beforeNavigate
                        )
                      }
                      className={`mt-4 inline-flex items-center font-black text-teal-300 ${
                        activeMenu === "Industries"
                          ? "text-xs"
                          : "text-sm"
                      }`}
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#06112e] px-5 pb-5 lg:hidden">
            <button
              type="button"
              onClick={openSearch}
              className="mt-4 flex w-full items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-bold text-white/85"
            >
              <Search className="h-5 w-5 text-teal-300" />
              Search the website
            </button>

            <div className="mt-2">
              {navItems.map(([label, hasDropdown]) => (
                <div key={label}>
                  <button
                    type="button"
                    onClick={() =>
                      handleNavClick(label, hasDropdown)
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold hover:bg-white/10 ${
                      isActive(label)
                        ? "text-teal-200"
                        : "text-white/90"
                    }`}
                  >
                    {label}

                    {hasDropdown && (
                      <ChevronDown
                        className={`h-4 w-4 transition ${
                          activeMenu === label
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </button>

                  {activeMenu === label &&
                    hasDropdown &&
                    menuContent[label] && (
                      <div className="mb-3 grid gap-2 rounded-2xl bg-white/5 p-3">
                        {menuContent[label].map((item) => {
                          const ItemIcon = item.icon;

                          return (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() =>
                                navigateToPage(
                                  item.page,
                                  item.beforeNavigate
                                )
                              }
                              className="rounded-xl p-3 text-left hover:bg-white/10"
                            >
                              {label === "Solutions" &&
                                item.services?.length > 0 && (
                                  <div className="mb-3 flex flex-wrap gap-1.5">
                                    {item.services.map(
                                      (serviceKey) => {
                                        const service =
                                          serviceDefinitions[
                                            serviceKey
                                          ];

                                        if (!service) {
                                          return null;
                                        }

                                        const ServiceIcon =
                                          service.icon;

                                        return (
                                          <span
                                            key={serviceKey}
                                            title={service.label}
                                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-black uppercase tracking-[0.05em] ${service.classes}`}
                                          >
                                            <ServiceIcon className="h-3 w-3" />
                                            {service.shortLabel}
                                          </span>
                                        );
                                      }
                                    )}
                                  </div>
                                )}

                              <div className="flex items-start gap-3">
                                {label === "Services" && ItemIcon && (
                                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-teal-300/20 bg-teal-300/10 text-teal-200">
                                    <ItemIcon className="h-4 w-4" />
                                  </span>
                                )}

                                <div className="min-w-0">
                                  <p className="text-sm font-black text-white">
                                    {item.title}
                                  </p>

                                  <p className="mt-1 text-xs leading-5 text-white/65">
                                    {item.text}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  navigateToPage("SocialMedia")
                }
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold hover:bg-white/10 ${
                  activePage === "SocialMedia"
                    ? "text-teal-200"
                    : "text-white/90"
                }`}
              >
                Content Hub
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryForm?.();
                }}
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-pink-600 to-violet-700 px-4 py-3 text-left text-sm font-black text-white"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/80 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-label="Search Smart Net Zero"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSearch();
            }
          }}
        >
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#07133c] text-white shadow-2xl shadow-black/50">
            <div className="flex items-center gap-4 border-b border-white/10 p-4 sm:p-6">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4">
                <Search className="h-5 w-5 shrink-0 text-teal-300" />

                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      filteredResults.length > 0
                    ) {
                      navigateToSearchResult(
                        filteredResults[0]
                      );
                    }
                  }}
                  placeholder="Search services, solutions, industries or page content..."
                  className="h-14 min-w-0 flex-1 bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/40"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="rounded-lg p-1 text-white/45 transition hover:bg-white/10 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={closeSearch}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-300">
                  {searchQuery
                    ? `${filteredResults.length} search result${
                        filteredResults.length === 1
                          ? ""
                          : "s"
                      }`
                    : "Popular pages"}
                </p>

                <p className="hidden text-xs font-semibold text-white/40 sm:block">
                  Press Enter to open the first result
                </p>
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid gap-3">
                  {filteredResults.map((item) => (
                    <button
                      key={`${item.page}-${item.title}`}
                      type="button"
                      onClick={() =>
                        navigateToSearchResult(item)
                      }
                      className="group flex w-full items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:-translate-y-0.5 hover:border-teal-300/40 hover:bg-white/[0.08]"
                    >
                      <div className="min-w-0">
                        <span className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-teal-200">
                          {item.category || "Page"}
                        </span>

                        <h3 className="mt-3 text-lg font-black text-white">
                          {highlightText(item.title)}
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/62">
                          {highlightText(
                            getSearchExcerpt(item)
                          )}
                        </p>
                      </div>

                      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-teal-300 transition group-hover:border-teal-300/30 group-hover:bg-teal-300/10">
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center">
                  <Search className="mx-auto h-10 w-10 text-white/25" />

                  <h3 className="mt-4 text-xl font-black text-white">
                    No matching pages found
                  </h3>

                  <p className="mx-auto mt-2 max-w-lg text-sm font-semibold leading-6 text-white/50">
                    Try searching for net zero, OT security,
                    energy, compliance, smart buildings, data
                    centres or research.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}