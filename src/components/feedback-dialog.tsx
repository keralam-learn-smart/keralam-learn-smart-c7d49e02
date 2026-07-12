import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useSite } from "@/lib/site-context";
import { supabase } from "@/integrations/supabase/client";

type Kind = "feedback" | "suggestion" | "bug" | "rating";

export function FeedbackDialog({
  children,
  kind = "feedback",
}: {
  children: React.ReactNode;
  kind?: Kind;
}) {
  const { lang } = useSite();
  const ml = lang === "ml" ? "lang-ml" : "";
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const titles: Record<Kind, { en: string; ml: string }> = {
    feedback: { en: "Send Feedback", ml: "അഭിപ്രായം അയയ്ക്കുക" },
    suggestion: { en: "Suggest a Feature", ml: "നിർദ്ദേശം നൽകുക" },
    bug: { en: "Report a Bug", ml: "ബഗ് റിപ്പോർട്ട് ചെയ്യുക" },
    rating: { en: "Rate Traffic Tips", ml: "റേറ്റിംഗ് നൽകുക" },
  };

  const submit = async () => {
    if (!message.trim() && kind !== "rating") {
      toast.error(lang === "en" ? "Please write something" : "ദയവായി എന്തെങ്കിലും എഴുതുക");
      return;
    }
    setBusy(true);
    try {
      const { error } = await (supabase as any).from("feedback").insert({
        kind,
        rating: rating || null,
        email: email || null,
        message: message || null,
      });
      if (error) throw error;
      toast.success(lang === "en" ? "Thanks! Submitted." : "നന്ദി! സമർപ്പിച്ചു.");
      setOpen(false);
      setRating(0);
      setEmail("");
      setMessage("");
    } catch (e: any) {
      toast.error(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={ml}>
            {lang === "en" ? titles[kind].en : titles[kind].ml}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {(kind === "rating" || kind === "feedback") && (
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`Rate ${n}`}>
                  <Star
                    className={`h-7 w-7 ${n <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          )}
          <Input
            type="email"
            placeholder={lang === "en" ? "Your email (optional)" : "ഇമെയിൽ (ഓപ്ഷണൽ)"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textarea
            rows={4}
            placeholder={lang === "en" ? "Type your message..." : "നിങ്ങളുടെ സന്ദേശം..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={submit} disabled={busy} className="w-full">
            {busy ? "..." : lang === "en" ? "Submit" : "സമർപ്പിക്കുക"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
