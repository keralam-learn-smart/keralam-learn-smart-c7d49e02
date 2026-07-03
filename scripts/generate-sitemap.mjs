// Generates public/sitemap.xml by scanning the file-based routes in src/routes.
// Runs automatically before every build (see the "prebuild" script in package.json)
// so newly added public routes are included without manual edits.
import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ROUTES_DIR = join(ROOT, "src", "routes");
const PUBLIC_DIR = join(ROOT, "public");
const SITE_URL = "https://keralam-learn-smart.vercel.app";

// Route segments that must never appear in a public sitemap.
const PRIVATE_SEGMENTS = new Set(["auth", "settings", "profile"]);

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(tsx|jsx|ts)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function toRoutePath(file) {
  // e.g. "about.tsx" -> "about", "quiz.index.tsx" -> "quiz.index"
  let rel = relative(ROUTES_DIR, file).replace(/\.(tsx|jsx|ts)$/, "");
  // Normalise directory separators to the TanStack "." convention.
  rel = rel.split(/[\\/]/).join(".");

  const segments = rel.split(".");

  // Skip the root document, pathless/layout routes, and dynamic param routes.
  if (segments.some((s) => s === "__root" || s.startsWith("_") || s.startsWith("$"))) {
    return null;
  }
  // Skip explicitly private routes.
  if (segments.some((s) => PRIVATE_SEGMENTS.has(s))) {
    return null;
  }

  // "index" segments collapse to the parent path ("index" -> "/", "quiz.index" -> "/quiz").
  const pathSegments = segments.filter((s) => s !== "index");
  return "/" + pathSegments.join("/");
}

const routePaths = new Set();
for (const file of walk(ROUTES_DIR)) {
  const path = toRoutePath(file);
  if (path !== null) routePaths.add(path);
}

const urls = [...routePaths].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
const lastmod = new Date().toISOString().split("T")[0];

const body = urls
  .map((path) => {
    const loc = `${SITE_URL}${path === "/" ? "/" : path}`;
    const priority = path === "/" ? "1.0" : "0.7";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), xml, "utf8");
console.log(`[sitemap] wrote ${urls.length} URLs to public/sitemap.xml`);
