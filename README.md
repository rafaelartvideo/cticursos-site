# CTI — Centro Técnico Integrado

Site institucional + páginas de vendas dos cursos do CTI em um único projeto React + Vite + TypeScript.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`).

## Rotas

- `/` — Home institucional e catálogo dos 6 cursos
- `/cursos/manutencao-de-celulares`
- `/cursos/manutencao-em-notebook`
- `/cursos/reparo-em-placa-de-notebook`
- `/cursos/manutencao-em-computadores`
- `/cursos/reparo-em-placa-mae-desktop`
- `/cursos/eprom-bios-boardview`

## Onde editar as informações

As informações de todos os cursos ficam centralizadas em:

`src/siteConfig.ts`

Ali você pode alterar investimento, duração, descrição, WhatsApp, textos e demais informações sem duplicar páginas.

## Antes de publicar

Troque o número de WhatsApp de exemplo em `src/siteConfig.ts` pelo número oficial do CTI e depois adicione logo, fotos reais e endereço quando estiverem definidos.

O arquivo `public/.htaccess` mantém o roteamento da SPA funcionando em hospedagem Apache/cPanel.
