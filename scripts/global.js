/* ============================================================
   NEU — Global scripts (nav toggle, wiki sidebar toggle)
   Loaded on every page.
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
})();
