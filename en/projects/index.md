---
layout: default
lang: en
translation_key: projects
title: "Projects"
permalink: /en/projects/
seo_title: "Projects | Remonty"
seo_description: "Project dossiers with decision routes, buyer relevance, stage logic, and proof-source status."
---
{% assign bridge = site.data.trust_foundation[page.lang].case_study_bridge | default: site.data.trust_foundation.uk.case_study_bridge %}
{% include featured-case-studies.html
  lang=page.lang
  refs=bridge.refs
  marker="project-index-visibility"
  surface="projects-index-featured"
  title="Project proof that goes deeper than a gallery"
  intro="This route exists for deeper evidence: what was controlled, why the case matters to the buyer, and what proof-source status the dossier carries."
%}
