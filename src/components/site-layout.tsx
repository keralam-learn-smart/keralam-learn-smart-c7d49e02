import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, Languages, LogIn, User as UserIcon, LogOut } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSite } from "@/lib/site-context";
import { useAuth } from "@/lib/auth-context";

type NavItem = { to: string; en: string; ml: string };
type NavGroup = { en: string; ml: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    en: "Learn",
    ml: "പഠിക്കുക",
    items: [
      { to: "/", en: "Home", ml: "ഹോം" },
      { to: "/category/traffic-signs", en: "Traffic Signs", ml: "ഗതാഗത ചിഹ്നങ്ങൾ" },
      { to: "/category/traffic-signals", en: "Traffic Signals", ml: "ഗതാഗത സിഗ്നലുകൾ" },
      { to: "/category/police-hand-signals", en: "Police Hand Signals", ml: "പോലീസ് കൈ സിഗ്നലുകൾ" },
      { to: "/category/road-markings", en: "Road Markings", ml: "റോഡ് അടയാളങ്ങൾ" },
      { to: "/category/road-rules", en: "Road Rules", ml: "റോഡ് നിയമങ്ങൾ" },
    ],
  },
  {
    en: "Licence",
    ml: "ലൈസൻസ്",
    items: [
      { to: "/category/learner-licence", en: "Learner Licence", ml: "ലേണർ ലൈസൻസ്" },
      { to: "/category/driving-licence", en: "Driving Licence", ml: "ഡ്രൈവിങ് ലൈസൻസ്" },
      { to: "/category/vehicle-documents", en: "Vehicle Documents", ml: "വാഹന രേഖകൾ" },
      { to: "/category/insurance", en: "Insurance", ml: "ഇൻഷുറൻസ്" },
      { to: "/category/penalties", en: "Penalties & Fines", ml: "പിഴകൾ" },
      { to: "/fee-calculator", en: "Fee Calculator", ml: "ഫീസ് കാൽക്കുലേറ്റർ" },
      { to: "/application-tracking", en: "Application Tracking", ml: "അപേക്ഷാ ട്രാക്കിങ്" },
    ],
  },
  {
    en: "Safety",
    ml: "സുരക്ഷ",
    items: [
      { to: "/category/road-safety", en: "Road Safety", ml: "റോഡ് സുരക്ഷ" },
      { to: "/category/defensive-driving", en: "Defensive Driving", ml: "ഡിഫൻസീവ് ഡ്രൈവിങ്" },
      { to: "/category/first-aid", en: "First Aid", ml: "പ്രഥമ ശുശ്രൂഷ" },
      { to: "/category/emergency", en: "Emergency Situations", ml: "അടിയന്തിര സാഹചര്യങ്ങൾ" },
    ],
  },
  {
    en: "Test",
    ml: "ടെസ്റ്റ്",
    items: [
      { to: "/quiz", en: "Practice Tests", ml: "പരിശീലന ടെസ്റ്റുകൾ" },
      { to: "/mock-tests", en: "Mock Tests", ml: "മോക്ക് ടെസ്റ്റുകൾ" },
      { to: "/ai-assistant", en: "AI Study Assistant", ml: "AI പഠന സഹായി" },
    ],
  },
  {
    en: "About",
    ml: "കുറിച്ച്",
    items: [
      { to: "/about", en: "About Us", ml: "ഞങ്ങളെക്കുറിച്ച്" },
      { to: "/contact", en: "Contact", ml: "ബന്ധപ്പെടുക" },
      { to: "/faq", en: "FAQ", ml: "സാധാരണ ചോദ്യങ്ങൾ" },
    ],
  },
];

const FOOTER_LINKS: NavItem[] = [
  { to: "/about", en: "About Us", ml: "ഞങ്ങളെക്കുറിച്ച്" },
  { to: "/contact", en: "Contact Us", ml: "ബന്ധപ്പെടുക" },
  { to: "/privacy", en: "Privacy Policy", ml: "സ്വകാര്യതാ നയം" },
  { to: "/terms", en: "Terms & Conditions", ml: "നിബന്ധനകൾ" },
  { to: "/disclaimer", en: "Disclaimer", ml: "നിരാകരണം" },
  { to: "/faq", en: "FAQ", ml: "സാധാരണ ചോദ്യങ്ങൾ" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const { lang, toggleLang, dark, toggleDark } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle className={ml}>
                  {lang === "en" ? "Traffic Tips" : "ട്രാഫിക് ടിപ്സ്"}
                </SheetTitle>
              </SheetHeader>
              <nav className="p-4">
                {NAV.map((g) => (
                  <div key={g.en} className="mb-4">
                    <p className={`mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${ml}`}>
                      {lang === "en" ? g.en : g.ml}
                    </p>
                    <ul className="space-y-1">
                      {g.items.map((it) => (
                        <li key={it.to}>
                          <Link
                            to={it.to}
                            onClick={() => setOpen(false)}
                            className={`block rounded-md px-3 py-2 text-sm transition hover:bg-primary/10 hover:text-primary ${ml}`}
                          >
                            {lang === "en" ? it.en : it.ml}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-base font-bold text-primary-foreground shadow-sm">
              K
            </div>
            <div className="min-w-0">
              <p className={`truncate text-sm font-bold leading-tight sm:text-base ${ml}`}>
                {lang === "en" ? "Traffic Tips" : "ട്രാഫിക് ടിപ്സ്"}
              </p>
              <p className={`hidden truncate text-[10px] text-muted-foreground sm:block ${ml}`}>
                {lang === "en"
                  ? "Kerala RTO Learning & Test Platform"
                  : "കേരള RTO പഠന-പരീക്ഷാ പ്ലാറ്റ്ഫോം"}
              </p>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLang}
              aria-label="Toggle language"
              title={lang === "en" ? "Switch to Malayalam" : "Switch to English"}
            >
              <Languages className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-12 border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-base font-bold text-primary-foreground">
                  K
                </div>
                <p className={`font-bold ${ml}`}>
                  {lang === "en" ? "Traffic Tips" : "ട്രാഫിക് ടിപ്സ്"}
                </p>
              </div>
              <p className={`mt-2 text-xs text-muted-foreground ${ml}`}>
                {lang === "en"
                  ? "Free bilingual learning, mock tests and AI tutor for the Kerala RTO Learner Licence exam."
                  : "കേരള RTO ലേണർ ലൈസൻസ് പരീക്ഷയ്ക്ക് സൗജന്യ ദ്വിഭാഷാ പഠനം, മോക്ക് ടെസ്റ്റുകൾ, AI ട്യൂട്ടർ."}
              </p>
            </div>

            <div>
              <p className={`mb-2 text-sm font-semibold ${ml}`}>
                {lang === "en" ? "Learn" : "പഠിക്കുക"}
              </p>
              <ul className="space-y-1 text-sm">
                {NAV[0].items.slice(0, 5).map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} className={`text-muted-foreground hover:text-primary ${ml}`}>
                      {lang === "en" ? it.en : it.ml}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={`mb-2 text-sm font-semibold ${ml}`}>
                {lang === "en" ? "Tests" : "ടെസ്റ്റ്"}
              </p>
              <ul className="space-y-1 text-sm">
                {NAV[3].items.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} className={`text-muted-foreground hover:text-primary ${ml}`}>
                      {lang === "en" ? it.en : it.ml}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={`mb-2 text-sm font-semibold ${ml}`}>
                {lang === "en" ? "Company" : "കമ്പനി"}
              </p>
              <ul className="space-y-1 text-sm">
                {FOOTER_LINKS.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} className={`text-muted-foreground hover:text-primary ${ml}`}>
                      {lang === "en" ? it.en : it.ml}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Traffic Tips. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function UserMenu() {
  const { user, profile, signOut, loading } = useAuth();
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const t = (en: string, m: string) => (lang === "en" ? en : m);

  if (loading) {
    return <div className="h-9 w-9" aria-hidden />;
  }

  if (!user) {
    return (
      <Button asChild size="sm" className="ml-1 h-9">
        <Link to="/auth">
          <LogIn className="mr-1.5 h-4 w-4" />
          <span className={ml}>{t("Sign In", "സൈൻ ഇൻ")}</span>
        </Link>
      </Button>
    );
  }

  const name = profile?.full_name || user.email || "U";
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-1 rounded-full" aria-label="Account">
          <Avatar className="h-8 w-8">
            {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">
          <p className={`truncate text-sm font-medium ${ml}`}>{name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className={ml}>
            <UserIcon className="mr-2 h-4 w-4" />
            {t("My Profile", "എന്റെ പ്രൊഫൈൽ")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className={ml}>
          <LogOut className="mr-2 h-4 w-4" />
          {t("Sign out", "സൈൻ ഔട്ട്")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}