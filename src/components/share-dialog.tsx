import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Facebook, Mail, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useSite } from "@/lib/site-context";

export function ShareDialog({ children }: { children: React.ReactNode }) {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://keralam-learn-smart.lovable.app";
  const title = "Traffic Tips — Kerala RTO Learning";
  const enc = encodeURIComponent;

  const links = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${enc(title + " " + url)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,
    },
    {
      name: "X",
      icon: Send,
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    },
    { name: "Email", icon: Mail, href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(lang === "en" ? "Link copied" : "ലിങ്ക് പകർത്തി");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className={ml}>
            {lang === "en" ? "Share Traffic Tips" : "ട്രാഫിക് ടിപ്സ് പങ്കിടുക"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 rounded-lg border border-border p-3 text-xs hover:bg-primary/10"
            >
              <l.icon className="h-5 w-5" />
              {l.name}
            </a>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md border border-border bg-muted/50 p-2">
          <span className="flex-1 truncate text-xs text-muted-foreground">{url}</span>
          <Button size="sm" variant="ghost" onClick={copy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
