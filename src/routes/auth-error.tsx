import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/site-context";

const searchSchema = z.object({
  message: z.string().optional(),
});

export const Route = createFileRoute("/auth-error")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Authentication Error — Traffic Tips" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthErrorPage,
});

function AuthErrorPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);
  const { message } = useSearch({ from: "/auth-error" });

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className={`text-2xl font-bold ${ml}`}>
          {t("Authentication failed", "പ്രാമാണീകരണം പരാജയപ്പെട്ടു")}
        </h1>

        <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
          {message
            ? message
            : t(
                "Something went wrong while signing you in. This can happen if the link has expired or was already used.",
                "സൈൻ ഇൻ ചെയ്യുന്നതിൽ എന്തോ തകരാർ സംഭവിച്ചു. ലിങ്ക് കാലഹരണപ്പെട്ടതോ ഇതിനകം ഉപയോഗിച്ചതോ ആകാം.",
              )}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link to="/auth">
            <Button className="w-full">{t("Try again", "വീണ്ടും ശ്രമിക്കുക")}</Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className={`w-full text-sm ${ml}`}>
              {t("Back to home", "ഹോമിലേക്ക്")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
