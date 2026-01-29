"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Github, Linkedin, Mail, Send } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { submitContact } from "@/lib/api";
import { cn } from "@/lib/cn";

function IconByKey({ icon }: { icon: string }) {
  switch (icon?.toLowerCase()) {
    case "github":
      return <Github className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "mail":
      return <Mail className="h-4 w-4" />;
    case "send":
      return <Send className="h-4 w-4" />;
    case "discord":
      return <span className="text-sm">💬</span>;
    case "whatsapp":
      return <span className="text-sm">📱</span>;
    default:
      return <span className="text-sm">✦</span>;
  }
}

function applyTemplate(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

export function Contact({
  siteConfig,
  contactData,
}: {
  siteConfig: any;
  contactData?: any | null;
}) {
  const sectionData = contactData ?? {
    eyebrow: "05 • Contact",
    title: "Let's make something people remember.",
    description: "If you have a project or role in mind, I'd love to hear about it.",
  };

  const direct = sectionData?.directLineCard ?? null;
  const form = sectionData?.quickMessageForm ?? null;

  const initialFormState = useMemo(() => {
    const obj: Record<string, string> = {};
    (form?.fields ?? []).forEach((f: any) => {
      obj[f.key] = "";
    });
    return obj;
  }, [form?.fields]);

  const [values, setValues] = useState<Record<string, string>>(initialFormState);
  const [directToast, setDirectToast] = useState<string | null>(null);
  const [formToast, setFormToast] = useState<string | null>(null);

  // NEW: field-level errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => setValues(initialFormState), [initialFormState]);

  useEffect(() => {
    if (!directToast) return;
    const t = window.setTimeout(() => setDirectToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [directToast]);

  useEffect(() => {
    if (!formToast) return;
    const t = window.setTimeout(() => setFormToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [formToast]);

  // --- mailto preview from JSON ---
  const previewMailto = useMemo(() => {
    if (!form?.previewMailto?.enabled) return null;

    const to = form.previewMailto.to ?? siteConfig?.email ?? "";
    const subjectTemplate = form.previewMailto.subjectTemplate ?? "";
    const bodyTemplate = form.previewMailto.bodyTemplate ?? "";

    const vars = {
      ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v || ""])),
      siteName: siteConfig?.site_name ?? siteConfig?.name ?? "Portfolio",
      to,
    };

    const subject = applyTemplate(subjectTemplate, vars);
    const body = applyTemplate(bodyTemplate, vars);

    const tpl = form.previewMailto.template ?? "mailto:{to}?subject={subject}&body={body}";
    return applyTemplate(tpl, {
      to,
      subject: encodeURIComponent(subject),
      body: body, // your JSON may already include %0D%0A
    });
  }, [form?.previewMailto, values, siteConfig]);

  // --- primary action mailto button (from JSON) ---
  const primaryMailtoHref = useMemo(() => {
    const action = direct?.primaryAction;
    if (!action || action.type !== "mailto") return `mailto:${siteConfig?.email ?? ""}`;

    const to = action.mailto?.to ?? siteConfig?.email ?? "";
    const subject = action.mailto?.subject ?? "";
    const body = action.mailto?.bodyTemplate ?? "";

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }, [direct?.primaryAction, siteConfig]);

  const onChange = (key: string, next: string) => {
    setValues((prev) => ({ ...prev, [key]: next }));
    // NEW: clear error as user edits
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  // NEW: validation that works with your dynamic schema + custom message length
  const validate = () => {
    const nextErrors: Record<string, string> = {};

    const fields = form?.fields ?? [];
    for (const f of fields) {
      if (f.enabled === false) continue;

      const key = f.key;
      const val = (values[key] ?? "").trim();

      if (f.required && !val) {
        nextErrors[key] = f.errorRequired ?? `${f.label ?? key} is required.`;
        continue;
      }

      // Custom rule: message min length 10
      if (key === "message" && val && val.length < 10) {
        nextErrors[key] = f.errorMinLength ?? "Message must be at least 10 characters.";
      }

      // Optional: honor JSON minLength if you add it later
      if (typeof f.minLength === "number" && val && val.length < f.minLength) {
        nextErrors[key] = f.errorMinLength ?? `${f.label ?? key} must be at least ${f.minLength} characters.`;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <section id="contact" className="scroll-mt-28">
      <SectionHeader
        eyebrow={sectionData.eyebrow}
        title={sectionData.title}
        desc={sectionData.description}
      />

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        {/* LEFT: Direct line card */}
        <Reveal>
          <div className="gradient-border rounded-2xl">
            <div className="glass rounded-2xl p-6 shadow-glow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium tracking-tight">{direct?.title ?? "Direct line"}</div>
                  <div className="mt-1 text-sm text-muted">{direct?.subtitle ?? ""}</div>
                </div>

                <div className="flex items-center gap-2">
                  {(direct?.topRightIcons ?? []).map((i: any) => (
                    <a
                      key={i.key}
                      href={i.url}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-bg/50 text-muted transition hover:bg-bg/70 hover:text-fg"
                      aria-label={i.label}
                      title={i.label}
                    >
                      <IconByKey icon={i.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Email block */}
              <div className="mt-5 rounded-2xl border border-border/70 bg-bg/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-muted">{direct?.emailBlock?.label ?? "Email"}</div>
                    <div className="mt-1 truncate font-mono text-sm">
                      {direct?.emailBlock?.value ?? siteConfig?.email ?? "you@example.com"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      const v = direct?.emailBlock?.value ?? siteConfig?.email ?? "";
                      await navigator.clipboard.writeText(v);
                      setDirectToast(direct?.emailBlock?.copySuccessText ?? "Copied!");
                    }}

                    className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-bg/50 px-3 py-2 text-xs text-muted transition hover:bg-bg/70 hover:text-fg"
                  >
                    <Copy className="h-4 w-4" />
                    {direct?.emailBlock?.copyButtonText ?? "Copy"}
                  </button>
                </div>
              </div>

              {/* Primary + secondary actions */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={primaryMailtoHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
                >
                  <IconByKey icon={direct?.primaryAction?.icon ?? "mail"} />
                  {direct?.primaryAction?.label ?? "Email me"}
                </a>

                {(direct?.secondaryActions ?? []).map((a: any) => {
                  if (a.type === "whatsapp") {
                    const phone = a.whatsapp?.phone ?? "";
                    const msg = a.whatsapp?.messageTemplate ?? "";
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
                      applyTemplate(msg, {
                        siteName: siteConfig?.site_name ?? siteConfig?.name ?? "Portfolio",
                      })
                    )}`;
                    return (
                      <a
                        key={a.label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-bg/50 px-3 py-2 text-xs text-muted transition hover:bg-bg/70 hover:text-fg"
                      >
                        <IconByKey icon={a.icon} />
                        {a.label}
                      </a>
                    );
                  }

                  if (a.type === "discord") {
                    const url = a.discord?.inviteUrl ?? a.discord?.url ?? "#";
                    return (
                      <a
                        key={a.label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-bg/50 px-3 py-2 text-xs text-muted transition hover:bg-bg/70 hover:text-fg"
                      >
                        <IconByKey icon={a.icon} />
                        {a.label}
                      </a>
                    );
                  }

                  return null;
                })}

                {directToast ? (
                  <span className="rounded-lg border border-border/70 bg-bg/50 px-2 py-1 text-xs text-muted">
                    {directToast}
                  </span>
                ) : null}

              </div>

              <div className="mt-5 text-xs text-muted">{direct?.footerNote ?? ""}</div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT: Quick message form */}
        <Reveal delay={0.05}>
          <form
            className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-sm backdrop-blur"
            onSubmit={async (e) => {
              e.preventDefault();

              // NEW: run validation before calling API
              if (!validate()) {
                setFormToast(form?.submit?.errorMessage ?? "Please fix the highlighted fields.");
                return;
              }

              try {
  await submitContact({
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message,
  });

  setFormToast(form?.submit?.successMessage ?? "Message sent!");
  setValues(initialFormState);
  setErrors({});
} catch (err) {
  setFormToast(form?.submit?.errorMessage ?? "Something went wrong.");
}

            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium tracking-tight">{form?.title ?? "Quick message"}</div>
              <div className="font-mono text-[11px] text-muted">{form?.badgeRightText ?? ""}</div>
            </div>

            <div className="mt-4 grid gap-3">
              {(form?.fields ?? []).map((f: any) => {
                const enabled = f.enabled !== false;
                if (!enabled) return null;

                const hasError = !!errors[f.key];

                const common = {
                  value: values[f.key] ?? "",
                  onChange: (e: any) => onChange(f.key, e.target.value),
                  placeholder: f.placeholder ?? "",
                  maxLength: f.maxLength ?? undefined,
                  required: !!f.required,
                  "aria-invalid": hasError || undefined,
                  "aria-describedby": hasError ? `${f.key}-error` : undefined,
                  className: cn(
                    "rounded-xl border bg-bg/40 px-3 py-2 text-sm text-fg outline-none",
                    "focus:border-accent/50",
                    hasError ? "border-red-500/80 focus:border-red-500" : "border-border/80"
                  ),
                };

                return (
                  <label key={f.key} className="grid gap-1 text-xs text-muted">
                    {f.label}

                    {f.type === "textarea" ? (
                      <textarea {...common} rows={f.rows ?? 5} className={cn(common.className, "min-h-[120px]")} />
                    ) : (
                      <input {...common} type={f.type ?? "text"} />
                    )}

                    {hasError ? (
                      <span id={`${f.key}-error`} className="text-[11px] text-red-500">
                        {errors[f.key]}
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
             <button
  type="submit"
  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
>
  <IconByKey icon={form?.submit?.icon ?? "send"} />
  {form?.submit?.label ?? "Send Message"}
</button>


              {previewMailto ? (
                <a href={previewMailto} className="text-sm text-muted underline decoration-border hover:text-fg">
                  {form?.previewMailto?.label ?? "Preview mailto link"}
                </a>
              ) : null}

              {formToast ? (
                <span className="rounded-lg border border-border/70 bg-bg/50 px-2 py-1 text-xs text-muted">
                  {formToast}
                </span>
              ) : null}
            </div>

          </form>
        </Reveal>
      </div>
    </section>
  );
  
}
