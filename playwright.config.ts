import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
if (!process.env.PLAYWRIGHT_BROWSERS_PATH && existsSync('node_modules/.cache/ms-playwright'))
  process.env.PLAYWRIGHT_BROWSERS_PATH = resolve('node_modules/.cache/ms-playwright');
const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const base =
  (
    process.env.BASE_PATH ??
    (repository && repository !== `${owner}.github.io` ? `/${repository}/` : '/')
  ).replace(/\/$/, '') + '/';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  fullyParallel: true,
  workers: 2,
  use: { baseURL: `http://127.0.0.1:4322${base}`, trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run preview -- --port 4322',
    url: `http://127.0.0.1:4322${base}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 960 } },
    },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
});
