import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const base =
  process.env.BASE_PATH ??
  (repository && repository !== `${owner}.github.io` ? `/${repository}/` : '/');

export default defineConfig({
  site: process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
