---
lang: uk
translation_key: faq
title: "FAQ"
permalink: /faq/
seo_title: "FAQ | Remonty"
seo_description: "Поширені питання про етапи ремонту, комплектацію, контроль і формат співпраці."
eyebrow: "Питання"
lead: "FAQ має знімати типові заперечення й уточнювати, як команда працює з етапами, матеріалами та контролем якості."
---
<section data-phase2-marker="faq-group-visibility">
{% for group in site.data.faqs.groups %}
{% assign copy = group.uk %}
<div data-faq-group="{{ group.key }}">

## {{ copy.title }}

{{ copy.intro }}

{% for item in group.items %}
### {{ item.uk.question }}

{{ item.uk.answer }}
{% endfor %}

</div>
{% endfor %}
</section>
