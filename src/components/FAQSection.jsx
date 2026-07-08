import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

const SERVICE_FAQS = {
  sustainability: [
    {
      question: "Where should an organisation start its journey to net zero?",
      answer:
        "The first step is to understand your current position. This means establishing a clear baseline for energy use and carbon emissions, identifying the areas with the greatest impact and setting realistic goals. From there, organisations can build a practical net zero roadmap that prioritises actions based on carbon reduction potential, cost, risk and deliverability.",
    },
    {
      question: "What data do you need to develop a net zero strategy?",
      answer:
        "A strong net zero strategy starts with reliable data. This may include energy consumption, greenhouse gas emissions, building and asset performance, transport and fleet data, operational activity and relevant supply chain information. The aim is not simply to collect more data, but to understand what is available, identify gaps and turn that information into clear priorities and informed decisions.",
    },
    {
      question: "What is the difference between a net zero target and a net zero strategy?",
      answer:
        "A net zero target defines the outcome an organisation wants to achieve and the timeframe for reaching it. A net zero strategy sets out how that target will be delivered. It should establish the current baseline, identify the actions required, prioritise investment, assign responsibilities and set out how progress will be measured over time.",
    },
    {
      question: "How do you prioritise which carbon reduction projects to invest in first?",
      answer:
        "Carbon reduction projects should be assessed against a combination of environmental, financial and operational factors. This can include carbon impact, energy and cost savings, capital requirements, payback periods, implementation timescales, operational risk and dependencies between projects. A structured approach helps organisations focus investment on the actions that deliver the greatest overall value.",
    },
    {
      question: "How can an organisation measure progress towards net zero?",
      answer:
        "Progress should be measured against a clear baseline using consistent and reliable data. This can include tracking carbon emissions, energy consumption, operational performance, project delivery and cost savings. Regular monitoring allows organisations to understand what is working, identify where progress is falling behind and adjust the strategy as conditions, technology and priorities change.",
    },
  ],

  regulations: [
    {
      question: "How do organisations know which regulations and compliance requirements apply to them?",
      answer:
        "The requirements that apply will depend on factors such as sector, organisation size, geography, assets, energy use, connected products and reporting obligations. The first step is to understand the organisation, its operations and its infrastructure, then map the relevant regulatory and compliance requirements against them. This helps avoid gaps, duplication and unnecessary effort.",
    },
    {
      question: "How can businesses keep up with changing regulations and compliance requirements?",
      answer:
        "Businesses need a structured process for monitoring regulatory change, assessing whether new requirements apply and assigning responsibility for action. This should include regular reviews, clear ownership, documented decisions and ongoing monitoring. Treating compliance as a continuous process makes it easier to respond to change without relying on last-minute fixes.",
    },
    {
      question: "What evidence does an organisation need to demonstrate compliance?",
      answer:
        "The evidence required will vary, but organisations will often need reliable records showing what has been assessed, which assets or activities are in scope, what controls are in place, who is responsible and what actions have been taken. Good compliance depends on accurate data, clear documentation and the ability to demonstrate how requirements are being managed over time.",
    },
    {
      question: "How do connected devices and smart infrastructure affect regulatory compliance?",
      answer:
        "Connected devices and smart infrastructure can introduce additional requirements around cyber security, remote access, data handling, supplier assurance, software updates and asset visibility. As estates become more connected, organisations need to understand what devices are deployed, how they communicate, who manages them and whether they introduce new regulatory or compliance obligations.",
    },
    {
      question: "How can organisations make compliance more proactive and less reactive?",
      answer:
        "Proactive compliance means building regulatory requirements into normal business processes rather than responding only when deadlines approach. This can include considering compliance during procurement, project planning, asset management, data collection and risk reviews. A structured approach helps organisations identify gaps earlier, maintain better evidence and respond more effectively as requirements change.",
    },
  ],

  energy: [
    {
      question: "What is smart energy management and how does it work?",
      answer:
        "Smart energy management uses data, monitoring and intelligent controls to understand how energy is being used across buildings, assets and systems. By bringing information together from sources such as meters, sensors, Building Management Systems and connected devices, organisations can identify waste, improve performance and make better decisions about energy use.",
    },
    {
      question: "How can smart energy management reduce energy costs?",
      answer:
        "Smart energy management helps reduce costs by showing where, when and why energy is being used. This can reveal unnecessary out-of-hours consumption, inefficient equipment, poor operating schedules and other areas of waste. By improving visibility and optimising existing systems and controls, we estimate that organisations can achieve average energy cost savings of around 20–30%.",
    },
    {
      question: "How much can a business save through better energy management?",
      answer:
        "While the exact level of savings will depend on the organisation, its estate and how effectively energy is currently being managed, we estimate average energy cost savings of around 20–30%. Savings can come from reducing unnecessary consumption, improving operating schedules, identifying faults earlier and optimising existing assets before committing to major capital investment.",
    },
    {
      question: "How can energy monitoring identify waste and inefficiency?",
      answer:
        "Energy monitoring provides a clearer picture of how buildings, equipment and systems perform over time. It can help identify abnormal consumption, unexpected energy use outside operating hours, inefficient equipment and differences in performance between similar sites or assets. This allows organisations to investigate problems earlier and focus improvement efforts where they will deliver the greatest value.",
    },
    {
      question: "Do you need to replace existing equipment to improve energy efficiency?",
      answer:
        "Not always. In many cases, organisations can improve energy efficiency by better understanding and optimising the assets and systems they already have. This can include improving controls, adjusting operating schedules, addressing faults and using performance data to identify inefficiencies. Understanding current performance first helps ensure capital is only invested where replacement or upgrades will deliver real value.",
    },
  ],

  ot: [
    {
      question: "What is operational technology and what systems are considered OT?",
      answer:
        "Operational technology, or OT, refers to the systems and devices used to monitor, control or automate physical processes. This can include Building Management Systems, HVAC controls, refrigeration systems, EV chargers, access control, sensors, IoT devices, industrial control systems, SCADA and PLC environments. Many organisations rely on more OT than they realise, often spread across multiple buildings, systems and suppliers.",
    },
    {
      question: "What is the difference between IT security and OT security?",
      answer:
        "IT security primarily protects data, users and digital business systems, while OT security protects the technology that controls physical processes and infrastructure. Traditional IT cyber security does not automatically provide complete protection for OT environments, which often have different technologies, lifecycles, operational constraints and safety requirements. Organisations need to confirm that their OT assets have been specifically identified, assessed and included within their wider cyber security approach.",
    },
    {
      question: "How do you know what operational technology is connected to your organisation?",
      answer:
        "The first step is to build a clear view of the OT assets connected across your organisation. This may involve reviewing systems across buildings and sites, identifying connected devices, mapping network connections and remote access, and understanding which third parties manage or maintain equipment. OT is often undocumented or spread across different teams, so asset discovery and ongoing visibility are essential.",
    },
    {
      question: "What are the biggest cyber security risks to operational technology?",
      answer:
        "Common OT cyber security risks include unknown or unmanaged assets, legacy and unsupported technology, weak network segmentation, insecure remote access, poor credential management, limited monitoring and third-party access. As OT becomes more connected to IT networks, cloud platforms and external suppliers, organisations need to understand where those connections exist and manage the risks they introduce.",
    },
    {
      question: "How can organisations improve OT cyber resilience without disrupting operations?",
      answer:
        "Improving OT resilience does not always require replacing systems or taking critical operations offline. Organisations can start by understanding their OT environment, identifying critical assets, reducing unnecessary connectivity, improving network segmentation, securing remote access and strengthening monitoring. A risk-based approach allows improvements to be prioritised around operational impact, safety and business continuity.",
    },
  ],
};

function normaliseServiceKey(value = "") {
  const key = value.toLowerCase().trim();

  if (
    key.includes("sustainability") ||
    key.includes("net zero") ||
    key.includes("carbon")
  ) {
    return "sustainability";
  }

  if (
    key.includes("regulation") ||
    key.includes("compliance") ||
    key.includes("smart regulations")
  ) {
    return "regulations";
  }

  if (
    key.includes("energy") ||
    key.includes("smart energy") ||
    key.includes("energy management")
  ) {
    return "energy";
  }

  if (
    key.includes("ot") ||
    key.includes("operational technology") ||
    key.includes("security") ||
    key.includes("resilience")
  ) {
    return "ot";
  }

  return key;
}

export default function FAQSection({
  eyebrow = "Frequently asked questions",
  title = "Common questions",
  text,
  faqs = [],
  serviceKey = "",
  service = "",
  openEnquiryForm,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const resolvedFaqs = useMemo(() => {
    if (Array.isArray(faqs) && faqs.length) {
      return faqs;
    }

    const keyFromService = normaliseServiceKey(serviceKey || service || title);

    return SERVICE_FAQS[keyFromService] || [];
  }, [faqs, serviceKey, service, title]);

  if (!resolvedFaqs.length) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            {eyebrow && (
              <p className="text-sm font-black uppercase tracking-[0.16em] text-green-700">
                {eyebrow}
              </p>
            )}

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              {title}
            </h2>

            {text && (
              <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-600">
                {text}
              </p>
            )}

            {openEnquiryForm && (
              <button
                type="button"
                onClick={openEnquiryForm}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-green-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
              >
                Speak to our team
              </button>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-lg shadow-slate-900/5 md:p-5">
            <div className="space-y-3">
              {resolvedFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={`${faq.question}-${index}`}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-black leading-6 text-slate-950 md:text-base">
                        {faq.question}
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-green-700 transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 pb-5 pt-1">
                        <p className="text-sm font-semibold leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}