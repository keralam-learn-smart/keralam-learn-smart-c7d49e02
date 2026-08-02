import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/application-tracking")({
  head: () => ({
    meta: [
      { title: "Application Tracking — Traffic Tips" },
      {
        name: "description",
        content:
          "Track your Kerala RTO learner/driving licence application status directly on parivahan.gov.in.",
      },
      { property: "og:title", content: "Kerala RTO Application Tracking" },
      { property: "og:description", content: "Track LL/DL application status." },
    ],
  }),
  component: AppTrack,
});

function AppTrack() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [appNo, setAppNo] = useState("");
  const [dob, setDob] = useState("");

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className={`text-3xl font-bold ${ml}`}>
          {lang === "en" ? "Application Tracking" : "അപേക്ഷാ ട്രാക്കിങ്"}
        </h1>
        <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
          {lang === "en"
            ? "Enter your application number and date of birth to open the official Kerala MVD tracking page."
            : "ഔദ്യോഗിക കേരള MVD ട്രാക്കിങ് പേജ് തുറക്കാൻ അപേക്ഷാ നമ്പറും ജനനത്തീയതിയും നൽകുക."}
        </p>

        <Card className="mt-6 space-y-4 p-6">
          <div>
            <Label htmlFor="appno" className={ml}>
              {lang === "en" ? "Application number" : "അപേക്ഷാ നമ്പർ"}
            </Label>
            <Input
              id="appno"
              value={appNo}
              onChange={(e) => setAppNo(e.target.value)}
              placeholder="e.g. KL0120240012345"
            />
          </div>
          <div>
            <Label htmlFor="dob" className={ml}>
              {lang === "en" ? "Date of birth" : "ജനനത്തീയതി"}
            </Label>
            <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <Button
            className="w-full"
            onClick={() =>
              window.open(
                "https://parivahan.gov.in/parivahan/en/content/application-status",
                "_blank",
              )
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {lang === "en" ? "Open on parivahan.gov.in" : "parivahan.gov.in ൽ തുറക്കുക"}
          </Button>
        </Card>

        <Card className="mt-4 p-6">
          <h2 className={`font-semibold ${ml}`}>
            {lang === "en" ? "Useful links" : "ഉപകാരപ്രദമായ ലിങ്കുകൾ"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="text-primary underline"
                href="https://sarathi.parivahan.gov.in"
                target="_blank"
                rel="noreferrer"
              >
                Sarathi (DL/LL services)
              </a>
            </li>
            <li>
              <a
                className="text-primary underline"
                href="https://vahan.parivahan.gov.in"
                target="_blank"
                rel="noreferrer"
              >
                Vahan (Vehicle services)
              </a>
            </li>
            <li>
              <a
                className="text-primary underline"
                href="https://mvd.kerala.gov.in"
                target="_blank"
                rel="noreferrer"
              >
                Kerala MVD official
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </SiteLayout>
  );
}
