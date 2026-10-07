import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "5551980540115";

const schema = z.object({
  name: z.string().trim().min(1, "Informe seu nome").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido")
    .max(20)
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números"),
  company: z.string().trim().max(100).optional(),
  business_type: z.string().trim().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
});

const types = ["Construtora", "Construtor", "Engenheiro", "Arquiteto", "Eletricista", "Instalador", "Outro"];

export function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", business_type: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    const d = parsed.data;
    setSending(true);
    const { error: dbError } = await supabase.from("leads").insert({
      name: d.name,
      phone: d.phone,
      company: d.company || null,
      business_type: d.business_type || null,
      message: d.message || null,
    });
    setSending(false);
    if (dbError) {
      setError("Não foi possível enviar agora. Tente novamente.");
      return;
    }
    setDone(true);
    const text =
      `Olá! Quero uma ideia de site para minha construtora.\n\n` +
      `Nome: ${d.name}\nTelefone: ${d.phone}` +
      (d.company ? `\nEmpresa: ${d.company}` : "") +
      (d.business_type ? `\nÁrea: ${d.business_type}` : "") +
      (d.message ? `\nMensagem: ${d.message}` : "");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  const input =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <section id="orcamento" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Pedir orçamento</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Conte um pouco sobre sua empresa
          </h2>
          <p className="mt-4 text-muted-foreground">
            Preencha os dados abaixo. Depois você continua a conversa direto no WhatsApp.
          </p>
        </div>

        {done ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-foreground">Recebemos seus dados!</h3>
            <p className="mt-2 text-muted-foreground">
              Se o WhatsApp não abriu, clique no botão abaixo.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Quero uma ideia de site para minha construtora")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-5 w-5" /> Abrir WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={input} placeholder="Seu nome *" value={form.name} onChange={set("name")} maxLength={100} />
              <input className={input} placeholder="WhatsApp / telefone *" value={form.phone} onChange={set("phone")} maxLength={20} inputMode="tel" />
              <input className={input} placeholder="Nome da empresa" value={form.company} onChange={set("company")} maxLength={100} />
              <select className={input} value={form.business_type} onChange={set("business_type")}>
                <option value="">Sua área</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <textarea className={input} rows={4} placeholder="Conte o que você precisa (opcional)" value={form.message} onChange={set("message")} maxLength={1000} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
            >
              <MessageCircle className="h-5 w-5" />
              {sending ? "Enviando..." : "Enviar e falar no WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
