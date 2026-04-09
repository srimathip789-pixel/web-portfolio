document.addEventListener('DOMContentLoaded', () => {
  initializePortfolio();
});

function initializePortfolio() {
  loadHeader();
  loadFooter();
  loadSkills();
  loadExperience();
  loadEducation();
  setupSmoothScroll();
  setupScrollSpy();
}

function loadHeader() {
  const target = document.getElementById('header');
  if (!target) return;
  fetch('components/header.html')
    .then(response => {
      if (!response.ok) throw new Error('Header not found');
      return response.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load header:', err);
    });
}

function loadFooter() {
  const target = document.getElementById('footer');
  if (!target) return;
  fetch('components/footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Footer not found');
      return response.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load footer:', err);
    });
}

interface Project {
  title?: string;
  description?: string;
  technologies?: string[];
  link?: string;
  gif?: string;
}

interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
  grade: string;
}

function createProjectCard(project: Project): HTMLElement {
  const el = document.createElement('div');
  el.className = 'project-card';

  const gifSrc = project.gif ?? 'assets/project-placeholder.png';
  const title = project.title ?? 'Untitled Project';
  const desc = project.description ?? 'No description provided.';
  const techs = (project.technologies || []);

  el.innerHTML = `
    <img src="${gifSrc}" alt="${title} preview" class="project-gif" />
    <h3 class="project-title">${title}</h3>
    <p class="project-description">${desc}</p>

    <div class="project-details">
      <div class="project-tech">
        ${techs.map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>

    <a href="${project.link ?? '#'}" class="project-link" target="_blank" rel="noopener">View Project</a>
  `;

  return el;
}

async function loadCv() {
  const res = await fetch('./data/cv.json?t=' + new Date().getTime());
  const data = await res.json();

  loadProjectsFromData(data.projects);
  loadSkillsFromData(data.technicalSkills);
  loadExperienceFromData(data.workExperience);
  loadEducationFromData(data.education);
}

function loadProjectsFromData(projects: Project[] = []) {
  const container = document.getElementById('projects');
  if (!container) return;

  const list = document.createElement('div');
  list.className = 'grid';

  projects.forEach(p => {
    const card = createProjectCard(p);
    list.appendChild(card);
  });

  container.innerHTML = '<h2>Projects</h2>';
  container.appendChild(list);
}

function loadSkillsFromData(skills: any) {
  const container = document.getElementById('skills');
  if (!container || !skills) return;

  // Clear container
  container.innerHTML = '<h2>Skills</h2>';

  const list = document.createElement('ul');
  list.className = 'skill-list';
  // Force styles for the list container
  Object.assign(list.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    listStyle: 'none',
    padding: '0',
    margin: '0'
  });

  // Flatten all skills into one array
  const allSkills: string[] = [];
  Object.values(skills).forEach((values: any) => {
    if (Array.isArray(values)) {
      allSkills.push(...values);
    }
  });

  // Create list items for all skills
  allSkills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    li.className = 'skill-tag';

    // Force styles for individual items
    Object.assign(li.style, {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '100px',
      padding: '0.5rem 1.25rem',
      color: 'var(--text-muted)',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      cursor: 'default',
      display: 'inline-block' // Ensure it behaves like a block for padding
    });

    // Add hover effect via JS since inline styles make CSS hover hard
    li.addEventListener('mouseenter', () => {
      li.style.background = 'rgba(139, 92, 246, 0.1)';
      li.style.color = 'var(--primary)';
      li.style.borderColor = 'var(--primary)';
      li.style.transform = 'translateY(-2px)';
    });

    li.addEventListener('mouseleave', () => {
      li.style.background = 'var(--bg-card)';
      li.style.color = 'var(--text-muted)';
      li.style.borderColor = 'var(--border-color)';
      li.style.transform = 'translateY(0)';
    });

    list.appendChild(li);
  });

  container.appendChild(list);
}

function loadExperienceFromData(experience: Experience[] = []) {
  const container = document.getElementById('experience');
  if (!container) return;

  let html = '<h2>Experience</h2><div class="experience-list" style="display: flex; flex-direction: column; gap: 1.5rem;">';

  experience.forEach(exp => {
    html += `
      <div class="card">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1.25rem;">${exp.jobTitle}</h3>
          <span style="color: var(--primary); font-weight: 600;">${exp.startDate} - ${exp.endDate}</span>
        </div>
        <div style="color: var(--text-muted); margin-bottom: 1rem; font-weight: 500;">${exp.company} | ${exp.location}</div>
        <ul style="padding-left: 1.2rem; color: var(--text-muted);">
          ${exp.responsibilities.map(r => `<li style="margin-bottom: 0.25rem;">${r}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

function loadEducationFromData(education: Education[] = []) {
  const container = document.getElementById('education');
  if (!container) return;

  let html = '<h2>Education</h2><div class="grid">';

  education.forEach(edu => {
    html += `
      <div class="card">
        <h3 style="margin: 0 0 0.5rem 0;">${edu.degree}</h3>
        <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.5rem;">${edu.institution}</p>
        <p style="color: var(--text-muted);">Graduated: ${edu.graduationYear} | Grade: ${edu.grade}</p>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

async function loadProjects() {
  // Deprecated, using loadCv instead
}

async function loadSkills() {
  // Handled in loadCv
}

async function loadExperience() {
  // Handled in loadCv
}

async function loadEducation() {
  // Handled in loadCv
}

document.addEventListener('DOMContentLoaded', loadCv);

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLink = e.currentTarget as HTMLAnchorElement;
      const href = targetLink.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        // Offset for sticky header
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

function setupScrollSpy() {
  const nav = document.querySelector('.sticky-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header#header');

  window.addEventListener('scroll', () => {
    // Sticky nav style update
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).clientHeight;
      if (window.pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href')?.includes(current)) {
        link.classList.add('active');
      }
    });
  });
}
