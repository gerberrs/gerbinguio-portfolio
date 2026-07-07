"use client";

import { motion } from "framer-motion";
import { Download, Facebook, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../../components/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "gerbinguio@gmail.com",
    href: "mailto:gerbinguio@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 994 040 1002",
    href: "tel:+639940401002",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "facebook.com/gerbinguio.victorino.3",
    href: "https://facebook.com/gerbinguio.victorino.3",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Pedro City, Laguna, Philippines",
    href: null,
  },
];

const profiles = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gerb-victorino-41a183366/",
  },
  { label: "GitHub", href: "https://github.com/gerberrs" },
  {
    label: "OnlineJobs",
    href: "https://www.onlinejobs.ph/jobseekers/info/4175877",
  },
  {
    label: "Indeed",
    href: "https://www.linkedin.com/in/gerbinguio-victorino-41a183366/",
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-full px-6 sm:px-10 pb-20">
      {/* Header */}
      <div className="pt-12 sm:pt-16 text-center mb-12 sm:mb-16">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-ink-500 font-semibold mb-3">
          Let's work together
        </p>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-none text-ink-900">
          CONTACT<span className="text-blue-deep">.</span>
        </h1>
        <p className="text-sm sm:text-base text-ink-500 mt-4 max-w-xl mx-auto">
          I'm open to freelance, collaborations, or full-time opportunities.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact info card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <h2 className="font-display text-lg text-ink-900 mb-2">
            CONTACT <span className="text-blue-deep">INFO</span>
          </h2>
          {contactInfo.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-blue-soft flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-blue-deep" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-ink-500 font-semibold">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-ink-900 font-medium break-all hover:text-blue-deep transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-ink-900 font-medium break-all">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Profiles + resume card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="glass rounded-2xl p-6 flex flex-col"
        >
          <h2 className="font-display text-lg text-ink-900 mb-4">
            ONLINE <span className="text-blue-deep">PROFILES</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {profiles.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full glass glass-hover text-sm font-medium text-ink-700 hover:text-blue-deep"
              >
                {profile.label}
              </a>
            ))}
          </div>
          <a
            href="/Victorino-2026-CV.pdf"
            download
            className="mt-auto pt-6 inline-flex"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue text-base-950 rounded-xl text-sm font-semibold hover:bg-blue-deep transition-colors shadow-md">
              <Download className="w-4 h-4" />
              Download Resume
            </span>
          </a>
        </motion.div>
      </div>

      {/* Real email submission form (EmailJS) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="max-w-4xl mx-auto mt-10"
      >
        <ContactForm />
      </motion.div>

      {/* Footer */}
      <p className="text-center text-ink-500 text-xs mt-14">
        © 2026 Gerbinguio Victorino · Made with{" "}
        <span className="text-ink-900 font-semibold">TypeScript</span> &{" "}
        <span className="text-ink-900 font-semibold">Tailwind CSS</span>
      </p>
    </div>
  );
};

export default ContactPage;
