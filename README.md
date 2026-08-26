# Jadeon Lu 的个人网站

这是一个基于 Jekyll 与 al-folio 的个人学术网站，只公开以下页面：

- About：首页
- Publications：论文
- Projects：项目
- CV：简历
- Fragments：随笔与学习记录

## 修改内容

所有内容文件的位置和可复制示例见 [CONTENT_GUIDE.md](CONTENT_GUIDE.md)。

## 本地预览

首次使用：

```powershell
bundle install
```

启动本地网站：

```powershell
bundle exec jekyll serve
```

浏览器打开 <http://127.0.0.1:4000/>。修改 Markdown、YAML 或 BibTeX 文件后通常会自动重新生成。

发布前构建检查：

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build
powershell -ExecutionPolicy Bypass -File test\personal_site_contract.ps1 -SiteRoot _site
```

## 上传 GitHub

```powershell
git status
git add .
git commit -m "Update website content"
git push
```

推送到 `main` 或 `master` 后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会自动构建并发布网站。
