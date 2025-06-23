import { defineConfig, devices } from '@playwright/test';
import devEnv from './src/config/dev.environment.js';
import qaEnv from './src/config/qa.environment.js';

export default defineConfig({
  timeout: 60 * 1000,
  retries: 1,
  testDir: './src/tests',
  outputDir: 'test-results',
  testMatch: '**/{ui,api}/**/*.spec.js',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'results.xml' }],
    ['monocart-reporter', { outputFile: 'monocart-report/index.html' }]
  ],

  projects: [
    {
      name: 'UI - dev (Chrome)',
      testMatch: '**/ui/**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: devEnv.uiBaseUrl,
        envConfig: devEnv,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
      }
    },
    {
      name: 'UI - qa (Firefox)',
      testMatch: '**/ui/**/*.spec.js',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: qaEnv.uiBaseUrl,
        envConfig: qaEnv,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
      }
    },
    {
      name: 'API - dev',
      testMatch: '**/api/**/*.spec.js',
      use: {
        baseURL: devEnv.apiBaseUrl || devEnv.uiBaseUrl,
        envConfig: devEnv
      }
    },
    {
      name: 'API - qa',
      testMatch: '**/api/**/*.spec.js',
      use: {
        baseURL: qaEnv.apiBaseUrl || qaEnv.uiBaseUrl,
        envConfig: qaEnv
      }
    }
  ]

  // globalSetup: './src/support/global-setup.js',
  // globalTeardown: './src/support/global-teardown.js'
});
