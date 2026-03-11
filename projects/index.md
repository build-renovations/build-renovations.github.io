---
layout: default
lang: uk
translation_key: projects
title: "Проєкти"
permalink: /projects/
seo_title: "Проєкти | Remonty"
seo_description: "Проєкти-докази з маршрутами рішень, buyer-relevance, етапами та статусом джерела доказу."
---
{% assign concern_groups = site.data.case_studies.concern_groups %}
{% include featured-case-studies.html
  lang=page.lang
  refs=site.data.case_studies.featured_sets.home.refs
  marker="project-index-visibility"
  surface="projects-index-featured"
  title="Проєкти, де доказ сильніший за галерею"
  intro="Почніть із досьє, якщо вже знаєте свій тип ризику: приховані роботи, мокрі зони, системна логіка квартири або керована здача. Нижче проєкти розкладені саме як поверхня вибору, а не як плоский архів."
%}

<section class="section section--accent">
  <div class="shell">
    <div class="service-detail">
      <article class="service-detail__card">
        <h2>Як читати цей розділ</h2>
        <p>Спочатку виберіть concern, який найближчий до вашого ремонту. Потім відкривайте повне досьє вже за маршрутом рішень, етапами і статусом доказу, а не за випадковою картинкою.</p>
      </article>
      <article class="service-detail__card">
        <h2>Що видно ще до відкриття досьє</h2>
        <ul class="service-detail__list">
          <li>Який покупець або ризик тут закривається</li>
          <li>На яких етапах кейс найсильніший</li>
          <li>Чи доказ тримається на publishable фотофіксації або site-audit маршруті</li>
        </ul>
      </article>
    </div>
  </div>
</section>

{% for group_entry in concern_groups %}
  {% assign group = group_entry[1] %}
  {% assign group_content = group[page.lang] | default: group.uk %}
  {% assign section_accent = forloop.index0 | modulo: 2 %}
  {% include featured-case-studies.html
    lang=page.lang
    refs=group.refs
    marker="project-index-visibility"
    surface="projects-index-featured"
    title=group_content.title
    intro=group_content.text
    accent=section_accent
  %}
{% endfor %}
