"use client";

import { Mandala } from "@/app/components";
import Section from "@/app/components/Section";
import { ChangeEvent, FormEvent, useState } from "react";

interface ContactProps {
  mandalaColor?: string;
  email?: string;
  phone?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact({
  mandalaColor = "#798777",
  email = "meganjblevins@gmail.com",
  phone = "(417) 718-4470",
}: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <Section
      id="contact"
      className="relative overflow-x-clip py-10 md:py-20 lg:py-32"
      style={{ backgroundColor: "#A2B29F" }}
    >
      <div
        className="pointer-events-none absolute -left-8 -top-20 h-[800px] w-[800px] opacity-15"
        aria-hidden="true"
      >
        <Mandala color="#F8EDE3" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-right lg:mb-16">
          <h2
            className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: "#F8EDE3" }}
          >
            Let&apos;s Connect
          </h2>
          <p
            className="mx-auto mt-6 text-lg leading-relaxed md:text-xl text-right"
            style={{ color: "#F8EDE3" }}
          >
            Ready to start your yoga journey or have questions? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F8EDE3]/20">
                  <svg
                    className="h-6 w-6"
                    style={{ color: "#F8EDE3" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-serif text-xl font-semibold"
                    style={{ color: "#F8EDE3" }}
                  >
                    Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 block text-lg transition-opacity duration-200 hover:opacity-80"
                    style={{ color: "#F8EDE3" }}
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F8EDE3]/20">
                  <svg
                    className="h-6 w-6"
                    style={{ color: "#F8EDE3" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-serif text-xl font-semibold"
                    style={{ color: "#F8EDE3" }}
                  >
                    Phone
                  </h3>
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="mt-1 block text-lg transition-opacity duration-200 hover:opacity-80"
                    style={{ color: "#F8EDE3" }}
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <p
                  className="text-base leading-relaxed opacity-90"
                  style={{ color: "#F8EDE3" }}
                >
                  Whether you&apos;re curious about private sessions, group classes, or just want to say hello—drop me a line. I typically respond within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F8EDE3]/95 p-8 shadow-xl backdrop-blur-sm lg:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-primary-text">
                  Message Sent!
                </h3>
                <p className="mt-3 text-primary-text-muted">
                  Thank you for reaching out. I&apos;ll get back to you within 24-48 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent-hover"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-semibold text-primary-text">
                  Send a Message
                </h3>
                <p className="mt-2 text-primary-text-muted">
                  Fill out the form below and I&apos;ll get back to you soon.
                </p>

                {status === "error" && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-primary-text"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className="mt-2 block w-full rounded-xl border-2 border-accent/30 bg-white px-4 py-3 text-primary-text placeholder-primary-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-primary-text"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className="mt-2 block w-full rounded-xl border-2 border-accent/30 bg-white px-4 py-3 text-primary-text placeholder-primary-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary-text"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="mt-2 block w-full rounded-xl border-2 border-accent/30 bg-white px-4 py-3 text-primary-text placeholder-primary-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-primary-text"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="mt-2 block w-full rounded-xl border-2 border-accent/30 bg-white px-4 py-3 text-primary-text placeholder-primary-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Private session inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary-text"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="mt-2 block w-full resize-none rounded-xl border-2 border-accent/30 bg-white px-4 py-3 text-primary-text placeholder-primary-text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Tell me a bit about what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full bg-accent px-8 py-4 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md active:bg-accent-active disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-5 w-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
