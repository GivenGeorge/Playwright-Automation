# SauceDemo Playwright Test Suite

A robust end-to-end and API testing framework using [Playwright](https://playwright.dev/), integrated with GitHub Actions for CI and Monocart for reporting.

---

## Project Structure

```
.
├── .github
│   └── workflows
│       └── ci.yml
├── monocart-report
│   └── index.html
├── assets
│   └── index.html
├── node_modules
├── src
│   ├── config
│   │   ├── dev.env.js
│   │   └── qa.env.js
│   ├── data
│   │   └── testData.json
│   ├── pageObjects
│   │   └── pages.js
│   ├── tests
│   │   ├── api
│   │   │   ├── api.delete.spec.js
│   │   │   ├── api.get.spec.js
│   │   │   ├── api.post.spec.js
│   │   │   └── api.put.spec.js
│   │   └── ui
│   │       └── e2e.spec.js
│   └── utils
│       ├── api-helper.js
│       └── login.js
├── test-results
├── .last-run.json
├── package-lock.json
├── package.json
├── playwright.config.mjs
├── README.md
└── results.xml
```

---

## Requirements

- Node.js v20+
- NPM
- GitHub account (for CI execution)
- Playwright browsers (installed via CLI)

---

## Getting Started Locally

1. **Clone the Repository**
    ```sh
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Install Playwright browsers**
    ```sh
    npx playwright install --with-deps
    ```

4. **Run all tests (UI and API)**
    ```sh
    npx playwright test
    ```

5. **Run only UI tests**
    ```sh
    npx playwright test src/tests/ui
    ```

6. **Run only API tests**
    ```sh
    npx playwright test src/tests/api
    ```

7. **Run a specific project**
    ```sh
    npx playwright test --project="UI - dev (Chrome)"
    npx playwright test --project="UI - qa (Firefox)"
    npx playwright test --project="API - dev"
    npx playwright test --project="API - qa"
    ```

8. **Run in headed mode (see browser)**
    ```sh
    npx playwright test --project="UI - dev (Chrome)" --headed
    ```

9. **View Monocart Report locally**
    - Open `monocart-report/index.html` in your browser after a test run.

---

## Reporting

- **Monocart Report:**  
  Generated at `/monocart-report/index.html` after each run.  
  Also uploaded as an artifact in GitHub Actions.
- **Playwright HTML Report:**  
  Generated at `/playwright-report/index.html` (can be opened with `npx playwright show-report`).
- **JUnit Report:**  
  Generated as `results.xml` for CI integration.

---

## Tooling and Features

- Playwright for E2E and API testing
- Page Object Model pattern for maintainable UI tests
- JSON-based test data (`src/data/testData.json`)
- Multi-browser support (Chrome for dev, Firefox for qa)
- Multi-environment config (Dev & QA)
- Retry and trace on failure for debugging
- Centralized configuration in `playwright.config.mjs`

---

## Configuration

- **Test environments:** Switch between `dev` and `qa` using Playwright projects.
- **Browsers:** UI tests run on Chrome (dev) and Firefox (qa) by default.
- **API tests:** Run in both environments, no browser needed.
- **Test data:** Centralized in `src/data/testData.json`.

---

## CI/CD Integration

- **GitHub Actions:**  
  Automated on every push and pull request via `.github/workflows/ci.yml`.
- **Artifacts:**  
  Monocart and Playwright HTML reports are uploaded for every run.
- **Caching:**  
  NPM modules are cached for faster CI runs.

---

## Notes 

- All test commands and configurations are documented above.
- The project is ready for CI/CD and local execution.
- Reports are available both locally and as CI artifacts.
- The structure is modular and follows Playwright best practices.
- If you encounter any issues, ensure Node.js 20+ and Playwright browsers are installed.

---
