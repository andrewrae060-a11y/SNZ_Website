import { useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  Database,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: [
      "Smart Net Zero Ltd is committed to protecting your privacy and handling your personal data in a fair, lawful and transparent way.",
      "This Privacy Policy explains how we collect, use, store and protect personal data when you use our website, contact us, request information, submit an enquiry or engage with our services.",
      "This policy should be read alongside any other privacy notice or fair processing notice we may provide on specific occasions when we collect or process personal data.",
    ],
  },
  {
    number: "02",
    title: "What personal data we collect",
    content: [
      "We may collect, use, store and transfer different kinds of personal data about you.",
      "The categories of personal data we may collect include:",
    ],
    bullets: [
      "Identity data, such as your name, job title, organisation or business name.",
      "Contact data, such as your email address, telephone number, business address or correspondence details.",
      "Technical data, such as your IP address, browser type, device information, operating system and website usage information.",
      "Usage data, such as information about how you use our website, services, downloads, forms and digital content.",
      "Marketing and communications data, such as your preferences for receiving updates, newsletters or other communications from us.",
      "Enquiry data, such as information you provide when submitting a contact form, requesting a proposal, booking a demo or asking about our services.",
    ],
  },
  {
    number: "03",
    title: "How we collect personal data",
    content: [
      "We collect personal data directly from you when you complete forms, contact us by email or telephone, request information, download materials, attend meetings or otherwise communicate with us.",
      "We may also collect technical and usage information automatically when you interact with our website, including through cookies, analytics tools and similar technologies.",
      "Where appropriate, we may receive personal data from third parties such as business partners, suppliers, professional advisers or publicly available sources.",
    ],
  },
  {
    number: "04",
    title: "How we use your personal data",
    content: [
      "We use personal data where it is necessary to respond to enquiries, provide information, deliver services, manage customer relationships and operate our business.",
      "We may also use personal data to improve our website and services, manage security, comply with legal obligations, administer contracts and keep appropriate business records.",
      "Where we send marketing communications, we will do so in accordance with applicable data protection and electronic communications rules. You can opt out of marketing communications at any time.",
    ],
    bullets: [
      "To respond to enquiries and requests for information.",
      "To provide consultancy, advisory or digital services.",
      "To manage contracts, proposals, accounts and customer relationships.",
      "To improve our website, content, services and user experience.",
      "To comply with legal, regulatory, tax, accounting or reporting obligations.",
      "To protect our systems, business, users and information from misuse or security risks.",
    ],
  },
  {
    number: "05",
    title: "Lawful basis for processing",
    content: [
      "We will only process personal data where we have a lawful basis to do so under applicable data protection law.",
      "Depending on the circumstances, we may rely on consent, contract, legal obligation, legitimate interests or another lawful basis permitted by law.",
      "Where we rely on legitimate interests, we will consider and balance our interests against your rights, freedoms and reasonable expectations.",
    ],
  },
  {
    number: "06",
    title: "Sharing personal data",
    content: [
      "We may share personal data with trusted service providers, professional advisers, business partners, technology suppliers and other organisations where necessary for legitimate business purposes.",
      "We may also share personal data where required by law, regulation, legal process, court order or to protect our rights, property, systems or users.",
      "Where we use third-party processors, we expect them to handle personal data securely and only in accordance with appropriate instructions and contractual safeguards.",
    ],
  },
  {
    number: "07",
    title: "International transfers",
    content: [
      "Where personal data is transferred outside the United Kingdom or European Economic Area, we will take steps to ensure appropriate safeguards are in place where required by law.",
      "Such safeguards may include adequacy decisions, standard contractual clauses, international data transfer agreements or other lawful transfer mechanisms.",
    ],
  },
  {
    number: "08",
    title: "Data security",
    content: [
      "We take reasonable technical and organisational measures to protect personal data against unauthorised access, loss, misuse, alteration or disclosure.",
      "Access to personal data is limited to those who have a business need to know. Individuals and organisations processing personal data on our behalf are expected to keep it confidential and secure.",
      "No website, system or method of transmission is completely secure. However, we work to maintain appropriate safeguards and review our approach as our business and services develop.",
    ],
  },
  {
    number: "09",
    title: "Data retention",
    content: [
      "We will only retain personal data for as long as reasonably necessary to fulfil the purposes for which it was collected, including for legal, accounting, reporting, contractual or legitimate business purposes.",
      "Retention periods may vary depending on the nature of the data, the reason it is processed, legal requirements and whether we need to retain records to protect our rights or respond to enquiries.",
      "When personal data is no longer required, we will take reasonable steps to delete, anonymise or securely dispose of it.",
    ],
  },
  {
    number: "10",
    title: "Your rights",
    content: [
      "Depending on applicable data protection law and the circumstances, you may have rights in relation to your personal data.",
      "These rights may include the right to request access, correction, deletion, restriction, objection, portability or withdrawal of consent where consent is the lawful basis for processing.",
      "You also have the right to raise a complaint with the UK Information Commissioner’s Office if you are unhappy with how your personal data has been handled.",
    ],
    bullets: [
      "Request access to personal data we hold about you.",
      "Ask us to correct inaccurate or incomplete personal data.",
      "Ask us to delete personal data in certain circumstances.",
      "Object to or restrict certain processing activities.",
      "Request transfer of your personal data where applicable.",
      "Withdraw consent where we rely on consent to process your data.",
    ],
  },
  {
    number: "11",
    title: "Cookies and analytics",
    content: [
      "Our website may use cookies or similar technologies to support functionality, understand website performance and improve user experience.",
      "Cookies may collect technical information such as browser type, device information, pages visited, time spent on the website and referral information.",
      "You can manage cookies through your browser settings. Some features of the website may not function properly if cookies are disabled.",
    ],
  },
  {
    number: "12",
    title: "Changes to this policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our business, website, services, legal obligations or data protection practices.",
      "The latest version will be made available on our website. We encourage you to review this page periodically.",
    ],
  },
];

const commitments = [
  {
    title: "Privacy by design",
    text: "We consider privacy and data protection in how we design our services and digital processes.",
    icon: ShieldCheck,
  },
  {
    title: "Clear purpose",
    text: "We aim to collect and use personal data only where there is a clear and lawful reason.",
    icon: FileText,
  },
  {
    title: "Secure handling",
    text: "We use reasonable safeguards to protect personal data from unauthorised access or misuse.",
    icon: Lock,
  },
  {
    title: "User rights",
    text: "We respect individual rights and provide routes for privacy questions and requests.",
    icon: UserCheck,
  },
];

function PolicySection({ section }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-lg font-black text-white">
          {section.number}
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-black tracking-tight text-[#07133c]">
            {section.title}
          </h2>

          <div className="mt-5 space-y-4">
            {section.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm font-semibold leading-7 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {section.bullets && (
            <div className="mt-6 grid gap-3">
              {section.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PrivacyPolicy({ goToPage, openEnquiryForm }) {
  useEffect(() => {
    document.title = "Privacy Policy | Smart Net Zero";
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="PrivacyPolicy"
      />

      <main>
        <section className="relative overflow-hidden bg-[#06112e] px-5 py-16 text-white lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.20),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(168,85,247,0.18),transparent_30%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(34,211,238,.14)_1px,transparent_1px),linear-gradient(rgba(34,211,238,.10)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
                Smart Net Zero Ltd
              </p>

              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Privacy Policy
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
                How we collect, use, store and protect personal data when you
                interact with Smart Net Zero.
              </p>

              <div className="mt-8 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200">
                Last reviewed: 01 June 2026
              </div>
            </div>
          </div>
        </section>

        <section className="-mt-10 px-5 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/8"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50">
                    <Icon className="h-7 w-7 text-cyan-700" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#07133c]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-14 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.65fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Policy contents
                </h2>

                <div className="mt-4 h-1 w-12 rounded-full bg-cyan-400" />

                <nav className="mt-6 space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.number}
                      href={`#section-${section.number}`}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
                    >
                      <span className="text-cyan-700">{section.number}</span>
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 rounded-2xl bg-[#06112e] p-5 text-white">
                  <Database className="h-8 w-8 text-cyan-300" />

                  <h3 className="mt-4 font-black">Privacy questions?</h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                    Contact us if you have questions about this Privacy Policy
                    or how we handle personal data.
                  </p>

                  <button
                    type="button"
                    onClick={openEnquiryForm}
                    className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-pink-600 to-violet-700 px-4 py-3 text-sm font-black text-white"
                  >
                    Contact Smart Net Zero
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.number} id={`section-${section.number}`}>
                  <PolicySection section={section} />
                </div>
              ))}

              <article className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">
                <div className="flex gap-4">
                  <Cookie className="mt-1 h-7 w-7 shrink-0 text-cyan-700" />

                  <div>
                    <h2 className="text-2xl font-black text-[#07133c]">
                      Cookie preferences
                    </h2>

                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                      You can manage cookies through your browser settings.
                      Blocking some cookies may affect the functionality and
                      performance of the website.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Contact details
                </h2>

                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  To ask questions about privacy, request access to personal
                  data, or raise a data protection concern, please contact Smart
                  Net Zero.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Phone className="h-6 w-6 text-cyan-700" />
                    <p className="mt-3 text-sm font-black text-[#07133c]">
                      +44 (0)333 012 1121
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Mail className="h-6 w-6 text-cyan-700" />
                    <a
                      href="mailto:info@smartnetzero.co.uk"
                      className="mt-3 block text-sm font-black text-[#07133c] hover:text-cyan-700"
                    >
                      info@smartnetzero.co.uk
                    </a>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <MapPin className="h-6 w-6 text-cyan-700" />
                    <p className="mt-3 text-sm font-black leading-6 text-[#07133c]">
                      Clyde Offices, 2nd Floor, 48 West George Street, Glasgow,
                      G2 1BP
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex gap-4">
                  <Scale className="mt-1 h-7 w-7 shrink-0 text-cyan-700" />

                  <div>
                    <h2 className="text-2xl font-black text-[#07133c]">
                      Supervisory authority
                    </h2>

                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                      If you are based in the United Kingdom and are unhappy
                      with how your personal data has been handled, you may have
                      the right to complain to the Information Commissioner’s
                      Office. We would welcome the opportunity to address your
                      concerns first.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}