import { seedContent } from "./cms/seed-data.js";
import { getEditorPickPath } from "../src/lib/editorPicks.js";

const SITE_URL = String(
  process.env.PUBLIC_SITE_URL ||
    process.env.VITE_PUBLIC_SITE_URL ||
    "https://www.smartnetzero.co.uk"
).replace(/\/+$/, "");

export const publicPages = [
  { path: "/", changefreq: "weekly", priority: 1 },

  // Services
  { path: "/services/sustainability-net-zero", changefreq: "monthly", priority: 0.8 },
  { path: "/services/smart-energy-management", changefreq: "monthly", priority: 0.8 },
  { path: "/services/ot-security-resilience", changefreq: "monthly", priority: 0.8 },
  { path: "/services/smart-regulations-compliance", changefreq: "monthly", priority: 0.8 },

  // Solutions
  { path: "/solutions/smart-applications-digital-tools", changefreq: "monthly", priority: 0.8 },
  { path: "/solutions/decarbonisation-optimisation", changefreq: "monthly", priority: 0.8 },
  { path: "/solutions/specialist-consultancy", changefreq: "monthly", priority: 0.8 },
  { path: "/solutions/lab-testing-product-compliance", changefreq: "monthly", priority: 0.8 },
  { path: "/solutions/smart-infrastructure-assurance", changefreq: "monthly", priority: 0.8 },
  { path: "/solutions/energy-performance-optimisation", changefreq: "monthly", priority: 0.8 },

  // Industries
  { path: "/industries/built-environment", changefreq: "monthly", priority: 0.7 },
  { path: "/industries/public-sector-local-authorities", changefreq: "monthly", priority: 0.7 },
  { path: "/industries/manufacturers-connected-products", changefreq: "monthly", priority: 0.7 },
  { path: "/industries/energy-utilities-critical-infrastructure", changefreq: "monthly", priority: 0.7 },
  { path: "/industries/data-centres", changefreq: "monthly", priority: 0.7 },

  // Other public pages
  { path: "/research", changefreq: "monthly", priority: 0.7 },
  { path: "/about-us", changefreq: "yearly", priority: 0.6 },
  { path: "/careers", changefreq: "weekly", priority: 0.7 },
  { path: "/content-hub", changefreq: "daily", priority: 0.8 },
];

for (const editorPick of seedContent.editorPicks || []) {
  publicPages.push({
    path: getEditorPickPath(editorPick.data),
    changefreq: "monthly",
    priority: 0.7,
  });
}

const allowedChangeFrequencies = new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizePath(value) {
  const routePath = String(value || "").trim();

  if (!routePath || routePath === "/") return "/";
  if (/^https?:\/\//i.test(routePath)) {
    throw new Error(`Sitemap paths must be relative, not absolute: ${routePath}`);
  }

  return `/${routePath.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "")}`;
}

function normalizeLastModified(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid last-modified date: ${value}`);
  }
  return date.toISOString();
}

function normalizePriority(value) {
  if (value === undefined || value === null || value === "") return null;
  const priority = Number(value);
  if (!Number.isFinite(priority) || priority < 0 || priority > 1) {
    throw new Error(`Sitemap priority must be between 0 and 1. Received: ${value}`);
  }
  return priority.toFixed(1);
}

function normalizeChangeFrequency(value) {
  if (!value) return null;
  const changeFrequency = String(value).trim().toLowerCase();
  if (!allowedChangeFrequencies.has(changeFrequency)) {
    throw new Error(`Invalid sitemap change frequency: ${value}`);
  }
  return changeFrequency;
}

function validatePage(page, index) {
  if (!page || typeof page !== "object" || !page.path) {
    throw new Error(`Invalid sitemap entry at position ${index}.`);
  }
  if (page.indexable === false) return null;

  return {
    path: normalizePath(page.path),
    lastmod: normalizeLastModified(page.lastmod),
    changefreq: normalizeChangeFrequency(page.changefreq),
    priority: normalizePriority(page.priority),
  };
}

export function getUniquePublicPages(pages = publicPages) {
  const uniquePages = new Map();

  pages.forEach((page, index) => {
    const validatedPage = validatePage(page, index);
    if (!validatedPage) return;
    if (uniquePages.has(validatedPage.path)) {
      throw new Error(`Duplicate sitemap path found: ${validatedPage.path}`);
    }
    uniquePages.set(validatedPage.path, validatedPage);
  });

  return Array.from(uniquePages.values()).sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}

function createUrlXml(page) {
  const absoluteUrl = page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
  const lines = ["  <url>", `    <loc>${escapeXml(absoluteUrl)}</loc>`];

  if (page.lastmod) lines.push(`    <lastmod>${escapeXml(page.lastmod)}</lastmod>`);
  if (page.changefreq) lines.push(`    <changefreq>${escapeXml(page.changefreq)}</changefreq>`);
  if (page.priority) lines.push(`    <priority>${escapeXml(page.priority)}</priority>`);
  lines.push("  </url>");
  return lines.join("\n");
}

export function createSitemapXml(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(createUrlXml).join("\n")}
</urlset>
`;
}

export function assertSitemapSiteUrl() {
  if (!SITE_URL.startsWith("https://")) {
    throw new Error(`PUBLIC_SITE_URL must use HTTPS. Received: ${SITE_URL}`);
  }
}
