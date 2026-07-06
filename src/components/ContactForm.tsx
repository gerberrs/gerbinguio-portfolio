"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { ArrowUp, CheckCircle2, Loader2 } from "lucide-react";

const SERVICE_ID = "service_szn24kw";
const TEMPLATE_ID = "template_ei61e02";
const PUBLIC_KEY = "OrvRuTo6piBjMViXB";

type Status = "idle" | "sending" | "sent" | "error";

const GMAIL_FALLBACK =
  "https://mail.google.com/mail/?view=cm&fs=1&to=gerbinguio@gmail.com";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "Email isn't configured yet. Use the Gmail button below to reach me directly."
      );
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. Please try again, or use the Gmail button below."
      );
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-sand-50 border border-sand-300 rounded-3xl shadow-[0_12px_40px_rgba(34,48,60,0.08)] p-8 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-blue-soft flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-blue-deep" />
        </div>
        <h3 className="font-display text-xl text-ink-900 mb-2">
          MESSAGE <span className="text-blue-deep">SENT</span>
        </h3>
        <p className="text-sm text-ink-500 mb-5">
          Thanks for reaching out — I'll get back to you soon, usually within the
          day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-blue-deep hover:text-blue-dark transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-sand-100 border border-sand-300 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue-soft transition-all";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-sand-50 border border-sand-300 rounded-3xl shadow-[0_12px_40px_rgba(34,48,60,0.08)] p-5 sm:p-6"
    >
      <h3 className="font-display text-lg text-ink-900 mb-1">
        SEND A <span className="text-blue-deep">MESSAGE</span>
      </h3>
      <p className="text-xs text-ink-500 mb-5">
        Got a project in mind? Tell me about it and I'll get back to you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="user_name" className="sr-only">
            Your name
          </label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="user_email" className="sr-only">
            Your email
          </label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            required
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="What can I help you build?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs min-h-[1.25rem]">
          {status === "error" && (
            <span className="text-red-600">{errorMsg}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-900 text-sand-50 rounded-xl text-sm font-semibold hover:bg-blue transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowUp className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {status === "error" && (
        <div className="mt-4 pt-4 border-t border-sand-300 text-center">
          <a
            href={GMAIL_FALLBACK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-deep hover:text-blue-dark transition-colors"
          >
            Open Gmail instead →
          </a>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
