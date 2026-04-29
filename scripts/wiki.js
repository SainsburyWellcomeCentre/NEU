/* ============================================================
   NEU — Wiki Page Logic
   Fetches learn-toc.json, renders sidebar, handles next/prev.
   Loaded on wiki subpages.
   ============================================================ */

(function () {
  'use strict';

  const sidebarContainer = document.getElementById('wiki-sidebar-container');
  const pageNavContainer = document.getElementById('wiki-page-nav-container');
  const toggleBtn = document.getElementById('wiki-sidebar-toggle');
  
  if (!sidebarContainer) return;

  // Determine current page ID from URL
  const pathParts = window.location.pathname.split('/');
  let currentPageFile = pathParts[pathParts.length - 1] || 'electronics.html';
  // Handle local dev paths and extensionless URLs
  if (currentPageFile === '' || currentPageFile === 'learn') currentPageFile = 'electronics.html';
  if (!currentPageFile.endsWith('.html') && !currentPageFile.includes('.')) currentPageFile += '.html';

  fetch('../learn-toc.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch TOC');
      return res.json();
    })
    .then(data => {
      renderSidebar(data, currentPageFile);
      renderPageNav(data, currentPageFile);
    })
    .catch(err => console.error('Failed to load wiki TOC:', err));

  function renderSidebar(data, currentPageFile) {
    let html = `
      <aside class="wiki-sidebar" id="wiki-sidebar">
        <div class="wiki-sidebar__header">
          <a href="../learn.html" class="wiki-sidebar__back" id="wiki-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            All Topics
          </a>
        </div>
        <nav class="wiki-sidebar__nav" id="wiki-nav">
    `;

    data.forEach(topic => {
      const isActive = topic.path === currentPageFile;
      const activeClass = isActive ? 'wiki-sidebar__link--active' : '';

      html += `
        <div class="wiki-sidebar__section">
          <a href="${topic.path}" class="wiki-sidebar__link ${activeClass}" id="wiki-nav-${topic.id}">
            ${topic.icon}
            ${topic.title}
          </a>
      `;

      if (isActive && topic.sections) {
        html += `<div class="wiki-sidebar__subnav">`;
        topic.sections.forEach(sec => {
          html += `<a href="#${sec.id}" class="wiki-sidebar__sublink">${sec.title}</a>`;
        });
        html += `</div>`;
      }

      html += `</div>`;
    });

    html += `
        </nav>
      </aside>
    `;

    sidebarContainer.innerHTML = html;

    // Attach toggle event listener
    const sidebar = document.getElementById('wiki-sidebar');
    if (toggleBtn && sidebar) {
      // Recreate toggle button to remove any old listeners
      const newToggleBtn = toggleBtn.cloneNode(true);
      toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
      
      newToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('wiki-sidebar--open');
      });
    }
  }

  function renderPageNav(data, currentPageFile) {
    if (!pageNavContainer) return;

    let currentIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].path === currentPageFile) {
        currentIndex = i;
        break;
      }
    }

    if (currentIndex === -1) return;

    const prev = currentIndex > 0 ? data[currentIndex - 1] : null;
    const next = currentIndex < data.length - 1 ? data[currentIndex + 1] : null;

    let html = `<div class="wiki-page-nav">`;

    if (prev) {
      html += `
        <a href="${prev.path}" class="wiki-page-nav__link wiki-page-nav__link--prev">
          <span class="wiki-page-nav__label">Previous</span>
          <span class="wiki-page-nav__title">${prev.title}</span>
        </a>
      `;
    } else {
      html += `<div></div>`; // Spacer for flexbox
    }

    if (next) {
      html += `
        <a href="${next.path}" class="wiki-page-nav__link wiki-page-nav__link--next">
          <span class="wiki-page-nav__label">Next</span>
          <span class="wiki-page-nav__title">${next.title}</span>
        </a>
      `;
    }

    html += `</div>`;
    pageNavContainer.innerHTML = html;
  }
})();
