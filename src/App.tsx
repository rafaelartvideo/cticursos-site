import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { courses, getCourseBySlug, siteConfig, type Course, type CourseIcon } from './siteConfig'

const mobileRepairHero = 'data:image/jpeg;base64,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[... ELLIPSIZATION ...]2ZmYngUMHMokJ1Wf3NUF0+XdABUjhucfbR/SMaNn88cWiKwR/DvRryHTFbPvxusfsAcQwGnp1K8G4tmW4x+ibys7BFuV1Fnblti27/fYLuXlE3D7kbXhXuJXc1P1MtzXg+yzk+fsfZjhYVMwn8tKmdbQ/uUgtRKxv1K1FB1gPdWdCnFW6kdmBXCLzeW/eF3gsu6Hj7DzhFK7BUc3LzfniRcOfSs2zhHuQRvqK42GPZ3RPZB24WfNLPqTFrKUeHs9iYhcj0aLXuUUEPGJ/sWwg7pCwZgT/WCrf8AEK+hj7/uGXSb9PbyH2RaK1pDHHVGV6skKQSHMWt5pMDoNWBDQ/aIvuLwfi7cS0Qfmx4zN8MNEsKcq+vubYb6vHfWf1Br5hbz+YhcuPQrmLMERtsvWOerQoBZLD7SLUXsPRRbUCa3SY4ZkxGFrYEg39R+cFXg5ZfHhihRbywaMoHwzv5nH7TUn60b+gzK5R3DhdL0xW3uBNxZ1P7h5hdOw4LDcJVg7j7UNdT84MvsTtoC1/WFpny8lv9I/rBUWPMZTisuwJXxKcl9fGw37vw8MGADLbMhHlWuoVLZTlTSeFYmOy4t1y/ZswPmA5jnzqH7RIbyxw0aP/bcgXSbgGH0rVmQoCrDC/tQlzxN8G6H3fu0k17bfTRIDalrqJWdzYxj8N5g5IOew+05eAYEyzhQl9V/+zGGHSd9bfbQfMMhh3ncfph3jwqbIX/KHrX7Dke7av7iClfi+liTh+oYcWh1rZ77i5mILAhfDp8QGgl38R8rKSTQxXjWfskxj13EcqmxYIz26AGJiKaZUHzNmUP2iXh+9eiFAv8Ajp9lAoDZIKwrPuJ+tgvMCLsFcyNR+4jMpu7EwiNpjyRqa0CZQ9a9ScgiHnAyCpJ2j7H5gocZcsZvha5+nIdTrkPYtrWN/cfMlRVuG02JktwHz8ICpQf7JBFCwKjl04/wCEH8/FU7OSyJkEcWzOhKv23Li4O6WGLHjzFiLzc/j2z8RSHGUP29xFsm0h+K2T0ypsEjKY38x7RqOkw+6c5BOcscTDSwNsnpPxLNRHX5ThbQrXFqwP4hEgsxO6c9jRC0OgyS0I+se41QQdYcHnYo65yzTiTZCHUh2ywiqvwgiLpsb/l9zS4LzQv+CptRUiS+0FqVzNWLOo7vFmpnTcHMRqPFijOH8JoAf/9k'

type IconName =
  | 'check' | 'tools' | 'support' | 'arrow' | 'whatsapp' | 'menu' | 'close'
  | 'clock' | 'users' | 'map' | 'book' | 'home' | 'phone' | 'bolt' | 'shield'
  | 'laptop' | 'desktop' | 'chip' | 'code' | 'money' | 'instagram' | 'facebook' | 'check-solid'

function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  const paths: Record<IconName, ReactNode> = {
    check: <path d="m5 12 4 4L19 6" />,
    'check-solid': <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="m7.8 12.1 2.6 2.6 5.8-6" stroke="#fff" strokeWidth="2.35" strokeLinecap="round" strokeLinejoin="round" /></>,
    tools: <><path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5l6.8 6.8a2 2 0 0 1-2.8 2.8l-6.8-6.8" /><path d="m5 19 4-4" /></>,
    support: <><path d="M4 12a8 8 0 0 1 16 0" /><path d="M4 12v4a2 2 0 0 0 2 2h1v-6H4Zm16 0v4a2 2 0 0 1-2 2h-1v-6h3Z" /></>,
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" strokeWidth="2.6" />,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9.4 8.7c.3 2.3 2 4 4.3 4.7" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" /></>,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    laptop: <><rect x="4" y="4" width="16" height="11" rx="2" /><path d="M2 19h20M8 19l1-4h6l1 4" /></>,
    desktop: <><rect x="3" y="3" width="18" height="12" rx="2" /><path d="M8 21h8M12 15v6" /></>,
    chip: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" /><path d="M10 10h4v4h-4z" /></>,
    code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
    money: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h.01M17 14h.01" /><circle cx="12" cy="12" r="2" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M13.8 22v-8h2.8l.4-3.2h-3.2V8.7c0-.9.3-1.6 1.7-1.6H17V4.2c-.7-.1-1.5-.2-2.3-.2-2.7 0-4.5 1.6-4.5 4.6v2.2H7.5V14h2.7v8h3.6Z" fill="currentColor" stroke="none" />,
  }
  return <svg {...common} className={className}>{paths[name]}</svg>
}

function useSimpleRouter() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (href: string) => {
    const [pathname, hash] = href.split('#')
    const target = pathname || window.location.pathname
    if (target !== window.location.pathname) {
      window.history.pushState({}, '', `${target}${hash ? `#${hash}` : ''}`)
      setPath(target)
      window.scrollTo({ top: 0, behavior: 'auto' })
      if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else if (hash) {
      window.history.pushState({}, '', `#${hash}`)
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return { path, navigate }
}

function InternalLink({ href, navigate, className, children, onClick }: { href: string; navigate: (href: string) => void; className?: string; children: ReactNode; onClick?: () => void }) {
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onClick?.()
    navigate(href)
  }
  return <a href={href} className={className} onClick={handle}>{children}</a>
}

function makeWhatsapp(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

function trackWhatsappClick(source: string, course?: Course) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.('event', 'generate_lead', {
    lead_source: 'whatsapp',
    click_source: source,
    course_name: course?.title ?? 'Institucional',
    course_slug: course?.slug ?? 'home',
  })
}

function Brand({ navigate }: { navigate: (href: string) => void }) {
  return <InternalLink href="/" navigate={navigate} className="brand">
    <img
      className="brand-logo"
      src="/assets/brand/logos/ChatGPT%20Image%2023%20de%20set.%20de%202026,%2010_28_28.png"
      alt="CTI — Centro Técnico Integrado"
    />
  </InternalLink>
}

function Header({ navigate, course }: { navigate: (href: string) => void; course?: Course }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const whatsapp = makeWhatsapp(course?.whatsappMessage ?? siteConfig.contact.whatsappMessage)
  const courseBase = course ? `/cursos/${course.slug}` : ''
  const items = course
    ? [['Início', '/'], ['Sobre', `${courseBase}#curso`], ['Conteúdo', `${courseBase}#conteudo`], ['Inscrição', `${courseBase}#inscricao`], ['Dúvidas', `${courseBase}#duvidas`]]
    : [['Cursos', '/#cursos'], ['Método', '/#metodo'], ['Estrutura', '/#estrutura'], ['Contato', '/#contato']]

  return <header className="header">
    <div className="container header-inner">
      <Brand navigate={navigate} />
      <nav className="desktop-nav" aria-label="Navegação principal">
        {items.map(([label, href]) => <InternalLink key={href} href={href} navigate={navigate}>{label}</InternalLink>)}
      </nav>
      <div className="header-socials" aria-label="Redes sociais e localização">
        <a className="social-link" href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram do CTI">
          <Icon name="instagram" size={21} />
        </a>
        <a className="social-link" href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook do CTI">
          <Icon name="facebook" size={21} />
        </a>
        <a className="social-link" href={siteConfig.contact.mapsUrl} target="_blank" rel="noreferrer" aria-label="Localização do CTI no Google Maps" title="Localização do CTI">
          <Icon name="map" size={21} />
        </a>
      </div>
      {course ? <a className="button button-yellow header-cta" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('header_desktop', course)}>Quero me inscrever <Icon name="arrow" size={18} className="button-arrow-icon" /></a>
        : <InternalLink className="button button-yellow header-cta" href="/#cursos" navigate={navigate}>Ver cursos <Icon name="arrow" size={18} /></InternalLink>}
      <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu"><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
    </div>
    {menuOpen && <div className="mobile-nav">
      {items.map(([label, href]) => <InternalLink key={href} href={href} navigate={navigate} onClick={() => setMenuOpen(false)}>{label}</InternalLink>)}
      <div className="mobile-socials" aria-label="Redes sociais e localização">
        <a className="social-link" href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram do CTI"><Icon name="instagram" size={20} /></a>
        <a className="social-link" href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook do CTI"><Icon name="facebook" size={20} /></a>
        <a className="social-link" href={siteConfig.contact.mapsUrl} target="_blank" rel="noreferrer" aria-label="Localização do CTI no Google Maps"><Icon name="map" size={20} /></a>
      </div>
      {course ? <a className="button button-yellow" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('header_mobile', course)}>Quero me inscrever</a>
        : <InternalLink className="button button-yellow" href="/#cursos" navigate={navigate} onClick={() => setMenuOpen(false)}>Ver cursos</InternalLink>}
    </div>}
  </header>
}

function Footer({ navigate }: { navigate: (href: string) => void }) {
  const whatsapp = makeWhatsapp(siteConfig.contact.whatsappMessage)
  return <footer className="footer" id="contato">
    <div className="container footer-grid">
      <div className="footer-brand"><span className="brand-mark footer-logo">CTI</span><div><strong>{siteConfig.brand.fullName}</strong><p>{siteConfig.brand.tagline}</p></div></div>
      <div className="footer-links">
        <InternalLink href="/" navigate={navigate}>Início</InternalLink>
        <InternalLink href="/#cursos" navigate={navigate}>Cursos</InternalLink>
        <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.brand.instagram}</a>
        <a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('footer')}>WhatsApp</a>
      </div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} CTI. Todos os direitos reservados.</span><span>Centro Técnico Integrado</span></div>
  </footer>
}

function CourseIcon({ icon, size = 62 }: { icon: CourseIcon; size?: number }) {
  return <Icon name={icon} size={size} />
}

function HeroVisual({ course }: { course?: Course }) {
  if (course?.slug === 'manutencao-de-celulares') {
    return <div className="hero-card course-photo-card" aria-label="Bancada prática do curso de manutenção de celulares">
      <img className="course-photo" src={mobileRepairHero} alt="Bancada de manutenção de celulares com aparelho desmontado e ferramentas técnicas" />
      <div className="hero-badge">CURSO PRESENCIAL</div>
      <div className="hero-card-bottom course-photo-caption"><strong>{course.shortTitle}</strong><span>{course.duration} • {course.dailyHours}</span></div>
    </div>
  }
  if (!course || course.icon === 'phone') {
    return <div className="hero-card" aria-label="Representação visual de formação técnica">
      <div className="hero-badge">FORMAÇÃO PRÁTICA</div>
      <div className="phone-visual"><div className="phone-frame"><div className="phone-screen"><span className="phone-camera" /><div className="phone-lines"><i /><i /><i /><i /></div></div></div><div className="tool tool-one" /><div className="tool tool-two" /><div className="circuit circuit-one" /><div className="circuit circuit-two" /></div>
      <div className="hero-card-bottom"><strong>{course ? course.shortTitle : 'Aprenda fazendo.'}</strong><span>{course ? `${course.duration} • ${course.dailyHours}` : 'Prática técnica desde os fundamentos.'}</span></div>
    </div>
  }
  return <div className="hero-card course-hero-visual">
    <div className="hero-badge">CURSO PRESENCIAL</div>
    <div className="device-symbol"><CourseIcon icon={course.icon} size={130} /><span className="device-orbit orbit-one" /><span className="device-orbit orbit-two" /></div>
    <div className="hero-card-bottom"><strong>{course.shortTitle}</strong><span>{course.duration} • {course.dailyHours}</span></div>
  </div>
}

function CourseCard({ course, navigate }: { course: Course; navigate: (href: string) => void }) {
  return <article className={`catalog-card ${course.featured ? 'featured-course' : ''}`}>
    <div className="catalog-art"><CourseIcon icon={course.icon} size={58} />{course.featured && <span className="featured-badge">DESTAQUE</span>}</div>
    <div className="catalog-content">
      <h3>{course.title}</h3>
      <p>{course.shortDescription}</p>
      <div className="catalog-meta">
        <span><Icon name="clock" size={16} /> {course.duration}</span>
        <span><Icon name="money" size={16} /> {course.price}</span>
      </div>
      <InternalLink className="catalog-link" href={`/cursos/${course.slug}`} navigate={navigate}>Conhecer o curso <Icon name="arrow" size={17} className="link-arrow-icon" /></InternalLink>
    </div>
  </article>
}

function HomePage({ navigate }: { navigate: (href: string) => void }) {
  const whatsapp = makeWhatsapp(siteConfig.contact.whatsappMessage)
  return <div className="site-shell"><Header navigate={navigate} /><main>
    <section className="hero home-hero"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
      <div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">CTI • CENTRO TÉCNICO INTEGRADO</span><h1>Formação técnica para transformar conhecimento em prática</h1><p>Cursos presenciais em manutenção e reparo técnico, com formações objetivas para desenvolver conhecimento aplicável no dia a dia.</p>
        <div className="hero-actions"><InternalLink className="button button-yellow" href="/#cursos" navigate={navigate}>Conhecer os cursos <Icon name="arrow" size={18} /></InternalLink><a className="button button-ghost" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('home_hero')}><Icon name="whatsapp" size={19} /> Falar com o CTI</a></div>
        <div className="hero-proof">
          <span className="hero-proof-item"><Icon name="check-solid" size={19} /> Cursos presenciais</span>
          <span className="hero-proof-item"><Icon name="check-solid" size={19} /> 3 horas por dia</span>
          <span className="hero-proof-item"><Icon name="check-solid" size={19} /> {courses.length} formações disponíveis</span>
        </div>
      </div><HeroVisual /></div>
    </section>

    <section className="home-trust"><div className="container trust-grid">
      {[
        ['Formação prática','Conteúdo aplicado à rotina técnica, com foco no que realmente será usado no dia a dia.','tools'],
        ['Turmas presenciais','Acompanhamento durante as aulas para evoluir com mais segurança e aproveitamento.','users'],
        ['Cursos objetivos','Formações intensivas, com duração de 7 dias a 2 semanas e aprendizado direto ao ponto.','clock'],
        ['Suporte por 90 dias','Após a conclusão, o aluno conta com 90 dias de suporte para tirar dúvidas e reforçar o aprendizado.','support'],
        ['Atendimento direto','Informações e inscrições com atendimento rápido pelo WhatsApp.','whatsapp'],
      ].map(([title,text,icon]) => <article className="trust-item" key={title}><span className="trust-icon"><Icon name={icon as IconName} size={23} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}
    </div></section>

    <section className="section modules-section" id="cursos"><div className="container"><div className="section-heading centered"><span className="section-label">CURSOS CTI</span><h2>Escolha sua próxima formação</h2><p>Conheça os cursos disponíveis, compare duração e investimento e abra a página completa de cada formação.</p></div>
      <div className="course-catalog-grid">{courses.map(course => <CourseCard key={course.slug} course={course} navigate={navigate} />)}</div>
    </div></section>

    <section className="section light" id="metodo"><div className="container two-col"><div className="section-copy"><span className="section-label">COMO FUNCIONA</span><h2>Um caminho direto para desenvolver habilidade técnica</h2><p>Os cursos foram organizados em formatos intensivos, com 3 horas de aula por dia e duração definida conforme o tema da formação.</p></div><div className="method-stack">
      {[['01','Escolha seu curso','Compare as formações e encontre a área técnica que deseja desenvolver.'],['02','Fale com o CTI','Confirme turma, horários e condições de inscrição diretamente pelo WhatsApp.'],['03','Participe das aulas','Siga a carga diária e o período definidos para a formação escolhida.']].map(([n,t,p]) => <div className="method-row" key={n}><span>{n}</span><div><strong>{t}</strong><p>{p}</p></div></div>)}
    </div></div></section>

    <section className="section structure-section" id="estrutura"><div className="container structure-grid"><div className="structure-visual"><div className="structure-phone"><Icon name="tools" size={56} /></div><div className="bench-line"><span /><span /><span /></div><span className="structure-badge"><Icon name="bolt" size={16} /> Formação técnica presencial</span></div><div className="section-copy"><span className="section-label">CENTRO TÉCNICO INTEGRADO</span><h2>Cursos em diferentes áreas de manutenção eletrônica</h2><p>Do reparo de celulares à programação de EPROM/BIOS e leitura de BoardView, o catálogo reúne formações com diferentes níveis de investimento e duração.</p><div className="mini-features"><span><Icon name="check" size={18} /> Celulares e computadores</span><span><Icon name="check" size={18} /> Notebooks e reparo de placas</span><span><Icon name="check" size={18} /> EPROM, BIOS, esquemas elétricos e BoardView</span></div></div></div></section>

    <section className="final-cta home-final"><div className="container final-cta-inner"><div><span className="section-label yellow">ENCONTRE SEU CURSO</span><h2>Veja todas as formações e escolha por onde começar</h2><p>Abra a página do curso para conferir descrição, duração, investimento e falar com a equipe do CTI.</p></div><InternalLink className="button button-yellow" href="/#cursos" navigate={navigate}>Ver os cursos <Icon name="arrow" size={20} className="button-arrow-icon" /></InternalLink></div></section>
  </main><Footer navigate={navigate} /><a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => trackWhatsappClick('home_floating')}><Icon name="whatsapp" size={26} /></a></div>
}

function CoursePage({ navigate, course }: { navigate: (href: string) => void; course: Course }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const whatsappUrl = makeWhatsapp(course.whatsappMessage)
  const faq = [
    { q: 'Qual é a duração do curso?', a: `${course.duration}, com ${course.dailyHours}.` },
    { q: 'Qual é o investimento?', a: `O investimento informado para esta formação é ${course.price}.` },
    { q: 'O curso é presencial?', a: 'Sim. O site do CTI está estruturado para as turmas presenciais.' },
    { q: 'Como faço minha inscrição?', a: 'Use qualquer botão de WhatsApp desta página para falar diretamente com a equipe do CTI e confirmar turma, horário e inscrição.' },
  ]
  return <div className="site-shell"><Header navigate={navigate} course={course} /><main id="top">
    <div className="course-breadcrumb"><div className="container"><InternalLink href="/" navigate={navigate}><Icon name="home" size={14} /> Início</InternalLink><span>/</span><InternalLink href="/#cursos" navigate={navigate}>Cursos</InternalLink><span>/</span><strong>{course.title}</strong></div></div>

    <section className="hero"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">CURSO PRESENCIAL • CTI</span><h1>{course.title}</h1><p>{course.description}</p><div className="hero-actions"><a className="button button-yellow" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_hero_enroll', course)}>Quero me inscrever <Icon name="arrow" size={18} /></a><a className="button button-ghost" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_hero_questions', course)}><Icon name="whatsapp" size={19} /> Tirar dúvidas</a></div><div className="hero-proof"><span><Icon name="clock" size={16} /> {course.duration}</span><span><Icon name="check" size={16} /> {course.dailyHours}</span><span><Icon name="money" size={16} /> {course.price}</span></div></div><HeroVisual course={course} /></div></section>

    <section className="benefits" aria-label="Informações do curso"><div className="container benefit-grid">
      <article className="benefit-card"><span className="icon-box"><Icon name="map" size={23} /></span><div><h3>Presencial</h3><p>Formação em turma presencial.</p></div></article>
      <article className="benefit-card"><span className="icon-box"><Icon name="clock" size={23} /></span><div><h3>{course.duration}</h3><p>Duração total da formação.</p></div></article>
      <article className="benefit-card"><span className="icon-box"><Icon name="book" size={23} /></span><div><h3>{course.dailyHours}</h3><p>Carga diária informada.</p></div></article>
      <article className="benefit-card"><span className="icon-box"><Icon name="money" size={23} /></span><div><h3>{course.price}</h3><p>Investimento no curso.</p></div></article>
    </div></section>

    <section className="section light" id="curso"><div className="container two-col"><div className="section-copy"><span className="section-label">SOBRE O CURSO</span><h2>{course.shortTitle}</h2><p>{course.description}</p></div><div className="check-panel">{course.highlights.map(text => <div className="check-row" key={text}><span><Icon name="check" size={18} /></span><p>{text}</p></div>)}</div></div></section>

    <section className="section modules-section" id="conteudo"><div className="container"><div className="section-heading centered"><span className="section-label">CONTEÚDO EM DESTAQUE</span><h2>Principais pontos da formação</h2><p>Os tópicos abaixo foram organizados a partir da descrição informada para este curso.</p></div><div className="modules-grid course-highlights-grid">{course.highlights.map((title,index) => <article className="module-card" key={title}><span>TÓPICO {String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>Parte central da proposta desta formação do CTI.</p></article>)}</div></div></section>

    <section className="section dark" id="inscricao"><div className="container enrollment-grid"><div><span className="section-label yellow">INFORMAÇÕES DA FORMAÇÃO</span><h2>{course.duration} de curso, com {course.dailyHours}</h2><p className="muted-light">Entre em contato com a equipe do CTI para consultar a próxima turma, os horários disponíveis e as condições de inscrição.</p><div className="stats-grid"><div className="stat-card"><Icon name="map" /><span>Modalidade</span><strong>Presencial</strong></div><div className="stat-card"><Icon name="clock" /><span>Duração</span><strong>{course.duration}</strong></div><div className="stat-card"><Icon name="book" /><span>Por dia</span><strong>{course.dailyHours}</strong></div><div className="stat-card"><Icon name="money" /><span>Investimento</span><strong>{course.price}</strong></div></div></div><aside className="enrollment-card"><span className="mini-label">INSCRIÇÕES</span><h3>Quero fazer este curso</h3><p>Fale com o CTI para confirmar a próxima turma e receber as orientações para inscrição.</p><div className="price-block"><span>Investimento</span><strong>{course.price}</strong></div><a className="button button-yellow full" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_enrollment', course)}><Icon name="whatsapp" size={19} /> Falar com o CTI</a><small>Mensagem preparada para este curso.</small></aside></div></section>

    <section className="section light" id="duvidas"><div className="container faq-wrap"><div className="section-heading centered"><span className="section-label">DÚVIDAS FREQUENTES</span><h2>Antes de se inscrever</h2><p>Informações essenciais da formação e do contato com o CTI.</p></div><div className="faq-list">{faq.map((item,index)=>{const open=openFaq===index;return <article className={`faq-item ${open?'open':''}`} key={item.q}><button onClick={()=>setOpenFaq(open?null:index)}><span>{item.q}</span><b>{open?'−':'+'}</b></button>{open&&<p>{item.a}</p>}</article>})}</div></div></section>

    <section className="related-courses section"><div className="container"><div className="section-heading centered"><span className="section-label">OUTROS CURSOS</span><h2>Continue explorando o CTI</h2></div><div className="related-grid">{courses.filter(item => item.slug !== course.slug).slice(0,3).map(item => <CourseCard key={item.slug} course={item} navigate={navigate} />)}</div></div></section>

    <section className="final-cta"><div className="container final-cta-inner"><div><span className="section-label yellow">CTI • CENTRO TÉCNICO INTEGRADO</span><h2>Quer saber mais sobre {course.shortTitle}?</h2><p>Fale diretamente com a equipe para receber as informações da próxima turma.</p></div><a className="button button-yellow" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_final_cta', course)}><Icon name="whatsapp" size={20} /> Falar com o CTI</a></div></section>
  </main><Footer navigate={navigate} /><a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => trackWhatsappClick('course_floating', course)}><Icon name="whatsapp" size={26} /></a></div>
}

function NotFound({ navigate }: { navigate: (href: string) => void }) {
  return <div className="not-found"><div><span className="brand-mark">CTI</span><h1>Página não encontrada</h1><p>O endereço acessado não existe neste site.</p><InternalLink className="button button-yellow" href="/" navigate={navigate}>Voltar para o início</InternalLink></div></div>
}

function App() {
  const { path, navigate } = useSimpleRouter()
  const normalized = useMemo(() => path.replace(/\/+$/, '') || '/', [path])
  const courseSlug = normalized.startsWith('/cursos/') ? normalized.replace('/cursos/', '') : ''
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined

  useEffect(() => {
    const baseUrl = 'https://cticentrotecnicointegrado.com.br'
    const isHome = normalized === '/'
    const isNotFound = !isHome && !course
    const title = course
      ? `${course.title} | CTI`
      : isHome
        ? 'CTI | Centro Técnico Integrado'
        : 'Página não encontrada | CTI'
    const description = course
      ? `${course.shortDescription} Curso presencial no CTI — Centro Técnico Integrado.`
      : 'CTI — Centro Técnico Integrado. Cursos presenciais de eletrônica e manutenção com foco em aprendizado prático.'
    const canonicalUrl = course
      ? `${baseUrl}/cursos/${course.slug}`
      : baseUrl + '/'

    document.title = title

    const upsertMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.content = value
    }

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', isNotFound ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', 'pt_BR')
    upsertMeta('property', 'og:site_name', 'CTI — Centro Técnico Integrado')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [normalized, course])

  if (normalized === '/') return <HomePage navigate={navigate} />
  if (course) return <CoursePage navigate={navigate} course={course} />
  return <NotFound navigate={navigate} />
}

export default App
