# Personal Site Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the al-folio starter to a maintainable five-page personal website without changing the current visible content, URLs, or functionality.

**Architecture:** Keep al-folio's plugin-owned runtime and the starter-owned content files needed by the five pages. Remove unused starter examples and maintainer infrastructure, simplify configuration/deployment around the retained features, and document exact owner editing paths.

**Tech Stack:** Jekyll, Liquid, Ruby/Bundler, YAML, Markdown/BibTeX, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-08-25-personal-site-cleanup-design.md`

## Global Constraints

- Preserve `/`, `/publications/`, `/projects/`, `/cv/`, `/fragments/`, and `/404.html`.
- Preserve the current visible sample content and referenced media on the five public pages.
- Keep GitHub Pages deployment and local Bundler/Jekyll preview/build workflows.
- Do not copy plugin-owned runtime files into the starter unless preservation is otherwise impossible.
- All deleted tracked files must remain recoverable through Git history.

---

### Task 1: Capture the baseline contract

**Files:**
- Create: `test/personal_site_contract.ps1`
- Generated: `_site_baseline/**`

**Interfaces:**
- Consumes: current `_config.yml` and retained content.
- Produces: an executable contract that asserts the six retained output paths and their identifying content.

- [ ] **Step 1: Build the unmodified site into `_site_baseline`**

Run: `bundle exec jekyll build --destination _site_baseline`

Expected: exit code 0 and generated retained pages.

- [ ] **Step 2: Write a PowerShell contract check**

The script builds to a supplied destination and asserts existence of `index.html`, `publications/index.html`, `projects/index.html`, `cv/index.html`, `fragments/index.html`, and `404.html`; it also asserts the outputs contain `Jadeon Lu`, `publications`, `Projects`, `CV`, and `Fragments` respectively.

- [ ] **Step 3: Run the contract against the baseline**

Run: `powershell -ExecutionPolicy Bypass -File test/personal_site_contract.ps1 -SiteRoot _site_baseline`

Expected: `Personal site contract passed.`

### Task 2: Align public names and remove hidden sample content

**Files:**
- Rename: `_pages/teaching.md` to `_pages/fragments.md`
- Delete: all `_pages/*.md` except `404.md`, `about.md`, `publications.md`, `projects.md`, `cv.md`, and `fragments.md`
- Delete: `_posts/**`, `_books/**`, `_news/**`
- Modify: `_config.yml`

**Interfaces:**
- Consumes: the existing public permalinks.
- Produces: exactly five navigation pages plus the non-navigation 404 page.

- [ ] **Step 1: Make the contract fail if an extra navigation page is generated**

Extend `test/personal_site_contract.ps1` to parse retained source front matter and assert exactly five files contain `nav: true`.

- [ ] **Step 2: Verify the new assertion fails before cleanup**

Run: `powershell -ExecutionPolicy Bypass -File test/personal_site_contract.ps1 -SiteRoot _site_baseline`

Expected: failure reporting extra navigation/source pages.

- [ ] **Step 3: Rename Fragments and delete hidden sample collections/pages**

Use Git-tracked removals and preserve the two existing fragment entries and all nine project entries.

- [ ] **Step 4: Remove `books` and `news` collection declarations and blog-only settings from `_config.yml`**

Keep `projects` and the collection used by Fragments.

- [ ] **Step 5: Rebuild and run the contract**

Run: `bundle exec jekyll build --destination _site`

Run: `powershell -ExecutionPolicy Bypass -File test/personal_site_contract.ps1 -SiteRoot _site`

Expected: both commands pass.

### Task 3: Remove unused assets and template data

**Files:**
- Delete: unused files under `assets/**`
- Delete: unused `_data/*.yml`
- Preserve: every path referenced by retained pages, bibliography, projects, fragments, CV, configuration, and generated HTML.

**Interfaces:**
- Consumes: references discovered with `rg` and the baseline generated HTML.
- Produces: a minimal asset/data set with no broken local generated links.

- [ ] **Step 1: Generate a retained-reference inventory**

Search retained content and baseline HTML for local `assets/` references, then classify each tracked asset as retained or unreferenced.

- [ ] **Step 2: Delete assets and data used only by removed examples**

Keep publication previews, all project images currently shown, the profile image, the example CV/publication PDF, RenderCV inputs/output, and any runtime-referenced JSON.

- [ ] **Step 3: Add broken-local-target checks to the contract**

For each generated `href` or `src` beginning with `/` or the configured base URL, strip query/fragment components and assert the corresponding generated target exists; ignore external protocols and runtime-generated bibliography anchors.

- [ ] **Step 4: Rebuild and run the contract**

Expected: clean build and no missing retained local target.

### Task 4: Simplify dependencies, configuration, and deployment

**Files:**
- Modify: `_config.yml`
- Modify: `Gemfile`
- Modify: `Gemfile.lock`
- Modify: `.github/workflows/deploy.yml`
- Delete: unused `.github/workflows/**` and GitHub template/maintainer files
- Delete: `Dockerfile`, `docker-compose.yml`, `docker-compose-slim.yml`, and unused `bin/**`
- Delete: unused Node visual-test files and configuration if deployment no longer needs Node

**Interfaces:**
- Consumes: retained build contract.
- Produces: one deploy workflow and the smallest dependency set that still builds the five-page site.

- [ ] **Step 1: Remove feature wiring for deleted blog/news/books/search/comments/newsletter/external-post/chart examples**

Preserve bibliography, projects, CV, image processing, icons, math used by retained content, analytics configuration if enabled, and core theme wiring.

- [ ] **Step 2: Remove the corresponding gems one group at a time and update the lockfile**

Run after each group: `bundle install` and `bundle exec jekyll build --destination _site`.

Expected: each accepted removal preserves a passing build; restore any dependency the build proves transitive runtime still needs.

- [ ] **Step 3: Simplify deployment**

Keep checkout, Ruby setup with Bundler cache, ImageMagick installation, production Jekyll build, and GitHub Pages publication. Remove Python/Node/PurgeCSS steps only if a production build and generated styling remain correct without them.

- [ ] **Step 4: Remove all workflows except `deploy.yml`**

Delete upstream release, Docker, citation-update, CV-render, scheduled-post, lint, accessibility, security, upgrade, and visual-regression workflows that are outside the personal-site maintenance goal.

- [ ] **Step 5: Run production build and contract**

Run: `$env:JEKYLL_ENV='production'; bundle exec jekyll build --destination _site`

Expected: production build and contract pass.

### Task 5: Remove starter-maintainer documentation and add owner documentation

**Files:**
- Modify: `README.md`
- Create: `CONTENT_GUIDE.md`
- Delete: upstream `docs/**` except the cleanup spec/plan while implementation is in progress
- Delete: `readme_preview/**`, `lighthouse_results/**`, unused agent/maintainer metadata

**Interfaces:**
- Consumes: final retained file paths and commands.
- Produces: a short project entry point and a complete Chinese editing manual.

- [ ] **Step 1: Replace README with personal-site commands and guide link**

Document `bundle install`, `bundle exec jekyll serve`, the local URL, production build, and push flow.

- [ ] **Step 2: Write `CONTENT_GUIDE.md`**

Use exact file names and copyable front-matter/BibTeX examples for About, Publications, Projects, CV, Fragments, global identity/navigation, local preview, and Git upload.

- [ ] **Step 3: Remove upstream maintainer-only documentation and screenshots**

Keep only documentation that helps the owner edit or understand this repository.

- [ ] **Step 4: Check every documented path and command against the repository**

Run `Test-Path` for documented local files and execute the documented build command.

### Task 6: Final verification and repository review

**Files:**
- Modify: any retained file found broken by verification
- Delete: `_site/**`, `_site_baseline/**` generated outputs before handoff

**Interfaces:**
- Consumes: final repository.
- Produces: evidence that the slim repository preserves the requested site.

- [ ] **Step 1: Run a clean production build**

Run: `$env:JEKYLL_ENV='production'; bundle exec jekyll build --destination _site`

Expected: exit code 0.

- [ ] **Step 2: Run the personal-site contract**

Run: `powershell -ExecutionPolicy Bypass -File test/personal_site_contract.ps1 -SiteRoot _site`

Expected: `Personal site contract passed.`

- [ ] **Step 3: Audit local plugin overrides**

Run: `bundle exec al-folio upgrade overrides audit`

Expected: no unacknowledged local runtime override introduced by this cleanup.

- [ ] **Step 4: Review repository status and diff statistics**

Run: `git status --short` and `git diff --stat HEAD~1`.

Expected: only intentional cleanup, configuration, documentation, and contract changes.

- [ ] **Step 5: Remove generated output directories and commit the implementation**

Commit message: `refactor: streamline personal website repository`.
