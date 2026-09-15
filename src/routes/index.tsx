import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  Globe,
  TrendingUp,
  Layout,
  Building2,
  RefreshCw,
  MessageCircle,
  Instagram,
  Linkedin,
  Mail,
  HardHat,
  Ruler,
  Compass,
  Zap,
  Wrench,
  Users,
  Smartphone,
  Phone,
  ListChecks,
  Headset,
  HeartHandshake,
  Server,
  Check,
} from "lucide-react";

import heroApresentacao from "../assets/hero-apresentacao.png.asset.json";
import casaHero from "../assets/casa-hero.jpg.asset.json";
import portfolioJoaoPedro from "../assets/portfolio-joao-pedro-construcao.png";
import portfolioConstrutora from "../assets/portfolio-construtora.png";
import portfolioRestaurante from "../assets/portfolio-restaurante.png";
import portfolioConstrutoraVermelha from "../assets/portfolio-construtora-vermelha.png";
import portfolioConstrutorAutonomo from "../assets/portfolio-construtor-autonomo.png";

const WHATSAPP_LINK =
  "https://wa.me/5551980540115?text=Quero%20uma%20ideia%20de%20site%20para%20minha%20construtora";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Serviços", href: "#servicos" },
    { label: "Domínio", href: "#dominio" },
    { label: "Para quem", href: "#para-quem" },
    { label: "Projetos", href: "#projetos" },
    { label: "Quem somos", href: "#quem-somos" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-border bg-topbar/95 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "shadow-[0_1px_6px_rgba(15,23,42,0.08)]" : ""
      }`}
    >

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          {"\u00a0LF"}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            Solicitar orçamento
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="grid h-10 w-10 place-items-center rounded-full bg-background shadow-sm md:hidden"

          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="border-t border-border bg-topbar/95 px-4 py-6 backdrop-blur-xl md:hidden">

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Solicitar orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-28 lg:pt-48">
      <img
        src={casaHero.url}
        alt=""
        aria-hidden="true"
        width={1008}
        height={1600}
        loading="lazy"
        className="pointer-events-none absolute right-[6%] top-1/2 h-[600px] w-[480px] -translate-y-1/2 object-cover opacity-20 blur-sm"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Criação de Sites
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Sites profissionais para{" "}
              <span className="text-primary">construtores e construtoras</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Apresente suas obras, seus serviços e sua empresa em um site profissional conectado
              diretamente ao WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
              >
                Quero meu site
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projetos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-secondary"
              >
                Ver projetos
              </a>
            </div>
          </div>

          <div className="animate-fade-in-delayed relative">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <div className="absolute -inset-6 rounded-full bg-primary/5 blur-3xl" />
              <img
                src={heroApresentacao.url}
                alt="Site profissional de construtora apresentado em computador e celular"
                width={1122}
                height={1402}
                className="relative z-10 w-full rounded-2xl border border-border/60 shadow-2xl shadow-foreground/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Mais credibilidade",
      description: "Um site profissional aumenta a confiança dos seus clientes.",
    },
    {
      icon: Globe,
      title: "Presença online",
      description: "Faça sua empresa ser encontrada e apresentada 24 horas por dia.",
    },
    {
      icon: TrendingUp,
      title: "Mais oportunidades",
      description: "Transforme visitantes em novos contatos.",
    },
  ];

  return (
    <section id="beneficios" className="bg-topbar px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Por que sua construtora precisa de uma apresentação profissional?
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Layout,
      title: "Landing Pages",
      description: "Páginas focadas em apresentar produtos e serviços.",
    },
    {
      icon: Building2,
      title: "Sites Institucionais",
      description: "Sites completos para empresas profissionais.",
    },
    {
      icon: RefreshCw,
      title: "Redesign de Sites",
      description: "Modernização de sites antigos.",
    },
  ];

  return (
    <section id="servicos" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            O que eu crio
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <div className="group h-full rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainHosting() {
  const items = [
    {
      icon: Globe,
      title: "Domínio",
      description:
        "É o endereço do seu site, como suaempresa.com.br. É o nome que seus clientes digitam para encontrar você na internet.",
    },
    {
      icon: Server,
      title: "Hospedagem",
      description:
        "É o que mantém o seu site funcionando na internet, disponível para quem procurar por ele a qualquer hora.",
    },
  ];

  const includes = [
    "Registro do domínio",
    "Configuração da hospedagem",
    "Publicação do site",
  ];

  return (
    <section id="dominio" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border bg-secondary/50 p-8 sm:p-12 lg:p-16">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Parte técnica resolvida
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Domínio e Hospedagem
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {items.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-background p-8">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 rounded-2xl border border-primary/15 bg-background p-8 text-center lg:p-12">
              <p className="text-lg font-semibold leading-relaxed text-foreground">
                Você não precisa se preocupar com essa parte técnica.
              </p>
              <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                Eu cuido do registro do domínio, da configuração da hospedagem e da publicação do
                seu site.
              </p>

              <div className="mx-auto mt-8 flex w-fit flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8">
                {includes.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-start gap-2 text-left text-sm font-semibold text-foreground sm:items-center"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:mt-0" />
                    <span>{label}</span>
                  </span>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-xl text-xl font-bold text-primary sm:text-2xl">
                Você cuida da sua empresa. Eu cuido do seu site.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
              >
                Quero meu site completo
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const audience = [
    {
      icon: Building2,
      title: "Construtoras",
      description: "Empresas que querem apresentar obras e portfólio com seriedade.",
    },
    {
      icon: HardHat,
      title: "Construtores",
      description: "Profissionais que precisam passar confiança antes do orçamento.",
    },
    {
      icon: Ruler,
      title: "Engenheiros",
      description: "Autoridade técnica traduzida em uma página clara e objetiva.",
    },
    {
      icon: Compass,
      title: "Arquitetos",
      description: "Um espaço para mostrar projetos com o padrão visual que eles exigem.",
    },
    {
      icon: Zap,
      title: "Eletricistas",
      description: "Serviços apresentados de forma simples, com contato direto no WhatsApp.",
    },
    {
      icon: Wrench,
      title: "Instaladores",
      description: "Páginas rápidas para quem depende de chamados e indicações.",
    },
  ];

  return (
    <section id="para-quem" className="bg-topbar px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Para quem eu crio sites
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Se a sua empresa depende da confiança do cliente, esse site é para você
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-6" delay={0.1}>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:p-8">
            <div className="flex items-start gap-4 text-center sm:text-left">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  E outros profissionais da construção civil
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Se o seu trabalho precisa ser apresentado com profissionalismo, eu crio o seu
                  site.
                </p>
              </div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    {
      image: portfolioJoaoPedro,
      title: "Construções em Condomínio",
      description: "Site institucional para construtora, com foco em credibilidade e conversão.",
    },
    {
      image: portfolioConstrutora,
      title: "Construtora",
      description: "Site corporativo para empresa do setor da construção.",
    },
    {
      image: portfolioConstrutorAutonomo,
      title: "Construtor Autônomo",
      description: "Site profissional para construtor autônomo, com foco em orçamentos.",
    },
    {
      image: portfolioConstrutoraVermelha,
      title: "Construtora Alfa",
      description: "Site para construtora com identidade visual em vermelho e foco em projetos.",
    },
  ];

  return (
    <section id="projetos" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Alguns projetos
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={project.image}
                    alt={`Projeto ${project.title}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function Trust() {
  const guarantees = [
    {
      icon: MessageCircle,
      title: "Atendimento humanizado",
      description: "Você conversa com nossa equipe do começo ao fim, sem intermediários.",
    },
    {
      icon: Layout,
      title: "Projeto personalizado",
      description: "Nada de modelo pronto: cada site é criado para a sua empresa.",
    },
    {
      icon: Smartphone,
      title: "Site adaptado para celular",
      description: "Sua apresentação funciona bem em qualquer tela.",
    },
    {
      icon: Phone,
      title: "Botão para WhatsApp",
      description: "O cliente pede orçamento com um clique, direto no seu número.",
    },
    {
      icon: ListChecks,
      title: "Organização das informações",
      description: "Serviços, obras e contatos apresentados de forma clara.",
    },
    {
      icon: Headset,
      title: "Suporte durante o desenvolvimento",
      description: "Acompanho cada etapa e ajusto o que for necessário.",
    },
  ];

  return (
    <section id="confianca" className="bg-topbar px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Você cuida da sua obra. <span className="text-primary">Eu cuido da sua presença online.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Você me envia as informações, fotos e serviços da sua empresa. Eu organizo tudo e
            desenvolvo uma apresentação profissional para o seu negócio.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-foreground/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Planejamento",
      description: "Entendo seu negócio e seus objetivos.",
    },
    {
      number: "02",
      title: "Criação",
      description: "Desenvolvo um site moderno e personalizado.",
    },
    {
      number: "03",
      title: "Entrega",
      description: "Seu site pronto para apresentar sua empresa.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como funciona
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.1}>
              <div className="relative text-center">
                <span className="text-5xl font-extrabold text-primary/20">{step.number}</span>
                <h3 className="mt-4 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const people = [
    {
      initials: "LF",
      name: "Leonardo Fernandes",
      role: "Criação e desenvolvimento",
      description:
        "Responsável pela criação dos sites, cuidando do visual e da organização das páginas para destacar sua empresa, seus serviços e suas obras.",
    },
    {
      initials: "FB",
      name: "Flávia Bittencourt",
      role: "Atendimento e relacionamento",
      description:
        "Responsável pelo contato com você, ajudando a reunir as informações do projeto, esclarecer dúvidas e acompanhar cada etapa junto com você.",
    },
  ];

  return (
    <section id="quem-somos" className="bg-topbar px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Quem somos
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Uma parceria em família para{" "}
            <span className="text-primary">valorizar o seu negócio</span> na internet.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-lg leading-relaxed text-muted-foreground">
            <p>
              Somos Leonardo e Flávia, o casal por trás da LF. Trabalhamos juntos para ajudar
              construtoras e profissionais da construção a apresentar seus serviços com mais
              profissionalismo e facilitar o contato com novos clientes.
            </p>
            <p>
              Sabemos que quem está no dia a dia da obra tem pouco tempo para cuidar da presença na
              internet. Por isso, nosso atendimento é simples e próximo: ouvimos suas ideias,
              explicamos cada etapa e organizamos as informações para criar um site que represente o
              seu trabalho.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16 text-center">
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Quem cuida de cada etapa
          </h3>
        </ScrollReveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {people.map((person, index) => (
            <ScrollReveal key={person.name} delay={index * 0.1}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-foreground/5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {person.initials}
                </span>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{person.name}</h4>
                  <p className="text-sm font-semibold text-primary">{person.role}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{person.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl bg-brand-deep p-8 text-center shadow-2xl shadow-brand-deep/25 sm:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/45 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative z-10">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15 text-primary-foreground">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl">
                Nosso compromisso
              </h3>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/80">
                Tratar o seu projeto com atenção, manter uma comunicação clara e valorizar aquilo que
                você construiu com tanto esforço.
              </p>
              <p className="mx-auto mt-6 max-w-xl text-lg font-semibold leading-snug text-primary-foreground">
                Solicite uma ideia de site para a sua construtora.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-base font-semibold text-brand-deep transition-all hover:bg-primary-foreground/90 hover:shadow-xl hover:shadow-primary-foreground/20"
              >
                <MessageCircle className="h-5 w-5" />
                Converse com a gente pelo WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="bg-footer px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-white">Leonardo LF</p>
            <p className="mt-1 text-sm text-footer-muted">Criação de sites profissionais</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/sites_para_contrutoras/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contato@leonardolf.com"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-8 text-center">
          <p className="text-sm text-footer-muted">
            © {new Date().getFullYear()} Leonardo LF. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sites para Construtoras e Construtores | Leonardo LF" },
      {
        name: "description",
        content:
          "Cuido da apresentação profissional da sua construtora na internet: site moderno, rápido e estratégico para passar confiança e conquistar novos clientes.",
      },
      { property: "og:title", content: "Sites para Construtoras e Construtores | Leonardo LF" },
      {
        property: "og:description",
        content:
          "Cuido da apresentação profissional da sua construtora na internet: site moderno, rápido e estratégico para passar confiança e conquistar novos clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <DomainHosting />
        <Audience />
        <Portfolio />
        <Trust />
        <HowItWorks />
        <About />
      </main>
      <Footer />
    </div>
  );
}
