import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Traffic Tips" },
      { name: "description", content: "How Traffic Tips handles data, cookies and analytics." },
      { property: "og:title", content: "Privacy Policy — Traffic Tips" },
      { property: "og:description", content: "Our privacy practices, in plain language." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  return (
    <SiteLayout>
      <article className={`mx-auto max-w-3xl px-4 py-8 ${ml}`}>
        <h1 className="text-3xl font-bold">
          {lang === "en" ? "Privacy Policy" : "സ്വകാര്യതാ നയം"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "en" ? "Last updated: June 2026" : "അവസാനം പുതുക്കിയത്: ജൂൺ 2026"}
        </p>

        <div className="prose prose-sm mt-6 max-w-none dark:prose-invert">
          <h2>1. {lang === "en" ? "Information we collect" : "ഞങ്ങൾ ശേഖരിക്കുന്ന വിവരങ്ങൾ"}</h2>
          <p>
            {lang === "en"
              ? "Traffic Tips is designed to be privacy-first. We do not require account registration. Anonymous usage data (page views, test progress) may be stored locally on your device to remember your progress."
              : "ട്രാഫിക് ടിപ്സ് സ്വകാര്യതയ്ക്ക് മുൻഗണന നൽകുന്നു. അക്കൗണ്ട് രജിസ്ട്രേഷൻ ആവശ്യമില്ല. പേജ് കാഴ്ചകൾ, ടെസ്റ്റ് പുരോഗതി പോലുള്ള അജ്ഞാത ഉപയോഗ ഡാറ്റ നിങ്ങളുടെ ഉപകരണത്തിൽ പ്രാദേശികമായി സംഭരിക്കാം."}
          </p>

          <h2>2. {lang === "en" ? "AI assistant data" : "AI സഹായി ഡാറ്റ"}</h2>
          <p>
            {lang === "en"
              ? "Messages sent to the AI Study Assistant are processed by our AI provider to generate replies. We do not store the conversation on our servers."
              : "AI പഠന സഹായിയിലേക്ക് അയക്കുന്ന സന്ദേശങ്ങൾ മറുപടി തയ്യാറാക്കാൻ ഞങ്ങളുടെ AI ദാതാവ് പ്രോസസ്സ് ചെയ്യും. ഞങ്ങളുടെ സെർവറുകളിൽ സംഭാഷണം സംഭരിക്കില്ല."}
          </p>

          <h2>3. {lang === "en" ? "Cookies & analytics" : "കുക്കികൾ & അനലിറ്റിക്സ്"}</h2>
          <p>
            {lang === "en"
              ? "We use local storage to remember your preferred language and dark-mode setting. We may include third-party advertising (e.g. Google AdSense) which uses cookies in line with Google's privacy policy."
              : "നിങ്ങളുടെ ഭാഷ, ഡാർക്ക് മോഡ് മുൻഗണനകൾ ഓർക്കാൻ ലോക്കൽ സ്റ്റോറേജ് ഉപയോഗിക്കുന്നു. Google AdSense പോലുള്ള മൂന്നാം കക്ഷി പരസ്യങ്ങൾ ഉൾപ്പെടാം."}
          </p>

          <h2>4. {lang === "en" ? "Contact" : "ബന്ധപ്പെടുക"}</h2>
          <p>
            {lang === "en"
              ? "Questions about this policy? Reach us at renjithraj154@gmail.com or +91 94474 80651. Address: Plavarthala Line, Thamalam, Karamana, Thiruvananthapuram – 695012, Kerala, India."
              : "നയത്തെക്കുറിച്ചുള്ള ചോദ്യങ്ങൾ? renjithraj154@gmail.com അല്ലെങ്കിൽ +91 94474 80651 ൽ ബന്ധപ്പെടുക. വിലാസം: പ്ലാവർത്തല ലൈൻ, തമലം, കാരമന, തിരുവനന്തപുരം – 695012, കേരളം."}
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
