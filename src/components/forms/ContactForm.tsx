"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().optional(),
  appointmentDate: z.string().optional(),
  message: z.string().min(10, "Not en az 10 karakter olmalı"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof FormData, string[]>>;

type ContactFormProps = {
  formTitle?: string;
  successMessage?: string;
};

export function ContactForm({
  formTitle = "Randevu Talep Et",
  successMessage = "Randevu talebiniz alındı. En kısa sürede size dönüş yapacağız.",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    const result = schema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        if (data.error && typeof data.error === "object") {
          setFieldErrors(data.error);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 border border-primary flex items-center justify-center mx-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-serif text-2xl font-light text-foreground">{successMessage}</p>
        <p className="font-sans text-sm text-muted-foreground">En kısa sürede sizinle iletişime geçeceğiz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {formTitle && (
        <h2 className="font-serif text-3xl font-light text-foreground mb-8">{formTitle}</h2>
      )}

      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Ad Soyad + Telefon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
            Ad Soyad <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Adınız Soyadınız"
            aria-invalid={!!fieldErrors.name}
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary"
          />
          {fieldErrors.name && (
            <p className="text-xs text-destructive">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
            Telefon
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+90 5__ ___ __ __"
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary"
          />
        </div>
      </div>

      {/* E-posta + Tarih */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
            E-posta <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@mail.com"
            aria-invalid={!!fieldErrors.email}
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary"
          />
          {fieldErrors.email && (
            <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="appointmentDate" className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
            Tercih Edilen Tarih
          </Label>
          <Input
            id="appointmentDate"
            name="appointmentDate"
            type="date"
            value={formData.appointmentDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary"
          />
        </div>
      </div>

      {/* Not / İstek */}
      <div className="space-y-2">
        <Label htmlFor="message" className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
          Not / İstek <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Hangi hizmeti talep ediyorsunuz? Varsa özel isteklerinizi yazabilirsiniz."
          rows={5}
          aria-invalid={!!fieldErrors.message}
          className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none"
        />
        {fieldErrors.message && (
          <p className="text-xs text-destructive">{fieldErrors.message[0]}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Bir hata oluştu. Lütfen tekrar deneyin.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/85 text-[10px] tracking-[0.3em] uppercase py-6 transition-all duration-300"
      >
        {status === "loading" ? "Gönderiliyor..." : "Randevu Talep Et"}
      </Button>
    </form>
  );
}
