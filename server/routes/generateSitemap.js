import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertSitemapSiteUrl,
  createSitemapXml,
  getUniquePublicPages,
} from "../sitemap.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDirectory = path.resolve(__dirname, "../../public");
const outputFile = path.join(outputDirectory, "sitemap.xml");

export function generateSitemap() {
  assertSitemapSiteUrl();
  const pages = getUniquePublicPages();

  if (pages.length === 0) {
    throw new Error("No public sitemap pages have been configured.");
  }

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(outputFile, createSitemapXml(pages), "utf8");

  console.log(`Generated sitemap.xml with ${pages.length} public URLs.`);
  console.log(`Output: ${outputFile}`);
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  try {
    generateSitemap();
  } catch (error) {
    console.error("Failed to generate sitemap.xml.");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
