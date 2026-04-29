class NeuNav extends HTMLElement {
  connectedCallback() {
    const basePath = this.getAttribute('base-path') || '.';
    const activePage = this.getAttribute('active-page') || '';

    this.innerHTML = `
      <nav class="nav" id="main-nav">
        <div class="nav__inner">
          <a href="${basePath}/index.html" class="nav__logo" id="nav-logo">
            <svg class="nav__logo-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="1.5" />
              <path d="M10 16 Q13 10, 16 16 Q19 22, 22 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="10" cy="16" r="2" fill="currentColor" />
              <circle cx="22" cy="16" r="2" fill="currentColor" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
            </svg>
            NEU
          </a>

          <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div class="nav__links" id="nav-links">
            <a href="${basePath}/index.html" class="nav__link ${activePage === 'home' ? 'nav__link--active' : ''}">Home</a>
            <a href="${basePath}/learn.html" class="nav__link ${activePage === 'learn' ? 'nav__link--active' : ''}">Learn</a>
            <a href="${basePath}/discover.html" class="nav__link ${activePage === 'discover' ? 'nav__link--active' : ''}">Discover</a>
            <a href="${basePath}/contribute.html" class="nav__link ${activePage === 'contribute' ? 'nav__link--active' : ''}">Contribute</a>
            <a href="https://github.com/SainsburyWellcomeCentre/NEU/discussions" class="nav__link" target="_blank" rel="noopener noreferrer">Discuss</a>
          </div>
        </div>
      </nav>
    `;

    // Bind nav toggle logic directly in the component
    const navToggle = this.querySelector('.nav__toggle');
    const navLinks = this.querySelector('.nav__links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav__links--open');
      });
    }
  }
}

class NeuFooter extends HTMLElement {
  connectedCallback() {
    const basePath = this.getAttribute('base-path') || '.';

    this.innerHTML = `
      <footer class="footer" id="footer">
        <div class="footer__inner">
          <p class="footer__text">&copy; 2026 Neuroscience Engineering Universe. All rights reserved.</p>
          <div class="footer__links">
            <a href="https://github.com/SainsburyWellcomeCentre/NEU" class="footer__link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="${basePath}/contribute.html" class="footer__link">Contribute</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('neu-nav', NeuNav);
customElements.define('neu-footer', NeuFooter);
