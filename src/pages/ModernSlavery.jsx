import { useState, useEffect } from "react";
import SNZHeader from "../components/SNZHeader";
import SNZFooter from "../components/SNZFooter";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Statement",
    content: [
      "Modern slavery is a crime and a violation of fundamental human rights. It can take various forms, including slavery, servitude, forced and compulsory labour and human trafficking, all of which involve the deprivation of a person’s liberty by another in order to exploit them for personal or commercial gain.",
      "Smart Net Zero Ltd has a zero-tolerance approach to modern slavery. We are committed to acting ethically and with integrity in all our business dealings and relationships, and to implementing and enforcing effective systems and controls to ensure modern slavery is not taking place anywhere in our own business or in any of our supply chains.",
      "We are committed to transparency in our business and in our approach to tackling modern slavery throughout our supply chains, consistent with our disclosure obligations under the Modern Slavery Act 2015.",
      "We expect the same high standards from all contractors, suppliers and business partners. As part of our contracting processes, we expect suppliers to prohibit the use of forced, compulsory or trafficked labour, or anyone held in slavery or servitude, whether adults or children, and to hold their own suppliers to the same standards.",
    ],
  },
  {
    number: "02",
    title: "Policy Responsibility",
    content: [
      "Smart Net Zero Ltd has overall responsibility for ensuring this policy complies with our legal and ethical obligations, and that all those under our control comply with it.",
      "Smart Net Zero Ltd has primary and day-to-day responsibility for implementing this policy, monitoring its use and effectiveness, dealing with queries about it, and auditing internal control systems and procedures to ensure they are effective in countering modern slavery.",
      "Management at all levels are responsible for ensuring those reporting to them understand and comply with this policy and are given adequate and regular training on it and on the issue of modern slavery in supply chains.",
      "This policy applies to all persons working for us or on our behalf in any capacity, including employees, directors, officers, agency workers, seconded workers, volunteers, interns, agents, contractors, external consultants, third-party representatives and business partners.",
      "This policy does not form part of any employee’s contract of employment and may be amended at any time.",
    ],
  },
  {
    number: "03",
    title: "Policy Compliance",
    content: [
      "All staff and contractors are expected to read, understand and comply with this policy.",
      "The prevention, detection and reporting of modern slavery in any part of our business or supply chains is the responsibility of everyone working for us or under our control.",
      "You are required to avoid any activity that might lead to, or suggest, a breach of this policy.",
      "You must notify your line manager or the Managing Director as soon as possible if you believe or suspect that a conflict with this policy has occurred or may occur in the future.",
      "You are encouraged to raise concerns about any issue or suspicion of modern slavery in any part of our business or supply chains, at any supplier tier, at the earliest possible stage.",
      "Where appropriate, and with the welfare and safety of local workers as a priority, we will support and guide suppliers to help them address coercive, abusive or exploitative work practices in their own business and supply chains.",
      "Smart Net Zero Ltd encourages openness and will support anyone who raises genuine concerns in good faith under this policy, even if they turn out to be mistaken. No one should suffer detrimental treatment as a result of reporting a genuine concern.",
    ],
  },
  {
    number: "04",
    title: "Communication and Awareness",
    content: [
      "Training on this policy, and on the risk our business faces from modern slavery in its supply chains, forms part of the induction process for individuals who work for us.",
      "Updates will be provided using established methods of communication within the business.",
      "Our zero-tolerance approach to modern slavery must be communicated to suppliers, contractors and business partners at the outset of our business relationship with them and reinforced as appropriate thereafter.",
    ],
  },
  {
    number: "05",
    title: "Policy Breaches",
    content: [
      "Any employee or contractor who breaches this policy may face disciplinary action or sanctions, which could result in dismissal for misconduct or gross misconduct.",
      "We may also terminate our relationship with individuals and organisations working on our behalf if they breach this policy.",
    ],
  },
];

const commitments = [
  {
    title: "Zero tolerance",
    text: "We do not tolerate slavery, servitude, forced labour or human trafficking.",
    icon: ShieldCheck,
  },
  {
    title: "Ethical relationships",
    text: "We act with integrity across business dealings, partnerships and supply chains.",
    icon: Users,
  },
  {
    title: "Legal transparency",
    text: "We align our approach with the Modern Slavery Act 2015 and disclosure expectations.",
    icon: Scale,
  },
  {
    title: "Open reporting",
    text: "We encourage concerns to be raised early and in good faith.",
    icon: FileText,
  },
];

function PolicySection({ section }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-lg font-black text-white">
          {section.number}
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#07133c]">
            {section.title}
          </h2>

          <div className="mt-5 space-y-4">
            {section.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm font-semibold leading-7 text-slate-650"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ModernSlavery({ goToPage, openEnquiryForm }) {

  useEffect(() => {
      document.title = "Modern Slavery Statement | Smart Net Zero";
    }, []);
  return (
    <div className="min-h-screen bg-white text-slate-950 antialiased">
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="ModernSlavery"
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
                Modern Slavery Statement
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
                Our commitment to preventing modern slavery and human
                trafficking in our business and supply chains.
              </p>

              <div className="mt-8 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200">
                Last reviewed: 05 June 2026
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
                  Statement contents
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
                  <h3 className="font-black">Raise a concern</h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                    Concerns, comments, suggestions or queries should be raised
                    with your line manager or the Managing Director.
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
                  <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-cyan-700" />

                  <div>
                    <h2 className="text-2xl font-black text-[#07133c]">
                      Applicability
                    </h2>

                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                      This Modern Slavery Policy and Statement is intended for
                      businesses in all countries, especially the United
                      Kingdom.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-black text-[#07133c]">
                  Contact details
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <Phone className="h-6 w-6 text-cyan-700" />
                    <p className="mt-3 text-sm font-black text-[#07133c]">
                      +44 (0)20 8720 7153
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
            </div>
          </div>
        </section>
      </main>
      <SNZFooter goToPage={goToPage} />
    </div>
  );
}