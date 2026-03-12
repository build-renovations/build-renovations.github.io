---
layout: default
lang: en
translation_key: projects
title: "Projects"
permalink: /en/projects/
seo_title: "Projects | Remonty"
seo_description: "Project dossiers with decision routes, buyer relevance, stage logic, and proof-source status."
---
{% assign concern_groups = site.data.case_studies.concern_groups %}
{% assign t = site.data.translations[page.lang] | default: site.data.translations.uk %}
{% include featured-case-studies.html
  lang=page.lang
  refs=site.data.case_studies.featured_sets.home.refs
  marker="project-index-visibility"
  surface="projects-index-featured"
  chapter_label=t.chapter_proof_label
  title="Project proof that goes deeper than a gallery"
  intro="Start with the concern that matches your renovation risk: hidden work, wet zones, apartment-system logic, house coordination, or controlled handover. The sections below are arranged as a decision surface, not a flat archive."
%}

<section class="section section--accent">
  <div class="shell">
    <div class="projects-index-guide">
      <article class="scan-rail">
        <p class="scan-rail__eyebrow">{{ t.chapter_overview_label }}</p>
        <h2>How to use this route</h2>
        <p>Choose the concern closest to your project first. Then open the dossier that proves the decision route, stage control, and proof source instead of picking by image alone.</p>
      </article>
      <article class="service-detail__card projects-index-guide__card">
        <p class="eyebrow">{{ t.chapter_proof_label }}</p>
        <h2>What you can judge before opening a dossier</h2>
        <ul class="service-detail__list">
          <li>Which buyer concern or project risk the case answers</li>
          <li>Which stages the dossier is strongest at proving</li>
          <li>Whether the evidence is grounded in publishable photo reporting or a site-audit route</li>
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
    chapter_label=t.chapter_bridge_label
    title=group_content.title
    intro=group_content.text
    accent=section_accent
  %}
{% endfor %}
