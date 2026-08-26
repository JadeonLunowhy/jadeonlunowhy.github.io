# 网站内容修改指南

这份文档只讲日常维护。通常不需要修改 Liquid 模板、Gemfile 或 GitHub Actions。

## 一眼找到该改哪里

| 页面/内容 | 主要文件 | 图片或附件 |
| --- | --- | --- |
| About 首页 | `_pages/about.md` | `assets/img/` |
| Publications 论文 | `_bibliography/papers.bib` | `assets/img/publication_preview/`、`assets/pdf/`、`assets/html/` |
| Projects 项目列表 | `_projects/*.md`、`_pages/projects.md` | `assets/img/` |
| CV 简历 | `_data/cv.yml`、`_pages/cv.md` | `assets/pdf/` |
| Fragments 随笔 | `_teachings/*.md` | 文件中引用的图片/PDF |
| 姓名、网址、页脚等 | `_config.yml` | `assets/img/` |
| 联系方式与社交链接 | `_data/socials.yml` | `assets/img/` |

`_teachings` 是 al-folio 主题使用的内部集合名；网页和页面文件已经统一叫 Fragments。不要只为了目录名好看而改 `_teachings`，否则主题的 `courses.liquid` 组件可能读取不到内容。

## 1. 修改 About 首页

编辑 `_pages/about.md`。

文件顶部 `---` 之间是页面配置：

```yaml
profile:
  align: right
  image: image_cat.jpg
  image_circular: false
  more_info: >
    <p>Student</p>
    <p>Beijing Normal-Hong Kong Baptist University</p>
    <p>Zhuhai, China</p>
```

- 换头像：把新图片放进 `assets/img/`，然后把 `image` 改成文件名，例如 `profile.jpg`。
- 修改右侧身份/学校/地点：编辑 `more_info` 中的三行 `<p>`。
- 修改个人介绍和研究方向：编辑第二个 `---` 之后的 Markdown。
- 添加时间线：在 `## Timeline` 下追加列表项：

```markdown
- **August 25, 2026**  
  I started a new research project.
```

- 首页底部论文来自 `_bibliography/papers.bib` 中包含 `selected = {true}` 的条目。

## 2. 添加或修改 Publications

论文全部写在 `_bibliography/papers.bib`。每篇论文是一个 BibTeX 条目：

```bibtex
@article{lu2026example,
  abbr      = {CVPR},
  title     = {Your Paper Title},
  author    = {Lu, Jadeon and Collaborator, Alice},
  journal   = {Conference on Computer Vision and Pattern Recognition},
  year      = {2026},
  html      = {https://example.com/project},
  pdf       = {your-paper.pdf},
  code      = {https://github.com/example/repo},
  preview   = {your-paper.png},
  selected  = {true}
}
```

注意：

- `{lu2026example}` 必须唯一，建议用“第一作者姓 + 年份 + 简短关键词”。
- `pdf = {your-paper.pdf}` 对应 `assets/pdf/your-paper.pdf`。
- `preview = {your-paper.png}` 对应 `assets/img/publication_preview/your-paper.png`。
- `selected = {true}` 会让论文同时显示在 About 首页的 selected publications。
- 不想在首页显示时删除 `selected`，或改成 `selected = {false}`。
- 作者高亮规则在 `_config.yml` 的 `scholar.last_name` 和 `scholar.first_name`。替换示例论文时，把 Einstein 改成你自己的姓名形式。

## 3. 添加或修改 Projects

每个项目对应 `_projects/` 中一个 Markdown 文件。复制现有文件最方便，例如复制 `_projects/1_project.md` 为 `_projects/10_my_project.md`：

```yaml
---
layout: page
title: My Project
description: One-line project description
img: assets/img/my-project.jpg
importance: 1
category: Undergraduate Coursework
related_publications: false
---

这里写项目详情。支持普通 Markdown：段落、列表、链接和图片。
```

- 项目封面放在 `assets/img/`。
- `importance` 越小，排序越靠前。
- `category` 必须与 `_pages/projects.md` 中的 `display_categories` 完全一致，包括大小写和空格。
- 当前项目页只展示 `Undergraduate Coursework` 和 `others` 两类：

```yaml
display_categories: [Undergraduate Coursework, others]
```

要显示 `work` 和 `fun` 项目，可改成：

```yaml
display_categories: [Undergraduate Coursework, work, fun, others]
```

- 如果项目应跳转到外部网站，在顶部增加 `redirect: https://example.com`。
- 删除项目时删除对应 `_projects/*.md`；确认图片不再被其他页面使用后，再删除图片。

## 4. 修改 CV

网页简历数据在 `_data/cv.yml`。按现有结构替换姓名、教育、经历、论文、技能等字段即可。YAML 对缩进敏感：统一使用两个空格，不要使用 Tab。

例如添加一段教育经历：

```yaml
    Education:
      - institution: Beijing Normal-Hong Kong Baptist University
        location: Zhuhai, China
        area: Computer Science
        studyType: Bachelor
        start_date: 2024
        end_date: 2028
        highlights:
          - Research focus: Computer Vision
```

下载按钮当前指向 `assets/pdf/example_pdf.pdf`，配置位于 `_pages/cv.md`：

```yaml
cv_pdf: /assets/pdf/example_pdf.pdf
```

替换方式：

1. 把真实简历放到 `assets/pdf/Jadeon_Lu_CV.pdf`。
2. 将 `_pages/cv.md` 中的路径改为 `/assets/pdf/Jadeon_Lu_CV.pdf`。
3. `_data/socials.yml` 中如果也配置了 `cv_pdf`，同步改成相同路径。

## 5. 添加 Fragments

每篇 Fragment 对应 `_teachings/` 中一个 Markdown 文件。新建例如 `_teachings/diffusion-notes.md`：

```yaml
---
layout: course
title: Diffusion Model Notes
description: Notes on diffusion models and image generation.
---

## First topic

在这里写正文。可以使用中英文 Markdown、公式、列表、链接和图片。
```

文件名只用英文小写、数字和连字符，例如 `frequency-domain-notes.md`，不要使用空格。网页地址会根据文件名生成。

如需课程式日程，可参考 `_teachings/introduction-to-machine-learning.md` 中的 `schedule` 结构；普通随笔参考 `_teachings/fft.md` 即可。

## 6. 修改全站姓名、网址和页脚

编辑 `_config.yml` 顶部：

```yaml
title: Jadeon Lu
first_name: Jadeon
middle_name: C.
last_name: Lu
description: Your site description
url: https://jadeonlunowhy.github.io
baseurl: ""
```

- GitHub Pages 用户站点通常保持 `baseurl: ""`。
- 改完 `_config.yml` 后，停止本地 Jekyll（`Ctrl+C`）并重新启动；配置文件变化不一定触发完整热更新。
- 导航显示名、顺序和地址分别在 `_pages/*.md` 顶部的 `title`、`nav_order` 和 `permalink`。不要随意改变 permalink，否则旧链接会失效。

联系方式位于 `_data/socials.yml`。删除不需要的字段即可隐藏对应图标；不要保留示例邮箱或 Einstein 链接后直接发布。

## 7. 本地预览

需要 Ruby 3.3 和 Bundler。首次在仓库根目录运行：

```powershell
bundle install
```

日常预览：

```powershell
bundle exec jekyll serve
```

打开 <http://127.0.0.1:4000/>，逐个检查：

- <http://127.0.0.1:4000/>
- <http://127.0.0.1:4000/publications/>
- <http://127.0.0.1:4000/projects/>
- <http://127.0.0.1:4000/cv/>
- <http://127.0.0.1:4000/fragments/>

发布前执行：

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build
powershell -ExecutionPolicy Bypass -File test\personal_site_contract.ps1 -SiteRoot _site
```

## 8. 上传和发布

```powershell
git status
git add .
git commit -m "Update publications and projects"
git push
```

`.github/workflows/deploy.yml` 会在推送到 `main` 或 `master` 后自动发布。到 GitHub 仓库的 Actions 页面查看绿色成功标记；构建失败时不要反复乱改，先打开失败步骤看第一条明确错误。

## 9. 最容易出错的地方

- YAML 缩进错误：只用空格，不用 Tab。
- BibTeX 漏逗号或花括号不成对。
- 图片文件名大小写不一致：Windows 本地可能正常，Linux 构建会失败。
- 项目 `category` 与 `display_categories` 拼写不一致，导致项目存在但列表不显示。
- 删除资源前没有搜索引用。删除前先运行：

```powershell
rg "文件名" .
```

- 修改 `_config.yml` 后没有重启本地 Jekyll。
