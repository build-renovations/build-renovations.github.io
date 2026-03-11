---
lang: en
translation_key: faq
title: "FAQ"
permalink: /en/faq/
seo_title: "FAQ | Remonty"
seo_description: "Common questions about stages, procurement, quality control, and the collaboration format."
eyebrow: "Questions"
lead: "The FAQ should remove common objections and explain how the team handles stages, materials, and quality control."
---
<section data-phase2-marker="faq-group-visibility">
{% for group in site.data.faqs.groups %}
{% assign copy = group.en %}
<div data-faq-group="{{ group.key }}">

## {{ copy.title }}

{{ copy.intro }}

{% for item in group.items %}
### {{ item.en.question }}

{{ item.en.answer }}
{% endfor %}

</div>
{% endfor %}
</section>
