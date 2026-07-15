const footerLinks = [
  { label: "Privacy Policy", page: "PrivacyPolicy" },
  { label: "Modern Slavery Statement", page: "ModernSlavery" },
  {
    label: "Carbon Reduction Statement",
    page: "CarbonReductionStatement",
  },
  {
    label: "Accessibility Statement",
    page: "AccessibilityStatement",
  },
];

export default function SNZFooter({ goToPage }) {
  const currentYear = new Date().getFullYear();

  const navigateToPage = (page) => {
    if (!page || !goToPage) return;

    goToPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white px-5 pb-10 pt-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-slate-200 pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Left-hand logo and copyright */}
          <div className="flex flex-col items-start">
            <button
              type="button"
              onClick={() => navigateToPage("Homepage")}
              className="cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-4"
              aria-label="Go to Smart Net Zero homepage"
            >
              <img
                src="/snzlogo-footer.png"
                alt="Smart Net Zero"
                className="h-auto w-44 object-contain sm:w-52"
              />
            </button>

            <p className="mt-4 text-sm font-medium text-slate-600">
              &copy; Smart Net Zero Ltd {currentYear}. All rights reserved.
            </p>
          </div>

          {/* Right-hand strapline, LinkedIn link and footer page links */}
          <div className="flex flex-col items-start gap-5 md:items-end">
            <div className="flex flex-col items-start gap-2 md:items-end">
              <p className="whitespace-nowrap text-left text-lg font-semibold leading-snug tracking-tight text-slate-900 md:text-right">
                Making Infrastructure Smarter, Safer, and More Sustainable
              </p>

              <a
                href="https://www.linkedin.com/company/smart-net-zero/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                aria-label="Follow Smart Net Zero on LinkedIn. Opens in a new window."
              >
                Follow us on LinkedIn
              </a>
            </div>

            <nav
              aria-label="Legal and policy links"
              className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-x-6 md:justify-end"
            >
              {footerLinks.map(({ label, page }) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => navigateToPage(page)}
                  className="cursor-pointer whitespace-nowrap transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}