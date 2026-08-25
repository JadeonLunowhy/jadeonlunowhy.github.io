# Personal Site Cleanup Design

## Goal

Turn this al-folio starter repository into a compact personal-site repository that preserves the current appearance, content, URLs, and behavior of the five public pages: About, Publications, Projects, CV, and Fragments.

## Public surface

- `/` is backed by `_pages/about.md`.
- `/publications/` is backed by `_pages/publications.md` and `_bibliography/papers.bib`.
- `/projects/` is backed by `_pages/projects.md` and `_projects/*.md`.
- `/cv/` is backed by `_pages/cv.md`, `_data/cv.yml`, RenderCV data, and the current example PDF.
- `/fragments/` is backed by `_pages/fragments.md` and the existing fragment entries.
- `/404.html` remains available but is not a navigation item.

All currently visible sample content remains until the owner replaces it. This includes the Einstein bibliography and CV, the nine sample projects, and referenced example media.

## Naming

The public page file is renamed from `_pages/teaching.md` to `_pages/fragments.md`. The content collection is renamed from `_teachings` to `_fragments` if the installed theme interface permits it without a local copy of plugin-owned runtime templates. If the theme hard-codes `site.teachings`, the collection keeps its technical name and the Chinese content guide explicitly identifies it as the Fragments content directory.

## Repository boundary

Keep only the files needed for:

- the five public pages and their referenced content/assets;
- Jekyll and al-folio runtime dependencies;
- GitHub Pages deployment;
- local dependency installation, preview, and build verification;
- repository metadata required by Git and GitHub;
- a concise root README and a detailed Chinese content-editing guide.

Remove starter-maintainer infrastructure that a personal site does not use: Docker files, upstream integration/visual tests, Lighthouse reports, promotional screenshots, contributor automation, unused hidden example pages and collections, unused blog posts, and assets referenced only by removed examples.

## Configuration and dependencies

Reduce `_config.yml` to settings used by the retained pages and runtime. Disable or remove blog, news, books, search, comments, newsletter, external-post, charts, and other unused feature wiring when doing so does not alter the five retained pages. Preserve image processing, bibliography rendering, project cards, CV rendering, dark mode, the navbar, and other behavior currently exercised by those pages.

Reduce `Gemfile` and the plugin list together. A dependency may be removed only after a clean build proves that the retained site no longer requires it. GitHub Actions deployment must continue using the resulting lockfile and build command.

## Editing experience

Create `CONTENT_GUIDE.md` in Chinese. It must map each visible page to exact files and explain how to:

- edit About text, profile image, profile details, and timeline;
- add or edit BibTeX publications and publication media;
- add or edit project cards, categories, pages, and images;
- edit CV data and replace the downloadable PDF;
- add a Fragment entry;
- change global identity and navigation metadata;
- preview locally, validate a production build, commit, and push.

Retained content files should include concise comments only where they materially reduce editing mistakes.

## Verification

Before cleanup, capture a baseline clean production build and the generated URLs/assets used by the five pages. After cleanup:

- run the production Jekyll build from a clean output directory;
- verify `/`, `/publications/`, `/projects/`, `/cv/`, `/fragments/`, and `/404.html` exist;
- verify each retained page has its expected title and key content;
- scan generated HTML for broken local `href` and `src` targets;
- run the retained formatting or configuration checks;
- review `git diff` to ensure no unrelated user changes were overwritten.

## Safety

All removals are Git-tracked and recoverable from history. No plugin-owned runtime code is copied into this starter unless required to preserve behavior; if a local override becomes necessary, it must be recorded according to the repository ownership rules.
