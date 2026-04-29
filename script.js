/* ============================================================
   NEU — Neuroscience Engineering Universe
   Client-side logic (v3 — slash-delimited categories, drill-down sidebar)
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
    });
  }

  /* ---------- Wiki sidebar toggle ---------- */
  const wikiToggle = document.getElementById('wiki-sidebar-toggle');
  const wikiSidebar = document.getElementById('wiki-sidebar');

  if (wikiToggle && wikiSidebar) {
    wikiToggle.addEventListener('click', () => {
      wikiSidebar.classList.toggle('wiki-sidebar--open');
    });
  }

  /* ---------- Discover page ---------- */
  const grid = document.getElementById('project-grid');
  const searchBox = document.getElementById('discover-search');
  const countEl = document.getElementById('discover-count');
  const catTreeEl = document.getElementById('cat-tree');
  const activeFilters = document.getElementById('active-filters');
  const clearBtn = document.getElementById('sidebar-clear');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('discover-sidebar');

  if (!grid) return; // Not on discover page

  let projects = [];
  let currentPath = ''; // Current drill-down path (empty = root)

  const arrowSVG = `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  /* ---------- Mobile sidebar toggle ---------- */
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('discover-sidebar--open');
    });
  }

  /* ---------- Fetch and initialise ---------- */
  fetch('database.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load database.');
      return res.json();
    })
    .then(data => {
      projects = data;
      renderSidebar();
      applyFilters();
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = renderEmpty('Unable to load projects. Please try again later.');
    });

  /* ---------- Build sidebar for current path ---------- */
  function renderSidebar() {
    if (!catTreeEl) return;

    // Collect all categories, find direct children of currentPath
    const childCounts = {}; // { childSegment: projectCount }

    projects.forEach(p => {
      const cat = p.category || '';
      // Check if this project is under currentPath
      if (!isUnderPath(cat, currentPath)) return;

      // Get the next segment after currentPath
      const remainder = currentPath ? cat.slice(currentPath.length + 1) : cat;
      if (!remainder) return; // Project is exactly at currentPath (no deeper child)
      const nextSegment = remainder.split('/')[0];
      childCounts[nextSegment] = (childCounts[nextSegment] || 0) + 1;
    });

    // Also count projects exactly at currentPath (no further nesting)
    const exactCount = projects.filter(p => {
      const cat = p.category || '';
      return currentPath ? cat === currentPath : false;
    }).length;

    // Build breadcrumb — always visible
    let breadcrumbHtml = '<div class="cat-breadcrumb">';
    if (currentPath) {
      const parts = currentPath.split('/');
      // "All" link back to root
      breadcrumbHtml += `<button class="cat-breadcrumb__item cat-breadcrumb__link" data-path="">All</button>`;

      // Each part of the path
      parts.forEach((part, i) => {
        const partPath = parts.slice(0, i + 1).join('/');
        breadcrumbHtml += `<span class="cat-breadcrumb__sep">/</span>`;
        if (i < parts.length - 1) {
          breadcrumbHtml += `<button class="cat-breadcrumb__item cat-breadcrumb__link" data-path="${partPath}">${part}</button>`;
        } else {
          breadcrumbHtml += `<span class="cat-breadcrumb__item cat-breadcrumb__current">${part}</span>`;
        }
      });
    } else {
      // At root — show "All" as the current (non-clickable) item
      breadcrumbHtml += `<span class="cat-breadcrumb__item cat-breadcrumb__current">All</span>`;
    }
    breadcrumbHtml += '</div>';

    // Build child list
    const sortedChildren = Object.keys(childCounts).sort();
    let childHtml = '';
    if (sortedChildren.length > 0) {
      childHtml = sortedChildren.map(child => {
        const childPath = currentPath ? `${currentPath}/${child}` : child;
        return `
          <button class="cat-item" data-path="${childPath}">
            <span>${child}</span>
            <span class="cat-item__count">${childCounts[child]}</span>
          </button>
        `;
      }).join('');
    } else if (currentPath) {
      childHtml = '<div class="cat-empty">No subcategories</div>';
    }

    catTreeEl.innerHTML = breadcrumbHtml + '<div class="cat-children">' + childHtml + '</div>';

    // Attach breadcrumb click handlers
    catTreeEl.querySelectorAll('.cat-breadcrumb__link').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPath = btn.dataset.path;
        renderSidebar();
        applyFilters();
      });
    });

    // Attach child click handlers (drill down)
    catTreeEl.querySelectorAll('.cat-item').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPath = btn.dataset.path;
        renderSidebar();
        applyFilters();
      });
    });

    // Update clear button
    if (clearBtn) clearBtn.hidden = !currentPath;
  }

  /* ---------- Check if a category path is at or under a given parent ---------- */
  function isUnderPath(category, parentPath) {
    if (!parentPath) return true; // Root matches everything
    return category === parentPath || category.startsWith(parentPath + '/');
  }

  /* ---------- Render project cards ---------- */
  function render(list) {
    if (countEl) countEl.textContent = `${list.length} project${list.length !== 1 ? 's' : ''}`;

    // Render active filter breadcrumb
    renderFilterChips();

    if (list.length === 0) {
      grid.innerHTML = renderEmpty('No projects match your filters.');
      return;
    }

    grid.innerHTML = list.map(p => {
      const tagsHtml = (p.tags || []).map(t =>
        `<span class="project-card__tag" data-tag="${t}">${t}</span>`
      ).join('');

      const specsHtml = Object.entries(p.specs || {}).map(([k, v]) =>
        `<div class="project-card__spec">
          <span class="project-card__spec-key">${k}</span>
          <span class="project-card__spec-val">${v}</span>
        </div>`
      ).join('');

      // Show the leaf category name (last segment)
      const catParts = (p.category || '').split('/');
      const leafCategory = catParts[catParts.length - 1];

      return `
        <article class="project-card" id="card-${p.id}">
          <img class="project-card__image" src="${p.image}" alt="${p.name}" loading="lazy"
               onerror="this.style.display='none'">
          <div class="project-card__body">
            <span class="project-card__category">${leafCategory}</span>
            <h3 class="project-card__title">${p.name}</h3>
            ${tagsHtml ? `<div class="project-card__tags">${tagsHtml}</div>` : ''}
            <p class="project-card__desc">${p.description}</p>
            ${specsHtml ? `<div class="project-card__specs">${specsHtml}</div>` : ''}
            <div class="project-card__meta">
              <span class="project-card__authors">${p.authors.join(', ')}</span>
              <a class="project-card__link" href="${p.link}" target="_blank" rel="noopener noreferrer">
                View project ${arrowSVG}
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach tag click handlers
    grid.querySelectorAll('.project-card__tag').forEach(tag => {
      tag.addEventListener('click', () => {
        if (searchBox) {
          searchBox.value = tag.dataset.tag;
          applyFilters();
        }
      });
    });
  }

  /* ---------- Render active filter chips ---------- */
  function renderFilterChips() {
    if (!activeFilters) return;
    if (!currentPath) {
      activeFilters.innerHTML = '';
      return;
    }
    activeFilters.innerHTML = `
      <button class="filter-chip" id="filter-chip-category">
        ${currentPath.replace(/\//g, ' / ')} <span class="filter-chip__x">✕</span>
      </button>
    `;
    activeFilters.querySelector('.filter-chip').addEventListener('click', () => {
      currentPath = '';
      renderSidebar();
      applyFilters();
    });
  }

  /* ---------- Empty state ---------- */
  function renderEmpty(msg) {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3 class="empty-state__title">${msg}</h3>
      </div>
    `;
  }

  /* ---------- Filter logic ---------- */
  function applyFilters() {
    const query = (searchBox ? searchBox.value : '').toLowerCase().trim();

    const filtered = projects.filter(p => {
      // Category filter: show all projects at or below currentPath
      if (currentPath && !isUnderPath(p.category || '', currentPath)) {
        return false;
      }

      // Text search
      if (query) {
        const haystack = [
          p.name,
          p.description,
          p.category,
          ...(p.tags || []),
          ...p.authors,
          ...Object.keys(p.specs || {}),
          ...Object.values(p.specs || {})
        ].join(' ').toLowerCase();

        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    render(filtered);
  }

  /* ---------- Event listeners ---------- */
  if (searchBox) searchBox.addEventListener('input', applyFilters);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentPath = '';
      if (searchBox) searchBox.value = '';
      renderSidebar();
      applyFilters();
    });
  }
})();
