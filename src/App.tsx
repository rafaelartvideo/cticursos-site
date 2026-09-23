import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { courses, getCourseBySlug, siteConfig, type Course, type CourseIcon } from './siteConfig'

const mobileRepairHero = '/assets/banners/cursos/Banner-manu-celular.jpg'

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
      <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu"><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
    </div>
    {menuOpen && <div className="mobile-nav">
      {items.map(([label, href]) => <InternalLink key={href} href={href} navigate={navigate} onClick={() => setMenuOpen(false)}>{label}</InternalLink>)}
      <div className="mobile-socials" aria-label="Redes sociais e localização">
        <a className="social-link" href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram do CTI"><Icon name="instagram" size={20} /></a>
        <a className="social-link" href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook do CTI"><Icon name="facebook" size={20} /></a>
        <a className="social-link" href={siteConfig.contact.mapsUrl} target="_blank" rel="noreferrer" aria-label="Localização do CTI no Google Maps"><Icon name="map" size={20} /></a>
      </div>
    </div>}
  </header>
}

function Footer({ navigate }: { navigate: (href: string) => void }) {
  const whatsapp = makeWhatsapp(siteConfig.contact.whatsappMessage)
  return <footer className="footer" id="contato">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img
          className="footer-brand-logo"
          src="/assets/brand/logos/ChatGPT%20Image%2023%20de%20set.%20de%202026,%2010_28_28.png"
          alt="CTI — Centro Técnico Integrado"
        />
        <p>{siteConfig.brand.tagline}</p>
      </div>

      <div className="footer-column">
        <strong>Navegação</strong>
        <InternalLink href="/" navigate={navigate}>Início</InternalLink>
        <InternalLink href="/#cursos" navigate={navigate}>Cursos</InternalLink>
        <InternalLink href="/#metodo" navigate={navigate}>Método</InternalLink>
      </div>

      <div className="footer-column">
        <strong>Contato</strong>
        <a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('footer')}><Icon name="whatsapp" size={17} /> WhatsApp</a>
        <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer"><Icon name="instagram" size={17} /> {siteConfig.brand.instagram}</a>
        <a href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer"><Icon name="facebook" size={17} /> Facebook</a>
      </div>

      <div className="footer-column footer-location">
        <strong>Endereço</strong>
        <span>{siteConfig.contact.address}</span>
        <a href={siteConfig.contact.mapsUrl} target="_blank" rel="noreferrer"><Icon name="map" size={17} /> Ver localização no Google Maps</a>
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
      <div className="hero-card-bottom course-photo-caption"><strong>{course.title}</strong><span>{course.duration} • {course.dailyHours}</span></div>
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
    <div className="hero-card-bottom"><strong>{course.title}</strong><span>{course.duration} • {course.dailyHours}</span></div>
  </div>
}

function CourseCard({ course, navigate }: { course: Course; navigate: (href: string) => void }) {
  return <article className={`catalog-card ${course.featured ? 'featured-course' : ''}`}>
    <div className={`catalog-art ${course.slug === 'manutencao-de-celulares' ? 'catalog-art-photo' : ''}`}>
      {course.slug === 'manutencao-de-celulares'
        ? <img src={mobileRepairHero} alt="Bancada prática de manutenção de celulares" />
        : <CourseIcon icon={course.icon} size={58} />}
      {course.featured && <span className="featured-badge">DESTAQUE</span>}
    </div>
    <div className="catalog-content">
      <h3>{course.title}</h3>
      <p>{course.shortDescription}</p>
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
        ['Certificado','Ao concluir a formação, o aluno recebe certificado de conclusão do curso.','shield'],
        ['Suporte por 90 dias','Após a conclusão, o aluno conta com 90 dias de suporte para tirar dúvidas e reforçar o aprendizado.','support'],
      ].map(([title,text,icon]) => <article className="trust-item" key={title}><span className="trust-icon"><Icon name={icon as IconName} size={23} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}
    </div></section>

    <section className="section modules-section" id="cursos"><div className="container"><div className="section-heading centered"><span className="section-label">CURSOS CTI</span><h2>Escolha sua próxima formação</h2><p>Conheça os cursos disponíveis e abra a página completa de cada formação.</p></div>
      <div className="course-catalog-grid">{courses.map(course => <CourseCard key={course.slug} course={course} navigate={navigate} />)}</div>
    </div></section>

    <section className="section light" id="metodo"><div className="container two-col"><div className="section-copy"><span className="section-label">COMO FUNCIONA</span><h2>Um caminho direto para desenvolver habilidade técnica</h2><p>Os cursos foram organizados em formatos intensivos, com 3 horas de aula por dia e duração definida conforme o tema da formação.</p></div><div className="method-stack">
      {[['01','Escolha seu curso','Compare as formações e encontre a área técnica que deseja desenvolver.'],['02','Fale com o CTI','Confirme turma, horários e condições de inscrição diretamente pelo WhatsApp.'],['03','Participe das aulas','Siga a carga diária e o período definidos para a formação escolhida.']].map(([n,t,p]) => <div className="method-row" key={n}><span>{n}</span><div><strong>{t}</strong><p>{p}</p></div></div>)}
    </div></div></section>

    <section className="section structure-section" id="estrutura"><div className="container structure-grid"><div className="structure-visual"><div className="structure-phone"><Icon name="tools" size={56} /></div><div className="bench-line"><span /><span /><span /></div><span className="structure-badge"><Icon name="bolt" size={16} /> Formação técnica presencial</span></div><div className="section-copy"><span className="section-label">CENTRO TÉCNICO INTEGRADO</span><h2>Cursos em diferentes áreas de manutenção eletrônica</h2><p>Do reparo de celulares à programação de EPROM/BIOS e leitura de BoardView, o catálogo reúne formações com diferentes níveis de valor e duração.</p><div className="mini-features"><span><Icon name="check" size={18} /> Celulares e computadores</span><span><Icon name="check" size={18} /> Notebooks e reparo de placas</span><span><Icon name="check" size={18} /> EPROM, BIOS, esquemas elétricos e BoardView</span></div></div></div></section>

    <section className="final-cta home-final"><div className="container final-cta-inner"><div><span className="section-label yellow">ENCONTRE SEU CURSO</span><h2>Veja todas as formações e escolha por onde começar</h2><p>Abra a página do curso para conferir descrição, duração, valor e falar com a equipe do CTI.</p></div><InternalLink className="button button-yellow" href="/#cursos" navigate={navigate}>Ver os cursos <Icon name="arrow" size={20} className="button-arrow-icon" /></InternalLink></div></section>
  </main><Footer navigate={navigate} /><a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => trackWhatsappClick('home_floating')}><Icon name="whatsapp" size={26} /></a></div>
}

function CoursePage({ navigate, course }: { navigate: (href: string) => void; course: Course }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const whatsappUrl = makeWhatsapp(course.whatsappMessage)
  const faq = [
    { q: 'O curso oferece 90 dias de suporte?', a: 'Sim. Após a conclusão, o aluno conta com 90 dias de suporte para tirar dúvidas relacionadas ao conteúdo estudado e reforçar o aprendizado.' },
    { q: 'O curso é presencial?', a: 'Sim. Esta formação é presencial, com acompanhamento durante as aulas e foco em aprendizado prático.' },
    { q: 'Qual é a duração e a carga diária?', a: `A formação dura ${course.duration}, com ${course.dailyHours} de aula.` },
    { q: 'Qual é o valor do curso?', a: `O valor desta formação é ${course.price}. Para confirmar formas de pagamento e condições da próxima turma, fale diretamente com a equipe do CTI.` },
    { q: 'O que vou aprender durante a formação?', a: `Entre os principais pontos estão: ${course.highlights.join('; ')}.` },
    { q: 'Como faço minha inscrição?', a: 'Use o botão de WhatsApp desta página para falar com a equipe do CTI, consultar a próxima turma e receber as orientações para inscrição.' },
  ]
  return <div className="site-shell"><Header navigate={navigate} course={course} /><main id="top">
    <div className="course-breadcrumb"><div className="container"><InternalLink href="/" navigate={navigate}><Icon name="home" size={14} /> Início</InternalLink><span>/</span><InternalLink href="/#cursos" navigate={navigate}>Cursos</InternalLink><span>/</span><strong>{course.title}</strong></div></div>

    <section className="hero"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">CURSO PRESENCIAL • CTI</span><h1>{course.title}</h1><p>{course.description}</p><div className="hero-actions"><a className="button button-yellow" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_hero_enroll', course)}>Quero me inscrever <Icon name="arrow" size={18} /></a><a className="button button-ghost" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_hero_questions', course)}><Icon name="whatsapp" size={19} /> Tirar dúvidas</a></div></div><div className="course-hero-side"><HeroVisual course={course} /><div className="course-price-highlight">
  <div className="course-price-label"><span className="course-price-icon"><Icon name="money" size={20} /></span><div><span>VALOR DO CURSO</span><small>Formação presencial</small></div></div>
  <strong>{course.price}</strong>
</div></div></div></section>

    <section className="benefits course-summary" aria-label="Informações do curso"><div className="container benefit-grid">
      <article className="benefit-item"><Icon name="map" size={22} /><div><span>Modalidade</span><strong>Presencial</strong></div></article>
      <article className="benefit-item"><Icon name="clock" size={22} /><div><span>Duração</span><strong>{course.duration}</strong></div></article>
      <article className="benefit-item"><Icon name="book" size={22} /><div><span>Carga diária</span><strong>{course.dailyHours}</strong></div></article>
      <article className="benefit-item"><Icon name="shield" size={22} /><div><span>Certificação</span><strong>Certificado de conclusão</strong></div></article>
      <article className="benefit-item support-item"><Icon name="support" size={22} /><div><span>Suporte</span><strong>90 dias após o curso</strong></div></article>
    </div></section>

    <section className="section light" id="curso"><div className="container two-col"><div className="section-copy"><h2>Sobre o curso</h2><p>{course.description}</p></div><div className="check-panel">{course.highlights.map(text => <div className="check-row" key={text}><span><Icon name="check" size={18} /></span><p>{text}</p></div>)}</div></div></section>

    <section className="section modules-section" id="conteudo"><div className="container">
      {course.curriculum?.length ? <>
        <div className="section-heading centered curriculum-heading">
          <span className="section-label">MANUAL DO TÉCNICO</span>
          <h2>Do básico ao avançado</h2>
          <p>Conteúdo organizado em três módulos para desenvolver visão de atendimento, domínio da bancada e segurança na abertura dos aparelhos.</p>
        </div>
        <div className="curriculum-grid">
          {course.curriculum.map((module,index) => <article className="curriculum-module" key={module.title}>
            <div className="curriculum-module-head">
              <span className="curriculum-number">{String(index+1).padStart(2,'0')}</span>
              <div><small>MÓDULO</small><h3>{module.title}</h3><p>{module.subtitle}</p></div>
            </div>
            <div className="curriculum-topics">
              {module.topics.map(topic => <div className="curriculum-topic" key={topic}><Icon name="check" size={16} /><span>{topic}</span></div>)}
            </div>
          </article>)}
        </div>
      </> : <>
        <div className="section-heading centered"><span className="section-label">CONTEÚDO EM DESTAQUE</span><h2>Principais pontos da formação</h2><p>Conheça os principais temas trabalhados nesta formação.</p></div>
        <div className="modules-grid course-highlights-grid">{course.highlights.map((title,index) => <article className="module-card" key={title}><span>TÓPICO {String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>Parte central da proposta desta formação do CTI.</p></article>)}</div>
      </>}
    </div></section>

    <section className="section dark" id="inscricao"><div className="container enrollment-grid"><div><span className="section-label yellow">INSCRIÇÕES</span><h2>Pronto para começar?</h2><p className="muted-light">Fale com a equipe do CTI para consultar a próxima turma, os horários disponíveis e receber as orientações para inscrição.</p></div><aside className="enrollment-card"><span className="mini-label">FALE COM O CTI</span><h3>Quero fazer este curso</h3><p>Entre em contato para confirmar disponibilidade e concluir sua inscrição.</p><a className="button button-yellow full" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_enrollment', course)}><Icon name="whatsapp" size={19} /> Falar com o CTI</a><small>Mensagem preparada para este curso.</small></aside></div></section>

    <section className="section light" id="duvidas"><div className="container faq-wrap"><div className="section-heading centered"><span className="section-label">DÚVIDAS FREQUENTES</span><h2>Antes de se inscrever</h2><p>Informações essenciais da formação e do contato com o CTI.</p></div><div className="faq-list">{faq.map((item,index)=>{const open=openFaq===index;return <article className={`faq-item ${open?'open':''}`} key={item.q}><button onClick={()=>setOpenFaq(open?null:index)}><span>{item.q}</span><b>{open?'−':'+'}</b></button>{open&&<p>{item.a}</p>}</article>})}</div></div></section>

    <section className="related-courses section"><div className="container"><div className="section-heading centered"><span className="section-label">OUTROS CURSOS</span><h2>Continue explorando o CTI</h2></div><div className="related-grid">{courses.filter(item => item.slug !== course.slug).slice(0,3).map(item => <CourseCard key={item.slug} course={item} navigate={navigate} />)}</div></div></section>

    <section className="final-cta"><div className="container final-cta-inner"><div><span className="section-label yellow">CTI • CENTRO TÉCNICO INTEGRADO</span><h2>Quer saber mais sobre {course.title}?</h2><p>Fale diretamente com a equipe para receber as informações da próxima turma.</p></div><a className="button button-yellow" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackWhatsappClick('course_final_cta', course)}><Icon name="whatsapp" size={20} /> Falar com o CTI</a></div></section>
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
