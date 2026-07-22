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
} from "lucide-react";

import heroMockup from "../assets/hero-mockup.png";
import casaHero from "../assets/casa-hero.jpg.asset.json";
import portfolioJoaoPedro from "../assets/portfolio-joao-pedro-construcao.png";
import portfolioConstrutora from "../assets/portfolio-construtora.png";
import portfolioRestaurante from "../assets/portfolio-restaurante.png";
import portfolioAcademia from "../assets/portfolio-academia.png";
import portfolioConstrutorAutonomo from "../assets/portfolio-construtor-autonomo.png";

const WHATSAPP_LINK =
  "https://wa.me/5551998232206?text=Ol%C3%A1!%20Gostaria%20de%20construir%20meu%20site.";

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
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          Leonardo LF
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
          className="grid h-10 w-10 place-items-center rounded-full bg-secondary md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
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
              Sites profissionais que ajudam empresas a{" "}
              <span className="text-primary">crescer na internet</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Crio sites modernos, rápidos e estratégicos para empresas que querem passar mais
              confiança e conquistar novos clientes.
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
            <div className="relative mx-auto max-w-2xl">
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-3xl" />
              <img
                src={heroMockup}
                alt="Mockup de site profissional em computador e celular"
                width={1200}
                height={800}
                className="relative z-10 w-full"
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
    <section id="beneficios" className="bg-secondary/40 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Por que sua empresa precisa de um site profissional?
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

function Portfolio() {
  const projects = [
    {
      image: portfolioJoaoPedro,
      title: "João Pedro Construção",
      description: "Site institucional para construtora, com foco em credibilidade e conversão.",
    },
    {
      image: portfolioConstrutora,
      title: "Construtora",
      description: "Site corporativo para empresa do setor da construção.",
    },
    {
      image: portfolioRestaurante,
      title: "Restaurante",
      description: "Site moderno para restaurante com foco em conversão.",
    },
    {
      image: portfolioAcademia,
      title: "Academia",
      description: "Site para academia com design dinâmico e impactante.",
    },
  ];

  return (
    <section id="projetos" className="bg-secondary/40 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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

function FinalCTA() {
  return (
    <section id="contato" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-12 lg:py-20">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Pronto para ter um site profissional?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
                Solicite uma ideia de site para sua empresa.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
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
    <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-foreground">Leonardo LF</p>
            <p className="mt-1 text-sm text-muted-foreground">Criação de sites profissionais</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contato@leonardolf.com"
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Leonardo LF. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const Route = createFileRoute("/")({
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
        <Portfolio />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
