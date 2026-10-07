import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/painel")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel de contatos | Leonardo LF" },
      { name: "description", content: "Área restrita para ver os pedidos de orçamento recebidos pelo site." },
      { property: "og:title", content: "Painel de contatos | Leonardo LF" },
      { property: "og:description", content: "Área restrita para ver os pedidos de orçamento recebidos pelo site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Painel,
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  company: string | null;
  business_type: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const input =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary";

function Painel() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return null;
  return (
    <div className="min-h-screen bg-topbar px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-foreground">LF · Painel de contatos</Link>
          {session && (
            <button onClick={() => supabase.auth.signOut()} className="text-sm text-muted-foreground hover:text-foreground">
              Sair
            </button>
          )}
        </div>
        {session ? <Leads /> : <Login />}
      </div>
    </div>
  );
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg("E-mail ou senha incorretos.");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/painel` },
      });
      setMsg(error ? error.message : "Conta criada! Confirme pelo link enviado ao seu e-mail.");
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-16 max-w-sm space-y-4 rounded-3xl bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">{mode === "in" ? "Entrar" : "Criar conta"}</h1>
      <input className={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className={input} type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <button className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">
        {mode === "in" ? "Entrar" : "Criar conta"}
      </button>
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-primary">
        {mode === "in" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
      </button>
    </form>
  );
}

function Leads() {
  const [leads, setLeads] = useState<Lead[] | null>(null);

  async function load() {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: string) {
    await supabase.from("leads").update({ status }).eq("id", id);
    load();
  }

  if (!leads) return <p className="mt-10 text-muted-foreground">Carregando...</p>;
  if (leads.length === 0)
    return (
      <p className="mt-10 rounded-2xl bg-card p-8 text-center text-muted-foreground">
        Nenhum contato ainda (ou esta conta não tem acesso de administrador).
      </p>
    );

  return (
    <div className="mt-8 space-y-4">
      <p className="text-sm text-muted-foreground">{leads.length} contato(s)</p>
      {leads.map((l) => (
        <div key={l.id} className="rounded-2xl bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">{l.name}</p>
              <p className="text-sm text-muted-foreground">
                {[l.company, l.business_type].filter(Boolean).join(" · ") || "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString("pt-BR")}</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className="rounded-lg border border-input bg-background px-2 py-1 text-sm">
                <option value="novo">Novo</option>
                <option value="em contato">Em contato</option>
                <option value="fechado">Fechado</option>
                <option value="perdido">Perdido</option>
              </select>
              <a
                href={`https://wa.me/${l.phone.replace(/\D/g, "").replace(/^(?!55)/, "55")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <p className="mt-2 text-sm text-foreground">📞 {l.phone}</p>
          {l.message && <p className="mt-2 text-sm text-muted-foreground">{l.message}</p>}
        </div>
      ))}
    </div>
  );
}
