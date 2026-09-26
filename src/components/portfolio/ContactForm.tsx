import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

const SERVICE_ID = "service_szn24kw";
const TEMPLATE_ID = "template_ei61e02";
const PUBLIC_KEY = "OrvRuTo6piBjMViXB";

type Status = "idle" | "sending" | "sent" | "error";

const GMAIL_FALLBACK = "https://mail.google.com/mail/?view=cm&fs=1&to=gerbinguio@gmail.com";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg("Email isn't configured yet.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const formData = new FormData(formRef.current);
      // Loaded on demand so the email SDK isn't part of the initial bundle.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        },
        {
          publicKey: PUBLIC_KEY,
        },
      );
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. Please try again, or email me directly.",
      );
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[22rem] flex-col items-start justify-center">
        <CheckCircle2 aria-hidden className="size-6 text-brand" />
        <h3 className="mt-4 text-xl font-semibold tracking-tight">Message sent</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
          Thanks for reaching out — I'll get back to you soon, usually within the day.
        </p>
        <Button variant="link" onClick={() => setStatus("idle")} className="mt-5">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Send a message</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Got a project in mind? Tell me about it and I'll get back to you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="user_name" className="text-sm font-medium">
            Name
          </label>
          <Input id="user_name" type="text" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="user_email" className="text-sm font-medium">
            Email
          </label>
          <Input id="user_email" type="email" name="email" required autoComplete="email" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What can I help you build?"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-h-5 text-sm" role="alert" aria-live="assertive">
          {status === "error" && (
            <span className="text-destructive">
              {errorMsg}{" "}
              <a
                href={GMAIL_FALLBACK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Open Gmail instead
              </a>
            </span>
          )}
        </div>
        <Button type="submit" disabled={status === "sending"} className="group ml-auto">
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
