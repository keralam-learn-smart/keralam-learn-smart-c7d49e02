import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";
import type { ReactNode } from "react";

export function LegalPage({
  titleEn,
  titleMl,
  children,
}: {
  titleEn: string;
  titleMl: string;
  children: ReactNode;
}) {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <article className={`mx-auto max-w-3xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">{lang === "en" ? titleEn : titleMl}</h1>
        <div className="prose prose-sm mt-6 max-w-none dark:prose-invert">{children}</div>
        <p className="mt-8 text-xs text-muted-foreground">
          {lang === "en" ? "Last updated: " : "അവസാനം പുതുക്കിയത്: "}
          {new Date().toLocaleDateString()}
        </p>
      </article>
    </SiteLayout>
  );
}
