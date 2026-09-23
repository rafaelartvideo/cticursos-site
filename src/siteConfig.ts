export type CourseIcon = 'phone' | 'laptop' | 'desktop' | 'chip' | 'code'

export type Course = {
  slug: string
  title: string
  shortTitle: string
  price: string
  duration: string
  dailyHours: string
  description: string
  shortDescription: string
  highlights: string[]
  icon: CourseIcon
  featured?: boolean
  whatsappMessage: string
}

export const courses: Course[] = [
  {
    slug: 'manutencao-de-celulares',
    title: 'Manutenção de Celulares',
    shortTitle: 'Celulares',
    price: 'R$ 1.200,00',
    duration: '2 semanas',
    dailyHours: '3 horas por dia',
    description: 'Aprenda os conceitos e técnicas essenciais para a manutenção de aparelhos celulares, incluindo diagnósticos, substituição de peças e atualizações de software.',
    shortDescription: 'Diagnóstico, substituição de peças e atualizações de software em aparelhos celulares.',
    highlights: ['Diagnóstico de aparelhos celulares', 'Substituição de peças', 'Atualizações de software'],
    icon: 'phone',
    featured: true,
    whatsappMessage: 'Olá! Quero saber mais sobre o curso de Manutenção de Celulares do CTI.',
  },
  {
    slug: 'manutencao-em-notebook',
    title: 'Manutenção em Notebook',
    shortTitle: 'Notebook',
    price: 'R$ 800,00',
    duration: '7 dias',
    dailyHours: '3 horas por dia',
    description: 'Curso focado em manutenção preventiva e corretiva de notebooks, abordando desde problemas comuns até manutenção de componentes internos.',
    shortDescription: 'Manutenção preventiva e corretiva de notebooks, dos problemas comuns aos componentes internos.',
    highlights: ['Manutenção preventiva', 'Manutenção corretiva', 'Componentes internos de notebooks'],
    icon: 'laptop',
    whatsappMessage: 'Olá! Quero saber mais sobre o curso de Manutenção em Notebook do CTI.',
  },
  {
    slug: 'reparo-em-placa-de-notebook',
    title: 'Reparo em Placa de Notebook',
    shortTitle: 'Placa de Notebook',
    price: 'R$ 1.200,00',
    duration: '14 dias',
    dailyHours: '3 horas por dia',
    description: 'Treinamento avançado em reparos de notebooks, com ênfase em resolução de falhas complexas, substituição de peças e reparo de circuitos.',
    shortDescription: 'Treinamento avançado com foco em falhas complexas, substituição de peças e reparo de circuitos.',
    highlights: ['Resolução de falhas complexas', 'Substituição de peças', 'Reparo de circuitos'],
    icon: 'chip',
    whatsappMessage: 'Olá! Quero saber mais sobre o curso de Reparo em Placa de Notebook do CTI.',
  },
  {
    slug: 'manutencao-em-computadores',
    title: 'Manutenção em Computadores',
    shortTitle: 'Computadores',
    price: 'R$ 600,00',
    duration: '7 dias',
    dailyHours: '3 horas por dia',
    description: 'Curso básico sobre manutenção de desktops, cobrindo limpeza, diagnósticos e atualizações de hardware.',
    shortDescription: 'Manutenção de desktops com limpeza, diagnóstico e atualizações de hardware.',
    highlights: ['Limpeza e manutenção', 'Diagnóstico de desktops', 'Atualizações de hardware'],
    icon: 'desktop',
    whatsappMessage: 'Olá! Quero saber mais sobre o curso de Manutenção em Computadores do CTI.',
  },
  {
    slug: 'reparo-em-placa-mae-desktop',
    title: 'Reparo em Placa Mãe Desktop',
    shortTitle: 'Placa Mãe Desktop',
    price: 'R$ 1.000,00',
    duration: '14 dias',
    dailyHours: '3 horas por dia',
    description: 'Formação prática em reparos de desktops, incluindo identificação e correção de falhas, substituição de componentes e otimização do sistema.',
    shortDescription: 'Identificação e correção de falhas, substituição de componentes e otimização do sistema.',
    highlights: ['Identificação e correção de falhas', 'Substituição de componentes', 'Otimização do sistema'],
    icon: 'chip',
    whatsappMessage: 'Olá! Quero saber mais sobre o curso de Reparo em Placa Mãe Desktop do CTI.',
  },
  {
    slug: 'eprom-bios-boardview',
    title: 'Programação em EPROM “BIOS” e Leitura de Esquema Elétrico “BoardView”',
    shortTitle: 'EPROM, BIOS e BoardView',
    price: 'R$ 1.200,00',
    duration: '7 dias',
    dailyHours: '3 horas por dia',
    description: 'Curso especializado em programação de EPROM e leitura de esquemas elétricos e BoardView, voltado ao desenvolvimento de um técnico mais completo.',
    shortDescription: 'Programação de EPROM/BIOS e leitura de esquemas elétricos e BoardView.',
    highlights: ['Programação de EPROM', 'Programação e trabalho com BIOS', 'Leitura de esquemas elétricos e BoardView'],
    icon: 'code',
    whatsappMessage: 'Olá! Quero saber mais sobre o curso de EPROM, BIOS e BoardView do CTI.',
  },
]

export const siteConfig = {
  brand: {
    name: 'CTI',
    fullName: 'Centro Técnico Integrado',
    tagline: 'Formação técnica com prática de verdade.',
    instagram: '@cticursos',
  },
  contact: {
    whatsappNumber: '557998567020',
    whatsappMessage: 'Olá! Quero saber mais sobre os cursos do CTI.',
    instagramUrl: 'https://instagram.com/cticursos',
    facebookUrl: '#',
    mapsUrl: 'https://maps.app.goo.gl/KowqJfbdpXjTfcfP8?g_st=ac',
    address: 'Endereço a definir',
  },
  courses,
} as const

export function getCourseBySlug(slug: string) {
  return courses.find(course => course.slug === slug)
}
