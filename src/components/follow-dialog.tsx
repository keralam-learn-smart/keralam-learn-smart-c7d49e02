import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Facebook, Instagram, Youtube, Send, MessageCircle } from "lucide-react";
import { useSite } from "@/lib/site-context";

export function FollowDialog({ children }: { children: React.ReactNode }) {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const socials = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/", color: "text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/", color: "text-pink-600" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/", color: "text-red-600" },
    { name: "WhatsApp Channel", icon: MessageCircle, href: "https://whatsapp.com/channel/", color: "text-green-600" },
    { name: "Telegram", icon: Send, href: "https://t.me/", color: "text-sky-500" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className={ml}>{lang === "en" ? "Follow Us" : "ഞങ്ങളെ പിന്തുടരുക"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm hover:bg-primary/10">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}