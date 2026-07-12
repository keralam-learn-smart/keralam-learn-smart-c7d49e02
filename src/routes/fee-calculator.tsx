import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSite } from "@/lib/site-context";

type Service = "ll" | "dl_test" | "dl_issue" | "renewal" | "duplicate" | "endorsement";

const SERVICE_LABELS: Record<Service, { en: string; ml: string; fee: number }> = {
  ll: { en: "Learner Licence (LL) — application + test", ml: "ലേണർ ലൈസൻസ് (LL)", fee: 350 },
  dl_test: { en: "Driving Licence — Driving Test", ml: "ഡ്രൈവിങ് ടെസ്റ്റ്", fee: 300 },
  dl_issue: {
    en: "Driving Licence — Issue (smart card)",
    ml: "DL ഇഷ്യൂ (സ്മാർട്ട് കാർഡ്)",
    fee: 200,
  },
  renewal: { en: "DL Renewal", ml: "DL പുതുക്കൽ", fee: 200 },
  duplicate: { en: "Duplicate DL", ml: "ഡ്യൂപ്ലിക്കേറ്റ് DL", fee: 200 },
  endorsement: { en: "Add another class (endorsement)", ml: "ക്ലാസ് കൂട്ടിച്ചേർക്കൽ", fee: 500 },
};

export const Route = createFileRoute("/fee-calculator")({
  head: () => ({
    meta: [
      { title: "RTO Fee Calculator — Traffic Tips" },
      {
        name: "description",
        content:
          "Estimate Kerala RTO fees for learner licence, driving test, DL issue, renewal and more.",
      },
      { property: "og:title", content: "Kerala RTO Fee Calculator" },
      {
        property: "og:description",
        content: "Quick fee estimates for common Kerala RTO services.",
      },
    ],
  }),
  component: FeeCalculator,
});

function FeeCalculator() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [service, setService] = useState<Service>("ll");
  const [classes, setClasses] = useState(1);

  const total = useMemo(
    () => SERVICE_LABELS[service].fee * Math.max(1, classes),
    [service, classes],
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className={`text-3xl font-bold ${ml}`}>
          {lang === "en" ? "RTO Fee Calculator" : "RTO ഫീസ് കാൽക്കുലേറ്റർ"}
        </h1>
        <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
          {lang === "en"
            ? "Approximate Kerala RTO fees. Final fees may include card charges, postal fee and service tax."
            : "ഏകദേശ കേരള RTO ഫീസ്. അന്തിമ ഫീസിൽ കാർഡ് ചാർജ്, പോസ്റ്റൽ ഫീസ് എന്നിവ ഉൾപ്പെടാം."}
        </p>

        <Card className="mt-6 space-y-4 p-6">
          <div>
            <Label className={ml}>
              {lang === "en" ? "Select service" : "സേവനം തിരഞ്ഞെടുക്കുക"}
            </Label>
            <Select value={service} onValueChange={(v) => setService(v as Service)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SERVICE_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {lang === "en" ? v.en : v.ml} — ₹{v.fee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={ml}>
              {lang === "en" ? "Number of vehicle classes" : "വാഹന ക്ലാസുകളുടെ എണ്ണം"}
            </Label>
            <input
              type="number"
              min={1}
              max={5}
              value={classes}
              onChange={(e) => setClasses(Number(e.target.value) || 1)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className={`text-xs uppercase tracking-wide text-muted-foreground ${ml}`}>
              {lang === "en" ? "Estimated total" : "ഏകദേശ ആകെ"}
            </p>
            <p className="mt-1 text-3xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</p>
          </div>

          <p className={`text-xs text-muted-foreground ${ml}`}>
            {lang === "en"
              ? "Source: Central Motor Vehicles Rules, 1989 (as amended). Verify on parivahan.gov.in."
              : "ഉറവിടം: കേന്ദ്ര മോട്ടോർ വാഹന നിയമങ്ങൾ, 1989. parivahan.gov.in ൽ ഉറപ്പാക്കുക."}
          </p>
        </Card>
      </div>
    </SiteLayout>
  );
}
