import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Traffic Tips" },
      { name: "description", content: "Get in touch with the Traffic Tips team for feedback, corrections or partnerships." },
      { property: "og:title", content: "Contact Traffic Tips" },
      { property: "og:description", content: "Send us feedback or report content errors." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className={`text-3xl font-bold ${ml}`}>
          {lang === "en" ? "Contact Us" : "ബന്ധപ്പെടുക"}
        </h1>
        <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
          {lang === "en"
            ? "Found an error? Have a suggestion? We'd love to hear from you."
            : "എന്തെങ്കിലും തെറ്റ് കണ്ടെത്തിയോ? നിർദ്ദേശമുണ്ടോ? ഞങ്ങൾക്ക് അറിയിക്കൂ."}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <Mail className="h-5 w-5 text-primary" />
            <p className="mt-2 text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">hello@keralaroadmaster.in</p>
          </Card>
          <Card className="p-4">
            <Phone className="h-5 w-5 text-primary" />
            <p className="mt-2 text-xs text-muted-foreground">Support</p>
            <p className="text-sm font-medium">+91 90000 00000</p>
          </Card>
          <Card className="p-4">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="mt-2 text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">Thiruvananthapuram, Kerala</p>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          {sent ? (
            <div className="text-center">
              <p className={`text-lg font-semibold text-primary ${ml}`}>
                {lang === "en" ? "✓ Thank you!" : "✓ നന്ദി!"}
              </p>
              <p className={`mt-2 text-sm text-muted-foreground ${ml}`}>
                {lang === "en"
                  ? "We've received your message and will reply within 48 hours."
                  : "നിങ്ങളുടെ സന്ദേശം ലഭിച്ചു, 48 മണിക്കൂറിനുള്ളിൽ മറുപടി തരും."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-3"
            >
              <Input required placeholder={lang === "en" ? "Your name" : "നിങ്ങളുടെ പേര്"} />
              <Input required type="email" placeholder={lang === "en" ? "Email address" : "ഇമെയിൽ"} />
              <Textarea required rows={5} placeholder={lang === "en" ? "Your message…" : "നിങ്ങളുടെ സന്ദേശം…"} />
              <Button type="submit" className="w-full">
                {lang === "en" ? "Send Message" : "സന്ദേശം അയയ്ക്കുക"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </SiteLayout>
  );
}