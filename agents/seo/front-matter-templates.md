# Gate 2 Front Matter Templates

Status: DONE
Owner: SEO Agent
Tool mode: repo_only
MCP usage: repo_only was sufficient; templates align with existing Jekyll SEO and bilingual routing rules.

## Objective

Standardize front matter for the page types planned in Wave 1 so new pages preserve metadata, translation behavior, and GitHub Pages compatibility.

## Shared requirements

Every translated page must include:

- `lang`
- `translation_key`
- `title`
- `permalink`
- language-specific `seo_title`
- language-specific `seo_description`

Use canonical and `hreflang` via the existing shared head include. Do not duplicate those tags manually in page content.

## Homepage

```yaml
---
layout: home
lang: uk
translation_key: home
title: "Remonty"
seo_title: "Remonty | Ремонт від сантехніки до фінального оздоблення"
seo_description: "Комплексний ремонт квартир і будинків: сантехніка, електрика, чорнові роботи, оздоблення та здача об'єкта під ключ."
eyebrow: "Комплексний ремонт"
hero_title: "..."
hero_lead: "..."
primary_cta_url: /contact/
secondary_cta_url: /services/
panel_title: "Основа позиціонування"
panel_points:
  - "..."
  - "..."
  - "..."
---
```

## Standard content page

```yaml
---
layout: page
lang: uk
translation_key: about
title: "Про нас"
permalink: /about/
seo_title: "Про нас | Remonty"
seo_description: "Як команда веде ремонт від інженерії до фінального оздоблення."
eyebrow: "Підхід"
lead: "..."
---
```

## Services hub

```yaml
---
layout: page
lang: uk
translation_key: services
title: "Послуги"
permalink: /services/
seo_title: "Послуги | Remonty"
seo_description: "Сантехніка, електрика, чорнові роботи, чистове оздоблення, комплектація та нагляд за об'єктом."
eyebrow: "Напрями робіт"
lead: "..."
---
```

## Service detail page

```yaml
---
layout: page
lang: uk
translation_key: plumbing-service
title: "Сантехнічні роботи"
permalink: /services/plumbing/
seo_title: "Сантехнічні роботи | Remonty"
seo_description: "Розводка води, каналізація, колектори, прихований монтаж і підготовка під сантехнічне обладнання."
eyebrow: "Сервіс"
lead: "..."
service_key: plumbing
related_services:
  - electrical
  - rough-works
---
```

## Process page

```yaml
---
layout: page
lang: uk
translation_key: process
title: "Процес"
permalink: /process/
seo_title: "Процес ремонту | Remonty"
seo_description: "Як формується план робіт, контроль етапів і здача об'єкта."
eyebrow: "Процес"
lead: "..."
---
```

## FAQ page

```yaml
---
layout: page
lang: uk
translation_key: faq
title: "FAQ"
permalink: /faq/
seo_title: "FAQ | Remonty"
seo_description: "Поширені питання про етапи ремонту, матеріали, строки й формат співпраці."
eyebrow: "Питання"
lead: "..."
---
```

## English mirror rule

- mirror the same `translation_key`
- use `/en/...` permalink
- replace `lang: uk` with `lang: en`
- provide language-specific `seo_title` and `seo_description`

## Notes

- Keep URLs human-readable and stable.
- Continue using `relative_url` and `absolute_url` in templates rather than hardcoded host assumptions.
- Use `image:` only when a page has a better-specific visual than the site default.
