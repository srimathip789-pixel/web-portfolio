document.addEventListener('DOMContentLoaded', () => {
  // If old concatenated text exists, convert it into chips
  const raw = document.querySelector('.skills-raw');
  if (raw) {
    let text = raw.textContent.trim();

    // Normalize separators and common tokens
    text = text.replace(/[\/|•·;]/g, ',');
    // Insert commas between camelCase / PascalCase adjacent words (TypeScriptJavaScript -> TypeScript,JavaScript)
    text = text.replace(/([a-z0-9])([A-Z][a-z])/g, '$1,$2');
    // Also split between a lowercase followed by uppercase letter (e.g. HTMLCSS -> HTML,CSS)
    text = text.replace(/([A-Z])([A-Z][a-z])/g, '$1,$2');

    // Split on commas/newlines and trim
    const tokens = text.split(/[,|\n]+/).map(s => s.trim()).filter(Boolean);

    const ul = document.createElement('ul');
    ul.className = 'skill-list';
    ul.setAttribute('role', 'list');
    tokens.forEach(t => {
      const li = document.createElement('li');
      li.className = 'skill-tag';
      li.tabIndex = 0;
      li.textContent = t;
      ul.appendChild(li);
    });

    raw.replaceWith(ul);
  }

  // Small accessibility: allow Enter to "activate" a chip (optional - here we simply focus)
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('skill-tag')) {
      e.preventDefault();
      // Optionally do something when user "activates" a skill (e.g., show examples). For now, just toggle an aria-pressed state.
      const el = document.activeElement;
      const pressed = el.getAttribute('aria-pressed') === 'true';
      el.setAttribute('aria-pressed', String(!pressed));
      el.classList.toggle('skill-tag--active', !pressed);
    }
  }, false);

  // Build top skill headings navigation from .skill-section nodes
  const skillSections = Array.from(document.querySelectorAll('.skill-section'));
  const navList = document.querySelector('.skills-nav__list');

  if (!navList || skillSections.length === 0) return;

  // Helper - create safe id from text
  const makeId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'skill';

  skillSections.forEach((section, idx) => {
    // find heading inside section
    const heading = section.querySelector('h2, h3, h4') || section;
    const title = heading.textContent.trim() || `Skill ${idx + 1}`;
    // ensure id
    if (!section.id) section.id = makeId(title);
    // create nav item
    const li = document.createElement('li');
    li.className = 'skills-nav__item';
    const a = document.createElement('a');
    a.className = 'skills-nav__link';
    a.href = `#${section.id}`;
    a.textContent = title;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      // smooth scroll and focus
      document.getElementById(section.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${section.id}`);
    });
    li.appendChild(a);
    navList.appendChild(li);
  });

  // Highlight active nav link using IntersectionObserver
  const navLinks = Array.from(document.querySelectorAll('.skills-nav__link'));
  const idToLink = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = idToLink.get(id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('skills-nav__link--active'));
        link.classList.add('skills-nav__link--active');
      }
    });
  }, { root: null, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-height') || 70}px 0px -40% 0px`, threshold: [0.2, 0.6] });

  skillSections.forEach(s => observer.observe(s));

  // Improve skill-item UX: convert .skill-item titles to accessible accordion toggles
  document.querySelectorAll('.skill-item').forEach((item, i) => {
    const title = item.querySelector('.skill-item__title') || item.querySelector('h4') || item.querySelector('h5');
    const details = item.querySelector('.skill-item__details') || item.querySelector('.details');
    if (!title || !details) return;

    // Ensure markup structure
    title.tabIndex = 0;
    title.setAttribute('role', 'button');
    title.setAttribute('aria-expanded', 'false');
    details.setAttribute('aria-hidden', 'true');

    const toggle = () => {
      const isOpen = item.classList.toggle('is-open');
      title.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      details.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    };

    title.addEventListener('click', toggle);
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});