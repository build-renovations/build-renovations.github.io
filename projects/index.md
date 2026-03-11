---
layout: default
lang: uk
translation_key: projects
title: "Проєкти"
permalink: /projects/
seo_title: "Проєкти | Remonty"
seo_description: "Проєкти-докази з маршрутами рішень, buyer-relevance, етапами та статусом джерела доказу."
---
{% assign bridge = site.data.trust_foundation[page.lang].case_study_bridge | default: site.data.trust_foundation.uk.case_study_bridge %}
{% include featured-case-studies.html
  lang=page.lang
  refs=bridge.refs
  marker="project-index-visibility"
  surface="projects-index-featured"
  title="Проєкти, де доказ сильніший за галерею"
  intro="Цей розділ існує для глибших маршрутів: що саме контролювали, чому кейс релевантний покупцю, і який статус має джерело доказу."
%}
