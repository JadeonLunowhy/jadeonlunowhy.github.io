param(
  [string]$SiteRoot = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$expectedPages = @("404.md", "about.md", "cv.md", "fragments.md", "projects.md", "publications.md")
$actualPages = @(Get-ChildItem -LiteralPath (Join-Path $repoRoot "_pages") -File -Filter "*.md" | Select-Object -ExpandProperty Name | Sort-Object)

if (Compare-Object $expectedPages $actualPages) {
  throw "Unexpected _pages contents. Expected: $($expectedPages -join ', '); actual: $($actualPages -join ', ')"
}

$navPages = @(
  Get-ChildItem -LiteralPath (Join-Path $repoRoot "_pages") -File -Filter "*.md" |
    Where-Object { (Get-Content -LiteralPath $_.FullName -Raw) -match "(?m)^nav:\s*true\s*$" }
)
if ($navPages.Count -ne 4) {
  throw "Expected four explicit navigation pages plus the implicit About home page, found $($navPages.Count) explicit pages."
}

$requiredFiles = @(
  "_bibliography/papers.bib",
  "_data/cv.yml",
  "_data/socials.yml",
  "_projects/1_project.md",
  "_teachings/fft.md",
  "assets/img/image_cat.jpg",
  "assets/img/publication_preview/brownian-motion.gif",
  "assets/img/publication_preview/wave-mechanics.gif",
  "assets/pdf/example_pdf.pdf"
)
foreach ($relativePath in $requiredFiles) {
  if (-not (Test-Path -LiteralPath (Join-Path $repoRoot $relativePath) -PathType Leaf)) {
    throw "Missing retained content or asset: $relativePath"
  }
}

$removedExamplePaths = @(
  "assets/audio",
  "assets/bibliography",
  "assets/img/book_covers",
  "assets/jupyter",
  "assets/plotly",
  "assets/video",
  "_data/featured_plugins.yml",
  "_data/repositories.yml"
)
foreach ($relativePath in $removedExamplePaths) {
  if (Test-Path -LiteralPath (Join-Path $repoRoot $relativePath)) {
    throw "Unused example path still exists: $relativePath"
  }
}

$workflowNames = @(Get-ChildItem -LiteralPath (Join-Path $repoRoot ".github/workflows") -File | Select-Object -ExpandProperty Name)
if ($workflowNames.Count -ne 1 -or $workflowNames[0] -ne "deploy.yml") {
  throw "Expected only .github/workflows/deploy.yml; found: $($workflowNames -join ', ')"
}

$removedInfrastructure = @(
  "Dockerfile",
  "docker-compose.yml",
  "docker-compose-slim.yml",
  "lighthouse_results",
  "readme_preview"
)
foreach ($relativePath in $removedInfrastructure) {
  if (Test-Path -LiteralPath (Join-Path $repoRoot $relativePath)) {
    throw "Starter-maintainer infrastructure still exists: $relativePath"
  }
}

if ($SiteRoot) {
  $resolvedSiteRoot = (Resolve-Path -LiteralPath $SiteRoot).Path
  $outputs = @{
    "index.html" = "Jadeon Lu"
    "publications/index.html" = "publications"
    "projects/index.html" = "Projects"
    "cv/index.html" = "CV"
    "fragments/index.html" = "Fragments"
    "404.html" = "404"
  }

  foreach ($relativePath in $outputs.Keys) {
    $outputPath = Join-Path $resolvedSiteRoot $relativePath
    if (-not (Test-Path -LiteralPath $outputPath -PathType Leaf)) {
      throw "Missing generated page: $relativePath"
    }
    $html = Get-Content -LiteralPath $outputPath -Raw
    if ($html -notmatch [regex]::Escape($outputs[$relativePath])) {
      throw "Generated page $relativePath does not contain '$($outputs[$relativePath])'."
    }
  }
}

Write-Output "Personal site contract passed."
