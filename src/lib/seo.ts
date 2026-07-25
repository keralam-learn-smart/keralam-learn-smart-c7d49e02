export const SITE_URL = "https://keralam-learn-smart.vercel.app";
export const SITE_NAME = "Traffic Tips";

export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
};

export const createCanonicalLink = (path = "/") => ({ rel: "canonical", href: absoluteUrl(path) });

export const createOpenGraphMeta = ({
  title,
  description,
  path = "/",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}) => [
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:type", content: type },
  { property: "og:url", content: absoluteUrl(path) },
  { property: "og:site_name", content: SITE_NAME },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  email: "renjithraj154@gmail.com",
  telephone: "+919447480651",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plavarthala Line, Thamalam, Karamana",
    addressLocality: "Thiruvananthapuram",
    postalCode: "695012",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: "Kerala, India",
  teaches: ["Kerala RTO learner licence", "traffic signs", "road rules", "mock tests"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en-IN", "ml-IN"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/quiz?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
